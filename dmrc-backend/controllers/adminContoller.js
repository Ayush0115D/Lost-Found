const LostItem = require("../models/LostItem");
const FoundItem = require("../models/FoundItem");

const getAllItems = async (req, res) => {
  try {
    const lostItems = await LostItem.find();
    const foundItems = await FoundItem.find();

    const formattedLostItems = lostItems.map(item => ({
      id: item._id,
      image: item.imageUrl,
       itemDescription : item.itemDescription,
      station: item.station,
      date: item.date,
      type: "Lost",
      status: item.status,
      metroCardOrQR: item.metroCardOrQR,
      place: "", // not applicable for lost items
    }));

    const formattedFoundItems = foundItems.map(item => ({
      id: item._id,
      image: item.imageUrl,
       itemDescription : item.itemDescription,
      station: item.station,
      date: item.date,
      type: "Found",
      status: item.status,
      metroCardOrQR: item.metroCardOrQR,
      place: item.place, // only found items have place
    }));

    const allItems = [...formattedLostItems, ...formattedFoundItems];
    res.status(200).json(allItems);
  } catch (err) {
    console.error("Admin fetch error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getAllItems };
