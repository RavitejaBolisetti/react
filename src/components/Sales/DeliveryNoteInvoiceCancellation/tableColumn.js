/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from 'utils/tableColumn';

import { getCodeValue } from 'utils/getCodeValue';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { convertDate, dateFormatView } from 'utils/formatDateTime';

import styles from 'assets/sass/app.module.scss';

export const tableColumn = ({ handleButtonClick, typeData }) => {
    const tableColumn = [
        tblPrepareColumns({
            title: 'Request Type',
            dataIndex: 'requestType',
            width: '20%',
            render: (__, value) => {
                return checkAndSetDefaultValue(getCodeValue(typeData?.DEL_INV_CAN_TYP, value?.requestType));
            },
        }),
        tblPrepareColumns({
            title: 'Request Status',
            dataIndex: 'requestStatus',
            width: '20%',
            render: (__, value) => {
                return checkAndSetDefaultValue(getCodeValue(typeData?.INV_DEL_NOT_REQ_TYP, value?.requestStatus));
            },
        }),

        tblPrepareColumns({
            title: 'Request Number',
            dataIndex: 'requestNumber',
            width: '12%',
        }),

        tblPrepareColumns({
            title: 'Request Date',
            dataIndex: 'requestDate',
            width: '12%',
            render: (value) => {
                return convertDate(value, dateFormatView);
            },
        }),
        tblPrepareColumns({
            title: 'Delivery Note/Invoice ID',
            dataIndex: 'invoiceId',
            width: '12%',
        }),
        tblPrepareColumns({
            title: 'Dealer Name',
            dataIndex: 'dealerName',
            width: '12%',
        }),

        tblActionColumn({ handleButtonClick, styles, width: '8%', canEdit: false }),
    ];

    return tableColumn;
};
