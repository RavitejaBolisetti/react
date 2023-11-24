/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from 'utils/tableColumn';
import { convertDateMonthYear } from 'utils/formatDateTime';
import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

export const tableColumn = (handleButtonClick) => {
    const tableColumn = [
        tblPrepareColumns({
            title: translateContent('vehicleInvoiceGeneration.tableColumn.invoiceMaster.columnOne'),
            dataIndex: 'invoiceNumber',
            width: '14%',
        }),
        tblPrepareColumns({
            title: translateContent('vehicleInvoiceGeneration.tableColumn.invoiceMaster.columnTwo'),
            dataIndex: 'otfNumber',
            width: '25%',
            render: (_, record) => record?.bookingNumber || record?.otfNumber,
        }),
        tblPrepareColumns({
            title: translateContent('vehicleInvoiceGeneration.tableColumn.invoiceMaster.columnThree'),
            dataIndex: 'customerName',
            width: '14%',
        }),
        tblPrepareColumns({
            title: translateContent('vehicleInvoiceGeneration.tableColumn.invoiceMaster.columnFour'),
            dataIndex: 'modelDescription',
            width: '25%',
        }),
        tblPrepareColumns({
            title: translateContent('vehicleInvoiceGeneration.tableColumn.invoiceMaster.columnFive'),
            dataIndex: 'invoiceDate',
            width: '14%',
            render: (text) => (text ? convertDateMonthYear(text) : '-'),
        }),
        tblPrepareColumns({
            title: translateContent('vehicleInvoiceGeneration.tableColumn.invoiceMaster.columnSix'),
            dataIndex: 'digitalSignature',
            width: '15%',
            render: (text) => (text === 'Y' ? translateContent('global.yesNo.yes') : translateContent('global.yesNo.no')),
        }),

        tblActionColumn({ handleButtonClick, styles, width: '8%', canEdit: false }),
    ];

    return tableColumn;
};
