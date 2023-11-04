/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblStatusColumn, tblActionColumn } from 'utils/tableColumn';
import { translateContent } from 'utils/translateContent';

import styles from 'assets/sass/app.module.scss';

export const tableColumn = (handleButtonClick) => {
    const tableColumn = [];
    tableColumn.push(
        tblPrepareColumns({
            title: translateContent('LessorCompanyMaster.label.companyCode'),
            dataIndex: 'companyCode',
            width: '15%',
        }),

        tblPrepareColumns({
            title: translateContent('LessorCompanyMaster.label.companyName'),
            dataIndex: 'companyName',
            width: '40%',
        }),

        tblStatusColumn({ styles }),

        tblActionColumn({ handleButtonClick, styles })
    );

    return tableColumn;
};
