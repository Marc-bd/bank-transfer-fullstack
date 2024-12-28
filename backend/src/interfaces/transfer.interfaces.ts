
import {TransferStatus} from "../enums/transfer.enum";

export interface CreateTransfer {
    externalId: string;
    amount: number;
    expectedOn: string;
    dueDate?: string;
    status: TransferStatus;
}