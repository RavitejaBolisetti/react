/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from 'utils/tableColumn';

import { getCodeValue } from 'utils/getCodeValue';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { convertDate, dateFormatView } from 'utils/formatDateTime';
import { translateContent } from 'utils/translateContent';

import styles from 'assets/sass/app.module.scss';

export const tableColumn = ({ handleButtonClick, typeData }) => {
    const tableColumn = [
        tblPrepareColumns({
            title: translateContent('deliveryNoteInvoiceCancellation.label.requestType'),
            dataIndex: 'requestType',
            width: '20%',
            render: (__, value) => {
                return checkAndSetDefaultValue(getCodeValue(typeData?.DEL_INV_CAN_TYP, value?.requestType));
            },
        }),
        tblPrepareColumns({
            title: translateContent('deliveryNoteInvoiceCancellation.label.requestStatus'),
            dataIndex: 'requestStatus',
            width: '20%',
            render: (__, value) => {
                return checkAndSetDefaultValue(getCodeValue(typeData?.CDLR_INV_APP_STATUS, value?.requestStatus));
            },
        }),

        tblPrepareColumns({
            title: translateContent('deliveryNoteInvoiceCancellation.label.requestNumber'),
            dataIndex: 'requestNumber',
            width: '12%',
        }),

        tblPrepareColumns({
            title: translateContent('deliveryNoteInvoiceCancellation.label.requestDate'),
            dataIndex: 'requestDate',
            width: '12%',
            render: (value) => {
                return convertDate(value, dateFormatView);
            },
        }),
        tblPrepareColumns({
            title: translateContent('deliveryNoteInvoiceCancellation.label.invoiceId'),
            dataIndex: 'invoiceId',
            width: '12%',
        }),
        tblPrepareColumns({
            title: translateContent('deliveryNoteInvoiceCancellation.label.dealerName'),
            dataIndex: 'dealerName',
            width: '12%',
        }),

        tblActionColumn({ handleButtonClick, styles, width: '8%', canEdit: false }),
    ];

    return tableColumn;
};
