/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Col, Form, Row, Empty } from 'antd';

import { tableColumn } from './tableColumn';
import AdvanceFilter from './AdvanceFilter';
import { RSAMainConatiner } from './RSAMainConatiner';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { ADD_ACTION, EDIT_ACTION, VIEW_ACTION, NEXT_ACTION, btnVisiblity } from 'utils/btnVisiblity';
import { convertDateTime, dateFormatView } from 'utils/formatDateTime';
import { ReportModal } from 'components/common/ReportModal/ReportModal';
import { RSA_DOCUMENT_TYPE } from '../../Services/ShieldSchemeRegistartion/utils/rsaReportType';
import { EMBEDDED_REPORTS } from 'constants/EmbeddedReports';
import { BASE_URL_SHIELD_REGISTRATION } from 'constants/routingApi';
import { BASE_URL_GET_REGISTRATION_DETAILS as customeURL } from 'constants/routingApi';
import { showGlobalNotification } from 'store/actions/notification';
import { shieldSchemeSearchDataAction } from 'store/actions/data/services/shieldSchemeSearch';
import { rsaRegistrationDataAction } from 'store/actions/data/sales/rsaRegistration';
import { schemeDescriptionDataAction } from 'store/actions/data/services/schemeDescriptionLov';
import { employeeSearchDataAction } from 'store/actions/data/amcRegistration/employeeSearch';
import { ListDataTable } from 'utils/ListDataTable';
import { QUERY_BUTTONS_CONSTANTS, QUERY_BUTTONS_MNM_USER } from 'components/Services/ShieldSchemeRegistartion/utils/ShieldRegistrationContant';
import { AMC_CONSTANTS } from 'components/Services/ShieldSchemeRegistartion/utils/AMCConstants';
import { RSA_REGISTRATION_STATUS, RSA_REGISTRATION_STATUS_MNM_USER } from './utils/RSARegistrationStatus';
import { AMC_REQUEST_TITLE_CONSTANTS } from 'components/Services/ShieldSchemeRegistartion/utils/AMCRequestTitleConstant';
import { CancelScheme } from 'components/Services/ShieldSchemeRegistartion/CancelScheme';
import { PARAM_MASTER } from 'constants/paramMaster';
import { AdvancedSearch } from './AdvancedSearch';
import styles from 'assets/sass/app.module.scss';
import { ConfirmationModal } from 'utils/ConfirmationModal';
import { validateRSAMenu } from './utils/validateRSAMenu';
import { RSA_LEFTMENU_SECTION } from 'components/Sales/RSARegistration/constant/RSALeftMenuSection';
import { drawerTitle } from 'utils/drawerTitle';
import { translateContent } from 'utils/translateContent';

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
            },
        },
        common: {
            Header: { data: loginUserData = [] },
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
        // receiptDetailData,
        // isLoading,
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
            showGlobalNotification,
        },
        dispatch
    ),
});

