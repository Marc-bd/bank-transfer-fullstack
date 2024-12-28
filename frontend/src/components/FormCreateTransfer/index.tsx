'use client'
import Modal from "@/components/Modal";
import CustomInput from "@/components/CustomInput";
import {useForm, Controller} from "react-hook-form";
import {valueMask} from "@/utils/maskValue";
import {dateMask} from "@/utils/maskDate";
import {dateValidation} from "@/utils/dateValidation";
import {newTransferSchema} from "@/schemas/newTransferSchema";
import {yupResolver} from "@hookform/resolvers/yup";
import CustomButton from "@/components/CustomButton";
import {ITransfer} from "@/interfaces/ITransfer";
import TransferService from "@/services/transferService/TransferService";
import {ICreateTransfer} from "@/interfaces/ICreateTransfer";
import {toast} from "sonner";
import {IFormCreateTransfer} from "@/interfaces/IFormCreateTransfer";
import {useEffect, useState} from "react";

type FormCreateTransferProps = {
    onCloseForm: (data?: ITransfer[]) => void;
}

export default function FormCreateTransfer({onCloseForm}: FormCreateTransferProps) {

    const {control,
        register,
        setError,
        clearErrors,
        formState: {errors},
        handleSubmit,
        watch
    } = useForm(
        {
            resolver: yupResolver<ICreateTransfer>(newTransferSchema)
        })

    const [loading, setLoading] = useState<boolean>(false);


    function convertStringDateToDate(date:string) {
        const [day, month, year] = date.split('/');
       return new Date(`${year}-${month}-${day}`);
    }

    function getPostMessage(status: string) {
        switch (status) {
            case 'completed':
                return toast.success("Tranferência conclúida com sucesso!")
            case 'canceled':
                return  toast.error('Transfêrencia Cancelada. Clique em detalhes para mais' +
                                        ' informações!')
            default:
                return toast.warning("Transferência Pendente. Clique em detalhes para mais" +
                                         " informações!")
        }
    }




    async function formSubmit(data: ICreateTransfer) {
        setLoading(true);
        try {
            const newTransferData: IFormCreateTransfer = {
              amount: parseFloat(data.amount.replace('.', '').replace(',', '.')),
                dueDate: data.dueDate ? convertStringDateToDate(data.dueDate) : null ,
                expectedOn: convertStringDateToDate(data.expectedOn),
            }

            const newTransfer = await TransferService.create(newTransferData)

            if(newTransfer) {
                getPostMessage(newTransfer.status)
                const transfers = await TransferService.getAll();
                onCloseForm(transfers);
                setLoading(false);
            } else {

                onCloseForm()
                setLoading(false);
            }

        } catch (error) {
            toast.error("Ops, parece que o servidor não está conectado!")
            onCloseForm()
            setLoading(false);
        }
    }




    return (
        <Modal>
            <div className="bg-white w-96 h-96 rounded p-6">
                <form onSubmit={handleSubmit(formSubmit)}>
                    <Controller
                        control={control}
                        name="amount"
                        render={({field}) => (
                            <CustomInput
                                label="Valor da Transferência *"
                                idName="amount"
                                placeholder="Ex: 1000"
                                {...field}
                                value={field.value || ''}
                                errorMessage={errors.amount?.message}
                                onChange={(event) => {
                                    field.onChange(
                                        valueMask(event.target.value)
                                    );
                                }}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="expectedOn"
                        render={({field}) => (
                            <CustomInput
                                label="Data de Agendamento *"
                                idName="expectedOn"
                                placeholder="Ex: 01/01/2025, max: 10 anos"
                                {...register('expectedOn')}
                                value={field.value || ''}
                                type={"text"}
                                maxLength={10}
                                errorMessage={errors.expectedOn?.message}
                                onChange={(event) => {
                                    field.onChange(
                                        dateMask(event.target.value)
                                    );

                                    if (event.target.value.length > 9) {
                                        const validDate = dateValidation(event.target.value)
                                        if (!validDate) {

                                            setError('expectedOn', {
                                                type: 'manual',
                                                message: "Data Inválida"
                                            })
                                        } else {
                                            clearErrors('expectedOn')
                                        }
                                    }

                                }}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="dueDate"
                        render={({field}) => (
                            <CustomInput
                                label="Data de Vencimento (Opcional)"
                                idName="dueDate"
                                placeholder="Ex: 01/01/2025"
                                required={false}
                                {...register('dueDate')}
                                value={field.value || ''}
                                type={"text"}
                                maxLength={10}
                                errorMessage={errors.dueDate?.message}
                                onChange={(event) => {
                                    field.onChange(
                                        dateMask(event.target.value)
                                    );

                                    if (event.target.value.length > 9) {
                                        const validDate = dateValidation(event.target.value)
                                        if (!validDate) {
                                            setError('dueDate', {
                                                type: 'manual',
                                                message: "Data Inválida"
                                            })
                                        }
                                    } else {
                                        clearErrors('dueDate')
                                    }

                                }}
                            />
                        )}
                    />

                    <div className={"flex justify-around"}>
                        <CustomButton
                            title={"Cancelar"}
                            typeButton={"cancel"}
                            type={"button"}
                            onClick={() => onCloseForm()}
                            disabled={loading}
                        />
                        <CustomButton
                            loading={loading}
                            title={"Salvar"}
                            type="submit"
                            disabled={loading}
                        />
                    </div>

                </form>
            </div>
        </Modal>
    )
}