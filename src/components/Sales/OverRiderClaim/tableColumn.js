/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from 'utils/tableColumn';
import { convertDateTime, dateFormatView } from 'utils/formatDateTime';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

export const tableColumn = ({ handleButtonClick, page, pageSize }) => {
    const tableColumn = [
        tblPrepareColumns({
            title: translateContent('overRiderClaim.table.dealerName'),
            dataIndex: 'dealerName',
            width: '14%',
        }),
        tblPrepareColumns({
            title: translateContent('overRiderClaim.table.dealerBranch'),
            dataIndex: 'dealerBranch',
            width: '14%',
        }),

        tblPrepareColumns({
            title: translateContent('overRiderClaim.table.claimNo'),
            dataIndex: 'claimNo',
            width: '14%',
        }),
        tblPrepareColumns({
            title: translateContent('overRiderClaim.table.claimDate'),
            dataIndex: 'claimDate',
            width: '14%',
        }),

        tblPrepareColumns({
            title: translateContent('overRiderClaim.table.status'),
            dataIndex: 'status',
            width: '14%',
        }),
        tblPrepareColumns({
            title: translateContent('overRiderClaim.table.customerName'),
            dataIndex: 'customerName',
            width: '14%',
        }),

        tblActionColumn({ handleButtonClick, styles, width: '8%' }),
    ];

    return tableColumn;
};
