import React from "react";
import CustomButton from "@/components/CustomButton";

type TransferData = {
    externalId: string;
    amount: number;
    expectedOn: string;
    dueDate: string | null;
    status: string;
};

type TableProps = {
    transfers: TransferData[];
};

function TransferTable({ transfers }: TableProps) {
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-sky-700 max-h-[35rem]">
            <div className="flex flex-row justify-between items-center p-3">
                <h4 className="text-lg font-semibold text-left text-white">
                    Minhas Transferências
                </h4>
                <div>
                    <CustomButton title="Criar Transferência" />
                </div>
            </div>
            <hr className="border-b-2 border-sky-700 w-full bg-sky-700 my-1" />
            <div className="relative max-h-[30rem] overflow-y-auto">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="bg-gray-200 sticky top-0 z-10">
                    <tr>
                        <th scope="col"
                            className="px-6 py-3 text-sky-900 "
                        >
                            Identificação
                        </th>
                        <th scope="col"
                            className="px-6 py-3 text-sky-900"
                        >
                            Valor
                        </th>
                        <th scope="col"
                            className="px-6 py-3 text-sky-900"
                        >
                            Data de agendamento
                        </th>
                        <th scope="col"
                            className="px-6 py-3 text-sky-900"
                        >
                            Vencimento
                        </th>
                        <th scope="col"
                            className="px-6 py-3 text-sky-900"
                        >
                            Status
                        </th>
                        <th scope="col"
                            className="px-6 py-3"
                        >
                            <span className="sr-only">Edit</span>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {transfers.length > 0 ? (
                        transfers.map((transfer: TransferData) => (
                            <tr
                                key={transfer.externalId}
                                className="bg-white border-b hover:bg-gray-50"
                            >
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap overflow-hidden text-ellipsis max-w-[14rem]"
                                >
                                    {transfer.externalId}
                                </th>
                                <td className="px-6 py-4 text-center">{transfer.amount}</td>
                                <td className="px-6 py-4  text-center">{transfer.expectedOn}</td>
                                <td className="px-6 py-4  text-center">{transfer.dueDate}</td>
                                <td className="px-6 py-4  text-center">{transfer.status}</td>
                                <td className="px-6 py-4  text-center">
                                    <a
                                        href="#"
                                        className="font-medium text-blue-600 hover:underline"
                                    >
                                        Editar
                                    </a>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={5}
                                className="px-6 py-4 text-center text-gray-500"
                            >
                                No transfer found. Please add a new transfer.
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
