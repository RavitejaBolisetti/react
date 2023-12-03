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
import AdvanceFilter from './AdvanceFilter';
import { RSAMainConatiner } from './RSAMainConatiner';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { NEXT_ACTION, btnVisiblity } from 'utils/btnVisiblity';
import { convertDateTime, dateFormatView } from 'utils/formatDateTime';
import { ReportModal } from 'components/common/ReportModal/ReportModal';
import { RSA_DOCUMENT_TYPE } from '../../Services/ShieldSchemeRegistartion/utils/rsaReportType';
import { EMBEDDED_REPORTS } from 'constants/EmbeddedReports';
import { BASE_URL_SHIELD_REGISTRATION } from 'constants/routingApi';
import { BASE_URL_GET_REGISTRATION_DETAILS as customeURL, BASE_URL_SCHEME_RSA_DESCRIPTION } from 'constants/routingApi';
import { showGlobalNotification } from 'store/actions/notification';
import { shieldSchemeSearchDataAction } from 'store/actions/data/services/shieldSchemeSearch';
import { rsaRegistrationDataAction } from 'store/actions/data/sales/rsaRegistration';
import { schemeDescriptionDataAction } from 'store/actions/data/services/schemeDescriptionLov';
import { employeeSearchDataAction } from 'store/actions/data/amcRegistration/employeeSearch';
import { dealerParentLovDataActions } from 'store/actions/data/dealer/dealerParentsLov';
import { applicationMasterDataActions } from 'store/actions/data/applicationMaster';
import { ListDataTable } from 'utils/ListDataTable';
import { QUERY_BUTTONS_CONSTANTS, QUERY_BUTTONS_MNM_USER } from 'components/Services/ShieldSchemeRegistartion/utils/ShieldRegistrationContant';
import { AMC_CONSTANTS } from 'components/Services/ShieldSchemeRegistartion/utils/AMCConstants';
import { RSA_REGISTRATION_STATUS, RSA_REGISTRATION_STATUS_MNM_USER } from './utils/RSARegistrationStatus';
import { CancelScheme } from 'components/Services/ShieldSchemeRegistartion/CancelScheme';
import { PARAM_MASTER } from 'constants/paramMaster';
import { AdvancedSearch } from './AdvancedSearch';
import { VehicleReceiptFormButton } from 'components/Services/ShieldSchemeRegistartion/VehicleReceiptFormButton';
import { ConfirmationModal } from 'utils/ConfirmationModal';
import { BASE_URL_APPLICATION_DEALER_LOCATION as customURL } from 'constants/routingApi';
import { RSA_LEFTMENU_SECTION } from 'components/Sales/RSARegistration/constant/RSALeftMenuSection';
import { drawerTitle } from 'utils/drawerTitle';
import { translateContent } from 'utils/translateContent';
import { ProductModelGroupsDataActions } from 'store/actions/data/VehicleModelTaxChargesCategory/productModelGroup';
import { otfModelFamilyDetailDataActions } from 'store/actions/data/otf/modelFamily';
import { dealerLocationsDataAction } from 'store/actions/data/amcRegistration/dealerLocations';
import { RSA_REQUEST_TITLE_CONSTANTS } from './utils/RSARequestTitleConstant';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            Sales: {
                RSARegistration: { data, detailData: rsaDetails, filter: filterString },
            },
            ShieldSchemeRegistration: {
                ShieldSchemeSearch: { isLoaded: isSearchDataLoaded = false, isLoading: isSearchLoading, detailData: detailShieldData = [] },
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

    const moduleTitle = 'RSA Registration';

    let returnValue = {
        userId,
        isDataLoaded: true,
        data: data?.paginationData,
        totalRecords: data?.totalRecords || [],
        invoiceStatusList: loginUserData?.userType === AMC_CONSTANTS?.DEALER?.key ? Object.values(RSA_REGISTRATION_STATUS) : Object.values(RSA_REGISTRATION_STATUS_MNM_USER),
        rsaDetails,
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
        schemeDetail,
        filterString,
        typeData,
        loginUserData,
        isModelFamilyDataLoaded,
        isModelFamilyLoading,
        modelFamilyData,
        isProductHierarchyDataLoaded,
        isProductHierarchyDataLoading,
        ProductHierarchyData,
        dealerParentsLovList,
        dealerLocations,

        locations,
        dealerLocationId,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: rsaRegistrationDataAction.fetchList,
            fetchDetail: rsaRegistrationDataAction.fetchDetail,
            fetchDetailByVINNOTF: shieldSchemeSearchDataAction.fetchDetail,
            setFilterString: rsaRegistrationDataAction.setFilter,

            fetchSchemeDescription: schemeDescriptionDataAction.fetchDetail,
            fetchEmployeeList: employeeSearchDataAction.fetchList,
            fetchManagerList: employeeSearchDataAction.fetchDetail,

            listEmployeeShowLoading: employeeSearchDataAction.listShowLoading,
            saveData: rsaRegistrationDataAction.saveData,
            resetData: shieldSchemeSearchDataAction.reset,
            resetDetail: shieldSchemeSearchDataAction.resetDetail,
            listShowLoading: shieldSchemeSearchDataAction.listShowLoading,

            fetchModelList: ProductModelGroupsDataActions.fetchList,
            listModelShowLoading: ProductModelGroupsDataActions.listShowLoading,
            resetProductData: ProductModelGroupsDataActions.reset,

            fetchModelFamilyLovList: otfModelFamilyDetailDataActions.fetchList,
            listFamilyShowLoading: otfModelFamilyDetailDataActions.listShowLoading,
            resetFamily: otfModelFamilyDetailDataActions.reset,

            fetchLocationLovList: dealerLocationsDataAction.fetchFilteredList,
            listLocationShowLoading: dealerLocationsDataAction.listShowLoading,

            fetchDealerParentsLovList: dealerParentLovDataActions.fetchFilteredList,
            fetchDealerLocations: applicationMasterDataActions.fetchDealerLocations,

            showGlobalNotification,
        },
        dispatch
    ),
});

