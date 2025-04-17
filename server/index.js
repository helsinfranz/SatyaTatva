const fs = require("fs");
const path = require("path");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const compression = require("compression");

const TIMEOUT = 3 * 60 * 1000; // 3 minutes
const app = express();
const PORT = 3001;

app.set("trust proxy", 1); // Trust proxy headers
// Middleware
app.use(helmet());
app.use(express.json({ limit: "20kb" }));
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
  /* 👇 Note: These are only here for testing */
  "http://localhost:3000", // Test website
  "http://localhost:5000", // Build Website
  /* 👆 Note: These are only here for testing */
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
    if (res.writableEnded) return; // Stop if response is already ended

    const chunkArray = Array.from(chunk);

    // Add commas between chunks but not before the first chunk
    if (!firstChunk) {
      res.write(',');
    }
    res.write(chunkArray.join(','));
    firstChunk = false;
  });

  readStream.on('end', () => {
    if (!res.writableEnded) {
      res.write(']}}'); // Close JSON structure
      res.end();
    }
  });

  readStream.on('error', (err) => {
    console.error('Error reading file:', err);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Failed to read the PDF file' });
    } else {
      res.end();
    }
  });

  // Handle manual abort/timeout
  onAbort(() => {
    readStream.destroy();
    if (!res.writableEnded) {
      res.destroy(); // Force close response
    }
  });
}

// PDF Proxy API
app.post("/pdf_proxy", async (req, res) => {
  let abortFn = () => { };

  const timeout = setTimeout(() => {
    console.warn("Request timed out for /pdf_proxy");

    // Trigger abort logic
    abortFn();

    // Nothing else to do – res will be destroyed from inside streamPdfAsJson
  }, TIMEOUT); // 3 minutes

  res.on('close', () => {
    clearTimeout(timeout);
    abortFn(); // Stop streaming if user disconnects
  });

  const { pdfUrl } = req.body;

  // Validate input
  if (!pdfUrl || typeof pdfUrl !== "string") {
    clearTimeout(timeout);
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
    streamPdfAsJson(filePath, res, (fn) => {
      abortFn = fn;
    });
  } catch (error) {
    clearTimeout(timeout);
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
