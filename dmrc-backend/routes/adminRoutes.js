const express = require("express");
const router = express.Router();
const LostItem = require("../models/LostItem");
const FoundItem = require("../models/FoundItem");
const authMiddleware = require("../middlewares/authMiddleware");
const checkAdmin = require("../middlewares/checkAdmin");

// GET /admin/items
router.get("/items", async (req, res) => {
  try {
    const lostItems = await LostItem.find();
    const foundItems = await FoundItem.find();

    // Format Lost Items
    const formattedLost = lostItems.map((item) => ({
      id: item._id,
      image: item.image || "",
      itemName: item.description || "",  // maps to itemName
      station: item.station,
      date: item.createdAt || item.date,
      type: "Lost Item",
      status: item.status || "Pending",
      metroCardOrQR: item.metroCardOrQR || "N/A",  // 🆕
      place: "N/A", // Not applicable for lost items 🆕
    }));

    // Format Found Items
    const formattedFound = foundItems.map((item) => ({
      id: item._id,
      image: item.image || "",
      itemName: item.description || "", // maps to itemName
      station: item.station,
      date: item.createdAt || item.date,
      type: "Found Item",
      status: item.status || "Pending",
      metroCardOrQR: item.metroCardOrQR || "N/A", // 🆕
      place: item.place || "N/A", // 🆕 only for found
    }));

    const allItems = [...formattedLost, ...formattedFound].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    res.json(allItems);
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ message: "Error fetching items" });
  }
});

// ✅ UPDATE status to "Claimed"
router.put("/items/:id/claim", authMiddleware, checkAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const updatedLost = await LostItem.findByIdAndUpdate(
      id,
      { status: "Claimed" },
      { new: true }
    );

    const updatedFound = await FoundItem.findByIdAndUpdate(
      id,
      { status: "Claimed" },
      { new: true }
    );

    const updatedItem = updatedLost || updatedFound;
    if (!updatedItem) return res.status(404).json({ message: "Item not found" });

    res.json({
      id: updatedItem._id,
      image: updatedItem.image || "",
      itemName: updatedItem.itemName,
      station: updatedItem.station,
      date: updatedItem.date,
      type: updatedLost ? "Lost Item" : "Found Item",
      status: updatedItem.status,
    });
  } catch (error) {
    console.error("Error updating item status:", error);
    res.status(500).json({ message: "Error updating item status" });
  }
});

// ✅ DELETE item
router.delete("/items/:id", authMiddleware, checkAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const deletedLost = await LostItem.findByIdAndDelete(id);
    const deletedFound = await FoundItem.findByIdAndDelete(id);
    const deletedItem = deletedLost || deletedFound;

    if (!deletedItem) return res.status(404).json({ message: "Item not found" });

    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({ message: "Error deleting item" });
  }
});

module.exports = router;
