const express = require("express");
const { memoryModel } = require("../DB/db");
const { userMiddleware } = require("../Middlewares/Middleware");
console.log("📁 Memory Router file executed");
const memoryRouter = express.Router();

memoryRouter.post("/save", userMiddleware, async (req, res) => {
  try {
    const { gameName, score, level } = req.body;

    if (!gameName || !score) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    await memoryModel.create({
      userId: req.userId,
      gameName,
      score,
      level,
    });

    res.json({ message: "Game data saved successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to save game data" });
  }
});

memoryRouter.get("/all", userMiddleware, async (req, res) => {
  try {
    const results = await memoryModel.find({ userId: req.userId }).sort({ date: -1 });
    res.json({ games: results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch data" });
  }
});

memoryRouter.get("/test", (req, res) => {
  res.send("Memory router is working ✅");
});

console.log("📤 Exporting memoryRouter");

module.exports = { memoryRouter };
