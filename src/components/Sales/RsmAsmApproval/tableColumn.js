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
            title: translateContent('rsmAsmApproval.label.requestType'),
            dataIndex: 'requestType',
            width: '16%',
            render: (__, value) => checkAndSetDefaultValue(getCodeValue(typeData?.DEL_INV_CAN_TYP, value?.requestType)),
        }),
        tblPrepareColumns({
            title: translateContent('rsmAsmApproval.label.requestStatus'),
            dataIndex: 'requestStatus',
            width: '16%',
            render: (__, value) => checkAndSetDefaultValue(getCodeValue(typeData?.DEL_NOTE_CANCL_STATS, value?.requestStatus)),
        }),

        tblPrepareColumns({
            title: translateContent('rsmAsmApproval.label.requestNumber'),
            dataIndex: 'requestNumber',
            width: '12%',
        }),

        tblPrepareColumns({
            title: translateContent('rsmAsmApproval.label.requestDate'),
            dataIndex: 'requestDate',
            width: '12%',
            render: (value) => {
                return value ? convertDate(value, dateFormatView) : 'NA';
            },
        }),
        tblPrepareColumns({
            title: translateContent('rsmAsmApproval.label.deliveryOrInvoiceId'),
            dataIndex: 'deliveryOrInvoiceId',
            width: '12%',
        }),
        tblPrepareColumns({
            title: translateContent('rsmAsmApproval.label.deliveryOrInvoiceDate'),
            dataIndex: 'deliveryOrInvoiceDate',
            width: '12%',
            render: (value) => {
                return value ? convertDate(value, dateFormatView) : 'NA';
            },
        }),
        tblPrepareColumns({
            title: translateContent('rsmAsmApproval.label.dealerName'),
            dataIndex: 'dealerName',
            width: '12%',
        }),

        tblActionColumn({ handleButtonClick, styles, width: '8%', canEdit: false }),
    ];

    return tableColumn;
};
