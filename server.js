const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 5000;

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
  const imageUrl = `http://localhost:${PORT}/uploads/${req.file.filename}`;
  return res.json({ imageUrl });
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
