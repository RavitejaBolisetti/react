/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from 'utils/tableColumn';
import { Tag } from 'antd';

import styles from 'components/common/Common.module.css';

export const tableColumn = (handleButtonClick, page, pageSize) => {
    const tableColumn = [];
    tableColumn.push(
        tblPrepareColumns({
            title: 'Qualification Code',
            dataIndex: 'qualificationCode',
            width: '20%',
        }),
        tblPrepareColumns({
            title: 'Qualification Name',
            dataIndex: 'qualificationName',
            width: '30%',
        }),
        tblPrepareColumns({
            title: 'Status',
            dataIndex: 'status',
            render: (text) => <>{text === 1 ? <Tag color="success">Active</Tag> : <Tag color="error">Inactive</Tag>}</>,
            width: '15%',
        }),

        tblActionColumn({ handleButtonClick, styles })
    );

    return tableColumn;
};
