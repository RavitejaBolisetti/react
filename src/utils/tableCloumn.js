import { Button, Space } from 'antd';
import { FiEdit2 } from 'react-icons/fi';
import { FaRegEye } from 'react-icons/fa';

import { DEFAULT_PAGE_SIZE } from 'constants/constants';
import { FROM_ACTION_TYPE } from 'constants/formActionType';

const onFilterFn = (value, record) => {
    if (record.ChangeDate !== undefined) {
        return record.ChangeDate.startsWith(value);
    } else if (record.EmployeeCode !== undefined) {
        return record.EmployeeCode.startsWith(value);
    } else if (record.EmployeeName !== undefined) {
        return record.EmployeeName.startsWith(value);
    }
};

export const tblPrepareColumns = ({ title, dataIndex, render = undefined, ellipsis = false, filters = undefined, filterMode = 'tree', filterSearch = true, sortFn = undefined, width, sorter = true }) => {
    return {
        title,
        dataIndex,
        width: width,
        ellipsis,
        filters,
        render,
        filterMode,
        filterSearch,
        onFilter: onFilterFn,
        sorter: sorter && ((a, b) => (a && b ? String(a[dataIndex]).localeCompare(String(b[dataIndex]), undefined, { sensitivity: 'base' }) : a)),
        sortDirections: ['descend', 'ascend'],
    };
};

export const tblSerialNumberColumn = ({ page = 1, pageSize = DEFAULT_PAGE_SIZE }) => {
    return {
        title: 'Srl.',
        dataIndex: 'srl',
        render: (_, __, index) => (page - 1) * pageSize + (index + 1),
        width: '5%',
    };
};

export const tblStatusColumn = ({ styles, width = '15%' }) => {
    return {
        title: 'Status',
        dataIndex: 'status',
        sorter: (a, b) => (a && b ? String(a['status']).localeCompare(String(b['status']), undefined, { sensitivity: 'base' }) : a),
        render: (_, record) => (record?.status ? <div className={styles.activeText}>Active</div> : <div className={styles.inactiveText}>Inactive</div>),
        width,
    };
};

export const tblApprovalStatusColumn = ({ styles, width = '15%' }) => {
    return {
        title: 'Approval Status',
        dataIndex: 'approvalStatus',
        sorter: (a, b) => (a && b ? String(a['approvalStatus']).localeCompare(String(b['approvalStatus']), undefined, { sensitivity: 'base' }) : a),
        render: (_, record) => (record?.approvalStatus ? <div className={styles.activeText}>Approved</div> : <div className={styles.inactiveText}>Not Approved</div>),
        width,
    };
};

export const tblActionColumn = ({ styles, handleButtonClick, width = '8%' }) => {
    return {
        title: 'Action',
        dataIndex: '',
        width,
        render: (record) => [
            <Space wrap>
                <Button data-testid="edit" className={styles.tableIcons} aria-label="fa-edit" onClick={(e) => handleButtonClick({ buttonAction: FROM_ACTION_TYPE?.EDIT, record })}>
                    <FiEdit2 />
                </Button>
                <Button data-testid="view" className={styles.tableIcons} aria-label="ai-view" onClick={(e) => handleButtonClick({ buttonAction: FROM_ACTION_TYPE?.VIEW, record })}>
                    <FaRegEye />
                </Button>
            </Space>,
        ],
    };
};
