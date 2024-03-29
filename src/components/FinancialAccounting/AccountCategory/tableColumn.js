/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblStatusColumn, tblActionColumn } from 'utils/tableColumn';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';
import { USER_TYPE } from 'constants/userType';

export const tableColumn = (handleButtonClick, userType) => {
    const tableColumn = [];
    tableColumn.push(
        tblPrepareColumns({
            title: translateContent('accountCategory.label.accountCategoryCode'),
            dataIndex: 'accountCategoryCode',
            width: '15%',
        }),

        tblPrepareColumns({
            title: translateContent('accountCategory.label.description'),
            dataIndex: 'accountCategoryDescription',
            width: '20%',
        }),

        tblStatusColumn({ styles, width: '10%' }),

        tblActionColumn({ handleButtonClick, styles, canEdit: userType === USER_TYPE?.ADMIN?.key ? false : true })
    );

    return tableColumn;
};
