/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from 'utils/tableColumn';

export const tableColumnAddEdit = (page, pageSize) => {
    const tableColumn = [
        tblPrepareColumns({
            title: 'Product Hierarchy',
            dataIndex: 'productHierarchy',
            width: '12%',
        }),
        tblPrepareColumns({
            title: 'Dealer Flag',
            dataIndex: 'dealerFlag',
            width: '14%',
        }),
    ];

    return tableColumn;
};
