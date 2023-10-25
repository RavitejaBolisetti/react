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
import { BASE_URL_DELIVERY_NOTE_INVOICE_CANCELLATION_SEARCH as customURL, BASE_URL_DELIVERY_NOTE_INVOICE_CANCELLATION } from 'constants/routingApi';

import { LANGUAGE_EN } from 'language/en';
import { PARAM_MASTER } from 'constants/paramMaster';
import { getCodeValue } from 'utils/getCodeValue';

import { deliveryNoteInvoiceCancellationDataAction } from 'store/actions/data/sales/deliveryNoteInvoiceCancellation';
import AddEditForm from './AddEditForm';
import { ConfirmationModal } from 'utils/ConfirmationModal';
import styles from 'assets/sass/app.module.scss';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },

            Sales: {
                DeliveryNoteInvoice: { isDetailLoaded = false, data, detailData: requestDetailData = [], filter: filterString },
            },
        },
    } = state;

    const moduleTitle = 'Invoice Cancellation';

    let returnValue = {
        userId,
        isDataLoaded: true,
        data: data?.paginationData,
        totalRecords: data?.totalRecords || [],
        moduleTitle,
        filterString,
        typeData,
        requestDetailData,
        isDetailLoaded,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: deliveryNoteInvoiceCancellationDataAction.fetchList,
            fetchDetail: deliveryNoteInvoiceCancellationDataAction.fetchDetail,
            listShowLoading: deliveryNoteInvoiceCancellationDataAction.listShowLoading,
            setFilterString: deliveryNoteInvoiceCancellationDataAction.setFilter,
            resetData: deliveryNoteInvoiceCancellationDataAction.reset,
            saveData: deliveryNoteInvoiceCancellationDataAction.saveData,
            showGlobalNotification,
        },
        dispatch
    ),
});

