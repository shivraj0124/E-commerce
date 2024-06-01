const express = require("express")
const cors = require("cors")
const app = express()
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose")

const PORT = process.env.PORT || 5000;
const MONGO_URL= process.env.MONGO_URL
app.use(cors({
    origin: "*"
  }))
  
const connectDB = async () => {
    try {
      const connection = mongoose.connect(MONGO_URL);
      console.log("MongoDB Connected Successfully");
    } catch (err) {
      console.log("MongoDB not connected", err);
    }
  };
connectDB()
app.listen(PORT,console.log("Server is Running",PORT))