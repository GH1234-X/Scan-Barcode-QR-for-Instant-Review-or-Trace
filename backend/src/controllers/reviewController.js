// import Review from '../models/review.js';
// import Product from '../models/product.js';
// import asyncHandler from 'express-async-handler';

// export const getProductReviews = asyncHandler(async (req, res) => {
//   const reviews = await Review.find({
//     product: req.params.productId,
//     status: 'approved'
//   }).populate('user', 'name');

//   res.json(reviews);
// });

// export const createReview = asyncHandler(async (req, res) => {
//   const { rating, comment, images, isVerifiedPurchase } = req.body;

//   const product = await Product.findById(req.params.productId);

//   if (!product) {
//     res.status(404);
//     throw new Error('Product not found');
//   }

//   const review = await Review.create({
//     product: req.params.productId,
//     user: req.user?._id || null, // If no auth, fallback to null
//     rating,
//     comment,
//     images,
//     isVerifiedPurchase,
//     status: 'pending'
//   });

//   res.status(201).json(review);
// });


import Review from '../models/review.js';
import Product from '../models/product.js';
import asyncHandler from 'express-async-handler';

// @desc    Get approved reviews for a product
// @route   GET /api/products/:productId/reviews
// @access  Public
export const getProductReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({
    product: req.params.productId,
    status: 'approved',
  }).populate('user', 'name');

  res.json(reviews);
});

// @desc    Create a new review for a product
// @route   POST /api/products/:productId/reviews
// @access  Public (add `protect` middleware for auth)
export const createReview = asyncHandler(async (req, res) => {
  const { rating, comment, images = [], isVerifiedPurchase = false } = req.body;

  // Validate rating
  if (!rating || rating < 1 || rating > 5) {
    res.status(400);
    throw new Error('Rating must be between 1 and 5');
  }

  // Find product
  const product = await Product.findById(req.params.productId);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  // Optional: prevent duplicate reviews from same user
  if (req.user?._id) {
    const alreadyReviewed = await Review.findOne({
      product: req.params.productId,
      user: req.user._id,
    });

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('You have already submitted a review for this product');
    }
  }

  // Create review
  const review = await Review.create({
    product: req.params.productId,
    user: req.user?._id || null, // If no auth
    rating,
    comment,
    images,
    isVerifiedPurchase,
    status: 'pending', // Auto-approval optional
  });

  // Optional: update product average rating
  const reviews = await Review.find({ product: req.params.productId, status: 'approved' });
  const avgRating =
    reviews.reduce((sum, r) => sum + r.rating, rating) / (reviews.length + 1);

  product.sustainabilityData = {
    ...product.sustainabilityData,
    rating: avgRating,
  };

  await product.save();

  res.status(201).json(review);
});
