import express from 'express';
import categoryController from '../Repository/CategoryRepository.js';

const router = express.Router();

router.post('/', categoryController.createCategory);
router.get('/', categoryController.getAllCategories);
// Add other routes as needed

export default router;
