/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from 'utils/tableColumn';

import styles from 'assets/sass/app.module.scss';

export const tableColumn = (handleButtonClick) => {
    const tableColumn = [];
    tableColumn.push(
        tblPrepareColumns({
            title: 'Application Menu',
            dataIndex: 'applicationName',
            width: '15%',
        }),
        tblPrepareColumns({
            title: 'Document Type',
            dataIndex: 'documentTypeCode',
            width: '15%',
        }),

        tblActionColumn({ handleButtonClick, styles })
    );

    return tableColumn;
};
