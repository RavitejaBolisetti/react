/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Col, Form, Row } from 'antd';
import { tableColumnCoDealer } from './tableColumn';
import { ADD_ACTION, EDIT_ACTION, VIEW_ACTION, NEXT_ACTION, CANCEL_INVOICE, btnVisiblity } from 'utils/btnVisiblity';

import { CoDealerInvoiceMainContainer } from './CoDealerInvoiceMainContainer';
import { ListDataTable } from 'utils/ListDataTable';
import { CoDealerInvoiceAdvancedSearch } from './CoDealerInvoiceAdvancedSearch';
import { CO_DEALER_QUERY_BUTTONS, SEARCH_PARAM_CONSTANTS, THANK_YOU_TYPE } from './constants';
import { showGlobalNotification } from 'store/actions/notification';
import { CO_DEALER_SECTIONS } from 'components/Sales/CoDealerInvoiceGeneration/constants';
import { drawerTitle } from 'utils/drawerTitle';
import { ReportModal } from 'components/common/ReportModal/ReportModal';
import { EMBEDDED_REPORTS } from 'constants/EmbeddedReports';

import { CoDealerInvoiceFilter } from './CoDealerInvoiceFilter';
import { CoDealerSearchDataActions, CoDealerVinNumberDataActions } from 'store/actions/data/CoDealerInvoice';
import { dealerParentLovDataActions } from 'store/actions/data/dealer/dealerParentsLov';
import { translateContent } from 'utils/translateContent';
import { PARAM_MASTER } from 'constants/paramMaster';
import { convertDateTime, convertDateTimedayjs, dateFormat, dateFormatView, formatDateToCalenderDate } from 'utils/formatDateTime';
import { getCodeValue } from 'utils/getCodeValue';
import { DATE_CONSTANTS } from './constants/DateConstants';
import { validateRequiredSelectField } from 'utils/validation';
import { BASE_URL_CO_DEALER_DETAILS, BASE_URL_VEHICLE_INVOICE_IRN_GENERATION, BASE_URL_VEHICLE_INVOICE_LIST, BASE_URL_VEHICLE_INVOICE_PROFILE_CARD } from 'constants/routingApi';
import { vehicleInvoiceGenerationDataActions } from 'store/actions/data/sales/vehicleInvoiceGeneration';
import { otfvehicleDetailsDataActions } from 'store/actions/data/otf/vehicleDetails';
import { CancelInvoice } from '../VehicleInvoiceGeneration/CancelInvoice';
import { geoStateDataActions } from 'store/actions/data/geo/states';
import { geoCityDataActions } from 'store/actions/data/geo/cities';
import { IRN_STATUS } from 'constants/IRNStatus';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            CoDealerInvoice: {
                CoDealerInvoiceSearch: { isDetailLoaded: isCoDealerLoaded = false, isDetailLoading: isSearchLoading, data, detailData: CoDealerData = [], filter: filterString },
                CoDealerVINNumber: { data: VinData, isLoading: isVinLoading, isLoaded: isVinLoaded },
            },
            DealerHierarchy: {
                DealerParentsLov: { filteredListData: indentToDealerData = [] },
            },
            Geo: {
                City: { filteredListData: cityData = [] },
                State: { filteredListData: stateData = [] },
            },
        },
    } = state;

    const moduleTitle = translateContent('coDealer.heading.title');
    const VIN_SEARCH_TYPE = 'C';

    let returnValue = {
        userId,
        typeData,
        data: data?.paginationData || [],
        totalRecords: data?.totalRecords || [],
        coDealerInvoiceStatusList: Object.values(CO_DEALER_QUERY_BUTTONS),
        moduleTitle,
        isSearchLoading,
        isCoDealerLoaded,
        filterString,
        indentToDealerData,
        CoDealerData,

        VinData,
        isVinLoading,
        isVinLoaded,
        VIN_SEARCH_TYPE,

        cityData,
        stateData,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchCoDealerInvoice: CoDealerSearchDataActions.fetchList,
            resetCoDealerData: CoDealerSearchDataActions.reset,
            listShowCoDealerLoading: CoDealerSearchDataActions.listShowLoading,
            setFilterString: CoDealerSearchDataActions.setFilter,
            fetchCoDealerProfileData: vehicleInvoiceGenerationDataActions.fetchData,
            saveData: CoDealerSearchDataActions.saveData,

            fetchCoDealerDetails: CoDealerSearchDataActions.fetchDetail,
            resetCoDealerDetailData: CoDealerSearchDataActions.resetDetail,
            listCoDealerDetailShowLoading: CoDealerSearchDataActions.listDetailShowLoading,

            fetchDealerParentsLovList: dealerParentLovDataActions.fetchFilteredList,
            listShowDealerLoading: dealerParentLovDataActions.listShowLoading,

            fetchVin: CoDealerVinNumberDataActions.fetchList,
            listVinLoading: CoDealerVinNumberDataActions.listShowLoading,
            resetVinData: CoDealerVinNumberDataActions.reset,

            resetTaxDetails: otfvehicleDetailsDataActions.reset,

            CancelInvoiceGenerated: vehicleInvoiceGenerationDataActions.saveData,
            restCancellationData: vehicleInvoiceGenerationDataActions.reset,

            generateIrn: vehicleInvoiceGenerationDataActions.saveData,
            listIrnLoading: vehicleInvoiceGenerationDataActions.listShowLoading,

            fetchStateLovList: geoStateDataActions.fetchFilteredList,
            listStateLoading: geoStateDataActions.listShowLoading,
            fetchCityLovList: geoCityDataActions.fetchFilteredList,
            listCityLoading: geoCityDataActions.listShowLoading,

            showGlobalNotification,
        },
        dispatch
    ),
});

