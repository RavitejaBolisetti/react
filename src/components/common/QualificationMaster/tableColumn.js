/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from 'utils/tableColumn';
import { Tag } from 'antd';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

export const tableColumn = (handleButtonClick, page, pageSize) => {
    const tableColumn = [];
    tableColumn.push(
        tblPrepareColumns({
            title: translateContent('qualificationMaster.label.qualificationCode'),
            dataIndex: 'qualificationCode',
            width: '20%',
        }),
        tblPrepareColumns({
            title: translateContent('qualificationMaster.label.qualificationName'),
            dataIndex: 'qualificationName',
            width: '30%',
        }),
        tblPrepareColumns({
            title: translateContent('qualificationMaster.label.status'),
            dataIndex: 'status',
            render: (text) => <>{text === 1 ? <Tag color="success">{translateContent('qualificationMaster.label.active')}</Tag> : <Tag color="error">{translateContent('qualificationMaster.label.inActive')}</Tag>}</>,
            width: '15%',
        }),

        tblActionColumn({ handleButtonClick, styles, page, pageSize })
    );

    return tableColumn;
};
