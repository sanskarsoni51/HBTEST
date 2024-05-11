var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import productModel from "../models/Product.js";
import AppError from "../utels/AppError.js";
import APIFeatures from "../utels/apiFeatures.js";
import catchAsync from "../utels/CatchAsync.js";
const getProductById = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.productId;
    const result = yield productModel.findById(productId);
    if (!result) {
        return next(new AppError('Product not found', 404));
    }
    res.status(200).json({
        message: "success",
        data: result,
    });
}));
const createProduct = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { productName, description, category, price, qtyavailable, colors } = req.body;
    // const nextPid: number = await productModel.getNextPid();
    const lastDocument = yield productModel.findOne({}, {}, { sort: { 'pid': -1 } });
    const lastPid = lastDocument ? lastDocument.pid : 0;
    // Check if files were uploaded
    if (!req.files || !('images' in req.files)) {
        return res.status(400).json({ message: 'No images uploaded' });
    }
    // Get the uploaded images
    const images = req.files["images"];
    // If you're expecting multiple images, you can store their paths in an array
    const imagePaths = images.map((image) => image.path);
    const createdProduct = yield productModel.create({
        pid: lastPid + 1,
        productName,
        description,
        category,
        price,
        qtyavailable,
        colors,
        images: imagePaths,
    });
    res.status(201).json({
        message: "success",
        productId: createdProduct._id,
    });
}));
const updateProductById = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.productId;
    console.log(req.body);
    const updatedProduct = yield productModel.findByIdAndUpdate(productId, req.body, {
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
}));
// Function to update product images by productId
const updateProductImagesById = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.productId;
    // Check if files were uploaded
    if (!req.files || !('images' in req.files)) {
        return res.status(400).json({ message: 'No images uploaded' });
    }
    // Get the uploaded images
    const images = req.files["images"];
    // Get the paths of the uploaded images
    const imagePaths = images.map((image) => image.path);
    // Update the product with the given productId to replace its images
    const updatedProduct = yield productModel.findByIdAndUpdate(productId, { $push: { images: { $each: imagePaths } } }, {
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
}));
const deleteProductById = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.productId;
    const result = yield productModel.findByIdAndDelete(productId);
    if (!result) {
        return next(new AppError('Product not found', 404));
    }
    res.status(204).json({
        message: "Product deleted successfully",
    });
}));
const getAllProducts = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const features = new APIFeatures(productModel.find(), req.query);
    features.filter().sort().limitFields().paginate();
    // console.log(req.query);
    const result = yield features.query;
    const limit = req.query.limit || 1;
    // console.log(limit);
    // console.log(features);
    // Count total number of products from the database instead of result length
    const totalProducts = yield productModel.countDocuments();
    // Calculate total pages based on total number of products and specified limit
    const totalPages = Math.ceil(totalProducts / Number(limit));
    // console.log(totalPages);
    res.status(200).json({
        message: "success",
        totalPages,
        data: result,
    });
}));
const getNewProducts = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newProducts = yield productModel.find().sort({ createdAt: -1 }).limit(10); // Assuming you have a 'createdAt' field
    res.status(200).json({
        message: "success",
        data: newProducts,
    });
}));
const searchProducts = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query.name; // Extract search query from request parameters
    // Construct Mongoose query to search for products
    const results = yield productModel.find({
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
}));
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
