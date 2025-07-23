// routes/lostItemRoutes.js
const express = require("express");
const router = express.Router();
const { reportLostItem } = require("../controller/lostItemController");

router.post("/report-lost", reportLostItem);

module.exports = router;
