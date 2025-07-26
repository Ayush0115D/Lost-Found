const LostItem = require("../models/LostItem");

exports.createLostItem = async (req, res) => {
  try {
    const { fullName, contactNumber, description, metroLine, station } = req.body;
    const image = req.file ? req.file.filename : null;

    const item = new LostItem({
      fullName, contactNumber, description, metroLine, station, image
    });

    await item.save();
    res.status(201).json({ message: "Lost item reported", item });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
