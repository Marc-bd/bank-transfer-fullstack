import * as yup from 'yup';
import {TransferStatus} from '../enums/transfer.enum';
import {validate} from "uuid";


export const createTransferSchema = yup.object(
    {
        amount: yup
            .number()
            .typeError('amount field must be a number')
            .positive('amount field  must be a positive value')
            .test(
                'is-decimal',
                'amount field must have up to two decimal places',
                (value) => value ===
                    undefined ||
                    /^\d+(?:\.\d{1,2})?$/.test(value.toString())
            )
            .required('amount field is required'),

        expectedOn: yup
            .date()
            .typeError('expectedOn field must be a valid date')
            .required('expectedOn field is required'),

        dueDate: yup
            .date()
            .typeError('dueDate field must be a valid date')
            .nullable()
            .test(
                'is-not-past',
                'dueDate field cannot be earlier than today',
                (value) => !value || value >= new Date()
            ),
    }
);


export const pathIdSchema = yup.object(
    {
        id: yup
            .string()
            .required('id must be a valid uuid')
            .test('is-valid-uuid', 'id must be a valid uuid', (value) => validate(value))
    }
).required();