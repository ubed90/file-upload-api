const path = require("path");
const { StatusCodes } = require("http-status-codes");
const customError = require("../errors");
// * Cloudinary
const { v2: cloudinary } = require("cloudinary");

// * Files Module to remove tmp Folder
const fs = require("fs");

// ! Storing FIles Directly on server
const uploadProductImageLocal = async (req, res) => {
    if(!req.files) {
        throw new customError.BadRequestError("No File Uploaded");
    }

    const productImage = req.files.image;

    if(!productImage.mimetype.startsWith("image")) {
        throw new customError.BadRequestError("Please upload image");
    }

    const maxSize = 1024 * 1024;

    if(productImage.size > maxSize) {
        throw new customError.BadRequestError("Max image size is 1MB.")
    }

    const imagePath = path.join(__dirname, '../public/uploads/' + `${productImage.name}`);

    await productImage.mv(imagePath);

    return res.status(StatusCodes.OK).json({ image: { src: `/uploads/${productImage.name}` } });
}

// ! Storing FIles on 3rd Party Cloud Provider
const uploadProductImage = async (req, res) => {
    if(!req.files) {
        throw new customError.BadRequestError("No File Uploaded");
    }

    const productImage = req.files.image;

    if(!productImage.mimetype.startsWith("image")) {
        throw new customError.BadRequestError("Please upload image");
    }

    const maxSize = 1024 * 1024;

    if(productImage.size > maxSize) {
        throw new customError.BadRequestError("Max image size is 1MB.")
    }


    const result = await cloudinary.uploader.upload(req.files.image.tempFilePath, {
        use_filename: true,
        folder: 'file-upload-api'
    })

    fs.unlinkSync(req.files.image.tempFilePath);

    return res.status(StatusCodes.OK).json({ image: { src: result.secure_url } })
}

module.exports = {
    uploadProductImage
}