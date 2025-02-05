const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;
const upload_dir=process.env.UPLOADS_DIR;
app.use(cors()); // Allow requests from frontend
app.use(express.static("public")); // Serve uploaded images
app.use("/uploads", express.static("public/uploads"));

// Configure Multer storage for image uploads
const storage = multer.diskStorage({
  destination: "./public/uploads/", // Save images in 'public/uploads/'
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage });

// API Route to handle image uploads
app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  const imageUrl = req.file.filename;
  return res.json({ imageUrl });
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
