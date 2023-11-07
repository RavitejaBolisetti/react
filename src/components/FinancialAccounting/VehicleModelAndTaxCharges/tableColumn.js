/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from 'utils/tableColumn';

import styles from 'assets/sass/app.module.scss';

export const tableColumn = (handleButtonClick) => {
    const tableColumn = [];
    tableColumn.push(
        tblPrepareColumns({
            title: 'Model Group',
            dataIndex: 'modelGroup',
            width: '15%',
        }),
        tblPrepareColumns({
            title: 'Tax Charges and Category',
            dataIndex: 'taxCategoryDescription',
            width: '15%',
        }),
        tblPrepareColumns({
            title: 'Account Category',
            dataIndex: 'accountCategoryDescription',
            width: '15%',
        }),

        tblActionColumn({ handleButtonClick, styles, width: '6%' })
    );

    return tableColumn;
};
