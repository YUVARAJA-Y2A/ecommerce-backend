"use strict";
const { orderService } = require("../services");
const { response, logger } = require("../middleware");

class OrderController {}

OrderController.placeOrder = async (req, res, next) => {
  logger.info(
    "@Controller user.controller @Method createUser @Message req.body",
    { data: req.body }
  );
  try {
    let input = req.body;
    let result = await orderService.placeOrder(input);
    return response.success(req, res, result.code, result.data, result.message);
  } catch (err) {
    console.error(
      "@Controller user.controller @Method createUser @Message ERROR",
      { data: err }
    );
    next(err);
  }
};

OrderController.cancelOrder = async (req, res, next) => {
  logger.info(
    "@Controller user.controller @Method createUser @Message req.body",
    { data: req.body }
  );
  try {
    let input = req.body;
    let result = await orderService.cancelOrder(input);
    return response.success(req, res, result.code, result.data, result.message);
  } catch (err) {
    console.error(
      "@Controller user.controller @Method createUser @Message ERROR",
      { data: err }
    );
    next(err);
  }
};

OrderController.reOrder = async (req, res, next) => {
  logger.info(
    "@Controller user.controller @Method createUser @Message req.body",
    { data: req.body }
  );
  try {
    let input = req.body;
    let result = await orderService.reOrder(input);
    return response.success(req, res, result.code, result.data, result.message);
  } catch (err) {
    console.error(
      "@Controller user.controller @Method createUser @Message ERROR",
      { data: err }
    );
    next(err);
  }
};

module.exports = OrderController;
