/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from 'utils/tableColumn';
import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

export const tableColumn = (handleButtonClick, formActionType) => {
    const tableColumn = [
        tblPrepareColumns({
            title: translateContent('userManagement.label.role'),
            dataIndex: 'roleName',
            width: '12%',
        }),
        tblPrepareColumns({
            title: translateContent('userManagement.label.roleId'),
            dataIndex: 'roleId',
            width: '16%',
        }),
        tblPrepareColumns({
            title: translateContent('userManagement.label.accessProvided'),
            dataIndex: 'accessProvided',
            width: '16%',
        }),
        tblActionColumn({ styles, handleButtonClick, width: '10%', canEdit: !formActionType?.viewMode, canView: formActionType?.viewMode }),
    ];
    return tableColumn;
};
