import { Request, Response, NextFunction } from "express";
import { CartModel, CartDocument } from "../models/cart.js";
import AppError from "../utels/AppError.js";
import catchAsync from "../utels/CatchAsync.js";
import Product from "../models/Product.js";
import ProductModel from "../models/Product.js";

const getCartById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const cartId = req.params.cartId;
  const result = await CartModel.findById(cartId);
// console.log(result);
  if (!result) {
    return next(new AppError('Cart not found', 404));
  }

  res.status(200).json({
    message: "success",
    data: result,
  });
});

const createCart = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { products, deliveryCharges, gst, totalQuantity, totalPrice, payablePrice, user } = req.body;
  const createdCart = await CartModel.create({ products, deliveryCharges, gst, totalQuantity, totalPrice, payablePrice, user });
  res.status(201).json({
    message: "success",
    cartId: createdCart._id,
  });
});

const updateCartById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const cartId = req.params.cartId;
  const result = await CartModel.findByIdAndUpdate(cartId, req.body, {
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
});

const deleteCartById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const cartId = req.params.cartId;
  const result = await CartModel.findByIdAndDelete(cartId);

  if (!result) {
    return next(new AppError('Cart not found', 404));
  }

  res.status(204).json({
    message: "Cart deleted successfully",
  });
});

const getAllCarts = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const carts = await CartModel.find().populate('user');
  res.status(200).json({
    message: "success",
    data: carts,
  });
});


const addToCart = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  if (req.user && (req.user as any)._id) {
    req.params.userId = (req.user as any)._id.toString();
  }
  // console.log(req.params.userId);
  const pid = req.body.pid;
  const user = req.params.userId;
  // console.log(pid);
  const cart = await CartModel.findOne({ user });
  // console.log(cart);
  const product = await Product.findOne({pid});
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
    cart.totalQuantity = (cart.totalQuantity || 0) +  1;
    cart.totalPrice = (cart.totalPrice || 0) + productPrice;

    cart.gst = (cart.totalPrice * 0.18);
    if(cart.totalPrice > 3000){
      cart.deliveryCharges = 0;
    }else{
    cart.deliveryCharges = 50;
    }

    cart.payablePrice = cart.totalPrice + cart.gst + cart.deliveryCharges;
    await cart.save();
  }
  res.status(200).json({ message: "success" ,data:cart});
 
next();
});

const removeFromCart = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  if (req.user && (req.user as any)._id) {
    req.params.userId = (req.user as any)._id.toString();
  }
  const pid = req.body.pid; // Assuming pid is sent in the request body
  const user = req.params.userId;
  
  const cart = await CartModel.findOne({ user });
  
  if (!cart) {
    return next(new AppError('Cart not found', 404));
  }

  // Check if the product is in the cart
  if (cart.products && cart.products.has(pid)) {
    // Remove the product from the cart
    const product = await Product.findOne({pid});

    const productquantity = cart.products.get(pid)?.quantity || 1;
    const productPrice = product?.price || 0;
    cart.products.delete(pid);
    cart.totalQuantity = cart.totalQuantity - productquantity;
    cart.totalPrice = cart.totalPrice - productPrice * productquantity;

    cart.gst = (cart.totalPrice * 0.18);
    if(cart.totalPrice > 3000){
      cart.deliveryCharges = 0;
    }else{
    cart.deliveryCharges = 50;
    }

    cart.payablePrice = cart.totalPrice + cart.gst + cart.deliveryCharges;

    // Save the updated cart
    await cart.save();

    return res.status(200).json({ message: "success" ,data:cart});
  } else {
    return next(new AppError('Product not found in cart', 404));
  }
});

const updateCartQuantity = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  if (req.user && (req.user as any)._id) {
    req.params.userId = (req.user as any)._id.toString();
  }
  const { pid, quantity } = req.body; // Assuming pid and quantity are sent in the request body
  const user = req.params.userId;
  
  const cart = await CartModel.findOne({ user });
  
  if (!cart) {
    return next(new AppError('Cart not found', 404));
  }else{
    // console.log(cart);
  // Check if the product is in the cart
  if (cart.products && cart.products.has(pid)) {
    // Update the quantity of the product in the cart
    const productDetails = cart.products.get(pid) ;
    if(productDetails){
    const previousQuantity = productDetails.quantity; // Assuming productDetails is an array
    const productPrice = productDetails.product.price; // Assuming productDetails is an array
    
    // Update the quantity and calculate the price difference
    const quantityDifference = quantity - previousQuantity;
    productDetails.quantity = quantity;
    
    // Update totalQuantity and totalPrice
    cart.totalQuantity += quantityDifference;
    cart.totalPrice += productPrice * quantityDifference;

    cart.gst = (cart.totalPrice * 0.18);
    if(cart.totalPrice > 3000){
      cart.deliveryCharges = 0;
    }else{
    cart.deliveryCharges = 50; 
    }

    cart.payablePrice = cart.totalPrice + cart.gst + cart.deliveryCharges;

    }

    // Save the updated cart
    await cart.save();

    return res.status(200).json({ message: "success" ,data:cart});
  } else {
    return next(new AppError('Product not found in cart', 404));
  }
}
});


const getMyCart = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  if (req.user && (req.user as any)._id) {
    req.params.userId = (req.user as any)._id.toString();
  }
  const user = req.params.userId;
  const cart = await CartModel.findOne({ user });
  res.status(200).json({
    message:"success",   
    data: cart});
});







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
