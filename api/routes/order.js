const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const axios = require("axios");

const Order = require("../models/order");
const User = require("../models/user");

const checkAuth = require("../middleware/check-auth.js");

router.get("/", (req, res, next) => {
  Order.find()
    .populate({
      path: "product",
      select: "_id name price stock",
    })
    .populate({
      path: "customer",
      select: "_id username email firstname lastname",
    })
    .exec()
    .then((docs) => res.status(200).json(docs))
    .catch((err) => res.status(500).json({ error: err }));
});

router.get("/:orderId", (req, res, next) => {
  Order.find({ _id: req.params.orderId })
    .populate({
      path: "product",
      select: "_id name price stock",
    })
    .populate({
      path: "customer",
      select: "_id username email firstname lastname",
    })
    .exec()
    .then((doc) => {
      res.status(200).json(doc[0]);
    })
    .catch((err) => res.status(500).json({ error: err }));
});

router.post("/", (req, res, next) => {
  var data = JSON.stringify({
    pay_currency: "usdttrc20",
    pay_amount: req.body.price <= 50 ? req.body.price + 1 : req.body.price + 2,
    price_amount: req.body.price,
    price_currency: "usd",
  });

  var config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://api.nowpayments.io/v1/payment",
    headers: {
      "x-api-key": process.env.NOWPAYMENTS_API_KEY,
      "Content-Type": "application/json",
    },
    data: data,
  };

  if (req.body.payment_type === "usdt") {
    axios(config)
      .then((response) => {
        const order = new Order({
          _id: new mongoose.Types.ObjectId(),
          payment_details: {
            payment_id: response.data.payment_id,
            pay_address: response.data.pay_address,
          },
          payment_type: req.body.payment_type,
          amount: req.body.amount,
          server: req.body.server,
          price: req.body.price,
          product: req.body.product,
          ingame_name: req.body.ingame_name,
          customer: req.body.customer,
          status: "pending",
        });
        order
          .save()
          .then((result) => {
            User.findByIdAndUpdate(req.body.customer, {
              $push: { orders: result.id },
            })
              .then(() => {
                res.status(200).json({
                  message: "Order created",
                  payment_id: response.data.payment_id,
                  pay_address: response.data.pay_address,
                });
              })
              .catch((err) => res.status(404).json({ error: err }));
          })
          .catch((err) => res.status(500).json({ error: err }));
      })
      .catch((error) => {
        console.log(error);
      });
  } else if (req.body.payment_type === "cih") {
    const order = new Order({
      _id: new mongoose.Types.ObjectId(),
      payment_details: {
        cih_firstname: req.body.cih_firstname,
        cih_lastname: req.body.cih_lastname,
      },
      payment_type: req.body.payment_type,
      amount: req.body.amount,
      server: req.body.server,
      price: req.body.price,
      product: req.body.product,
      ingame_name: req.body.ingame_name,
      customer: req.body.customer,
      status: "pending",
    });
    order
      .save()
      .then((result) => {
        User.findByIdAndUpdate(req.body.customer, {
          $push: { orders: result.id },
        })
          .then(() => {
            res.status(200).json({
              message: "Order created",
            });
          })
          .catch((err) => res.status(404).json({ error: err }));
      })
      .catch((err) => res.status(500).json({ error: err }));
  }
});

module.exports = router;
