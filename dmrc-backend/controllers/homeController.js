const LostItem = require("../models/LostItem");
const FoundItem = require("../models/FoundItem");

exports.getHomepageItems = async (req, res) => {
  try {
    const lostItems = await LostItem.find().sort({ _id: -1 }).limit(10); // latest 10
    const foundItems = await FoundItem.find().sort({ _id: -1 }).limit(10); // latest 10

    res.status(200).json({ lostItems, foundItems });
  } catch (err) {
    res.status(500).json({ error: "Failed to load homepage items" });
  }
};
