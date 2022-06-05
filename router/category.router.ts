import { Router } from 'express';
import {
  findCategories,
  findCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/category.controller';
import checkAuth from '../middlewares/authenticate';

export default Router()
  .get('/category', findCategories)
  .get('/category/:id', findCategoryById)
  .post('/category', checkAuth, createCategory)
  .put('/category/:id', checkAuth, updateCategory)
  .delete('/category/:id', checkAuth, deleteCategory);
