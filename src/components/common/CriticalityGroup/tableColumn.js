/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from 'utils/tableColumn';
import { Tag } from 'antd';
import { translateContent } from 'utils/translateContent';

import styles from 'assets/sass/app.module.scss';

export const tableColumn = (handleButtonClick) => {
    const tableColumn = [];
    tableColumn.push(
        tblPrepareColumns({
            title: translateContent('criticalityGroup.label.criticalityGroupId'),
            dataIndex: 'criticalityGroupCode',
            width: '15%',
        }),
        tblPrepareColumns({
            title: translateContent('criticalityGroup.label.criticalityGroupName'),
            dataIndex: 'criticalityGroupName',
            width: '25%',
        }),
        tblPrepareColumns({
            title: translateContent('criticalityGroup.label.defaultGroup'),
            dataIndex: 'criticalityDefaultGroup',
            render: (text) => <>{text === true ? <Tag color="success">{translateContent('global.label.active')}</Tag> : <Tag color="error">{translateContent('global.label.inActive')}</Tag>}</>,
            width: '15%',
        }),
        tblPrepareColumns({
            title: translateContent('criticalityGroup.label.status'),
            dataIndex: 'activeIndicator',
            render: (text) => <>{text === true ? <Tag color="success">{translateContent('global.label.active')}</Tag> : <Tag color="error">{translateContent('global.label.inActive')}</Tag>}</>,
            width: '15%',
        }),

        tblActionColumn({ handleButtonClick, styles, width: '12%' })
    );

    return tableColumn;
};
