import express from 'express';
import { getWebsiteContent, updateWebsiteContent, getSection } from '../controllers/websiteContentController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Public route - get all website content
router.get('/', getWebsiteContent);

// Public route - get single section
router.get('/:section_name', getSection);

// Protected routes - update website content (admin only)
router.put('/', authenticateToken, updateWebsiteContent);
router.put('/:section_name', authenticateToken, updateWebsiteContent);

export default router;

