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
            title: translateContent('state.tableColHeading.stateCode'),
            dataIndex: 'code',
            width: '15%',
        }),

        tblPrepareColumns({
            title: translateContent('state.tableColHeading.stateName'),
            dataIndex: 'name',
            width: '20%',
        }),

        tblPrepareColumns({
            title: translateContent('state.tableColHeading.gstStateCode'),
            dataIndex: 'gstStateCode',
            width: '15%',
        }),

        tblPrepareColumns({
            title: translateContent('state.tableColHeading.country'),
            dataIndex: 'countryName',
            width: '15%',
        }),

        tblStatusColumn({ styles, width: '15%' }),

        tblActionColumn({ styles, handleButtonClick, width: '10%', canEdit: false })
    );

    return tableColumn;
};
