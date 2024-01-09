/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn, tblStatusColumn } from 'utils/tableColumn';
import { convertDateTime, dateFormatView } from 'utils/formatDateTime';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

export const tableColumn = ({ handleButtonClick, page, pageSize }) => {
    const tableColumn = [
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
            title: 'Request Type',
            dataIndex: 'requestType',
            width: '14%',
        }),
        tblPrepareColumns({
            title: 'Request Number',
            dataIndex: 'requestNumber',
            width: '14%',
        }),
        tblPrepareColumns({
            title: 'Request Date',
            dataIndex: 'requestDate',
            width: '14%',
        }),
        tblStatusColumn({ styles, width: '10%' }),


        tblActionColumn({ handleButtonClick, styles, width: '8%' }),
    ];

    return tableColumn;
};
