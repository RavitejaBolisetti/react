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
            title: translateContent('hoPriceMapping.label.state'),
            dataIndex: 'state',
            width: '12%',
        }),

        tblPrepareColumns({
            title: translateContent('hoPriceMapping.label.city'),
            dataIndex: 'city',
            width: '12%',
        }),

        tblPrepareColumns({
            title: translateContent('hoPriceMapping.label.dealerParent'),
            dataIndex: 'dealerParent',
            width: '14%',
        }),
        tblPrepareColumns({
            title: translateContent('hoPriceMapping.label.dealerLocation'),
            dataIndex: 'dealerBranch',
            width: '14%',
        }),
        tblPrepareColumns({
            title: translateContent('hoPriceMapping.label.enableDate'),
            dataIndex: 'enabledDate',
            width: '12%',
            render: (text) => (text ? convertDateMonthYear(text) : 'NA'),
        }),
        tblPrepareColumns({
            title: translateContent('hoPriceMapping.label.enableBy'),
            dataIndex: 'enabledBy',
            width: '14%',
        }),

        tblActionColumn({ handleButtonClick, styles, width: '8%', canEdit: true }),
    ];

    return tableColumn;
};
