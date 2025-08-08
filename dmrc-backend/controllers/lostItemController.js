const LostItem = require("../models/LostItem");
const { v4: uuidv4 } = require("uuid");

// CREATE Lost Item
exports.createLostItem = async (req, res) => {
  try {
    const {
      fullName,
      contactNumber,
      itemDescription,
      station,
      date,
      metroCardOrQR,
    } = req.body;

    const reportId = "LOST-" + uuidv4().slice(0, 8).toUpperCase();
    const image = req.file ? req.file.path : "";

    const item = new LostItem({
      fullName,
      contactNumber,
      itemDescription,
      station,
      date: date || new Date(),
      metroCardOrQR,
      image,
      reportId,
      status: "Unclaimed",
    });

    await item.save();

    res.status(201).json({
      message: "Lost item reported successfully",
      reportId,
    });
  } catch (err) {
    console.error("Error saving lost item:", err);
    res.status(500).json({ error: err.message });
  }
};

// GET All Lost Items (for admin panel)
exports.getAllLostItems = async (req, res) => {
  try {
    const items = await LostItem.find().sort({ date: -1 });
    res.status(200).json(items);
  } catch (err) {
    console.error("Error fetching lost items:", err);
    res.status(500).json({ error: err.message });
  }
};
