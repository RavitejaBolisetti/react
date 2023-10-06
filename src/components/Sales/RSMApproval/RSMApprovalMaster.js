/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Row, Col, Form } from 'antd';

import { tableColumn } from './tableColumn';
import AdvanceFilter from './AdvanceFilter';
import { VIEW_ACTION } from 'utils/btnVisiblity';
import { ListDataTable } from 'utils/ListDataTable';
import { AdvancedSearch } from './AdvancedSearch';
import { showGlobalNotification } from 'store/actions/notification';
import { ViewDetail } from './ViewDetail';
import { RejectRequest } from './RejectRequest';
import { RSM_APPROVAL_STATUS } from './utils/RSMApprovalStatus';
import { dateFormatView, convertDate } from 'utils/formatDateTime';

import { LANGUAGE_EN } from 'language/en';
import { FilterIcon } from 'Icons';
import { rsmApprovalSearchDataAction } from 'store/actions/data/sales/rsmApprovalSearch';
import { rsmApprovalDataAction } from 'store/actions/data/sales/rsmApproval';

import styles from 'assets/sass/app.module.scss';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            Sales: {
                RSMApprovalSearch: { data, filter: filterString },
            },
        },
    } = state;

    const moduleTitle = 'RSM Approval';

    let returnValue = {
        userId,
        isDataLoaded: true,
        data: data?.paginationData,
        totalRecords: data?.totalRecords || [],
        moduleTitle,
        filterString,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: rsmApprovalSearchDataAction.fetchList,
            fetchDetail: rsmApprovalSearchDataAction.fetchDetail,
            listShowLoading: rsmApprovalSearchDataAction.listShowLoading,
            setFilterString: rsmApprovalSearchDataAction.setFilter,
            resetData: rsmApprovalSearchDataAction.reset,
            saveData: rsmApprovalDataAction.saveData,
            showGlobalNotification,
        },
        dispatch
    ),
});

