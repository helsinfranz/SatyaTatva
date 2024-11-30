import * as pdfjsLib from "pdfjs-dist/webpack"; // Modern build
import path from "path";
import fs from "fs/promises";

pdfjsLib.GlobalWorkerOptions.workerSrc = path.join(
  "node_modules/pdfjs-dist/legacy/build/pdf.worker.min.js"
);

export default async function handler(req, res) {
  try {
    const { filePath, page } = req.body;

    // Load the PDF file
    const pdfData = await fs.readFile(filePath);
    const pdfDoc = await pdfjsLib.getDocument({ data: pdfData }).promise;

    // Fetch 5 pages (centered around the provided page)
    const startPage = Math.max(page - 2, 1);
    const endPage = Math.min(page + 2, pdfDoc.numPages);

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      const page = await pdfDoc.getPage(i);
      const viewport = page.getViewport({ scale: 1 });

      // Render the page to an in-memory canvas (Node.js requires `canvas`)
      const canvasFactory = new pdfjsLib.NodeCanvasFactory();
      const canvasAndContext = canvasFactory.create(
        viewport.width,
        viewport.height
      );
      await page.render({
        canvasContext: canvasAndContext.context,
        viewport: viewport,
        canvasFactory: canvasFactory,
      }).promise;

      const imageBuffer = canvasAndContext.canvas.toBuffer("image/png");
      pages.push({
        page: i,
        image: `data:image/png;base64,${imageBuffer.toString("base64")}`,
      });
    }

    // Return the rendered images
    res.status(200).json({ pages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
