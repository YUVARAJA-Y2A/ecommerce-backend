const { dbConfig } = require("./../../configs");

dbConfig();

module.exports = {
  user: require("./user.model"),
  cart: require("./cart.model"),
  product: require("./product.model"),
};
