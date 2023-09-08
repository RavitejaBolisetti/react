/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns } from 'utils/tableColumn';
import { convertDateMonthYear } from 'utils/formatDateTime';

export const tableColumnVehicleDetails = (sorter) => {
    const tableColumn = [
        tblPrepareColumns({
            title: 'Model Description',
            dataIndex: 'modelDescription',
            width: '20%',
            sorter,
        }),
        tblPrepareColumns({
            title: 'Model Code',
            dataIndex: 'modelCode',
            width: '15%',
            sorter,
        }),
        tblPrepareColumns({
            title: 'Requested Quantity',
            dataIndex: 'requestedQuantity',
            width: '10%',
            sorter,
        }),
        tblPrepareColumns({
            title: 'Cancelled Quantity',
            dataIndex: 'cancelledQuantity',
            width: '10%',
            sorter,
        }),
        tblPrepareColumns({
            title: 'Issued & Not Received Quantity',
            dataIndex: 'issuedNNotReceivedQuantity',
            width: '10%',
            sorter,
        }),
        tblPrepareColumns({
            title: 'Receiveded Quantity',
            dataIndex: 'receivededQuantity',
            width: '10%',
            sorter,
        }),
        tblPrepareColumns({
            title: 'Balance Quantity',
            dataIndex: 'balanceQuantity',
            width: '10%',
            sorter,
        }),
        tblPrepareColumns({
            title: 'Action',
            dataIndex: '',
            width: '10%',
            sorter,
        }),
    ];

    return tableColumn;
};
