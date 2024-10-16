import { Request, Response, NextFunction } from "express";
import productModel, { Product, productSchema } from "../models/Product.js";
import AppError from "../utels/AppError.js";
import APIFeatures from "../utels/apiFeatures.js";
import catchAsync from "../utels/CatchAsync.js";
import { NewProductRequestBody } from "../types/requestBody.js";

const getProductById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const productId = req.params.productId;
  const result = await productModel.findOne({pid : productId});

  if (!result) {
    return next(new AppError('Product not found', 404));
  }
 
  res.status(200).json({
    message: "success",
    data: result,
  });
});


const createProduct = catchAsync(async (req: Request<{},{}, NewProductRequestBody >, res: Response, next: NextFunction) => {
  const { productName,  description, category, price, qtyavailable,colors } = req.body;
  // const nextPid: number = await productModel.getNextPid();
  const lastDocument: Product | null = await productModel.findOne({}, {}, { sort: { 'pid': -1 } });
  const lastPid: number = lastDocument ? lastDocument.pid : 0;
   
  // Check if files were uploaded
  if (!req.files || !('images' in req.files)) {
    return res.status(400).json({ message: 'No images uploaded' });
  }

  // Get the uploaded images
  const images = req.files["images"];


  // If you're expecting multiple images, you can store their paths in an array
  const imagePaths = images.map((image: Express.Multer.File) => image.path);

  const createdProduct = await productModel.create({ 
    pid : lastPid + 1,
    productName,
    description, 
    category,
    price, 
    qtyavailable,
    colors,
    images : imagePaths,
  });
  res.status(201).json({
    message: "success",
    productId: createdProduct._id,
  });
});

const updateProductById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const productId = req.params.productId;
  // console.log(req.body);
  const updatedProduct = await productModel.findByIdAndUpdate(productId, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedProduct) {
    return next(new AppError('Product not found', 404));
  }

  res.status(200).json({
    message: "success",
    data: updatedProduct,
  });
});

// Function to update product images by productId
const updateProductImagesById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const productId = req.params.productId;


  // Check if files were uploaded
  if (!req.files || !('images' in req.files)) {
    return res.status(400).json({ message: 'No images uploaded' });
  }

  // Get the uploaded images
  const images = req.files["images"];
  // console.log(images);
  // Get the paths of the uploaded images
  const imagePaths = images.map((image: any) => {return image.location || '';});
  // const imagePaths = images.map((image: Express.Multer.File) => image.location);
  // console.log(imagePaths);
  // Update the product with the given productId to replace its images
  const updatedProduct = await productModel.findByIdAndUpdate(productId, { $push: { images: { $each: imagePaths } } }, {
    new: true,
    runValidators: true,
  });

  // Check if the product was not found
  if (!updatedProduct) {
    return next(new AppError('Product not found', 404));
  }

  // Send the updated product in the response
  res.status(200).json({
    message: "success",
    data: updatedProduct,
  });
});

const deleteProductById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const productId = req.params.productId;
  const result = await productModel.findByIdAndDelete(productId);

  if (!result) {
    return next(new AppError('Product not found', 404));
  }

  res.status(204).json({
    message: "Product deleted successfully",
  });
});

const getAllProducts = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const features = new APIFeatures(productModel.find(), req.query);
  features.filter().sort().limitFields().paginate();
  // console.log(req.query);
  const result = await features.query;
  const limit = req.query.limit || 1;
  // console.log(limit);
  // console.log(features);
  // Count total number of products from the database instead of result length
  const totalProducts = await productModel.countDocuments(features.query.getFilter());

  // Calculate total pages based on total number of products and specified limit
  const totalPages = Math.ceil(totalProducts / Number(limit));
  // console.log(totalPages);
  res.status(200).json({
    message: "success",
    totalPages,
    data: result,
  });
});

const getNewProducts = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const newProducts = await productModel.find().sort({ createdAt: -1 }).limit(10); // Assuming you have a 'createdAt' field

  res.status(200).json({
    message: "success",
    data: newProducts,
  });
});

const searchProducts = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const query = req.query.name as string; // Extract search query from request parameters

  // Construct Mongoose query to search for products
  const results: Product[] = await productModel.find({
    $or: [
      { productName: { $regex: query, $options: 'i' } }, // Case-insensitive search by name
      // { description: { $regex: query, $options: 'i' } }, // Case-insensitive search by description
      // You can add more fields to search here if needed
    ]
  });
  // If no products are found, return a 404 error
  if (results.length === 0) {
    return next(new AppError('No products found', 404));
  }

  // Return search results
  res.status(200).json({
    message: "success",
    data: results,
  });
});

export default {
  getProductById,
  createProduct,
  updateProductById,
  deleteProductById,
  getAllProducts,
  getNewProducts,
  searchProducts,
  updateProductImagesById
};
