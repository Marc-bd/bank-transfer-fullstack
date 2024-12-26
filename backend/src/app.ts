import 'reflect-metadata';
import  {Request, Response} from 'express';
import {handleErrorMiddleware} from "./middleware/error.middleware";
import {AppDataSource} from "./data-source"
import transferRoutes from "./routes/transfer.routes";

const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json());

app.use(cors({
                 origin: '*',
                 credentials: true
             }))



AppDataSource.initialize()
    .then(() => {
        console.log('Connection to the PostgreSQL database successfully established!');

        // Iniciar o servidor após a conexão bem-sucedida
        app.listen(8080, () => {
            console.log('Server is running on port 8080');
        });
    })
    .catch((error) => {
        console.error('Error connecting to database', error);
    });


app.use('/api', transferRoutes);
app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({
                             status: 'OK',
                             date: Date.now(),
                             process: process.uptime(),
                         });
});
app.use(handleErrorMiddleware)



export default app;
