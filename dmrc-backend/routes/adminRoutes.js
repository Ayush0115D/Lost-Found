const express = require("express");
const router = express.Router();
const LostItem = require("../models/LostItem");
const FoundItem = require("../models/FoundItem");
const authMiddleware = require("../middlewares/authMiddleware");
const checkAdmin = require("../middlewares/checkAdmin");

// ✅ GET /api/admin/items - Fetch and format all items
router.get("/items", async (req, res) => {
  try {
    const lostItems = await LostItem.find();
    const foundItems = await FoundItem.find();

    // Format Lost Items
    const formattedLost = lostItems.map((item) => ({
      id: item._id,
       image: item.image ? `http://localhost:5000/${item.image}` : "",
      itemDescription: item.itemDescription || "",
      station: item.station,
      date: item.createdAt || item.date,
      type: "Lost Item",
      status: item.status || "Unclaimed",
      metroCardOrQR: item.metroCardOrQR || "N/A",
      place: "N/A", // Lost items don't have a 'place' field
        reportId: item.reportId, 
    }));

    // Format Found Items
    const formattedFound = foundItems.map((item) => ({
      id: item._id,
       image: item.image ? `http://localhost:5000/${item.image}` : "",
      itemDescription: item.itemDescription || "",
      station: item.station,
      date: item.createdAt || item.date,
      type: "Found Item",
      status: item.status || "Unclaimed",
      metroCardOrQR: item.metroCardOrQR || "N/A",
      place: item.place || "N/A", // Only for found items
        reportId: item.reportId, 
    }));

    const allItems = [...formattedLost, ...formattedFound].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    res.json(allItems); // ✅ Send final merged JSON list
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ message: "Error fetching items" });
  }
});

// ✅ PUT /api/admin/items/:id/claim - Mark item as claimed
router.put("/items/:id/claim", authMiddleware, checkAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    // Try updating in LostItem
    let updatedItem = await LostItem.findByIdAndUpdate(
      id,
      { status: "Claimed" },
      { new: true }
    );

    let type = "Lost Item";

    // If not found in LostItem, try FoundItem
    if (!updatedItem) {
      updatedItem = await FoundItem.findByIdAndUpdate(
        id,
        { status: "Claimed" },
        { new: true }
      );
      type = "Found Item";
    }

    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json({
      id: updatedItem._id,
      image: updatedItem.imageUrl || "",
      itemDescription: updatedItem.itemDescription || "",
      station: updatedItem.station,
      date: updatedItem.date,
      type,
      status: updatedItem.status,
      metroCardOrQR: updatedItem.metroCardOrQR || "N/A",
      place: type === "Found Item" ? updatedItem.place || "N/A" : "N/A",
    });
  } catch (error) {
    console.error("Error updating item status:", error);
    res.status(500).json({ message: "Error updating item status" });
  }
});

// ✅ DELETE /api/admin/items/:id - Delete item
router.delete("/items/:id", authMiddleware, checkAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const deletedLost = await LostItem.findByIdAndDelete(id);
    const deletedFound = await FoundItem.findByIdAndDelete(id);
    const deletedItem = deletedLost || deletedFound;

    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({ message: "Error deleting item" });
  }
});

module.exports = router;
