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
import { DELIVERY_NOTE_INVOICE_STATUS } from './utils/DeliveryNoteInvoiceStatus';
import { dateFormatView, converDateDayjs } from 'utils/formatDateTime';
import { BASE_URL_APPROVAL_CANCEL_REQUEST_URL as approvalCancelURL, BASE_URL_RSM_ASM_APPROVAL_DETAILS } from 'constants/routingApi';

import { LANGUAGE_EN } from 'language/en';

import { FilterIcon } from 'Icons';
import { rsmAsmApprovalSearchDataAction } from 'store/actions/data/rsmAsmApproval/rsmAsmApprovalSearch';
import { ViewDetail } from './ViewDetail';
import styles from 'assets/sass/app.module.scss';
import { ConfirmationModal } from 'utils/ConfirmationModal';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            RsmAsmApproval: {
                RsmAsmApprovalSearch: { isDetailLoaded = false, data, filter: filterString, detailData: detailData = [] },
            },
        },
    } = state;

    const moduleTitle = 'Invoice Cancellation';

    let returnValue = {
        userId,
        isDataLoaded: true,
        data: data?.paginationData,
        detailData,
        totalRecords: data?.totalRecords || [],
        moduleTitle,
        filterString,
        typeData,
        isDetailLoaded,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: rsmAsmApprovalSearchDataAction.fetchList,
            fetchDetail: rsmAsmApprovalSearchDataAction.fetchDetail,
            listShowLoading: rsmAsmApprovalSearchDataAction.listShowLoading,
            setFilterString: rsmAsmApprovalSearchDataAction.setFilter,
            resetData: rsmAsmApprovalSearchDataAction.reset,
            saveData: rsmAsmApprovalSearchDataAction.saveData,
            showGlobalNotification,
        },
        dispatch
    ),
});

