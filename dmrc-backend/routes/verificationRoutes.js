const express = require("express");
const router = express.Router();
const multer = require("multer");
const { submitVerification } = require("../controllers/verificationController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

router.post("/", upload.single("idProof"), submitVerification);

module.exports = router;
