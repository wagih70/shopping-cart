const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true }, 
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", ItemSchema);
