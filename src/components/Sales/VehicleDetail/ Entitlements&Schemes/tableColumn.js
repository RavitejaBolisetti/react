/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import { tblPrepareColumns } from 'utils/tableCloumn';

export const tableColumn = () => {
    const tableColumn = [
        tblPrepareColumns({
            title: 'Entitlement/Scheme Type',
            dataIndex: 'schemeType',
            width: '15',
            sorter: true,
        }),

        tblPrepareColumns({
            title: 'Entitlement/Scheme Description ',
            dataIndex: 'description',
            width: '20',
            sorter: true,
        }),

        tblPrepareColumns({
            title: 'Entitlement/Scheme Doc No',
            dataIndex: 'documentNumber',
            width: '15',
            sorter: true,
        }),
        tblPrepareColumns({
            title: 'Entitlement/Scheme Doc Date',
            dataIndex: 'documentDate',
            width: '15',
            sorter: true,
        }),
        tblPrepareColumns({
            title: 'Entitlement/Scheme Booklet No',
            dataIndex: 'bookletNumber',
            width: '15',
            sorter: true,
        }),
        tblPrepareColumns({
            title: 'Validity Start Date',
            dataIndex: 'validityStartDate',
            width: '15',
            sorter: true,
        }),
        tblPrepareColumns({
            title: 'Validity End Date',
            dataIndex: 'validityEndDate',
            width: '15',
            sorter: true,
        }),
        tblPrepareColumns({
            title: 'Validity Start KM',
            dataIndex: 'validityStartKm',
            width: '15',
            sorter: true,
        }),
        tblPrepareColumns({
            title: 'Validity End KM',
            dataIndex: 'validityEndKm',
            width: '15',
            sorter: true,
        }),
        tblPrepareColumns({
            title: 'Active Flag',
            dataIndex: 'status',
            width: '15',
            sorter: true,
        }),
    ];

    return tableColumn;
};
