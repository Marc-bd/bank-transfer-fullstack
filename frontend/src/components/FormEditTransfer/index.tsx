import {ITransfer} from "@/interfaces/ITransfer";
import Modal from "@/components/Modal";
import {Controller, useForm} from "react-hook-form";
import CustomInput from "@/components/CustomInput";
import {valueMask} from "@/utils/maskValue";
import CustomButton from "@/components/CustomButton";
import {yupResolver} from "@hookform/resolvers/yup";
import {editTransferSchema} from "@/schemas/editTransferSchema";
import {formatDate} from "@/utils/formatDate";
import CustomSelect from "@/components/CustomSelect";

type FormNewTransferProps = {
    onClose: () => void;
    transfer: ITransfer
}


export default function FormEditTransfer({onClose, transfer}: FormNewTransferProps) {
    const {control, register, setError, clearErrors, formState: {errors}, handleSubmit} = useForm(
        {
            resolver: yupResolver(editTransferSchema)
        })


    function formSubmit(data: any) {
        console.log(data)
        onClose()
    }

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
            <div className="bg-white w-96 rounded p-6">
                <form onSubmit={handleSubmit(formSubmit)}>

                    <Controller
                        control={control}
                        name="externalId"
                        defaultValue={transfer.externalId}
                        render={({field}) => (
                            <CustomInput
                                label="Identificação"
                                idName="externalId"
                                placeholder=""
                                {...field}
                            />
                        )}
                    />


                    <Controller
                        control={control}
                        name="amount"
                        defaultValue={valueMask(transfer.amount.toLocaleString())}
                        render={({field}) => (
                            <CustomInput
                                label="Valor da Transferência *"
                                idName="amount"
                                placeholder="Ex: 1000"
                                {...field}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="expectedOn"
                        defaultValue={formatDate(transfer.expectedOn)}
                        render={({field}) => (
                            <CustomInput
                                label="Data de Agendamento *"
                                idName="expectedOn"
                                placeholder="Ex: 01/01/2025, max: 10 anos"
                                {...register('expectedOn')}
                                type={"text"}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="duoDate"
                        defaultValue={transfer.dueDate ? formatDate(transfer.dueDate) : ''}
                        render={({field}) => (
                            <CustomInput
                                label="Data Limite (Opcional)"
                                idName="duoDate"
                                placeholder="Ex: 01/01/2025"
                                required={false}
                                {...register('duoDate')}
                                type={"text"}
                            />
                        )}
                    />

                    <Controller
                        name="status"
                        control={control}
                        defaultValue={transfer.status}
                        render={({ field, fieldState }) => (
                            <CustomSelect
                                options={optionsStatus}
                                idName="status"
                                label="Status"
                                value={field.value}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                                errorMessage={fieldState.error?.message}
                            />
                        )}
                    />

                    <div className={"flex justify-around"}>
                        <CustomButton
                            title={"Cancelar"}
                            typeButton={"cancel"}
                            type={"button"}
                            onClick={() => onClose()}
                        />
                        <CustomButton title={"Salvar"}
                                      type="submit"
                        />
                    </div>

                </form>
            </div>
        </Modal>
    )
}