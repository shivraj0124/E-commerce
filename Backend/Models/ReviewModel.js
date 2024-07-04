const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema(
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      rating: { type: Number, required: true },
      title: { type: String, required: true },
      desc: { type: String, required: true },
    },
    { timestamps: true }
  );

  module.exports = mongoose.model("Review",reviewSchema)