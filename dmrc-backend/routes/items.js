const express = require('express');
const router = express.Router();
const multer = require('multer');
const Item = require('../models/Item');

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// POST Lost/Found Item
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { type, itemName, station, line, date, place } = req.body;
    const newItem = new Item({
      type,
      itemName,
      station,
      line,
      date,
      place,
      image: req.file ? `/uploads/${req.file.filename}` : null,
    });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ message: 'Error submitting item', error: err.message });
  }
});

// GET all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching items' });
  }
});

// PUT: Mark Claimed
router.put('/claim/:id', async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(
      req.params.id,
      { status: 'Claimed' },
      { new: true }
    );
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: 'Error claiming item' });
  }
});

// DELETE Item
router.delete('/:id', async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting item' });
  }
});

module.exports = router;
