/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from 'utils/tableColumn';
import { convertDateMonthYear } from 'utils/formatDateTime';
import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

export const tableColumn = (handleButtonClick) => {
    const tableColumn = [
        tblPrepareColumns({
            title: 'Channel',
            dataIndex: 'invoiceNumber',
            width: '15%',
        }),
        tblPrepareColumns({
            title: 'Target Type Code',
            dataIndex: 'invoiceDate',
            width: '15%',
            render: (text) => (text ? convertDateMonthYear(text) : '-'),
        }),
        tblPrepareColumns({
            title: 'Target Type Name',
            dataIndex: 'modelDescription',
            width: '45%',
        }),
        tblPrepareColumns({
            title: 'Status',
            dataIndex: 'digitalSignature',
            width: '15%',
            render: (text) => (text === 'Y' ? translateContent('global.yesNo.yes') : translateContent('global.yesNo.no')),
        }),

        tblActionColumn({ handleButtonClick, styles, width: '8%', canEdit: true }),
    ];

    return tableColumn;
};
