import express from 'express';
import dotenv from 'dotenv/config';
import ApiError from './utils/apiError.utils.js';
import errorHandler from './middlewares/globalError.middleware.js';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';

// routesImport
import authRouter from './routes/auth.route.js';
import userRouter from './routes/user.route.js';
import productRouter from './routes/product.route.js';
import reviewRouter from './routes/review.route.js';

const __dirname = import.meta.dirname;
const app = express();

// inbuilt middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// third_party packages/middlewares
app.use(cors());
app.use(helmet());
app.use(cookieParser())
const accessLogs = fs.createWriteStream(path.join(__dirname,'access.log'), { flags: 'a' });
app.use(morgan('combined',{stream: accessLogs}));

// Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/product', productRouter);
app.use('/api/v1/review',reviewRouter);

// Created middlewares
app.use((req, res, next) => {
    next(new ApiError(404, 'Route not found'));
});
app.use(errorHandler);

export {app}