/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblStatusColumn, tblActionColumn } from 'utils/tableColumn';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

export const tableColumn = (handleButtonClick) => {
    const tableColumn = [];
    tableColumn.push(
        tblPrepareColumns({
            title: 'Issue No',
            dataIndex: 'issueNo',
            width: '14%',
        }),
        tblPrepareColumns({
            title: 'Issue Date',
            dataIndex: 'issueDate',
            width: '14%',
        }),
        tblPrepareColumns({
            title: 'Receipt No',
            dataIndex: 'receiptNo',
            width: '14%',
        }),
        tblActionColumn({ handleButtonClick, styles, canEdit: true })
    );

    return tableColumn;
};
