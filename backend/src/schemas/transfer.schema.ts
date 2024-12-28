import * as yup from 'yup';
import {TransferStatus} from '../enums/transfer.enum';
import {validate} from "uuid";
import { DateTime } from 'luxon';

function isValidDate(dateString: string): boolean {
    const date = DateTime.fromFormat(dateString, 'yyyy/MM/dd');
    return date.isValid && date.year <= 2100
}

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
            .string()
            .typeError('expectedOn field must be a valid string date, YYYY/MM/DD')
            .required('expectedOn field is required')
            .test(
                'is-valid-date',
                'expectedOn field must be a valid string date, YYYY/MM/DD',
                (value) => value === null || value === undefined || isValidDate(value.toString())
            ),

        dueDate: yup
            .mixed()
            .nullable()
            .typeError('dueDate field must be a valid string date, YYYY/MM/DD')
            .test(
                'is-valid-dueDate',
                'dueDate field must be a valid string date, YYYY/MM/DD',
                (value) => {
                    if (value === null || value === undefined) {

                        return true;
                    }
                    return isValidDate(value.toString());
                }
            )
            .test(
                'is-dueDate-after-expectedOn',
                'dueDate must be greater than expectedOn',
                function (value) {
                    const { expectedOn } = this.parent;


                    if (typeof value === 'string' && isValidDate(value) && expectedOn && isValidDate(expectedOn)) {
                        const dueDate = DateTime.fromFormat(value, 'yyyy/MM/dd');
                        const expectedDate = DateTime.fromFormat(expectedOn, 'yyyy/MM/dd');



                        return dueDate >= expectedDate;
                    }

                    return true;
                }
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