const express = require("express");
const fs = require("fs");
const path = require("path");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");

const app = express();
const PORT = 3001;

app.set("trust proxy", 1); // Trust proxy headers
// Middleware
app.use(helmet());
app.use(express.json());
app.use(compression());

// Rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30, // Limit each IP to 30 requests per window
  message: "Too many requests, please try again later.",
});
app.use(limiter);

// CORS to allow only specific domains
const allowedOrigins = [
  "http://localhost:3000", // Test website
  "http://localhost:5000", // Build Website
  "https://satyatatva.com", // Production Website
  "https://www.satyatatva.com", // Production Website
];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

// Logging middleware (morgan)
app.use(
  morgan("combined", {
    skip: () => false, // Logs all requests
  })
);

function streamPdfAsJson(filePath, res) {
  res.setHeader('Content-Type', 'application/json');
  res.write('{"buffer":{"type":"Buffer","data":['); // Start JSON structure

  const readStream = fs.createReadStream(filePath);
  let firstChunk = true;

  readStream.on('data', (chunk) => {
    const chunkArray = Array.from(chunk);

    // Add commas between chunks but not before the first chunk
    if (!firstChunk) {
      res.write(',');
    }
    res.write(chunkArray.join(','));
    firstChunk = false;
  });

  readStream.on('end', () => {
    res.write(']}}'); // Close JSON structure
    res.end();
  });

  readStream.on('error', (err) => {
    console.error('Error reading file:', err);
    res.status(500).json({ error: 'Failed to read the PDF file' });
  });
}

// PDF Proxy API
app.post("/pdf_proxy", async (req, res) => {
  const { pdfUrl } = req.body;

  // Validate input
  if (!pdfUrl || typeof pdfUrl !== "string") {
    return res.status(400).send("A valid PDF URL is required");
  }

  /* --> Do Not Change, As this is the implementation for localhost 👇 <-- */

  // const filePath = path.join(__dirname, "Books_PDFs", pdfUrl);
  // Note: Above one is the real pdf file's path

  // Note: Below one is the dummy pdf file's path
  const filePath = path.join(
    __dirname,
    "Books_PDFs",
    "Dummy/DummyTest-english.pdf"
  );

  /* --> Do Not Change, As this is the implementation for localhost 👆 <-- */

  try {
    streamPdfAsJson(filePath, res);
  } catch (error) {
    if (error.code === "ENOENT") {
      return res.status(404).send("File not found");
    }
    console.error("Error reading file:", error.message);
    return res.status(500).send("Failed to read the file.");
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`SatyaTatva Server Running...`);
});
