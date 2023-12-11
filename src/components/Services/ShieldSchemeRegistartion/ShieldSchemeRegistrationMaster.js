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
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { NEXT_ACTION, btnVisiblity } from 'utils/btnVisiblity';
import { convertDateTime, dateFormatView } from 'utils/formatDateTime';

import { BASE_URL_SHIELD_REGISTRATION } from 'constants/routingApi';
import { showGlobalNotification } from 'store/actions/notification';
import { shieldSchemeSearchDataAction } from 'store/actions/data/services/shieldSchemeSearch';
import { schemeDescriptionDataAction } from 'store/actions/data/services/schemeDescriptionLov';
import { employeeSearchDataAction } from 'store/actions/data/amcRegistration/employeeSearch';
import { dealerParentLovDataActions } from 'store/actions/data/dealer/dealerParentsLov';
import { applicationMasterDataActions } from 'store/actions/data/applicationMaster';
import { ProductModelGroupsDataActions } from 'store/actions/data/VehicleModelTaxChargesCategory/productModelGroup';
import { otfModelFamilyDetailDataActions } from 'store/actions/data/otf/modelFamily';
import { BASE_URL_APPLICATION_DEALER_LOCATION as customURL } from 'constants/routingApi';
import { ListDataTable } from 'utils/ListDataTable';
import { ShieldSchemeMainConatiner } from './ShieldSchemeMainConatiner';
import { SHIELD_REGISTRATION_SECTION } from 'constants/ShieldSchemeRegistrationSection';
import { CancelScheme } from './CancelScheme';
import { QUERY_BUTTONS_CONSTANTS, QUERY_BUTTONS_MNM_USER } from './utils/ShieldRegistrationContant';
import { AMC_CONSTANTS } from './utils/AMCConstants';
import { AMC_REQUEST_TITLE_CONSTANTS } from './utils/AMCRequestTitleConstant';
import { SHIELD_REPORT_DOCUMENT_TYPE } from './utils/shieldReportDocumentType';
import { EMBEDDED_REPORTS } from 'constants/EmbeddedReports';
import { ReportModal } from 'components/common/ReportModal/ReportModal';
import { PARAM_MASTER } from 'constants/paramMaster';
import { translateContent } from 'utils/translateContent';

import RegistrationFilter from './RegistrationFilter';
import { AdvancedSearch } from './AdvancedSearch';
import { VehicleReceiptFormButton } from './VehicleReceiptFormButton';
import { drawerTitle } from 'utils/drawerTitle';
import { dealerLocationsDataAction } from 'store/actions/data/amcRegistration/dealerLocations';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            ShieldSchemeRegistration: {
                ShieldSchemeSearch: { isLoaded: isSearchDataLoaded = false, isLoading: isSearchLoading, data, filter: filterString, detailData: detailShieldData = [] },
                SchemeDescription: { isLoaded: isSchemeDataLoaded = false, isLoading: isSchemeLoading, detailData: schemeDetail = [] },
            },
            AMCRegistration: {
                EmployeeData: { isLoaded: isEmployeeDataLoaded = false, isLoading: isEmployeeDataLoading, data: employeeData = [], detailData: managerData = [] },
                DealerLocations: { filteredListData: locations = [] },
            },
            DealerHierarchy: {
                DealerParentsLov: { filteredListData: dealerParentsLovList },
            },
            ApplicationMaster: { dealerLocations = [] },
            OTF: {
                ModelFamily: { isLoaded: isModelFamilyDataLoaded = false, isLoading: isModelFamilyLoading, data: modelFamilyData = [] },
            },
            VehicleModelandTaxChargesCategory: {
                ProductModelGroup: { isLoaded: isProductHierarchyDataLoaded = false, isLoading: isProductHierarchyDataLoading = false, data: ProductHierarchyData = [] },
            },
        },
        common: {
            Header: { data: loginUserData = [], dealerLocationId },
        },
    } = state;
    const moduleTitle = translateContent('shieldSchemeRegistration.heading.moduleTitle');
    let returnValue = {
        userId,
        typeData,
        data: data?.paginationData,
        totalRecords: data?.totalRecords || [],
        loginUserData,
        invoiceStatusList: loginUserData?.userType === AMC_CONSTANTS?.DEALER?.key ? Object.values(QUERY_BUTTONS_CONSTANTS) : Object.values(QUERY_BUTTONS_MNM_USER),
        detailShieldData,
        moduleTitle,
        isSearchLoading,
        isSearchDataLoaded,
        isEmployeeDataLoaded,
        isEmployeeDataLoading,
        isSchemeDataLoaded,
        isSchemeLoading,
        employeeData,
        managerData,
        dealerParentsLovList,
        dealerLocations: dealerLocations.filter((value) => value?.locationId && value?.dealerLocationName),
        schemeDetail,
        filterString,
        isModelFamilyDataLoaded,
        isModelFamilyLoading,
        modelFamilyData,
        isProductHierarchyDataLoaded,
        isProductHierarchyDataLoading,
        ProductHierarchyData,

        locations,
        dealerLocationId,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: shieldSchemeSearchDataAction.fetchList,
            fetchDetail: shieldSchemeSearchDataAction.fetchDetail,
            fetchSchemeDescription: schemeDescriptionDataAction.fetchDetail,
            setFilterString: shieldSchemeSearchDataAction.setFilter,

            fetchEmployeeList: employeeSearchDataAction.fetchList,
            fetchManagerList: employeeSearchDataAction.fetchDetail,
            listEmployeeShowLoading: employeeSearchDataAction.listShowLoading,
            resetEmployeeData: employeeSearchDataAction.reset,

            fetchDealerParentsLovList: dealerParentLovDataActions.fetchFilteredList,
            fetchDealerLocations: applicationMasterDataActions.fetchDealerLocations,
            resetLocationData: applicationMasterDataActions.resetLocations,

            saveData: shieldSchemeSearchDataAction.saveData,
            resetData: shieldSchemeSearchDataAction.reset,
            resetDetail: shieldSchemeSearchDataAction.resetDetail,
            resetSchemeDetail: schemeDescriptionDataAction.resetDetail,
            listShowLoading: shieldSchemeSearchDataAction.listShowLoading,
            listSchemeLoading: schemeDescriptionDataAction.listShowLoading,

            fetchModelList: ProductModelGroupsDataActions.fetchList,
            listModelShowLoading: ProductModelGroupsDataActions.listShowLoading,
            resetProductData: ProductModelGroupsDataActions.reset,

            fetchModelFamilyLovList: otfModelFamilyDetailDataActions.fetchList,
            listFamilyShowLoading: otfModelFamilyDetailDataActions.listShowLoading,
            resetFamily: otfModelFamilyDetailDataActions.reset,

            fetchLocationLovList: dealerLocationsDataAction.fetchFilteredList,
            listLocationShowLoading: dealerLocationsDataAction.listShowLoading,

            showGlobalNotification,
        },
        dispatch
    ),
});

