require('dotenv').config({ path: './config/.env' });
require('express-async-errors');

const express = require('express');
const app = express();

// * File Upload Package
const fileUpload = require("express-fileupload");

// * Cloudinary File Upload
const { v2: cloudinary } = require("cloudinary");

// * Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
})

// database
const connectDB = require('./db/connect');

// Product Router
const productRouter = require("./routes/productRoutes");

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// * Serve Public Folder
app.use(express.static('./public'))

app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));

app.use('/api/v1/products', productRouter);

// middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
