const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const lostRoutes = require("./routes/lostItemRoutes");
const foundRoutes = require("./routes/foundItemRoutes");
const verificationRoutes = require("./routes/verificationRoutes");
const adminRoutes = require("./routes/adminRoutes");
const homeRoutes = require("./routes/homeRoutes");

dotenv.config();
connectDB();

const app = express();

// ✅ CORS setup for local + production
const allowedOrigins = [
  "http://localhost:5173", // Vite dev
  "https://lost-found-dmrc.vercel.app/login" // Replace with your actual Vercel URL
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);

app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/lost-items", lostRoutes);
app.use("/api/found-items", foundRoutes);
app.use("/api/home", homeRoutes);
app.use("/api/verify", verificationRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
