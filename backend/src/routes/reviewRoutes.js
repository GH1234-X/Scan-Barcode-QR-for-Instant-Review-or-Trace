import express from 'express';
// import { protect } from '../middleware/authMiddleware.js';
import { getProductReviews, createReview } from '../controllers/reviewController.js';

const router = express.Router();

router.get('/:productId/reviews', getProductReviews);
// router.post('/:productId/reviews', protect, createReview); // Uncomment after auth is ready
router.post('/:productId/reviews', createReview); // For now, no auth

export default router;