export const InvoiceCancellationMasterBase = (props) => {
    const { fetchList, saveData, listShowLoading, userId, data, totalRecords, showGlobalNotification } = props;
    const { typeData } = props;
    const { filterString, setFilterString, requestDetailData, isDetailLoaded, fetchDetail } = props;

    const [form] = Form.useForm();
    const [listFilterForm] = Form.useForm();
    const [searchForm] = Form.useForm();
    const [advanceFilterForm] = Form.useForm();

    const [showDataLoading, setShowDataLoading] = useState(true);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [confirmRequest, setConfirmRequest] = useState();

    const defaultBtnVisiblity = {
        closeBtn: true,
        cancelBtn: false,
        formBtnActive: true,
        cancelRequest: false,
    };

    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });

    const defaultFormActionType = { addMode: false, editMode: false, viewMode: true };
    const [formActionType, setFormActionType] = useState({ ...defaultFormActionType });

    const page = { pageSize: 10, current: 1 };

    const dynamicPagination = true;

    const [formData, setFormData] = useState([]);
    const [isAdvanceSearchVisible, setAdvanceSearchVisible] = useState(false);
    const [invoiceStatusType, setInvoiceStatusType] = useState(DELIVERY_NOTE_INVOICE_STATUS?.PENDING?.key);
    const [openAccordian, setOpenAccordian] = useState([]);

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
        setFilterString({ ...filterString, invoiceActionStatus: item?.key, current: 1 });
        setShowDataLoading(true);
    };

    const extraParams = useMemo(() => {
        return [
            {
                key: 'searchType',
                title: 'Type',
                value: filterString?.searchType,
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
                key: 'requestStatus',
                title: 'Status',
                value: filterString?.invoiceActionStatus || invoiceStatusType,
                name: undefined,
                canRemove: true,
                filter: false,
            },
            {
                key: 'requestStatus',
                title: 'Request Status',
                value: filterString?.requestStatus,
                name: filterString?.requestStatus && getCodeValue(typeData[PARAM_MASTER?.INV_DEL_NOT_REQ_TYP?.id], filterString?.requestStatus),
                canRemove: true,
                filter: true,
            },
            {
                key: 'requestType',
                title: 'Request Type',
                value: filterString?.requestType,
                name: filterString?.requestType && getCodeValue(typeData[PARAM_MASTER?.DEL_INV_CAN_TYP?.id], filterString?.requestType),
                canRemove: true,
                filter: true,
            },
            {
                key: 'pageSize',
                title: 'Value',
                value: filterString?.pageSize || page?.pageSize,
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
                value: filterString?.sortBy || page?.sortBy,
                canRemove: true,
            },
            {
                key: 'sortIn',
                title: 'Sort Type',
                value: filterString?.sortType || page?.sortType,
                canRemove: true,
            },
        ];
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString, page]);

    useEffect(() => {
        if (userId) {
            setShowDataLoading(true);
            fetchList({ setIsLoading: listShowLoading, userId, customURL, extraParams, onSuccessAction, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, filterString]);

    useEffect(() => {
        const extraParams = [
            {
                key: 'invoiceId',
                value: formData?.id,
            },
        ];
        if (userId && isFormVisible) {
            // setShowDataLoading(true);
            fetchDetail({ setIsLoading: listShowLoading, userId, extraParams, onSuccessAction, onErrorAction });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, isFormVisible]);

    useEffect(() => {
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

    const rejectModalCloseAction = () => {
        setConfirmRequest({
            ...confirmRequest,
            isVisible: false,
        });
        form.resetFields();
    };

    const handleCancelRequest = () => {
        setConfirmRequest({
            isVisible: true,
            titleOverride: 'Cancel Delivery/Invoice Cancellation Request',
            text: 'Are you sure you want to cancel request?',
            closable: true,
            icon: false,
            onCloseAction: rejectModalCloseAction,
            onSubmitAction: (values) => onFinish(values),
            submitText: 'Yes, Cancel',
            showField: false,
        });
    };

    const onFinish = (values) => {
        setConfirmRequest({ isVisible: false });
        const data = {
            id: formData?.id,
            action: DELIVERY_NOTE_INVOICE_STATUS?.REJECTED?.key,
            deliveryOrInvoiceId: formData?.invoiceId,
            requestType: formData?.requestType,
        };
        const onSuccess = (res) => {
            setShowDataLoading(true);
            showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
            fetchList({ setIsLoading: listShowLoading, userId, customURL, extraParams, onSuccessAction, onErrorAction });
            setButtonData({ ...buttonData, formBtnActive: false });
            setIsFormVisible(false);
        };

        const onError = (message) => {
            showGlobalNotification({ message });
        };

        const requestData = {
            customURL: BASE_URL_DELIVERY_NOTE_INVOICE_CANCELLATION,
            data: data,
            method: 'put',
            setIsLoading: listShowLoading,
            userId,
            onError,
            onSuccess,
        };

        saveData(requestData);
    };

    const handleResetFilter = (e) => {
        form.resetFields();
        advanceFilterForm.resetFields();
        advanceFilterForm.setFieldsValue();
        if (filterString) {
            const { invoiceActionStatus, ...rest } = filterString;
            if (rest?.invoiceActionStatus) {
                setShowDataLoading(true);
            }
            setFilterString({ invoiceActionStatus: invoiceActionStatus });
        }
    };

    const handleButtonClick = ({ record = null, buttonAction }) => {
        form.resetFields();
        setFormData([]);
        invoiceStatusType === DELIVERY_NOTE_INVOICE_STATUS?.PENDING?.key ? setButtonData({ ...defaultBtnVisiblity, cancelRequest: true }) : setButtonData({ ...defaultBtnVisiblity });
        // record?.requestStatus === REQUEST_STATUS_CONSTANT?.OPEN?.key &&
        setFormActionType({ viewMode: buttonAction === VIEW_ACTION });
        record && setFormData(record);
        setIsFormVisible(true);
    };

    const handleSearchChange = (value) => {
        const searchValue = value.trim();
        if (!searchValue) {
            return;
        }
        setFilterString({ ...filterString, advanceFilter: true, searchType: 'requestNumber', searchParam: `${searchValue}` });
    };

    const onFinishFailed = (errorInfo) => {
        return;
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
        setPage: setFilterString,
        page: filterString,
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

    const handleCollapse = (key) => {
        setOpenAccordian((prev) => (prev === key ? '' : key));
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

    const formProps = {
        form,
        isVisible: isFormVisible,
        styles,
        isDetailLoaded,
        requestDetailData,
        onCloseAction,
        titleOverride: 'Delivery Note/Invoice Cancellation Details',
        handleButtonClick,
        buttonData,
        setButtonData,
        formData,
        handleCancelRequest,
        handleCollapse,
        openAccordian,
        setOpenAccordian,
        invoiceStatusType,
        typeData,
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
            {formActionType?.viewMode && <AddEditForm {...formProps} />}
            <ConfirmationModal {...confirmRequest} />
        </>
    );
};

const InvoiceCancellationMaster = connect(mapStateToProps, mapDispatchToProps)(InvoiceCancellationMasterBase);
export default InvoiceCancellationMaster;
