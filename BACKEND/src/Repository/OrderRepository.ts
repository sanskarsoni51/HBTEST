import { Request, Response, NextFunction } from "express";
import Order, { IOrder } from "../models/orders.js";
import AppError from "../utels/AppError.js";
import catchAsync from "../utels/CatchAsync.js";
import { CartModel } from "../models/cart.js";

const getOrderById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const orderId = req.params.orderId;
  const result = await Order.findById(orderId).populate('userId').populate('cartId').populate('shippingAddress');

  if (!result) {
    return next(new AppError('Order not found', 404));
  }

  res.status(200).json({
    message: "success",
    data: result,
  });
});

const getOrdersOfUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  console.log("coming")
  if (req.user && (req.user as any)._id) {
    req.params.userId = (req.user as any)._id.toString();
  }
  const user = req.params.userId;

    // Find orders by user ID
    const orders = await Order.find({ userId:user }).populate('cartId').populate('shippingAddress');

    // If no orders found for the user, return a 404 error
    if (!orders || orders.length === 0) {
      return next(new AppError('Orders not found for the user', 404));
    }

    // Send success response with the orders
    res.status(200).json({
      message: 'success',
      data: orders,
    });
});


const createOrder = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  if (req.user && (req.user as any)._id) {
    req.params.userId = (req.user as any)._id.toString();
  }
  const user = req.params.userId;
  const cart = await CartModel.findOne({ user });
  // console.log(user,cart);
  const cartId = cart?._id;
  
  const { paymentId, status, shippingAddress } = req.body;
  const createdOrder = await Order.create({ userId:user, cartId, paymentId, status, shippingAddress });
  res.status(201).json({
    message: "success",
    orderId: createdOrder._id,
  });
});

const updateOrderById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const orderId = req.params.orderId;
  const result = await Order.findByIdAndUpdate(orderId, req.body, {
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
});

const deleteOrderById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const orderId = req.params.orderId;
  const result = await Order.findByIdAndDelete(orderId);

  if (!result) {
    return next(new AppError('Order not found', 404));
  }

  res.status(204).json({
    message: "Order deleted successfully",
  });
});

const getAllOrders = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const orders = await Order.find().populate('userId').populate('cartId').populate('shippingAddress');
  res.status(200).json({
    message: "success",
    data: orders,
  });
});

export default {
  getOrderById,
  createOrder,
  updateOrderById,
  deleteOrderById,
  getAllOrders,
  getOrdersOfUser
};
