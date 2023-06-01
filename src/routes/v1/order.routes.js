const express = require("express");
const orderRoutes = express.Router();
const { orderController } = require("../../controllers/index");
const {
  verifyToken,
  verifySession,
  authenticate,
} = require("../../middleware");

let validator = require("express-joi-validation").createValidator({
  passError: true,
});
const { placeOrderSchema, cancelOrderSchema, reOrderSchema } =
  require("../../validators").order;

orderRoutes.post(
  "/placeOrder",
  validator.body(placeOrderSchema),
  orderController.placeOrder
);
orderRoutes.post(
  "/cancelOrder",
  validator.body(cancelOrderSchema),
  orderController.cancelOrder
);
orderRoutes.post(
  "/reOrder",
  validator.body(reOrderSchema),
  orderController.reOrder
);

module.exports = orderRoutes;
