const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true, unique: true ,length:10},
    password: { type: String, required: true,minlength:8 },
    role: {
      type: String,
      required:true,
    },
    shippingAddress: {
      address: { type: String ,default:''},
      city: { type: String ,default:''},
      pinCode: { type: Number,default:null },
      state: { type: String,default:'' },
    },
    cart: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product"},
        quantity: { type: Number},
      },
    ],
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Like" }],
    // Seller specific fields
    storeName: { type: String },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
