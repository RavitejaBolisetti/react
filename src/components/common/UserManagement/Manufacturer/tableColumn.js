/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import { tblPrepareColumns, tblActionColumn } from 'utils/tableColumn';

import styles from 'assets/sass/app.module.scss';

export const tableColumn = (handleButtonClick, page, pageSize) => {
    const tableColumn = [
        tblPrepareColumns({
            title: 'Token No.',
            dataIndex: 'employeeCode',
            width: '20%',
        }),
        tblPrepareColumns({
            title: 'User Name',
            dataIndex: 'userName',
            width: '20%',
        }),
        tblPrepareColumns({
            title: 'Designation',
            dataIndex: 'designation',
            width: '20%',
        }),
        tblPrepareColumns({
            title: 'User Roles',
            dataIndex: 'userRoleCount',
            width: '20%',
        }),
        tblActionColumn({ styles, handleButtonClick, width: '15%' }),
    ];
    return tableColumn;
};
