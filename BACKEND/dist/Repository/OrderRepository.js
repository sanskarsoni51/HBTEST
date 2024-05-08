var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Order from "../models/orders.js";
import AppError from "../utels/AppError.js";
import catchAsync from "../utels/CatchAsync.js";
import { CartModel } from "../models/cart.js";
const getOrderById = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const orderId = req.params.orderId;
    const result = yield Order.findById(orderId).populate('userId').populate('cartId').populate('shippingAddress');
    if (!result) {
        return next(new AppError('Order not found', 404));
    }
    res.status(200).json({
        message: "success",
        data: result,
    });
}));
const getOrdersOfUser = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("coming");
    if (req.user && req.user._id) {
        req.params.userId = req.user._id.toString();
    }
    const user = req.params.userId;
    // Find orders by user ID
    const orders = yield Order.find({ userId: user }).populate('cartId').populate('shippingAddress');
    // If no orders found for the user, return a 404 error
    if (!orders || orders.length === 0) {
        return next(new AppError('Orders not found for the user', 404));
    }
    // Send success response with the orders
    res.status(200).json({
        message: 'success',
        data: orders,
    });
}));
const createOrder = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user && req.user._id) {
        req.params.userId = req.user._id.toString();
    }
    const user = req.params.userId;
    const cart = yield CartModel.findOne({ user });
    console.log(user, cart);
    const cartId = cart === null || cart === void 0 ? void 0 : cart._id;
    const { paymentId, status, shippingAddress } = req.body;
    const createdOrder = yield Order.create({ userId: user, cartId, paymentId, status, shippingAddress });
    res.status(201).json({
        message: "success",
        orderId: createdOrder._id,
    });
}));
const updateOrderById = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const orderId = req.params.orderId;
    const result = yield Order.findByIdAndUpdate(orderId, req.body, {
        new: true,
        runValidators: true,
    });
    if (!result) {
        return next(new AppError('Order not found', 404));
    }
    res.status(200).json({
        message: "success",
        data: result,
    });
}));
const deleteOrderById = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const orderId = req.params.orderId;
    const result = yield Order.findByIdAndDelete(orderId);
    if (!result) {
        return next(new AppError('Order not found', 404));
    }
    res.status(204).json({
        message: "Order deleted successfully",
    });
}));
const getAllOrders = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield Order.find().populate('userId').populate('cartId').populate('shippingAddress');
    res.status(200).json({
        message: "success",
        data: orders,
    });
}));
export default {
    getOrderById,
    createOrder,
    updateOrderById,
    deleteOrderById,
    getAllOrders,
    getOrdersOfUser
};
