import express from "express";
import OrderRepository from "../Repository/OrderRepository.js";
import AuthRepository from "../Repository/AuthRepository.js";

const router = express.Router();

router.get('/',OrderRepository.getAllOrders);
router.get('/myOrders',AuthRepository.protect,OrderRepository.getOrdersOfUser);
router.post('/createOrder',AuthRepository.protect,OrderRepository.createOrder);
router.patch('/:orderId',OrderRepository.updateOrderById);
router.delete('/:orderId',OrderRepository.deleteOrderById);

export default router;