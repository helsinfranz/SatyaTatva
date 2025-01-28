import * as pdfjs from "pdfjs-dist/legacy/build/pdf.mjs";
import { createCanvas, ImageData } from "canvas";
import { fileSizes } from "./storage";

pdfjs.GlobalWorkerOptions.workerSrc = "/js/pdf.worker.min.mjs";

/**
 * Fetches and caches data using the Cache API.
 *
 * @param {string} url - The URL of the resource to fetch.
 * @param {Function} setProgress - A function to update the progress useState.
 * @returns {Promise<Object>} A promise that resolves to the fetched data.
 */
async function fetchAndCacheData(url, setProgress) {
  const cache = await caches.open("pdfCache");
  const cachedResponse = await cache.match(url);

  if (cachedResponse) {
    return await cachedResponse.json();
  }

  const cacheKeys = await cache.keys();
  if (cacheKeys.length >= 5) {
    const oldest = cacheKeys[0];
    await cache.delete(oldest);
  }

  setProgress(0);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/pdf_proxy`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pdfUrl: url }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch PDF file from the provided URL.");
  }

  // Get the file size from your fileSizes object
  let fileSizeInMB;

  for (const [unit, size] of Object.entries(fileSizes)) {
    if (url.includes(unit)) {
      fileSizeInMB = parseFloat(size.split("MB")[0]).toFixed(2);
    }
  }
  if (!fileSizeInMB) {
    throw new Error("File Size is missing.");
  }

  const totalBytes = fileSizeInMB * 1024 * 1024; // Convert MB to bytes

  const reader = response.body.getReader();
  let receivedLength = 0;
  let chunks = [];

  const progressInterval = setInterval(() => {
    const percentComplete = Math.round((receivedLength / (totalBytes * 2.97)) * 100); //The recived bytes are 3x the original size but download is just 1x.
    setProgress(percentComplete); // Update progress
  }, 100); // Update progress every 100ms

  const stream = new ReadableStream({
    start(controller) {
      // Read the stream progressively
      reader.read().then(function push({ done, value }) {
        if (done) {
          controller.close();
          clearInterval(progressInterval); // Stop progress once done
          return;
        }

        chunks.push(value); // Collect chunks
        receivedLength += value.length; // Update received length
        controller.enqueue(value); // Enqueue the chunk to the stream
        reader.read().then(push); // Continue reading the next chunk
      });
    },
  });

  // Cache the response progressively as chunks come in
  const cacheResponse = new Response(stream);
  await cache.put(url, cacheResponse.clone()); // Save to cache

  // Now create the final Blob from chunks and process it
  const blob = new Blob(chunks);
  const data = await blob.text();

  return JSON.parse(data);
}

/**
 * Processes a PDF file from a URL, converts specific pages to images, and caches results.
 *
 * @param {number} quality - The quality or scale of the image (1, 1.5, 2).
 * @param {string} pdfUrl - The URL to the PDF file.
 * @param {number} page - The current page number (1-based index).
 * @param {Object} loadedPages - An object containing keys of already loaded page numbers.
 * @returns {Promise<{ images: string[], totalPages: number }>} Encoded images and total pages.
 */
export async function processPdf(
  quality = 1,
  pdfUrl,
  page,
  loadedPages = {},
  setProgress
) {
  try {
    if (!pdfUrl || typeof page !== "number") {
      throw new Error("Invalid input. Provide a PDF URL and page number.");
    }

    // Fetch the PDF file using Cache API
    const data = await fetchAndCacheData(pdfUrl, setProgress);

    const pdfBuffer = data?.buffer?.data;

    // Determine the range of pages to fetch
    const { imageBuffers, totalPages } = await convertPdfToImages(
      pdfBuffer,
      page,
      loadedPages,
      quality
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
async function convertPdfToImages(
  pdfBuffer,
  currentPage,
  loadedPages,
  quality
) {
  try {
    const imageBuffers = {};
    const pdfData = new Uint8Array(pdfBuffer);
    const loadingTask = pdfjs.getDocument({ data: pdfData });
    const pdfDocument = await loadingTask.promise;
    const totalPages = pdfDocument.numPages;

    // Calculate the range of pages to load
    const startPage = Math.max(2, currentPage - 11);
    const endPage = Math.min(currentPage + 10, totalPages);

    for (let i = startPage; i <= endPage; i++) {
      if (
        Object.keys(loadedPages).length === 0 ||
        !loadedPages?.includes(i - 1)
      ) {
        // i - 1 because loadedPages are 0-based
        const page = await pdfDocument.getPage(i);
        const imageBuffer = await renderPageToImage(page, quality);
        imageBuffers[i - 1] = imageBuffer;
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
 * @param {number} quality - The quality or scale of the image (1, 1.5, 2).
 * @returns {Promise<Buffer>} The image as a buffer (PNG format with transparency).
 */
async function renderPageToImage(page, quality) {
  try {
    const viewport = page.getViewport({ scale: quality });

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
