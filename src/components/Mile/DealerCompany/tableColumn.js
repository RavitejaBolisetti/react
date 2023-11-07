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
            title: translateContent('dealerCompany.tableColHeading.parentGroupName'),
            dataIndex: 'dealerParentName',
            width: '20%',
        }),
        tblPrepareColumns({
            title: translateContent('dealerCompany.tableColHeading.companyCode'),
            dataIndex: 'companyCode',
            width: '15%',
        }),
        tblPrepareColumns({
            title: translateContent('dealerCompany.tableColHeading.stateName'),
            dataIndex: 'companyName',
            width: '20%',
        }),

        tblStatusColumn({ styles, width: '10%' }),

        tblActionColumn({ handleButtonClick, styles, width: '8%' })
    );

    return tableColumn;
};
