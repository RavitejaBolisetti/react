/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Col, Form, Row, Modal } from 'antd';
import { tableColumn } from './tableColumn';
import AdvanceOtfFilter from './AdvanceOtfFilter';
import { ADD_ACTION, EDIT_ACTION, VIEW_ACTION, NEXT_ACTION, CANCEL_ACTION, TRANSFER_ACTION, btnVisiblity, ALLOT, UNALLOT, CANCELLN_APPROVE, CANCELLN_REJECT } from 'utils/btnVisiblity';

import { OTFMainConatiner } from './OTFMainConatiner';
import { ListDataTable } from 'utils/ListDataTable';
import { AdvancedSearch } from './AdvancedSearch';
import { OTF_STATUS } from 'constants/OTFStatus';
import { OTF_SECTION } from 'constants/OTFSection';
import { CancellationMaster } from './OTFCancellation/CancellationMaster';
import { vehicleAllotment } from 'store/actions/data/vehicleAllotment/VehicleAllotment';
import { TransferMaster } from './OTFTransfer/TransferMaster';
import { OTFAllotmentMaster } from './OTFAllotment/OTFAllotmentMaster';

import { otfvehicleDetailsDataActions } from 'store/actions/data/otf/vehicleDetails';
import { showGlobalNotification } from 'store/actions/notification';
import { otfDataActions } from 'store/actions/data/otf/otf';
import { PARAM_MASTER } from 'constants/paramMaster';
import { VEHICLE_TYPE } from 'constants/VehicleType';
import { BASE_URL_OTF_DETAILS as baseURL, BASE_URL_OTF_TRANSFER as otfTransferURL, BASE_URL_OTF_CANCELLATION as otfCancelURL, BASE_URL_OTF_CANCELLATION_WF as customURLCancelWF } from 'constants/routingApi';
import { convertDateTime, dateFormatView } from 'utils/formatDateTime';
import { validateOTFMenu } from './utils/validateOTFMenu';
import { ChangeHistory } from './ChangeHistory';
import { OtfSoMappingUnmappingChangeHistory } from './OtfSoMappingUnmappingChangeHistory';
import { ConfirmationModal } from 'utils/ConfirmationModal';
import { UnSaveDataConfirmation, handleUnSavedChange } from 'utils/UnSaveDataConfirmation';
import { translateContent } from 'utils/translateContent';
import LeftProfileCard from './LeftProfileCard';
import { ChangeModelVariantMaster } from './ChangeModelVariant';

import styles from 'assets/sass/app.module.scss';

const { confirm } = Modal;
const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            OTF: {
                VehicleDetails: { isLoaded: isVehicleDetailDataLoaded = false, isVehicleDetailLoading, data: VehicleDetailsData = [] },
                OtfSearchList: { isLoaded: isSearchDataLoaded = false, isLoading: isOTFSearchLoading, isLoadingOnSave, data, filter: filterString, isDetailLoaded, detailData: otfData = [], isChangeHistoryLoaded, isChangeHistoryLoading, isChangeHistoryData = [] },
            },
        },
    } = state;
    const moduleTitle = translateContent('bookingManagement.heading.title');
    const ChangeHistoryTitle = translateContent('bookingManagement.heading.bookingManagementChangeHistory');
    const otfSoMappingChangeHistoryTitle = translateContent('bookingManagement.heading.otfSoMappingChangeHistory');
    let returnValue = {
        userId,
        typeData,
        data: data?.otfDetails,
        totalRecords: data?.totalRecords || [],
        otfStatusList: Object.values(OTF_STATUS),

        isDetailLoaded,
        isLoading: !isDetailLoaded,
        otfData,
        isLoadingOnSave,

        moduleTitle,
        isOTFSearchLoading,
        isSearchDataLoaded,
        filterString,
        ChangeHistoryTitle,
        otfSoMappingChangeHistoryTitle,

        isChangeHistoryLoaded,
        isChangeHistoryLoading,
        isChangeHistoryData,

        isVehicleDetailDataLoaded,
        VehicleDetailsData,
        isVehicleDetailLoading,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchOTFSearchedList: otfDataActions.fetchList,
            fetchOTFChangeHistory: otfDataActions.changeHistory,
            fetchOTFDetail: otfDataActions.fetchDetail,
            saveData: otfDataActions.saveData,
            setFilterString: otfDataActions.setFilter,
            resetData: otfDataActions.reset,
            transferOTF: otfDataActions.transferOTF,
            saveFormShowLoading: otfDataActions.saveFormShowLoading,
            listShowLoading: otfDataActions.listShowLoading,

            cancelOTFWorkflow: otfDataActions.cancelOTFWorkflow,

            fetchVehicleDetail: otfvehicleDetailsDataActions.fetchList,

            updateVehicleAllotmentStatus: vehicleAllotment.saveData,

            showGlobalNotification,
        },
        dispatch
    ),
});

