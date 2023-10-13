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
import { ADD_ACTION, EDIT_ACTION, VIEW_ACTION, NEXT_ACTION, btnVisiblity } from 'utils/btnVisiblity';

import { ListDataTable } from 'utils/ListDataTable';
import { AdvancedSearch } from './AdvancedSearch';

import { QUERY_BUTTONS_CONSTANTS, QUERY_BUTTONS_MNM_USER } from 'components/Sales/CommonScheme/QueryButtons';
import { BASE_URL_AMC_REGISTRATION_DATA as customURL } from 'constants/routingApi';
import { otfDataActions } from 'store/actions/data/otf/otf';

import { amcRegistrationDataAction } from 'store/actions/data/amcRegistration/amcRegistration';

import { showGlobalNotification } from 'store/actions/notification';
import { PARAM_MASTER } from 'constants/paramMaster';
import { convertDateTime, dateFormatView } from 'utils/formatDateTime';

import RegistrationFilter from './RegistrationFilter';
import { AMCRegistrationMainContainer } from './AMCRegistrationMainContainer';
import { AMC_REGISTRATION_SECTION } from 'constants/AMCRegistrationSection';
import { RejectRequest } from './RequestModal';
import { EMBEDDED_REPORTS } from 'constants/EmbeddedReports';
import { AMC_REPORT_DOCUMENT_TYPE } from './utils/amcReportDocumentType';

import { customerDetailsIndividualDataActions } from 'store/actions/data/customerMaster/customerDetailsIndividual';
import { employeeSearchDataAction } from 'store/actions/data/amcRegistration/employeeSearch';
import { amcSchemeDataAction } from 'store/actions/data/amcRegistration/amcScheme';
import { AMC_CONSTANTS } from './utils/AMCConstants';
import { AMC_REQUEST_TITLE_CONSTANTS } from './utils/AMCRequestTitleConstant';
import { ReportModal } from 'components/common/ReportModal/ReportModal';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            AMCRegistration: {
                AMCRegistrationSearch: { isLoaded: isSearchDataLoaded = false, isLoading: isSearchLoading, data, filter: filterString, detailData: amcRegistrationDetailData = [] },
                EmployeeData: { isLoaded: isEmployeeDataLoaded = false, isLoading: isEmployeeDataLoading, data: employeeData = [] },
                AMCScheme: { isLoaded: isSchemeDataLoaded = false, isLoading: isSchemeDataLoading, filteredListData: schemeData = [] },
            },

            OTF: {
                OtfSearchList: { isLoaded: isOTFDataLoaded = false, isLoading: isOTFSearchLoading, data: otfData = [] },
            },
        },
        common: {
            Header: { data: loginUserData = [] },
        },
    } = state;

    const moduleTitle = 'AMC Registration Details';
    let returnValue = {
        userId,
        typeData,
        data: data?.paginationData,
        totalRecords: data?.totalRecords || [],
        invoiceStatusList: loginUserData?.userType === AMC_CONSTANTS?.DEALER?.key ? Object.values(QUERY_BUTTONS_CONSTANTS) : Object.values(QUERY_BUTTONS_MNM_USER),
        moduleTitle,
        isSearchLoading,
        isSearchDataLoaded,
        filterString,
        loginUserData,
        amcRegistrationDetailData,

        isEmployeeDataLoaded,
        isEmployeeDataLoading,
        employeeData,

        isOTFDataLoaded,
        isOTFSearchLoading,
        otfData,

        isSchemeDataLoaded,
        isSchemeDataLoading,
        schemeData,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: amcRegistrationDataAction.fetchList,
            listShowLoading: amcRegistrationDataAction.listShowLoading,
            setFilterString: amcRegistrationDataAction.setFilter,

            fetchCustomerList: customerDetailsIndividualDataActions.fetchList,
            listCustomerShowLoading: customerDetailsIndividualDataActions.listShowLoading,

            fetchEmployeeList: employeeSearchDataAction.fetchList,
            listEmployeeShowLoading: employeeSearchDataAction.listShowLoading,

            fetchDetail: amcRegistrationDataAction.fetchDetail,
            saveData: amcRegistrationDataAction.saveData,

            fetchOTFSearchedList: otfDataActions.fetchList,
            listOTFShowLoading: otfDataActions.listShowLoading,

            fetchSchemeList: amcSchemeDataAction.fetchFilteredList,
            listSchemeShowLoading: amcSchemeDataAction.listShowLoading,

            showGlobalNotification,
        },
        dispatch
    ),
});

