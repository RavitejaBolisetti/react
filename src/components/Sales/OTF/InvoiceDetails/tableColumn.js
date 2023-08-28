/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns } from 'utils/tableColumn';
import { convertDateMonthYear } from 'utils/formatDateTime';

export const tableColumnInvoice = () => {
    const tableColumn = [
        tblPrepareColumns({
            title: 'Invoice Number',
            dataIndex: 'invoiceNumber',
            sorter: false,
        }),

        tblPrepareColumns({
            title: 'Invoice Date',
            dataIndex: 'invoiceDate',
            sorter: false,
            render: (_, record) => (record?.invoiceDate ? convertDateMonthYear(record?.invoiceDate) : ''),
        }),

        tblPrepareColumns({
            title: 'Invoice Status',
            dataIndex: 'invoiceStatus',
            sorter: false,
        }),
    ];

    return tableColumn;
};

export const tableColumnDelivery = () => {
    const tableColumn = [
        tblPrepareColumns({
            title: 'Delivery Note Number',
            dataIndex: 'deliveryNoteNumber',
            sorter: false,
        }),

        tblPrepareColumns({
            title: 'Delivery Note Date',
            dataIndex: 'deliveryNoteDate',
            sorter: false,
            render: (_, record) => (record?.deliveryNoteDate ? convertDateMonthYear(record?.deliveryNoteDate) : ''),
        }),
        tblPrepareColumns({
            title: 'Delivery Note Status',
            dataIndex: 'deliveryNoteStatus',
            sorter: false,
        }),
    ];

    return tableColumn;
};
