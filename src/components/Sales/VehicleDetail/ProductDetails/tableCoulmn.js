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
    const { handleButtonClick, formActionType, bindCodeValue } = props;
    const tableColumn = [
        tblPrepareColumns({
            title: 'Item',
            dataIndex: 'item',
            width: '20%',
            render: (text, record, index) => bindCodeValue(text, 'item'),
        }),
        tblPrepareColumns({
            title: 'Make ',
            dataIndex: 'make',
            width: '20%',
            render: (text, record, index) => bindCodeValue(text, 'make'),
        }),

        tblPrepareColumns({
            title: 'Serial No. ',
            dataIndex: 'serialNo',
            width: '20%',
        }),
    ];
    if (!formActionType?.viewMode) {
        tableColumn.push(tblActionColumn({ handleButtonClick, styles, width: '15%', EditIcon: true, EyeIcon: false, DeleteIcon: true }));
    }
    return tableColumn;
};
