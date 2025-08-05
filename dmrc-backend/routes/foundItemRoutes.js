const express = require("express");
const router = express.Router();
const multer = require("multer");
const { createFoundItem, getAllFoundItems } = require("../controllers/foundItemController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

router.post("/", upload.single("image"), createFoundItem);
router.get("/", getAllFoundItems);  // <-- for admin panel

module.exports = router;
