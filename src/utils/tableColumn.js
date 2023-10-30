/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { Button, Space, Tag, Switch } from 'antd';
import { FiEdit, FiUpload } from 'react-icons/fi';
import { FaRegEye } from 'react-icons/fa';
import { RxCross1 } from 'react-icons/rx';

import { addToolTip } from 'utils/addToolTip';

import { tableColumnActions } from './tableColumnActions';
import { DEFAULT_PAGE_SIZE } from 'constants/constants';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { DisableItemComponent } from 'utils/disableItemComponent';
import { GST_IRN_STATUS } from 'constants/GSTIRNStatus';
import { PlusOutlined } from '@ant-design/icons';

import styles from './tableColumn.module.scss';

const onFilterFn = (value, record) => {
    if (record.ChangeDate !== undefined) {
        return record.ChangeDate.startsWith(value);
    } else if (record.EmployeeCode !== undefined) {
        return record.EmployeeCode.startsWith(value);
    } else if (record.EmployeeName !== undefined) {
        return record.EmployeeName.startsWith(value);
    }
};

export const tblPrepareColumns = ({ title, dataIndex, localSort = true, render = undefined, ellipsis = false, filters = undefined, filterMode = 'tree', filterSearch = true, sortFn = undefined, width, sorter = true }) => {
    const sortingFn = (a, b) => (a && b ? String(a[dataIndex]).localeCompare(String(b[dataIndex]), undefined, {numeric: true, sensitivity: 'base' }) : a);
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
        sorter: sorter ? (localSort ? sortingFn : true) : false,
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
        sortDirections: ['descend', 'ascend'],
    };
};

export const tblStatusColumn = ({ width = '15%', fixed = '' }) => {
    return {
        title: 'Status',
        dataIndex: 'status',
        sorter: (a, b) => (a && b ? String(a['status']).localeCompare(String(b['status']), undefined, { sensitivity: 'base' }) : a),
        render: (_, record) => (record?.status ? <Tag color="success">Active</Tag> : <Tag color="error">Inactive</Tag>),
        width,
        fixed: fixed,
        sortDirections: ['descend', 'ascend'],
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
                <Space size="middle">
                    <Button data-testid="view" type="link" aria-label="ai-view" onClick={(record) => onEditAction(record?.code)}>
                        {addToolTip('View')(<FaRegEye />)}
                    </Button>
                    <Button data-testid="edit" type="link" aria-label="fa-edit" onClick={(record) => onEditAction(record?.code)}>
                        {addToolTip('Edit')(<FiEdit />)}
                    </Button>
                </Space>,
            ],
        };
    };

export const tblActionColumn = ({
    title = 'Action',
    handleButtonClick,
    width = '8%',
    fixed = '',
    canEdit = true,
    canView = true,
    canDelete = false,
    isDeletable = false,
    canServerDataEdit = false,
    canAdd = false,
    customButton = false,
    canUpload = false,
    customButtonProperties = {
        customName: 'Action',
        customkey: 'ACT',
        handleCustomButtonClick: () => {},
        handleName: () => {},
        icon: undefined,
        buttonType: 'link',
        customAction: 'customButton',
    },
}) => {
    return {
        title: 'Action',
        dataIndex: '',
        width,
        fixed: fixed,
        render: (text, record, index) => [
            <Space size="middle">
                {canAdd && (
                    <Button data-testid="add" type="link" aria-label="fa-add" onClick={(e) => handleButtonClick({ buttonAction: FROM_ACTION_TYPE?.ADD, record, index })}>
                        {addToolTip('Add')(<PlusOutlined />)}
                    </Button>
                )}

                {canEdit && (
                    <Button data-testid="edit" type="link" aria-label="fa-edit" onClick={(e) => handleButtonClick({ buttonAction: FROM_ACTION_TYPE?.EDIT, record, index })}>
                        {addToolTip('Edit')(<FiEdit />)}
                    </Button>
                )}

                {canView && (
                    <Button data-testid="view" type="link" aria-label="ai-view" onClick={(e) => handleButtonClick({ buttonAction: FROM_ACTION_TYPE?.VIEW, record, index })}>
                        {addToolTip('View')(<FaRegEye />)}
                    </Button>
                )}

                {canUpload && record?.irnStatus !== GST_IRN_STATUS.SUCCESS.title && (
                    <Button data-testid="upload" type="link" aria-label="fa-upload" onClick={(e) => handleButtonClick({ buttonAction: FROM_ACTION_TYPE?.UPLOAD, record, index })}>
                        {addToolTip('Upload')(<FiUpload />)}
                    </Button>
                )}

                {canServerDataEdit && !record?.id && (
                    <Button data-testid="edit" type="link" aria-label="fa-edit" onClick={(e) => handleButtonClick({ buttonAction: FROM_ACTION_TYPE?.EDIT, record, index })}>
                        {addToolTip('Edit')(<FiEdit />)}
                    </Button>
                )}

                {( isDeletable || (canDelete && !record?.id)) && (
                    <Button data-testid="delete" type="link" aria-label="fa-trash" onClick={(e) => handleButtonClick({ buttonAction: FROM_ACTION_TYPE?.DELETE, record, index })}>
                        {addToolTip('Delete')(<RxCross1 size={18} />)}
                    </Button>
                )}

                {customButton && (
                    <Button data-testid="customButton" type={customButtonProperties?.buttonType} icon={customButtonProperties?.icon} onClick={(e) => customButtonProperties?.handleCustomButtonClick({ buttonAction: customButtonProperties?.hasOwnProperty('handleName') ? customButtonProperties?.handleName({ name: customButtonProperties?.customName, record, index })?.key : customButtonProperties?.customkey, record, index })}>
                        {customButtonProperties?.hasOwnProperty('handleName') ? customButtonProperties?.handleName({ name: customButtonProperties?.customName, record, index })?.name : customButtonProperties?.customName}
                    </Button>
                )}
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
    sortDirections: ['descend', 'ascend'],
});

export const tableColumnActionsEditDelete =
    ({ title, dataIndex }) =>
    ({ onEditAction }) => ({
        title,
        dataIndex,
        render: (record) => [
            <Space size="middle">
                <Button data-testid="view" type="link" aria-label="ai-view" onClick={(e) => onEditAction(record?.code)}>
                    {addToolTip('View')(<FaRegEye />)}
                </Button>
                <Button data-testid="edit" type="link" aria-label="fa-edit" onClick={(e) => onEditAction(record?.code)}>
                    {addToolTip('Edit')(<FiEdit />)}
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
