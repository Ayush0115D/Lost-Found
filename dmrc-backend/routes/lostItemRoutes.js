const express = require("express");
const router = express.Router();
const multer = require("multer");
const { createLostItem } = require("../controllers/lostItemController");

// File Upload Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

router.post("/", upload.single("image"), createLostItem);

module.exports = router;
