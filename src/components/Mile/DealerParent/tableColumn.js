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
            title: 'Group Code',
            dataIndex: 'code',
            width: '10%',
        }),
        tblPrepareColumns({
            title: 'Group Name',
            dataIndex: 'name',
            width: '10%',
        }),
        tblPrepareColumns({
            title: 'Title',
            dataIndex: 'title',
            width: '6%',
        }),
        tblPrepareColumns({
            title: 'Owner Name',
            dataIndex: 'ownerName',
            width: '12%',
        }),
        tblPrepareColumns({
            title: 'Contact Number',
            dataIndex: 'mobileNumber',
            width: '10%',
        }),
        tblPrepareColumns({
            title: 'Email ID',
            dataIndex: 'emailId',
            width: '11%',
        }),

        tblStatusColumn({ styles, width: '6%' }),

        tblActionColumn({ handleButtonClick, styles, width: '8%', fixed: 'right' })
    );

    return tableColumn;
};
