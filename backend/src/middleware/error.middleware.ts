
import { Request, Response, NextFunction } from 'express';
import {AppError} from "../shared/errors/appError";


function ErrorHandler(error: any, req: Request, res: Response, next: NextFunction) {
    let statusCode = error.statusCode || 500;
    let status = error.status || 'error';


    if (!(error instanceof AppError)) {
        statusCode = 500;
        status = 'error';
        error.message = error;
    }

    res.status(statusCode).json({
                                    status,
                                    message: error.message

                                });
}



export default ErrorHandler;
