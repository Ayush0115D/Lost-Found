const FoundItem = require("../models/FoundItem");
const { v4: uuidv4 } = require("uuid");

exports.createFoundItem = async (req, res) => {
  try {
    const {
      fullName,
      contactNumber,
      description,
      metroLine,
      station,
      place,
      metroCardOrQR, 
    } = req.body;

    const image = req.file ? req.file.filename : null;

    const reportId = "FOUND-" + uuidv4().slice(0, 8).toUpperCase();

    const item = new FoundItem({
      fullName,
      contactNumber,
      description,
      metroLine,
      station,
      place,
      metroCardOrQR, 
      image,
      reportId,
    });

    await item.save();
    res.status(201).json({
      message: "Found item reported successfully",
      reportId,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
