/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns } from 'utils/tableColumn';
import { convertDateMonthYear } from 'utils/formatDateTime';

export const tableColumnSearchOTF = (handleButtonClick, page, pageSize) => {
    const tableColumn = [
        tblPrepareColumns({
            title: 'OTF No.',
            dataIndex: 'otfNumber',
        }),
        tblPrepareColumns({
            title: 'OTF Date',
            dataIndex: 'otfDate',
            render: (text) => convertDateMonthYear(text ? text :''),
        }),
        tblPrepareColumns({
            title: 'Cust. Name',
            dataIndex: 'customerName',
        }),
        tblPrepareColumns({
            title: 'CPD',
            dataIndex: 'cpd',
        }),
    ];

    return tableColumn;
};