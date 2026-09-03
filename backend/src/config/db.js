const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI;
    await mongoose.connect(MONGO_URI);
    console.log("DB connected successfully")
  } 
  catch (err) {
    console.log("Error connecting to DB");
    process.exit(1);
  }
};

module.exports = connectDB;
