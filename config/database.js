const mongoose = require('mongoose');
require("dotenv").config();

const MONGODB_URL = process.env.MONGODB_URL;
console.log("MONGO URI:", MONGODB_URL);

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log("DB Connected Successfully...");
  } catch (error) {
    // process.exit(1); // Exit process with failure
    console.error("DB Connection Error:", error.message);
    throw new Error(`DB Connection Failed: ${error}`);
  }
};


module.exports = { connectDB };
