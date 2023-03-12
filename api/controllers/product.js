const mongoose = require("mongoose");
const Product = require("../models/product");

exports.getProducts = (req, res, next) => {
  Product.find()
    .select("_id name price stock category")
    .exec()
    .then((docs) => res.status(200).json(docs))
    .catch((err) => res.status(500).json({ error: err }));
};

exports.getProduct = (req, res, next) => {
  Product.find({ _id: req.params.productId })
    .select("_id name price stock category")
    .exec()
    .then((doc) => {
      res.status(200).json(doc[0]);
    })
    .catch((err) => res.status(500).json({ error: err }));
};

exports.addProduct = (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    stock: req.body.stock,
    category: req.body.category,
    // image: req.file,
  });

  product
    .save()
    .then(() => {
      res.status(200).json({
        message: "Product created",
      });
    })
    .catch((err) => res.status(500).json({ error: err }));
};

exports.updateProduct = (req, res, next) => {
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }

  Product.update({ _id: req.params.productId }, { $set: updateOps })
    .exec()
    .then(() => {
      res.status(200).json({
        message: "Product updated",
      });
    })
    .catch((err) => res.status(500).json({ error: err }));
};

exports.deleteProduct = (req, res, next) => {
  Product.deleteOne({ _id: req.params.productId })
    .exec()
    .then((result) => res.status(200).json({ message: "Product deleted" }))
    .catch((err) => res.status(500).json({ error: err }));
};
