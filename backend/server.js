import express, { urlencoded } from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import { errorHandler } from './src/middleware/errorMiddleware.js';

import productRoutes from './src/routes/productRoutes.js';
import reviewRoutes from './src/routes/reviewRoutes.js';

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
};
app.use(cors(corsOptions));

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to the backend server!",
        status: "success"
    });
});

// ✅ Mount routes
app.use('/api/products', productRoutes);     // /api/products/:code or POST /
app.use('/api/products', reviewRoutes);      // /api/products/:productId/reviews

// ✅ Error handler last
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
