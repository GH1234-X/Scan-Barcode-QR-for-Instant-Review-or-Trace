import Product from '../models/product.js';
import asyncHandler from 'express-async-handler';

export const getProductByCode = asyncHandler(async (req, res) => {
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

export const createProduct = asyncHandler(async (req, res) => {
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
