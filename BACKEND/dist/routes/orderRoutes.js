import express from "express";
import OrderRepository from "../Repository/OrderRepository.js";
import AuthRepository from "../Repository/AuthRepository.js";
import paymentRepository from "../Repository/paymentRepository.js";
const router = express.Router();
router.get('/myOrders', AuthRepository.protect, OrderRepository.getOrdersOfUser);
router.post('/createOrder', AuthRepository.protect, OrderRepository.createOrder);
router.patch('/:orderId', OrderRepository.updateOrderById);
router.delete('/:orderId', OrderRepository.deleteOrderById);
router.get('/', OrderRepository.getAllOrders);
router.get('/:orderId', OrderRepository.getOrderById);
router.post("/acceptPayment", AuthRepository.protect, paymentRepository.acceptPayment);
router.post("/verifyPayment", AuthRepository.protect, paymentRepository.verifyPayment);
export default router;
