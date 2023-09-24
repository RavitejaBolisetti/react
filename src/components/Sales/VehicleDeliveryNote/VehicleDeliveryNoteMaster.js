/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Col, Form, Row } from 'antd';
import dayjs from 'dayjs';
import { tableColumn } from './tableColumn';
import { ADD_ACTION, EDIT_ACTION, VIEW_ACTION, NEXT_ACTION, btnVisiblity } from 'utils/btnVisiblity';
import { EMBEDDED_REPORTS } from 'constants/EmbeddedReports';
import { ReportModal } from 'components/common/ReportModal/ReportModal';

import { VehicleDeliveryNoteMainConatiner } from './VehicleDeliveryNoteMainConatiner';
import { ListDataTable } from 'utils/ListDataTable';
import { AdvancedSearch } from './AdvancedSearch';
import { QUERY_BUTTONS_CONSTANTS } from './QueryButtons';
import { showGlobalNotification } from 'store/actions/notification';
import { vehicleDeliveryNoteDataActions } from 'store/actions/data/vehicleDeliveryNote/vehicleDeliveryNote';
import { cancelVehicleDeliveryNoteDataActions } from 'store/actions/data/vehicleDeliveryNote/cancelDeliveryNote';
import { PARAM_MASTER } from 'constants/paramMaster';
import { convertDateTime, dateFormatView } from 'utils/formatDateTime';
import { VEHICLE_DELIVERY_NOTE_SECTION } from 'constants/vehicleDeliveryNoteSection';
import { BASE_URL_VEHICLE_DELIVERY_NOTE_GENERATE as customURL, BASE_URL_VEHICLE_DELIVERY_NOTE_CHALLAN_GENERATE as customChallanURL } from 'constants/routingApi';

import { FilterIcon } from 'Icons';
import VehicleDeliveryNoteFilter from './VehicleDeliveryNoteFilter';
import { validateDeliveryNote } from 'components/Sales/VehicleDeliveryNote/utils/validateDeliveryNote';
import { CancelDeliveryNote } from './CancelDeliveryNote';
import { challanCancelVehicleDeliveryNoteDataActions } from 'store/actions/data/vehicleDeliveryNote/challanCancel';
import { infoCancelVehicleDeliveryNoteDataActions } from 'store/actions/data/vehicleDeliveryNote/infoCancelDeliveryNote';
import { infoChallanVehicleDeliveryNoteDataActions } from 'store/actions/data/vehicleDeliveryNote/infoChallanCancel';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            VehicleDeliveryNote: {
                VehicleDeliveryNoteSearchList: { isLoaded: isSearchDataLoaded = false, isLoading: isSearchLoading, data, filter: filterString },
                CancelInfoDeliveryNote: { isLoaded: isCancelInfoDataLoaded = false, isLoading: isCancelInfoLoading, data: cancelInfo = {} },
                CancelInfoChallanDeliveryNote: { isLoaded: isCancelChallanInfoDataLoaded = false, isLoading: isCancelChallanInfoLoading, data: cancelChallanInfo = {} },
            },
        },
    } = state;
    const moduleTitle = 'Delivery Note';
    let returnValue = {
        userId,
        typeData,
        data: data?.deliveryNoteDetails,
        totalRecords: data?.totalRecords || [],
        deliveryStatusList: Object.values(QUERY_BUTTONS_CONSTANTS),
        moduleTitle,
        isSearchLoading,
        isSearchDataLoaded,
        filterString,

        isCancelInfoDataLoaded,
        isCancelInfoLoading,
        cancelInfo,

        isCancelChallanInfoDataLoaded,
        isCancelChallanInfoLoading,
        cancelChallanInfo,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: vehicleDeliveryNoteDataActions.fetchList,
            saveData: vehicleDeliveryNoteDataActions.saveData,

            listShowLoading: vehicleDeliveryNoteDataActions.listShowLoading,
            setFilterString: vehicleDeliveryNoteDataActions.setFilter,
            cancelDeliveryNote: cancelVehicleDeliveryNoteDataActions.saveData,
            cancelShowLoading: cancelVehicleDeliveryNoteDataActions.listShowLoading,

            cancelChallan: challanCancelVehicleDeliveryNoteDataActions.saveData,

            fetchCancelInfoList: infoCancelVehicleDeliveryNoteDataActions.fetchList,
            resetInfoData: infoCancelVehicleDeliveryNoteDataActions.reset,
            listCancelInfoShowLoading: infoCancelVehicleDeliveryNoteDataActions.listShowLoading,

            fetchChallanCancelInfoList: infoChallanVehicleDeliveryNoteDataActions.fetchList,
            listChallanCancelInfoShowLoading: infoChallanVehicleDeliveryNoteDataActions.listShowLoading,
            resetChallanInfoData: infoChallanVehicleDeliveryNoteDataActions.reset,

            showGlobalNotification,
        },
        dispatch
    ),
});

