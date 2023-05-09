import React from 'react';
import { Button, Space } from 'antd';
import { FiEdit2 } from 'react-icons/fi';
import { FaRegEye } from 'react-icons/fa';

import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { tblPrepareColumns } from 'utils/tableCloumn';

import styles from 'components/common/Common.module.css';
export const tableColumn = (handleFormAction) => {
    const tableColumn = [];

    tableColumn.push(
        tblPrepareColumns({
            title: 'Srl.',
            dataIndex: 'srl',
            sorter: false,
            width: '5%',
        }),

        tblPrepareColumns({
            title: 'Tehsil Code',
            dataIndex: 'code',
            width: '15%',
        }),

        tblPrepareColumns({
            title: 'Tehsil Name',
            dataIndex: 'name',
            width: '20%',
        }),

        tblPrepareColumns({
            title: 'District Name',
            dataIndex: 'districtName',
            width: '20%',
        }),

        tblPrepareColumns({
            title: 'State Name',
            dataIndex: 'stateName',
            width: '20%',
        }),

        tblPrepareColumns({
            title: 'Status',
            dataIndex: 'activeIndicator',
            render: (_, record) => (record?.status ? <div className={styles.activeText}>Active</div> : <div className={styles.inactiveText}>Inactive</div>),
            width: '10%',
        }),

        {
            title: 'Action',
            dataIndex: '',
            width: '10%',
            render: (record) => [
                <Space wrap>
                    <Button data-testid="edit" className={styles.tableIcons} aria-label="fa-edit" onClick={() => handleFormAction({ buttonAction: FROM_ACTION_TYPE?.EDIT, record })}>
                        <FiEdit2 />
                    </Button>
                    <Button className={styles.tableIcons} aria-label="ai-view" onClick={() => handleFormAction({ buttonAction: FROM_ACTION_TYPE?.VIEW, record })}>
                        <FaRegEye />
                    </Button>
                </Space>,
            ],
        }
    );

    return tableColumn;
};
