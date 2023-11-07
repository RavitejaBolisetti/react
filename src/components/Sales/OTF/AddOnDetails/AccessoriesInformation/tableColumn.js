/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns } from 'utils/tableColumn';
import { translateContent } from 'utils/translateContent';

export const tableColumn = [
    tblPrepareColumns({
        title: translateContent('bookingManagement.label.partNumber'),
        dataIndex: 'partNumber',
        width: '180px',
    }),

    tblPrepareColumns({
        title: translateContent('bookingManagement.label.partName'),
        dataIndex: 'partDescription',
        width: '180px',
    }),

    tblPrepareColumns({
        title: translateContent('bookingManagement.label.partType'),
        dataIndex: 'type',
        width: '170px',
    }),

    tblPrepareColumns({
        title: translateContent('bookingManagement.label.sellingPrice'),
        dataIndex: 'sellingPrice',
        width: '170px',
    }),

    tblPrepareColumns({
        title: translateContent('bookingManagement.label.mrp'),
        dataIndex: 'mrp',
        width: '120px',
    }),
];
