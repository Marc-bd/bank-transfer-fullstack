import {AppError} from "../shared/errors/appError";
import {AppDataSource} from "../data-source";
import {Transfer} from "../entities/transfer.entity";
import {TransferStatus} from "../enums/transfer.enum";
import {CreateTransfer} from "../interfaces/transfer.interfaces";

class TransferService {
    private static transferRepository = AppDataSource.getRepository(Transfer);

    public static async create(data: CreateTransfer) {
        try {

            const transfer = new Transfer();
            transfer.amount = data.amount;
            transfer.expectedOn = new Date(data.expectedOn).toISOString();
            transfer.dueDate = data.dueDate ? new Date(data.dueDate).toISOString() : null;
            transfer.status = data.status;


            await TransferService.transferRepository.save(transfer);

            return transfer;
        } catch (error: unknown) {
            if(error instanceof Error) {
            throw new AppError(400, error.message);
            } else {
                throw new AppError(500, 'Error creating transfer');
            }
        }
    }


    public static async getAll() {
        try {
            return await TransferService.transferRepository.find();
        } catch (error) {
            throw new AppError(500, 'Error fetching transfers');
        }
    }

    public static async getOne(id: string) {
        try {
            const transfer = await this.transferRepository.findOneBy({externalId: id})

            if(!transfer) {
                throw new AppError(404, 'Not Found');
            }
            return transfer;
        } catch (error) {
            throw new AppError(500, 'Error fetching transfers');
        }
    }


    public static async updateStatus(id: string, status: TransferStatus) {
        try {

            const transfer = await TransferService
                .transferRepository
                .findOne({ where: { externalId: id } });


            if (!transfer) {
                throw new AppError(404, 'Transfer not found');
            }

            transfer.status = status;

            await TransferService.transferRepository.save(transfer);

            return transfer;

        } catch (error: unknown) {

            if(error instanceof AppError) {
                throw new AppError(400, error.message);
            } else {
                throw new AppError(500, 'Error updating transfer');
            }
        }
    }
}

export { TransferService };
