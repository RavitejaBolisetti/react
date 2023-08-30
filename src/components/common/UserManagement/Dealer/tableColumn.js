/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Tag } from 'antd';
import { tblPrepareColumns, tblActionColumn } from 'utils/tableColumn';
import styles from 'assets/sass/app.module.scss';
//import styles from 'components/common/Common.module.css';

export const tableColumn = (handleButtonClick, page, pageSize) => {
    const tableColumn = [
        tblPrepareColumns({
            title: 'Employee Code',
            dataIndex: 'employeeCode',
            width: '14%',
        }),
        tblPrepareColumns({
            title: 'Dealer Name',
            dataIndex: 'dealerName',
            width: '14%',
        }),
        tblPrepareColumns({
            title: 'User Name',
            dataIndex: 'userName',
            width: '14%',
        }),
        tblPrepareColumns({
            title: 'User Roles',
            dataIndex: 'useRoles',
            width: '14%',
        }),
        tblPrepareColumns({
            title: 'Branch',
            dataIndex: 'brancheMapping',
            width: '12%',
            render: (text) => <Tag className={text ? styles.success : styles.warning}> {text ? 'Mapped' : 'Unmapped'}</Tag>,
        }),
        tblPrepareColumns({
            title: 'Products',
            dataIndex: 'productsMapping',
            width: '16%',
            render: (text) => <Tag className={text ? styles.success : styles.warning}> {text ? 'Mapped' : 'Unmapped'}</Tag>,
        }),
        tblActionColumn({ styles, handleButtonClick, width: '12%' }),
    ];
    return tableColumn;
};
