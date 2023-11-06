/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from 'utils/tableColumn';
import { Tag } from 'antd';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

export const tableColumn = (handleButtonClick) => {
    const tableColumn = [];
    tableColumn.push(
        tblPrepareColumns({
            title: translateContent('hierarchyAttribute.label.code'),
            dataIndex: 'hierarchyAttribueCode',
            width: '10%',
        }),
        tblPrepareColumns({
            title: translateContent('hierarchyAttribute.label.name'),
            dataIndex: 'hierarchyAttribueName',
            width: '20%',
        }),
        tblPrepareColumns({
            title: translateContent('hierarchyAttribute.label.duplicateAllowed'),
            dataIndex: 'duplicateAllowedAtAttributerLevelInd',
            width: '14%',
            render: (text, record) => <>{text ? <Tag color="success">{translateContent('global.label.active')}</Tag> : <Tag color="error">{translateContent('global.label.inActive')}</Tag>}</>,
        }),

        tblPrepareColumns({
            title: translateContent('hierarchyAttribute.label.childAllowed'),
            dataIndex: 'isChildAllowed',
            width: '10%',
            render: (text, record) => <>{text ? <Tag color="success">{translateContent('global.label.active')}</Tag> : <Tag color="error">{translateContent('global.label.inActive')}</Tag>}</>,
        }),
        tblPrepareColumns({
            title: translateContent('global.label.status'),
            dataIndex: 'status',
            width: '10%',
            render: (text, record) => <>{text ? <Tag color="success">{translateContent('global.label.active')}</Tag> : <Tag color="error">{translateContent('global.label.inActive')}</Tag>}</>,
        }),
        tblPrepareColumns({
            title: translateContent('hierarchyAttribute.label.duplicateAllowedDiffParent'),
            dataIndex: 'duplicateAllowedAtOtherParent',
            width: '20%',
            render: (text, record) => <>{text ? <Tag color="success">{translateContent('global.label.active')}</Tag> : <Tag color="error">{translateContent('global.label.inActive')}</Tag>}</>,
        }),

        tblActionColumn({ handleButtonClick, styles, width: '12%' })
    );

    return tableColumn;
};
