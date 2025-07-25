const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  type: { type: String, enum: ['Lost', 'Found'], required: true },
  itemName: { type: String, required: true },
  station: { type: String, required: true },
  line: { type: String },
  date: { type: String },
  place: { type: String },
  image: { type: String },
  status: { type: String, enum: ['Pending', 'Claimed'], default: 'Pending' },
}, { timestamps: true });

module.exports = mongoose.model('Item', itemSchema);
