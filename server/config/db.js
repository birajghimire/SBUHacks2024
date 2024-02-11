const mongoose = require("mongoose");

async function connectDB() {
  try {
    console.log(process.env.MONGO_URI);
    const connect = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB connected: ${connect.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

module.exports = connectDB;
