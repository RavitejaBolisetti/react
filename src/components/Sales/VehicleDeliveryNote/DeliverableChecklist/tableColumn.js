/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import { tblPrepareColumns } from 'utils/tableColumn';

export const tableColumn = () => {
    const tableColumn = [
        tblPrepareColumns({
            title: 'Item',
            dataIndex: 'item',
            width: '20%',
            sorter: true,
        }),

        tblPrepareColumns({
            title: 'Yes/No ',
            dataIndex: 'checklist',
            width: '20%',
            sorter: false,
        }),
    ];

    return tableColumn;
};
