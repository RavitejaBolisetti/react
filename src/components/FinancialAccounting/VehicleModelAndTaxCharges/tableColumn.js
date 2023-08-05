/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblSerialNumberColumn, tblActionColumn } from 'utils/tableCloumn';
import { Tag } from 'antd';

import styles from 'components/common/Common.module.css';

export const tableColumn = (handleButtonClick, page, pageSize) => {
    const tableColumn = [];
    tableColumn.push(
        tblPrepareColumns({
            title: 'Model Group',
            dataIndex: 'modelGroup',
            width: '15%',
        }),
        tblPrepareColumns({
            title: 'Tax Charges and Category',
            dataIndex: 'taxCategoryDescription',
            width: '15%',
        }),
        tblPrepareColumns({
            title: 'Account Category',
            dataIndex: 'accountCategoryDescription',
            width: '15%',
        }),

        tblActionColumn({ handleButtonClick, styles, width: '6%' })
    );

    return tableColumn;
};
