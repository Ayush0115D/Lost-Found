const LostItem = require("../models/LostItem");
const { v4: uuidv4 } = require("uuid");

exports.createLostItem = async (req, res) => {
  try {
    const {
      fullName,
      contactNumber,
      description,
      metroLine,
      station,
      metroCardOrQR, 
    } = req.body;

    const image = req.file ? req.file.filename : null;

    const reportId = "LOST-" + uuidv4().slice(0, 8).toUpperCase();

    const item = new LostItem({
      fullName,
      contactNumber,
      description,
      metroLine,
      station,
      metroCardOrQR,
      image,
      reportId,
    });

    await item.save();
    res.status(201).json({
      message: "Lost item reported successfully",
      reportId,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
