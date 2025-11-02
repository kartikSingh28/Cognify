require("dotenv").config();

const config = {
  MONGO_URL: process.env.MONGO_URL,
  JWT_USER_SECRET: process.env.JWT_USER_SECRET,
  PORT: process.env.PORT || 3000,
};

module.exports = config;
