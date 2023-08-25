/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from 'utils/tableColumn';
// import { VechilePurchaseOrderStatusTag } from './utils/VechilePurchaseOrderStatusTag';
import { convertDateMonthYear } from 'utils/formatDateTime';

import styles from 'components/common/Common.module.css';

export const tableColumn = (handleButtonClick, page, pageSize) => {
    const tableColumn = [
        tblPrepareColumns({
            title: 'Branch Name',
            dataIndex: 'branchName',
            width: '14%',
            sorter:false,
        }),

       

        tblPrepareColumns({
            title: 'IRN Mapped/Unmapped',
            dataIndex: 'mapUnmap',
            width: '14%',
            sorter:false,
        }),

        

        // tblActionColumn({ handleButtonClick, styles, width: '8%', canEdit: false }),
    ];

    return tableColumn;
};
