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
import { CancelInvoice } from './CancelInvoice';
import { AdvancedSearch } from './AdvancedSearch';
import { QUERY_BUTTONS_CONSTANTS } from './QueryButtons';
import VehicleInvoiceFilter from './VehicleInvoiceFilter';
import { validateInvoiceMenu } from './LeftSidebar/MenuNav';
import { ReportModal } from 'components/common/ReportModal/ReportModal';
import { VehicleInvoiceMainConatiner } from './VehicleInvoiceMainConatiner';
import { UnSaveDataConfirmation } from 'utils/UnSaveDataConfirmation';

import { ListDataTable } from 'utils/ListDataTable';
import { convertDateTime, dateFormatView } from 'utils/formatDateTime';
import { ADD_ACTION, EDIT_ACTION, VIEW_ACTION, NEXT_ACTION, btnVisiblity } from 'utils/btnVisiblity';
import { BASE_URL_VEHICLE_INVOICE_DETAIL, BASE_URL_VEHICLE_INVOICE_IRN_GENERATION, BASE_URL_VEHICLE_INVOICE_LIST, BASE_URL_VEHICLE_INVOICE_PROFILE_CARD as customURL } from 'constants/routingApi';

import { vehicleInvoiceGenerationDataActions } from 'store/actions/data/sales/vehicleInvoiceGeneration';
import { salesConsultantActions } from 'store/actions/data/otf/salesConsultant';
import { showGlobalNotification } from 'store/actions/notification';
import { otfDataActions } from 'store/actions/data/otf/otf';

import { PARAM_MASTER } from 'constants/paramMaster';
import { VEHICLE_INVOICE_SECTION } from 'constants/VehicleInvoiceSection';
import { EMBEDDED_REPORTS } from 'constants/EmbeddedReports';
import { OTF_STATUS } from 'constants/OTFStatus';
import { otfvehicleDetailsDataActions } from 'store/actions/data/otf/vehicleDetails';
import { translateContent } from 'utils/translateContent';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            OTF: {
                salesConsultantLov: { isLoaded: isSalesConsultantDataLoaded, data: salesConsultantLovData = [] },
            },
            Sales: {
                VehicleInvoiceGeneration: { isLoaded: isSearchDataLoaded = false, isLoading: isSearchLoading, data, filter: filterString, isDetailLoaded: isInVoiceMasterDetailDataLoaded, isDetailLoading: isVehicleInvoiceDataLoading = false, detailData: vehicleInvoiceMasterData = [] },
            },
        },
    } = state;

    const moduleTitle = translateContent('vehicleInvoiceGeneration.heading.mainTitle');
    const ALLOTED_INVOICE_MESSAGE = translateContent('vehicleInvoiceGeneration.heading.notification.allotedOtfMessage');
    const ALREADY_INVOICED_OTF_MESSAGE = translateContent('vehicleInvoiceGeneration.heading.notification.otfAlreadyInvoiced');
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
        isVehicleInvoiceDataLoading,

        vehicleInvoiceMasterData,
        isInVoiceMasterDetailDataLoaded,
        isSalesConsultantDataLoaded,
        salesConsultantLovData,
        isLoading: isVehicleInvoiceDataLoading,
        ALREADY_INVOICED_OTF_MESSAGE,
        ALLOTED_INVOICE_MESSAGE,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchVehcileDetail: otfvehicleDetailsDataActions.fetchList,

            fetchList: vehicleInvoiceGenerationDataActions.fetchList,
            listShowLoading: vehicleInvoiceGenerationDataActions.listShowLoading,
            fetchInvoiceMasterData: vehicleInvoiceGenerationDataActions.fetchDetail,
            listDetailShowLoading: vehicleInvoiceGenerationDataActions.listDetailShowLoading,
            fetchData: vehicleInvoiceGenerationDataActions.fetchData,
            saveData: vehicleInvoiceGenerationDataActions.saveData,
            resetDetailData: vehicleInvoiceGenerationDataActions.resetDetail,
            setFilterString: vehicleInvoiceGenerationDataActions.setFilter,

            fetchOTFDetail: otfDataActions.fetchDetail,
            resetOtfData: otfDataActions.reset,
            listOTFShowLoading: otfDataActions.listShowLoading,

            fetchSalesConsultant: salesConsultantActions.fetchList,
            listConsultantShowLoading: salesConsultantActions.listShowLoading,

            showGlobalNotification,
        },
        dispatch
    ),
});

