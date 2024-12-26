import {Response, Request, NextFunction} from "express"
import {AppError} from "../shared/errors/appError";


export function handleErrorMiddleware (
    err: Error & Partial<AppError>,
    req: Request ,
    res:Response ,
    next:NextFunction
) {
    const statusCode = err.statusCode ? err.statusCode:  500;
    const message = err.errors ? err.errors : 'Internal Server Error';

    return res.status(statusCode).json({error: message});
}

