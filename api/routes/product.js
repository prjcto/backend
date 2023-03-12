const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");

const checkAuth = require("../middleware/check-auth.js");

router.get("/", getProducts);
router.get("/:productId", getProduct);

router.post("/", checkAuth, addProduct);
router.patch("/:productId", checkAuth, updateProduct);
router.delete("/:productId", checkAuth, deleteProduct);

module.exports = router;
