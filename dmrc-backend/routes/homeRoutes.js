const express = require("express");
const router = express.Router();
const { getHomepageItems } = require("../controllers/homeController");

router.get("/", getHomepageItems); // GET /api/home

module.exports = router;
