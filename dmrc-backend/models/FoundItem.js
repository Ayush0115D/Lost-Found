const mongoose = require("mongoose");

const foundItemSchema = new mongoose.Schema(
  {
    fullName: String,
    contactNumber: String,
    description: String,
    metroLine: String,
    station: String,
    place: String,
    image: String,
    reportId: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FoundItem", foundItemSchema);
