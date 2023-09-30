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
// import VehicleInvoiceFilter from './VehicleInvoiceFilter';
import { ADD_ACTION, EDIT_ACTION, VIEW_ACTION, NEXT_ACTION, btnVisiblity } from 'utils/btnVisiblity';

// import { VehicleInvoiceMainConatiner } from './VehicleInvoiceMainConatiner';
import { ListDataTable } from 'utils/ListDataTable';
import { AdvancedSearch } from './AdvancedSearch';
// import { CancelInvoice } from './CancelInvoice';
// import { VEHICLE_INVOICE_SECTION } from 'constants/VehicleInvoiceSection';
import { QUERY_BUTTONS_CONSTANTS } from 'components/Sales/CommonScheme/QueryButtons';
import { BASE_URL_VEHICLE_INVOICE_GENERATION_PROFILE_CARD as customURL, BASE_URL_INVOICE_DETAIL as InvoiceDetailsURL } from 'constants/routingApi';
import { otfDataActions } from 'store/actions/data/otf/otf';

import { vehicleInvoiceDataActions } from 'store/actions/data/invoiceGeneration/vehicleInvoiceGeneration';
import { vehicleIrnGenerationDataActions } from 'store/actions/data/invoiceGeneration/irnGeneration';

import { vehicleInvoiceGenerationDataActions } from 'store/actions/data/invoiceGeneration/vehicleInvoice';

import { vehicleInvoiceDetailDataActions } from 'store/actions/data/invoiceGeneration/vehicleInvoiceDetail';
import { showGlobalNotification } from 'store/actions/notification';
import { PARAM_MASTER } from 'constants/paramMaster';
import { convertDateTime, dateFormatView } from 'utils/formatDateTime';

import { FilterIcon } from 'Icons';
// import { validateOTFMenu } from './LeftSidebar/MenuNav';
import { EMBEDDED_REPORTS } from 'constants/EmbeddedReports';
import { ReportModal } from 'components/common/ReportModal/ReportModal';
import { OTF_STATUS } from 'constants/OTFStatus';
import { salesConsultantActions } from 'store/actions/data/otf/salesConsultant';
import RegistrationFilter from './RegistrationFilter';
import { AMCRegistrationMainContainer } from './AMCRegistrationMainContainer';
import { AMC_REGISTRATION_SECTION } from 'constants/AMCRegistrationSection';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            VehicleInvoiceGeneration: {
                VehicleInvoiceSearchList: { isLoaded: isSearchDataLoaded = false, isLoading: isSearchLoading, data, filter: filterString, detailData: vehicleInvoiceMasterData = [], isDetailLoaded: isInVoiceMasterDetailDataLoaded },
                VehicleIrnGeneration: { isLoaded: isIrnDataLoaded = false, isLoading: isIrnDataLoading, data: irnData = [] },
                VehicleInvoiceDetail: { isLoaded: isVehicleInvoiceDataLoaded = false, isLoading: isVehicleInvoiceDataLoading, data: vehicleInvoiceData = [] },
                VehicleDetails: { isLoaded: isVehicleDataLoaded = false, isLoading: isVehicleDataLoading, data: vehicleDetail = [] },
                VehicleInvoice: { isLoaded: isInvoiceDataLoaded = false, isLoading: isInvoiceDataLoading, data: invoiceData = [] },
            },
            OTF: {
                OtfSearchList: { isDetailLoaded: isDataLoaded, detailData: otfData = [] },
                salesConsultantLov: { isLoaded: isSalesConsultantDataLoaded, data: salesConsultantLovData = [] },
            },
        },
    } = state;

    const moduleTitle = 'AMC Registration';
    let returnValue = {
        userId,
        typeData,
        data: data?.paginationData,
        totalRecords: data?.totalRecords || [],
        invoiceStatusList: Object.values(QUERY_BUTTONS_CONSTANTS),
        moduleTitle,
        isSearchLoading,
        isSearchDataLoaded,
        isInvoiceDataLoaded,
        isInvoiceDataLoading,
        invoiceData,
        isDataLoaded,
        otfData,
        filterString,
        isIrnDataLoaded,
        isIrnDataLoading,
        isVehicleInvoiceDataLoaded,
        isVehicleInvoiceDataLoading,
        isVehicleDataLoaded,
        isVehicleDataLoading,
        irnData,
        vehicleInvoiceData,
        vehicleDetail,
        vehicleInvoiceMasterData,
        isInVoiceMasterDetailDataLoaded,
        isSalesConsultantDataLoaded,
        salesConsultantLovData,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchOTFDetail: otfDataActions.fetchDetail,
            resetOtfData: otfDataActions.reset,
            saveData: vehicleInvoiceGenerationDataActions.saveData,
            cancelInvoice: vehicleInvoiceGenerationDataActions.saveData,
            listShowLoading: otfDataActions.listShowLoading,
            // saveData: vehicleInvoiceDetailDataActions.saveData,
            listInvoiceShowLoading: vehicleInvoiceDetailDataActions.listShowLoading,

            irnGeneration: vehicleIrnGenerationDataActions.saveData,
            listIrnShowLoading: vehicleIrnGenerationDataActions.listShowLoading,

            // fetchVehicleDetail: vehicleInvoiceDetailDataActions.fetchList,
            // fetchVehicleInvoiceDetail: vehicleDetailsDataActions.fetchList,
            fetchSalesConsultant: salesConsultantActions.fetchList,
            listConsultantShowLoading: salesConsultantActions.listShowLoading,

            fetchList: vehicleInvoiceDataActions.fetchList,
            fetchInvoiceMasterData: vehicleInvoiceDataActions.fetchDetail,
            resetDetailData: vehicleInvoiceDataActions.resetDetail,
            listInvoiceDetailShowLoading: vehicleInvoiceDataActions.listInvoiceDetailShowLoading,
            setFilterString: vehicleInvoiceDataActions.setFilter,
            showGlobalNotification,
        },
        dispatch
    ),
});

