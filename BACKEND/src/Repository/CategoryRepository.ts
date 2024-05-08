import { Request, Response, NextFunction } from 'express';
import categoryModel from '../models/category.js';
import catchAsync from '../utels/CatchAsync.js';

const createCategory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body;

  const newCategory = await categoryModel.create({ name });

  res.status(201).json({
    message: 'success',
    category: newCategory,
  });
});

const getAllCategories = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const categories = await categoryModel.find();

  res.status(200).json({
    message: 'success',
    categories,
  });
});

// Other category controller functions like updateCategory, deleteCategory, etc.

export default {
  createCategory,
  getAllCategories,
  // Add other category controller functions here
};
