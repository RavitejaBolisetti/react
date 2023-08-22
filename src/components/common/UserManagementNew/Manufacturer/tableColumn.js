/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import { Tag } from 'antd';
import { tblPrepareColumns, tblActionColumn } from 'utils/tableColumn';
import styles from 'components/common/Common.module.css';

export const tableColumn = (handleButtonClick, page, pageSize) => {
    const tableColumn = [
        tblPrepareColumns({
            title: 'Token No.',
            dataIndex: 'employeeCode',
            width: '12%',
        }),
        tblPrepareColumns({
            title: 'User Name',
            dataIndex: 'userName',
            width: '16%',
        }),
        tblPrepareColumns({
            title: 'Designation',
            dataIndex: 'designation',
            width: '17%',
        }),
        tblPrepareColumns({
            title: 'User Roles',
            dataIndex: 'userRoleCount',
            width: '12%',
        }),
        tblPrepareColumns({
            title: 'Hierarchy',
            dataIndex: 'hierarchyMapping',
            width: '14%',
            render: (text) => <Tag className={text ? styles.success : styles.warning}> {text ? 'Mapped' : 'Unmapped'}</Tag>,
        }),
        tblPrepareColumns({
            title: 'Products',
            dataIndex: 'productsMapping',
            width: '14%',
            render: (text) => <Tag className={text ? styles.success : styles.warning}> {text ? 'Mapped' : 'Unmapped'}</Tag>,
        }),
        tblActionColumn({ styles, handleButtonClick, width: '10%' }),
    ];
    return tableColumn;
};
