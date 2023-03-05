const mongoose = require("mongoose");
const moment = require("moment");

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: {
    type: String,
    required: true,
    unique: true,
    match:
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  firstname: { type: String, require: true },
  lastname: { type: String, require: true },
  phone: { type: String, require: true },
  role: { type: String, unique: true },
  verified: { type: Boolean, required: true },
  password: { type: String, required: true },
  // avatar: { type: String },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
  createdAt: {
    type: Date,
    default: () => moment().utc(),
  },
  confirmationCode: {
    type: String,
    unique: true,
  },
});

module.exports = mongoose.model("User", userSchema);
