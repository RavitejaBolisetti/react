/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from 'utils/tableColumn';
import styles from 'components/common/Common.module.css';
import { Tag } from 'antd';

export const tableColumn = (handleButtonClick, page, pageSize) => {
    const tableColumn = [
        tblPrepareColumns({
            title: 'Receipt Number',
            dataIndex: 'receiptNumber',
            width: '14%',
        }),
        tblPrepareColumns({
            title: 'Receipt Date',
            dataIndex: 'receiptDate',
            width: '14%',
        }),

        tblPrepareColumns({
            title: 'Customer Name',
            dataIndex: 'customerName',
            width: '14%',
        }),

        tblPrepareColumns({
            title: 'Model Name',
            dataIndex: 'modelName',
            width: '14%',
        }),

        tblPrepareColumns({
            title: 'Chassis No.',
            dataIndex: 'chassis',
            width: '14%',
        }),
        tblPrepareColumns({
            title: 'Status',
            dataIndex: 'Status',
            width: '14%',
            render: (_, record) => <Tag color="success">{`Booked`}</Tag>,
        }),

        tblActionColumn({ handleButtonClick, styles, width: '8%' }),
    ];

    return tableColumn;
};
