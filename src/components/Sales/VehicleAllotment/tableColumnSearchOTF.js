/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns } from 'utils/tableColumn';
import { convertDateMonthYear } from 'utils/formatDateTime';

export const tableColumnSearchOTF = () => {
    const tableColumn = [
        tblPrepareColumns({
            title: 'OTF No.',
            dataIndex: 'otfNumber',
            width: '20%',
        }),
        tblPrepareColumns({
            title: 'OTF Date',
            dataIndex: 'otfDate',
            render: (text) => (text ? convertDateMonthYear(text) : ''),
            width: '15%',
        }),
        tblPrepareColumns({
            title: 'Customer Name',
            dataIndex: 'customerName',
            width: '20%',
        }),
        tblPrepareColumns({
            title: 'CPD',
            dataIndex: 'cpd',
            render: (text) => (text ? convertDateMonthYear(text) : ''),
            width: '40%',
        }),
    ];

    return tableColumn;
};