export const RSARegistrationMasterBase = (props) => {
    const { userId, loginUserData, typeData, data, showGlobalNotification, totalRecords, moduleTitle, invoiceStatusList, fetchList, fetchDetail, fetchDetailByVINNOTF, fetchSchemeDescription, fetchEmployeeList, listShowLoading, listEmployeeShowLoading, setFilterString, filterString, rsaDetails, detailShieldData, resetData, resetDetail, isEmployeeDataLoaded, isEmployeeDataLoading, employeeData, managerData, fetchManagerList, schemeDetail, saveData } = props;
    const [selectedOrder, setSelectedOrder] = useState();
    const [selectedOrderId, setSelectedOrderId] = useState();

    const [section, setSection] = useState();
    const [defaultSection, setDefaultSection] = useState();
    const [currentSection, setCurrentSection] = useState();
    const [sectionName, setSetionName] = useState();
    const [isLastSection, setLastSection] = useState(false);
    const [userType, setUserType] = useState(AMC_CONSTANTS?.DEALER?.key);
    const [amcStatus, setAmcStatus] = useState(QUERY_BUTTONS_CONSTANTS.PENDING.key);
    const [isMNMApproval, setIsMNMApproval] = useState(false);
    const [isAdvanceSearchVisible, setAdvanceSearchVisible] = useState(false);
    const [isRSA, setIsRSA] = useState(true);

    const [page, setPage] = useState({ pageSize: 10, current: 1 });
    const dynamicPagination = true;

    const [additionalReportParams, setAdditionalReportParams] = useState();
    const [isReportVisible, setReportVisible] = useState();
    const [reportButtonType, setReportButtonType] = useState();
    const [rsaDocumentType, setRSADocumentType] = useState();
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
    const [requestPayload, setRequestPayload] = useState({ registrationDetails: {}, vehicleAndCustomerDetails: {} });
    const [selectedStatusType, setSelectedStatusType] = useState();
    const [status, setStatus] = useState();

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
        if (loginUserData?.userType) {
            if (loginUserData?.userType === AMC_CONSTANTS?.DEALER?.key) {
                setSelectedStatusType(RSA_REGISTRATION_STATUS.PENDING.key);
            } else {
                setSelectedStatusType(RSA_REGISTRATION_STATUS_MNM_USER?.PENDING_FOR_APPROVAL);
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loginUserData?.userType]);

    const onSuccessAction = (res) => {
        // showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
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
                key: 'status',
                title: 'Status',
                value: selectedStatusType,
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
    }, [searchValue, selectedStatusType, filterString, page]);

    useEffect(() => {
        const defaultSection = RSA_LEFTMENU_SECTION.RSA_REGISTRATION_DETAILS.id;
        setDefaultSection(defaultSection);
        setSetionName(RSA_LEFTMENU_SECTION);
        setSection(defaultSection);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (currentSection && sectionName) {
            const section = Object.values(sectionName)?.find((i) => i.id === currentSection);
            setSection(section);

            const nextSection = Object.values(sectionName)?.find((i) => i?.displayOnList && i.id > currentSection);
            setLastSection(!nextSection?.id);
        }
        // form.resetFields();
        // form.setFieldsValue(undefined);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentSection, sectionName]);

    useEffect(() => {
        if (userType !== AMC_CONSTANTS?.DEALER?.key) {
            setUserType(AMC_CONSTANTS?.MNM?.key);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (userId && selectedStatusType) {
            setShowDataLoading(true);
            fetchList({ setIsLoading: listShowLoading, userId, extraParams, onSuccessAction, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, selectedStatusType, extraParams]);

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
        setAmcStatus(buttonName?.key);
        searchForm.resetFields();
    };

    const handleChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleSearch = (value) => {
        setFilterString({ ...filterString, searchParam: value });
        setSearchValue(value);
    };
    const buttonHandler = ({ buttonAction, formActionType: { viewMode }, buttonData, defaultBtnVisiblity }) => {
        switch (true) {
            case buttonAction === NEXT_ACTION || buttonAction === VIEW_ACTION: {
                if (viewMode) {
                    return { ...buttonData, editBtn: false, cancelRSABtn: true, viewRSAHistoryBtn: true, closeBtn: true, nextBtn: true };
                } else {
                    return { ...buttonData, editBtn: false, cancelRSABtn: false };
                }
            }
            default: {
                return { ...btnVisiblity({ defaultBtnVisiblity, buttonAction }), editBtn: false };
            }
        }
    };
    const handleButtonClick = ({ record = null, buttonAction, openDefaultSection = true }) => {
        // form.resetFields();
        // form.setFieldsValue(undefined);
        switch (buttonAction) {
            case ADD_ACTION:
                defaultSection && setCurrentSection(defaultSection);
                setCurrentSection(defaultSection);
                setButtonData({ ...buttonData, saveAndNewBtn: true });
                setIsFormVisible(true);
                break;
            case VIEW_ACTION:
                setSelectedOrder(record);
                record && setSelectedOrderId(record?.id);
                defaultSection && setCurrentSection(defaultSection);
                setIsFormVisible(true);
                // setSelectedOrder(record);
                // record && setSelectedRecordId(record?.otfId);
                // record && setSelectedOrderId(record?.otfNumber);
                // record && setSelectedBookingId(record?.bookingNumber);
                // defaultSection && setCurrentSection(defaultSection);
                break;
            case NEXT_ACTION:
                const nextSection = Object.values(sectionName)?.find((i) => validateRSAMenu({ item: i, formActionType }) && i.id > currentSection);

                section && setCurrentSection(nextSection?.id);
                setLastSection(!nextSection?.id);
                break;

            default:
                break;
        }

        const tempActionType = { addMode: buttonAction === ADD_ACTION, editMode: buttonAction === EDIT_ACTION, viewMode: buttonAction === VIEW_ACTION };
        if (buttonAction !== NEXT_ACTION) {
            setFormActionType(tempActionType);
        }
        setButtonData(buttonHandler({ buttonAction, formActionType: tempActionType, buttonData, defaultBtnVisiblity }));
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
                setVinNumber(res?.data?.vehicleAndCustomerDetails?.shieldVehicleDetails?.vin);
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
        setVinNumber(value);
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
            fetchSchemeDescription({ setIsLoading: listShowLoading, userId, extraParams, onSuccessAction, onErrorAction });
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }, [userId, vinNumber]);

    // const handleEmployeeSearch = (value) => {
    //     if (value) {
    //         const extraParams = [
    //             {
    //                 key: 'searchParam',
    //                 value: value,
    //             },
    //         ];
    //         fetchEmployeeList({ setIsLoading: listEmployeeShowLoading, userId, extraParams, onSuccessAction, onErrorAction });
    //     }
    // };

    const onFinish = ({ type = null }) => {
        const data = { ...requestPayload, rsaRegistrationDetails: { ...requestPayload?.registrationDetails, registrationInformation: { ...requestPayload?.registrationDetails?.registrationInformation, employeeCode: requestPayload?.registrationDetails?.registrationInformation?.employeeName, managerCode: requestPayload?.registrationDetails?.registrationInformation?.managerName } }, vehicleAndCustomerDetails: requestPayload?.vehicleAndCustomerDetails };
        delete data?.registrationDetails;
        delete data?.rsaRegistrationDetails?.registrationInformation?.employeeName;
        delete data?.rsaRegistrationDetails?.registrationInformation?.managerName;
        const onSuccess = (res) => {
            form.resetFields();
            setShowDataLoading(true);
            showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage + 'Receipt No.:' + res?.data?.receiptsDetails?.receiptNumber });
            fetchList({ setIsLoading: listShowLoading, userId, onSuccessAction, extraParams });
            setButtonData({ ...buttonData, formBtnActive: false });
            setIsFormVisible(false);
        };

        // const sectionKey = {
        //     partyDetails: RECEIPT_SECTION.PARTY_DETAILS.id,
        //     receiptsDetails: RECEIPT_SECTION.RECEIPT_DETAILS.id,
        //     apportionDetails: RECEIPT_SECTION.APPORTION_DETAILS.id,
        // };

        const onError = (message, errorData, errorSection) => {
            showGlobalNotification({ message });
            // if (errorSection) {
            //     errorSection && setCurrentSection(sectionKey?.[errorSection]);
            // }
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

    // const showCancelConfirm = () => {
    //     setCancelSchemeVisible(true);
    // };

    const onCloseAction = () => {
        resetDetail();
        form.resetFields();
        shieldDetailForm.resetFields();
        registrationForm.resetFields();
        schemeForm.resetFields();
        vehicleCustomerForm.resetFields();
        vehicleDetailForm.resetFields();
        customerDetailForm.resetFields();
        cancelSchemeForm.resetFields();
        setSelectedOrderId();

        advanceFilterForm.resetFields();
        setAdvanceSearchVisible(false);

        setSelectedOrder();
        setIsFormVisible(false);
        // setCancelReceiptVisible(false);
        setButtonData({ ...defaultBtnVisiblity });
        setRequestPayload();
    };

    const tableProps = {
        dynamicPagination,
        totalRecords,
        page,
        setPage,
        tableColumn: tableColumn({ handleButtonClick }),
        tableData: data,
        showAddButton: true,
        typeData,
    };

    const ADD_ACTION = FROM_ACTION_TYPE?.ADD;
    const EDIT_ACTION = FROM_ACTION_TYPE?.EDIT;
    const VIEW_ACTION = FROM_ACTION_TYPE?.VIEW;

    const handleAdd = () => handleButtonClick({ buttonAction: FROM_ACTION_TYPE?.ADD });

    // const showCancelSchemeConfirm = () => {
    //     setCancelSchemeVisible(true);
    // };

    // const handleCloseScheme = () => {
    //     setCancelSchemeVisible(false);
    //     cancelSchemeForm.resetFields();
    // };

    const handleCancelScheme = () => {
        const cancelRemarks = cancelSchemeForm.getFieldValue().cancelRemarks;
        const reasonForRejection = cancelSchemeForm.getFieldValue().reasonForRejection;
        const otherReason = cancelSchemeForm.getFieldValue().otherReason;
        const data = { id: rsaDetails?.id, customerName: '', amcRegistrationDate: rsaDetails?.rsaRegistrationDetails?.registrationInformation?.rsaRegistrationDate, approvedByOrRejectedBy: '', userId: userId, status: status, rsaStatus: status, cancelRemarks: cancelRemarks, otherReason: otherReason, reasonForRejection: reasonForRejection };
        const onSuccess = (res) => {
            form.resetFields();
            setShowDataLoading(true);
            showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: res?.responseMessage });
            fetchList({ setIsLoading: listShowLoading, userId, onSuccessAction, extraParams });
            setButtonData({ ...buttonData, formBtnActive: false });
            setCancelSchemeVisible(false);
            setIsFormVisible(false);
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

    const onCancelScheme = () => {};

    const handlePrintDownload = (record) => {
        let typeRecordKey = record?.typeRecord === RSA_DOCUMENT_TYPE?.INVOICE_RSA?.value ? RSA_DOCUMENT_TYPE?.INVOICE_RSA?.key : record?.typeRecord === RSA_DOCUMENT_TYPE?.REGISTRATION_CERTIFICATE_RSA?.value ? RSA_DOCUMENT_TYPE?.REGISTRATION_CERTIFICATE_RSA?.key : record?.typeRecord === RSA_DOCUMENT_TYPE?.REGISTRATION_INCENTIVE_CLAIM_RSA?.value ? RSA_DOCUMENT_TYPE?.REGISTRATION_INCENTIVE_CLAIM_RSA?.key : null;
        setReportButtonType(record?.typeRecord);
        setReportVisible(true);
        setAdditionalReportParams([
            {
                key: typeRecordKey,
                value: record?.id,
            },
        ]);
    };

    const advanceFilterResultProps = {
        extraParams,
        removeFilter,
        amcStatus,
        invoiceStatusList,
        advanceFilter: true,
        otfFilter: true,
        filterString,
        setFilterString,
        selectedStatusType,
        setSelectedStatusType,
        handleResetFilter,
        advanceFilterForm,
        handleButtonClick,
        handleChange,
        handleSearch,
        handleInvoiceTypeChange,
        formActionType,
        data,
        setAdvanceSearchVisible,
        typeData,
        searchForm,
        showAddButton: userType === AMC_CONSTANTS?.DEALER?.key ? true : false,
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
        // onFinishFailed,
        isVisible: isFormVisible,
        onCloseAction,
        titleOverride: drawerTitle(formActionType).concat(moduleTitle),
        ADD_ACTION,
        EDIT_ACTION,
        VIEW_ACTION,
        NEXT_ACTION,
        setShowDataLoading,
        requestPayload,
        setRequestPayload,
        handleCancelRequest,
        vehicleCustomerForm,
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
        // handleFormValueChange,
        isLastSection,
        typeData,
        // handlePrintDownload,
        saveButtonName: isLastSection ? 'Submit' : 'Save & Next',
        setLastSection,
        // showCancelConfirm,
        confirmRequest,
        setConfirmRequest,
        handleWholeSchemeCancellation,
        handleCancelScheme,
        // showCancelSchemeConfirm,
        saleType,
        rsaDetails,
        detailShieldData,
        registrationDetails: rsaDetails?.registrationInformation || detailShieldData?.registrationInformation,
        vehicleCustomerDetails: rsaDetails?.vehicleAndCustomerDetails || detailShieldData?.vehicleAndCustomerDetails,
        requestDetails: rsaDetails?.requestDetails,
        handleSaleTypeChange,
        handleOtfSearch,
        handleVinSearch,
        // handleEmployeeSearch,
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
        handlePrintDownload,
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
