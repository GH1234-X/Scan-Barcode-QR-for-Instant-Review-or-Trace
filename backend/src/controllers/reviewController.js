const Review = require('../models/review.js');
const Product = require('../models/product.js');
const asyncHandler = require('express-async-handler');

// @desc    Get reviews for a product
// @route   GET /api/products/:productId/reviews
// @access  Public
const getProductReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ 
    product: req.params.productId,
    status: 'approved' // Only show approved reviews
  }).populate('user', 'name');

  res.json(reviews);
});

// @desc    Create new review
// @route   POST /api/products/:productId/reviews
// @access  Private
const createReview = asyncHandler(async (req, res) => {
  const { rating, comment, images, isVerifiedPurchase } = req.body;

  const product = await Product.findById(req.params.productId);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  const review = await Review.create({
    product: req.params.productId,
    user: req.user._id, // Assuming you have auth middleware
    rating,
    comment,
    images,
    isVerifiedPurchase,
    status: 'pending' // Default to pending for moderation
  });

  res.status(201).json(review);
});

module.exports = {
  getProductReviews,
  createReview
};