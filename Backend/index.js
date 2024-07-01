const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
import product from './Models/Product'
import users from './Models/User'
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;
app.use(
  cors({
    origin: "*",
  })
);

app.post("/api/search", async (req, res) => {
  try {
    const { category, keyword } = req.body;
    console.log(category, keyword);
    res.send({
      status: true,
      message: `search term is ${category} , ${keyword}`,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: false,
      message: "Sent  failed",
    });
  }
});
const connectDB = async () => {
  try {
    const connection = mongoose.connect(MONGO_URL);
    console.log("MongoDB Connected Successfully");
  } catch (err) {
    console.log("MongoDB not connected", err);
  }
};
connectDB();
app.listen(PORT, console.log("Server is Running", PORT));
