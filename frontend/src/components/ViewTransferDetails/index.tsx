'use client'
import {ITransfer} from "@/interfaces/ITransfer";
import Modal from "@/components/Modal";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import {formatDate} from "@/utils/formatDate";
import CustomSelect from "@/components/CustomSelect";
import TransferService from "@/services/transferService/TransferService";
import {toast} from "sonner";
import {useEffect, useState} from "react";
import CustomTextArea from "@/components/CustomTextArea";
import Spinner from "@/components/Spinner";

type ViewTransferDetailsProps = {
    onClose: () => void;
    transferId: string
}


export default function ViewTransferDetails({onClose, transferId}: ViewTransferDetailsProps) {

    const [loading, setLoading] = useState(false)
    const [transferData, setTransferData] = useState<ITransfer | undefined>(undefined);


    async function getTransferDetails() {
        setLoading(true)
        const transfer = await TransferService.getById(transferId);

        if (!transfer) {
            toast.error("Erro ao buscar a transferência, tente mais tarde!");
            onClose()
            setLoading(false)
        }
        setLoading(false)

        setTransferData(transfer);
    }

    useEffect(() => {
        async function getTransferDetails() {
            const transfer = await TransferService.getById(transferId);

            if (!transfer) {
                toast.error("Erro ao buscar a transferência, tente mais tarde!");
                onClose()
            }

            setTransferData(transfer);
        }

        getTransferDetails();

    }, [])


    const optionsStatus = [

        {
            value: 'canceled',
            label: 'Cancelado'
        },
        {
            value: 'pending',
            label: 'Pendente'
        },
        {
            value: 'completed',
            label: 'Concluído'
        },
    ]



    return (
        <Modal>
            {
                !loading && transferData && (
            <div className="bg-white w-96 rounded p-6">
                <CustomInput
                    label="Identificação"
                    idName="externalId"
                    placeholder=""
                    value={transferData.externalId}
                    readOnly={true}
                />

                <CustomInput
                    label="Valor"
                    idName="externalId"
                    placeholder=""
                    value={transferData.amount.toLocaleString('pt-BR',
                                                      {currency: 'BRL', style: "currency"})}
                    readOnly={true}
                />

                <CustomInput
                    label="Data de Agendamento"
                    idName="externalId"
                    placeholder=""
                    value={formatDate(transferData.expectedOn)}
                    readOnly={true}
                />
                <CustomInput
                    label="Data de Vencimento"
                    idName="externalId"
                    placeholder=""
                    value={transferData.dueDate ? formatDate(transferData.dueDate) : ''}
                    readOnly={true}
                />

                <CustomSelect
                    options={optionsStatus}
                    idName="status"
                    label="Status"
                    value={transferData.status}
                    disable={true}
                />

                <CustomTextArea
                    title="Observação"
                    data={transferData.observation}
                    readOnly={true}
                />

                <div className="flex flex-col w-9/12 justify-self-center m-4">

                    <CustomButton
                        onClick={() => onClose()}
                        title={"Fechar"}
                        typeButton={"secondary"}
                    />
                </div>


            </div>
                )
            }

            {
                loading &&
                <div className="bg-white  h-52 rounded p-6 flex flex-col items-center justify-center gap-12">

                    <h4 className={"text-sky-900 font-semibold text-center text-lg"}>Buscando informações da transferência</h4>
                    <Spinner sizeRem={2.5}/>


                </div>
            }
        </Modal>
    )
}