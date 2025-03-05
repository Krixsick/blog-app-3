const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Use CORS if you're making cross-origin requests during development
app.use(cors());

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB);
    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error);
  }
};

const blogRoutes = require("./routes/blog");
app.use("/api", blogRoutes);

const indexRoutes = require("./routes/index");
app.use("/backend", indexRoutes); // This will handle requests to '/'

const startServer = async () => {
  await connectDB();
  app.listen(5001, () => {
    console.log("Server running on port 5001");
  });
};

startServer();
module.exports = connectDB;
