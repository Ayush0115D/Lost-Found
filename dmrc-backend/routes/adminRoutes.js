const express = require("express");
const router = express.Router();
const LostItem = require("../models/LostItem");
const FoundItem = require("../models/FoundItem");
const authMiddleware = require("../middlewares/authMiddleware");
const checkAdmin = require("../middlewares/checkAdmin");

// GET all items (lost + found)
router.get("/items", async (req, res) => {
  try {
    const lostItems = await LostItem.find();
    const foundItems = await FoundItem.find();
    const allItems = [...lostItems, ...foundItems];
    allItems.sort((a, b) => new Date(b.date) - new Date(a.date)); // sort by date DESC
    res.json(allItems);
  } catch (error) {
    res.status(500).json({ message: "Error fetching items" });
  }
});

// UPDATE status to "Claimed" (admin only)
router.put("/items/:id/claim", authMiddleware, checkAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const updatedLost = await LostItem.findByIdAndUpdate(id, { status: "Claimed" }, { new: true });
    const updatedFound = await FoundItem.findByIdAndUpdate(id, { status: "Claimed" }, { new: true });
    const updatedItem = updatedLost || updatedFound;

    if (!updatedItem) return res.status(404).json({ message: "Item not found" });

    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: "Error updating item status" });
  }
});

// DELETE item (admin only)
router.delete("/items/:id", authMiddleware, checkAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedLost = await LostItem.findByIdAndDelete(id);
    const deletedFound = await FoundItem.findByIdAndDelete(id);
    const deletedItem = deletedLost || deletedFound;

    if (!deletedItem) return res.status(404).json({ message: "Item not found" });

    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting item" });
  }
});

module.exports = router;