export const AMCRegistrationMasterBase = (props) => {
    const { data, userId, fetchList, listShowLoading, showGlobalNotification } = props;
    const { typeData, saveData, documentType, moduleTitle, totalRecords } = props;
    const { filterString, setFilterString, invoiceStatusList } = props;
    const { fetchDetail, isDataLoaded, fetchCustomerList, listCustomerShowLoading } = props;
    const { amcRegistrationDetailData, isEmployeeDataLoaded, isEmployeeDataLoading, employeeData, fetchEmployeeList, listEmployeeShowLoading, loginUserData } = props;
    const { fetchOTFSearchedList, listOTFShowLoading, otfData } = props;
    const { fetchSchemeList, listSchemeShowLoading, isSchemeDataLoaded, isSchemeDataLoading, schemeData } = props;

    const [isAdvanceSearchVisible, setAdvanceSearchVisible] = useState(false);
    const [amcStatus, setAmcStatus] = useState(QUERY_BUTTONS_CONSTANTS.PENDING.key);
    const defaultPayload = { amcRegistration: {}, amcSchemeDetails: {}, amcCustomerDetails: {}, amcVehicleDetails: [{}], amcRequestDetails: {} };
    const [requestPayload, setRequestPayload] = useState(defaultPayload);

    const [listFilterForm] = Form.useForm();
    const [cancelAMCForm] = Form.useForm();
    const [customerForm] = Form.useForm();
    const [schemeForm] = Form.useForm();

    const [searchValue, setSearchValue] = useState();

    const [selectedOrder, setSelectedOrder] = useState('');
    const [selectedOrderId, setSelectedOrderId] = useState('');
    const [selectedAMC, setSelectedAMC] = useState();

    const [section, setSection] = useState();
    const [defaultSection, setDefaultSection] = useState();
    const [currentSection, setCurrentSection] = useState();
    const [sectionName, setSetionName] = useState();
    const [isLastSection, setLastSection] = useState(false);
    const [receipt, setReceipt] = useState('');

    const [form] = Form.useForm();
    const [searchForm] = Form.useForm();
    const [advanceFilterForm] = Form.useForm();
    const [registrationForm] = Form.useForm();

    const [showDataLoading, setShowDataLoading] = useState(true);
    const [isFormVisible, setIsFormVisible] = useState(false);

    const [confirmRequest, setConfirmRequest] = useState(false);
    const [userType, setUserType] = useState(AMC_CONSTANTS?.DEALER?.key);
    const [amcWholeCancellation, setAmcWholeCancellation] = useState(false);
    const [rejectRequest, setRejectRequest] = useState(false);
    const [previousSection, setPreviousSection] = useState(1);

    const [additionalReportParams, setAdditionalReportParams] = useState();
    const [isReportVisible, setReportVisible] = useState();
    const [reportButtonType, setReportButtonType] = useState();
    const [amcDocumentType, setAmcDocumentType] = useState();

    const [page, setPage] = useState({ pageSize: 10, current: 1 });
    const dynamicPagination = true;

    const [isRejectModalVisible, setRejectModalVisible] = useState(false);
    const [isMNMApproval, setIsMNMApproval] = useState(false);
    const [isPendingForCancellation, setIsPendingForCancellation] = useState(selectedAMC?.status === AMC_CONSTANTS?.PENDING_FOR_CANCELLATION?.title);

    useEffect(() => {
        if (loginUserData?.userType) {
            if (loginUserData?.userType === AMC_CONSTANTS?.DEALER?.key) {
                setAmcStatus(QUERY_BUTTONS_CONSTANTS.PENDING.key);
                setUserType(AMC_CONSTANTS?.DEALER?.key);
            } else {
                setAmcStatus(QUERY_BUTTONS_MNM_USER.PENDING_FOR_APPROVAL.key);
                setUserType(AMC_CONSTANTS?.MNM?.key);
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loginUserData?.userType]);

    useEffect(() => {
        if (formActionType?.viewMode) {
            setRequestPayload({ ...amcRegistrationDetailData });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [amcRegistrationDetailData]);

    const defaultBtnVisiblity = {
        editBtn: false,
        saveBtn: false,
        saveAndNewBtn: false,
        saveAndNewBtnClicked: false,
        closeBtn: false,
        cancelBtn: false,
        formBtnActive: false,
        nextBtn: false,
        cancelAMCBtn: false,
    };

    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });

    const defaultFormActionType = { addMode: false, editMode: false, viewMode: false };
    const [formActionType, setFormActionType] = useState({ ...defaultFormActionType });

    const onSuccessAction = (res) => {
        searchForm.setFieldsValue({ searchType: undefined, searchParam: undefined });
        searchForm.resetFields();
        setShowDataLoading(false);
        setSelectedAMC(res?.data?.paginationData[0]);
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
                name: typeData?.[PARAM_MASTER.AMC_SEARCH_TYPE.id]?.find((i) => i?.key === filterString?.searchType)?.value,
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
                key: 'status',
                title: 'Status',
                value: amcStatus,
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
    }, [searchValue, amcStatus, filterString, page]);

    useEffect(() => {
        if (userId) {
            setShowDataLoading(true);
            fetchList({ setIsLoading: listShowLoading, userId, extraParams, onSuccessAction, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, amcStatus, filterString, page]);

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

    const handlePrintDownload = (record) => {
        let typeRecordKey = record?.typeRecord === AMC_REPORT_DOCUMENT_TYPE?.INVOICE_AMC?.value ? AMC_REPORT_DOCUMENT_TYPE?.INVOICE_AMC?.key : record?.typeRecord === AMC_REPORT_DOCUMENT_TYPE?.REGISTRATION_CERTIFICATE_AMC?.value ? AMC_REPORT_DOCUMENT_TYPE?.REGISTRATION_CERTIFICATE_AMC?.key : record?.typeRecord === AMC_REPORT_DOCUMENT_TYPE?.REGISTRATION_INCENTIVE_CLAIM_AMC?.value ? AMC_REPORT_DOCUMENT_TYPE?.REGISTRATION_INCENTIVE_CLAIM_AMC?.key : null;
        setReportButtonType(record?.typeRecord);
        setReportVisible(true);
        setAdditionalReportParams([
            {
                key: typeRecordKey,
                value: record?.message,
            },
        ]);
    };

    const handleBookingNumberSearch = (otfNumber = '') => {
        const onSuccessAction = (res) => {
            registrationForm.setFieldsValue({ vin: res?.data?.otfDetails[0]?.vin });
        };
        if (otfNumber) {
            const extraParams = [
                {
                    key: 'searchType',
                    value: 'otfNumber',
                },
                {
                    key: 'searchParam',
                    value: otfNumber,
                },
                {
                    key: 'pageNumber',
                    value: '1',
                },
                {
                    key: 'pageSize',
                    value: '10',
                },
            ];
            fetchOTFSearchedList({ setIsLoading: listOTFShowLoading, userId, extraParams, onSuccessAction, onErrorAction });
        }
    };

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

    const handleButtonClick = ({ record = null, buttonAction, openDefaultSection = true }) => {
        form.resetFields();
        form.setFieldsValue(undefined);

        const detailExtraParams = [
            {
                key: 'id',
                value: record?.amcId,
            },
        ];

        switch (buttonAction) {
            case ADD_ACTION:
                defaultSection && setCurrentSection(defaultSection);
                registrationForm.resetFields();
                setPreviousSection(1);
                setSelectedAMC('');
                break;
            case EDIT_ACTION:
                fetchDetail({ setIsLoading: listShowLoading, userId, extraParams: detailExtraParams, customURL, onSuccessAction, onErrorAction });

                record && setSelectedAMC(record);
                openDefaultSection && setCurrentSection(defaultSection);
                break;
            case VIEW_ACTION:
                fetchDetail({ setIsLoading: listShowLoading, userId, extraParams: detailExtraParams, customURL, onSuccessAction, onErrorAction });
                record && setSelectedAMC(record);
                defaultSection && setCurrentSection(defaultSection);
                setIsPendingForCancellation(record?.status === AMC_CONSTANTS?.PENDING_FOR_CANCELLATION?.title);
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
                if (buttonAction === VIEW_ACTION) {
                    if (userType === AMC_CONSTANTS?.DEALER?.key) {
                        amcStatus === QUERY_BUTTONS_CONSTANTS.PENDING.key ? setButtonData({ ...Visibility, cancelAMCBtn: true }) : amcStatus === QUERY_BUTTONS_CONSTANTS.CANCELLED.key ? setButtonData({ ...Visibility }) : setButtonData({ ...Visibility });
                    } else {
                        amcStatus === QUERY_BUTTONS_MNM_USER.PENDING_FOR_APPROVAL.key ? setButtonData({ ...Visibility }) : amcStatus === QUERY_BUTTONS_MNM_USER.PENDING_FOR_CANCELLATION.key ? setButtonData({ ...Visibility }) : setButtonData({ ...Visibility });
                    }
                }
            }
        }
        setIsFormVisible(true);
    };

    const onFinishSearch = (values) => {};

    const onFinish = ({ type = null }) => {
        let finalPayload;
        if (!type) {
            finalPayload = { ...requestPayload, amcId: selectedAMC?.amcId, amcRegistrationNumber: selectedAMC?.amcRegistrationNumber };
        } else if (type === AMC_CONSTANTS?.CANCEL_REQUEST?.key) {
            finalPayload = { ...requestPayload, amcId: selectedAMC?.amcId, amcRegistrationNumber: selectedAMC?.amcRegistrationNumber, amcRequestDetails: { ...requestPayload?.amcRequestDetails, amcStatus: QUERY_BUTTONS_CONSTANTS?.CANCELLED?.key } };
        } else if (type === AMC_CONSTANTS?.AMC_CANCELLATION?.key) {
            finalPayload = { ...requestPayload, amcId: selectedAMC?.amcId, amcRegistrationNumber: selectedAMC?.amcRegistrationNumber, amcRequestDetails: { ...requestPayload?.amcRequestDetails, amcStatus: userType === AMC_CONSTANTS?.MNM?.key ? QUERY_BUTTONS_CONSTANTS?.REJECTED?.key : QUERY_BUTTONS_CONSTANTS?.CANCELLED?.key, ...cancelAMCForm.getFieldsValue() } };
        }

        const onError = (res) => {
            showGlobalNotification({ message: res?.responseMessage });
        };
        const onSuccess = (res) => {
            showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });

            if (type === AMC_CONSTANTS?.CANCEL_REQUEST?.key) {
                setRejectModalVisible(false);
            } else if (type === AMC_CONSTANTS?.AMC_CANCELLATION?.key) {
                setRejectModalVisible(false);
                setIsFormVisible(false);
                setSelectedAMC();
                setSelectedOrder();
                setRequestPayload(defaultPayload);
                registrationForm.resetFields();
                schemeForm.resetFields();
                customerForm.resetFields();
                setIsPendingForCancellation(false);
            } else {
                section && setCurrentSection(AMC_REGISTRATION_SECTION.THANK_YOU_PAGE.id);
                setSelectedOrder({ message: res?.responseMessage.split(' ')[3] });
                registrationForm.resetFields();
                schemeForm.resetFields();
                customerForm.resetFields();
                setSelectedAMC();
                setRequestPayload(defaultPayload);
            }
            cancelAMCForm.resetFields();
            fetchList({ setIsLoading: listShowLoading, userId, extraParams, onSuccessAction, onErrorAction });
        };

        const requestData = {
            data: finalPayload,
            method: selectedAMC?.amcId ? 'put' : 'post',
            setIsLoading: listShowLoading,
            userId,
            onError,
            onSuccess,
            customURL,
        };
        saveData(requestData);
    };

    const handleResetFilter = (e) => {
        setShowDataLoading(false);
        setFilterString();
        advanceFilterForm.resetFields();
    };

    const onFinishFailed = (errorInfo) => {
        return;
    };

    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const onCloseAction = () => {
        setIsFormVisible(false);
        registrationForm.resetFields();
        schemeForm.resetFields();
        setSelectedAMC();
        setSelectedOrder();
        cancelAMCForm.resetFields();
        setRequestPayload(defaultPayload);
        customerForm.resetFields();
        setIsPendingForCancellation(false);
    };

    const tableProps = {
        dynamicPagination,
        totalRecords,
        setPage,
        tableColumn: tableColumn({ handleButtonClick, userType }),
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

    const title = 'AMC Registration';

    const advanceFilterResultProps = {
        extraParams,
        removeFilter,
        amcStatus,
        invoiceStatusList,
        advanceFilter: true,
        otfFilter: true,
        filterString,
        setFilterString,
        from: listFilterForm,

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
        userType,
        showAddButton: userType === AMC_CONSTANTS?.DEALER?.key ? true : false,
    };

    const advanceFilterProps = {
        isVisible: isAdvanceSearchVisible,

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
        userType,
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
    }, [isRejectModalVisible]);

    const handleCancelRequest = () => {
        setRejectModalVisible(true);
        setAmcWholeCancellation(false);
    };
    const handleMNMApproval = () => {
        setRejectModalVisible(true);
        setAmcWholeCancellation(false);
        setIsMNMApproval(true);
    };
    const handleMNMRejection = () => {
        setRejectModalVisible(true);
        setAmcWholeCancellation(false);
        setIsMNMApproval(false);
    };
    const handleCancelRequests = () => {
        if (isMNMApproval) {
            setRequestPayload({ ...requestPayload, amcRequestDetails: { ...requestPayload?.amcRequestDetails, amcStatus: QUERY_BUTTONS_CONSTANTS?.APPROVED?.key } });
            onFinish({ type: AMC_CONSTANTS?.CANCEL_REQUEST?.key });
        } else if (!isMNMApproval && userType === AMC_CONSTANTS?.MNM?.key) {
            setRejectRequest(true);
        } else if (!isMNMApproval && userType === AMC_CONSTANTS?.MNM?.key && rejectRequest) {
            onFinish({ type: AMC_CONSTANTS?.AMC_CANCELLATION?.key });
        } else if (rejectRequest && amcWholeCancellation) {
            onFinish({ type: AMC_CONSTANTS?.AMC_CANCELLATION?.key });
        } else if (amcWholeCancellation) {
            setRejectRequest(true);
        } else {
            setRequestPayload({ ...requestPayload, amcRequestDetails: { ...requestPayload?.amcRequestDetails, amcStatus: QUERY_BUTTONS_CONSTANTS?.CANCELLED?.key } });
            onFinish({ type: AMC_CONSTANTS?.CANCEL_REQUEST?.key });
        }
    };
    const handleWholeAMCCancellation = () => {
        setRejectModalVisible(true);
        setAmcWholeCancellation(true);
    };
    const rejectModalCloseAction = () => {
        setRejectModalVisible(false);
        setAmcWholeCancellation(false);
        setRejectRequest(false);
        setIsMNMApproval(false);
        cancelAMCForm.resetFields();
    };

    const containerProps = {
        record: selectedOrder,
        form,
        registrationForm,
        schemeForm,
        customerForm,
        formActionType,
        setFormActionType,
        AMConFinish: onFinish,
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
        requestPayload,
        setRequestPayload,
        receipt,
        setReceipt,
        amcStatus,

        setButtonData,
        handleButtonClick,
        defaultFormActionType,
        defaultBtnVisiblity,
        selectedOrderId,
        setSelectedOrderId,
        selectedOrder,
        setSelectedOrder,
        selectedAMC,
        setSelectedAMC,

        otfData,
        section,
        currentSection,
        sectionName,
        setCurrentSection,
        handleFormValueChange,
        isLastSection,
        typeData,
        documentType,

        saveButtonName: isLastSection ? 'Submit' : 'Save and Next',
        setLastSection,
        handleBookingNumberSearch,
        confirmRequest,
        setConfirmRequest,
        previousSection,
        setPreviousSection,
        showGlobalNotification,
        isDataLoaded,
        userType,
        fetchCustomerList,
        listCustomerShowLoading,
        handleCancelRequest,
        handleWholeAMCCancellation,

        isEmployeeDataLoaded,
        isEmployeeDataLoading,
        employeeData,
        fetchEmployeeList,
        listEmployeeShowLoading,

        fetchSchemeList,
        listSchemeShowLoading,
        isSchemeDataLoaded,
        isSchemeDataLoading,
        schemeData,

        handleMNMApproval,
        handleMNMRejection,
        isPendingForCancellation,
        setIsPendingForCancellation,
        handlePrintDownload,
    };

    const cancelModalProps = {
        isVisible: isRejectModalVisible,
        cancelAMCForm,
        onCloseAction: rejectModalCloseAction,
        titleOverride: modalTitle?.titleOverride,
        amcCancellationText: modalTitle?.amcCancellationText,
        buttonText: modalTitle?.buttonText,
        amcWholeCancellation,
        rejectRequest,
        handleCancelRequests,
        rejectModalCloseAction,
        typeData,
        isMNMApproval,
        setIsMNMApproval,
        userType,
    };

    useEffect(() => {
        if (reportButtonType === AMC_REPORT_DOCUMENT_TYPE?.INVOICE_AMC?.value) {
            setAmcDocumentType(EMBEDDED_REPORTS?.AMC_REGISTRATION_INVOICE_DOCUMENT);
        } else if (reportButtonType === AMC_REPORT_DOCUMENT_TYPE?.REGISTRATION_CERTIFICATE_AMC?.value) {
            setAmcDocumentType(EMBEDDED_REPORTS?.AMC_REGISTRATION_INVOICE_DOCUMENT);
        } else if (reportButtonType === AMC_REPORT_DOCUMENT_TYPE?.REGISTRATION_INCENTIVE_CLAIM_AMC?.value) {
            setAmcDocumentType(EMBEDDED_REPORTS?.AMC_REGISTRATION_INVOICE_DOCUMENT);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reportButtonType]);

    const reportDetail = amcDocumentType;
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
                    <ListDataTable isLoading={showDataLoading} {...tableProps} showAddButton={false} />
                </Col>
            </Row>
            <AdvancedSearch {...advanceFilterProps} />
            <AMCRegistrationMainContainer {...containerProps} />
            <RejectRequest {...cancelModalProps} />
            <ReportModal {...reportProps} reportDetail={reportDetail} />
        </>
    );
};

const AMCRegistrationMaster = connect(mapStateToProps, mapDispatchToProps)(AMCRegistrationMasterBase);
export default AMCRegistrationMaster;
