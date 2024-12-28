

import {httpClient} from "@/services/http";
import {IFormCreateTransfer} from "@/interfaces/IFormCreateTransfer";
import {AxiosError} from "axios";
import {toast} from "sonner";
import {ITransfer} from "@/interfaces/ITransfer";

class TransferService {

    async create(transfer: IFormCreateTransfer): Promise<ITransfer | undefined> {
        try {
            const createdTransfer =  await httpClient.post("/transfers", transfer);
            return createdTransfer.data
        } catch (error: unknown) {
            if(error instanceof AxiosError) {
                toast.error(error.response!.data.error[0]);
            }
           toast.error("Ops, tente mais tarde!");
        }
    }

    async getAll() {
        try {
            const transfers = await httpClient.get("/transfers")
            return transfers.data
        } catch (error: unknown) {
            if(error instanceof AxiosError) {
                toast.error(error.response!.data.error[0]);
            }
            toast.error("Ops, tente mais tarde!");
        }
    }

    async getById(id: string): Promise<ITransfer | undefined> {
        try {
            const transfer =  await httpClient.get(`/transfers/${id}`);
            return transfer.data
        } catch (error) {
            console.log(error);
        }
    }


}

export default new TransferService();