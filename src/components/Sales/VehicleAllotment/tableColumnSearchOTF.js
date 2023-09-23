/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns } from 'utils/tableColumn';
import { convertDateMonthYear } from 'utils/formatDateTime';

export const tableColumnSearchOTF = (sorter) => {
    const tableColumn = [
        tblPrepareColumns({
            title: 'Booking No.',
            dataIndex: 'otfNumber',
            width: '20%',
            render: (_, record) => record?.bookingNumber || record?.otfNumber,
            sorter,
        }),
        tblPrepareColumns({
            title: 'Booking Date',
            dataIndex: 'otfDate',
            render: (text) => (text ? convertDateMonthYear(text) : ''),
            width: '15%',
            sorter,
        }),
        tblPrepareColumns({
            title: 'Customer Name',
            dataIndex: 'customerName',
            width: '20%',
            sorter,
        }),
        tblPrepareColumns({
            title: 'CPD',
            dataIndex: 'cpd',
            render: (text) => (text ? convertDateMonthYear(text) : ''),
            width: '40%',
            sorter,
        }),
    ];

    return tableColumn;
};
