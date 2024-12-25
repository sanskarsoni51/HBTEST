var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { CartModel } from "../models/cart.js";
import AppError from "../utels/AppError.js";
import catchAsync from "../utels/CatchAsync.js";
import Product from "../models/Product.js";
import ProductModel from "../models/Product.js";
const getCartById = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const cartId = req.params.cartId;
    const result = yield CartModel.findById(cartId);
    // console.log(result);
    if (!result) {
        return next(new AppError("Cart not found", 404));
    }
    res.status(200).json({
        message: "success",
        data: result,
    });
}));
const createCart = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { products, deliveryCharges, gst, totalQuantity, totalPrice, payablePrice, user } = req.body;
    const createdCart = yield CartModel.create({
        products,
        deliveryCharges,
        gst,
        totalQuantity,
        totalPrice,
        payablePrice,
        user,
    });
    res.status(201).json({
        message: "success",
        cartId: createdCart._id,
    });
}));
const updateCartById = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const cartId = req.params.cartId;
    const result = yield CartModel.findByIdAndUpdate(cartId, req.body, {
        new: true,
        runValidators: true,
    });
    if (!result) {
        return next(new AppError("Cart not found", 404));
    }
    res.status(200).json({
        message: "success",
        data: result,
    });
}));
const deleteCartById = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const cartId = req.params.cartId;
    const result = yield CartModel.findByIdAndDelete(cartId);
    if (!result) {
        return next(new AppError("Cart not found", 404));
    }
    res.status(204).json({
        message: "Cart deleted successfully",
    });
}));
const getAllCarts = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const carts = yield CartModel.find().populate("user");
    res.status(200).json({
        message: "success",
        data: carts,
    });
}));
const addToCart = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user && req.user._id) {
        req.params.userId = req.user._id.toString();
    }
    const pid = req.body.pid;
    const selectedVariant = req.body.variant; // Assuming variant is passed in request body
    const user = req.params.userId;
    const cart = yield CartModel.findOne({ user });
    const product = yield Product.findOne({ pid });
    if (!product) {
        return next(new AppError("Product not found", 404));
    }
    // Check if the selected variant exists
    const variant = product.variants.find((v) => v.color === selectedVariant.color);
    if (!variant) {
        return next(new AppError("Variant not found", 404));
    }
    // Check if the variant has stock
    if (variant.stock <= 0) {
        return next(new AppError("Variant out of stock", 400));
    }
    if (cart) {
        if (cart.products && cart.products.has(pid + variant.color)) {
            const cartProduct = cart.products.get(pid + variant.color);
            // Check if the existing product's variants contain the selected variant color
            const existingVariant = (cartProduct === null || cartProduct === void 0 ? void 0 : cartProduct.variant.color) === selectedVariant.color;
            if (existingVariant) {
                return next(new AppError("Product variant already exists in the cart", 400));
            }
        }
        // Add the product variant to the cart
        cart.products = cart.products || new Map();
        cart.products.set(pid + variant.color, { product, variant: selectedVariant, quantity: 1 });
        const productPrice = product.price;
        cart.totalQuantity = (cart.totalQuantity || 0) + 1;
        cart.totalPrice = (cart.totalPrice || 0) + productPrice;
        cart.gst = cart.totalPrice * 0.03;
        cart.deliveryCharges = cart.totalPrice > 3000 ? 0 : 50;
        cart.payablePrice = cart.totalPrice + cart.gst + cart.deliveryCharges;
        yield cart.save();
    }
    res.status(200).json({ message: "success", data: cart });
    next();
}));
const removeFromCart = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user && req.user._id) {
        req.params.userId = req.user._id.toString();
    }
    const pid = req.body.pid; // Assuming pid is sent in the request body
    const selectedVariant = req.body.variant; // Assuming variant info is also passed
    const user = req.params.userId;
    // Find the cart for the current user
    const cart = yield CartModel.findOne({ user });
    if (!cart) {
        return next(new AppError("Cart not found", 404));
    }
    // Check if the product is in the cart
    if (cart.products && cart.products.has(pid + selectedVariant.color)) {
        const cartProduct = cart.products.get(pid + selectedVariant.color);
        if (!cartProduct) {
            return next(new AppError("Product not found in cart", 404));
        }
        // Check if the variant exists for the product in the cart
        if (cartProduct.variant.color !== selectedVariant.color) {
            return next(new AppError("Product variant not found in cart", 404));
        }
        // Remove the product from the cart
        const product = yield Product.findOne({ pid });
        if (!product) {
            return next(new AppError("Product not found", 404));
        }
        // Calculate quantity and price to adjust the cart
        const productQuantity = cartProduct.quantity || 1;
        const productPrice = product.price || 0;
        // Remove the product from the cart
        cart.products.delete(pid + selectedVariant.color);
        // Update cart totals
        cart.totalQuantity = cart.totalQuantity - productQuantity;
        cart.totalPrice = cart.totalPrice - productPrice * productQuantity;
        // Recalculate GST and delivery charges
        cart.gst = cart.totalPrice * 0.03;
        cart.deliveryCharges = cart.totalPrice > 3000 ? 0 : 50;
        cart.payablePrice = cart.totalPrice + cart.gst + cart.deliveryCharges;
        // Save the updated cart
        yield cart.save();
        return res.status(200).json({ message: "success", data: cart });
    }
    else {
        return next(new AppError("Product not found in cart", 404));
    }
}));
const updateCartQuantity = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user && req.user._id) {
        req.params.userId = req.user._id.toString();
    }
    const { pid, variant, quantity } = req.body; // Assuming pid and quantity are sent in the request body
    const user = req.params.userId;
    const cart = yield CartModel.findOne({ user });
    const product = yield ProductModel.findOne({ pid });
    if (!product) {
        return next(new AppError("Product not found", 404));
    }
    if (!cart) {
        return next(new AppError("Cart not found", 404));
    }
    else {
        // Check if the product is in the cart
        if (cart.products && cart.products.has(pid + variant.color)) {
            // Update the quantity of the product in the cart
            const productDetails = cart.products.get(pid + variant.color);
            if (productDetails) {
                const productVariant = product.variants.find((v) => v.color === variant.color);
                if (!productVariant) {
                    return next(new AppError("Variant not found", 404));
                }
                if (quantity > productVariant.stock) {
                    return next(new AppError(`Insufficient stock. Available stock for this variant is ${productVariant.stock}.`, 400));
                }
                const previousQuantity = productDetails.quantity; // Assuming productDetails is an array
                const productPrice = productDetails.product.price; // Assuming productDetails is an array
                // Update the quantity and calculate the price difference
                const quantityDifference = quantity - previousQuantity;
                productDetails.quantity = quantity;
                // Update totalQuantity and totalPrice
                cart.totalQuantity += quantityDifference;
                cart.totalPrice += productPrice * quantityDifference;
                cart.gst = cart.totalPrice * 0.03;
                if (cart.totalPrice > 3000) {
                    cart.deliveryCharges = 0;
                }
                else {
                    cart.deliveryCharges = 50;
                }
                cart.payablePrice = cart.totalPrice + cart.gst + cart.deliveryCharges;
            }
            // Save the updated cart
            yield cart.save();
            return res.status(200).json({ message: "success", data: cart });
        }
        else {
            return next(new AppError("Product not found in cart", 404));
        }
    }
}));
const getMyCart = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user && req.user._id) {
        req.params.userId = req.user._id.toString();
    }
    const user = req.params.userId;
    const cart = yield CartModel.findOne({ user });
    res.status(200).json({
        message: "success",
        data: cart,
    });
}));
export default {
    getCartById,
    createCart,
    updateCartById,
    deleteCartById,
    getAllCarts,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    getMyCart,
};
