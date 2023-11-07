/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Tag } from 'antd';
import { tblPrepareColumns, tblActionColumn } from 'utils/tableColumn';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

export const tableColumn = (handleButtonClick, page, pageSize) => {
    const tableColumn = [
        tblPrepareColumns({
            title: translateContent('userManagement.label.employeeCode'),
            dataIndex: 'employeeCode',
            width: '14%',
        }),
        tblPrepareColumns({
            title: translateContent('userManagement.label.dealerName'),
            dataIndex: 'dealerName',
            width: '14%',
        }),
        tblPrepareColumns({
            title: translateContent('userManagement.label.userName'),
            dataIndex: 'userName',
            width: '14%',
        }),
        tblPrepareColumns({
            title: translateContent('userManagement.label.userRoles'),
            dataIndex: 'userRoleCount',
            width: '14%',
        }),
        tblPrepareColumns({
            title: translateContent('userManagement.label.branch'),
            dataIndex: 'branchMapping',
            width: '12%',
            render: (text) => (text ? <Tag color="success">{translateContent('userManagement.label.mapped')}</Tag> : <Tag color="warning">{translateContent('userManagement.label.unmapped')}z</Tag>),
        }),
        tblPrepareColumns({
            title: translateContent('userManagement.label.products'),
            dataIndex: 'productMapping',
            width: '16%',
            render: (text) => (text ? <Tag color="success">{translateContent('userManagement.label.mapped')}</Tag> : <Tag color="warning">{translateContent('userManagement.label.unmapped')}</Tag>),
        }),
        tblActionColumn({ styles, handleButtonClick, width: '12%' }),
    ];
    return tableColumn;
};
