const express = require("express");
const router = express.Router();
const multer = require("multer");
const { submitVerification } = require("../controllers/verificationController");

// Configure multer for ID Proof uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/idproofs"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// POST /api/verify
router.post("/", upload.single("idProof"), submitVerification);

module.exports = router;
