const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProduct,
  deleteProduct,
  addProduct,
} = require("../controllers/product");

const checkAuth = require("../middleware/check-auth.js");

router.get("/", getProducts);
router.get("/:productId", getProduct);

router.post("/", addProduct);

router.delete("/:productId", checkAuth, deleteProduct);

module.exports = router;
