import express from 'express';
import { getProductByCode, createProduct } from '../controllers/productController.js';

const router = express.Router();

router.get('/:code', getProductByCode);     // GET /api/products/:code
router.post('/', createProduct);            // POST /api/products

export default router;
