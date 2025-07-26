const Verification = require("../models/Verification");

exports.submitVerification = async (req, res) => {
  try {
    const { fullName, mobileNumber, metroCardOrQR, notes } = req.body;
    const idProof = req.file ? req.file.filename : null;

    const verification = new Verification({
      fullName, mobileNumber, metroCardOrQR, notes, idProof
    });

    await verification.save();
    res.status(201).json({ message: "Verification submitted", verification });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
