/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from 'utils/tableColumn';

import styles from 'assets/sass/app.module.scss';

export const tableColumn = (handleButtonClick) => {
    const tableColumn = [
        tblPrepareColumns({
            title: 'Branch',
            dataIndex: 'branch',
            width: '15%',   
        }),

        tblPrepareColumns({
            title: 'Store',
            dataIndex: 'store',
            width: '15%',
        }),

        tblPrepareColumns({
            title: 'Current Stock',
            dataIndex: 'currentStock',
            width: '15%',
        }),

        // tblActionColumn({ handleButtonClick, canEdit: false, styles }),
    ];

    return tableColumn;
};