export const AMCRegistrationMasterBase = (props) => {
    const { data, receiptDetailData, userId, irnGeneration, fetchList, listShowLoading, showGlobalNotification, fetchInvoiceMasterData } = props;
    const { cancelInvoice, isVehicleInvoiceDataLoading } = props;
    const { typeData, receiptType, partySegmentType, listInvoiceShowLoading, saveData, paymentModeType, documentType, moduleTitle, totalRecords } = props;
    const { filterString, setFilterString, invoiceStatusList, otfData, vehicleInvoiceMasterData, resetDetailData, resetOtfData } = props;
    const { isInVoiceMasterDetailDataLoaded, fetchOTFDetail, isDataLoaded } = props;
    const { isSalesConsultantDataLoaded, fetchSalesConsultant, salesConsultantLovData, listConsultantShowLoading } = props;

    const [isAdvanceSearchVisible, setAdvanceSearchVisible] = useState(false);
    const [invoiceStatus, setInvoiceStatus] = useState(QUERY_BUTTONS_CONSTANTS.PENDING.key);
    const [requestPayload, setRequestPayload] = useState({});

    const [listFilterForm] = Form.useForm();
    const [cancelInvoiceForm] = Form.useForm();
    const [CustomerForm] = Form.useForm();

    const [searchValue, setSearchValue] = useState();

    const [selectedOrder, setSelectedOrder] = useState('');
    const [selectedOrderId, setSelectedOrderId] = useState('');
    const [selectedOtfNumber, setSelectedOtfNumber] = useState();

    const [section, setSection] = useState();
    const [defaultSection, setDefaultSection] = useState();
    const [currentSection, setCurrentSection] = useState();
    const [sectionName, setSetionName] = useState();
    const [isLastSection, setLastSection] = useState(false);
    const [receipt, setReceipt] = useState('');
    const [reportType, setReportType] = useState();
    const [reportDetail, setReportDetail] = useState();

    const [form] = Form.useForm();
    const [searchForm] = Form.useForm();
    const [advanceFilterForm] = Form.useForm();
    const [invoiceDetailForm] = Form.useForm();

    const [showDataLoading, setShowDataLoading] = useState(true);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [cancelInvoiceVisible, setCancelInvoiceVisible] = useState(false);
    const [additionalReportParams, setAdditionalReportParams] = useState();
    const [isReportVisible, setReportVisible] = useState();
    const [confirmRequest, setConfirmRequest] = useState(false);
    const [previousSection, setpreviousSection] = useState(1);

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
        cancelInvoiceBtn: false,
        approveCancelBtn: false,
        rejectCancelBtn: false,
        printInvoiceBtn: false,
        printForm21Btn: false,
    };
    const DefaultPayload = {
        invoiceDetails: {},
        vehicleDetails: {},
        financeDetails: {},
        insuranceDetails: {},
        schemeOfferDetails: {},
        exchangeDetails: {},
        loyaltyScheme: {},
        referrals: {},
    };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });

    const defaultFormActionType = { addMode: false, editMode: false, viewMode: false };
    const [formActionType, setFormActionType] = useState({ ...defaultFormActionType });

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
                name: filterString?.fromDate ? convertDateTime(filterString?.fromDate, dateFormatView) : '',
                canRemove: true,
                filter: true,
            },
            {
                key: 'toDate',
                title: 'End Date',
                value: filterString?.toDate,
                name: filterString?.toDate ? convertDateTime(filterString?.toDate, dateFormatView) : '',
                canRemove: true,
                filter: true,
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
                key: 'invoiceStatus',
                title: 'Invoice Status',
                value: invoiceStatus,
                canRemove: false,
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
    }, [searchValue, invoiceStatus, filterString, page]);

    useEffect(() => {
        if (userId) {
            setShowDataLoading(true);
            fetchList({ setIsLoading: listShowLoading, userId, extraParams, onSuccessAction, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, invoiceStatus, filterString, page]);

    useEffect(() => {
        if (!isSalesConsultantDataLoaded && userId) {
            fetchSalesConsultant({ setIsLoading: listConsultantShowLoading, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSalesConsultantDataLoaded, userId]);

    // useEffect(() => {
    //     if (otfData && formActionType?.viewMode) {
    //         console.log('otfData', otfData);
    //         setSelectedOrder({ ...otfData, ...vehicleInvoiceMasterData?.invoiceDetails?.otfDetailsRequest, ...vehicleInvoiceMasterData?.invoiceDetails?.bookingAndBillingCustomerDto?.billingCustomer, ...vehicleInvoiceMasterData?.invoiceDetails?.bookingAndBillingCustomerDto?.bookingCustomer });
    //     } else if (vehicleInvoiceMasterData?.invoiceDetails?.otfDetailsRequest?.orderStatus === OTF_STATUS?.ALLOTED?.key && formActionType?.addMode) {
    //         setSelectedOrder({ ...vehicleInvoiceMasterData?.invoiceDetails?.otfDetailsRequest, ...vehicleInvoiceMasterData?.invoiceDetails?.bookingAndBillingCustomerDto?.billingCustomer, ...vehicleInvoiceMasterData?.invoiceDetails?.bookingAndBillingCustomerDto?.bookingCustomer });
    //     } else {
    //         setSelectedOrder('');
    //     }

    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [otfData, formActionType, isInVoiceMasterDetailDataLoaded]);

    useEffect(() => {
        if (otfData && formActionType?.viewMode && isDataLoaded && vehicleInvoiceMasterData) {
            setSelectedOrder({ ...vehicleInvoiceMasterData?.invoiceDetails?.otfDetailsRequest, ...vehicleInvoiceMasterData?.invoiceDetails?.bookingAndBillingCustomerDto?.billingCustomer, ...vehicleInvoiceMasterData?.invoiceDetails?.bookingAndBillingCustomerDto?.bookingCustomer, ...otfData });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [otfData, formActionType, isDataLoaded, vehicleInvoiceMasterData]);

    useEffect(() => {
        if (!isInVoiceMasterDetailDataLoaded) {
            setRequestPayload({ ...DefaultPayload });
        }
        if ((Object?.keys(vehicleInvoiceMasterData)?.length && isInVoiceMasterDetailDataLoaded && vehicleInvoiceMasterData?.invoiceDetails?.otfDetailsRequest?.orderStatus === OTF_STATUS?.ALLOTED?.key) || formActionType?.viewMode) {
            setRequestPayload({ ...vehicleInvoiceMasterData });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [vehicleInvoiceMasterData, isInVoiceMasterDetailDataLoaded]);

    useEffect(() => {
        if (selectedOrderId && !formActionType?.addMode) {
            const extraParams = [
                {
                    key: 'otfNumber',
                    title: 'otfNumber',
                    value: selectedOtfNumber,
                    name: 'Booking Number',
                },
                {
                    key: 'invoiceNumber',
                    value: selectedOrderId || '',
                    name: 'Invoice Number',
                },
            ];

            fetchOTFDetail({ customURL, setIsLoading: listShowLoading, userId, extraParams: extraParams, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedOrderId, selectedOtfNumber, formActionType]);

    useEffect(() => {
        const defaultSection = AMC_REGISTRATION_SECTION.AMC_REGISTRATION_DETAILS.id;
        setDefaultSection(defaultSection);
        setSetionName(AMC_REGISTRATION_SECTION);
        setSection(defaultSection);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const filterActiveMenu = (items) => {
        return items;
    };

    const filterActiveSection = sectionName && filterActiveMenu(Object.values(sectionName));

    useEffect(() => {
        if (currentSection && sectionName) {
            const section = Object.values(sectionName)?.find((i) => i.id === currentSection);
            setSection(section);

            const nextSection = filterActiveSection?.find((i) => i?.displayOnList && i.id > currentSection);
            setLastSection(!nextSection?.id);
        }
        form.resetFields();
        form.setFieldsValue(undefined);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentSection, sectionName]);

    const handleBookingNumberSearch = (otfNumber = '', selectedOrderId = '') => {
        if (otfNumber || selectedOrderId) {
            const extraParams = [
                {
                    key: 'otfNumber',
                    title: 'otfNumber',
                    value: otfNumber,
                    name: 'Booking Number',
                },
                {
                    key: 'invoiceNumber',
                    value: selectedOrderId || '',
                    name: 'Invoice Number',
                },
            ];

            const onSuccessAction = (res) => {
                if (!selectedOrderId && res?.data?.invoiceDetails?.otfDetailsRequest?.orderStatus === OTF_STATUS?.INVOICED?.key) {
                    setSelectedOtfNumber('');
                    invoiceDetailForm.setFieldValue();
                    setSelectedOrder('');
                    resetDetailData();
                    setButtonData((prev) => ({ ...prev, formBtnActive: false }));
                    showGlobalNotification({ notificationType: 'error', title: 'Error', message: 'OTF number is already invoiced' });
                    return;
                } else if (!selectedOrderId && res?.data?.invoiceDetails?.otfDetailsRequest?.orderStatus !== OTF_STATUS?.ALLOTED?.key) {
                    handleBookingChange();
                    showGlobalNotification({ notificationType: 'error', title: 'Error', message: 'Only alloted OTF can be invoice' });
                    return;
                } else {
                    setButtonData((prev) => ({ ...prev, formBtnActive: true }));
                    setSelectedOtfNumber(otfNumber);
                    setSelectedOrder({ ...otfData, ...res?.data?.invoiceDetails?.otfDetailsRequest, ...res?.data?.invoiceDetails?.bookingAndBillingCustomerDto?.billingCustomer, ...res?.data?.invoiceDetails?.bookingAndBillingCustomerDto?.bookingCustomer });
                }
            };

            fetchInvoiceMasterData({ customURL: InvoiceDetailsURL, setIsLoading: listInvoiceShowLoading, userId, extraParams, onSuccessAction, onErrorAction });
        }
    };

    const handleBookingChange = () => {
        setSelectedOtfNumber('');
        invoiceDetailForm.setFieldValue();
        setSelectedOrder('');
        resetDetailData();
        setButtonData((prev) => ({ ...prev, formBtnActive: false }));
    };

    const handleIRNGeneration = () => {
        const data = { otfNumber: selectedOtfNumber, invoiceNumber: selectedOrder?.invoiceNumber };
        const onSuccess = (res) => {
            setShowDataLoading(true);
            setConfirmRequest(false);
            resetOtfData();
            showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
            fetchList({ setIsLoading: listShowLoading, userId, onSuccessAction, extraParams });
            const extraParam = [
                {
                    key: 'otfNumber',
                    title: 'otfNumber',
                    value: selectedOtfNumber,
                    name: 'Booking Number',
                },
                {
                    key: 'invoiceNumber',
                    value: selectedOrderId,
                    name: 'Invoice Number',
                },
            ];

            fetchOTFDetail({ customURL, setIsLoading: listShowLoading, userId, extraParams: extraParam, onErrorAction });
        };
        const onError = (message) => {
            showGlobalNotification({ message });
        };
        const requestData = {
            data: data,
            method: 'post',
            setIsLoading: listShowLoading,
            userId,
            onError,
            onSuccess,
        };
        irnGeneration(requestData);
    };

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

        if (isLastSection) {
            generateInvoice();
            return false;
        }

        switch (buttonAction) {
            case ADD_ACTION:
                defaultSection && setCurrentSection(defaultSection);
                resetOtfData();
                invoiceDetailForm.resetFields();
                setpreviousSection(1);
                setSelectedOrderId('');
                setSelectedOtfNumber('');
                break;
            case EDIT_ACTION:
                record && setSelectedOrderId(record?.invoiceNumber);
                record && setSelectedOtfNumber(record?.otfNumber);
                openDefaultSection && setCurrentSection(defaultSection);
                handleBookingNumberSearch(record?.otfNumber, record?.invoiceNumber);
                break;
            case VIEW_ACTION:
                record && setSelectedOrderId(record?.invoiceNumber);
                record && setSelectedOtfNumber(record?.otfNumber);
                defaultSection && setCurrentSection(defaultSection);
                handleBookingNumberSearch(record?.otfNumber, record?.invoiceNumber);
                break;
            case NEXT_ACTION:
                const nextSection = filterActiveSection?.find((i) => i?.displayOnList && i.id > currentSection);
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
                // setButtonData({ ...Visibility, cancelReceiptBtn: true });
                if (buttonAction === VIEW_ACTION) {
                    invoiceStatus === QUERY_BUTTONS_CONSTANTS.PENDING.key ? setButtonData({ ...Visibility, printForm21Btn: true, printInvoiceBtn: true, cancelInvoiceBtn: true, approveCancelBtn: false, rejectCancelBtn: false }) : invoiceStatus === QUERY_BUTTONS_CONSTANTS.CANCELLATION_REQUEST.key ? setButtonData({ ...Visibility, cancelInvoiceBtn: false, approveCancelBtn: true, rejectCancelBtn: true }) : setButtonData({ ...Visibility, cancelInvoiceBtn: false, approveCancelBtn: false, rejectCancelBtn: false });
                    // (!otfData?.irnStatus || otfData?.irnStatus && timeStampCheck(otfData?.irnDate, otfData?.invoiceDate))
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

    const generateInvoice = () => {
        const { vehicleDetails, financeDetails, insuranceDetails, invoiceDetails } = requestPayload;
        const data = { vehicleDetails, financeDetails, insuranceDetails, invoiceDetails };
        const onSuccess = (res) => {
            form.resetFields();
            setShowDataLoading(true);
            showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage + 'Invoice No.:' + res?.data?.invoiceNumber });
            fetchList({ setIsLoading: listShowLoading, userId, onSuccessAction, extraParams });
            resetInvoiceData();
            setCurrentSection(defaultSection);
        };
        const onError = (message) => {
            showGlobalNotification({ message });
        };
        const requestData = {
            data: data,
            method: 'post',
            setIsLoading: listInvoiceShowLoading,
            userId,
            onError,
            onSuccess,
        };
        saveData(requestData);
    };

    const onFinishFailed = (errorInfo) => {
        return;
    };

    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const resetInvoiceData = () => {
        resetDetailData();
        resetOtfData();
        form.resetFields();
        setSelectedOrderId('');
        setSelectedOtfNumber('');
        setSelectedOrder('');
        invoiceDetailForm.resetFields();

        advanceFilterForm.resetFields();
        advanceFilterForm.setFieldsValue();
        setAdvanceSearchVisible(false);
        setLastSection(false);
        setIsFormVisible(false);
        setCancelInvoiceVisible(false);
        setButtonData({ ...defaultBtnVisiblity });
    };

    const onCloseAction = () => {
        resetInvoiceData();
    };

    const tableProps = {
        dynamicPagination,
        totalRecords,
        setPage,
        tableColumn: tableColumn(handleButtonClick),
        tableData: data || [{amcRegistrationNumber : '456789',dealerLocation : 'ertyui',vin:'fcgvhbjn'}],
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
        setCancelInvoiceVisible(false);
        cancelInvoiceForm.resetFields();
    };

    const removeFilter = (key) => {
        if (key === 'searchParam') {
            const { searchType, searchParam, ...rest } = filterString;
            setFilterString({ ...rest });
        } else if (key === 'fromDate' || key === 'toDate') {
            const { fromDate, toDate, ...rest } = filterString;
            setFilterString({ ...rest });
        } else {
            const { [key]: names, ...rest } = filterString;
            setFilterString({ ...rest });
        }
    };

    const onCancelInvoice = () => {
        setCancelInvoiceVisible(true);
    };

    const onPrintInvoice = (record) => {
        setReportType(`Invoice`);
        setReportVisible(true);

        setAdditionalReportParams([
            {
                key: 'invoice_id',
                value: record?.invoiceNumber,
            },
        ]);
    };

    const onPrintForm21 = (record) => {
        setReportType(`Form_21`);
        setReportVisible(true);

        setAdditionalReportParams([
            {
                key: 'invoice_id',
                value: record?.invoiceNumber,
            },
        ]);
    };

    useEffect(() => {
        setReportDetail(reportType === `Invoice` ? EMBEDDED_REPORTS?.INVOICE_DOCUMENT : reportType === `Form_21` ? EMBEDDED_REPORTS?.FORM_21_DOCUMENT : null);
    }, [reportType]);

    const handleCloseReceipt = () => {
        setCancelInvoiceVisible(false);
        cancelInvoiceForm.resetFields();
    };

    const handleCancelReceipt = () => {
        const recordId = selectedOrderId;
        const cancelReason = cancelInvoiceForm.getFieldValue().cancelReason;
        const data = { id: recordId ?? '', invoiceNumber: selectedOrderId, cancelReason: cancelReason };
        const onSuccess = (res) => {
            showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
            fetchList({ setIsLoading: listShowLoading, userId, onSuccessAction, extraParams });
            cancelInvoiceForm.resetFields();
            setCancelInvoiceVisible(false);
            showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
            fetchList({ setIsLoading: listShowLoading, userId, onSuccessAction, extraParams });
            resetInvoiceData();
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
        cancelInvoice(requestData);
    };

    const title = 'AMC Registration';

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
        // onFinish,
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
        invoiceDetailForm,
        formActionType,
        setFormActionType,
        // onFinish,
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
        requestPayload,
        setRequestPayload,
        receipt,
        setReceipt,
        invoiceStatus,

        setButtonData,
        handleButtonClick,
        defaultFormActionType,
        defaultBtnVisiblity,
        selectedOrderId,
        setSelectedOrderId,
        selectedOrder,
        setSelectedOrder,
        selectedOtfNumber,
        setSelectedOtfNumber,

        otfData,
        section,
        currentSection,
        sectionName,
        setCurrentSection,
        handleFormValueChange,
        isLastSection,
        typeData,
        receiptType,
        partySegmentType,
        paymentModeType,
        documentType,
        onCancelInvoice,
        saveButtonName: isLastSection ? 'Submit' : 'Continue',
        setLastSection,
        handleIRNGeneration,
        handleBookingNumberSearch,
        isVehicleInvoiceDataLoading,
        handleBookingChange,
        onPrintInvoice,
        onPrintForm21,
        confirmRequest,
        setConfirmRequest,
        previousSection,
        setpreviousSection,
        CustomerForm,
        showGlobalNotification,
        isDataLoaded,
        isInVoiceMasterDetailDataLoaded,
        salesConsultantLovData,
    };

    const cancelInvoiceProps = {
        isVisible: cancelInvoiceVisible,
        titleOverride: 'Cancel Request',
        handleCloseReceipt,
        handleCancelReceipt,
        cancelInvoiceForm,
        onCloseAction: onCancelCloseAction,
        typeData,
    };

    const reportProps = {
        isVisible: isReportVisible,
        titleOverride: reportDetail?.title,
        additionalParams: additionalReportParams,
        onCloseAction: () => {
            setReportVisible(false);
        },
    };

    return (
        <>
            <RegistrationFilter {...advanceFilterResultProps} />
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <ListDataTable
                        // handleButtonClick={handleButtonClick}
                        isLoading={showDataLoading}
                        {...tableProps}
                        showAddButton={false}
                    />
                </Col>
            </Row>
            <AdvancedSearch {...advanceFilterProps} />
            <AMCRegistrationMainContainer {...containerProps} />
            {/* <CancelInvoice {...cancelInvoiceProps} /> */}
            {/* <ReportModal {...reportProps} reportDetail={reportDetail} /> */}
        </>
    );
};

const AMCRegistrationMaster = connect(mapStateToProps, mapDispatchToProps)(AMCRegistrationMasterBase);
export default AMCRegistrationMaster;