export const RsmAsmApprovalMasterBase = (props) => {
    const { fetchList, fetchDetail, saveData, detailData, listShowLoading, userId, data, totalRecords, showGlobalNotification } = props;
    const { typeData } = props;
    const { filterString, setFilterString, isDetailLoaded } = props;

    const [form] = Form.useForm();
    const [listFilterForm] = Form.useForm();
    const [searchForm] = Form.useForm();
    const [advanceFilterForm] = Form.useForm();

    const [showDataLoading, setShowDataLoading] = useState(true);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [confirmRequest, setConfirmRequest] = useState();
    const [selectedId, setSelectedId] = useState();

    const defaultBtnVisiblity = {
        closeBtn: true,
        cancelBtn: false,
        formBtnActive: true,
        // rejectApproveBtn: false,
    };

    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });

    const defaultFormActionType = { addMode: false, editMode: false, viewMode: false };
    const [formActionType, setFormActionType] = useState({ ...defaultFormActionType });

    const [page, setPage] = useState({ pageSize: 10, current: 1 });
    const dynamicPagination = true;

    const [formData, setFormData] = useState([]);
    const [isAdvanceSearchVisible, setAdvanceSearchVisible] = useState(false);
    const [invoiceStatusType, setInvoiceStatusType] = useState(DELIVERY_NOTE_INVOICE_STATUS?.PENDING?.key);

    const REQUEST_CONSTANT = {
        Reject: {
            key: 'Reject',
            value: 'WFACTREJ',
        },
        Approve: {
            key: 'Approve',
            value: 'WFACTAPR',
        },
    };
    useEffect(() => {
        return () => {
            setFilterString();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (userId && selectedId) {
            const extraParams = [
                {
                    key: 'id',
                    title: 'id',
                    value: selectedId,
                    name: 'id',
                },
            ];
            fetchDetail({ setIsLoading: listShowLoading, userId, customURL: BASE_URL_RSM_ASM_APPROVAL_DETAILS, extraParams, onSuccessAction, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, selectedId]);

    const onSuccessAction = () => {
        searchForm.setFieldsValue({ searchType: undefined, searchParam: undefined });
        searchForm.resetFields();
        setShowDataLoading(false);
    };

    const onErrorAction = (message) => {
        showGlobalNotification({ message });
        setShowDataLoading(false);
    };

    const handleButtonQuery = (item) => {
        setInvoiceStatusType(item?.key);
        setFilterString({ current: 1 });
        setPage((prev) => ({ ...prev, current: 1 }));
        setShowDataLoading(true);
    };

    const extraParams = useMemo(() => {
        return [
            {
                key: 'status',
                title: 'status',
                value: invoiceStatusType,
                canRemove: false,
                filter: false,
            },
            {
                key: 'searchParam',
                title: 'Value',
                name: filterString?.searchParam,
                value: filterString?.searchParam,
                canRemove: true,
                filter: true,
            },
            {
                key: 'fromDate',
                title: 'From Date',
                value: filterString?.fromDate,
                name: converDateDayjs(filterString?.fromDate, dateFormatView),
                canRemove: false,
                filter: true,
            },
            {
                key: 'toDate',
                title: 'To Date',
                value: filterString?.toDate,
                name: converDateDayjs(filterString?.toDate, dateFormatView),
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
                value: filterString?.current || page?.current,
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
    }, [userId, invoiceStatusType, extraParams]);

    useEffect(() => {
        if (page?.current >= 1) {
            setFilterString({ ...filterString, pageSize: 10, current: page?.current });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    const onAdvanceSearchCloseAction = () => {
        form.resetFields();
        advanceFilterForm.resetFields();
        advanceFilterForm.setFieldsValue();
        setAdvanceSearchVisible(false);
    };

    const handleResetFilter = (e) => {
        form.resetFields();
        advanceFilterForm.resetFields();
        advanceFilterForm.setFieldsValue();
        if (filterString) {
            const { invoiceStatusType, ...rest } = filterString;
            if (rest?.invoiceStatusType) {
                setShowDataLoading(true);
            }
            setFilterString({ invoiceStatusType: invoiceStatusType });
        }
    };

    const handleButtonClick = ({ record = null, buttonAction }) => {
        form.resetFields();
        setFormData([]);
        setButtonData({ ...defaultBtnVisiblity });
        // record?.requestStatus === DELIVERY_NOTE_INVOICE_STATUS?.PENDING?.key ? setButtonData({ ...defaultBtnVisiblity, rejectApproveBtn: true }) : setButtonData({ ...defaultBtnVisiblity, rejectApproveBtn: false });
        setFormActionType({ viewMode: buttonAction === VIEW_ACTION });
        record && setFormData(record);
        record && setSelectedId(record?.id);
        setIsFormVisible(true);
    };

    const handleSearchChange = (value) => {
        const searchValue = value.trim();
        if (!searchValue) {
            return;
        }
        setFilterString({ ...filterString, advanceFilter: true, searchParam: searchValue });
    };

    const onFinish = (values) => {
        setConfirmRequest({ isVisible: false });
        let data = {
            action: values?.requestType,
            id: selectedId,
            deliveryOrInvoiceId: detailData?.deliveryOrInvoiceId,
            requestType: detailData?.requestType,
            cancelRemark: values?.rejectionRemark,
        };

        const onSuccess = (res) => {
            form.resetFields();
            setShowDataLoading(true);
            showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
            fetchList({ setIsLoading: listShowLoading, userId, extraParams, onSuccessAction, onErrorAction });

            setButtonData({ ...buttonData, formBtnActive: false });
            setIsFormVisible(false);
        };

        const onError = (message) => {
            showGlobalNotification({ message });
        };

        const requestData = {
            data: data,
            method: 'put',
            customURL: approvalCancelURL,
            setIsLoading: listShowLoading,
            userId,
            onError,
            onSuccess,
        };

        saveData(requestData);
    };

    const onFinishFailed = (errorInfo) => {
        return;
    };

    const onCloseAction = () => {
        form.resetFields();
        form.setFieldsValue();
        setSelectedId();
        setIsFormVisible(false);
        setButtonData({ ...defaultBtnVisiblity });
    };

    const handleRequest = (actionItem) => {
        actionItem &&
            setConfirmRequest({
                isVisible: true,
                titleOverride: actionItem?.buttonAction === REQUEST_CONSTANT?.Reject?.value ? REQUEST_CONSTANT?.Reject?.key?.concat(requestModuleTitle) : REQUEST_CONSTANT?.Approve?.key?.concat(requestModuleTitle),
                text: actionItem?.buttonAction === REQUEST_CONSTANT?.Approve?.value ? 'Are you sure you want to approve request?' : '',
                closable: true,
                icon: false,
                onCloseAction: rejectModalCloseAction,
                onSubmitAction: (values) => onFinish({ ...values, requestType: actionItem?.buttonAction }),
                submitText: actionItem?.modalButtonName,
                showField: actionItem?.buttonAction === REQUEST_CONSTANT?.Reject?.value ? true : false,
            });
    };

    const tableProps = {
        dynamicPagination,
        totalRecords,
        setPage,
        page,
        tableColumn: tableColumn({ handleButtonClick, typeData }),
        tableData: data,
        showAddButton: false,
        handleAdd: handleButtonClick,
        noMessge: LANGUAGE_EN.GENERAL.LIST_NO_DATA_FOUND.TITLE,
        invoiceStatusType,
        filterString,
    };

    const removeFilter = (key) => {
        if (key === 'searchParam') {
            const { searchType, searchParam, ...rest } = filterString;
            setFilterString({ ...rest });
        } else if (key === 'toDate') {
            const { fromDate, toDate, ...rest } = filterString;
            setFilterString({ ...rest });
            advanceFilterForm.resetFields();
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
        onFinishFailed,
        title: '',
        handleButtonQuery,
        data,
        typeData,
        invoiceStatusType,
        searchForm,
        handleSearchChange,
        handleResetFilter,
        isAdvanceSearchVisible,
        setAdvanceSearchVisible,
    };

    const advanceFilterProps = {
        isVisible: isAdvanceSearchVisible,

        icon: <FilterIcon size={20} />,
        titleOverride: 'Advance Filters',

        onCloseAction: onAdvanceSearchCloseAction,
        handleResetFilter,
        filterString,
        setFilterString,
        advanceFilterForm,
        setAdvanceSearchVisible,
        typeData,
    };

    const formProps = {
        form,
        isVisible: isFormVisible,
        styles,
        isDetailLoaded,
        onCloseAction,
        titleOverride: 'RSM Approval Summary',
        handleButtonClick,
        buttonData,
        setButtonData,
        detailData,
        // handleCancelRequest,
        invoiceStatusType,
        typeData,
        handleRequest,
        workFlowDetails: detailData?.workflowMasterDetails,
    };

    const requestModuleTitle = ' Delivery/Invoice Cancellation Request';

    const rejectModalCloseAction = () => {
        setConfirmRequest({
            ...confirmRequest,
            isVisible: false,
        });
        form.resetFields();
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
            {formActionType?.viewMode && <ViewDetail {...formProps} />}
            <ConfirmationModal {...confirmRequest} />
        </>
    );
};

const RsmAsmApprovalMaster = connect(mapStateToProps, mapDispatchToProps)(RsmAsmApprovalMasterBase);
export default RsmAsmApprovalMaster;
