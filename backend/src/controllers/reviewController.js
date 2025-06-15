import Review from '../models/review.js';
import Product from '../models/product.js';
import asyncHandler from 'express-async-handler';

export const getProductReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({
    product: req.params.productId,
    status: 'approved'
  }).populate('user', 'name');

  res.json(reviews);
});

export const createReview = asyncHandler(async (req, res) => {
  const { rating, comment, images, isVerifiedPurchase } = req.body;

  const product = await Product.findById(req.params.productId);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  const review = await Review.create({
    product: req.params.productId,
    user: req.user?._id || null, // If no auth, fallback to null
    rating,
    comment,
    images,
    isVerifiedPurchase,
    status: 'pending'
  });

  res.status(201).json(review);
});
