import { ValidationError} from "yup";
import {NextFunction, Request, Response} from "express";
import {AppError} from "../shared/errors/appError";
import {pathIdSchema} from "../schemas/transfer.schema";

export const ValidationPathMiddleware = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {id} = req.params
            await pathIdSchema.validate({id}, { stripUnknown: true, abortEarly: false });
            next();
        } catch (error) {
            if (error instanceof ValidationError) {
                return next(new AppError(400, 'id must be a valid uuid'))
            }
            return next(new AppError(500, "Internal Validation Error"));
        }
    };
};
