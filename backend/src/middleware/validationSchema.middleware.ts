import {ObjectSchema, ValidationError} from 'yup';
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../shared/errors/appError';



export const ValidationSchemaMiddleware = (schema: ObjectSchema<unknown>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validate(req.body, { stripUnknown: true });
            next();
        } catch (error) {
            if (error instanceof ValidationError) {
                return next(new AppError(400, error.errors.toString()));
            }
            console.log(error)
            return next(new AppError(500, "Internal Validation Error"));
        }
    };
};
