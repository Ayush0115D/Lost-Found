// models/lostItemModel.js
const db = require("../db");

const insertLostItem = (itemData, callback) => {
  const query = `
    INSERT INTO lost_items (name, phone, description, metro_line, station, image_url)
    VALUES (?, ?, ?, ?, ?, ?)`;

  const values = [
    itemData.name,
    itemData.phone,
    itemData.description,
    itemData.metro_line,
    itemData.station,
    itemData.image_url
  ];

  db.query(query, values, callback);
};

module.exports = { insertLostItem };