export const VehicleInvoiceMasterBase = (props) => {
    const { data, receiptDetailData, userId, fetchList, fetchVehcileDetail, listShowLoading, showGlobalNotification, fetchInvoiceMasterData } = props;
    const { isVehicleInvoiceDataLoading, listDetailShowLoading } = props;
    const { typeData, receiptType, partySegmentType, saveData, paymentModeType, documentType, totalRecords } = props;
    const { filterString, setFilterString, invoiceStatusList, vehicleInvoiceMasterData, resetDetailData, resetOtfData } = props;
    const { isInVoiceMasterDetailDataLoaded, fetchData, listOTFShowLoading, isDataLoaded } = props;
    const { isSalesConsultantDataLoaded, fetchSalesConsultant, salesConsultantLovData, listConsultantShowLoading } = props;
    const { ALREADY_INVOICED_OTF_MESSAGE, ALLOTED_INVOICE_MESSAGE } = props;

    const [isAdvanceSearchVisible, setAdvanceSearchVisible] = useState(false);
    const [invoiceStatus, setInvoiceStatus] = useState(QUERY_BUTTONS_CONSTANTS.INVOICED.key);
    const [requestPayload, setRequestPayload] = useState({});

    const [listFilterForm] = Form.useForm();
    const [cancelInvoiceForm] = Form.useForm();
    const [CustomerForm] = Form.useForm();

    const [searchValue, setSearchValue] = useState();

    const [selectedOrder, setSelectedOrder] = useState();
    const [selectedRecordId, setSelectedRecordId] = useState('');
    const [selectedOrderId, setSelectedOrderId] = useState('');
    const [selectedOtfNumber, setSelectedOtfNumber] = useState();
    const [selectedOtfId, setSelectedOtfId] = useState();

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
    const [confirmRequest, setConfirmRequest] = useState();
    const [previousSection, setPreviousSection] = useState(1);
    const [profileCardData, setProfileCardData] = useState();
    const [isUnsavedDataPopup, setIsUnsavedDataPopup] = useState(false);
    const [nextCurentSection, setNextCurrentSection] = useState('');
    const [isFormValueChange, setIsFormValueChange] = useState(false);

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
        printInvoiceBtn: false,
        printForm21Btn: false,
    };

    const defaultPayload = {
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

    const onSuccessAction = () => {
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
                key: 'digitalSignature',
                title: 'Digital Signature',
                value: filterString?.digitalSignature,
                name: typeData?.[PARAM_MASTER.YES_NO_FLG.id]?.find((i) => i?.key === filterString?.digitalSignature)?.value,
                canRemove: true,
                filter: true,
            },
            {
                key: 'pageNumber',
                title: 'Value',
                value: filterString?.current,
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
            fetchList({ customURL: BASE_URL_VEHICLE_INVOICE_LIST, setIsLoading: listShowLoading, userId, extraParams, onSuccessAction, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, invoiceStatus, filterString, page]);

    useEffect(() => {
        if (!isSalesConsultantDataLoaded && userId) {
            fetchSalesConsultant({ setIsLoading: listConsultantShowLoading, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSalesConsultantDataLoaded, userId]);

    useEffect(() => {
        if (!isInVoiceMasterDetailDataLoaded) {
            setRequestPayload({ ...defaultPayload });
        }

        if ((Object?.keys(vehicleInvoiceMasterData)?.length && isInVoiceMasterDetailDataLoaded && vehicleInvoiceMasterData?.invoiceDetails?.otfDetailsRequest?.orderStatus === OTF_STATUS?.ALLOTED?.key) || formActionType?.viewMode) {
            setRequestPayload({ ...vehicleInvoiceMasterData });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [vehicleInvoiceMasterData, isInVoiceMasterDetailDataLoaded, formActionType]);

    useEffect(() => {
        if (selectedOrder || selectedOtfId) {
            const extraParams = [];
            if (formActionType?.viewMode && selectedOrder?.id) {
                extraParams.push(
                    {
                        key: 'invoiceId',
                        value: selectedOrder?.id,
                        name: 'Invoice Id',
                    },
                    {
                        key: 'otfId',
                        value: selectedOrder?.otfId,
                        name: 'OTF Number',
                    }
                );
            } else if (selectedOtfId) {
                extraParams.push(
                    {
                        key: 'invoiceId',
                        value: selectedOrder?.id,
                        name: 'Invoice Id',
                    },
                    {
                        key: 'otfId',
                        value: selectedOtfId,
                        name: 'OTF Number',
                    }
                );
            }

            fetchData({
                customURL,
                setIsLoading: listOTFShowLoading,
                userId,
                extraParams: extraParams,
                onSuccessAction: (res) => {
                    setProfileCardData(res?.data);
                },
                onErrorAction,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedOrder?.id, selectedOtfId, formActionType, selectedOtfNumber]);

    useEffect(() => {
        const defaultSection = VEHICLE_INVOICE_SECTION.INVOICE_DETAILS.id;
        setDefaultSection(defaultSection);
        setSetionName(VEHICLE_INVOICE_SECTION);
        setSection(defaultSection);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const filterActiveMenu = (items) => {
        return items?.filter((item) => validateInvoiceMenu({ item, otfData: profileCardData }));
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

    const handleBookingNumberSearch = (otfNumber = '', selectedRecordId = '') => {
        if (!(otfNumber && selectedRecordId)) {
            setSelectedOrderId('');
            setSelectedOtfNumber('');
            setSelectedOrder('');

            setSelectedOtfId();
            setProfileCardData();
            resetDetailData();
            resetOtfData();
        }

        if (otfNumber || selectedRecordId) {
            const extraParams = [
                {
                    key: 'invoiceId',
                    value: selectedRecordId || '',
                    name: 'Invoice Id',
                },
                {
                    key: 'otfNumber',
                    title: 'otfNumber',
                    value: otfNumber,
                    name: 'Booking Number',
                },
            ];

            const onSuccessAction = (res) => {
                if (formActionType?.addMode) {
                    const { otfId, modelCode, saleType, priceType, discountAmount } = res?.data?.vehicleDetails;

                    if (!selectedRecordId && otfId) {
                        const extraParams = [
                            {
                                key: 'otfId',
                                value: otfId,
                            },
                            {
                                key: 'modelCode',
                                value: modelCode,
                            },
                            {
                                key: 'saleType',
                                value: saleType,
                            },
                            {
                                key: 'priceType',
                                value: priceType,
                            },
                            {
                                key: 'discountAmount',
                                value: discountAmount,
                            },
                        ];

                        fetchVehcileDetail({
                            setIsLoading: listShowLoading,
                            userId,
                            extraParams,
                            onErrorAction,
                            onSuccessAction: (response) => {
                                setRequestPayload((prev) => ({ ...prev, vehicleDetails: response?.data }));
                                setButtonData((prev) => ({ ...prev, formBtnActive: formActionType.addMode }));
                            },
                        });
                    }
                }

                if (!selectedRecordId && res?.data?.invoiceDetails?.otfDetailsRequest?.orderStatus === OTF_STATUS?.INVOICED?.key) {
                    invoiceDetailForm.setFieldValue();
                    setSelectedOrder();
                    setSelectedOtfNumber();
                    resetDetailData();
                    setButtonData((prev) => ({ ...prev, formBtnActive: false }));
                    showGlobalNotification({ notificationType: 'error', title: 'Error', message: ALREADY_INVOICED_OTF_MESSAGE });
                    return;
                } else if (!selectedRecordId && res?.data?.invoiceDetails?.otfDetailsRequest?.orderStatus !== OTF_STATUS?.ALLOTED?.key) {
                    handleBookingChange();
                    showGlobalNotification({ notificationType: 'error', title: 'Error', message: ALLOTED_INVOICE_MESSAGE });
                    return;
                } else {
                    !selectedRecordId && setSelectedOtfId(res?.data?.invoiceDetails?.otfDetailsRequest.otfId);
                    setButtonData((prev) => ({ ...prev, formBtnActive: false }));
                    setSelectedOtfNumber(otfNumber);
                }
            };

            fetchInvoiceMasterData({ customURL: BASE_URL_VEHICLE_INVOICE_DETAIL, setIsLoading: listDetailShowLoading, userId, extraParams, onSuccessAction, onErrorAction });
        }
    };

    const handleBookingChange = () => {
        setSelectedOtfNumber('');
        setProfileCardData();
        invoiceDetailForm.setFieldValue();
        setSelectedOrder('');
        resetDetailData();
        setButtonData((prev) => ({ ...prev, formBtnActive: false }));
    };

    const handleIRNGeneration = () => {
        const data = { id: selectedRecordId, otfNumber: selectedOtfNumber, invoiceNumber: selectedOrder?.invoiceNumber };
        const onSuccess = (res) => {
            setConfirmRequest({ ...confirmRequest, isVisible: false });
            resetOtfData();
            showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
            const extraParam = [
                {
                    key: 'invoiceId',
                    value: selectedOrder?.id,
                    name: 'Invoice Id',
                },
                {
                    key: 'otfId',
                    value: selectedOrder?.otfId,
                    name: 'OTF Number',
                },
            ];

            fetchData({
                customURL,
                setIsLoading: listShowLoading,
                userId,
                extraParams: extraParam,
                onErrorAction,
                onSuccessAction: (res) => {
                    setProfileCardData(res?.data);
                },
            });
        };
        const onError = (message) => {
            showGlobalNotification({ message });
        };
        const requestData = {
            customURL: BASE_URL_VEHICLE_INVOICE_IRN_GENERATION,
            data: data,
            method: 'post',
            setIsLoading: listShowLoading,
            userId,
            onError,
            onSuccess,
        };
        saveData(requestData);
    };

    const handleInvoiceTypeChange = (buttonName) => {
        setInvoiceStatus(buttonName?.key);
        searchForm.resetFields();
        setFilterString({ current: 1 });
    };

    const handleChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleSearch = (value) => {
        setFilterString({ ...filterString, searchParam: value });
        setSearchValue(value);
    };

    const handleButtonClick = ({ record = null, buttonAction, openDefaultSection = true, callApi = true, isNextBtnClick = false }) => {
        form.resetFields();
        form.setFieldsValue(undefined);
        cancelInvoiceForm.resetFields();

        if (isLastSection && callApi) {
            generateInvoice();
            return false;
        }

        switch (buttonAction) {
            case ADD_ACTION:
                setProfileCardData();
                defaultSection && setCurrentSection(defaultSection);
                resetOtfData();
                invoiceDetailForm.resetFields();
                setPreviousSection(1);
                setSelectedRecordId('');
                setSelectedOrderId('');
                setSelectedOtfNumber('');
                break;
            case EDIT_ACTION:
                record && setSelectedOrder(record);
                record && setSelectedRecordId(record?.id);
                record && setSelectedOrderId(record?.invoiceNumber);
                record && setSelectedOtfNumber(record?.otfNumber);
                openDefaultSection && setCurrentSection(defaultSection);
                handleBookingNumberSearch(record?.otfNumber, record?.id);
                break;
            case VIEW_ACTION:
                record && setSelectedOrder(record);
                record && setSelectedRecordId(record?.id);
                record && setSelectedOrderId(record?.invoiceNumber);
                record && setSelectedOtfNumber(record?.otfNumber);
                defaultSection && setCurrentSection(defaultSection);
                handleBookingNumberSearch(record?.otfNumber, record?.id);
                break;
            case NEXT_ACTION:
                const nextSection = filterActiveSection?.find((i) => i.id > currentSection);
                setIsFormValueChange(false);
                if (buttonData?.formBtnActive && isNextBtnClick) {
                    setIsUnsavedDataPopup(true);
                    setNextCurrentSection(nextSection?.id);
                } else {
                    section && setCurrentSection(nextSection?.id);
                    setLastSection(!nextSection?.id);
                }
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
                if (buttonAction === VIEW_ACTION) {
                    invoiceStatus === QUERY_BUTTONS_CONSTANTS.INVOICED.key ? setButtonData({ ...Visibility, printForm21Btn: true, printInvoiceBtn: true, cancelInvoiceBtn: true }) : setButtonData({ ...Visibility, cancelInvoiceBtn: false });
                }
            }
        }
        setIsFormVisible(true);
    };
    const handleResetFilter = () => {
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
            fetchList({ customURL: BASE_URL_VEHICLE_INVOICE_LIST, setIsLoading: listShowLoading, userId, onSuccessAction, extraParams });

            const invoiceId = res?.data?.invoiceDetails?.id;
            const invoiceNumber = res?.data?.invoiceDetails?.invoiceNumber;
            const otfNumber = res?.data?.invoiceDetails?.otfDetailsRequest?.otfNumber;
            const otfId = res?.data?.invoiceDetails?.otfDetailsRequest?.otfId;

            const record = { id: invoiceId, invoiceNumber, otfNumber, otfId };
            handleButtonClick({ record, buttonAction: VIEW_ACTION, callApi: false });

            const nextSection = filterActiveSection?.find((i) => i.id > currentSection);
            section && setCurrentSection(nextSection?.id);
            setLastSection(!nextSection?.id);
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
        saveData(requestData);
    };
    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
        setIsFormValueChange(true);
    };

    const resetInvoiceData = () => {
        setSelectedOtfId();
        setProfileCardData();
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
        setCurrentSection(defaultSection);
    };

    const onCloseAction = () => {
        resetInvoiceData();
        setIsUnsavedDataPopup(false);
    };

    const tableProps = {
        dynamicPagination,
        totalRecords,
        filterString,
        setPage: setFilterString,
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

    const onPrintInvoice = () => {
        setReportType(`Invoice`);
        setReportVisible(true);

        setAdditionalReportParams([
            {
                key: 'sa_od_invoice_hdr_id',
                value: selectedRecordId,
            },
        ]);
    };

    const onPrintForm21 = () => {
        setReportType(`Form_21`);
        setReportVisible(true);

        setAdditionalReportParams([
            {
                key: 'sa_od_invoice_hdr_id',
                value: selectedRecordId,
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
        const recordId = selectedRecordId;
        const cancelReason = cancelInvoiceForm.getFieldValue().cancelReason;
        const data = { id: recordId ?? '', invoiceNumber: selectedOrderId, cancelReason: cancelReason };
        const onSuccess = (res) => {
            setCancelInvoiceVisible(false);
            showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
            fetchList({ customURL: BASE_URL_VEHICLE_INVOICE_LIST, setIsLoading: listShowLoading, userId, onSuccessAction, extraParams });
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

        saveData(requestData);
    };

    const onCloseDrawer = () => {
        if (buttonData?.formBtnActive) {
            setIsUnsavedDataPopup(true);
        } else {
            onCloseAction();
        }
    };

    const handleOkUnsavedModal = () => {
        setIsFormValueChange(false);

        if (nextCurentSection) {
            setIsUnsavedDataPopup(false);
            setCurrentSection(nextCurentSection);
            section && setLastSection(!nextCurentSection);
            setButtonData({ ...buttonData, formBtnActive: false });
            setNextCurrentSection('');
        } else {
            onCloseAction();
        }
    };

    const handleCancelUnsaveDataModal = () => {
        setIsUnsavedDataPopup(false);
        setNextCurrentSection('');
    };

    const unsavedDataModalProps = {
        isVisible: isUnsavedDataPopup,
        onCloseAction: handleCancelUnsaveDataModal,
        onSubmitAction: handleOkUnsavedModal,
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
    };

    const advanceFilterProps = {
        isVisible: isAdvanceSearchVisible,
        receiptType,
        partySegmentType,

        titleOverride: 'Advance Filters',
        onCloseAction: onAdvanceSearchCloseAction,
        handleResetFilter,
        filterString,
        setFilterString,
        advanceFilterForm,
        setAdvanceSearchVisible,
        invoiceStatusList,
        typeData,
    };

    const drawerTitle = useMemo(() => {
        if (formActionType?.viewMode) {
            return translateContent('global.drawerTitle.view') + translateContent('vehicleInvoiceGeneration.heading.drawerTitleMaster');
        } else if (formActionType?.editMode) {
            return translateContent('global.drawerTitle.edit') + translateContent('vehicleInvoiceGeneration.heading.drawerTitleMaster');
        } else {
            return translateContent('global.drawerTitle.addNew') + translateContent('vehicleInvoiceGeneration.heading.drawerTitleMaster');
        }
    }, [formActionType]);

    const containerProps = {
        ...props,
        selectedOtfId,
        profileCardData,
        record: selectedOrder,
        form,
        invoiceDetailForm,
        formActionType,
        setFormActionType,
        isVisible: isFormVisible,
        onCloseAction: onCloseDrawer,
        titleOverride: drawerTitle,
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
        selectedRecordId,
        setSelectedRecordId,
        selectedOrder,
        setSelectedOrder,
        selectedOtfNumber,
        setSelectedOtfNumber,
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
        saveButtonName: isLastSection ? translateContent('global.buttons.submit') : translateContent('global.buttons.continue'),
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
        setPreviousSection,
        CustomerForm,
        showGlobalNotification,
        isDataLoaded,
        isInVoiceMasterDetailDataLoaded,
        salesConsultantLovData,
        resetDetailData,
        setIsUnsavedDataPopup,
        setNextCurrentSection,
        isFormValueChange,
        setIsFormValueChange,
    };

    const cancelInvoiceProps = {
        isVisible: cancelInvoiceVisible,
        titleOverride: translateContent('vehicleInvoiceGeneration.heading.cancelRequestTitle'),
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
            <VehicleInvoiceFilter {...advanceFilterResultProps} />
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <ListDataTable isLoading={showDataLoading} {...tableProps} showAddButton={false} />
                </Col>
            </Row>
            <AdvancedSearch {...advanceFilterProps} />
            <VehicleInvoiceMainConatiner {...containerProps} />
            <CancelInvoice {...cancelInvoiceProps} />
            <ReportModal {...reportProps} reportDetail={reportDetail} />
            <UnSaveDataConfirmation {...unsavedDataModalProps} />
        </>
    );
};

export const VehicleInvoiceMaster = connect(mapStateToProps, mapDispatchToProps)(VehicleInvoiceMasterBase);
