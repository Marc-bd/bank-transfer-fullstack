import {TransferStatus} from "../../enums/transfer.enum";

type SettlementInfoData = {
    [key in TransferStatus]: string[];
};

export const settlementInfoData: SettlementInfoData =
    {
        completed: ["Operação concluída com sucesso!"],
        pending: [
            "A transação está pendente devido à necessidade de aprovação adicional por parte do" +
            " banco",
            "O pagamento está pendente, aguardando a verificação dos dados de pagamento" +
            " fornecidos.",
            "A transação está pendente devido a uma análise de segurança que ainda está em" +
            " andamento.",
            "A transação está pendente, aguardando a liberação de fundos por parte do cliente."
        ],
        canceled: [
            "A transação foi cancelada devido a um erro no processo de pagamento.",
            "O pedido foi cancelado por questões de inconsistência nos dados fornecidos.",
            "O pagamento foi interrompido devido à falta de fundos na conta.",
            "A transação foi cancelada por motivos de segurança, devido a atividades suspeitas.",
            "A transação foi cancelada após a verificação de um erro técnico no sistema bancário."
        ]
    }
