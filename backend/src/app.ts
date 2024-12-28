import 'reflect-metadata';
import { Request, Response, NextFunction } from 'express';
import ErrorHandler from './middleware/error.middleware';
import { AppDataSource } from './data-source';
import transferRoutes from './routes/transfer.routes';
import {AppError} from "./shared/errors/appError";
import "express-async-errors";

const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());

app.use(
    cors({
             origin: '*',
             credentials: true,
         })
);


app.use('/api', transferRoutes);


app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({
                             status: 'OK',
                             date: Date.now(),
                             process: process.uptime(),
                         });
});


AppDataSource.initialize()
    .then(() => {
        console.log('Connection to the PostgreSQL database successfully established!');

    })
    .catch((error) => {
        console.error('Error connecting to database', error);

        throw new AppError( 500, 'Error connecting to the database');
    });

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});

app.use(ErrorHandler);

export default app;
