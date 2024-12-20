import * as pdfjs from "pdfjs-dist/legacy/build/pdf.mjs";
import { createCanvas, ImageData } from "canvas";

pdfjs.GlobalWorkerOptions.workerSrc = "/js/pdf.worker.min.mjs";

/**
 * Fetches and caches data using the Cache API.
 *
 * @param {string} url - The URL of the resource to fetch.
 * @returns {Promise<Response>} - The cached or fetched response.
 */
async function fetchAndCacheData(url) {
  const cache = await caches.open("pdfCache");
  const cachedResponse = await cache.match(url);

  if (cachedResponse) {
    return await cachedResponse.json();
  }

  const cacheKeys = await cache.keys();
  if (cacheKeys.length >= 3) {
    const oldest = cacheKeys[0];
    await cache.delete(oldest);
  }

  const response = await fetch("/api/pdf_proxy", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ pdfUrl: url }),
  });

  if (response.ok) {
    await cache.put(url, response.clone());
    const data = await response.json();
    return data;
  }

  throw new Error("Failed to fetch PDF file from the provided URL.");
}

/**
 * Processes a PDF file from a URL, converts specific pages to images, and caches results.
 *
 * @param {string} pdfUrl - The URL to the PDF file.
 * @param {number} page - The current page number (1-based index).
 * @param {Object} loadedPages - An object containing keys of already loaded page numbers.
 * @returns {Promise<{ images: string[], totalPages: number }>} Encoded images and total pages.
 */
export async function processPdf(pdfUrl, page, loadedPages = {}) {
  try {
    if (!pdfUrl || typeof page !== "number") {
      throw new Error("Invalid input. Provide a PDF URL and page number.");
    }

    // Fetch the PDF file using Cache API
    const data = await fetchAndCacheData(pdfUrl);

    const pdfBuffer = data?.buffer?.data;

    // Determine the range of pages to fetch
    const { imageBuffers, totalPages } = await convertPdfToImages(
      pdfBuffer,
      page,
      loadedPages
    );

    return {
      images: imageBuffers,
      totalPages,
    };
  } catch (error) {
    console.error("Error in processPdf:", error);
    throw new Error("Failed to process PDF");
  }
}

/**
 * Converts a range of PDF pages to image buffers.
 *
 * @param {ArrayBuffer} pdfBuffer - The PDF file as an ArrayBuffer.
 * @param {number} currentPage - The current page number (1-based index).
 * @param {Object} loadedPages - An object containing keys of already loaded page numbers.
 * @returns {Promise<{ imageBuffers: Object, totalPages: number }>}
 */
async function convertPdfToImages(pdfBuffer, currentPage, loadedPages) {
  try {
    const imageBuffers = {};
    const pdfData = new Uint8Array(pdfBuffer);
    const loadingTask = pdfjs.getDocument({ data: pdfData });
    const pdfDocument = await loadingTask.promise;
    const totalPages = pdfDocument.numPages;

    // Calculate the range of pages to load
    const startPage = Math.max(1, currentPage - 10);
    const endPage = Math.min(currentPage + 11, totalPages);

    for (let i = startPage; i <= endPage; i++) {
      if (!loadedPages.hasOwnProperty(i - 1)) {
        // i - 1 because loadedPages are 0-based
        const page = await pdfDocument.getPage(i);
        const imageBuffer = await renderPageToImage(page);
        imageBuffers[i] = imageBuffer;
      }
    }

    return { imageBuffers, totalPages };
  } catch (error) {
    console.error("Error converting PDF to images:", error);
    throw error;
  }
}

/**
 * Renders a single PDF page to an image buffer.
 *
 * @param {PDFPageProxy} page - The PDF.js page object.
 * @returns {Promise<Buffer>} The image as a buffer (PNG format with transparency).
 */
async function renderPageToImage(page) {
  try {
    const viewport = page.getViewport({ scale: 1.2 });

    const canvas = createCanvas(viewport.width, viewport.height);
    const context = canvas.getContext("2d");

    const renderContext = {
      canvasContext: context,
      viewport: viewport,
    };
    await page.render(renderContext).promise;

    // Process the image to remove white background
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    removeWhiteBackground(imageData);
    context.putImageData(imageData, 0, 0);
    return canvas.toDataURL("image/png");

    // const buffer = Buffer.from(
    //   canvas.toDataURL("image/png").split(",")[1],
    //   "base64"
    // );
    // return buffer;
  } catch (error) {
    console.error("Error rendering page to image:", error);
    throw error;
  }
}

/**
 * Removes white background from an image by making near-white pixels transparent.
 *
 * @param {ImageData} imageData - The image data object from the canvas.
 */
function removeWhiteBackground(imageData) {
  const { data } = imageData;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];

    // Check if the pixel is near white
    if (r > 240 && g > 240 && b > 240) {
      // Set alpha to 0 (make transparent)
      data[i + 3] = 0;
    }
  }
}
