/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblStatusColumn, tblActionColumn } from 'utils/tableColumn';

import styles from 'assets/sass/app.module.scss';

import { translateContent } from 'utils/translateContent';

export const tableColumn = (handleButtonClick) => {
    const tableColumn = [];
    tableColumn.push(
        tblPrepareColumns({
            title: translateContent('designationMaster.label.designationCode'),
            dataIndex: 'designationCode',
            width: '14%',
        }),

        tblPrepareColumns({
            title: translateContent('designationMaster.label.designationName'),
            dataIndex: 'designationDescription',
            width: '22%',
        }),

        tblPrepareColumns({
            title: translateContent('designationMaster.label.roleDescription'),
            dataIndex: 'roleDescription',
            width: '14%',
        }),

        tblPrepareColumns({
            title: translateContent('designationMaster.label.departmentName'),
            dataIndex: 'departmentName',
            width: '14%',
        }),

        tblPrepareColumns({
            title: translateContent('designationMaster.label.divisionName'),
            dataIndex: 'divisionName',
            width: '12%',
        }),

        tblStatusColumn({ styles, width: '10%' }),

        tblActionColumn({ handleButtonClick, styles, width: '16%' })
    );

    return tableColumn;
};
