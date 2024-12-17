const fs = require("fs/promises");
const path = require("path");

export const config = {
  api: {
    responseLimit: false,
  },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { pdfUrl } = req.body;

    if (!pdfUrl) {
      return res.status(400).send("PDF URL is required");
    }

    const filePath = path.join(`Books_PDFs/${pdfUrl}`);

    const pdfBuffer = await fs.readFile(filePath);

    return res.status(200).send({ buffer: pdfBuffer });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
