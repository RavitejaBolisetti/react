/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblStatusColumn, tblActionColumn } from 'utils/tableColumn';

import styles from 'components/common/Common.module.css';

export const tableColumn = (handleButtonClick) => {
    const tableColumn = [];
    tableColumn.push(
        tblPrepareColumns({
            title: 'Role ID',
            dataIndex: 'roleId',
            width: '15%',
        }),
        tblPrepareColumns({
            title: 'Role Name',
            dataIndex: 'roleName',
            width: '20%',
        }),
        tblPrepareColumns({
            title: 'Role Description',
            dataIndex: 'roleDescription',
            ellipsis: true,
            width: '20%',
        }),

        tblStatusColumn({ styles, width: '15%' }),
        tblActionColumn({ handleButtonClick, styles, width: '10%' })
    );

    return tableColumn;
};
