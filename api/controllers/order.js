const mongoose = require("mongoose");
const axios = require("axios");
const Order = require("../models/order");
const User = require("../models/user");

exports.getOrders = (req, res, next) => {
  Order.find()
    .populate({
      path: "product",
      select: "_id name price stock category",
    })
    .populate({
      path: "customer",
      select: "_id username email firstname lastname phone",
    })
    .exec()
    .then((docs) => res.status(200).json(docs))
    .catch((err) => res.status(500).json({ error: err }));
};

exports.getOrder = (req, res, next) => {
  Order.find({ _id: req.params.orderId })
    .populate({
      path: "product",
      select: "_id name price stock category",
    })
    .populate({
      path: "customer",
      select: "_id username email firstname lastname phone",
    })
    .exec()
    .then((doc) => {
      res.status(200).json(doc[0]);
    })
    .catch((err) => res.status(500).json({ error: err }));
};

exports.createOrder = (req, res, next) => {
  let orderType = req.params.orderType;

  if (orderType === "buy") {
    var data = JSON.stringify({
      pay_currency: "usdttrc20",
      pay_amount:
        req.body.price <= 50 ? req.body.price + 1 : req.body.price + 2,
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
              pay_amount: response.data.pay_amount,
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
                    pay_amount: response.data.pay_amount,
                  });
                })
                .catch((err) => res.status(404).json({ error: err }));
            })
            .catch((err) => res.status(500).json({ error: err }));
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (req.body.payment_type === "skrill") {
      const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        payment_details: {
          skrill_email: req.body.skrill_email,
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
  } else if (orderType === "sell") {
    if (req.body.payment_type === "usdt") {
      const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        payment_details: {
          usdt_address: req.body.usdt_address,
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
    } else if (req.body.payment_type === "skrill") {
      const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        payment_details: {
          skrill_email: req.body.skrill_email,
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
    } else if (req.body.payment_type === "cih") {
      const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        payment_details: {
          cih_fullname: req.body.cih_fullname,
          cih_rib: req.body.cih_rib,
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
  } else if (orderType === "exchange") {
    const order = new Order({
      _id: new mongoose.Types.ObjectId(),
      youpay: req.body.youpay,
      youreceive: req.body.youpay,
      code: req.body.code,
      product: req.body.product,
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
};

exports.updateOrder = (req, res, next) => {
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }

  Order.update({ _id: req.params.orderId }, { $set: updateOps })
    .exec()
    .then(() => {
      res.status(200).json({
        message: "Order updated",
      });
    })
    .catch((err) => res.status(500).json({ error: err }));
};

exports.deleteOrder = (req, res, next) => {
  Order.deleteOne({ _id: req.params.orderId })
    .exec()
    .then(() => res.status(200).json({ message: "Order deleted" }))
    .catch((err) => res.status(500).json({ error: err }));
};
