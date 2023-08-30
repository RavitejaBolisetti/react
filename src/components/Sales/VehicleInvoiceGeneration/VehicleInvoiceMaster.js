/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Col, Form, Row } from 'antd';
import { tableColumn } from './tableColumn';
import VehicleInvoiceFilter from './VehicleInvoiceFilter';
import { ADD_ACTION, EDIT_ACTION, VIEW_ACTION, NEXT_ACTION, btnVisiblity } from 'utils/btnVisiblity';

import { VehicleInvoiceMainConatiner } from './VehicleInvoiceMainConatiner';
import { ListDataTable } from 'utils/ListDataTable';
import { AdvancedSearch } from './AdvancedSearch';
import { CancelReceipt } from './CancelReceipt';
import { QUERY_BUTTONS_CONSTANTS } from './QueryButtons';
import { vehicleInvoiceDataActions } from 'store/actions/data/invoiceGeneration/vehicleInvoiceGeneration';
import { showGlobalNotification } from 'store/actions/notification';
import { PARAM_MASTER } from 'constants/paramMaster';
import { convertDateTime, monthDateFormat } from 'utils/formatDateTime';

import { FilterIcon } from 'Icons';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            VehicleInvoiceGeneration: {
                VehicleInvoiceSearchList: { isLoaded: isSearchDataLoaded = false, isLoading: isSearchLoading, data, filter: filterString },
            },
        },
    } = state;
    const moduleTitle = 'Invoice Generation';
    let returnValue = {
        userId,
        typeData,
        data: data?.paginationData,
        totalRecords: data?.totalRecords || [],
        invoiceStatusList: Object.values(QUERY_BUTTONS_CONSTANTS),
        moduleTitle,
        isSearchLoading,
        isSearchDataLoaded,
        filterString,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: vehicleInvoiceDataActions.fetchList,
            listShowLoading: vehicleInvoiceDataActions.listShowLoading,
            setFilterString: vehicleInvoiceDataActions.setFilter,
            showGlobalNotification,
        },
        dispatch
    ),
});

