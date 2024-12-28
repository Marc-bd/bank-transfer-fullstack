export interface ICreateTransfer {
    amount: string;
    expectedOn: string;
    dueDate?:string | undefined;
}