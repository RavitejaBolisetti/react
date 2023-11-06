/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblStatusColumn, tblActionColumn } from 'utils/tableColumn';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

export const tableColumn = (handleButtonClick, page, pageSize) => {
    const tableColumn = [];
    tableColumn.push(
        tblPrepareColumns({
            title: translateContent('tehsil.tableColHeading.tehsilCode'),
            dataIndex: 'code',
            width: '12%',
        }),

        tblPrepareColumns({
            title: translateContent('tehsil.tableColHeading.tehsilName'),
            dataIndex: 'name',
            width: '20%',
        }),

        tblPrepareColumns({
            title: translateContent('tehsil.tableColHeading.districtCode'),
            dataIndex: 'districtName',
            width: '20%',
        }),

        tblPrepareColumns({
            title: translateContent('tehsil.tableColHeading.stateCode'),
            dataIndex: 'stateName',
            width: '18%',
        }),

        tblStatusColumn({ styles, width: '10%' }),

        tblActionColumn({ handleButtonClick, styles, canEdit: false })
    );

    return tableColumn;
};
