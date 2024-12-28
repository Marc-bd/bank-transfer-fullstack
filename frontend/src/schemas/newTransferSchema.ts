import * as Yup from "yup";

export const newTransferSchema = Yup.object().shape({
                                                        amount: Yup.string().required("Campo Obrigatório"),
                                                        expectedOn: Yup.string()
                                                            .required("Campo Obrigatório")
                                                            .length(10, "Data Inválida"),
                                                        dueDate: Yup.string()
                                                            .test(
                                                                "is-after-expectedOn",
                                                                "O Vencimento deve ser" +
                                                                    " maior ou igual ao" +
                                                                    " agendamento",
                                                                function (value) {
                                                                    const { expectedOn } = this.parent;
                                                                    if (!value) return true;


                                                                    const parseDate = (dateString: any) => {
                                                                        const [day, month, year] = dateString.split("/").map(Number);
                                                                        return new Date(year, month - 1, day);
                                                                    };

                                                                    const expectedDate = parseDate(expectedOn);
                                                                    const dueDate = parseDate(value);

                                                                    return dueDate >= expectedDate;
                                                                }
                                                            ),
                                                    });
