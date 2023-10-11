/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from 'utils/tableColumn';
import { convertDateMonthYear } from 'utils/formatDateTime';
import styles from 'assets/sass/app.module.scss';

export const tableColumn = (handleButtonClick, page, pageSize) => {
    const tableColumn = [
        tblPrepareColumns({
            title: 'Invoice No.',
            dataIndex: 'invoiceNumber',
            width: '14%',
        }),
        tblPrepareColumns({
            title: 'Booking Number',
            dataIndex: 'otfNumber',
            width: '25%',
            render: (_, record) => record?.bookingNumber || record?.otfNumber,
        }),
        tblPrepareColumns({
            title: 'Customer Name',
            dataIndex: 'customerName',
            width: '14%',
        }),
        tblPrepareColumns({
            title: 'Model Description',
            dataIndex: 'modelDescription',
            width: '25%',
        }),
        tblPrepareColumns({
            title: 'Invoice Date',
            dataIndex: 'invoiceDate',
            width: '14%',
            render: (text) => (text ? convertDateMonthYear(text) : ''),
        }),
        tblPrepareColumns({
            title: 'Digital Signature',
            dataIndex: 'digitalSignature',
            width: '15%',
            render: (text) => (text === 'Y' ? 'Yes' : 'No'),
        }),

        tblActionColumn({ handleButtonClick, styles, width: '8%', canEdit: false }),
    ];

    return tableColumn;
};
