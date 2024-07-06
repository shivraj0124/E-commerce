const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

// Routes
const authRoutes = require("./Routes/AuthRoutes");
const adminRoutes = require("./Routes/AdminRoutes");
// const userRoutes = require("./Routes/UserRoutes")
const sellerRoutes = require("./Routes/SellerRoutes")

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
    const connection = mongoose.connect(MONGO_URL, {
      serverSelectionTimeoutMS: 30000
    });
    console.log("MongoDB Connected Successfully");
  } catch (err) {
    console.log("MongoDB not connected", err);
  }
};
connectDB();

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/admin", adminRoutes);
// app.use("/api/v1/user",userRoutes)
app.use("/api/v1/seller",sellerRoutes)
app.listen(PORT, console.log("Server is Running", PORT));
