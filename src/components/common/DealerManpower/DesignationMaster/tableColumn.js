/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblStatusColumn, tblActionColumn } from 'utils/tableColumn';

import styles from 'components/common/Common.module.css';

export const tableColumn = (handleButtonClick, page, pageSize) => {
    const tableColumn = [];
    tableColumn.push(
        tblPrepareColumns({
            title: 'Designation Code',
            dataIndex: 'designationCode',
            width: '14%',
        }),

        tblPrepareColumns({
            title: 'Designation Name',
            dataIndex: 'designationDescription',
            width: '22%',
        }),

        tblPrepareColumns({
            title: 'Role Name',
            dataIndex: 'roleDescription',
            width: '14%',
        }),

        tblPrepareColumns({
            title: 'Department Name',
            dataIndex: 'departmentName',
            width: '14%',
        }),

        tblPrepareColumns({
            title: 'Division Name ',
            dataIndex: 'divisionName',
            width: '12%',
        }),

        tblStatusColumn({ styles, width: '10%' }),

        tblActionColumn({ handleButtonClick, styles, width: '16%' })
    );

    return tableColumn;
};
