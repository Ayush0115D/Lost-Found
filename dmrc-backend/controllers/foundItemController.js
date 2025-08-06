const FoundItem = require("../models/FoundItem");
const { v4: uuidv4 } = require("uuid");

// CREATE Found Item
exports.createFoundItem = async (req, res) => {
  try {
    const {
      itemDescription,
      station,
      date,
      metroCardOrQR,
      place,
    } = req.body;

    const reportId = "FOUND-" + uuidv4().slice(0, 8).toUpperCase();

    // ✅ Save file to 'image' field as defined in schema
    const image = req.file ? req.file.path : "";

    const item = new FoundItem({
      itemDescription,
      station,
      place,
      date: date || new Date(),
      metroCardOrQR,
      image,
      reportId,
      status: "Unclaimed",
    });

    await item.save();

    res.status(201).json({
      message: "Found item submitted successfully",
      reportId,
    });
  } catch (err) {
    console.error("Error saving found item:", err);
    res.status(500).json({ error: err.message });
  }
};

// ✅ GET All Found Items (for admin panel)
exports.getAllFoundItems = async (req, res) => {
  try {
    const items = await FoundItem.find().sort({ date: -1 });
    res.status(200).json(items);
  } catch (err) {
    console.error("Error fetching found items:", err);
    res.status(500).json({ error: err.message });
  }
};
