/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns } from 'utils/tableColumn';
import { convertDateMonthYear } from 'utils/formatDateTime';
import { getCodeValue } from 'utils/getCodeValue';
import { translateContent } from 'utils/translateContent';

export const tableColumnInvoice = (typeData) => {
    const tableColumn = [
        tblPrepareColumns({
            title: translateContent('bookingManagement.label.invoiceNumber'),
            dataIndex: 'invoiceNumber',
            sorter: false,
        }),

        tblPrepareColumns({
            title: translateContent('bookingManagement.label.invoiceDate'),
            dataIndex: 'invoiceDate',
            sorter: false,
            render: (_, record) => (record?.invoiceDate ? convertDateMonthYear(record?.invoiceDate) : ''),
        }),

        tblPrepareColumns({
            title: translateContent('bookingManagement.label.invoiceStatus'),
            dataIndex: 'invoiceStatus',
            sorter: false,
            render: (_, record) => getCodeValue(typeData?.INVC_STATS, record?.invoiceStatus),
        }),
    ];

    return tableColumn;
};

export const tableColumnDelivery = (typeData) => {
    const tableColumn = [
        tblPrepareColumns({
            title: translateContent('bookingManagement.label.deliveryNoteNumber'),
            dataIndex: 'deliveryNoteNumber',
            sorter: false,
        }),

        tblPrepareColumns({
            title: translateContent('bookingManagement.label.deliveryNoteDate'),
            dataIndex: 'deliveryNoteDate',
            sorter: false,
            render: (_, record) => (record?.deliveryNoteDate ? convertDateMonthYear(record?.deliveryNoteDate) : ''),
        }),
        tblPrepareColumns({
            title: translateContent('bookingManagement.label.deliveryNoteStatus'),
            dataIndex: 'deliveryNoteStatus',
            sorter: false,
            render: (_, record) => getCodeValue(typeData?.DLVR_NT_STS, record?.deliveryNoteStatus),
        }),
    ];

    return tableColumn;
};
