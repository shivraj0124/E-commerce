const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema(
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      orderItems: [
        {
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
          },
          quantity: { type: Number, required: true },
          price: { type: Number, required: true },
        },
      ],
  
      paymentMethod: { type: String, required: true },
      paymentResult: {
        id: { type: String },
        status: { type: Boolean },
        update_time: { type: String },
        email_address: { type: String },
      },
      shippingAddress: {
        address: { type: String, required: true },
        city: { type: String,required:true },
        pinCode: { type: String,required:true },
        state: { type: String,required:true },
      },
  
      totalPrice: { type: Number, required: true },
      // isPaid: { type: Boolean, default: false },
      isDelivered: { type: Boolean, default: false },
      deliveredAt: { type: Date },
    },
    { timestamps: true }
  );

  module.exports = mongoose.model("Order", orderSchema);