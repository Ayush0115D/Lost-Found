// ===== 2. UPDATED authRoutes.js =====
const express = require("express");
const router = express.Router();
const { registerUser, loginUser, loginAdmin } = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);           // For regular users
router.post("/admin-login", loginAdmin);    // For admin users

module.exports = router;