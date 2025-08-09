// ===== 1. UPDATED authController.js =====
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register (unchanged)
exports.registerUser = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user)
      return res.status(400).json({ message: "User already exists" });
    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ fullName, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// User Login - ONLY for regular users (no admin logic)
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid credentials" });
   
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });
   
    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.fullName, role: "user" },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );
   
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
      role: "user",
      redirect: "/"
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Admin Login - ONLY for admin users
exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if email is admin
    const isAdmin = email === "dhakreayush578@gmail.com" || email.endsWith("@dmrc.org");
    
    if (!isAdmin) {
      return res.status(403).json({ message: "Access denied. Admin credentials required." });
    }

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid admin credentials" });
   
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid admin credentials" });
   
    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.fullName, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );
   
    res.status(200).json({
      message: "Admin login successful",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
      role: "admin",
      redirect: "/admin"
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};