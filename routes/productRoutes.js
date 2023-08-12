const express = require("express");
const { createProduct, getAllProducts } = require("../controllers/productController");
const { uploadProductImage } = require("../controllers/uploadsController");

const productRouter = express.Router();

productRouter.route('/').post(createProduct).get(getAllProducts);
productRouter.route('/uploads').post(uploadProductImage);

module.exports = productRouter;