export const VehicleDeliveryNoteMasterBase = (props) => {
    const { data, receiptDetailData, userId, resetData, fetchList, listShowLoading, saveData } = props;
    const { typeData, receiptType, partySegmentType, paymentModeType, documentType, moduleTitle, totalRecords, showGlobalNotification } = props;
    const { filterString, setFilterString, deliveryStatusList, cancelDeliveryNote, cancelShowLoading, cancelChallan, isCancelInfoDataLoaded, isCancelInfoLoading, cancelInfo, fetchCancelInfoList, listCancelInfoShowLoading, isCancelChallanInfoDataLoaded, isCancelChallanInfoLoading, cancelChallanInfo, fetchChallanCancelInfoList, listChallanCancelInfoShowLoading, resetChallanInfoData, resetInfoData } = props;
    const [isAdvanceSearchVisible, setAdvanceSearchVisible] = useState(false);
    const [deliveryStatus, setDeliveryStatus] = useState(QUERY_BUTTONS_CONSTANTS.PENDING.key);

    const [listFilterForm] = Form.useForm();
    const [cancelDeliveryNoteForm] = Form.useForm();

    const [searchValue, setSearchValue] = useState();

    const [selectedOrder, setSelectedOrder] = useState();
    const [selectedOrderId, setSelectedOrderId] = useState();
    const [soldByDealer, setSoldByDealer] = useState();
    const [selectedCustomerId, setSelectedCustomerId] = useState();

    const [section, setSection] = useState();
    const [defaultSection, setDefaultSection] = useState();
    const [currentSection, setCurrentSection] = useState();
    const [sectionName, setSetionName] = useState();
    const [isLastSection, setLastSection] = useState(false);
    const [retailMonth, setRetailMonth] = useState(false);
    const [yesRetailMonth, setYesRetailMonth] = useState(false);

    const [apportionList, setApportionList] = useState([]);

    const [form] = Form.useForm();

    const [searchForm] = Form.useForm();
    const [advanceFilterForm] = Form.useForm();
    const [invoiceDetailForm] = Form.useForm();

    const [showDataLoading, setShowDataLoading] = useState(true);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [cancelDeliveryNoteVisible, setCancelDeliveryNoteVisible] = useState(false);
    const [previousSection, setpreviousSection] = useState(1);
    const [actionButtonVisiblity, setActionButtonVisiblity] = useState({ canAdd: true, canView: false, canEdit: false });
    const [requestPayload, setRequestPayload] = useState({ deliveryNoteInvoiveDetails: {}, financeDetails: {}, insuranceDto: {}, deliveryNoteAddOnDetails: {}, deliveryNoteCheckListDetails: [''] });
    const [challanRequestPayload, setChallanRequestPayload] = useState({ deliveryNoteInvoiveDetails: {}, insuranceDto: {}, deliveryNoteAddOnDetails: {}, deliveryNoteCheckListDetails: [''] });
    const [toolTipContent, setToolTipContent] = useState();

    const [page, setPage] = useState({ pageSize: 10, current: 1 });
    const [selectedOtfNumber, setSelectedOtfNumber] = useState();
    const [customerIdValue, setCustomerIdValue] = useState();
    const [additionalReportParams, setAdditionalReportParams] = useState();
    const [isReportVisible, setReportVisible] = useState();
    const [chassisNoValue, setChassisNoValue] = useState();
    const [engineChallanNumber, setEngineChallanNumber] = useState('');

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
        cancelDeliveryNoteBtn: false,
        printDeliveryNoteBtn: false,
    };

    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });

    const defaultFormActionType = { addMode: false, editMode: false, viewMode: false };
    const [formActionType, setFormActionType] = useState({ ...defaultFormActionType });

    const [formData, setFormData] = useState([]);

    const onSuccessAction = () => {
        // showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
        searchForm.setFieldsValue({ searchType: undefined, searchParam: undefined });
        searchForm.resetFields();
        setShowDataLoading(false);
    };

    const onErrorAction = (message) => {
        showGlobalNotification({ message });
        setShowDataLoading(false);
    };

    useEffect(() => {
        if (soldByDealer) {
            if (userId && isCancelInfoDataLoaded && cancelInfo) {
                setToolTipContent(
                    <div>
                        <p>
                            Cancelled Date - <span>{cancelInfo?.cancelledDate ? dayjs(cancelInfo?.cancelledDate)?.format('DD MMM YYYY') : 'Na'}</span>
                        </p>
                        <p>
                            Cancelled By - <span>{cancelInfo?.cancelledBy ?? 'Na'}</span>
                        </p>
                        <p>
                            Remarks for Cancellation - <span>{cancelInfo?.remarks ?? 'Na'}</span>
                        </p>
                    </div>
                );
            }
        } else {
            if (userId && isCancelChallanInfoDataLoaded && cancelChallanInfo) {
                setToolTipContent(
                    <div>
                        <p>
                            Cancelled Date - <span>{dayjs(cancelChallanInfo?.cancelledDate)?.format('DD MMM YYYY') ?? 'Na'}</span>
                        </p>
                        <p>
                            Cancelled By - <span>{cancelChallanInfo?.cancelledBy ?? 'Na'}</span>
                        </p>
                        <p>
                            Remarks for Cancellation - <span>{cancelChallanInfo?.remarks ?? 'Na'}</span>
                        </p>
                    </div>
                );
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cancelInfo, isCancelInfoDataLoaded, isCancelChallanInfoDataLoaded, cancelChallanInfo, userId]);

    const extraParams = useMemo(() => {
        return [
            {
                key: 'searchType',
                title: 'Type',
                value: filterString?.searchType,
                name: typeData?.[PARAM_MASTER.DLVR_SER.id]?.find((i) => i?.key === filterString?.searchType)?.value,
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
                key: 'invoiceFromDate',
                title: 'Invoice From Date',
                value: filterString?.invoiceFromDate,
                name: filterString?.invoiceFromDate ? convertDateTime(filterString?.invoiceFromDate, dateFormatView) : '',
                canRemove: true,
                filter: true,
            },
            {
                key: 'invoiceToDate',
                title: 'Invoce To Date',
                value: filterString?.invoiceToDate,
                name: filterString?.invoiceToDate ? convertDateTime(filterString?.invoiceToDate, dateFormatView) : '',
                canRemove: true,
                filter: true,
            },
            {
                key: 'deliveryNoteFromDate',
                title: 'Delivery From Date',
                value: filterString?.deliveryNoteFromDate,
                name: filterString?.deliveryNoteFromDate ? convertDateTime(filterString?.deliveryNoteFromDate, dateFormatView) : '',
                canRemove: true,
                filter: true,
            },
            {
                key: 'deliveryNoteToDate',
                title: 'Delivery To Date',
                value: filterString?.deliveryNoteToDate,
                name: filterString?.deliveryNoteToDate ? convertDateTime(filterString?.deliveryNoteToDate, dateFormatView) : '',
                canRemove: true,
                filter: true,
            },
            {
                key: 'deliveryNoteStatus',
                title: 'Delivery Status',
                value: deliveryStatus,
                canRemove: false,
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
                key: 'pageSize',
                title: 'Value',
                value: filterString?.pageSize,
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
    }, [deliveryStatus, filterString]);

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
    }, [userId, deliveryStatus, filterString]);

    useEffect(() => {
        const defaultSection = VEHICLE_DELIVERY_NOTE_SECTION.INVOICE_DETAILS.id;
        setDefaultSection(defaultSection);
        setSetionName(VEHICLE_DELIVERY_NOTE_SECTION);
        setSection(defaultSection);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (userId && selectedOrder) {
            if (soldByDealer) {
                const cancelInfoExtraParams = [
                    {
                        key: 'invoiceNumber',
                        title: 'invoiceNumber',
                        value: selectedOrder?.invoiceId,
                        name: 'Invoice Number',
                    },
                    {
                        key: 'deliveryNoteNumber',
                        title: 'deliveryNoteNumber',
                        value: selectedOrder?.vehicleDeliveryNote,
                        name: 'Delivery Note Number',
                    },
                ];
                fetchCancelInfoList({ setIsLoading: listCancelInfoShowLoading, userId, extraParams: cancelInfoExtraParams });
            } else {
                const cancelChallanInfoExtraParams = [
                    {
                        key: 'invoiceNumber',
                        title: 'invoiceNumber',
                        value: selectedOrder?.invoiceId,
                        name: 'Invoice Number',
                    },
                    {
                        key: 'deliveryNoteId',
                        title: 'deliveryNoteId',
                        value: selectedOrder?.vehicleDeliveryNote,
                        name: 'Delivery Note Number',
                    },
                ];
                fetchChallanCancelInfoList({ setIsLoading: listChallanCancelInfoShowLoading, userId, extraParams: cancelChallanInfoExtraParams });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedOrder, formActionType?.viewMode, soldByDealer]);

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

    const handleDeliveryNoteTypeChange = (buttonName) => {
        setDeliveryStatus(buttonName?.key);
        searchForm.resetFields();
        switch (buttonName?.key) {
            case QUERY_BUTTONS_CONSTANTS?.PENDING?.key: {
                setActionButtonVisiblity({ canAdd: true, canView: false, canEdit: false });
                break;
            }
            case QUERY_BUTTONS_CONSTANTS?.GENERATED?.key: {
                setActionButtonVisiblity({ canAdd: false, canView: true, canEdit: false });
                setButtonData({ ...buttonData, printDeliveryNoteBtn: true, cancelDeliveryNoteBtn: true });
                break;
            }
            case QUERY_BUTTONS_CONSTANTS?.CANCELLED?.key: {
                setActionButtonVisiblity({ canAdd: false, canView: true, canEdit: false });
                break;
            }
            default: {
                setActionButtonVisiblity({ canAdd: true, canView: false, canEdit: false });
            }
        }
    };

    const handlePrintDownload = (record) => {
        setReportVisible(true);

        setAdditionalReportParams([
            {
                key: 'sa_od_invoice_hdr_id',
                value: record?.id,
            },
        ]);
    };

    const handleChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleSearch = (value) => {
        setFilterString({ ...filterString, searchParam: value });
        // setSearchValue(value);
    };

    const handleButtonClick = ({ record = null, buttonAction, openDefaultSection = true }) => {
        form.resetFields();
        form.setFieldsValue(undefined);
        switch (buttonAction) {
            case ADD_ACTION:
                defaultSection && setCurrentSection(defaultSection);
                invoiceDetailForm.resetFields();
                setpreviousSection(1);
                record && setSelectedOrderId(record?.invoiceId);
                record && setSelectedOtfNumber(record?.otfNumber);
                record && setSelectedCustomerId(record?.customerId);
                record && setSoldByDealer(record?.vehicleSoldByDealer);
                setSelectedOrder(record);
                break;
            case EDIT_ACTION:
                setSelectedOrder(record);
                record && setSelectedOrderId(record?.invoiceId);
                record && setSelectedOtfNumber(record?.otfNumber);
                openDefaultSection && setCurrentSection(defaultSection);

                break;
            case VIEW_ACTION:
                setSelectedOrder(record);
                record && setSoldByDealer(record?.vehicleSoldByDealer);
                record && setSelectedOrderId(record?.invoiceId);
                record && setSelectedOtfNumber(record?.otfNumber);
                record && setSelectedCustomerId(record?.customerId);
                defaultSection && setCurrentSection(defaultSection);
                break;
            case NEXT_ACTION:
                const nextSection = Object.values(sectionName)?.find((i) => validateDeliveryNote({ item: i, soldByDealer }) && i.id > currentSection);
                // const nextSection = Object.values(sectionName)?.find((i) => i.id > currentSection);
                section && setCurrentSection(nextSection?.id);
                setLastSection(!nextSection?.id);
                break;

            default:
                break;
        }

        if (buttonAction !== NEXT_ACTION && !(buttonAction === VIEW_ACTION)) {
            setFormActionType({
                addMode: buttonAction === ADD_ACTION,
                editMode: buttonAction === EDIT_ACTION,
                viewMode: buttonAction === VIEW_ACTION,
            });
            setButtonData(btnVisiblity({ defaultBtnVisiblity, buttonAction }));
        } else if (deliveryStatus === QUERY_BUTTONS_CONSTANTS?.GENERATED?.key && buttonAction === VIEW_ACTION) {
            setFormActionType({
                addMode: buttonAction === ADD_ACTION,
                editMode: buttonAction === EDIT_ACTION,
                viewMode: buttonAction === VIEW_ACTION,
            });
            setButtonData({ printDeliveryNoteBtn: true, cancelDeliveryNoteBtn: true, nextBtn: true, closeBtn: true });
        } else if (deliveryStatus === QUERY_BUTTONS_CONSTANTS?.CANCELLED?.key && buttonAction === VIEW_ACTION) {
            setFormActionType({
                addMode: buttonAction === ADD_ACTION,
                editMode: buttonAction === EDIT_ACTION,
                viewMode: buttonAction === VIEW_ACTION,
            });
            setButtonData({ cancelDeliveryNoteBtn: false, nextBtn: true, closeBtn: true });
        }
        setIsFormVisible(true);
    };

    const onFinishSearch = (values) => {};

    const handleResetFilter = (e) => {
        setShowDataLoading(false);
        setFilterString();
        advanceFilterForm.resetFields();
    };

    const onFinishChallan = () => {
        const data = { ...requestPayload, ...requestPayload?.deliveryNoteInvoiveDetails, invoiceNumber: selectedOrderId, customerId: customerIdValue };
        const onSuccess = (res) => {
            form.resetFields();
            setShowDataLoading(true);
            showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage + 'Delivery Note no.:' + res?.data?.[0]?.vehicleDeliveryNote });
            fetchList({ setIsLoading: listShowLoading, userId, onSuccessAction, extraParams });
            setButtonData({ ...buttonData, formBtnActive: false });
            section && setCurrentSection(VEHICLE_DELIVERY_NOTE_SECTION.THANK_YOU_PAGE.id);
            // setIsFormVisible(false);
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
            customURL: customChallanURL,
        };
        saveData(requestData);
    };

    const onFinish = () => {
        const data = { ...requestPayload, invoiceNumber: selectedOrderId };

        const onSuccess = (res) => {
            form.resetFields();
            setShowDataLoading(true);
            showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
            fetchList({ setIsLoading: listShowLoading, userId, onSuccessAction, extraParams });
            setButtonData({ ...buttonData, formBtnActive: false });
            // setIsFormVisible(false);
            section && setCurrentSection(VEHICLE_DELIVERY_NOTE_SECTION.THANK_YOU_PAGE.id);
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
            customURL,
        };
        saveData(requestData);
    };

    const onFinishFailed = (errorInfo) => {
        return;
    };

    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const onCloseAction = () => {
        // resetData();
        resetChallanInfoData();
        resetInfoData();
        form.resetFields();
        form.setFieldsValue();
        setSelectedOrderId();
        setSelectedOtfNumber();
        setSelectedOrderId();
        setSelectedOrderId();
        setSoldByDealer();

        invoiceDetailForm.resetFields();
        advanceFilterForm.resetFields();
        advanceFilterForm.setFieldsValue();
        setAdvanceSearchVisible(false);

        setSelectedOrder();
        setIsFormVisible(false);
        setCancelDeliveryNoteVisible(false);
        setButtonData({ ...defaultBtnVisiblity });
    };

    const tableProps = {
        dynamicPagination,
        totalRecords,
        setPage,
        tableColumn: tableColumn({ handleButtonClick, actionButtonVisiblity }),
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
        } else if (key === 'invoiceToDate' || key === 'invoiceFromDate' || key === 'deliveryNoteToDate' || key === 'deliveryNoteFromDate') {
            setFilterString();
            advanceFilterForm.resetFields();
        } else {
            const { [key]: names, ...rest } = filterString;
            setFilterString({ ...rest });
        }
    };

    const onCancelDeliveryNote = () => {
        setCancelDeliveryNoteVisible(true);
        const isSameMonth = dayjs(selectedOrder?.invoiceDate)?.isSame(selectedOrder?.deliveryNoteDate, 'month');
        setRetailMonth(isSameMonth);
        setYesRetailMonth(true);
        cancelDeliveryNoteForm.resetFields();
    };

    // const handleCloseReceipt = () => {
    //     setCancelDeliveryNoteVisible(false);
    //     cancelDeliveryNoteForm.resetFields();
    // };

    const onCancelFormFinish = (values) => {
        cancelDeliveryNoteForm
            .validateFields()
            .then((values) => {
                let data;
                if (soldByDealer) {
                    data = { ...values, deliveryNoteNumber: selectedOrder?.vehicleDeliveryNote, status: selectedOrder?.deliveryNoteStatus, cancellationReason: cancelDeliveryNoteForm.getFieldValue('cancellationReason') || '' };
                    // data = { ...values, oemNumber: selectedOrderId, deliveryNoteId: selectedOrder?.vehicleDeliveryNote, status: selectedOrder?.deliveryNoteStatus, cancellationReason: cancelDeliveryNoteForm.getFieldValue('cancellationReason') || '' };
                } else {
                    data = { ...values, oemNumber: selectedOrder?.invoiceId, status: selectedOrder?.deliveryNoteStatus, cancellationReason: cancelDeliveryNoteForm.getFieldValue('cancellationReason') || '' };
                }
                const onSuccess = (res) => {
                    setShowDataLoading(true);
                    showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
                    fetchList({ setIsLoading: listShowLoading, userId, onSuccessAction, extraParams });
                    setButtonData({ ...buttonData, formBtnActive: false });
                    setIsFormVisible(false);
                    setCancelDeliveryNoteVisible(false);
                    cancelDeliveryNoteForm.resetFields();
                };
                const onError = (message) => {
                    showGlobalNotification({ message });
                };
                const requestData = {
                    data: data,
                    method: 'put',
                    setIsLoading: cancelShowLoading,
                    userId,
                    onError,
                    onSuccess,
                };
                if (!soldByDealer) {
                    cancelChallan(requestData);
                } else {
                    cancelDeliveryNote(requestData);
                }
            })
            .catch((err) => {
                return;
            });
    };

    const title = 'Vehicle Delivery Note';

    const advanceFilterResultProps = {
        extraParams,
        removeFilter,
        deliveryStatus,
        deliveryStatusList,
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
        handleDeliveryNoteTypeChange,

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
        deliveryStatusList,
        typeData,
        onFinishSearch,
        deliveryStatus,
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

    const cancelModalCloseAction = () => {
        setCancelDeliveryNoteVisible(false);
        cancelDeliveryNoteForm.resetFields();
    };

    const cancelDeliveryNoteProps = {
        isVisible: cancelDeliveryNoteVisible,
        onCloseAction: cancelModalCloseAction,
        titleOverride: 'Cancel ' + moduleTitle,
        cancelDeliveryNoteForm,
        cancelModalCloseAction,
        onFinish: onCancelFormFinish,
        retailMonth,
        yesRetailMonth,
        setYesRetailMonth,
        typeData,
    };

    const containerProps = {
        record: selectedOrder,
        form,
        invoiceDetailForm,
        formActionType,
        setFormActionType,
        deliveryNoteOnFinish: soldByDealer ? onFinish : onFinishChallan,
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
        setButtonData,
        receiptDetailData,
        previousSection,
        setpreviousSection,
        apportionList,
        setApportionList,
        requestPayload,
        setRequestPayload,
        challanRequestPayload,
        setChallanRequestPayload,
        deliveryStatus,
        selectedOtfNumber,
        setSelectedOtfNumber,
        handlePrintDownload,
        handleButtonClick,
        defaultFormActionType,
        defaultBtnVisiblity,
        selectedOrderId,
        setSelectedOrderId,
        selectedOrder,
        setSelectedOrder,
        setSoldByDealer,
        soldByDealer,
        selectedCustomerId,
        setSelectedCustomerId,
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
        onCancelDeliveryNote,
        saveButtonName: isLastSection ? 'Submit' : 'Save & Next',
        setLastSection,
        customerIdValue,
        setCustomerIdValue,
        chassisNoValue,
        setChassisNoValue,
        engineChallanNumber,
        setEngineChallanNumber,
        toolTipContent,
    };

    const reportDetail = EMBEDDED_REPORTS?.DELIVERY_NOTE_DOCUMENT;
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
            <VehicleDeliveryNoteFilter {...advanceFilterResultProps} />
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <ListDataTable handleButtonClick={handleButtonClick} isLoading={showDataLoading} {...tableProps} showAddButton={false} />
                </Col>
            </Row>
            <AdvancedSearch {...advanceFilterProps} />
            <VehicleDeliveryNoteMainConatiner {...containerProps} />
            <CancelDeliveryNote {...cancelDeliveryNoteProps} />
            <ReportModal {...reportProps} reportDetail={reportDetail} />
        </>
    );
};

export const VehicleDeliveryNoteMaster = connect(mapStateToProps, mapDispatchToProps)(VehicleDeliveryNoteMasterBase);
