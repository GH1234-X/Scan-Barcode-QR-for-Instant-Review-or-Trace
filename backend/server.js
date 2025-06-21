// import express, { urlencoded } from 'express';
// import cors from 'cors';
// import cookieParser from "cookie-parser";
// import dotenv from 'dotenv';
// import connectDB from './src/config/db.js';
// import { errorHandler } from './src/middleware/errorMiddleware.js';
// import axios from 'axios'; 
// import productRoutes from './src/routes/productRoutes.js';
// import reviewRoutes from './src/routes/reviewRoutes.js';
// import authRoutes from "./src/routes/authRoutes.js";


// dotenv.config();
// connectDB();

// const app = express();
// const port = process.env.PORT || 5000;



// const corsOptions = {
//     origin: '*',
//     credentials: true,
// };
// app.use(cors(corsOptions));

// app.get("/", (req, res) => {
//     res.status(200).json({
//         message: "Welcome to the backend server!",
//         status: "success"
//     });
// });

// app.use(express.json());
// app.use(urlencoded({ extended: true }));
// app.use(cookieParser());
// app.use('/api/auth', authRoutes);

// // ✅ Mount routes
// app.use('/api/products', productRoutes);     // /api/products/:code or POST /
// app.use('/api/products', reviewRoutes);      // /api/products/:productId/reviews

// app.get('/api/image-proxy', async (req, res) => {
//     const imageUrl = req.query.url;

//     if (!imageUrl) {
//         return res.status(400).send('Image URL is required');
//     }

//     try {
//         const response = await axios.get(imageUrl, {
//             responseType: 'arraybuffer',
//             headers: {
//                 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
//                 'Accept': 'image/*,*/*;q=0.8',
//                 'Referer': 'https://www.newegg.com/', // optional spoofing
//             },
//         });

//         const contentType = response.headers['content-type'] || 'image/jpeg';
//         res.set('Content-Type', contentType);
//         res.send(response.data);
//     } catch (error) {
//         // console.error('Image proxy error:', error.message);
//         console.error('Image proxy error:', error.response?.status, error.response?.statusText);

//         res.status(500).send('Failed to load image');
//     }
// });

// // ✅ Error handler last
// app.use(errorHandler);

// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });
import express, { urlencoded } from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import { errorHandler } from './src/middleware/errorMiddleware.js';
import axios from 'axios';
import productRoutes from './src/routes/productRoutes.js';
import reviewRoutes from './src/routes/reviewRoutes.js';
import authRoutes from "./src/routes/authRoutes.js";

dotenv.config();
connectDB();

const app = express();

// ✅ CORS Setup - only allow your frontend
const corsOptions = {
  origin: "https://scan-barcode-qr-for-instant-review.vercel.app", // your frontend Vercel domain
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ Routes
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the backend server!",
    status: "success",
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/products', reviewRoutes);

app.get('/api/image-proxy', async (req, res) => {
  const imageUrl = req.query.url;
  if (!imageUrl) return res.status(400).send('Image URL is required');

  try {
    const response = await axios.get(imageUrl, {
      responseType: 'arraybuffer',
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'image/*,*/*;q=0.8',
        'Referer': 'https://www.newegg.com/',
      },
    });

    const contentType = response.headers['content-type'] || 'image/jpeg';
    res.set('Content-Type', contentType);
    res.send(response.data);
  } catch (error) {
    console.error('Image proxy error:', error.response?.status, error.response?.statusText);
    res.status(500).send('Failed to load image');
  }
});

// ✅ Error Handler
app.use(errorHandler);

// ✅ Export the app instead of listening (Vercel uses this)
export default app;
