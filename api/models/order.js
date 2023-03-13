const mongoose = require("mongoose");

const orderScheme = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  payment_details: {},
  payment_type: { type: String },
  amount: { type: String },
  server: { type: String },
  price: { type: Number },
  ingame_name: { type: String },
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
  youpay: {
    server: { type: String },
    quantity: { type: Number },
    character: { type: String },
  },
  youreceive: {
    server: { type: String },
    quantity: { type: Number },
    character: { type: String },
  },
  code: { type: String },
});

module.exports = mongoose.model("Order", orderScheme);
