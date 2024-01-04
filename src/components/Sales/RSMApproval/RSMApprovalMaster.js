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
import { ListDataTable } from 'utils/ListDataTable';
import { AdvancedSearch } from './AdvancedSearch';
import { showGlobalNotification } from 'store/actions/notification';
import { ViewDetail } from './ViewDetail';
import { RejectRequest } from './RejectRequest';
import { RSM_APPROVAL_STATUS } from './utils/RSMApprovalStatus';
import { dateFormatView, convertDate } from 'utils/formatDateTime';

import { rsmApprovalSearchDataAction } from 'store/actions/data/sales/rsmApprovalSearch';
import { rsmApprovalDataAction } from 'store/actions/data/sales/rsmApproval';
import { translateContent } from 'utils/translateContent';

import styles from 'assets/sass/app.module.scss';
import { BASE_URL_RSM_APPROVAL_FORM_DATA } from 'constants/routingApi';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            Sales: {
                RSMApprovalSearch: { data, filter: filterString, isLoading },
            },
        },
    } = state;

    const moduleTitle = translateContent('rsmApproval.heading.moduleTitle');

    let returnValue = {
        userId,
        isDataLoaded: true,
        data: data?.paginationData,
        totalRecords: data?.totalRecords || [],
        moduleTitle,
        filterString,
        isLoading,
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
            fetchRsmFormData: rsmApprovalDataAction.fetchData,

            showGlobalNotification,
        },
        dispatch
    ),
});

export const RSMApprovalMasterBase = (props) => {
    const { fetchList, saveData, listShowLoading, userId, data, totalRecords, showGlobalNotification, fetchRsmFormData, isLoading } = props;
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
    };

    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });

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
                value: filterString?.searchParam || RSM_APPROVAL_STATUS?.PENDING?.key,
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
                value: filterString?.pageSize ?? 10,
                canRemove: true,
            },
            {
                key: 'pageNumber',
                title: 'Value',
                value: filterString?.current ?? 1,
                canRemove: true,
            },
            {
                key: 'sortBy',
                title: 'Sort By',
                value: filterString?.sortBy,
                canRemove: true,
            },
            {
                key: 'sortIn',
                title: 'Sort Type',
                value: filterString?.sortType,
                canRemove: true,
            },
        ];
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString]);

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

    const handleRequest = ({ requestType = false, requestContant = REQUEST_CONSTANT?.Reject?.value }) => {
        setRejectModalVisible(true);
        setRejectRequest(requestType);
        setRequestType(requestContant);
    };

    const handleResetFilter = () => {
        if (filterString) {
            setShowDataLoading(true);
        }
        setFilterString({ searchParam: filterString?.searchParam });
    };
    const getRsmAsmFormData = (record) => {
        const onSuccessAction = (res) => {
            const allowedActions = res?.data?.workflowMasterDetails?.allowedActions || [];
            setFormData(res?.data);
            setButtonData({ ...defaultBtnVisiblity, allowedActions });
        };
        const onErrorAction = (message) => {
            setButtonData({ ...defaultBtnVisiblity });
            showGlobalNotification({ message });
        };
        record && fetchRsmFormData({ setIsLoading: listShowLoading, userId, extraParams: [{ key: 'id', value: record?.id }], onSuccessAction, onErrorAction, customURL: BASE_URL_RSM_APPROVAL_FORM_DATA });
    };
    const handleButtonClick = ({ record = null }) => {
        form.resetFields();
        setFormData([]);
        getRsmAsmFormData(record);
        setIsFormVisible(true);
    };

    const handleSearchChange = (value) => {
        if (value) {
            setFilterString({ ...filterString, advanceFilter: true, dealerName: `${value?.trim()}` });
        }
    };

    const onFinish = (values) => {
        if (values?.status || requestType === REQUEST_CONSTANT?.Reject?.value) {
            let data = { ...values, request: requestType, id: formData?.id };
            if (data?.hasOwnProperty('status')) {
                delete data?.status;
            }
            const onSuccess = (res) => {
                form.resetFields();
                rejectForm.resetFields();
                setShowDataLoading(true);
                showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: res?.responseMessage });
                fetchList({ setIsLoading: listShowLoading, userId, extraParams, onSuccessAction, onErrorAction });
                setRejectModalVisible(false);
                setButtonData({ ...defaultBtnVisiblity });
                setIsFormVisible(false);
            };

            const onError = (message) => {
                showGlobalNotification({ message });
            };

            const requestData = {
                data,
                method: 'put',
                setIsLoading: listShowLoading,
                userId,
                onError,
                onSuccess,
            };

            saveData(requestData);
        } else {
            showGlobalNotification({ notificationType: 'error', title: translateContent('global.notificationError.title'), message: translateContent('rsmApproval.validation.acceptTerms') });
        }
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

        page: filterString,
        setPage: setFilterString,
        tableColumn: tableColumn(handleButtonClick),
        tableData: data,
        isLoading: showDataLoading,

        showAddButton: false,
        noMessge: translateContent('global.generalMessage.noRecordsFound'),
        handleAdd: handleButtonClick,

        filterString,
    };

    const removeFilter = (key) => {
        if (key === 'searchParam') {
            const { searchType, searchParam, ...rest } = filterString;
            setFilterString({ ...rest });
        } else {
            const tempfilterString = filterString;
            if (tempfilterString?.hasOwnProperty(key)) {
                delete [key];
            }
            setFilterString({ ...tempfilterString });
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
        titleOverride: translateContent('global.advanceFilter.title'),

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
        titleOverride: translateContent('rsmApproval.heading.viewDrawerTitle'),
        handleButtonClick,
        buttonData,
        setButtonData,
        setRejectRequest,
        formData,
        handleRequest,
        isLoading,
        REQUEST_CONSTANT,
    };

    const requestModuleTitle = translateContent('rsmApproval.heading.requestModuleTitle');

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
                    <ListDataTable {...tableProps} />
                </Col>
            </Row>
            <ViewDetail {...viewProps} />
            <RejectRequest {...rejectRequestProps} />
        </>
    );
};

const RSMApprovalMaster = connect(mapStateToProps, mapDispatchToProps)(RSMApprovalMasterBase);
export default RSMApprovalMaster;
