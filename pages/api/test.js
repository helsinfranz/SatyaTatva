import fs from "fs";
import * as pdfjs from "pdfjs-dist/legacy/build/pdf.mjs";
import { Canvas } from "canvas";

export default async function handler(req, res) {
  try {
    const { filePath, page } = req.body;

    if (!filePath || !page || typeof page !== "number") {
      return res
        .status(400)
        .json({ error: "Invalid input. Provide filePath and page." });
    }

    // Read the PDF file into a Buffer
    const pdfBuffer = fs.readFileSync(`./public/book/${filePath}`);

    // Convert the PDF to images for the specified range
    const imageBuffers = await convertPdfToImages(pdfBuffer, page);

    // Encode the image buffers to Base64
    const encodedImages = imageBuffers.map((buffer) =>
      buffer.toString("base64")
    );

    // Send the encoded images as JSON
    return res.status(200).json({ images: encodedImages });

    // Send the images as a response
    // return res.status(200).json({ images: imageBuffers });
  } catch (error) {
    console.error("Error in handler:", error);
    return res.status(500).json({ error: "Failed to process PDF" });
  }
}

/**
 * Converts a range of PDF pages to image buffers.
 *
 * @param {Buffer} pdfBuffer - The PDF file as a buffer.
 * @param {number} startPage - The starting page number (1-based index).
 * @returns {Promise<Buffer[]>} An array of image buffers (JPEG format).
 */
async function convertPdfToImages(pdfBuffer, startPage) {
  try {
    const imageBuffers = [];

    // Convert the Buffer to a Uint8Array
    const pdfData = new Uint8Array(pdfBuffer);

    // Load the original PDF using pdf.js
    const loadingTask = pdfjs.getDocument({ data: pdfData });
    const pdfDocument = await loadingTask.promise;

    const totalPages = pdfDocument.numPages;

    // Limit the range of pages (5 pages from the startPage or until the last page)
    const endPage = Math.min(startPage + 4, totalPages);

    for (let i = startPage; i <= endPage; i++) {
      const page = await pdfDocument.getPage(i);

      // Render the page as an image buffer
      const imageBuffer = await renderPageToImage(page);

      imageBuffers.push(imageBuffer);
    }

    return imageBuffers;
  } catch (error) {
    console.error("Error converting PDF to images:", error);
    throw error;
  }
}

/**
 * Renders a single PDF page to an image buffer.
 *
 * @param {PDFPageProxy} page - The PDF.js page object.
 * @returns {Promise<Buffer>} The image as a buffer (JPEG format).
 */
async function renderPageToImage(page) {
  try {
    const viewport = page.getViewport({ scale: 1.2 });

    const canvas = new Canvas(viewport.width, viewport.height);
    const context = canvas.getContext("2d");

    const renderContext = {
      canvasContext: context,
      viewport: viewport,
    };
    await page.render(renderContext).promise;

    return canvas.toBuffer("image/jpeg");
  } catch (error) {
    console.error("Error rendering page to image:", error);
    throw error;
  }
}