export const CoDealerInvoiceMasterBase = (props) => {
    const { data, receiptDetailData = {}, userId = undefined,  saveData = () => {} } = props;
    const { typeData, receiptType = undefined, partySegmentType = undefined,  moduleTitle = '', totalRecords = 0, showGlobalNotification = () => {} } = props;
    const { filterString, setFilterString, coDealerInvoiceStatusList = Object?.values(CO_DEALER_QUERY_BUTTONS) } = props;
    const { fetchCoDealerInvoice, isCoDealerLoaded, listShowCoDealerLoading } = props;
    const { indentToDealerData, fetchDealerParentsLovList, listShowDealerLoading, fetchCoDealerDetails, resetCoDealerDetailData, listCoDealerDetailShowLoading, CoDealerData, fetchCoDealerProfileData } = props;
    const { CancelInvoiceGenerated, isVinLoading, fetchVin, listVinLoading, resetVinData, VIN_SEARCH_TYPE, resetTaxDetails, restCancellationData } = props;
    const { generateIrn, listIrnLoading } = props;
    const { cityData, stateData, fetchStateLovList, fetchCityLovList, listCityLoading, listStateLoading } = props;

    const [form] = Form.useForm();
    const [searchForm] = Form.useForm();
    const [advanceFilterForm] = Form.useForm();
    const [cancelInvoiceForm] = Form.useForm();

    const [CoDealerInvoiceStateMaster, setCoDealerInvoiceStateMaster] = useState({ currentQuery: CO_DEALER_QUERY_BUTTONS?.PENDING?.key, currentButtonName: CO_DEALER_QUERY_BUTTONS?.PENDING?.title, current: 1, pageSize: 10, typeDataFilter: [], INVOICE_FROM_DATE: [], INVOICE_TO_DATE: [], requestpayload: {}, VinData: [] });

    const [additionalReportParams, setAdditionalReportParams] = useState();
    const [isReportVisible, setReportVisible] = useState();
    const [section, setSection] = useState();
    const [defaultSection, setDefaultSection] = useState();
    const [currentSection, setCurrentSection] = useState();
    const [sectionName, setSetionName] = useState();
    const [isLastSection, setLastSection] = useState(false);
    const [previousSection, setPreviousSection] = useState(1);
    const [showdataLoading, setShowDataLoading] = useState(false);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(false);
    const [invoiceId, setInvoiceId] = useState('');
    const [isAdvanceSearchVisible, setAdvanceSearchVisible] = useState(false);
    const [cancelInvoiceVisible, setCancelInvoiceVisible] = useState(false);
    const [actionButtonVisiblity, setActionButtonVisiblity] = useState({ canAdd: true, canView: false, canEdit: false });
    const [confirmRequest, setConfirmRequest] = useState();

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
        cancelDeliveryNoteBtn: false,
        printInvoiceBtn: false,
    };

    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });

    const defaultFormActionType = { addMode: false, editMode: false, viewMode: false };
    const [formActionType, setFormActionType] = useState({ ...defaultFormActionType });

    const onSuccessAction = () => {
        setShowDataLoading(false);
    };

    const onErrorAction = (message) => {
        showGlobalNotification({ message });
        setShowDataLoading(false);
    };

    useEffect(() => {
        if (typeData && typeData?.[PARAM_MASTER.CO_DEALER_INV_SER.id]?.length) {
            searchForm.setFieldsValue({ searchType: 'indentNumber' });
            setCoDealerInvoiceStateMaster({
                ...CoDealerInvoiceStateMaster,
                RFRL: typeData?.[PARAM_MASTER.RFRL.id],
                TAX_CALCLTN_TYPE: typeData?.[PARAM_MASTER.TAX_CALCLTN_TYPE.id],
                VEHCL_TYPE: typeData?.[PARAM_MASTER.VEHCL_TYPE.id],
                PRC_TYP: typeData?.[PARAM_MASTER.PRC_TYP.id],
                SALE_TYPE: typeData?.[PARAM_MASTER.SALE_TYPE.id],
                TYPE_DATA_INV_SEARCH: typeData?.[PARAM_MASTER.CO_DEALER_INV_SER.id]?.filter((item) => ![SEARCH_PARAM_CONSTANTS?.DEALER_PARENT?.key]?.includes(item?.key)),
                typeData: typeData?.[PARAM_MASTER.CO_DEALER_INV_SER.id],
                typeDataFilter: typeData?.[PARAM_MASTER.CO_DEALER_INV_SER.id]?.filter((i) => [SEARCH_PARAM_CONSTANTS?.INDENT_NUMBER?.key]?.includes(i?.key)),
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [typeData, typeData?.[PARAM_MASTER.CO_DEALER_INV_SER.id]]);

    useEffect(() => {
        if (isAdvanceSearchVisible && filterString?.invoiceFromDate && filterString?.invoiceToDate) {
            advanceFilterForm.setFieldsValue({ ...filterString, invoiceStatus: CoDealerInvoiceStateMaster?.currentQuery, invoiceFromDate: formatDateToCalenderDate(filterString?.invoiceFromDate), invoiceToDate: formatDateToCalenderDate(filterString?.invoiceToDate) });
        } else if (isAdvanceSearchVisible) {
            advanceFilterForm.setFieldsValue({ ...filterString, invoiceStatus: CoDealerInvoiceStateMaster?.currentQuery });
        } else {
            advanceFilterForm.resetFields();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [CoDealerInvoiceStateMaster?.currentQuery, isAdvanceSearchVisible, filterString]);

    const extraParams = useMemo(() => {
        return [
            {
                key: 'searchType',
                title: 'Type',
                value: filterString?.searchType,
                name: getCodeValue(CoDealerInvoiceStateMaster?.TYPE_DATA_INV_SEARCH, filterString?.searchType, 'value', false),
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
                key: 'dealerParentCode',
                title: 'IndentParent',
                value: filterString?.dealerParentCode,
                name: getCodeValue(indentToDealerData, filterString?.dealerParentCode, 'value', false),
                canRemove: true,
                filter: true,
            },
            {
                key: 'fromDate',
                title: 'Invoice From Date',
                value: filterString?.invoiceFromDate,
                name: convertDateTime(filterString?.invoiceFromDate, dateFormatView, 'NA'),
                canRemove: true,
                filter: true,
            },
            {
                key: 'toDate',
                title: 'Invoice To Date',
                value: filterString?.invoiceToDate,
                name: convertDateTime(filterString?.invoiceToDate, dateFormatView, 'NA'),
                canRemove: true,
                filter: true,
            },
            {
                key: 'invoiceStatus',
                title: 'Indent Status',
                value: filterString?.currentQuery || CoDealerInvoiceStateMaster?.currentQuery,
                canRemove: false,
                filter: false,
            },
            {
                key: 'pageNumber',
                title: 'Value',
                value: filterString?.current || CoDealerInvoiceStateMaster?.current,
                canRemove: true,
                filter: false,
            },
            {
                key: 'pageSize',
                title: 'Value',
                value: filterString?.pageSize || CoDealerInvoiceStateMaster?.pageSize,
                canRemove: true,
                filter: false,
            },
            {
                key: 'sortBy',
                title: 'Sort By',
                value: filterString?.sortBy,
                canRemove: true,
                filter: false,
            },
            {
                key: 'sortIn',
                title: 'Sort Type',
                value: filterString?.sortType,
                canRemove: true,
                filter: false,
            },
        ];
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString]);

    useEffect(() => {
        if (userId && extraParams) {
            setShowDataLoading(true);
            fetchCoDealerInvoice({ setIsLoading: listShowCoDealerLoading, userId, extraParams, onSuccessAction, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, extraParams]);

    useEffect(() => {
        if (CoDealerData?.indentDetails && CoDealerData?.vehicleDetailRequest && isCoDealerLoaded) {
            setCoDealerInvoiceStateMaster((prev) => ({ ...prev, ...CoDealerData }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [CoDealerData, isCoDealerLoaded]);

    useEffect(() => {
        if (userId) {
            fetchStateLovList({ setIsLoading: listStateLoading, userId, onErrorAction });
            fetchCityLovList({ setIsLoading: listCityLoading, userId, onErrorAction });
            fetchDealerParentsLovList({ setIsLoading: listShowDealerLoading, userId, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    useEffect(() => {
        const defaultSection = CO_DEALER_SECTIONS.INDENT_DETAILS;
        setDefaultSection(defaultSection?.id);
        setSetionName(CO_DEALER_SECTIONS);
        setSection(defaultSection);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (currentSection && sectionName) {
            const nextSection = Object.values(sectionName)?.find((i) => i?.displayOnList && i.id > currentSection);
            setLastSection(!nextSection?.id);
        }
        form.resetFields();
        form.setFieldsValue(undefined);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentSection, sectionName]);

    const handleDeliveryNoteTypeChange = (buttonName) => {
        const buttonKey = buttonName?.key;
        if (buttonKey === CoDealerInvoiceStateMaster?.currentQuery) {
            return false;
        }
        setShowDataLoading(true);
        let typeDataFilter = [];
        setFilterString({ currentQuery: buttonKey, current: 1, pageSize: 10 });
        switch (buttonKey) {
            case CO_DEALER_QUERY_BUTTONS?.PENDING?.key: {
                setActionButtonVisiblity({ canAdd: true, canView: false, canEdit: false });
                typeDataFilter = CoDealerInvoiceStateMaster?.TYPE_DATA_INV_SEARCH?.filter((i) => [SEARCH_PARAM_CONSTANTS?.INDENT_NUMBER?.key]?.includes(i?.key));
                break;
            }
            case CO_DEALER_QUERY_BUTTONS?.INVOICED?.key: {
                setActionButtonVisiblity({ canAdd: false, canView: true, canEdit: false });
                typeDataFilter = CoDealerInvoiceStateMaster?.TYPE_DATA_INV_SEARCH;
                break;
            }
            case CO_DEALER_QUERY_BUTTONS?.CANCELLED?.key: {
                setActionButtonVisiblity({ canAdd: false, canView: true, canEdit: false });
                typeDataFilter = CoDealerInvoiceStateMaster?.TYPE_DATA_INV_SEARCH;
                break;
            }
            default: {
                setActionButtonVisiblity({ canAdd: true, canView: false, canEdit: false });
                typeDataFilter = CoDealerInvoiceStateMaster?.typeData;
            }
        }
        setCoDealerInvoiceStateMaster({ ...CoDealerInvoiceStateMaster, currentQuery: buttonKey, currentButtonName: buttonName?.title, typeDataFilter });
    };
    const HandleVinList = (modelCode, searchType = VIN_SEARCH_TYPE) => {
        if (modelCode && searchType) {
            const onSuccessAction = (res) => {
                setCoDealerInvoiceStateMaster((prev) => ({ ...prev, VinData: res?.data?.paginationData }));
            };
            const extraParams = [
                {
                    key: 'searchType',
                    value: searchType,
                },
                {
                    key: 'modelValue',
                    value: modelCode,
                },
            ];
            fetchVin({ setIsLoading: listVinLoading, userId, extraParams, onSuccessAction, onErrorAction });
        } else {
            showGlobalNotification({ title: translateContent('coDealer.validation.ModelCode') });
        }
    };

    const handleDrawerButtonVisibility = (btnVisiblityProps) => {
        const { buttonAction, record } = btnVisiblityProps;
        let formAction = formActionType;
        let btnVisibilityStatus = buttonData;
        switch (buttonAction) {
            case NEXT_ACTION:
                break;
            case VIEW_ACTION:
                const isInvoiced = record?.invoiceStatus === CO_DEALER_QUERY_BUTTONS?.INVOICED?.key;
                btnVisibilityStatus = { ...buttonData, closeBtn: true, nextBtn: !isLastSection, printInvoiceBtn: isInvoiced };
                formAction = { addMode: buttonAction === ADD_ACTION, editMode: buttonAction === EDIT_ACTION, viewMode: buttonAction === VIEW_ACTION };
                break;
            case CANCEL_INVOICE:
                formAction = formActionType;
                btnVisibilityStatus = { ...buttonData };
                break;

            default:
                formAction = { addMode: buttonAction === ADD_ACTION, editMode: buttonAction === EDIT_ACTION, viewMode: buttonAction === VIEW_ACTION };
                btnVisibilityStatus = btnVisiblity({ defaultBtnVisiblity, buttonAction });
                break;
        }
        return { formAction, btnVisibilityStatus };
    };
    const ExtraParams = (customkey = 'id', indentStatus = null, id = '') => {
        return [
            {
                key: customkey,
                title: customkey,
                value: id,
            },
            {
                key: 'indentStatus',
                title: 'indentStatus',
                value: indentStatus,
            },
        ];
    };
    const handleProfile = (buttonAction, id) => {
        [EDIT_ACTION, VIEW_ACTION]?.includes(buttonAction) &&
            fetchCoDealerProfileData({
                customURL: BASE_URL_VEHICLE_INVOICE_PROFILE_CARD,
                setIsLoading: listShowCoDealerLoading,
                userId,
                extraParams: ExtraParams('invoiceId', null, id),
                onSuccessAction: (res) => {
                    setCoDealerInvoiceStateMaster((prev) => ({ ...prev, selectedOrder: { ...res?.data, invoiceDate: convertDateTimedayjs(res?.data?.invoiceDate, dateFormatView) } }));
                    const showCancelInvoice = [IRN_STATUS?.APPROVED?.key, IRN_STATUS?.REJECTED?.key, null]?.includes(res?.data?.irnStatus) && !formActionType?.addMode && res?.data?.invoiceStatus === CO_DEALER_QUERY_BUTTONS?.INVOICED?.key;
                    setButtonData((prev) => ({ ...prev, cancelInvoice: showCancelInvoice }));
                },
                onErrorAction,
            });
    };
    const HandleIndentDetails = (id = '', record, buttonAction) => {
        if (id) {
            fetchCoDealerDetails({
                customURL: BASE_URL_CO_DEALER_DETAILS,
                setIsLoading: listCoDealerDetailShowLoading,
                userId,
                extraParams: ExtraParams('id', record?.indentStatus, id),
                onSuccessAction: (res) => {
                    setCoDealerInvoiceStateMaster((prev) => ({ ...prev, CoDealerData: { ...res?.data } }));
                },
                onErrorAction,
            });
            handleProfile(buttonAction, id);
        } else {
            return false;
        }
    };
    const ShowCoDealerCancellation = (record) => {
        cancelInvoiceForm.resetFields();
        setCancelInvoiceVisible(true);
    };

    const handleButtonClick = ({ record = null, buttonAction, openDefaultSection = true }) => {
        form.resetFields();
        form.setFieldsValue(undefined);
        switch (buttonAction) {
            case ADD_ACTION:
                defaultSection && setCurrentSection(defaultSection);
                setPreviousSection(1);
                setSelectedOrder(record);
                HandleIndentDetails(record?.id, record, ADD_ACTION);
                setInvoiceId(record?.id);
                break;
            case EDIT_ACTION:
                setSelectedOrder(record);
                setInvoiceId(record?.id);
                openDefaultSection && setCurrentSection(defaultSection);
                break;
            case VIEW_ACTION:
                setSelectedOrder(record);
                setInvoiceId(record?.id);
                defaultSection && setCurrentSection(defaultSection);
                HandleIndentDetails(record?.id, record, VIEW_ACTION);
                break;
            case CANCEL_INVOICE:
                ShowCoDealerCancellation(record);
                break;

            case NEXT_ACTION:
                const nextSection = Object.values(sectionName)?.find((i) => i.id > currentSection);
                if (nextSection?.id === CO_DEALER_SECTIONS?.THANK_YOU_PAGE?.id && !formActionType?.addMode) {
                    return false;
                }
                section && setCurrentSection(nextSection?.id);
                setSection(nextSection);
                setLastSection(!nextSection?.id);
                break;

            default:
                break;
        }
        setButtonData(handleDrawerButtonVisibility({ buttonAction, record })?.btnVisibilityStatus);
        setFormActionType(handleDrawerButtonVisibility({ buttonAction, record })?.formAction);
        setIsFormVisible(true);
    };

    const handleInvoicePrint = (record) => {
        setReportVisible(true);
        setAdditionalReportParams([
            {
                key: 'sa_od_invoice_hdr_id',
                value: record?.record?.id,
            },
        ]);
    };
    const handleIRNGeneration = () => {
        const data = { id: invoiceId, invoiceNumber: selectedOrder?.invoiceNumber };
        const onSuccess = (res) => {
            setConfirmRequest({ ...confirmRequest, isVisible: false });
            handleProfile(VIEW_ACTION, invoiceId);
            fetchCoDealerInvoice({ setIsLoading: listShowCoDealerLoading, userId, extraParams, onSuccessAction, onErrorAction });
            showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
        };
        const onError = (message) => {
            showGlobalNotification({ message });
        };
        const requestData = {
            customURL: BASE_URL_VEHICLE_INVOICE_IRN_GENERATION,
            data: data,
            method: 'post',
            setIsLoading: listIrnLoading,
            userId,
            onError,
            onSuccess,
        };

        generateIrn(requestData);
    };

    const handleThankyouButtonClick = (item) => {
        const buttonKey = item?.key;
        switch (buttonKey) {
            case THANK_YOU_TYPE?.PRINT: {
                handleInvoicePrint(selectedOrder);
                break;
            }
            default: {
                return false;
            }
        }
    };

    const handleResetFilter = (emptyString) => {
        advanceFilterForm.resetFields();
        emptyString && setFilterString({ invoiceStatus: CoDealerInvoiceStateMaster?.currentQuery });
        setShowDataLoading(false);
        setCoDealerInvoiceStateMaster((prev) => ({ ...prev, INVOICE_FROM_DATE: [], INVOICE_TO_DATE: [], invoiceStatus: CoDealerInvoiceStateMaster?.currentQuery }));
        !emptyString && advanceFilterForm.setFieldValue('invoiceStatus', CoDealerInvoiceStateMaster?.currentQuery);
    };

    const MessageSplit = (message) => {
        return { thankyouPageTitle: message?.responseMessage, generationTitle: 'Invoice No.', generationMessage: message?.data?.invoiceNumber, selectedOrder: { customerName: message?.data?.dealerName, customerId: message?.data?.dealerCode, invoiceNumber: message?.data?.invoiceNumber, invoiceStatus: CO_DEALER_QUERY_BUTTONS?.INVOICED?.title, invoiceDate: convertDateTimedayjs(message?.data?.invoiceDate, dateFormatView) } };
    };
    const onFinish = (values) => {
        const finalPayload = { invoiceNumber: '', indentDetails: values?.indentDetails, vehicleDetailRequest: values?.vehicleDetailRequest };
        const onSuccess = (res) => {
            const data = res;
            form.resetFields();
            setShowDataLoading(true);
            resetDataOnClose();
            setFilterString({ currentQuery: CoDealerInvoiceStateMaster?.currentQuery, current: 1, pageSize: 10 });
            setButtonData({ ...defaultBtnVisiblity, closeBtn: true });
            section && setCurrentSection(CO_DEALER_SECTIONS.THANK_YOU_PAGE.id);
            setCoDealerInvoiceStateMaster((prev) => ({ ...prev, selectedOrder: MessageSplit(data)?.selectedOrder, thankyouPageTitle: MessageSplit(data)?.thankyouPageTitle, generationTitle: MessageSplit(data)?.generationTitle, generationMessage: MessageSplit(data)?.generationMessage }));
        };

        const requestData = {
            data: finalPayload,
            method: 'post',
            setIsLoading: listShowCoDealerLoading,
            userId,
            onError: onErrorAction,
            onSuccess,
            customURL: BASE_URL_CO_DEALER_DETAILS,
        };

        saveData(requestData);
    };

    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };
    const resetDataOnClose = () => {
        setSelectedOrder();
        setButtonData({ ...defaultBtnVisiblity });
        resetCoDealerDetailData();
        resetVinData();
        resetTaxDetails();
        setCoDealerInvoiceStateMaster((prev) => ({ ...prev, VinData: [], indentDetails: {}, vehicleDetailRequest: {}, selectedOrder: {} }));
        restCancellationData();
    };

    const onCloseAction = () => {
        resetDataOnClose();
        setIsFormVisible(false);
    };
    const handleDateChange = (value, type) => {
        switch (type) {
            case DATE_CONSTANTS?.INVOICE_FROM_DATE?.key:
                if (value) {
                    setCoDealerInvoiceStateMaster((prev) => ({ ...prev, INVOICE_FROM_DATE: [validateRequiredSelectField('invoice to date')], INVOICE_TO_DATE: [validateRequiredSelectField('invoice from date')] }));
                    advanceFilterForm.getFieldValue('invoiceToDate') && advanceFilterForm.validateFields();
                } else {
                    setCoDealerInvoiceStateMaster((prev) => ({ ...prev, INVOICE_FROM_DATE: [], INVOICE_TO_DATE: [] }));
                    advanceFilterForm.setFieldValue('invoiceToDate', undefined);
                }
                break;

            case DATE_CONSTANTS?.INVOICE_TO_DATE?.key:
                setCoDealerInvoiceStateMaster((prev) => ({ ...prev, INVOICE_FROM_DATE: [validateRequiredSelectField('invoice to date')], INVOICE_TO_DATE: [validateRequiredSelectField('invoice from date')] }));
                break;

            default:
                return;
        }
    };

    const tableProps = {
        dynamicPagination: true,
        totalRecords,
        setPage: setFilterString,
        page: filterString,
        tableColumn: tableColumnCoDealer({ handleButtonClick, actionButtonVisiblity, currentQuery: CoDealerInvoiceStateMaster?.currentQuery }),
        tableData: (data instanceof Object && data?.paginationData) || data,
        typeData,
        handleButtonClick,
        isLoading: showdataLoading,
        showAddButton: false,
        filterString,
    };

    const onAdvanceSearchCloseAction = () => {
        form.resetFields();
        advanceFilterForm.resetFields();
        advanceFilterForm.setFieldsValue();
        setAdvanceSearchVisible(false);
    };
    const removeFilter = (key) => {
        if (key === 'searchParam') {
            const { searchType, searchParam, ...rest } = filterString;
            setFilterString({ ...rest });
        } else if (key === 'invoiceToDate' || key === 'invoiceFromDate') {
            const { invoiceToDate, invoiceFromDate, status, ...rest } = filterString;
            setCoDealerInvoiceStateMaster((prev) => ({ ...prev, INVOICE_FROM_DATE: [], INVOICE_TO_DATE: [] }));
            setFilterString({ ...rest });
        } else if (key === 'dealerParentCode') {
            const { dealerParentCode, status, ...rest } = filterString;
            setFilterString({ ...rest });
        } else {
            const { [key]: names, ...rest } = filterString;
            setFilterString({ ...rest });
        }
        advanceFilterForm.resetFields();
    };
    const handleCancelInvoice = () => {
        const recordId = invoiceId;
        const cancelReason = cancelInvoiceForm.getFieldValue().cancelReason;
        const data = { id: recordId ?? '', invoiceNumber: selectedOrder?.invoiceNumber, cancelReason: cancelReason };
        const onSuccess = (res) => {
            setCancelInvoiceVisible(false);
            setIsFormVisible(false);
            showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
            setButtonData((prev) => ({ ...prev, cancelInvoice: false }));
            setFilterString({ current: 1, pageSize: 10, currentQuery: CoDealerInvoiceStateMaster?.currentQuery });
        };
        const onError = (message) => {
            showGlobalNotification({ message });
        };
        const requestData = {
            data: data,
            method: 'put',
            setIsLoading: listIrnLoading,
            userId,
            onError,
            onSuccess,
        };

        CancelInvoiceGenerated(requestData);
    };

    const CoDealerInvoiceFilterProps = {
        extraParams,
        removeFilter,
        coDealerInvoiceStatusList,
        advanceFilter: true,
        otfFilter: true,
        filterString,
        setFilterString,
        onFinish,
        handleResetFilter,
        advanceFilterForm,
        handleButtonClick,
        handleDeliveryNoteTypeChange,
        data,
        setAdvanceSearchVisible,
        typeData: CoDealerInvoiceStateMaster?.typeDataFilter,
        status: CoDealerInvoiceStateMaster?.currentQuery,
        searchForm,
    };

    const CoDealerInvoiceAdvancedSearchProps = {
        isVisible: isAdvanceSearchVisible,
        receiptType,
        partySegmentType,
        titleOverride: translateContent('global.advanceFilter.title'),
        onCloseAction: onAdvanceSearchCloseAction,
        handleResetFilter,
        filterString,
        setFilterString,
        advanceFilterForm,
        setAdvanceSearchVisible,
        coDealerInvoiceStatusList,
        typeData,
        indentToDealerData,
        CoDealerInvoiceStateMaster,
        handleDateChange,
    };

    const containerProps = {
        record: selectedOrder,
        form,
        formActionType,
        setFormActionType,
        coDealerOnFinish: onFinish,
        isVisible: isFormVisible,
        onCloseAction,
        titleOverride: drawerTitle(formActionType).concat(moduleTitle),
        tableData: (data instanceof Object && data?.paginationData) || data,
        ADD_ACTION,
        EDIT_ACTION,
        VIEW_ACTION,
        NEXT_ACTION,
        buttonData,
        setButtonData,
        receiptDetailData,
        previousSection,
        setPreviousSection,

        handleButtonClick,
        defaultFormActionType,
        defaultBtnVisiblity,
        section,
        currentSection,
        sectionName,
        setCurrentSection,
        handleFormValueChange,
        isLastSection,
        typeData,
        setLastSection,
        setSection,
        saveButtonName: translateContent('global.buttons.submit'),
        nextBtnName: formActionType?.addMode ? translateContent('global.buttons.continue') : translateContent('global.buttons.next'),
        CoDealerInvoiceStateMaster,
        HandleVinList,
        isVinLoading,
        handleThankyouButtonClick,
        selectedOrder: CoDealerInvoiceStateMaster?.selectedOrder,
        handleInvoicePrint,
        confirmRequest,
        setConfirmRequest,
        handleIRNGeneration,
        stateData,
        cityData,
    };

    const onCancelCloseAction = () => {
        setCancelInvoiceVisible(false);
        cancelInvoiceForm.resetFields();
    };
    const cancelInvoiceProps = {
        isVisible: cancelInvoiceVisible,
        titleOverride: translateContent('vehicleInvoiceGeneration.heading.cancelRequestTitle'),
        handleCloseReceipt: onCancelCloseAction,
        handleCancelReceipt: handleCancelInvoice,
        cancelInvoiceForm,
        onCloseAction: onCancelCloseAction,
        typeData,
    };

    const reportDetail = EMBEDDED_REPORTS?.CO_DEALER_INVOICE_DOCUMENT;
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
            <CoDealerInvoiceFilter {...CoDealerInvoiceFilterProps} />
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <ListDataTable {...tableProps} />
                </Col>
            </Row>
            <CoDealerInvoiceAdvancedSearch {...CoDealerInvoiceAdvancedSearchProps} />
            <CoDealerInvoiceMainContainer {...containerProps} />
            <CancelInvoice {...cancelInvoiceProps} />
            <ReportModal {...reportProps} reportDetail={reportDetail} />
        </>
    );
};

export const CoDealerInvoiceMaster = connect(mapStateToProps, mapDispatchToProps)(CoDealerInvoiceMasterBase);
