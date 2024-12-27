import Modal from "@/components/Modal";
import CustomInput from "@/components/CustomInput";
import {useForm, Controller} from "react-hook-form";
import {valueMask} from "@/utils/maskValue";
import {dateMask} from "@/utils/maskDate";
import {dateValidation} from "@/utils/dateValidation";
import {newTransferSchema} from "@/schemas/newTransferSchema";
import {yupResolver} from "@hookform/resolvers/yup";
import CustomButton from "@/components/CustomButton";

type FormNewTransferProps = {
    onClose: () => void;
}

export default function FormNewTransfer({onClose}: FormNewTransferProps) {

    const {control, register, setError, clearErrors, formState: {errors}, handleSubmit} = useForm(
        {
            resolver: yupResolver(newTransferSchema)
        })


    function formSubmit(data: any) {
        console.log(data)
        onClose()
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
                        name="duoDate"
                        render={({field}) => (
                            <CustomInput
                                label="Data Limite (Opcional)"
                                idName="duoDate"
                                placeholder="Ex: 01/01/2025"
                                required={false}
                                {...register('duoDate')}
                                value={field.value || ''}
                                type={"text"}
                                maxLength={10}
                                errorMessage={errors.duoDate?.message}
                                onChange={(event) => {
                                    field.onChange(
                                        dateMask(event.target.value)
                                    );

                                    if (event.target.value.length > 9) {
                                        const validDate = dateValidation(event.target.value)
                                        if (!validDate) {
                                            setError('duoDate', {
                                                type: 'manual',
                                                message: "Data Inválida"
                                            })
                                        }
                                    } else {
                                        clearErrors('duoDate')
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