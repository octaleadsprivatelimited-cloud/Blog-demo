import express from 'express';
import {
  getBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
  getDashboardStats
} from '../controllers/blogController.js';
import { authenticateToken } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

// Public routes
router.get('/', getBlogs);
router.get('/stats', authenticateToken, getDashboardStats);
router.get('/:slug', getBlogBySlug);

// Protected routes
router.post('/', authenticateToken, upload.single('image'), createBlog);
router.put('/:id', authenticateToken, upload.single('image'), updateBlog);
router.delete('/:id', authenticateToken, deleteBlog);

export default router;

