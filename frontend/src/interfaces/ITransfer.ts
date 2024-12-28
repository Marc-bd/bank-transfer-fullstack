export interface ITransfer {
    externalId: string;
    amount: number;
    expectedOn: string;
    dueDate:string | null;
    status: string;
    observation: string;
    createdAt: string;
}