const mongoose = require("mongoose");

const lostItemSchema = new mongoose.Schema(
  {
    fullName: String,
    contactNumber: String,
    description: String,
    metroLine: String,
    station: String,
    image: String,
    reportId: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("LostItem", lostItemSchema);
