/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns } from 'utils/tableColumn';
import { convertDateMonthYear } from 'utils/formatDateTime';
import { translateContent } from 'utils/translateContent';

export const tableColumnSearchOTF = (sorter) => {
    const tableColumn = [
        tblPrepareColumns({
            title: translateContent('orderDeliveryVehicleAllotment.tableColumn.bookingNo'),
            dataIndex: 'otfNumber',
            width: '20%',
            render: (_, record) => record?.bookingNumber || record?.otfNumber,
            sorter,
        }),
        tblPrepareColumns({
            title: translateContent('orderDeliveryVehicleAllotment.tableColumn.bookingDate'),
            dataIndex: 'otfDate',
            render: (text) => (text ? convertDateMonthYear(text) : ''),
            width: '20%',
            sorter,
        }),
        tblPrepareColumns({
            title: translateContent('orderDeliveryVehicleAllotment.tableColumn.customerName'),
            dataIndex: 'customerName',
            sorter,
        }),
        tblPrepareColumns({
            title: translateContent('orderDeliveryVehicleAllotment.tableColumn.cpd'),
            dataIndex: 'cpd',
            render: (text) => (text ? convertDateMonthYear(text) : ''),
            width: '20%',
            sorter,
        }),
    ];

    return tableColumn;
};
