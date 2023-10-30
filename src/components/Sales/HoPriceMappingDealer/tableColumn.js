/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from 'utils/tableColumn';
import { convertDateMonthYear } from 'utils/formatDateTime';

import styles from 'assets/sass/app.module.scss';

export const tableColumn = (handleButtonClick) => {
    const tableColumn = [
        tblPrepareColumns({
            title: 'State',
            dataIndex: 'state',
            width: '12%',
        }),

        tblPrepareColumns({
            title: 'City',
            dataIndex: 'city',
            width: '12%',
        }),

        tblPrepareColumns({
            title: 'Dealer Parent',
            dataIndex: 'dealerParent',
            width: '14%',
        }),
        tblPrepareColumns({
            title: 'Dealer Location',
            dataIndex: 'dealerBranch',
            width: '14%',
        }),
        tblPrepareColumns({
            title: 'Enable Date',
            dataIndex: 'enabledDate',
            width: '12%',
            render: (text) => (text ? convertDateMonthYear(text) : 'NA'),
        }),
        tblPrepareColumns({
            title: 'Enable By',
            dataIndex: 'enabledBy',
            width: '14%',
        }),

        tblActionColumn({ handleButtonClick, styles, width: '8%', canEdit: true }),
    ];

    return tableColumn;
};
