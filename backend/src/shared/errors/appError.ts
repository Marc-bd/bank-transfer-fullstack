export class AppError extends Error {
    statusCode: number;
    isOperational: boolean;



    constructor(statusCode: number, message: string ) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}