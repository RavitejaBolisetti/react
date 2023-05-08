import React from 'react';
import { Button, Space } from 'antd';
import { FiEdit2 } from 'react-icons/fi';
import { FaRegEye } from 'react-icons/fa';

import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { tblPrepareColumns } from 'utils/tableCloumn';
import { DEFAULT_PAGE_SIZE } from 'constants/constants';

import styles from 'components/common/Common.module.css';

export const tableColumn = (handleButtonClick, page = 1, pageSize = DEFAULT_PAGE_SIZE) => {
    const tableColumn = [];
    tableColumn.push(
        tblPrepareColumns({
            title: 'Srl.',
            dataIndex: 'srl',
            sorter: false,
            render: (_, __, index) => {
                return (page - 1) * pageSize + (index + 1);
            },
            width: '5%',
        }),

        tblPrepareColumns({
            title: 'State Code',
            dataIndex: 'code',
            width: '15%',
        }),

        tblPrepareColumns({
            title: 'State Name',
            dataIndex: 'name',
            width: '20%',
        }),

        tblPrepareColumns({
            title: 'Country',
            dataIndex: 'countryName',
            width: '20%',
        }),

        tblPrepareColumns({
            title: 'Status',
            dataIndex: 'status',
            render: (_, record) => (record?.status ? <div className={styles.activeText}>Active</div> : <div className={styles.inactiveText}>Inactive</div>),
            width: '15%',
        }),

        {
            title: 'Action',
            dataIndex: '',
            width: '8%',
            render: (record) => [
                <Space wrap>
                    <Button data-testid="edit" className={styles.tableIcons} aria-label="fa-edit" onClick={(e) => handleButtonClick({ buttonAction: FROM_ACTION_TYPE?.EDIT, record })}>
                        <FiEdit2 />
                    </Button>
                    <Button className={styles.tableIcons} aria-label="ai-view" onClick={(e) => handleButtonClick({ buttonAction: FROM_ACTION_TYPE?.VIEW, record })}>
                        <FaRegEye />
                    </Button>
                </Space>,
            ],
        }
    );

    return tableColumn;
};
