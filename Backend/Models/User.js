const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  favourites: {
    type: [Schema.Types.ObjectId],
  },
  cart: {
    type: [Schema.Types.ObjectId],
  },
  address: {
    type: String,
  },
  shopping_history: {
    type: [
      {
        productName: {
          type: String,
          required: true,
        },
        date: {
          type: Date,
          required: true,
          default: Date.now,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    default: [],
  },
});

const user = mongoose.model("users", userSchema);

module.exports = user;
