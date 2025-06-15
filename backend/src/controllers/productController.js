const Product = require('../models/product.js');
const asyncHandler = require('express-async-handler');

// @desc    Get product by barcode/QR code
// @route   GET /api/products/:code
// @access  Public
const getProductByCode = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ 
    $or: [
      { barcode: req.params.code },
      { qrCode: req.params.code }
    ]
  });

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  res.json(product);
});

// @desc    Create a new product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const {
    barcode,
    name,
    description,
    brand,
    origin,
    ingredients,
    sustainabilityData,
    manufacturingDate,
    expiryDate,
    qrCode,
    images
  } = req.body;

  const product = await Product.create({
    barcode,
    name,
    description,
    brand,
    origin,
    ingredients,
    sustainabilityData,
    manufacturingDate,
    expiryDate,
    qrCode,
    images
  });

  res.status(201).json(product);
});

module.exports = {
  getProductByCode,
  createProduct
};