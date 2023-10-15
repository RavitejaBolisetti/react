/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from 'utils/tableColumn';
import { Tag } from 'antd';

import styles from 'assets/sass/app.module.scss';

export const tableColumn = (handleButtonClick) => {
    const tableColumn = [];
    tableColumn.push(
        tblPrepareColumns({
            title: 'Criticality Group ID',
            dataIndex: 'criticalityGroupCode',
            width: '15%',
        }),
        tblPrepareColumns({
            title: 'Criticality Group Name',
            dataIndex: 'criticalityGroupName',
            width: '25%',
        }),
        tblPrepareColumns({
            title: 'Default Group',
            dataIndex: 'criticalityDefaultGroup',
            render: (text) => <>{text === true ? <Tag color="success">Active</Tag> : <Tag color="error">Inactive</Tag>}</>,
            width: '15%',
        }),
        tblPrepareColumns({
            title: 'Status',
            dataIndex: 'activeIndicator',
            render: (text) => <>{text === true ? <Tag color="success">Active</Tag> : <Tag color="error">Inactive</Tag>}</>,
            width: '15%',
        }),

        tblActionColumn({ handleButtonClick, styles, width: '12%' })
    );

    return tableColumn;
};
