/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn, tblStatusColumn } from 'utils/tableColumn';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

export const tableColumn = ({ handleButtonClick, page, pageSize }) => {
    const tableColumn = [
        tblPrepareColumns({
            title: translateContent('Zone'),
            dataIndex: 'zone',
            width: '14%',
        }),
        tblPrepareColumns({
            title: translateContent('Area Office'),
            dataIndex: 'areaOffice',
            width: '14%',
        }),

        tblPrepareColumns({
            title: translateContent('Doc No'),
            dataIndex: 'docNo',
            width: '14%',
        }),
        tblPrepareColumns({
            title: translateContent('Doc Date'),
            dataIndex: 'docDate',
            width: '14%',
        }),

        tblPrepareColumns({
            title: translateContent('Revision No'),
            dataIndex: 'revisionNo',
            width: '14%',
        }),
        tblPrepareColumns({
            title: translateContent('Revision Date'),
            dataIndex: 'revisionDate',
            width: '14%',
        }),

        tblActionColumn({ handleButtonClick, styles, width: '8%' }),
    ];

    return tableColumn;
};
