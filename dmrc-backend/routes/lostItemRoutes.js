const express = require("express");
const router = express.Router();
const multer = require("multer");
const { createLostItem, getAllLostItems } = require("../controllers/lostItemController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

router.post("/", upload.single("image"), createLostItem);
router.get("/", getAllLostItems);  // <-- for admin panel

module.exports = router;
