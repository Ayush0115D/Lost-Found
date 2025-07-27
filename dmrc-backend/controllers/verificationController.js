const Verification = require("../models/Verification");
const { v4: uuidv4 } = require("uuid");

exports.submitVerification = async (req, res) => {
  try {
    const { fullName, mobileNumber, metroCardOrQR, notes } = req.body;
    const idProof = req.file ? req.file.filename : null;

    const verificationId = "VERI-" + uuidv4().slice(0, 8).toUpperCase();

    const verification = new Verification({
      fullName,
      mobileNumber,
      metroCardOrQR,
      notes,
      idProof,
      verificationId, 
    });

    await verification.save();
    res.status(201).json({
      message: "Verification submitted successfully",
      verificationId,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
