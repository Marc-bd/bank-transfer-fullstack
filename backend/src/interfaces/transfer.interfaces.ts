
import {TransferStatus} from "../enums/transfer.enum";

export interface CreateTransfer {
    externalId: string;
    amount: number;
    expectedOn: Date;
    dueDate?: Date;
    status: TransferStatus;
}