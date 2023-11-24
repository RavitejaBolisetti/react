/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns } from 'utils/tableColumn';
import { translateContent } from 'utils/translateContent';

export const taxDetailsColumn = () => {
    const tableColumn = [
        tblPrepareColumns({
            title: translateContent('bookingManagement.tableColumn.description'),
            dataIndex: 'taxDescription',
            key: 'taxDescription',
            width: '35%',
        }),

        tblPrepareColumns({
            title: translateContent('bookingManagement.tableColumn.rate'),
            dataIndex: 'taxRate',
            key: 'taxRate',
            width: '25%',
        }),
        tblPrepareColumns({
            title: translateContent('bookingManagement.tableColumn.amount'),
            dataIndex: 'taxAmount',
            key: 'taxAmount',
            width: '15%',
        }),
    ];

    return tableColumn;
};