export const OtfMasterBase = (props) => {
    const { showGlobalNotification, fetchOTFDetail, saveData, listShowLoading, userId, fetchOTFSearchedList, data, totalRecords, otfData, resetData } = props;
    const { ChangeHistoryTitle, otfSoMappingChangeHistoryTitle } = props;
    const { fetchVehicleDetail, updateVehicleAllotmentStatus } = props;

    const { typeData, transferOTF, saveFormShowLoading, cancelOTFWorkflow } = props;
    const { filterString, setFilterString, otfStatusList } = props;
    const [isAdvanceSearchVisible, setAdvanceSearchVisible] = useState(false);
    const [confirmRequest, setConfirmRequest] = useState();
    const [refreshData, setRefreshData] = useState();
    const [productDetailRefresh, setProductDetailRefresh] = useState(false);

    const [listFilterForm] = Form.useForm();

    const [selectedRecordId, setSelectedRecordId] = useState();
    const [selectedOrder, setSelectedOrder] = useState();
    const [selectedOrderId, setSelectedOrderId] = useState();
    const [selectedBookingId, setSelectedBookingId] = useState();

    const [section, setSection] = useState();
    const [defaultSection, setDefaultSection] = useState();
    const [currentSection, setCurrentSection] = useState();
    const [sectionName, setSetionName] = useState();
    const [isLastSection, setLastSection] = useState(false);

    const [form] = Form.useForm();
    const [searchForm] = Form.useForm();
    const [advanceFilterForm] = Form.useForm();

    const [showDataLoading, setShowDataLoading] = useState(true);
    const [showDetailDataLoading, setShowDetailDataLoading] = useState(true);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isCancelVisible, setIsCancelVisible] = useState(false);
    const [isTransferVisible, setIsTransferVisible] = useState(false);
    const [isAllotVisible, setIsAllotVisible] = useState(false);
    const [openVehilceModelChange, setOpenVehilceModelChange] = useState(false);
    const [uploadedFile, setUploadedFile] = useState();

    const [otfTransferForm] = Form.useForm();
    const [otfCancellationForm] = Form.useForm();
    const [otfAllotmentForm] = Form.useForm();
    const [changeVehicleModelForm] = Form.useForm();

    const [singleDisabled, setSingleDisabled] = useState(false);
    const [unSavedDataModalProps, setUnSavedModelVisible] = useState({
        isVisible: false,
    });

    const defaultBtnVisiblity = {
        editBtn: false,
        saveBtn: false,
        cancelBtn: false,
        saveAndNewBtn: false,
        saveAndNewBtnClicked: false,
        closeBtn: false,
        formBtnActive: false,
        cancelOTFBtn: false,
        transferOTFBtn: false,
        allotBtn: false,
        unAllotBtn: false,
        invoiceBtn: false,
        deliveryNote: false,
        changeHistory: false,
        otfSoMappingHistoryBtn: true,
    };

    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });

    const defaultFormActionType = { addMode: false, editMode: false, viewMode: false };
    const [formActionType, setFormActionType] = useState({ ...defaultFormActionType });

    useEffect(() => {
        setFilterString({ ...filterString, pageSize: 10, current: 1 });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const dynamicPagination = true;

    const [formData, setFormData] = useState([]);
    const [ChangeHistoryVisible, setChangeHistoryVisible] = useState(false);
    const [OtfSoMappingHistoryVisible, setOtfSoMappingHistoryVisible] = useState(false);

    const handleUnSavedChangeFn = (successFn) => handleUnSavedChange({ buttonData, setButtonData, unSavedDataModalProps, setUnSavedModelVisible, successFn });

    const onCloseConfirmationModalAction = () => {
        setConfirmRequest({
            ...confirmRequest,
            isVisible: false,
        });
    };

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
                name: typeData?.[PARAM_MASTER.OTF_SER.id]?.find((i) => i?.key === filterString?.searchType)?.value,
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
                key: 'otfStatus',
                title: 'Booking Status',
                value: filterString?.otfStatus,
                name: otfStatusList?.find((i) => i?.key === filterString?.otfStatus)?.desc,
                canRemove: true,
                filter: true,
            },
            {
                key: 'pageSize',
                title: 'Value',
                value: filterString?.pageSize ?? 10,
                canRemove: true,
                filter: false,
            },
            {
                key: 'pageNumber',
                title: 'Value',
                value: filterString?.current,
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
        return () => {
            resetData();
            setFilterString();
            setUploadedFile();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (userId && extraParams?.find((i) => i.key === 'pageNumber')?.value > 0) {
            setShowDataLoading(true);
            fetchOTFSearchedList({ setIsLoading: listShowLoading, userId, extraParams, onSuccessAction, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, extraParams, refreshData]);

    useEffect(() => {
        const defaultSection = OTF_SECTION.OTF_DETAILS.id;
        setDefaultSection(defaultSection);
        setSetionName(OTF_SECTION);
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
        form.resetFields();
        form.setFieldsValue(undefined);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentSection, sectionName]);

    const handleVehicleAllotment = (record, updatedStatus, vinNumber) => {
        if (!record) {
            showGlobalNotification({ message: translateContent('bookingManagement.validation.mandatorySelectBooking') });
            return false;
        }

        const { otfId, otfNumber, bookingNumber = undefined } = record;
        let data = { otfId, otfNumber, bookingNumber, allotmentStatus: updatedStatus, vehicleIdentificationNumber: vinNumber };

        const onSuccess = (res) => {
            form.resetFields();
            setShowDataLoading(true);
            setRefreshData(!refreshData);
            showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: res?.responseMessage });
            setButtonData({ ...buttonData, formBtnActive: false });
            setIsFormVisible(false);

            setConfirmRequest({
                ...confirmRequest,
                isVisible: false,
            });
        };

        const onError = (message) => {
            showGlobalNotification({ message });
        };

        const requestData = {
            data,
            method: 'put',
            setIsLoading: listShowLoading,
            userId,
            onError,
            onSuccess,
        };
        updateVehicleAllotmentStatus(requestData);
    };

    const handleButtonClick = ({ record = null, buttonAction, openDefaultSection = true, isNextBtnClick = false, onSave = undefined }) => {
        buttonAction !== NEXT_ACTION && form.resetFields();
        form.setFieldsValue(undefined);
        setIsFormVisible(true);
        setIsCancelVisible(false);
        setIsTransferVisible(false);
        switch (buttonAction) {
            case ADD_ACTION:
                defaultSection && setCurrentSection(defaultSection);
                break;
            case EDIT_ACTION:
                setSelectedOrder(record);
                record && setSelectedRecordId(record?.otfId);
                record && setSelectedOrderId(record?.otfNumber);
                record && setSelectedBookingId(record?.bookingNumber);
                openDefaultSection && setCurrentSection(defaultSection);
                break;
            case VIEW_ACTION:
                setSelectedOrder(record);
                record && setSelectedRecordId(record?.otfId);
                record && setSelectedOrderId(record?.otfNumber);
                record && setSelectedBookingId(record?.bookingNumber);
                defaultSection && setCurrentSection(defaultSection);
                break;
            case NEXT_ACTION:
                const callMethod = () => {
                    const nextSection = filterActiveSection?.find((i) => i.id > currentSection);
                    section && setCurrentSection(nextSection?.id);
                    setLastSection(!nextSection?.id);
                };

                if (onSave) {
                    callMethod();
                } else {
                    handleUnSavedChangeFn(() => {
                        callMethod();
                    });
                }
                break;

            case CANCEL_ACTION:
                setIsCancelVisible(true);
                break;
            case TRANSFER_ACTION:
                setIsTransferVisible(true);
                break;
            case ALLOT:
                setIsAllotVisible(true);
                break;
            case UNALLOT:
                if (userId && selectedRecordId) {
                    const onSuccessAction = (resp) => {
                        setConfirmRequest({
                            isVisible: true,
                            titleOverride: translateContent('bookingManagement.label.unallotBooking'),
                            closable: true,
                            icon: false,
                            onCloseAction: onCloseConfirmationModalAction,
                            onSubmitAction: () => handleVehicleAllotment(record, VEHICLE_TYPE?.UNALLOTED.key, resp?.data?.vinNumber),
                            submitText: translateContent('global.yesNo.yes'),
                            text: translateContent('bookingManagement.validation.unallotBookingConfirmation'),
                            content: resp?.data ? resp?.data?.vinNumber : '',
                        });
                    };

                    const onErrorAction = (message) => {
                        showGlobalNotification({ message });
                    };
                    fetchVehicleDetail({
                        setIsLoading: listShowLoading,
                        userId,
                        extraParams: [
                            {
                                key: 'otfId',
                                value: selectedRecordId,
                            },
                        ],
                        onErrorAction,
                        onSuccessAction,
                    });
                }
                break;
            case CANCELLN_REJECT:
                handleWorkflowOTFCancellation(record, buttonAction);
                break;
            case CANCELLN_APPROVE:
                handleWorkflowOTFCancellation(record, buttonAction);
                break;
            default:
                break;
        }

        if (buttonAction !== NEXT_ACTION) {
            if ([ADD_ACTION, EDIT_ACTION, VIEW_ACTION]?.includes(buttonAction)) {
                setFormActionType({
                    addMode: buttonAction === ADD_ACTION,
                    editMode: buttonAction === EDIT_ACTION,
                    viewMode: buttonAction === VIEW_ACTION,
                });
                setButtonData(btnVisiblity({ defaultBtnVisiblity: { ...defaultBtnVisiblity, changeHistory: buttonAction === VIEW_ACTION ? true : false }, buttonAction, orderStatus: record?.orderStatus }));
            }
        } else {
            setButtonData((prev) => ({ ...prev, formBtnActive: false })); //Hide to stop disable on edit
        }
    };

    const onFinishSearch = () => {};

    const handleResetFilter = (e) => {
        const { pageSize } = filterString;
        if (filterString) {
            setShowDataLoading(true);
        }
        setFilterString({ pageSize, current: 1 });
        advanceFilterForm.resetFields();
        setAdvanceSearchVisible(false);
    };

    const onFinish = (values) => {
        const recordId = formData?.parentId || form.getFieldValue('parentId');
        let data = { ...values, parentId: recordId };

        const onSuccess = (res) => {
            form.resetFields();
            setShowDataLoading(true);
            showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: res?.responseMessage });
            fetchOTFDetail({ setIsLoading: listShowLoading, userId, onSuccessAction });
            setButtonData({ ...buttonData, formBtnActive: false });
            setIsFormVisible(false);
        };

        const onError = (message) => {
            showGlobalNotification({ message });
        };

        const requestData = {
            data,
            baseURL,
            method: formActionType?.editMode ? 'put' : 'post',
            setIsLoading: listShowLoading,
            userId,
            onError,
            onSuccess,
        };

        saveData(requestData);
    };

    const onFinishFailed = () => {
        return false;
    };
    const handleChangeHistory = () => {
        setChangeHistoryVisible(true);
    };
    const handleOtfSoMappingHistory = () => {
        setOtfSoMappingHistoryVisible(true);
    };

    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const onCloseAction = () => {
        handleUnSavedChangeFn(() => {
            form.resetFields();
            form.setFieldsValue();

            advanceFilterForm.resetFields();
            advanceFilterForm.setFieldsValue();
            setAdvanceSearchVisible(false);

            setSelectedOrder();
            setIsFormVisible(false);
            setButtonData({ ...defaultBtnVisiblity });
        });
    };

    const setPage = (page) => {
        setFilterString({ ...filterString, ...page });
    };

    const tableProps = {
        dynamicPagination,
        filterString,
        totalRecords,
        setPage: setPage,
        isLoading: showDataLoading,
        tableColumn: tableColumn(handleButtonClick),
        tableData: data,
        showAddButton: false,
        noDataMessage: translateContent('global.generalMessage.noRecordsFound'),
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

    const title = translateContent('bookingManagement.placeholder.searchBooking');

    const fnOTFTransfer = ({ modalTitle, modalMessage, finalData, callBackMethod, customURL }) => {
        const onSuccess = (res) => {
            setIsTransferVisible(false);
            setIsTransferVisible(false);
            setIsCancelVisible(false);
            otfTransferForm.resetFields();
            otfCancellationForm.resetFields();
            setShowDataLoading(true);
            showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: res?.responseMessage });
            fetchOTFSearchedList({ setIsLoading: listShowLoading, userId, extraParams, onSuccessAction, onErrorAction });
            setButtonData({ ...buttonData, formBtnActive: false });
            setIsFormVisible(false);
        };

        const requestData = {
            data: finalData,
            customURL,
            method: 'put',
            setIsLoading: saveFormShowLoading,
            userId,
            onSuccessAction: onSuccess,
            onErrorAction,
        };

        confirm({
            title: modalTitle,
            icon: '',
            content: modalMessage,
            okText: translateContent('global.yesNo.yes'),
            okType: 'danger',
            cancelText: translateContent('global.yesNo.no'),
            wrapClassName: styles.confirmModal,
            centered: true,
            closable: true,
            onOk() {
                callBackMethod(requestData);
            },
            onCancel() {},
        });
    };

    const onFinishOTFTansfer = (values) => {
        fnOTFTransfer({
            modalTitle: translateContent('bookingManagement.label.bookingTransfer'),
            modalMessage: `${translateContent('bookingManagement.validation.transferPopup')} ${otfData?.bookingNumber || otfData?.otfNumber}`,
            finalData: { ...values, id: otfData?.id, otfNumber: otfData?.otfNumber },
            callBackMethod: transferOTF,
            customURL: otfTransferURL,
        });
    };

    const onFinishOTFCancellation = (values) => {
        fnOTFTransfer({
            modalTitle: translateContent('bookingManagement.label.bookingCancel'),
            modalMessage: `${translateContent('bookingManagement.validation.cancelPopup')} ${otfData?.bookingNumber || otfData?.otfNumber}`,
            finalData: { dealerCode: '', oemCode: '', productCode: '', ...values, id: null, otfId: selectedRecordId, otfNumber: otfData?.otfNumber, uploadCancellationLetterDocId: uploadedFile },
            callBackMethod: transferOTF,
            customURL: otfCancelURL,
        });
    };

    const handleWorkflowOTFCancellation = (record, actionStatus) => {
        const { otfNumber } = record;
        fnOTFTransfer({
            modalTitle: `${actionStatus === CANCELLN_APPROVE ? translateContent('bookingManagement.label.approval') : translateContent('bookingManagement.label.rejection')}`,
            modalMessage: `${translateContent('bookingManagement.validation.bookingCancellation')} ${actionStatus === CANCELLN_APPROVE ? translateContent('bookingManagement.label.approve') : translateContent('bookingManagement.label.reject')} ${translateContent('bookingManagement.validation.bookingCancellation2')} ${otfData?.bookingNumber || otfData?.otfNumber}`,
            finalData: { id: null, otfId: selectedRecordId, otfNumber, actionCode: actionStatus, remarks: actionStatus },
            callBackMethod: cancelOTFWorkflow,
            customURL: customURLCancelWF,
        });
    };

    const advanceFilterResultProps = {
        extraParams,
        removeFilter,
        otfStatusList,
        advanceFilter: true,
        otfFilter: true,
        filterString,
        setFilterString,
        from: listFilterForm,
        onFinish,
        onFinishFailed,
        handleResetFilter,
        advanceFilterForm,

        title,
        data,
        setAdvanceSearchVisible,
        typeData,
        searchForm,
        onFinishSearch,
    };

    const advanceFilterProps = {
        isVisible: isAdvanceSearchVisible,
        // icon: <FilterIcon size={20} />,
        titleOverride: translateContent('global.advanceFilter.title'),
        onCloseAction: onAdvanceSearchCloseAction,
        handleResetFilter,
        filterString,
        setFilterString,
        advanceFilterForm,
        setAdvanceSearchVisible,
        otfStatusList,
        typeData,
        onFinishSearch,
    };

    const drawerTitle = useMemo(() => {
        if (formActionType?.viewMode) {
            return translateContent('bookingManagement.label.viewBooking');
        } else if (formActionType?.editMode) {
            return translateContent('bookingManagement.label.editBooking');
        } else {
            return translateContent('bookingManagement.label.addNewBooking');
        }
    }, [formActionType]);

    const ChangeHistoryProps = {
        isVisible: ChangeHistoryVisible,
        onCloseAction: () => {
            setChangeHistoryVisible(false);
        },
        titleOverride: ChangeHistoryTitle,
        formData,
        setIsFormVisible,
        buttonData,
        ChangeHistoryTitle,
        selectedRecordId,
        selectedBookingId,
    };

    const OtfSoMappingChangeHistoryProps = {
        isVisible: OtfSoMappingHistoryVisible,
        onCloseAction: () => {
            setOtfSoMappingHistoryVisible(false);
        },
        titleOverride: otfSoMappingChangeHistoryTitle,
        formData,
        setIsFormVisible,
        buttonData,
        otfSoMappingChangeHistoryTitle,
        selectedRecordId,
        selectedOrderId: selectedBookingId || selectedOrderId,
    };

    const filterActiveMenu = (items) => {
        return items?.filter((item) => validateOTFMenu({ item, status: selectedOrder?.orderStatus, otfData }));
    };

    const filterActiveSection = sectionName && filterActiveMenu(Object.values(sectionName));

    const containerProps = {
        MenuCard: LeftProfileCard,
        menuItem: filterActiveSection,
        record: selectedOrder,
        form,
        formActionType,
        setFormActionType,
        onFinish,
        onFinishFailed,
        isVisible: isFormVisible,
        onCloseAction,
        titleOverride: drawerTitle,
        tableData: data,
        ADD_ACTION,
        EDIT_ACTION,
        VIEW_ACTION,
        NEXT_ACTION,
        CANCEL_ACTION,
        buttonData,

        setButtonData,
        handleButtonClick,
        defaultFormActionType,
        defaultBtnVisiblity,
        selectedOrderId,
        setSelectedOrderId,
        selectedRecordId,
        setSelectedRecordId,
        selectedBookingId,
        setSelectedBookingId,
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
        otfData,
        saveButtonName: translateContent('global.buttons.save'),
        handleChangeHistory,
        handleOtfSoMappingHistory,
        refreshData,
        setRefreshData,
        productDetailRefresh,
        setProductDetailRefresh,
        handleUnSavedChangeFn,
        setOpenVehilceModelChange,

        showDetailDataLoading,
        setShowDetailDataLoading,
    };

    const onCancelCloseAction = () => {
        setSingleDisabled(false);
        setIsCancelVisible(false);
        setIsTransferVisible(false);
        setIsAllotVisible(false);
        setOpenVehilceModelChange(false);
        otfTransferForm.resetFields();
        otfCancellationForm.resetFields();
        otfAllotmentForm.resetFields();
        changeVehicleModelForm.resetFields();
    };

    const cancelProps = {
        ...props,
        otfCancellationForm,
        otfData,
        selectedOrder,
        CANCEL_ACTION,
        isVisible: isCancelVisible,
        onCloseAction: onCancelCloseAction,
        onFinishOTFCancellation,
        setUploadedFile,
        uploadedFile,
        handleButtonClick: () => {},
        singleDisabled,
        setSingleDisabled,
    };

    const transferOTFProps = {
        ...props,
        otfTransferForm,
        onFinishOTFTansfer,
        selectedOrder,
        TRANSFER_ACTION,
        isVisible: isTransferVisible,
        onCloseAction: onCancelCloseAction,
        handleButtonClick,
    };

    const allotOTFProps = {
        ...props,
        selectedOrder,
        isVisible: isAllotVisible,
        setIsAllotVisible,
        onCloseAction: onCancelCloseAction,
        refreshData,
        setRefreshData,
        setIsFormVisible,
        setShowDataLoading,
    };

    const changeVehilceModelProps = {
        ...props,
        isOTFModule: true,
        selectedRecordId,
        form: changeVehicleModelForm,
        formActionType,
        selectedOrder,
        isVisible: openVehilceModelChange,
        setOpenVehilceModelChange,
        setIsAllotVisible,
        onCloseAction: onCancelCloseAction,
        refreshData,
        setRefreshData,
        setIsFormVisible,
        setShowDataLoading,
        productDetailRefresh,
        setProductDetailRefresh,
    };

    return (
        <>
            <AdvanceOtfFilter {...advanceFilterResultProps} />
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <ListDataTable handleAdd={handleButtonClick} {...tableProps} showAddButton={false} />
                </Col>
            </Row>
            <AdvancedSearch {...advanceFilterProps} />
            <OTFMainConatiner {...containerProps} />
            {isCancelVisible && <CancellationMaster {...cancelProps} />}
            {isTransferVisible && <TransferMaster {...transferOTFProps} />}
            <ChangeHistory {...ChangeHistoryProps} />
            {isAllotVisible && <OTFAllotmentMaster {...allotOTFProps} />}

            <OtfSoMappingUnmappingChangeHistory {...OtfSoMappingChangeHistoryProps} />
            <ConfirmationModal {...confirmRequest} />
            <UnSaveDataConfirmation {...unSavedDataModalProps} />
            {openVehilceModelChange && <ChangeModelVariantMaster {...changeVehilceModelProps} />}
        </>
    );
};

export const OtfMaster = connect(mapStateToProps, mapDispatchToProps)(OtfMasterBase);
