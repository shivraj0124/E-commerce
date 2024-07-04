const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    keyword: [{ type: String, required: true }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
