/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns } from 'utils/tableColumn';

export const tableColumn = [
    tblPrepareColumns({
        title: 'Part Number',
        dataIndex: 'partNumber',
        width: '180px',
    }),

    tblPrepareColumns({
        title: 'Part Name',
        dataIndex: 'partDescription',
        width: '180px',
    }),

    tblPrepareColumns({
        title: 'Part Type',
        dataIndex: 'type',
        width: '170px',
    }),

    tblPrepareColumns({
        title: 'Selling Price',
        dataIndex: 'sellingPrice',
        width: '170px',
    }),

    tblPrepareColumns({
        title: 'MRP',
        dataIndex: 'mrp',
        width: '120px',
    }),
];
