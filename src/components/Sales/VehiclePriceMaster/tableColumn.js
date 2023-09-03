/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from 'utils/tableColumn';

import styles from 'assets/sass/app.module.scss';

export const tableColumn = (handleButtonClick) => {
    const tableColumn = [
        tblPrepareColumns({
            title: 'Model',
            dataIndex: 'model',
            width: '15%',
        }),

        tblPrepareColumns({
            title: 'State',
            dataIndex: 'state',
            width: '15%',
        }),

        tblPrepareColumns({
            title: 'Pricing City',
            dataIndex: 'pricingCity',
            width: '15%',
        }),
        tblActionColumn({ handleButtonClick, canEdit: false, styles }),
    ];

    return tableColumn;
};
