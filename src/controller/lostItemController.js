// controller/lostItemController.js
const { insertLostItem } = require("../models/lostItemModel");

const reportLostItem = (req, res) => {
  const itemData = req.body;

  insertLostItem(itemData, (err, result) => {
    if (err) {
      console.error("Error saving lost item:", err);
      return res.status(500).json({ error: "Failed to save lost item" });
    }
    res.status(200).json({ message: "Lost item reported successfully" });
  });
};

module.exports = { reportLostItem };
