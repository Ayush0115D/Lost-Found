const mongoose = require("mongoose");

const verificationSchema = new mongoose.Schema({
  fullName: String,
  mobileNumber: String,
  metroCardOrQR: String,
  idProof: String,
  notes: String,
});

module.exports = mongoose.model("Verification", verificationSchema);
