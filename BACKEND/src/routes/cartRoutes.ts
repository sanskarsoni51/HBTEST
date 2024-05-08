import express from "express";
import cartRepository from "../Repository/cartRepository.js";
import AuthRepository from "../Repository/AuthRepository.js";



const router = express.Router();

router.get('/',cartRepository.getAllCarts);
router.post('/addToCart',AuthRepository.protect,cartRepository.addToCart)
router.post('/removeFromCart',AuthRepository.protect,cartRepository.removeFromCart)
router.post('/ChangeQuantity',AuthRepository.protect,cartRepository.updateCartQuantity)
router.get('/myCart',AuthRepository.protect,cartRepository.getMyCart);

router.get('/:id',cartRepository.getCartById);
router.post('/',cartRepository.createCart);



export default router;