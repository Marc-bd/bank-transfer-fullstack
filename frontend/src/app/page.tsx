'use client'
import TransferTable from "@/components/TransferTable";
import FormCreateTransfer from "../components/FormCreateTransfer";
import {useEffect, useState} from "react";
import {ITransfer} from "@/interfaces/ITransfer";
import ViewTransferDetails from "../components/ViewTransferDetails";
import TransferService from "@/services/transferService/TransferService";


export default function Home() {

    const [tableData, setTableData] = useState<ITransfer[]>([]);
    const [viewTransferId, setViewTransferId] = useState<string | undefined>(undefined);

    const [openNewForm, setOpenNewForm] = useState(false);
    const [openViewForm, setOpenViewForm] = useState(false);


    function handleView(transferId: string) {
        setViewTransferId(transferId);
        setOpenViewForm(!openViewForm);
    }


    function onCloseNewForm(data?: ITransfer[]) {
        setOpenNewForm(false);
        if (data) {
            setTableData(data);
        }
    }

    function onCloseEditForm(data?: ITransfer[]) {
        setOpenViewForm(false);
        if (data) {

            setTableData(data);
        }
    }


    useEffect(() => {
        async function fetchTransfersData() {
            try {
                const response = await TransferService.getAll()
                setTableData(response);
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
                setTableData([])
            }
        }

        fetchTransfersData();
    }, []);

    return (
        <div className=" flex flex-col items-center h-full  bg-gray-100 ">


            <div className="w-9/12 pt-20">
                <TransferTable
                    transfers={tableData}
                    onCreate={() => setOpenNewForm(!openNewForm)}
                    onView={(transferId) => handleView(transferId)}
                />
            </div>

            {
                openNewForm && <FormCreateTransfer onCloseForm={(data) => onCloseNewForm(data)}/>
            }

            {
                openViewForm &&
                viewTransferId &&
                <ViewTransferDetails
                    onClose={() => onCloseEditForm()}
                                     transferId={viewTransferId}
                />
            }


        </div>
    );
}

