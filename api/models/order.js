const mongoose = require("mongoose");

const orderScheme = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  payment_details: {},
  payment_type: { type: String, required: true },
  amount: { type: String, required: true },
  server: { type: String, required: true },
  price: { type: Number, required: true },
  ingame_name: { type: String, required: true },
  status: { type: String },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
});

module.exports = mongoose.model("Order", orderScheme);
