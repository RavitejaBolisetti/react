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
    const { handleEdit, identification, isEditing, viewMode = false, handleSave, handleCancel, renderFormItems, handleDelete } = props;
    const tableColumn = [
        {
            title: 'Item',
            dataIndex: 'serviceName',
            width: '20%',
            render: (text, record, index) => (viewMode ? text : renderFormItems({ dataIndex: 'serviceName', ...props, Index: index, text: text })),
        },

        {
            title: 'Make ',
            dataIndex: 'make',
            width: '20%',
            render: (text, record, index) =>(viewMode ? text : renderFormItems({ dataIndex: 'make', ...props, Index: index, text: text })),
        },
        {
            title: 'Serial No. ',
            dataIndex: 'amount',
            width: '20%',
            render: (text, record, index) => (viewMode ? text : renderFormItems({ dataIndex: 'amount', ...props, Index: index, text: text })),
        },
        {
            title: 'Action',
            dataIndex: 'Action',
            key: 'Action',
            width: '25%',
            render: (text, record, index) => {
                console.log('tableRecord', index);
                return (
                    <>
                        {index !== identification ? (
                            <>
                                <Button disabled={isEditing || viewMode} data-testid="edit" className={styles.tableIcons} aria-label="fa-edit" icon={<FiEdit />} onClick={(e) => handleEdit({ record, index })} />
                                <Button disabled={isEditing || viewMode} data-testid="edit" className={styles.tableIcons} aria-label="fa-trash" icon={<FiTrash />} onClick={(e) => handleDelete({ record, index })} />
                            </>
                        ) : (
                            isEditing &&
                            index === identification && (
                                <>
                                    <Button data-testid="Save" type="link" aria-label="fa-edit" onClick={(e) => handleSave({ record, index })}>
                                        Save
                                    </Button>
                                    <Button data-testid="Cancel" type="link" aria-label="fa-edit" onClick={(e) => handleCancel({ record, index })}>
                                        Cancel
                                    </Button>
                                </>
                            )
                        )}
                    </>
                );
            },
        },
    ];

    return tableColumn;
};
