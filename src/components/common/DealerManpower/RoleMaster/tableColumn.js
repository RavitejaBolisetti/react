/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblStatusColumn, tblActionColumn } from 'utils/tableColumn';

import styles from 'assets/sass/app.module.scss';

export const tableColumn = (handleButtonClick, page, pageSize) => {
    const tableColumn = [];
    tableColumn.push(
        tblPrepareColumns({
            title: 'Role Code',
            dataIndex: 'roleCode',
            width: '10%',
        }),
        tblPrepareColumns({
            title: 'Role Name',
            dataIndex: 'roleDescription',
            width: '20%',
        }),

        tblPrepareColumns({
            title: 'Department Name',
            dataIndex: 'departmentName',
            width: '15%',
        }),

        tblPrepareColumns({
            title: 'Division Name',
            dataIndex: 'divisionName',
            width: '15%',
        }),

        tblStatusColumn({ styles, width: '10%' }),

        tblActionColumn({ handleButtonClick, styles, width: '8%' })
    );

    return tableColumn;
};
