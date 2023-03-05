const mongoose = require("mongoose");

const productScheme = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String },
  price: [
    {
      server: { type: String },
      price_usdt: { type: Number },
    },
  ],
  category: { type: String },
  stock: { type: Number },
  image: { type: String },
});

module.exports = mongoose.model("Product", productScheme);
