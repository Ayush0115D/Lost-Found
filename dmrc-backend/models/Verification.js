const mongoose = require("mongoose");

const verificationSchema = new mongoose.Schema(
  {
    fullName: String,
    mobileNumber: String,
    metroCardOrQR: String,
    idProof: String,
    notes: String,
    verificationId: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Verification", verificationSchema);
