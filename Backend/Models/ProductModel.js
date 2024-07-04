const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
    {
      name: { type: String, required: true },
      description: { type: String, required: true },
      price: { type: Number, required: true },
      category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
      brand: { type: String, required: true },
      stock: { type: Number, required: true },
      discount: { type: Number, default: 0 },
      ratings: { type: Number, default: 0 },
      numReviews: { type: Number, default: 0 },
      images: [{ type: String, required: true }],
      likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Like" }],
      reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
    },
    { timestamps: true }
  );

  module.exports = mongoose.model("Product",productSchema)