export const VehicleInvoiceMasterBase = (props) => {
    const { data, receiptDetailData, userId, fetchList, listShowLoading, showGlobalNotification } = props;
    const { typeData, receiptType, partySegmentType, paymentModeType, documentType, moduleTitle, totalRecords } = props;
    const { filterString, setFilterString, invoiceStatusList } = props;
    const [isAdvanceSearchVisible, setAdvanceSearchVisible] = useState(false);
    const [invoiceStatus, setInvoiceStatus] = useState(QUERY_BUTTONS_CONSTANTS.INVOICED.key);
    const [requestPayload, setRequestPayload] = useState({ partyDetails: {}, receiptsDetails: {}, apportionDetails: {} });

    console.log('filterString', filterString);

    const [listFilterForm] = Form.useForm();
    const [cancelReceiptForm] = Form.useForm();

    const [searchValue, setSearchValue] = useState();

    const [selectedOrder, setSelectedOrder] = useState();
    const [selectedOrderId, setSelectedOrderId] = useState();

    const [section, setSection] = useState();
    const [defaultSection, setDefaultSection] = useState();
    const [currentSection, setCurrentSection] = useState();
    const [sectionName, setSetionName] = useState();
    const [isLastSection, setLastSection] = useState(false);
    const [receipt, setReceipt] = useState('');
    const [totalReceivedAmount, setTotalReceivedAmount] = useState(0.0);

    const [apportionList, setApportionList] = useState([]);

    const [form] = Form.useForm();
    const [searchForm] = Form.useForm();
    const [advanceFilterForm] = Form.useForm();
    const [partyDetailForm] = Form.useForm();

    const [showDataLoading, setShowDataLoading] = useState(true);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [cancelReceiptVisible, setCancelReceiptVisible] = useState(false);

    const [page, setPage] = useState({ pageSize: 10, current: 1 });
    const dynamicPagination = true;

    const defaultBtnVisiblity = {
        editBtn: false,
        saveBtn: false,
        saveAndNewBtn: false,
        saveAndNewBtnClicked: false,
        closeBtn: false,
        cancelBtn: false,
        formBtnActive: false,
        deliveryNote: false,
        nextBtn: false,
        cancelReceiptBtn: false,
    };

    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });

    const defaultFormActionType = { addMode: false, editMode: false, viewMode: false };
    const [formActionType, setFormActionType] = useState({ ...defaultFormActionType });

    const [formData, setFormData] = useState([]);

    const onSuccessAction = (res) => {
        showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
        searchForm.setFieldsValue({ searchType: undefined, searchParam: undefined });
        searchForm.resetFields();
        setShowDataLoading(false);
    };

    const onErrorAction = (message) => {
        showGlobalNotification({ message });
        setShowDataLoading(false);
    };

    const extraParams = useMemo(() => {
        return [
            {
                key: 'searchType',
                title: 'Type',
                value: filterString?.searchType,
                name: typeData?.[PARAM_MASTER.INV_SER.id]?.find((i) => i?.key === filterString?.searchType)?.value,
                canRemove: false,
                filter: true,
            },
            {
                key: 'searchParam',
                title: 'Value',
                value: filterString?.searchParam,
                name: filterString?.searchParam,
                canRemove: true,
                filter: true,
            },
            {
                key: 'fromDate',
                title: 'Start Date',
                value: filterString?.fromDate,
                name: filterString?.fromDate ? convertDateTime(filterString?.fromDate, monthDateFormat) : '',
                canRemove: true,
                filter: true,
            },
            {
                key: 'toDate',
                title: 'End Date',
                value: filterString?.toDate,
                name: filterString?.toDate ? convertDateTime(filterString?.toDate, monthDateFormat) : '',
                canRemove: true,
                filter: true,
            },
            {
                key: 'digitalSignature',
                title: 'Digital Signature',
                value: filterString?.digitalSignature,
                name: typeData?.[PARAM_MASTER.YES_NO_FLG.id]?.find((i) => i?.key === filterString?.digitalSignature)?.value,
                canRemove: true,
                filter: true,
            },
            {
                key: 'invoiceStatus',
                title: 'Invoice Status',
                value: invoiceStatus,
                canRemove: false,
                filter: false,
            },
            {
                key: 'pageNumber',
                title: 'Value',
                value: page?.current,
                canRemove: true,
                filter: false,
            },
            {
                key: 'pageSize',
                title: 'Value',
                value: page?.pageSize,
                canRemove: true,
                filter: false,
            },
            {
                key: 'sortBy',
                title: 'Sort By',
                value: page?.sortBy,
                canRemove: true,
                filter: false,
            },
            {
                key: 'sortIn',
                title: 'Sort Type',
                value: page?.sortType,
                canRemove: true,
                filter: false,
            },
        ];
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchValue, filterString, page]);

    // useEffect(() => {
    //     return () => {
    //         resetData();
    //         setFilterString();
    //     };
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    useEffect(() => {
        if (userId) {
            setShowDataLoading(true);
            fetchList({ setIsLoading: listShowLoading, userId, extraParams, onSuccessAction, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, filterString, page]);

    // useEffect(() => {
    //     if (userId && selectedOrderId) {
    //         const extraParams = [
    //             {
    //                 key: 'id',
    //                 title: 'id',
    //                 value: selectedOrderId,
    //                 name: 'id',
    //             },
    //         ];
    //         fetchReceiptDetails({ setIsLoading: listShowLoading, userId, extraParams });
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [userId, selectedOrderId]);

    // useEffect(() => {
    //     const defaultSection = RECEIPT_SECTION.PARTY_DETAILS.id;
    //     setDefaultSection(defaultSection);
    //     setSetionName(RECEIPT_SECTION);
    //     setSection(defaultSection);
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    useEffect(() => {
        if (currentSection && sectionName) {
            const section = Object.values(sectionName)?.find((i) => i.id === currentSection);
            setSection(section);

            const nextSection = Object.values(sectionName)?.find((i) => i?.displayOnList && i.id > currentSection);
            setLastSection(!nextSection?.id);
        }
        form.resetFields();
        form.setFieldsValue(undefined);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentSection, sectionName]);

    const handleInvoiceTypeChange = (buttonName) => {
        setInvoiceStatus(buttonName?.key);
        searchForm.resetFields();
    };

    const handleChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleSearch = (value) => {
        setFilterString({ ...filterString, searchParam: value });
        setSearchValue(value);
    };

    const handleButtonClick = ({ record = null, buttonAction, openDefaultSection = true }) => {
        form.resetFields();
        form.setFieldsValue(undefined);
        switch (buttonAction) {
            case ADD_ACTION:
                defaultSection && setCurrentSection(defaultSection);
                partyDetailForm.resetFields();
                setApportionList([]);
                break;
            case EDIT_ACTION:
                setSelectedOrder(record);
                record && setSelectedOrderId(record?.id);
                openDefaultSection && setCurrentSection(defaultSection);

                break;
            case VIEW_ACTION:
                setSelectedOrder(record);
                record && setSelectedOrderId(record?.id);
                defaultSection && setCurrentSection(defaultSection);

                break;
            case NEXT_ACTION:
                const nextSection = Object.values(sectionName)?.find((i) => i.id > currentSection);
                section && setCurrentSection(nextSection?.id);
                setLastSection(!nextSection?.id);
                break;

            default:
                break;
        }

        if (buttonAction !== NEXT_ACTION) {
            setFormActionType({
                addMode: buttonAction === ADD_ACTION,
                editMode: buttonAction === EDIT_ACTION,
                viewMode: buttonAction === VIEW_ACTION,
            });
            if (buttonAction === EDIT_ACTION) {
                setButtonData({ ...buttonData, nextBtn: true, editBtn: false, saveBtn: true });
            } else {
                const Visibility = btnVisiblity({ defaultBtnVisiblity, buttonAction });
                setButtonData(Visibility);
                setButtonData({ ...Visibility, cancelReceiptBtn: true });
                if (buttonAction === VIEW_ACTION) {
                    invoiceStatus === QUERY_BUTTONS_CONSTANTS.CANCELLED.key ? setButtonData({ ...Visibility, editBtn: false, cancelReceiptBtn: false }) : invoiceStatus === QUERY_BUTTONS_CONSTANTS.CANCELLATION_REQUEST.key ? setButtonData({ ...Visibility, editBtn: false, cancelReceiptBtn: true }) : setButtonData({ ...Visibility, editBtn: true, cancelReceiptBtn: true });
                }
            }
        }
        setIsFormVisible(true);
    };

    const onFinishSearch = (values) => {};

    const handleResetFilter = (e) => {
        setShowDataLoading(false);
        setFilterString();
        advanceFilterForm.resetFields();
    };

    const onFinish = (receiptData) => {
        // const data = { ...requestPayload, apportionDetails: apportionList, receiptsDetails: receiptData.hasOwnProperty('receiptType') ? receiptData : requestPayload?.receiptsDetails };
        // const onSuccess = (res) => {
        //     form.resetFields();
        //     setShowDataLoading(true);
        //     showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage + 'Receipt No.:' + res?.data?.receiptsDetails?.receiptNumber });
        //     fetchList({ setIsLoading: listShowLoading, userId, onSuccessAction, extraParams });
        //     setButtonData({ ...buttonData, formBtnActive: false });
        //     setIsFormVisible(false);
        // };
        // const onError = (message) => {
        //     showGlobalNotification({ message });
        // };
        // const requestData = {
        //     data: data,
        //     method: 'post',
        //     setIsLoading: listShowLoading,
        //     userId,
        //     onError,
        //     onSuccess,
        // };
        // saveData(requestData);
    };

    const onFinishFailed = (errorInfo) => {
        return;
    };

    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const onCloseAction = () => {
        // resetData();
        form.resetFields();
        form.setFieldsValue();
        setSelectedOrderId();
        partyDetailForm.resetFields();
        setReceipt();
        setTotalReceivedAmount(0.0);

        advanceFilterForm.resetFields();
        advanceFilterForm.setFieldsValue();
        setAdvanceSearchVisible(false);

        setApportionList([]);
        setSelectedOrder();
        setIsFormVisible(false);
        setCancelReceiptVisible(false);
        setButtonData({ ...defaultBtnVisiblity });
    };

    const tableProps = {
        dynamicPagination,
        totalRecords,
        setPage,
        tableColumn: tableColumn(handleButtonClick),
        tableData: data,
        showAddButton: false,
        typeData,
    };

    const onAdvanceSearchCloseAction = () => {
        form.resetFields();
        advanceFilterForm.resetFields();
        advanceFilterForm.setFieldsValue();
        setAdvanceSearchVisible(false);
    };

    const onCancelCloseAction = () => {
        setCancelReceiptVisible(false);
        cancelReceiptForm.resetFields();
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

    const onCancelReceipt = () => {
        setCancelReceiptVisible(true);
    };

    const handleCloseReceipt = () => {
        setCancelReceiptVisible(false);
        cancelReceiptForm.resetFields();
    };

    const handleCancelReceipt = () => {
        // const recordId = selectedOrderId;
        // const cancelRemark = cancelReceiptForm.getFieldValue().cancelRemarks;
        // const data = { id: recordId ?? '', receiptNumber: receiptDetailData?.receiptsDetails?.receiptNumber, cancelRemarks: cancelRemark };
        // const onSuccess = (res) => {
        //     setShowDataLoading(true);
        //     showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
        //     fetchList({ setIsLoading: listShowLoading, userId, onSuccessAction, extraParams });
        //     setButtonData({ ...buttonData, formBtnActive: false });
        //     setIsFormVisible(false);
        //     setCancelReceiptVisible(false);
        // };
        // const onError = (message) => {
        //     showGlobalNotification({ message });
        // };
        // const requestData = {
        //     data: data,
        //     method: 'put',
        //     setIsLoading: listShowLoading,
        //     userId,
        //     onError,
        //     onSuccess,
        // };
        // cancelReceipt(requestData);
    };

    const title = 'Invoice Generation';

    const advanceFilterResultProps = {
        extraParams,
        removeFilter,
        invoiceStatus,
        invoiceStatusList,
        advanceFilter: true,
        otfFilter: true,
        filterString,
        setFilterString,
        from: listFilterForm,
        onFinish,
        onFinishFailed,
        handleResetFilter,
        advanceFilterForm,
        handleButtonClick,
        handleChange,
        handleSearch,
        handleInvoiceTypeChange,

        title,
        data,
        setAdvanceSearchVisible,
        typeData,
        searchForm,
        onFinishSearch,
    };

    const advanceFilterProps = {
        isVisible: isAdvanceSearchVisible,
        receiptType,
        partySegmentType,

        icon: <FilterIcon size={20} />,
        titleOverride: 'Advance Filters',

        onCloseAction: onAdvanceSearchCloseAction,
        handleResetFilter,
        filterString,
        setFilterString,
        advanceFilterForm,
        setAdvanceSearchVisible,
        invoiceStatusList,
        typeData,
        onFinishSearch,
    };

    const drawerTitle = useMemo(() => {
        if (formActionType?.viewMode) {
            return 'View ';
        } else if (formActionType?.editMode) {
            return 'Edit ';
        } else {
            return 'Add New ';
        }
    }, [formActionType]);

    const containerProps = {
        record: selectedOrder,
        form,
        partyDetailForm,
        formActionType,
        setFormActionType,
        receiptOnFinish: onFinish,
        onFinishFailed,
        isVisible: isFormVisible,
        onCloseAction,
        titleOverride: drawerTitle.concat(moduleTitle),
        tableData: data,
        ADD_ACTION,
        EDIT_ACTION,
        VIEW_ACTION,
        NEXT_ACTION,
        buttonData,
        receiptDetailData,
        apportionList,
        setApportionList,
        requestPayload,
        setRequestPayload,
        receipt,
        setReceipt,
        invoiceStatus,
        totalReceivedAmount,
        setTotalReceivedAmount,

        setButtonData,
        handleButtonClick,
        defaultFormActionType,
        defaultBtnVisiblity,
        selectedOrderId,
        setSelectedOrderId,
        selectedOrder,
        setSelectedOrder,
        section,
        currentSection,
        sectionName,
        setCurrentSection,
        setFormData,
        handleFormValueChange,
        isLastSection,
        typeData,
        receiptType,
        partySegmentType,
        paymentModeType,
        documentType,
        onCancelReceipt,
        saveButtonName: isLastSection ? 'Submit' : 'Save & Next',
        setLastSection,
    };

    const cancelReceiptProps = {
        isVisible: cancelReceiptVisible,
        titleOverride: 'Receipt Cancellation',
        handleCloseReceipt,
        handleCancelReceipt,
        cancelReceiptForm,
        onCloseAction: onCancelCloseAction,
    };

    return (
        <>
            <VehicleInvoiceFilter {...advanceFilterResultProps} />
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <ListDataTable
                        // handleButtonClick={handleButtonClick}
                        // isLoading={showDataLoading}
                        {...tableProps}
                        showAddButton={false}
                    />
                </Col>
            </Row>
            <AdvancedSearch {...advanceFilterProps} />
            <VehicleInvoiceMainConatiner {...containerProps} />
            <CancelReceipt {...cancelReceiptProps} />
        </>
    );
};

export const VehicleInvoiceMaster = connect(mapStateToProps, mapDispatchToProps)(VehicleInvoiceMasterBase);
