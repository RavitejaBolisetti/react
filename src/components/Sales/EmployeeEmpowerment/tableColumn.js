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
            title: 'Request ID',
            dataIndex: 'employeeRequestId',
            width: '14%',
        }),
        tblPrepareColumns({
            title: 'Request Date',
            dataIndex: 'r equestDate',
            width: '14%',
        }),

        tblPrepareColumns({
            title: 'Dealer Name',
            dataIndex: 'dealerName',
            width: '14%',
        }),
        tblPrepareColumns({
            title: 'Dealer Branch',
            dataIndex: 'dealerBranch',
            width: '14%',
        }),

        tblPrepareColumns({
            title: 'Status',
            dataIndex: 'status',
            width: '14%',
        }),

        tblActionColumn({ handleButtonClick, styles, width: '8%' }),
    ];

    return tableColumn;
};
