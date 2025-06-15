import express, { urlencoded } from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import { connect } from 'mongoose';
import connectDB from './src/config/db.js';
import { errorHandler } from './src/middleware/errorMiddleware.js';

// import products from './src/routes/productRoutes.js';
// import reviews from './src/routes/reviewRoutes.js'

dotenv.config({});
connectDB();
const app = express();

const port = process.env.PORT || 5000;




app.get("/", (req, res) => {
    return res.status(200).json({
        message: "Welcome to the backend server!",
        status: "success"
    });

});

//middleware
app.use(express.json());
app.use(cookieParser());

// app.use('/api/products', products);
// app.use('/api', reviews);
app.use(urlencoded({ extended: true }));
const corsOptions = {
    origin: 'http://localhost:5173', // Adjust this to your frontend URL
    credentials: true, // Allow cookies to be sent
};
app.use(cors(corsOptions));
app.use(errorHandler);


app.listen(port, () => { 
    
    console.log(`Server is running on port ${port}`);
});