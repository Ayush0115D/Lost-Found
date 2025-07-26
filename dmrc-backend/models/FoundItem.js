const mongoose = require("mongoose");

const foundItemSchema = new mongoose.Schema({
  fullName: String,
  contactNumber: String,
  description: String,
  metroLine: String,
  station: String,
  place: String,
  image: String,
});

module.exports = mongoose.model("FoundItem", foundItemSchema);
