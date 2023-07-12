/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import { tblPrepareColumns, tblStatusColumn } from 'utils/tableCloumn';
import styles from 'components/common/Common.module.css';

export const tableColumn = () => {
    const tableColumn = [
        tblPrepareColumns({
            title: 'Entitlement/Scheme Type',
            dataIndex: 'schemeType',
            width: '150',
            sorter: true,
        }),

        tblPrepareColumns({
            title: 'Entitlement/Scheme Description ',
            dataIndex: 'description',
            width: '200',
            sorter: true,
        }),

        tblPrepareColumns({
            title: 'Entitlement/Scheme Doc No',
            dataIndex: 'documentNumber',
            width: '150',
            sorter: true,
        }),

        tblPrepareColumns({
            title: 'Entitlement/Scheme Doc Date',
            dataIndex: 'documentDate',
            width: '150',
            sorter: true,
        }),

        tblPrepareColumns({
            title: 'Entitlement/Scheme Booklet No',
            dataIndex: 'bookletNumber',
            width: '150',
            sorter: true,
        }),

        tblPrepareColumns({
            title: 'Validity Start Date',
            dataIndex: 'validityStartDate',
            width: '150',
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
            width: '150',
            sorter: true,
        }),

        tblPrepareColumns({
            title: 'Validity End KM',
            dataIndex: 'validityEndKm',
            width: '150',
            sorter: true,
        }),

        tblStatusColumn({ styles, width: '15%' }),
    ];

    return tableColumn;
};