export const RSARegistrationMasterBase = (props) => {
    const { userId, loginUserData, typeData, data, showGlobalNotification, totalRecords, moduleTitle, invoiceStatusList, fetchList, fetchDetail, fetchDetailByVINNOTF, fetchSchemeDescription, fetchEmployeeList, listShowLoading, listEmployeeShowLoading, setFilterString, filterString, rsaDetails, detailShieldData, resetDetail, isEmployeeDataLoaded, isEmployeeDataLoading, employeeData, managerData, fetchManagerList, schemeDetail, saveData } = props;
    const { dealerLocationId, fetchModelFamilyLovList, listFamilyShowLoading, modelFamilyData, fetchModelList, listModelShowLoading, ProductHierarchyData, locations, fetchLocationLovList, listLocationShowLoading, dealerParentsLovList, dealerLocations, fetchDealerParentsLovList, fetchDealerLocations } = props;

    const [selectedOrder, setSelectedOrder] = useState();
    const [selectedOrderId, setSelectedOrderId] = useState();

    const [section, setSection] = useState();
    const [defaultSection, setDefaultSection] = useState();
    const [currentSection, setCurrentSection] = useState();
    const [sectionName, setSetionName] = useState();
    const [isLastSection, setLastSection] = useState(false);
    const [userType, setUserType] = useState(AMC_CONSTANTS?.DEALER?.key);
    const [rsaStatus, setRSAStatus] = useState(QUERY_BUTTONS_CONSTANTS.PENDING.key);
    const [isMNMApproval, setIsMNMApproval] = useState(false);
    const [isAdvanceSearchVisible, setAdvanceSearchVisible] = useState(false);
    const [isRSA, setIsRSA] = useState(true);

    const dynamicPagination = true;
    const page = { pageSize: 10, current: 1 };

    const [additionalReportParams, setAdditionalReportParams] = useState();
    const [isReportVisible, setReportVisible] = useState();
    const [reportButtonType, setReportButtonType] = useState();
    const [rsaDocumentType, setRSADocumentType] = useState();
    const [showDataLoading, setShowDataLoading] = useState(true);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [confirmRequest, setConfirmRequest] = useState(false);
    const [cancelSchemeVisible, setCancelSchemeVisible] = useState(false);
    const [vinNumber, setVinNumber] = useState();
    const [saleType, setSaleType] = useState();
    const [bookingNumber, setBookingNumber] = useState();
    const [amcWholeCancellation, setAmcWholeCancellation] = useState(false);
    const [rejectRequest, setRejectRequest] = useState(false);
    const [requestPayload, setRequestPayload] = useState({ registrationDetails: {}, vehicleAndCustomerDetails: {} });
    const [status, setStatus] = useState();
    const [previousSection, setPreviousSection] = useState(1);
    const [vehicleCustomerDetailsOnly, setVehicleCustomeDetailsOnly] = useState({});
    const [selectedCardData, setSelectedCardData] = useState();

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
        cancelRSABtn: false,
        viewRSAHistoryBtn: false,
        printReceiptBtn: false,
    };

    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });

    const defaultFormActionType = { addMode: false, editMode: false, viewMode: false };
    const [formActionType, setFormActionType] = useState({ ...defaultFormActionType });

    const [form] = Form.useForm();
    const [searchForm] = Form.useForm();
    const [advanceFilterForm] = Form.useForm();
    const [shieldDetailForm] = Form.useForm();
    const [registrationForm] = Form.useForm();
    const [schemeForm] = Form.useForm();
    const [vehicleCustomerForm] = Form.useForm();
    const [vehicleDetailForm] = Form.useForm();
    const [customerDetailForm] = Form.useForm();
    const [cancelSchemeForm] = Form.useForm();

    useEffect(() => {
        if (vehicleCustomerDetailsOnly?.vehicleAndCustomerDetails?.vehicleDetails?.modelFamily || rsaDetails?.vehicleAndCustomerDetails?.vehicleDetails?.modelFamily) {
            const makeExtraParams = [
                {
                    key: 'familyCode',
                    title: 'familyCode',
                    value: vehicleCustomerDetailsOnly?.vehicleAndCustomerDetails?.vehicleDetails?.modelFamily || rsaDetails?.vehicleAndCustomerDetails?.vehicleDetails?.modelFamily,
                    name: 'familyCode',
                },
            ];
            fetchModelFamilyLovList({ setIsLoading: listFamilyShowLoading, userId, extraParams: makeExtraParams });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, vehicleCustomerDetailsOnly?.vehicleAndCustomerDetails?.vehicleDetails?.modelFamily, rsaDetails]);

    useEffect(() => {
        if ((vehicleCustomerDetailsOnly?.vehicleAndCustomerDetails?.vehicleDetails?.modelGroup || rsaDetails?.vehicleAndCustomerDetails?.vehicleDetails?.modelFamily) && dealerLocationId) {
            const makeExtraParams = [
                {
                    key: 'modelGroupCode',
                    title: 'modelGroupCode',
                    value: vehicleCustomerDetailsOnly?.vehicleAndCustomerDetails?.vehicleDetails?.modelGroup || rsaDetails?.vehicleAndCustomerDetails?.vehicleDetails?.modelFamily,
                    name: 'modelGroupCode',
                },
            ];
            fetchModelList({ setIsLoading: listModelShowLoading, userId, extraParams: makeExtraParams });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, vehicleCustomerDetailsOnly?.vehicleAndCustomerDetails?.vehicleDetails?.modelGroup, rsaDetails, dealerLocationId]);

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
                name: typeData?.[PARAM_MASTER.RSA_SEARCH_TYPE.id]?.find((i) => i?.key === filterString?.searchType)?.value,
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
                key: 'status',
                title: 'Status',
                value: filterString?.rsaStatus || rsaStatus,
                canRemove: false,
                filter: false,
            },
            {
                key: 'pageNumber',
                title: 'Value',
                value: filterString?.current || page?.current,
                canRemove: true,
                filter: false,
            },
            {
                key: 'pageSize',
                title: 'Value',
                value: filterString?.pageSize || page?.pageSize,
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
    }, [filterString, rsaStatus]);

    useEffect(() => {
        const defaultSection = RSA_LEFTMENU_SECTION.RSA_REGISTRATION_DETAILS.id;
        setDefaultSection(defaultSection);
        setSetionName(RSA_LEFTMENU_SECTION);
        setSection(defaultSection);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (loginUserData?.userType) {
            if (loginUserData?.userType === AMC_CONSTANTS?.DEALER?.key) {
                setRSAStatus(RSA_REGISTRATION_STATUS.PENDING.key);
                setUserType(AMC_CONSTANTS?.DEALER?.key);
                setFilterString({ ...filterString, rsaStatus: RSA_REGISTRATION_STATUS.PENDING.key });
            } else {
                setRSAStatus(QUERY_BUTTONS_MNM_USER.PENDING_FOR_APPROVAL.key);
                setUserType(AMC_CONSTANTS?.MNM?.key);
                setFilterString({ ...filterString, rsaStatus: QUERY_BUTTONS_MNM_USER.PENDING_FOR_APPROVAL.key });
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loginUserData?.userType]);

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
        if (userType !== AMC_CONSTANTS?.DEALER?.key) {
            setUserType(AMC_CONSTANTS?.MNM?.key);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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

    const handleDealerParentChange = (value) => {
        if (userId) {
            fetchDealerLocations({ customURL: customURL + '?dealerParentCode=' + value, setIsLoading: listShowLoading, userId });
        }
    };

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
            fetchDetail({ setIsLoading: listShowLoading, userId, customURL: customeURL, extraParams, onSuccessAction, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, selectedOrderId]);

    const handleInvoiceTypeChange = (buttonName) => {
        const key = buttonName?.key;
        searchForm.resetFields();
        setFilterString({ status: key, current: 1, pageSize: 10 });
        setRSAStatus(key);
    };

    const handleSearch = (value) => {
        setFilterString({ ...filterString, searchParam: value });
    };

    const handleButtonClick = ({ record = null, buttonAction, openDefaultSection = true }) => {
        switch (buttonAction) {
            case ADD_ACTION:
                defaultSection && setCurrentSection(defaultSection);
                setPreviousSection(1);
                setButtonData({ ...buttonData, saveAndNewBtn: true });
                setIsFormVisible(true);
                break;
            case VIEW_ACTION:
                setSelectedOrder(record);
                setSelectedCardData(record);
                record && setSelectedOrderId(record?.id);
                defaultSection && setCurrentSection(defaultSection);
                setIsFormVisible(true);
                break;
            case NEXT_ACTION:
                const nextSection = Object.values(sectionName)?.find((i) => i.id > currentSection);
                section && setCurrentSection(nextSection?.id);
                setLastSection(!nextSection?.id);
                setPreviousSection(nextSection?.id);
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
                    if (userType === AMC_CONSTANTS?.DEALER?.key) {
                        rsaStatus === QUERY_BUTTONS_CONSTANTS.APPROVED.key ? setButtonData({ ...Visibility, saveBtn: false, cancelSchemeBtn: true }) : rsaStatus === QUERY_BUTTONS_CONSTANTS.CANCELLED.key ? setButtonData({ ...Visibility }) : setButtonData({ ...Visibility });
                    } else {
                        rsaStatus === QUERY_BUTTONS_MNM_USER.PENDING_FOR_APPROVAL.key ? setButtonData({ ...Visibility }) : rsaStatus === QUERY_BUTTONS_MNM_USER.PENDING_FOR_CANCELLATION.key ? setButtonData({ ...Visibility }) : setButtonData({ ...Visibility });
                    }
                }
            }
        }
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
        if (value) {
            const onSuccessAction = (res) => {
                setVehicleCustomeDetailsOnly(res?.data);
                setVinNumber(res?.data?.vehicleAndCustomerDetails?.vehicleDetails?.vin);
                showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
            };
            const extraParams = [
                {
                    key: 'otfNumber',
                    title: 'otfNumber',
                    value: value,
                    name: 'otfNumber',
                },
            ];
            fetchDetailByVINNOTF({ setIsLoading: listShowLoading, userId, customURL: BASE_URL_SHIELD_REGISTRATION, extraParams, onSuccessAction, onErrorAction });
        }
    };

    const handleVinSearch = (value) => {
        const onSuccessAction = (res) => {
            setVehicleCustomeDetailsOnly(res?.data);
        };
        setVinNumber(value);
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
            const extraParams = [
                {
                    key: 'vin',
                    title: 'vin',
                    value: value,
                    name: 'vin',
                },
            ];
            fetchDetailByVINNOTF({ setIsLoading: listShowLoading, userId, customURL: BASE_URL_SHIELD_REGISTRATION, extraParams, onSuccessAction, onErrorAction });
        }
    };

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
            fetchSchemeDescription({ setIsLoading: listShowLoading, userId, customURL: BASE_URL_SCHEME_RSA_DESCRIPTION, extraParams, onSuccessAction, onErrorAction });
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, vinNumber]);

    const onFinish = ({ type = null }) => {
        const data = { ...requestPayload, rsaRegistrationDetails: { ...requestPayload?.registrationDetails, registrationInformation: { ...requestPayload?.registrationDetails?.registrationInformation, employeeCode: requestPayload?.registrationDetails?.registrationInformation?.employeeName, managerCode: requestPayload?.registrationDetails?.registrationInformation?.managerName } }, vehicleAndCustomerDetails: requestPayload?.vehicleAndCustomerDetails };
        delete data?.registrationDetails;
        delete data?.rsaRegistrationDetails?.registrationInformation?.employeeName;
        delete data?.rsaRegistrationDetails?.registrationInformation?.managerName;
        const onSuccess = (res) => {
            form.resetFields();
            shieldDetailForm.resetFields();
            setBookingNumber();
            setVinNumber();
            setShowDataLoading(true);
            fetchList({ setIsLoading: listShowLoading, userId, onSuccessAction, extraParams });
            setButtonData({ ...buttonData, formBtnActive: false });
            setSelectedCardData({ rsaRegistrationNumber: res?.data?.rsaRegistrationNumber, rsaRegistrationDate: res?.data?.rsaRegistrationDetails?.registrationInformation?.rsaRegistrationDate, status: res?.data?.rsaRegistrationDetails?.registrationInformation?.rsaRegistrationDate?.rsaStatus });
            setSelectedOrder({ ...selectedOrder, res });
            setCurrentSection(RSA_LEFTMENU_SECTION?.THANK_YOU_PAGE?.id);
        };

        const onError = (message, errorData, errorSection) => {
            showGlobalNotification({ message });
        };

        const requestData = {
            data: data,
            method: 'post',
            setIsLoading: listShowLoading,
            userId,
            onError,
            errorData: true,
            onSuccess,
            customURL: customeURL,
        };

        saveData(requestData);
    };

    const onCloseAction = () => {
        setSelectedCardData();

        resetDetail();
        form.resetFields();
        setVinNumber();
        setSelectedOrder();

        // shieldDetailForm.setFieldsValue({ registrationForm: null, schemeForm: null });
        // vehicleCustomerForm.setFieldsValue({ vehicleDetailForm: null, customerDetailForm: null });

        cancelSchemeForm.resetFields();

        shieldDetailForm.resetFields();
        // registrationForm.resetFields();
        // schemeForm.resetFields();
        vehicleCustomerForm.resetFields();
        vehicleDetailForm.resetFields();
        customerDetailForm.resetFields();
        setSelectedOrderId();

        advanceFilterForm.resetFields();
        setAdvanceSearchVisible(false);

        setSelectedOrder();
        setBookingNumber();
        setIsFormVisible(false);
        setButtonData({ ...defaultBtnVisiblity });
        setRequestPayload();
    };

    const tableProps = {
        dynamicPagination,
        totalRecords,
        setPage: setFilterString,
        page: filterString,
        tableColumn: tableColumn({ handleButtonClick, typeData, userType, locations }),
        tableData: data,
        showAddButton: true,
        filterString,
    };

    const ADD_ACTION = FROM_ACTION_TYPE?.ADD;
    const EDIT_ACTION = FROM_ACTION_TYPE?.EDIT;
    const VIEW_ACTION = FROM_ACTION_TYPE?.VIEW;

    const handleCancelScheme = () => {
        const data = { ...rsaDetails, requestDetails: { ...rsaDetails?.requestDetails, rsaStatus: status, ...cancelSchemeForm.getFieldsValue() }, id: rsaDetails?.id, customerName: '', rsaRegistrationDate: rsaDetails?.rsaRegistrationDetails?.registrationInformation?.rsaRegistrationDate, userId: userId };

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
            customURL: customeURL,
            setIsLoading: listShowLoading,
            userId,
            onError,
            errorData: true,
            onSuccess,
        };

        saveData(requestData);
    };

    const onAdvanceSearchCloseAction = () => {
        form.resetFields();
        advanceFilterForm.resetFields();
        advanceFilterForm.setFieldsValue();
        setAdvanceSearchVisible(false);
    };

    const handleResetFilter = (e) => {
        setShowDataLoading(false);
        setFilterString();
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

    const modalTitle = useMemo(() => {
        switch (true) {
            case userType === AMC_CONSTANTS?.DEALER?.key: {
                switch (true) {
                    case amcWholeCancellation: {
                        return RSA_REQUEST_TITLE_CONSTANTS?.DEALER_AMC_CANCELLATION?.key;
                    }
                    default:
                        return RSA_REQUEST_TITLE_CONSTANTS?.DEALER_REQUEST_CANCELLATION?.key;
                }
            }
            case userType === AMC_CONSTANTS?.MNM?.key: {
                switch (true) {
                    case isMNMApproval: {
                        return RSA_REQUEST_TITLE_CONSTANTS?.MNM_REQUEST_APPROVAL?.key;
                    }
                    default:
                        return RSA_REQUEST_TITLE_CONSTANTS?.MNM_REQUEST_REJECTION?.key;
                }
            }

            default:
                return RSA_REQUEST_TITLE_CONSTANTS?.DEALER_AMC_CANCELLATION?.key;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cancelSchemeVisible]);

    const handlePrintDownload = (record) => {
        let typeRecordKey = record?.typeRecord === RSA_DOCUMENT_TYPE?.INVOICE_RSA?.value ? RSA_DOCUMENT_TYPE?.INVOICE_RSA?.key : record?.typeRecord === RSA_DOCUMENT_TYPE?.REGISTRATION_CERTIFICATE_RSA?.value ? RSA_DOCUMENT_TYPE?.REGISTRATION_CERTIFICATE_RSA?.key : record?.typeRecord === RSA_DOCUMENT_TYPE?.REGISTRATION_INCENTIVE_CLAIM_RSA?.value ? RSA_DOCUMENT_TYPE?.REGISTRATION_INCENTIVE_CLAIM_RSA?.key : null;
        setReportButtonType(record?.typeRecord);
        setReportVisible(true);
        setAdditionalReportParams([
            {
                key: typeRecordKey,
                value: record?.id ? record?.id : record?.res?.data?.id,
            },
        ]);
    };

    const handleTaxChange = () => {
        const onErrorAction = (message) => {
            showGlobalNotification({ message });
        };
        const onSuccessAction = (res) => {
            shieldDetailForm.setFieldsValue({ schemeDetails: { igstAmount: res?.data?.rsaRegistrationDetails?.schemeDetails?.igstAmount, sgstAmount: res?.data?.rsaRegistrationDetails?.schemeDetails?.sgstAmount, cgstAmount: res?.data?.rsaRegistrationDetails?.schemeDetails?.cgstAmount, schemeTaxAmount: res?.data?.rsaRegistrationDetails?.schemeDetails?.schemeTaxAmount } });
        };
        const extraParams = [
            {
                key: 'saleType',
                value: shieldDetailForm?.getFieldsValue()?.registrationInformation?.saleType,
            },
            {
                key: 'discountAmount',
                value: shieldDetailForm?.getFieldValue()?.schemeDetails?.schemeDiscount,
            },
            {
                key: 'schemeCode',
                value: shieldDetailForm?.getFieldValue()?.schemeDetails?.schemeCode,
            },
        ];
        if (!shieldDetailForm?.getFieldsValue()?.registrationInformation?.saleType || !shieldDetailForm?.getFieldsValue()?.schemeDetails?.schemeDiscount || !shieldDetailForm?.getFieldsValue()?.schemeDetails?.schemeCode) {
            showGlobalNotification({ message: translateContent('amcRegistration.validation.taxValidation'), notificationType: 'warning' });
            return false;
        } else {
            fetchDetail({ setIsLoading: listShowLoading, userId, extraParams, customURL: customeURL, onErrorAction, onSuccessAction });
        }
    };

    const advanceFilterResultProps = {
        extraParams,
        removeFilter,
        rsaStatus,
        invoiceStatusList,
        advanceFilter: true,
        otfFilter: true,
        filterString,
        setFilterString,
        setRSAStatus,
        handleResetFilter,
        advanceFilterForm,
        handleButtonClick,
        handleSearch,
        handleInvoiceTypeChange,
        formActionType,
        data,
        setAdvanceSearchVisible,
        typeData,
        searchForm,
        showAddButton: userType === AMC_CONSTANTS?.DEALER?.key ? true : false,
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

        userType,
        handleDealerParentChange,
        dealerParentsLovList,
        dealerLocations,
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
        record: selectedOrder,
        form,
        shieldDetailForm,
        registrationForm,
        schemeForm,
        vehicleCustomerForm,
        vehicleDetailForm,
        customerDetailForm,
        formActionType,
        setFormActionType,
        resetDetail,
        onFinalSubmit: onFinish,
        isVisible: isFormVisible,
        onCloseAction,
        titleOverride: drawerTitle(formActionType).concat(' ').concat(moduleTitle),
        ADD_ACTION,
        EDIT_ACTION,
        VIEW_ACTION,
        NEXT_ACTION,
        setShowDataLoading,
        requestPayload,
        setRequestPayload,
        handleCancelRequest,
        buttonData,
        setButtonData,
        handleButtonClick,
        handleMNMApproval,
        handleMNMRejection,
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
        isLastSection,
        typeData,
        saveButtonName: isLastSection ? 'Submit' : 'Save & Next',
        FormActionButton: VehicleReceiptFormButton,
        setLastSection,

        confirmRequest,
        setConfirmRequest,
        handleWholeSchemeCancellation,
        handleCancelScheme,
        // showCancelSchemeConfirm,
        handleTaxChange,
        saleType,
        rsaDetails,
        detailShieldData,
        registrationDetails: formActionType?.viewMode ? rsaDetails?.rsaRegistrationDetails : detailShieldData?.registrationInformation,
        vehicleCustomerDetails: formActionType?.viewMode ? rsaDetails?.vehicleAndCustomerDetails : vehicleCustomerDetailsOnly?.vehicleAndCustomerDetails,
        requestDetails: rsaDetails?.requestDetails,
        workflowDetails: rsaDetails?.workflowMasterDetails,
        handleSaleTypeChange,
        handleOtfSearch,
        handleVinSearch,
        modelFamilyData,
        ProductHierarchyData,
        vinNumber,
        setVinNumber,
        bookingNumber,
        setBookingNumber,
        isEmployeeDataLoaded,
        isEmployeeDataLoading,
        fetchEmployeeList,
        listEmployeeShowLoading,
        employeeData,
        managerData,
        fetchManagerList,
        schemeDetail,
        screenType: 'RSA',
        userId,
        isRSA,
        setIsRSA,
        filterString,
        rsaStatus,
        handlePrintDownload,
        setRSAStatus,
        setSection,
        previousSection,
        setPreviousSection,
        selectedCardData,
    };

    useEffect(() => {
        setRSADocumentType('');
        if (reportButtonType === RSA_DOCUMENT_TYPE?.INVOICE_RSA?.value) {
            setRSADocumentType(EMBEDDED_REPORTS?.RSA_REGISTRATION_INVOICE_DOCUMENT);
        } else if (reportButtonType === RSA_DOCUMENT_TYPE?.REGISTRATION_CERTIFICATE_RSA?.value) {
            setRSADocumentType(EMBEDDED_REPORTS?.RSA_CERTIFICATE_DOCUMENT);
        } else if (reportButtonType === RSA_DOCUMENT_TYPE?.REGISTRATION_INCENTIVE_CLAIM_RSA?.value) {
            setRSADocumentType('');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reportButtonType]);

    const reportDetail = rsaDocumentType;
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
            <AdvanceFilter {...advanceFilterResultProps} />
            <AdvancedSearch {...advanceFilterProps} />
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <ListDataTable isLoading={showDataLoading} {...tableProps} showAddButton={false} />
                </Col>
            </Row>
            <RSAMainConatiner {...containerProps} />
            <ConfirmationModal {...confirmRequest} />
            <CancelScheme {...cancelModalProps} />
            <ReportModal {...reportProps} reportDetail={reportDetail} />
        </>
    );
};

const RSARegistrationMaster = connect(mapStateToProps, mapDispatchToProps)(RSARegistrationMasterBase);
export default RSARegistrationMaster;
