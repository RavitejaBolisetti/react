/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from 'utils/tableCloumn';
import styles from 'components/common/Common.module.css';
import { Button } from 'antd';
import { FiEdit, FiTrash } from 'react-icons/fi';

export const tableColumn = (props) => {
    const { handleButtonClick, formActionType } = props;
    const tableColumn = [
        tblPrepareColumns({
            title: 'Group',
            dataIndex: 'group',
            width: '20%',
        }),
        tblPrepareColumns({
            title: 'Sub-Group ',
            dataIndex: 'subGroup',
            width: '20%',
        }),

        tblPrepareColumns({
            title: 'Check Point ',
            dataIndex: 'checkPoint',
            width: '20%',
        }),
        tblPrepareColumns({
            title: 'Check Result ',
            dataIndex: 'checkResult',
            width: '20%',
        }),
        tblPrepareColumns({
            title: 'Remarks',
            dataIndex: 'Remarks',
            width: '20%',
        }),
    ];
    if (!formActionType?.viewMode) {
        tableColumn.push(tblActionColumn({ handleButtonClick, styles, width: '15%', EditIcon: true, EyeIcon: false, DeleteIcon: false }));
    }
    return tableColumn;
};
