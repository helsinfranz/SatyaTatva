import fs from "fs/promises";
import path from "path";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { page, filePath } = req.body;

    const fullPath = path.join(process.cwd(), filePath);
    try {
      await fs.access(fullPath);

      const jsonData = await fs.readFile(fullPath, "utf8");
      const data = JSON.parse(jsonData);

      const pagesText = data[`page${page}`] || "";

      return page === 1
        ? res
            .status(200)
            .json({ totalPages: Object.keys(data).length, pagesText })
        : res.status(200).json({ pagesText });
    } catch (error) {
      console.error("Error reading data:", error);
      res.status(500).json({ error: "Failed to read data" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
