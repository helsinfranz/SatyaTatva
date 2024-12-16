import fetch from "node-fetch";

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

    // const fs = require("fs/promises");
    // const path = require("path");

    // const filePath = path.join(__dirname, 'pdfs', pdfUrl);

    // const pdfBuffer = await fs.readFile(filePath);
    const response = await fetch(`http://localhost:4000${pdfUrl}`);
    const pdfBuffer = await response.buffer();

    return res.status(200).send({ buffer: pdfBuffer });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
