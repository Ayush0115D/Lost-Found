// routes/verificationRoutes.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const LostItem = require("../models/LostItem");
const FoundItem = require("../models/FoundItem");

// Configure multer for ID Proof uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads/idproofs"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

/**
 * POST /api/verify
 * Handles: idProof (file) + all form fields
 * Checks for a match without saving verification
 */
router.post("/", upload.single("idProof"), async (req, res) => {
  try {
    const {
      reportId,
      fullName,
      contactNumber,
      metroCardOrQR,
      notes,
    } = req.body;

    // Trim inputs
    const cleanReportId = reportId?.trim();
    const cleanFullName = fullName?.trim();
    const cleanContactNumber = contactNumber?.trim();
    const cleanMetroCardOrQR = metroCardOrQR?.trim();
    const cleanNotes = notes?.trim();

    // Build case-insensitive match for fullName
    const query = {
      reportId: cleanReportId,
      fullName: { $regex: new RegExp(`^${cleanFullName}$`, "i") },
      contactNumber: cleanContactNumber,
      metroCardOrQR: cleanMetroCardOrQR,
    };

    // Search in both collections
    const lostMatch = await LostItem.findOne(query);
    const foundMatch = await FoundItem.findOne(query);

    if (lostMatch || foundMatch) {
      return res.json({
        success: true,
        message: "Item match found",
        match: lostMatch || foundMatch,
      });
    }

    return res.json({
      success: false,
      message: "No matching record found",
    });
  } catch (err) {
    console.error("Verification error:", err);
    res.status(500).json({
      success: false,
      message: "Server error during verification",
    });
  }
});

module.exports = router;
