/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from 'utils/tableColumn';

import styles from 'assets/sass/app.module.scss';

export const tableColumn = (handleButtonClick, page, pageSize) => {
    const tableColumn = [];
    tableColumn.push(
        tblPrepareColumns({
            title: 'Party Code',
            dataIndex: 'partyCode',
            width: '15%',
        }),

        tblPrepareColumns({
            title: 'Party Name',
            dataIndex: 'partyName',
            width: '20%',
        }),

        tblPrepareColumns({
            title: 'Party Category',
            dataIndex: 'partyCategory',
            width: '15%',
        }),
        tblActionColumn({ handleButtonClick, styles })
    );

    return tableColumn;
};
