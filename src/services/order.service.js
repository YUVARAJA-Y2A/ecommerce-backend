const { cart } = require("../database/models");
const { product } = require("../database/models");
const getPagingData = require("../utils/pagination");
const { statusCodes, messages } = require("../configs");
const { checkPreferences } = require("joi");
const logger = require("../middleware/logger");
const { errorObjGenerator } = require("../middleware").errorHandler;

class OrderService {}

OrderService.placeOrder = async (input) => {
  try {
    const { id, userId } = input;
    let getProduct = await product.findById({ _id: id });
    let getCart = await cart.findOne({ userId });

    return {
      code: statusCodes.HTTP_OK,
      message: messages.success,
      data: result ? result.products : {},
    };
  } catch (err) {
    throw errorObjGenerator(err);
  }
};

OrderService.cancelOrder = async (input) => {
  try {
    const { id, userId } = input;
    let getProduct = await product.findById({ _id: id });
    let getCart = await cart.findOne({ userId });

    return {
      code: statusCodes.HTTP_OK,
      message: messages.success,
      data: result ? result.products : {},
    };
  } catch (err) {
    throw errorObjGenerator(err);
  }
};

OrderService.reOrder = async (input) => {
  try {
    const { id, userId, quantity } = input;
    let getProduct = await product.findById({ _id: id });
    let getCart = await cart.findOne({ userId });

    return {
      code: statusCodes.HTTP_OK,
      message: messages.success,
      data: result ? result.products : {},
    };
  } catch (err) {
    throw errorObjGenerator(err);
  }
};

OrderService.getAllOrders = async (input) => {
  try {
    let { page, size, id } = input;

    let condition = {};
    if (id) condition._id = id;
    let { limit, offset } = getPagingData(page, size);

    let result = await cart.find(condition).limit(limit).skip(offset);
    return {
      code: statusCodes.HTTP_OK,
      message: messages.success,
      data: result ? result : {},
    };
  } catch (err) {
    logger.info({
      message: "@Service user.service @Method getAllItems @Message ERROR",
      data: err,
    });
    throw errorObjGenerator(err);
  }
};

module.exports = OrderService;
