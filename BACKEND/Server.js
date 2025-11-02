require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); 
const { UserRouter } = require("./ROUTES/User");
const config=require("./config");

const app = express();

//  Middleware
app.use(express.json());

//  Enable CORS for frontend
app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true, 
  })
);


app.use("/api/v1/user", UserRouter);


async function main() {
  try {
    await mongoose.connect(config.MONGO_URL);
    console.log(" Connected to MongoDB");

    app.listen(3000, () => {
      console.log(" Server running on port 3000");
    });
  } catch (err) {
    console.error(" Could not connect to database:", err.message);
  }
}

main();
