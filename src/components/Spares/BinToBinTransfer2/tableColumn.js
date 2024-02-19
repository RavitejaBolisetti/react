/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from 'utils/tableColumn';
import { convertDateTime, dateFormatView } from 'utils/formatDateTime';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

export const tableColumn = ({ handleButtonClick, page, pageSize, ...rest }) => {
    const tableColumn = [
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
       
        tblActionColumn({ handleButtonClick, styles, width: '8%' }),
    ];

    return tableColumn;
};
