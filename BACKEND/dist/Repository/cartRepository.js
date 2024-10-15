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
const getCartById = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const cartId = req.params.cartId;
    const result = yield CartModel.findById(cartId);
    // console.log(result);
    if (!result) {
        return next(new AppError('Cart not found', 404));
    }
    res.status(200).json({
        message: "success",
        data: result,
    });
}));
const createCart = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { products, deliveryCharges, gst, totalQuantity, totalPrice, payablePrice, user } = req.body;
    const createdCart = yield CartModel.create({ products, deliveryCharges, gst, totalQuantity, totalPrice, payablePrice, user });
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
        return next(new AppError('Cart not found', 404));
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
        return next(new AppError('Cart not found', 404));
    }
    res.status(204).json({
        message: "Cart deleted successfully",
    });
}));
const getAllCarts = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const carts = yield CartModel.find().populate('user');
    res.status(200).json({
        message: "success",
        data: carts,
    });
}));
const addToCart = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user && req.user._id) {
        req.params.userId = req.user._id.toString();
    }
    // console.log(req.params.userId);
    const pid = req.body.pid;
    const user = req.params.userId;
    // console.log(pid);
    const cart = yield CartModel.findOne({ user });
    // console.log(cart);
    const product = yield Product.findOne({ pid });
    // console.log(product);
    if (!product) {
        return next(new AppError('Product not found', 404));
    }
    // Check if the product is already in the cart
    if (cart) {
        // Check if the product is already in the cart
        if (cart.products && cart.products.has(pid)) {
            return next(new AppError('Product already exists in the cart', 400));
        }
        // Add the product to the cart
        cart.products = cart.products || new Map();
        cart.products.set(pid, { product, quantity: 1 });
        const productPrice = product.price;
        cart.totalQuantity = (cart.totalQuantity || 0) + 1;
        cart.totalPrice = (cart.totalPrice || 0) + productPrice;
        cart.gst = (cart.totalPrice * 0.18);
        if (cart.totalPrice > 3000) {
            cart.deliveryCharges = 0;
        }
        else {
            cart.deliveryCharges = 50;
        }
        cart.payablePrice = cart.totalPrice + cart.gst + cart.deliveryCharges;
        yield cart.save();
    }
    res.status(200).json({ message: "success", data: cart });
    next();
}));
const removeFromCart = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (req.user && req.user._id) {
        req.params.userId = req.user._id.toString();
    }
    const pid = req.body.pid; // Assuming pid is sent in the request body
    const user = req.params.userId;
    const cart = yield CartModel.findOne({ user });
    if (!cart) {
        return next(new AppError('Cart not found', 404));
    }
    // Check if the product is in the cart
    if (cart.products && cart.products.has(pid)) {
        // Remove the product from the cart
        const product = yield Product.findOne({ pid });
        const productquantity = ((_a = cart.products.get(pid)) === null || _a === void 0 ? void 0 : _a.quantity) || 1;
        const productPrice = (product === null || product === void 0 ? void 0 : product.price) || 0;
        cart.products.delete(pid);
        cart.totalQuantity = cart.totalQuantity - productquantity;
        cart.totalPrice = cart.totalPrice - productPrice * productquantity;
        cart.gst = (cart.totalPrice * 0.18);
        if (cart.totalPrice > 3000) {
            cart.deliveryCharges = 0;
        }
        else {
            cart.deliveryCharges = 50;
        }
        cart.payablePrice = cart.totalPrice + cart.gst + cart.deliveryCharges;
        // Save the updated cart
        yield cart.save();
        return res.status(200).json({ message: "success", data: cart });
    }
    else {
        return next(new AppError('Product not found in cart', 404));
    }
}));
const updateCartQuantity = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user && req.user._id) {
        req.params.userId = req.user._id.toString();
    }
    const { pid, quantity } = req.body; // Assuming pid and quantity are sent in the request body
    const user = req.params.userId;
    const cart = yield CartModel.findOne({ user });
    if (!cart) {
        return next(new AppError('Cart not found', 404));
    }
    else {
        // console.log(cart);
        // Check if the product is in the cart
        if (cart.products && cart.products.has(pid)) {
            // Update the quantity of the product in the cart
            const productDetails = cart.products.get(pid);
            if (productDetails) {
                const previousQuantity = productDetails.quantity; // Assuming productDetails is an array
                const productPrice = productDetails.product.price; // Assuming productDetails is an array
                // Update the quantity and calculate the price difference
                const quantityDifference = quantity - previousQuantity;
                productDetails.quantity = quantity;
                // Update totalQuantity and totalPrice
                cart.totalQuantity += quantityDifference;
                cart.totalPrice += productPrice * quantityDifference;
                cart.gst = (cart.totalPrice * 0.18);
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
            return next(new AppError('Product not found in cart', 404));
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
        data: cart
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
    getMyCart
};