export const ShieldSchemeRegistrationMasterMain = (props) => {
    const { dealerLocationId, userId, loginUserData, invoiceStatusList, typeData, data, showGlobalNotification, totalRecords, moduleTitle, fetchList, fetchDetail, fetchSchemeDescription, fetchEmployeeList, fetchManagerList, saveData, listShowLoading, listSchemeLoading, listEmployeeShowLoading, setFilterString, filterString, detailShieldData, resetDetail, resetSchemeDetail, isEmployeeDataLoaded, isEmployeeDataLoading, isSchemeLoading, employeeData, managerData, schemeDetail, fetchDealerParentsLovList, dealerParentsLovList, fetchDealerLocations, dealerLocations } = props;
    const { resetLocationData, fetchModelFamilyLovList, listFamilyShowLoading, modelFamilyData, fetchModelList, listModelShowLoading, ProductHierarchyData, locations, fetchLocationLovList, listLocationShowLoading } = props;

    const [selectedOrder, setSelectedOrder] = useState();
    const [selectedOrderId, setSelectedOrderId] = useState();
    const [section, setSection] = useState();
    const [defaultSection, setDefaultSection] = useState();
    const [currentSection, setCurrentSection] = useState();
    const [previousSection, setPreviousSection] = useState(1);
    const [sectionName, setSetionName] = useState();
    const [isLastSection, setLastSection] = useState(false);
    const [userType, setUserType] = useState('');
    const [amcStatus, setAmcStatus] = useState();
    const [isMNMApproval, setIsMNMApproval] = useState(false);
    const [isAdvanceSearchVisible, setAdvanceSearchVisible] = useState(false);
    const [vehicleCustomerDetailsOnly, setVehicleCustomeDetailsOnly] = useState({});

    const dynamicPagination = true;

    const [showDataLoading, setShowDataLoading] = useState(true);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [confirmRequest, setConfirmRequest] = useState(false);
    const [cancelSchemeVisible, setCancelSchemeVisible] = useState(false);
    const [searchValue, setSearchValue] = useState();
    const [vinNumber, setVinNumber] = useState();
    const [saleType, setSaleType] = useState();
    const [bookingNumber, setBookingNumber] = useState();
    const [amcWholeCancellation, setAmcWholeCancellation] = useState(false);
    const [rejectRequest, setRejectRequest] = useState(false);
    const [status, setStatus] = useState();
    const [selectedCardData, setSelectedCardData] = useState();

    const [additionalReportParams, setAdditionalReportParams] = useState();
    const [isReportVisible, setReportVisible] = useState();
    const [reportButtonType, setReportButtonType] = useState();
    const [shieldDocumentType, setShieldDocumentType] = useState();
    const [requestPayload, setRequestPayload] = useState({ registrationDetails: {}, vehicleAndCustomerDetails: {} });

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
        cancelSchemeBtn: false,
        printReceiptBtn: false,
    };

    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });

    const defaultFormActionType = { addMode: false, editMode: false, viewMode: false };
    const [formActionType, setFormActionType] = useState({ ...defaultFormActionType });

    const [form] = Form.useForm();
    const [searchForm] = Form.useForm();
    const [advanceFilterForm] = Form.useForm();
    const [shieldDetailForm] = Form.useForm();
    // const [registrationForm] = Form.useForm();
    // const [schemeForm] = Form.useForm();
    const [vehicleCustomerForm] = Form.useForm();
    const [vehicleDetailForm] = Form.useForm();
    const [customerDetailForm] = Form.useForm();

    const [cancelSchemeForm] = Form.useForm();

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

    const onSuccessAction = (res) => {
        // showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: res?.responseMessage });
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
                name: typeData?.[PARAM_MASTER.SHIELD_SEARCH_TYPE.id]?.find((i) => i?.key === filterString?.searchType)?.value,
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
                key: 'status',
                title: 'Status',
                value: filterString?.amcStatus || amcStatus,
                canRemove: false,
                filter: false,
            },
            {
                key: 'dealerParent',
                title: 'Dealer Parent',
                value: filterString?.dealerParent,
                name: dealerParentsLovList?.find((i) => i?.key === filterString?.dealerParent)?.value,
                canRemove: true,
                filter: true,
            },
            {
                key: 'dealerLocation',
                title: 'Dealer Location',
                value: filterString?.dealerLocation,
                name: dealerLocations?.find((i) => i?.locationId === filterString?.dealerLocation)?.dealerLocationName,
                canRemove: true,
                filter: true,
            },
            {
                key: 'pageNumber',
                title: 'Value',
                value: filterString?.current ?? 1,
                canRemove: true,
                filter: false,
            },
            {
                key: 'pageSize',
                title: 'Value',
                value: filterString?.pageSize ?? 10,
                canRemove: true,
                filter: false,
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
    }, [searchValue, amcStatus, filterString]);

    useEffect(() => {
        const defaultSection = SHIELD_REGISTRATION_SECTION.SHIELD_REGISTRATION_DETAILS.id;
        setDefaultSection(defaultSection);
        setSetionName(SHIELD_REGISTRATION_SECTION);
        setSection(defaultSection);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setFilterString({ ...filterString, pageSize: 10, current: 1 });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    useEffect(() => {
        if (currentSection && sectionName) {
            const section = Object.values(sectionName)?.find((i) => i.id === currentSection);
            setSection(section);

            const nextSection = Object.values(sectionName)?.find((i) => i?.displayOnList && i.id > currentSection);
            setLastSection(!nextSection?.id);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentSection, sectionName]);

    useEffect(() => {
        if (loginUserData?.userType) {
            if (loginUserData?.userType === AMC_CONSTANTS?.DEALER?.key) {
                setAmcStatus(QUERY_BUTTONS_CONSTANTS.PENDING.key);
                setUserType(AMC_CONSTANTS?.DEALER?.key);
                setFilterString({ ...filterString, amcStatus: QUERY_BUTTONS_CONSTANTS.PENDING.key });
            } else {
                setAmcStatus(QUERY_BUTTONS_MNM_USER.PENDING_FOR_APPROVAL.key);
                setUserType(AMC_CONSTANTS?.MNM?.key);
                setFilterString({ ...filterString, amcStatus: QUERY_BUTTONS_MNM_USER.PENDING_FOR_APPROVAL.key });
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loginUserData?.userType]);

    useEffect(() => {
        if (userId) {
            setShowDataLoading(true);
            fetchList({ setIsLoading: listShowLoading, userId, extraParams, onSuccessAction, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, filterString]);

    useEffect(() => {
        if (userId) {
            fetchDealerParentsLovList({ setIsLoading: listShowLoading, userId });
            fetchLocationLovList({ setIsLoading: listLocationShowLoading, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    useEffect(() => {
        if (userId && selectedOrderId) {
            const extraParams = [
                {
                    key: 'id',
                    title: 'id',
                    value: selectedOrderId,
                    name: 'id',
                },
            ];
            fetchDetail({ setIsLoading: listShowLoading, userId, customURL: BASE_URL_SHIELD_REGISTRATION, extraParams, onSuccessAction, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, selectedOrderId]);

    useEffect(() => {
        if (vinNumber) {
            const extraParams = [
                {
                    key: 'vin',
                    title: 'vin',
                    value: vinNumber,
                    name: 'vin',
                },
            ];
            fetchSchemeDescription({ setIsLoading: listSchemeLoading, userId, extraParams, onSuccessAction, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, vinNumber]);

    useEffect(() => {
        if (detailShieldData?.vehicleAndCustomerDetails?.vehicleDetails?.modelFamily) {
            const makeExtraParams = [
                {
                    key: 'familyCode',
                    title: 'familyCode',
                    value: detailShieldData?.vehicleAndCustomerDetails?.vehicleDetails?.modelFamily,
                    name: 'familyCode',
                },
            ];
            fetchModelFamilyLovList({ setIsLoading: listFamilyShowLoading, userId, extraParams: makeExtraParams });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, detailShieldData?.vehicleAndCustomerDetails?.vehicleDetails?.modelFamily]);

    useEffect(() => {
        if (detailShieldData?.vehicleAndCustomerDetails?.vehicleDetails?.modelGroup) {
            const makeExtraParams = [
                {
                    key: 'modelGroupCode',
                    title: 'modelGroupCode',
                    value: detailShieldData?.vehicleAndCustomerDetails?.vehicleDetails?.modelGroup,
                    name: 'modelGroupCode',
                },
            ];
            fetchModelList({ setIsLoading: listModelShowLoading, userId, extraParams: makeExtraParams });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, detailShieldData?.vehicleAndCustomerDetails?.vehicleDetails?.modelGroup, dealerLocationId]);

    const handleInvoiceTypeChange = (buttonName) => {
        const key = buttonName?.key;
        setAmcStatus(key);
        searchForm.resetFields();
        setFilterString({ amcStatus: key, current: 1, pageSize: 10 });
    };

    const handleTaxChange = () => {
        const onErrorAction = (message) => {
            showGlobalNotification({ message });
        };
        const onSuccessAction = (res) => {
            shieldDetailForm?.setFieldsValue({ schemeDetails: { igstAmount: res?.data?.registrationDetails?.schemeDetails?.igstAmount, sgstAmount: res?.data?.registrationDetails?.schemeDetails?.sgstAmount, cgstAmount: res?.data?.registrationDetails?.schemeDetails?.cgstAmount, schemeTaxAmount: res?.data?.registrationDetails?.schemeDetails?.schemeTaxAmount } });
        };

        const extraParams = [
            {
                key: 'saleType',
                value: shieldDetailForm?.getFieldsValue()?.registrationInformation?.saleType,
            },
            {
                key: 'discount',
                value: shieldDetailForm?.getFieldsValue()?.schemeDetails?.schemeDiscount,
            },
            {
                key: 'schemeCode',
                value: shieldDetailForm?.getFieldsValue()?.schemeDetails?.schemeCode,
            },
            {
                key: 'familyCode',
                value: shieldDetailForm?.getFieldsValue()?.schemeDetails?.familyCode,
            },
            {
                key: 'rate',
                value: shieldDetailForm?.getFieldsValue()?.schemeDetails?.schemeBasicAmount,
            },
        ];
        if (!shieldDetailForm?.getFieldsValue()?.registrationInformation?.saleType || !shieldDetailForm?.getFieldsValue()?.schemeDetails?.schemeDescription || !shieldDetailForm?.getFieldsValue()?.schemeDetails?.schemeCode || !shieldDetailForm?.getFieldsValue()?.schemeDetails?.schemeBasicAmount) {
            showGlobalNotification({ message: translateContent('amcRegistration.validation.taxValidation'), notificationType: 'warning' });
            return false;
        } else {
            fetchDetail({ setIsLoading: listShowLoading, userId, customURL: BASE_URL_SHIELD_REGISTRATION, extraParams, onSuccessAction, onErrorAction });
        }
    };

    const handleChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleSearch = (value) => {
        setFilterString({ ...filterString, searchParam: value });
        setSearchValue(value);
    };

    const handleDealerParentChange = (value) => {
        if (!value) {
            advanceFilterForm.resetFields(['dealerLocation']);
            resetLocationData();
            return;
        }
        if (userId) {
            fetchDealerLocations({ customURL: customURL + '?dealerParentCode=' + value, setIsLoading: listShowLoading, userId });
        }
    };

    const handleButtonClick = ({ record = null, buttonAction, openDefaultSection = true }) => {
        // form.resetFields();
        // form.setFieldsValue(undefined);
        switch (buttonAction) {
            case ADD_ACTION:
                defaultSection && setCurrentSection(defaultSection);
                setPreviousSection(1);
                // partyDetailForm.resetFields();
                // setApportionList([]);
                break;
            case EDIT_ACTION:
                setSelectedOrder(record);
                record && setSelectedOrderId(record?.id);
                openDefaultSection && setCurrentSection(defaultSection);

                break;
            case VIEW_ACTION:
                setSelectedOrder(record);
                setSelectedCardData({ schemeNumber: record?.shieldRegistrationNumber, schemeDate: record?.date, status: record?.status });
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
            // setButtonData(btnVisiblity({ defaultBtnVisiblity, buttonAction, editBtn: false }));
            if (buttonAction === EDIT_ACTION) {
                setButtonData({ ...buttonData, nextBtn: true, editBtn: false, saveBtn: true });
            } else {
                const Visibility = btnVisiblity({ defaultBtnVisiblity, buttonAction });
                setButtonData(Visibility);
                // setButtonData({ ...Visibility, cancelReceiptBtn: true });
                if (buttonAction === VIEW_ACTION) {
                    amcStatus === QUERY_BUTTONS_CONSTANTS?.APPROVED?.key ? setButtonData({ ...Visibility, editBtn: false, cancelSchemeBtn: true }) : setButtonData({ ...Visibility, editBtn: false, cancelSchemeBtn: false });
                    // receiptStatus === QUERY_BUTTONS_CONSTANTS.CANCELLED.key ? setButtonData({ ...Visibility, editBtn: false, cancelReceiptBtn: false, printReceiptBtn: true }) : receiptStatus === QUERY_BUTTONS_CONSTANTS.APPORTION.key ? setButtonData({ ...Visibility, editBtn: false, cancelReceiptBtn: true, printReceiptBtn: true }) : setButtonData({ ...Visibility, editBtn: true, cancelReceiptBtn: true, printReceiptBtn: true });
                }
            }
        }
        setIsFormVisible(true);
    };

    const handleSaleTypeChange = (value) => {
        setSaleType(value);
        setVinNumber();
        setBookingNumber();
        resetDetail();
        setButtonData({ ...buttonData, formBtnActive: false });
    };

    const handleOtfSearch = (value) => {
        setBookingNumber(value);
        resetSchemeDetail();
        shieldDetailForm.setFieldsValue({
            schemeDetails: {
                schemeDescription: undefined,
                schemeCode: '',
                schemeAmount: '',
                schemeDiscount: '',
                schemeTaxAmount: '',
                schemeStartDate: '',
                schemeEndDate: '',
                id: '',
            },
        });
        if (value) {
            const onSuccessAction = (res) => {
                setVinNumber(res?.data?.vehicleAndCustomerDetails?.vehicleDetails?.vin);
                setVehicleCustomeDetailsOnly(res?.data);
                showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: res?.responseMessage });
            };
            const extraParams = [
                {
                    key: 'otfNumber',
                    title: 'otfNumber',
                    value: value,
                    name: 'otfNumber',
                },
            ];
            fetchDetail({ setIsLoading: listShowLoading, userId, customURL: BASE_URL_SHIELD_REGISTRATION, extraParams, onSuccessAction, onErrorAction });
        }
    };

    const handleVinSearch = (value) => {
        const onSuccessAction = (res) => {
            setVehicleCustomeDetailsOnly(res?.data);
        };
        setVinNumber(value);
        resetSchemeDetail();
        shieldDetailForm.setFieldsValue({
            schemeDetails: {
                schemeDescription: undefined,
                schemeCode: '',
                schemeBasicAmount: '',
                schemeDiscount: '',
                schemeTaxAmount: '',
                schemeStartDate: '',
                schemeEndDate: '',
                id: '',
            },
        });
        if (value) {
            const extraParams = [
                {
                    key: 'vin',
                    title: 'vin',
                    value: value,
                    name: 'vin',
                },
            ];
            fetchDetail({ setIsLoading: listShowLoading, userId, customURL: BASE_URL_SHIELD_REGISTRATION, extraParams, onSuccessAction, onErrorAction });
        }
    };

    const handleEmployeeSearch = (value) => {
        if (value) {
            const extraParams = [
                {
                    key: 'searchParam',
                    value: value,
                },
            ];
            fetchEmployeeList({ setIsLoading: listEmployeeShowLoading, userId, extraParams, onSuccessAction, onErrorAction });
        }
    };

    const onFinish = ({ type = null }) => {
        const data = { ...requestPayload, registrationDetails: requestPayload?.registrationDetails, vehicleAndCustomerDetails: requestPayload?.vehicleAndCustomerDetails };
        const onSuccess = (res) => {
            form.resetFields();
            shieldDetailForm.resetFields();
            setBookingNumber();
            setVinNumber();
            setShowDataLoading(true);
            // showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
            fetchList({ setIsLoading: listShowLoading, userId, onSuccessAction, extraParams });
            setButtonData({ ...buttonData, formBtnActive: false });
            setSelectedOrder({ ...selectedOrder, res });
            setSelectedCardData({ schemeNumber: res?.data?.registrationDetails?.registrationInformation?.schemeRegistrationNumber, schemeDate: res?.data?.registrationDetails?.registrationInformation?.registrationDate, status: res?.data?.registrationDetails?.registrationInformation?.status });
            // setSelectedOrderId(res?.id);
            setCurrentSection(SHIELD_REGISTRATION_SECTION?.THANK_YOU_PAGE?.id);
        };

        const onError = (message) => {
            showGlobalNotification({ message });
        };

        const requestData = {
            data: data,
            method: 'post',
            customURL: BASE_URL_SHIELD_REGISTRATION,
            setIsLoading: listShowLoading,
            userId,
            onError,
            errorData: true,
            onSuccess,
        };

        saveData(requestData);
    };

    const onCloseAction = () => {
        setSelectedCardData();
        resetDetail();
        resetSchemeDetail();
        cancelSchemeForm.resetFields();

        form.resetFields();
        form.setFieldsValue();
        shieldDetailForm.resetFields();
        // registrationForm.resetFields();
        // schemeForm.resetFields();
        vehicleCustomerForm.resetFields();
        vehicleDetailForm.resetFields();
        customerDetailForm.resetFields();
        setSelectedOrderId();

        advanceFilterForm.resetFields();
        advanceFilterForm.setFieldsValue();
        setAdvanceSearchVisible(false);

        setSelectedOrder();
        setIsFormVisible(false);
        setBookingNumber();
        setVinNumber();
        // setCancelReceiptVisible(false);
        setButtonData({ ...defaultBtnVisiblity });
        setRequestPayload();
    };

    const tableProps = {
        dynamicPagination,
        totalRecords,
        setPage: setFilterString,
        page: filterString,
        tableColumn: tableColumn({ handleButtonClick, userType, locations }),
        tableData: data,
        showAddButton: true,
        filterString,
    };

    const ADD_ACTION = FROM_ACTION_TYPE?.ADD;
    const EDIT_ACTION = FROM_ACTION_TYPE?.EDIT;
    const VIEW_ACTION = FROM_ACTION_TYPE?.VIEW;

    const handleAdd = () => handleButtonClick({ buttonAction: FROM_ACTION_TYPE?.ADD });

    const onAdvanceSearchCloseAction = () => {
        form.resetFields();
        advanceFilterForm.resetFields();
        advanceFilterForm.setFieldsValue();
        setAdvanceSearchVisible(false);
    };

    const handleResetFilter = (e) => {
        setShowDataLoading(false);
        setFilterString({ amcStatus: filterString?.amcStatus });
        advanceFilterForm.resetFields();
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

    const rejectModalCloseAction = () => {
        setCancelSchemeVisible(false);
        setAmcWholeCancellation(false);
        setRejectRequest(false);
        setIsMNMApproval(false);
        cancelSchemeForm.resetFields();
    };
    const handleWholeSchemeCancellation = () => {
        setCancelSchemeVisible(true);
        setAmcWholeCancellation(true);
        setStatus(QUERY_BUTTONS_CONSTANTS?.CANCELLED?.key);
    };
    const handleCancelRequest = () => {
        setCancelSchemeVisible(true);
        setAmcWholeCancellation(false);
        setStatus(QUERY_BUTTONS_CONSTANTS?.CANCELLED?.key);
    };
    const handleMNMApproval = () => {
        setCancelSchemeVisible(true);
        setAmcWholeCancellation(false);
        setIsMNMApproval(true);
        setStatus(QUERY_BUTTONS_CONSTANTS?.APPROVED?.key);
    };
    const handleMNMRejection = () => {
        setCancelSchemeVisible(true);
        setAmcWholeCancellation(false);
        setIsMNMApproval(false);
        setStatus(QUERY_BUTTONS_CONSTANTS?.REJECTED?.key);
    };

    const handleRequest = (value) => {
        value?.buttonAction === REQUEST_CONSTANT?.Reject?.value ? handleMNMRejection() : handleMNMApproval();
    };

    const handleCancelRequests = () => {
        cancelSchemeForm
            .validateFields()
            .then(() => {
                if (isMNMApproval) {
                    handleCancelScheme();
                } else if (rejectRequest && amcWholeCancellation) {
                    handleCancelScheme();
                } else if (!isMNMApproval && userType === AMC_CONSTANTS?.MNM?.key && rejectRequest) {
                    handleCancelScheme();
                } else if (!isMNMApproval && userType === AMC_CONSTANTS?.MNM?.key) {
                    setRejectRequest(true);
                } else if (amcWholeCancellation) {
                    setRejectRequest(true);
                } else {
                    handleCancelScheme();
                }
            })
            .catch(() => {
                return;
            });
    };

    const handleCancelScheme = () => {
        const data = { id: detailShieldData?.id, customerName: '', shieldRegistrationDate: detailShieldData?.registrationDetails?.registrationDate, userId: userId, status: status, ...cancelSchemeForm.getFieldsValue() };
        const onSuccess = (res) => {
            form.resetFields();
            setShowDataLoading(true);
            showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: res?.responseMessage });
            fetchList({ setIsLoading: listShowLoading, userId, onSuccessAction, extraParams });
            setButtonData({ ...buttonData, formBtnActive: false });
            setCancelSchemeVisible(false);
            setIsFormVisible(false);
            cancelSchemeForm.resetFields();
            setRejectRequest(false);
            setIsMNMApproval(false);
            setAmcWholeCancellation(false);
        };

        const onError = (message) => {
            showGlobalNotification({ message });
        };

        const requestData = {
            data: data,
            method: 'put',
            customURL: BASE_URL_SHIELD_REGISTRATION,
            setIsLoading: listShowLoading,
            userId,
            onError,
            errorData: true,
            onSuccess,
        };

        saveData(requestData);
    };

    const handlePrintDownload = (record) => {
        let typeRecordKey = record?.typeRecord === SHIELD_REPORT_DOCUMENT_TYPE?.INVOICE_SHIELD?.value ? SHIELD_REPORT_DOCUMENT_TYPE?.INVOICE_SHIELD?.key : record?.typeRecord === SHIELD_REPORT_DOCUMENT_TYPE?.REGISTRATION_CERTIFICATE_SHIELD?.value ? SHIELD_REPORT_DOCUMENT_TYPE?.REGISTRATION_CERTIFICATE_SHIELD?.key : record?.typeRecord === SHIELD_REPORT_DOCUMENT_TYPE?.REGISTRATION_INCENTIVE_CLAIM_SHIELD?.value ? SHIELD_REPORT_DOCUMENT_TYPE?.REGISTRATION_INCENTIVE_CLAIM_SHIELD?.key : null;
        setReportButtonType(record?.typeRecord);
        setReportVisible(true);
        setAdditionalReportParams([
            {
                key: typeRecordKey,
                value: record?.id ? record?.id : record?.res?.data?.id,
            },
        ]);
    };

    const modalTitle = useMemo(() => {
        switch (true) {
            case userType === AMC_CONSTANTS?.DEALER?.key: {
                switch (true) {
                    case amcWholeCancellation: {
                        return AMC_REQUEST_TITLE_CONSTANTS?.DEALER_AMC_CANCELLATION?.key;
                    }
                    default:
                        return AMC_REQUEST_TITLE_CONSTANTS?.DEALER_REQUEST_CANCELLATION?.key;
                }
            }
            case userType === AMC_CONSTANTS?.MNM?.key: {
                switch (true) {
                    case isMNMApproval: {
                        return AMC_REQUEST_TITLE_CONSTANTS?.MNM_REQUEST_APPROVAL?.key;
                    }
                    default:
                        return AMC_REQUEST_TITLE_CONSTANTS?.MNM_REQUEST_REJECTION?.key;
                }
            }

            default:
                return AMC_REQUEST_TITLE_CONSTANTS?.DEALER_AMC_CANCELLATION?.key;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cancelSchemeVisible]);

    const advanceFilterResultProps = {
        extraParams,
        removeFilter,
        amcStatus,
        invoiceStatusList,
        advanceFilter: true,
        otfFilter: true,
        filterString,
        setFilterString,
        // from: listFilterForm,

        // onFinishFailed,
        handleResetFilter,
        advanceFilterForm,
        handleButtonClick,
        handleChange,
        handleSearch,
        handleInvoiceTypeChange,

        // title,
        data,
        setAdvanceSearchVisible,
        typeData,
        searchForm,
        // onFinishSearch,
        // userType,
        showAddButton: loginUserData?.userType === AMC_CONSTANTS?.DEALER?.key,
        userType,
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
        invoiceStatusList,
        typeData,
        dealerParentsLovList,
        dealerLocations,
        handleDealerParentChange,
        // onFinishSearch,
        userType,
    };

    const cancelModalProps = {
        isVisible: cancelSchemeVisible,
        cancelSchemeForm,
        onCloseAction: rejectModalCloseAction,
        titleOverride: modalTitle?.titleOverride,
        amcCancellationText: modalTitle?.amcCancellationText,
        buttonText: modalTitle?.buttonText,
        amcWholeCancellation,
        rejectRequest,
        handleCancelScheme,
        handleCancelRequests,
        rejectModalCloseAction,
        typeData,
        isMNMApproval,
        setIsMNMApproval,
        userType,
    };

    const containerProps = {
        userType,
        userId,
        record: selectedOrder,
        form,
        shieldDetailForm,
        // registrationForm,
        // schemeForm,
        vehicleCustomerForm,
        vehicleDetailForm,
        customerDetailForm,
        formActionType,
        setFormActionType,
        resetDetail,
        onFinalSubmit: onFinish,
        // onFinishFailed,
        isVisible: isFormVisible,
        onCloseAction,
        titleOverride: drawerTitle(formActionType).concat(' ').concat(moduleTitle),
        isSchemeLoading,
        ADD_ACTION,
        EDIT_ACTION,
        VIEW_ACTION,
        NEXT_ACTION,
        buttonData,
        setShowDataLoading,
        requestPayload,
        setRequestPayload,
        handleCancelRequest,

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
        // handleFormValueChange,
        isLastSection,
        typeData,
        handlePrintDownload,
        saveButtonName: isLastSection ? translateContent('global.buttons.submit') : translateContent('global.buttons.saveAndNext'),
        setLastSection,
        // showCancelConfirm,
        confirmRequest,
        setConfirmRequest,
        handleWholeSchemeCancellation,
        handleCancelScheme,
        handleMNMApproval,
        handleMNMRejection,
        handleRequest,
        // showCancelSchemeConfirm,
        saleType,
        detailShieldData,
        registrationDetails: detailShieldData?.registrationDetails,
        vehicleCustomerDetails: formActionType?.viewMode ? detailShieldData?.vehicleAndCustomerDetails : vehicleCustomerDetailsOnly?.vehicleAndCustomerDetails,
        requestDetails: detailShieldData?.requestDetails,
        workflowDetails: detailShieldData?.workflowMasterDetails,
        handleSaleTypeChange,
        handleOtfSearch,
        handleVinSearch,
        handleEmployeeSearch,
        vinNumber,
        setVinNumber,
        bookingNumber,
        setBookingNumber,
        isEmployeeDataLoaded,
        isEmployeeDataLoading,
        employeeData,
        schemeDetail,
        FormActionButton: VehicleReceiptFormButton,
        previousSection,
        setPreviousSection,
        setSection,
        fetchEmployeeList,
        listEmployeeShowLoading,
        fetchManagerList,
        managerData,
        modelFamilyData,
        ProductHierarchyData,
        filterString,
        amcStatus,
        handleTaxChange,
        selectedCardData,
    };

    useEffect(() => {
        setShieldDocumentType();
        if (reportButtonType === SHIELD_REPORT_DOCUMENT_TYPE?.INVOICE_SHIELD?.value) {
            setShieldDocumentType(EMBEDDED_REPORTS?.SHIELD_REGISTRATION_INVOICE_DOCUMENT);
        } else if (reportButtonType === SHIELD_REPORT_DOCUMENT_TYPE?.REGISTRATION_CERTIFICATE_SHIELD?.value) {
            setShieldDocumentType(EMBEDDED_REPORTS?.SHIELD_REGISTRATION_CERTIFICATE_DOCUMENT);
        } else if (reportButtonType === SHIELD_REPORT_DOCUMENT_TYPE?.REGISTRATION_INCENTIVE_CLAIM_SHIELD?.value) {
            setShieldDocumentType(EMBEDDED_REPORTS?.SHIELD_REGISTRATION_INVOICE_DOCUMENT);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reportButtonType]);

    const reportDetail = shieldDocumentType;
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
            <AdvancedSearch {...advanceFilterProps} />
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <ListDataTable isLoading={showDataLoading || !typeData[PARAM_MASTER?.AMC_REG_APRVL_STAT?.id]?.length} handleButtonClick={handleAdd} {...tableProps} showAddButton={false} />
                </Col>
            </Row>
            <ShieldSchemeMainConatiner {...containerProps} />
            <CancelScheme {...cancelModalProps} />
            <ReportModal {...reportProps} reportDetail={reportDetail} />
        </>
    );
};

export const ShieldSchemeRegistrationMaster = connect(mapStateToProps, mapDispatchToProps)(ShieldSchemeRegistrationMasterMain);
