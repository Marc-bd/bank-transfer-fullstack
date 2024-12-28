import {AppError} from "../shared/errors/appError";
import {AppDataSource} from "../data-source";
import {Transfer} from "../entities/transfer.entity";
import {TransferStatus} from "../enums/transfer.enum";
import {CreateTransfer} from "../interfaces/transfer.interfaces";
import {settlementInfoData} from "../shared/constants";
const { DateTime } = require("luxon");


export default class TransferService {


    private static transferRepository = AppDataSource.getRepository(Transfer);


    private static async randomSettlement(): Promise<{
        status: TransferStatus;
        observation: string
    }> {

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    const statusValues = Object.values(TransferStatus);

                    const randomStatus = statusValues[Math.floor(Math.random() *
                                                                     statusValues.length)];

                    const observations: string[] = settlementInfoData[randomStatus];


                    if (!observations || observations.length === 0) {
                        throw new Error(`No comments found for status: ${randomStatus}`);
                    }

                    const randomObservation = observations[Math.floor(Math.random() *
                                                                          observations.length)];

                    resolve({
                                status: randomStatus,
                                observation: randomObservation,
                            });
                } catch (error) {
                    reject(error);
                }
            }, 2000);
        });
    }


    public static async create(data: CreateTransfer) {
        try {
            const settlement = await this.randomSettlement()
            const transfer = new Transfer();
            transfer.amount = data.amount;
            transfer.expectedOn =  data.expectedOn
            transfer.dueDate =
                data.dueDate ? data.dueDate : null;


            transfer.status =
                settlement.status;
            transfer.observation =
                settlement.observation;



            await this.transferRepository.save(transfer);

            return transfer;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
        }

    }


    public static async getAll() {
        try {
            return await this.transferRepository.find({
                                                          order: {
                                                              createdAt: 'desc'
                                                          }
                                                      });
        } catch (error) {
            throw new AppError(500, 'Error fetching transfers');
        }
    }

    public static async getOne(id: string) {
        try {
            const transfer = await this.transferRepository.findOneByOrFail({externalId: id})
            return transfer;
        } catch (error) {
            throw new AppError(400, `Transfer with id ${id} not found`);
        }
    }




}


