const mongoose = require("mongoose");

const exchangeScheme = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
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
});

module.exports = mongoose.model("Exchange", exchangeScheme);
