require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("./config");
const { UserRouter } = require("./ROUTES/User");
const { memoryRouter } = require("./ROUTES/Memory");
console.log("🧩 Memory router loaded:", !!memoryRouter);


const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Routes
app.use("/api/v1/user", UserRouter);
app.use("/api/v1/memory", memoryRouter);

app.get("/", (req, res) => {
  res.send("Server is running ✅");
});

// MongoDB Connection + Server Start
async function main() {
  try {
    await mongoose.connect(config.MONGO_URL);
    console.log("✅ Connected to MongoDB");

    app.listen(config.PORT || 3000, () => {
      console.log(`🚀 Server running on port ${config.PORT || 3000}`);
    });
  } catch (err) {
    console.error("❌ Could not connect to database:", err.message);
  }
}

main();
