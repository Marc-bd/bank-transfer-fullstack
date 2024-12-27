import * as Yup from "yup";


export const editTransferSchema = Yup.object().shape(
    {
        externalId: Yup.string().required(),
        amount: Yup.string().required("Campo Obrigatório"),
        expectedOn: Yup.string().required("Campo Obrigatório").length(10, "Data Inválida"),
        duoDate: Yup.string(),
        status: Yup.string(),
        createdAt: Yup.string(),

    }
);


