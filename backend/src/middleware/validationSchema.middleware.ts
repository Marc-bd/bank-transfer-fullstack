import {ObjectSchema, ValidationError} from 'yup';
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../shared/errors/appError';
import {pathIdSchema} from "../schemas/transfer.schema";


export const ValidationSchemaMiddleware = (schema: ObjectSchema<unknown>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validate(req.body, { stripUnknown: true, abortEarly: false });
            next();
        } catch (error) {
            if (error instanceof ValidationError) {
                return next(new AppError(400,  {errors: error.errors}));
            }
            return next(new AppError(500, "Internal Validation Error"));
        }
    };
};
