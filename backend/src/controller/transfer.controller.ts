import {Request, Response} from 'express';
import {TransferService} from '../services/transfer.service';
import {transferSchema} from "../schemas/transfer.schema";


export class TransferController {

    static async create(req: Request, res: Response): Promise<Response> {

            const transfer = await TransferService.create(req.body);
            return res.status(201).json(transfer);

    }

    static async getAll(req: Request, res: Response): Promise<Response> {
        const transfers = await TransferService.getAll();
        return res.status(200).json(transfers);
    }

    static async getOne(req: Request, res: Response): Promise<Response> {
        const {id} = req.params;
        const transfer = await TransferService.getOne(id);
        return res.status(200).json(transfer);

    }


    static async update(req: Request, res: Response): Promise<Response> {
        const {id} = req.params;
        const {status} = req.body;

        const transfer = await TransferService.updateStatus(id, status);

        return res.status(200).json(transfer);

    }

}
