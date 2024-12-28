
import React, {useState} from "react";
import CustomButton from "@/components/CustomButton";
import {ITransfer} from "@/interfaces/ITransfer";
import {formatDate} from "@/utils/formatDate";


type TableProps = {
    transfers: ITransfer[];
    onCreate: () => void;
    onView: (transferId: string) => void;

};

function TransferTable({transfers, onView, onCreate}: TableProps) {

    function getStatusStyle(status: string): string {
        switch (status) {
            case "canceled":
                return "text-red-500";
            case "pending":
                return "text-orange-500";
            case "completed":
                return "text-green-500";
            default:
                return "text-sky-900";
        }
    }

    function formatStatus(status: string): string {
        switch (status) {
            case "canceled":
                return "Cancelado";
            case "completed":
                return "Concluído";
            default:
                return "Pendente";
        }
    }

    function formatIsoDate(date: string) {
        const newdate = new Date(date);
       return new Intl.DateTimeFormat('pt-BR').format(newdate);
    }



    return (

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-sky-700 max-h-[35rem]">
            <div className="flex flex-row justify-between items-center p-3">
                <h4 className="text-lg font-semibold text-left text-white">
                    Minhas Transferências
                </h4>
                <div>
                    <CustomButton title="Criar Transferência" onClick={() => onCreate()}/>
                </div>
            </div>
            <hr className="border-b-2 border-sky-700 w-full bg-sky-700 my-1"/>
            <div className="relative max-h-[30rem] overflow-y-auto">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="bg-gray-200 sticky top-0 z-10">
                    <tr>
                        <th scope="col"
                            className="px-6 py-3 text-sky-900 text-center "
                        >
                            Valor
                        </th>
                        <th scope="col"
                            className="px-6 py-3 text-sky-900 text-center"
                        >
                            Data de agendamento
                        </th>
                        <th scope="col"
                            className="px-6 py-3 text-sky-900 text-center"
                        >
                            Vencimento
                        </th>
                        <th scope="col"
                            className="px-6 py-3 text-sky-900 text-center"
                        >
                            Status
                        </th>
                        <th scope="col"
                            className="px-6 py-3 text-sky-900 text-center"
                        >
                            Criado em
                        </th>
                        <th scope="col"
                            className="px-6 py-3 text-sky-900 text-center"
                        >
                        </th>

                    </tr>
                    </thead>
                    <tbody>
                    {transfers?.length > 0 ? (
                        transfers.map((transfer: ITransfer) => (
                            <tr
                                key={transfer.externalId}
                                className="bg-white border-b hover:bg-gray-50"
                            >
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap overflow-hidden text-ellipsis max-w-[14rem]"
                                >
                                    {transfer.amount.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
                                </th>
                                <td className="px-6 py-4  text-center">{formatDate(transfer.expectedOn)}</td>
                                <td className="px-6 py-4  text-center">{transfer.dueDate ? formatDate(transfer.dueDate) : '-'}</td>
                                <td className={`px-6 py-4 font-semibold text-center ${getStatusStyle(transfer.status)}`}>{formatStatus(transfer.status)}</td>
                                <td className="px-6 py-4 text-center">{formatIsoDate(transfer.createdAt)}</td>
                                <td className="px-6 py-4 text-center">{
                                    <button
                                        onClick={() => onView(transfer.externalId)}
                                        className={"text-sky-500 font-semibold text-sm"}>
                                        Detalhes
                                    </button>
                                }</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={7}
                                className="px-6 py-4 bg-gray-200 text-center text-sky-950 text-[1rem] font-semibold">
                                <div className={"flex flex-col gap-5 py-4"}>
                                    <p>

                                Ainda não há nenhuma transação cadastrada.
                                    </p>
                                    <p>
                                Para adicionar uma nova, é só clicar no botão <span className={"font-bold"}> Criar
                                        Transferência</span>

                                    </p>
                                </div>
                            </td>

                        </tr>
                    )}
                    </tbody>
                </table>
            </div>



        </div>
    );
}

export default TransferTable;
