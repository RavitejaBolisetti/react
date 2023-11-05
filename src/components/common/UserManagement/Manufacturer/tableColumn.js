/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import { tblPrepareColumns, tblActionColumn } from 'utils/tableColumn';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

export const tableColumn = (handleButtonClick, page, pageSize) => {
    const tableColumn = [
        tblPrepareColumns({
            title: translateContent("userManagement.label.tokenNumber"),
            dataIndex: 'employeeCode',
            width: '20%',
        }),
        tblPrepareColumns({
            title: translateContent("userManagement.label.userName"),
            dataIndex: 'manufacturerUserName',
            width: '20%',
        }),
        tblPrepareColumns({
            title: translateContent("userManagement.label.designation"),
            dataIndex: 'designation',
            width: '20%',
        }),
        tblPrepareColumns({
            title: translateContent("userManagement.label.userRoles"),
            dataIndex: 'userRoleCount',
            width: '20%',
        }),
        tblActionColumn({ styles, handleButtonClick, width: '15%' }),
    ];
    return tableColumn;
};
