const mongoose = require("mongoose");
const likeSchema = new mongoose.Schema(
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    },
    { timestamps: true }
  );

  module.exports = mongoose.model("Like",likeSchema)