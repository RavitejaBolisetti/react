/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { Button, Space, Tag, Switch } from 'antd';
import { FiEdit } from 'react-icons/fi';
import { FaRegEye } from 'react-icons/fa';

import { tableColumnActions } from './tableColumnActions';
import { DEFAULT_PAGE_SIZE } from 'constants/constants';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { DisableItemComponent } from 'utils/disableItemComponent';
// import { handleEdit, handleCustomEdit } from 'components/crud/crudListingPage/tableColumnActionEdit';
import styles from './tableColumn.module.css';

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

export const tblSerialNumberColumn = ({ page = 1, pageSize = DEFAULT_PAGE_SIZE, width = '5%', fixed = '' }) => {
    return {
        title: 'Srl.',
        dataIndex: 'srl',
        render: (_, __, index) => (page - 1) * pageSize + (index + 1),
        fixed: fixed,
        width: width,
    };
};

export const tblApprovalStatusColumn = ({ width = '15%' }) => {
    return {
        title: 'Approval Status',
        dataIndex: 'approvalStatus',
        sorter: (a, b) => (a && b ? String(a['approvalStatus']).localeCompare(String(b['approvalStatus']), undefined, { sensitivity: 'base' }) : a),
        render: (_, record) => (record?.approvalStatus ? <div className={styles.activeText}>Approved</div> : <div className={styles.inactiveText}>Not Approved</div>),
        width,
    };
};

export const tblStatusColumn = ({ width = '15%', fixed = '' }) => {
    return {
        title: 'Status',
        dataIndex: 'status',
        sorter: (a, b) => (a && b ? String(a['status']).localeCompare(String(b['status']), undefined, { sensitivity: 'base' }) : a),
        render: (_, record) => (record?.status ? <div className={styles.activeText}>Active</div> : <div className={styles.inactiveText}>Inactive</div>),
        width,
        fixed: fixed,
    };
};

export const tblActionColumnCurd =
    ({ title = 'Action', handleButtonClick, width = '8%', fixed = '' }) =>
    (props) => {
        const { onEditAction } = props;
        return {
            title: 'Action',
            dataIndex: '',
            width,
            fixed: fixed,
            render: (record) => [
                <Space wrap>
                    <Button data-testid="view" className={styles.tableIcons} aria-label="ai-view" onClick={(record) => onEditAction(record?.code)}>
                        <FaRegEye />
                    </Button>
                    <Button data-testid="edit" className={styles.tableIcons} aria-label="fa-edit" onClick={(record) => onEditAction(record?.code)}>
                        <FiEdit />
                    </Button>
                </Space>,
            ],
        };
    };

export const tblActionColumn = ({ title = 'Action', handleButtonClick, width = '8%', fixed = '' }) => {
    return {
        title: 'Action',
        dataIndex: '',
        width,
        fixed: fixed,
        render: (record) => [
            <Space wrap>
                <Button data-testid="view" className={styles.tableIcons} aria-label="ai-view" onClick={(e) => handleButtonClick({ buttonAction: FROM_ACTION_TYPE?.VIEW, record })}>
                    <FaRegEye />
                </Button>
                <Button data-testid="edit" className={styles.tableIcons} aria-label="fa-edit" onClick={(e) => handleButtonClick({ buttonAction: FROM_ACTION_TYPE?.EDIT, record })}>
                    <FiEdit />
                </Button>
            </Space>,
        ],
    };
};

export const tableColumnStringWithTag = ({ title, dataIndex, sorter = true }) => ({
    title,
    sorter: sorter && ((a, b) => (a && b ? String(a[dataIndex]).localeCompare(String(b[dataIndex]), undefined, { sensitivity: 'base' }) : a)),
    render: (record) => {
        return (
            <Tag className={styles.tagWidth} color={record[dataIndex] ? 'green' : 'red'}>
                {record[dataIndex] ? 'Active' : 'Inactive'}
            </Tag>
        );
    },
});

export const tableColumnActionsEditDelete =
    ({ title, dataIndex }) =>
    ({ onEditAction }) => ({
        title,
        dataIndex,
        render: (record) => [
            <Space wrap>
                <Button data-testid="view" className={styles.tableIcons} aria-label="ai-view" onClick={(e) => onEditAction(record?.code)}>
                    <FaRegEye />
                </Button>
                <Button data-testid="edit" className={styles.tableIcons} aria-label="fa-edit" onClick={(e) => onEditAction(record?.code)}>
                    <FiEdit />
                </Button>
            </Space>,
        ],
    });

export const tableColumnStatusSwitch =
    ({ title, fieldName }) =>
    (props) => {
        const { canEditMaster } = props;
        const handleUpdateStatus = (props) => (currentData) => {
            const selectedData = [currentData.id];
            const { listShowLoading, listFetchError, activeMultipleList, listUnSetSeletedData, queryStringStudySpecific, inActiveMultipleList, match, studySpecific, moduleType, siteSpecific, studySubmissionDocumentSpecific, userId, courseSpecific } = props;
            if (currentData.isActive) {
                inActiveMultipleList({
                    selectedData,
                    setIsLoading: listShowLoading,
                    errorAction: listFetchError,
                    unSetSeletData: listUnSetSeletedData,
                    studyId: studySpecific || queryStringStudySpecific ? match.params.studyId : undefined,
                    siteId: siteSpecific ? match.params.siteId : undefined,
                    moduleType,
                    submissionId: studySubmissionDocumentSpecific ? match.params.submissionId : undefined,
                    submissionType: props.submissionType,
                    userId,
                    courseId: courseSpecific ? match?.params?.courseId : undefined,
                });
            } else {
                activeMultipleList({
                    selectedData,
                    setIsLoading: listShowLoading,
                    errorAction: listFetchError,
                    unSetSeletData: listUnSetSeletedData,
                    studyId: studySpecific || queryStringStudySpecific ? match.params.studyId : undefined,
                    siteId: siteSpecific ? match.params.siteId : undefined,
                    moduleType,
                    submissionId: studySubmissionDocumentSpecific ? match.params.submissionId : undefined,
                    submissionType: props.submissionType,
                    userId,
                    courseId: courseSpecific ? match?.params?.courseId : undefined,
                });
            }
        };

        return {
            title,
            render: canEditMaster ? (
                (record) => (
                    <>
                        <Switch onClick={() => handleUpdateStatus(props)(record)} disabled={record.isReadOnly} checked={record[fieldName]} />
                    </>
                )
            ) : (
                <DisableItemComponent />
            ),
        };
    };

export { tableColumnActions };
