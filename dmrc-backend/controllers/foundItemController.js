const FoundItem = require("../models/FoundItem");

exports.createFoundItem = async (req, res) => {
  try {
    const { fullName, contactNumber, description, metroLine, station, place } = req.body;
    const image = req.file ? req.file.filename : null;

    const item = new FoundItem({
      fullName, contactNumber, description, metroLine, station, place, image
    });

    await item.save();
    res.status(201).json({ message: "Found item reported", item });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
