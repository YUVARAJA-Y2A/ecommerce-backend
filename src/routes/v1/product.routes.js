const express = require("express");
const productRoutes = express.Router();
const { productController } = require("../../controllers/index");
const upload = require("../../middleware/fileUploader");

const { addProductSchema, updateProductSchema } =
  require("../../validators").product;

let validator = require("express-joi-validation").createValidator({
  passError: true,
});

productRoutes.get("/productList", productController.getAllProducts);
productRoutes.post(
  "/addProduct",
  upload.single("excel"),
  productController.createProduct
);
productRoutes.post(
  "/addProductItem",
  validator.body(addProductSchema),
  productController.createProductItem
);
productRoutes.put(
  "/updateProduct",
  validator.body(updateProductSchema),
  productController.editProduct
);
productRoutes.delete("/removeProduct", productController.removeProduct);

module.exports = productRoutes;
