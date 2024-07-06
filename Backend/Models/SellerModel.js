const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true, unique: true, length: 10 },
    password: { type: String, required: true, minlength: 8 },
    role: {
      type: String,
      default: "seller",
    },
    storeName: { type: String, required: true },
    storeDescription: { type: String, default: "" },
    storeAddress: {
      address: { type: String, default: "" },
      city: { type: String, default: "" },
      pinCode: { type: Number, default: null },
      state: { type: String, default: "" },
    },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Like" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Seller", sellerSchema);
