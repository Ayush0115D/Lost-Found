// controllers/verificationController.js
const Verification = require("../models/Verification");
const LostItem = require("../models/LostItem");
const FoundItem = require("../models/FoundItem");
const { v4: uuidv4 } = require("uuid");
/**
 * Submit verification request
 * Matches a user-submitted verification against lost/found item reports.
 */
exports.submitVerification = async (req, res) => {
  try {
    const {
      reportId,
      fullName,
      contactNumber,
      metroCardOrQR,
      notes
    } = req.body;

    // Uploaded ID proof file name
    const idProof = req.file ? req.file.filename : null;

    // Validate required fields
    if (!reportId || !fullName || !contactNumber || !metroCardOrQR || !idProof) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    console.log("---- DEBUG START ----");
    console.log("Request body:", req.body);

    // Generate short verification ID
    const verificationId = "VERI-" + uuidv4().slice(0, 8).toUpperCase();

    // Save verification submission in DB
    const verification = new Verification({
      fullName,
      contactNumber,
      metroCardOrQR,
      notes,
      idProof,
      verificationId,
    });
    await verification.save();

    // Flexible matching query (case-insensitive for names & card/QR)
    const matchQuery = {
      reportId: reportId.trim(),
      contactNumber: contactNumber.trim(),
      fullName: { $regex: new RegExp(`^${fullName.trim()}$`, "i") },
      metroCardOrQR: { $regex: new RegExp(`^${metroCardOrQR.trim()}$`, "i") },
    };

    console.log("Match query:", matchQuery);

    // Search in LostItem and FoundItem collections
    const lostMatch = await LostItem.findOne(matchQuery);
    console.log("LostItem found:", lostMatch);

    const foundMatch = await FoundItem.findOne(matchQuery);
    console.log("FoundItem found:", foundMatch);

    console.log("---- DEBUG END ----");

    // Determine if match found
    const matchedItem = lostMatch || foundMatch;

    if (matchedItem) {
      return res.status(200).json({
        success: true,
        message: "Verification successful. Your details matched with the reported item.",
        verificationId,
        matchedItem,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Verification failed. No item matched with the provided details.",
        verificationId,
      });
    }
  } catch (err) {
    console.error("Error submitting verification:", err.message);
    return res.status(500).json({
      success: false,
      error: "Server error while submitting verification.",
    });
  }
};
