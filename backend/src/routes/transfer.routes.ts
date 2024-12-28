import {Router} from "express";
import {TransferController} from "../controller/transfer.controller";
import {ValidationPathMiddleware} from "../middleware/validationPath.middleware";
import {catchAsync} from "../shared/errors/catchAsync";
import {ValidationSchemaMiddleware} from "../middleware/validationSchema.middleware";
import {createTransferSchema} from "../schemas/transfer.schema";

const router = Router();

router.post('/transfers',ValidationSchemaMiddleware(createTransferSchema) ,catchAsync(TransferController.create));
router.get('/transfers', catchAsync(TransferController.getAll));
router.get('/transfers/:id', ValidationPathMiddleware(), catchAsync(TransferController.getOne));

export default router;