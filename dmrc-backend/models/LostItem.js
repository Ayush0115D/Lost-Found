const mongoose = require("mongoose");

const lostItemSchema = new mongoose.Schema(
  {
    fullName: String,
    contactNumber: String,
    description: String,
    metroLine: String,
    station: String,
    metroCardOrQR: String, // Include metro card / QR
    image: String,
    reportId: {
      type: String,
      unique: true,
      required: true,
    },
    status: {
      type: String,
     enum: ["Pending", "Claimed", "Unclaimed"],
       default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("LostItem", lostItemSchema);
