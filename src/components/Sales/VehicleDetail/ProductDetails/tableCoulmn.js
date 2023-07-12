/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { tblPrepareColumns, tblActionColumn } from 'utils/tableCloumn';
import styles from 'components/common/Common.module.css';
import { Button } from 'antd';
import { FiEdit, FiTrash } from 'react-icons/fi';

export const tableColumn = (handleEdit) => {
    const tableColumn = [
        {
            title: 'Item',
            dataIndex: 'serviceName',
            width: '25%',
        },

        {
            title: 'Make ',
            dataIndex: 'make',
            width: '25%',
        },
        {
            title: 'Serial No. ',
            dataIndex: 'amount',
            width: '25%',
        },
        {
            title: 'Action',
            dataIndex: 'Action',
            key: 'Action',
            width: '25%',
            render: (text, record, index) => {
                return (
                    <Button data-testid="edit" className={styles.tableIcons} aria-label="fa-edit" onClick={(e) => handleEdit(record)}>
                        <FiEdit />
                    </Button>
                );
            },
        },
    ];

    return tableColumn;
};
