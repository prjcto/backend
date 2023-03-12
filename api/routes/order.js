const express = require("express");
const router = express.Router();

const {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/order");
const checkAuth = require("../middleware/check-auth.js");

router.get("/", checkAuth, getOrders);
router.get("/:orderId", checkAuth, getOrder);
router.post("/:orderType", checkAuth, createOrder);
router.patch("/:orderId", checkAuth, updateOrder);
router.delete("/:orderId", checkAuth, deleteOrder);

module.exports = router;