export const RSMApprovalMasterBase = (props) => {
    const { fetchList, saveData, listShowLoading, userId, data, totalRecords, showGlobalNotification } = props;
    const { typeData } = props;
    const { filterString, setFilterString } = props;

    const [listFilterForm] = Form.useForm();
    const [rejectForm] = Form.useForm();

    const [form] = Form.useForm();
    const [searchForm] = Form.useForm();
    const [advanceFilterForm] = Form.useForm();

    const [showDataLoading, setShowDataLoading] = useState(true);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [rejectRequest, setRejectRequest] = useState(false);

    const defaultBtnVisiblity = {
        closeBtn: true,
        cancelBtn: false,
        formBtnActive: true,
        reject: true,
        approve: true,
    };

    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });

    const defaultFormActionType = { addMode: false, editMode: false, viewMode: true };
    const [formActionType, setFormActionType] = useState({ ...defaultFormActionType });

    const [page, setPage] = useState({ pageSize: 10, current: 1 });
    const dynamicPagination = true;

    const [formData, setFormData] = useState([]);
    const [isAdvanceSearchVisible, setAdvanceSearchVisible] = useState(false);
    const [isRejectModalVisible, setRejectModalVisible] = useState(false);
    const [requestType, setRequestType] = useState('');
    const [rejectFormButtonActive, setRejectFormButtonActive] = useState(true);
    const [rsmStatusType, setRsmStatusType] = useState(RSM_APPROVAL_STATUS?.PENDING?.key);

    const REQUEST_CONSTANT = {
        Reject: {
            key: 'Reject',
            value: 'R',
        },
        Approve: {
            key: 'Approve',
            value: 'A',
        },
    };

    const onSuccessAction = () => {
        searchForm.setFieldsValue({ searchType: undefined, searchParam: undefined });
        searchForm.resetFields();
        setShowDataLoading(false);
        setRejectFormButtonActive(true);
    };

    const onErrorAction = (message) => {
        showGlobalNotification({ message });
        setShowDataLoading(false);
    };

    const handleButtonQuery = (item) => {
        setRsmStatusType(item?.key);
        setFilterString({ searchParam: item?.key });
        setShowDataLoading(true);
    };

    useEffect(() => {
        if (filterString) {
            setPage({ ...page, current: 1 });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString]);

    const extraParams = useMemo(() => {
        return [
            {
                key: 'searchType',
                title: 'Type',
                value: 'invoiceActionStatus',
                name: 'Status',
                canRemove: false,
                filter: false,
            },
            {
                key: 'searchParam',
                title: 'Value',
                value: filterString?.searchParam || rsmStatusType,
                canRemove: true,
                filter: false,
            },
            {
                key: 'fromDate',
                title: 'From Date',
                value: filterString?.fromDate,
                name: convertDate(filterString?.fromDate, dateFormatView),
                canRemove: true,
                filter: true,
            },
            {
                key: 'toDate',
                title: 'To Date',
                value: filterString?.toDate,
                name: convertDate(filterString?.toDate, dateFormatView),
                canRemove: true,
                filter: true,
            },
            {
                key: 'dealerName',
                title: 'Dealer Name',
                value: filterString?.dealerName,
                name: filterString?.dealerName,
                canRemove: true,
                filter: true,
            },
            {
                key: 'pageSize',
                title: 'Value',
                value: page?.pageSize,
                canRemove: true,
            },
            {
                key: 'pageNumber',
                title: 'Value',
                value: page?.current,
                canRemove: true,
            },
            {
                key: 'sortBy',
                title: 'Sort By',
                value: page?.sortBy,
                canRemove: true,
            },
            {
                key: 'sortIn',
                title: 'Sort Type',
                value: page?.sortType,
                canRemove: true,
            },
        ];
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString, page]);

    useEffect(() => {
        if (userId) {
            setShowDataLoading(true);
            fetchList({ setIsLoading: listShowLoading, userId, extraParams, onSuccessAction, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, extraParams]);

    useEffect(() => {
        setFilterString({ ...filterString, searchParam: RSM_APPROVAL_STATUS?.PENDING?.key });
        return () => {
            setFilterString();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onAdvanceSearchCloseAction = () => {
        form.resetFields();
        advanceFilterForm.resetFields();
        advanceFilterForm.setFieldsValue();
        setAdvanceSearchVisible(false);
    };

    const handleRequest = ({ requestType = false }) => {
        setRejectModalVisible(true);
        requestType ? setRejectRequest(true) : setRejectRequest(false);
        requestType ? setRequestType(REQUEST_CONSTANT?.Reject?.value) : setRequestType(REQUEST_CONSTANT?.Approve?.value);
    };

    const handleResetFilter = (e) => {
        if (filterString) {
            setShowDataLoading(true);
        }
        setFilterString({ searchParam: filterString?.searchParam });
    };

    const handleButtonClick = ({ record = null, buttonAction }) => {
        form.resetFields();
        setFormData([]);
        rsmStatusType === RSM_APPROVAL_STATUS?.PENDING?.key ? setButtonData({ ...defaultBtnVisiblity }) : setButtonData({ ...defaultBtnVisiblity, cancelBtn: false, reject: false, approve: false });
        setFormActionType({ viewMode: buttonAction === VIEW_ACTION });
        record && setFormData(record);
        setIsFormVisible(true);
    };

    const handleSearchChange = (value) => {
        const searchValue = value.trim();
        if (!searchValue) {
            return;
        }
        setFilterString({ ...filterString, advanceFilter: true, dealerName: `${searchValue}` });
    };

    const onFinish = (values) => {
        if (values?.status || requestType === REQUEST_CONSTANT?.Reject?.value) {
            let data = { ...values, request: requestType, id: formData?.id };
            delete data?.status;
            const onSuccess = (res) => {
                form.resetFields();
                rejectForm.resetFields();
                setShowDataLoading(true);
                showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
                fetchList({ setIsLoading: listShowLoading, userId, extraParams, onSuccessAction, onErrorAction });
                setRejectModalVisible(false);
                setButtonData({ ...buttonData, formBtnActive: false });
                setIsFormVisible(false);
            };

            const onError = (message) => {
                showGlobalNotification({ message });
            };

            const requestData = {
                data: data,
                method: 'put',
                setIsLoading: listShowLoading,
                userId,
                onError,
                onSuccess,
            };

            saveData(requestData);
        } else {
            showGlobalNotification({ notificationType: 'error', title: 'Error', message: 'Please accept Terms and Condition' });
        }
    };

    const onFinishFailed = (errorInfo) => {
        return;
    };

    const rejectModalCloseAction = () => {
        setRejectModalVisible(false);
        setIsFormVisible(true);
        setRejectFormButtonActive(true);
        rejectForm.resetFields();
    };

    const onCloseAction = () => {
        form.resetFields();
        form.setFieldsValue();
        setIsFormVisible(false);
        setButtonData({ ...defaultBtnVisiblity });
    };

    const tableProps = {
        dynamicPagination,
        totalRecords,
        page,
        setPage,
        tableColumn: tableColumn(handleButtonClick),
        tableData: data,
        showAddButton: false,
        handleAdd: handleButtonClick,
        noMessge: LANGUAGE_EN.GENERAL.LIST_NO_DATA_FOUND.TITLE,
        rsmStatusType,
    };

    const removeFilter = (key) => {
        if (key === 'searchParam') {
            const { searchType, searchParam, ...rest } = filterString;
            setFilterString({ ...rest });
        } else {
            const { [key]: names, ...rest } = filterString;
            setFilterString({ ...rest });
        }
    };

    const advanceFilterResultProps = {
        extraParams,
        removeFilter,
        advanceFilter: true,
        filter: true,
        filterString,
        setFilterString,
        from: listFilterForm,
        onFinish,
        onFinishFailed,
        title: '',
        handleButtonQuery,
        data,
        typeData,
        rsmStatusType,
        searchForm,
        handleSearchChange,
        handleResetFilter,
        isAdvanceSearchVisible,
        setAdvanceSearchVisible,
    };

    const advanceFilterProps = {
        isVisible: isAdvanceSearchVisible,
        // icon: <FilterIcon size={20} />,
        titleOverride: 'Advance Filters',

        onCloseAction: onAdvanceSearchCloseAction,
        handleResetFilter,
        filterString,
        setFilterString,
        advanceFilterForm,
        setAdvanceSearchVisible,
        typeData,
    };

    const viewProps = {
        isVisible: isFormVisible,
        styles,
        onCloseAction,
        titleOverride: 'View RSM Approval Details',
        handleButtonClick,
        buttonData,
        setButtonData,
        setRejectRequest,
        formData,
        handleRequest,
    };

    const requestModuleTitle = ' Co-Dealer Invoice';

    const rejectRequestProps = {
        isVisible: isRejectModalVisible,
        onCloseAction: rejectModalCloseAction,
        titleOverride: requestType === 'R' ? REQUEST_CONSTANT?.Reject?.key?.concat(requestModuleTitle) : REQUEST_CONSTANT?.Approve?.key?.concat(requestModuleTitle),
        rejectForm,
        rejectModalCloseAction,
        rejectRequest,
        setRejectRequest,
        onFinish,
        rejectFormButtonActive,
        setRejectFormButtonActive,
    };

    return (
        <>
            <AdvanceFilter {...advanceFilterResultProps} />
            <AdvancedSearch {...advanceFilterProps} />

            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <ListDataTable isLoading={showDataLoading} {...tableProps} showAddButton={false} />
                </Col>
            </Row>
            {formActionType?.viewMode && <ViewDetail {...viewProps} />}
            <RejectRequest {...rejectRequestProps} />
        </>
    );
};

const RSMApprovalMaster = connect(mapStateToProps, mapDispatchToProps)(RSMApprovalMasterBase);
export default RSMApprovalMaster;
