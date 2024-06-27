const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  MRP: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    require: true,
  },
  images: {
    type: Array,
    required: true,
  },
  inventory: {
    type: Number,
    required: true,
  },
  desc: {
    type: Number,
    required: true,
  },
  features: {
    type: Number,
    required: true,
  },
  reviews: {
    type: [
      {
        user: {
          type: String,
          required: true,
        },
        stars: {
          type: Number,
          required: true,
        },
        desc: {
          type: String,
        },
      },
    ],
  },
});
const product = new mongoose.model("product", productSchema);

module.exports = product;
