const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");

const createProduct = async (req,res) => {
    console.log(req.body);
    const product = await Product.create(req.body);
    return res.status(StatusCodes.OK).send({ product });
}

const getAllProducts = async (req, res) => {
    const products = await Product.find({});
    return res.status(StatusCodes.OK).json({ products, nbHits: products.length });
}

module.exports = {
    createProduct,
    getAllProducts
}