const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    items: [
      {
        itemId: {
          type: String,
          required: true
        },
        quantity: {
          type: Number,
          default: 1,
        },
        _id: false,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
