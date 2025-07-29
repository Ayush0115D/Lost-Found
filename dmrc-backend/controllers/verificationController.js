const Verification = require("../models/Verification");
const LostItem = require("../models/LostItem");
const FoundItem = require("../models/FoundItem");
const { v4: uuidv4 } = require("uuid");

exports.submitVerification = async (req, res) => {
  try {
    const {
      reportId,
      fullName,
      mobileNumber,
      metroCardOrQR,
      notes
    } = req.body;

    const idProof = req.file ? req.file.filename : null;

    if (!reportId || !fullName || !mobileNumber || !metroCardOrQR || !idProof) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Generate short verification ID
    const verificationId = "VERI-" + uuidv4().slice(0, 8).toUpperCase();

    // Save verification submission
    const verification = new Verification({
      fullName,
      mobileNumber,
      metroCardOrQR,
      notes,
      idProof,
      verificationId,
    });
    await verification.save();

    // Try matching the report in Lost or Found items
    const matchedItem =
      (await LostItem.findOne({ reportId, fullName, contactNumber: mobileNumber, metroCardOrQR })) ||
      (await FoundItem.findOne({ reportId, fullName, contactNumber: mobileNumber, metroCardOrQR }));

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
