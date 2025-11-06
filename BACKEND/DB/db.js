const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, unique: true, required: true }, // move unique here instead
  password: { type: String, required: true },
  role: { type: String, default: "user" },
  createdAt: { type: Date, default: Date.now }
});

//memory schema

const memorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel",
    required: true,
  },
  gameName: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  level: {
    type: Number,
    default: 1,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const userModel = mongoose.model("User", userSchema);
const memoryModel=mongoose.model("memory",memorySchema);

module.exports = { userModel,memoryModel };

