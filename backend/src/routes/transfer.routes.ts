import {Router} from "express";
import {TransferController} from "../controller/transfer.controller";
import {ValidationSchemaMiddleware} from "../middleware/validationSchema.middleware";
import {transferSchema, updateTransferSchema} from "../schemas/transfer.schema";
import {ValidationPathMiddleware} from "../middleware/validationPath.middleware";

const router = Router();

router.post('/transfers', ValidationSchemaMiddleware(transferSchema), TransferController.create);
router.get('/transfers', TransferController.getAll);
router.get('/transfers/:id', ValidationPathMiddleware(), TransferController.getOne);
router.put('/transfers/:id', ValidationPathMiddleware(), ValidationSchemaMiddleware(updateTransferSchema), TransferController.update);


export default router;