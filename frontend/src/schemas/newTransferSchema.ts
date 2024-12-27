import * as Yup from "yup";


export const newTransferSchema = Yup.object().shape(
    {
        amount: Yup.string().required("Campo Obrigatório"),
        expectedOn: Yup.string().required("Campo Obrigatório").length(10, "Data Inválida"),
        duoDate: Yup.string(),

    }
    );
