/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from 'utils/tableColumn';
import { convertDateMonthYear } from 'utils/formatDateTime';
import { translateContent } from 'utils/translateContent';

import styles from 'assets/sass/app.module.scss';

export const tableColumn = (handleButtonClick) => {
    const tableColumn = [
        tblPrepareColumns({
            title: translateContent('receipts.tableColumn.receiptNo'),
            dataIndex: 'receiptNumber',
            width: '20%',
        }),

        tblPrepareColumns({
            title: translateContent('receipts.tableColumn.receiptDate'),
            dataIndex: 'receiptDate',
            width: '14%',
            render: (text) => convertDateMonthYear(text),
        }),

        tblPrepareColumns({
            title: translateContent('receipts.tableColumn.partySegement'),
            dataIndex: 'partySegment',
            width: '14%',
        }),

        tblPrepareColumns({
            title: translateContent('receipts.tableColumn.customerName'),
            dataIndex: 'customerName',
            width: '26%',
        }),

        tblActionColumn({ handleButtonClick, styles, width: '8%', canEdit: false }),
    ];

    return tableColumn;
};
