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
            title: 'Scheme Type',
            dataIndex: 'schemeType',
            width: '14%',
        }),
        tblPrepareColumns({
            title: 'Scheme No',
            dataIndex: 'schemeNo',
            width: '14%',
        }),
        tblPrepareColumns({
            title: 'Scheme Date',
            dataIndex: 'schemeDate',
            width: '14%',
        }),
        tblPrepareColumns({
            title: 'Scheme Duration',
            dataIndex: 'schemeDuration',
            width: '14%',
        }),

        tblStatusColumn({ styles, width: '10%' }),

        tblActionColumn({ handleButtonClick, styles, width: '8%' }),
    ];

    return tableColumn;
};
