const mongoose = require("mongoose");

const lostItemSchema = new mongoose.Schema({
  fullName: String,
  contactNumber: String,
  description: String,
  metroLine: String,
  station: String,
  image: String,
});

module.exports = mongoose.model("LostItem", lostItemSchema);
