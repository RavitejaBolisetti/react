/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
// import React, {  useState } from 'react';
import { tblPrepareColumns, tblActionColumn } from 'utils/tableColumn';
import { convertDateMonthYear } from 'utils/formatDateTime';
import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';
export const tableColumn = (handleButtonClick) => {
    // const [selectionType, setSelectionType] = useState('checkbox');
    const tableColumn = [
        // tblPrepareColumns({
        //     type: selectionType,
        //     dataIndex: 'invoiceNumber',
        //     width: '10%',
        // }),
        tblPrepareColumns({
            title: 'Transaction Type',
            dataIndex: 'invoiceNumber',
            width: '14%',
        }),
        tblPrepareColumns({
            title: 'Transaction No.',
            dataIndex: 'invoiceDate',
            width: '14%',
            render: (text) => (text ? convertDateMonthYear(text) : '-'),
        }),
        tblPrepareColumns({
            title: 'Transaction Date & Time',
            dataIndex: 'modelDescription',
            width: '15%',
        }),
        tblPrepareColumns({
            title: 'Amount',
            dataIndex: 'otfNumber',
            width: '15%',
            render: (_, record) => record?.bookingNumber || record?.otfNumber,
        }),
        tblPrepareColumns({
            title: 'Error Message',
            dataIndex: 'customerName',
            width: '30%',
        }),
        // tblPrepareColumns({
        //     title: translateContent('vehicleInvoiceGeneration.tableColumn.invoiceMaster.columnThree'),
        //     dataIndex: 'customerName',
        //     width: '20%',
        // }),
        
        
        // tblPrepareColumns({
        //     title: 'Payment Status',
        //     dataIndex: 'digitalSignature',
        //     width: '12%',
        //     render: (text) => (text === 'Y' ? translateContent('global.yesNo.yes') : translateContent('global.yesNo.no')),
        // }),

        // tblActionColumn({ handleButtonClick, styles, width: '8%', canEdit: true }),
    ];

    return tableColumn;
};
