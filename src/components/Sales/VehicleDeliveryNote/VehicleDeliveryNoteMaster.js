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
import { QUERY_BUTTONS_CONSTANTS, DELIVERY_NOTE_MESSAGE_CONSTANTS } from './QueryButtons';
import { showGlobalNotification } from 'store/actions/notification';
import { vehicleDeliveryNoteDataActions } from 'store/actions/data/vehicleDeliveryNote/vehicleDeliveryNote';
import { cancelVehicleDeliveryNoteDataActions } from 'store/actions/data/vehicleDeliveryNote/cancelDeliveryNote';
import { PARAM_MASTER } from 'constants/paramMaster';
import { convertDateTime, dateFormatView } from 'utils/formatDateTime';
import { VEHICLE_DELIVERY_NOTE_SECTION } from 'constants/vehicleDeliveryNoteSection';
import { BASE_URL_VEHICLE_DELIVERY_NOTE_GENERATE as customURL, BASE_URL_VEHICLE_DELIVERY_NOTE_CHALLAN_GENERATE as customChallanURL, BASE_URL_VEHICE_DELIVERY_NOTE_MASTER_DATA, BASE_URL_VEHICE_DELIVERY_NOTE_CHALLAN_MASTER_DATA } from 'constants/routingApi';

import { FilterIcon } from 'Icons';
import VehicleDeliveryNoteFilter from './VehicleDeliveryNoteFilter';
import { validateDeliveryNote } from 'components/Sales/VehicleDeliveryNote/utils/validateDeliveryNote';
import { CancelDeliveryNote } from './CancelDeliveryNote';
import { challanCancelVehicleDeliveryNoteDataActions } from 'store/actions/data/vehicleDeliveryNote/challanCancel';
import { infoCancelVehicleDeliveryNoteDataActions } from 'store/actions/data/vehicleDeliveryNote/infoCancelDeliveryNote';
import { infoChallanVehicleDeliveryNoteDataActions } from 'store/actions/data/vehicleDeliveryNote/infoChallanCancel';
import { DeliverableChecklistMaindataActions } from 'store/actions/data/vehicleDeliveryNote';
import { DELIVERY_TYPE } from 'constants/modules/vehicleDetailsNotes.js/deliveryType';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            VehicleDeliveryNote: {
                VehicleDeliveryNoteSearchList: { isLoaded: isSearchDataLoaded = false, isLoading: isSearchLoading, data, filter: filterString, isDetailLoaded: isDeliveryDataLoaded = false, detailData: deliveryNoteMasterData = [] },
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

        deliveryNoteMasterData,
        isDeliveryDataLoaded,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: vehicleDeliveryNoteDataActions.fetchList,
            fetchDeliveryNoteMasterData: vehicleDeliveryNoteDataActions.fetchDetail,
            resetDeliveryNoteMasterData: vehicleDeliveryNoteDataActions.resetDetail,
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

            resetCheckListData: DeliverableChecklistMaindataActions.reset,

            showGlobalNotification,
        },
        dispatch
    ),
});

export const VehicleDeliveryNoteMasterBase = (props) => {
    const { data, receiptDetailData, userId, resetData, fetchList, listShowLoading, saveData } = props;
    const { typeData, receiptType, partySegmentType, paymentModeType, documentType, moduleTitle, totalRecords, showGlobalNotification } = props;
    const { filterString, setFilterString, deliveryStatusList, cancelDeliveryNote, cancelShowLoading, cancelChallan, isCancelInfoDataLoaded, isCancelInfoLoading, cancelInfo, fetchCancelInfoList, listCancelInfoShowLoading, isCancelChallanInfoDataLoaded, isCancelChallanInfoLoading, cancelChallanInfo, fetchChallanCancelInfoList, listChallanCancelInfoShowLoading, resetChallanInfoData, resetInfoData, resetCheckListData } = props;
    const { fetchDeliveryNoteMasterData, resetDeliveryNoteMasterData, deliveryNoteMasterData, isDeliveryDataLoaded } = props;

    const defaultRequestPayload = {
        deliveryNoteInvoiveDetails: {},
        deliveryNoteAddOnDetails: {},
        financeDetails: {},
        insuranceDetails: {},
        vehicleDeliveryCheckList: {},
        customerDetails: {},
        vehicleDetails: {},
    };
    const defaultchallanRequestPayload = {
        deliveryNoteInvoiveDetails: {},
        insuranceDto: {},
        deliveryNoteAddOnDetails: {},
        vehicleDeliveryCheckList: {},
        customerDetails: {},
        vehicleDetails: {},
    };

    const [requestPayload, setRequestPayload] = useState({ ...defaultRequestPayload });
    const [challanRequestPayload, setChallanRequestPayload] = useState({ ...defaultchallanRequestPayload });
    const [isAdvanceSearchVisible, setAdvanceSearchVisible] = useState(false);
    const [deliveryStatus, setDeliveryStatus] = useState(QUERY_BUTTONS_CONSTANTS.PENDING.key);

    const [listFilterForm] = Form.useForm();
    const [cancelDeliveryNoteForm] = Form.useForm();

    const [searchValue, setSearchValue] = useState('');
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

    const [toolTipContent, setToolTipContent] = useState('');

    const [page, setPage] = useState({ pageSize: 10, current: 1 });
    const [selectedOtfNumber, setSelectedOtfNumber] = useState();
    const [customerIdValue, setCustomerIdValue] = useState();
    const [additionalReportParams, setAdditionalReportParams] = useState();
    const [isReportVisible, setReportVisible] = useState();
    const [chassisNoValue, setChassisNoValue] = useState();
    const [engineChallanNumber, setEngineChallanNumber] = useState('');
    const [deliveryType, setDeliveryType] = useState(DELIVERY_TYPE.NOTE.key);

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

    const onDeliveryTabChange = (key) => {
        setDeliveryType(key);
        setPage((prev) => ({ ...prev, current: 1 }));
        setFilterString({});
        setFilterString((prev) => ({ ...prev, searchParam: '', current: 1 }));
        advanceFilterForm.resetFields();
        searchForm.resetFields();
    };

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
        if (deliveryNoteMasterData && isDeliveryDataLoaded) {
            setToolTipContent(
                <div>
                    <p>
                        Cancelled Date - <span>{deliveryNoteMasterData?.cancellationInformation?.cancelledDate ? dayjs(deliveryNoteMasterData?.cancellationInformation?.cancelledDate)?.format('DD MMM YYYY') : 'Na'}</span>
                    </p>
                    <p>
                        Cancelled By - <span>{deliveryNoteMasterData?.cancellationInformation?.cancelledBy ?? 'Na'}</span>
                    </p>
                    <p>
                        Remarks for Cancellation - <span>{deliveryNoteMasterData?.cancellationInformation?.remarks ?? 'Na'}</span>
                    </p>
                </div>
            );
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [deliveryNoteMasterData, isDeliveryDataLoaded]);

    useEffect(() => {
        return () => {
            resetDeliveryNoteMasterData();
            setFilterString();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    useEffect(() => {
        typeData && typeData?.[PARAM_MASTER.DLVR_SER.id]?.length && searchForm.setFieldsValue({ searchType: 'invoiceId' });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [typeData]);

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
                key: 'deliveryNoteType',
                title: 'Delivery Status',
                value: deliveryType,
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
    }, [deliveryStatus, filterString, deliveryType, page]);

    useEffect(() => {
        if (deliveryNoteMasterData && typeof deliveryNoteMasterData === 'object' && Object?.keys(deliveryNoteMasterData)?.length && isDeliveryDataLoaded) {
            setRequestPayload((prev) => ({ ...prev, ...deliveryNoteMasterData }));
        } else {
            setRequestPayload({ ...defaultRequestPayload });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [deliveryNoteMasterData, isDeliveryDataLoaded]);

    useEffect(() => {
        if (userId) {
            setShowDataLoading(true);
            fetchList({ setIsLoading: listShowLoading, userId, extraParams, onSuccessAction, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, deliveryStatus, filterString, deliveryType, page]);

    useEffect(() => {
        const defaultSection = VEHICLE_DELIVERY_NOTE_SECTION.INVOICE_DETAILS.id;
        setDefaultSection(defaultSection);
        setSetionName(VEHICLE_DELIVERY_NOTE_SECTION);
        setSection(defaultSection);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // useEffect(() => {
    //     if (userId && selectedOrder) {
    //         if (soldByDealer) {
    //             const cancelInfoExtraParams = [
    //                 {
    //                     key: 'invoiceNumber',
    //                     title: 'invoiceNumber',
    //                     value: selectedOrder?.invoiceId,
    //                     name: 'Invoice Number',
    //                 },
    //                 {
    //                     key: 'deliveryNoteNumber',
    //                     title: 'deliveryNoteNumber',
    //                     value: selectedOrder?.vehicleDeliveryNote,
    //                     name: 'Delivery Note Number',
    //                 },
    //             ];
    //             fetchCancelInfoList({ setIsLoading: listCancelInfoShowLoading, userId, extraParams: cancelInfoExtraParams });
    //         } else {
    //             const cancelChallanInfoExtraParams = [
    //                 {
    //                     key: 'invoiceNumber',
    //                     title: 'invoiceNumber',
    //                     value: selectedOrder?.invoiceId,
    //                     name: 'Invoice Number',
    //                 },
    //                 {
    //                     key: 'deliveryNoteId',
    //                     title: 'deliveryNoteId',
    //                     value: selectedOrder?.vehicleDeliveryNote,
    //                     name: 'Delivery Note Number',
    //                 },
    //             ];
    //             fetchChallanCancelInfoList({ setIsLoading: listChallanCancelInfoShowLoading, userId, extraParams: cancelChallanInfoExtraParams });
    //         }
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [selectedOrder, formActionType?.viewMode, soldByDealer]);

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
                key: 'delivery_note_id',
                value: selectedOrder?.vehicleDeliveryNote,
            },
        ]);
    };

    const handleChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleSearch = (value) => {
        setFilterString({ ...filterString, searchParam: value });
    };
    const handleDeliveryNoteDataCall = (invoicehdrId = '', deliveryHdrId = '', buttonAction = ADD_ACTION, soldByDealer = true) => {
        switch (buttonAction) {
            case ADD_ACTION: {
                if (!invoicehdrId) {
                    showGlobalNotification({ ...DELIVERY_NOTE_MESSAGE_CONSTANTS?.DELIVERY_NOTE_DETAILS_NOT_PRESENT });
                    return;
                }
                break;
            }
            default: {
                if (!invoicehdrId || !deliveryHdrId) {
                    showGlobalNotification({ ...DELIVERY_NOTE_MESSAGE_CONSTANTS?.DELIVERY_NOTE_DETAILS_NOT_PRESENT });
                    return;
                }
                break;
            }
        }
        let deliveryURL = BASE_URL_VEHICE_DELIVERY_NOTE_MASTER_DATA;
        if (!soldByDealer) {
            deliveryURL = BASE_URL_VEHICE_DELIVERY_NOTE_CHALLAN_MASTER_DATA;
        }
        const deliveryParams = [
            {
                key: 'invoiceHdrId',
                value: invoicehdrId,
                name: 'Invoice id',
            },
            {
                key: 'deliverynoteId',
                value: deliveryHdrId,
                name: 'Delivery note id',
            },
        ];
        fetchDeliveryNoteMasterData({ customURL: deliveryURL, setIsLoading: listShowLoading, userId, onSuccessAction, extraParams: deliveryParams, onErrorAction });
    };

    const handleButtonClick = ({ record = null, buttonAction, openDefaultSection = true }) => {
        console.log('record', record);
        form.resetFields();
        form.setFieldsValue(undefined);
        switch (buttonAction) {
            case ADD_ACTION:
                defaultSection && setCurrentSection(defaultSection);
                invoiceDetailForm.resetFields();
                setpreviousSection(1);
                record?.vehicleSoldByDealer && handleDeliveryNoteDataCall(record?.invoicehdrId, '', ADD_ACTION, record?.vehicleSoldByDealer);
                record && setSelectedOrderId(record?.invoiceId);
                record && setSelectedOtfNumber(record?.otfNumber);
                record && setSelectedCustomerId(record?.customerId);
                record && setSoldByDealer(record?.vehicleSoldByDealer);
                setSelectedOrder(record);
                break;
            case EDIT_ACTION:
                setSelectedOrder(record);
                handleDeliveryNoteDataCall(record?.invoicehdrId, record?.deliveryHdrId, EDIT_ACTION, record?.vehicleSoldByDealer);
                record && setSelectedOrderId(record?.invoiceId);
                record && setSelectedOtfNumber(record?.otfNumber);
                openDefaultSection && setCurrentSection(defaultSection);

                break;
            case VIEW_ACTION:
                setSelectedOrder(record);
                handleDeliveryNoteDataCall(record?.invoicehdrId, record?.deliveryHdrId, VIEW_ACTION, record?.vehicleSoldByDealer);
                record && setSoldByDealer(record?.vehicleSoldByDealer);
                record && setSelectedOrderId(record?.invoiceId);
                record && setSelectedOtfNumber(record?.otfNumber);
                record && setSelectedCustomerId(record?.customerId);
                defaultSection && setCurrentSection(defaultSection);
                break;
            case NEXT_ACTION:
                const nextSection = Object.values(sectionName)?.find((i) => validateDeliveryNote({ item: i, soldByDealer }) && i.id > currentSection);
                // const nextSection = Object.values(sectionName)?.find((i) => i.id > currentSection);
                if (nextSection?.id === VEHICLE_DELIVERY_NOTE_SECTION?.THANK_YOU_PAGE?.id && !formActionType?.addMode) {
                    return false;
                }
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
        setFilterString({});
        advanceFilterForm.resetFields();
    };

    const onFinish = () => {
        if (!Object.keys(requestPayload)?.length) {
            return;
        }
        let finalPayload = {};
        const { insuranceDetails: insuranceDto, vehicleDeliveryCheckList: vehicleDeliveryChecklist, ...rest } = requestPayload;

        switch (deliveryType) {
            case DELIVERY_TYPE.NOTE.key: {
                finalPayload = { ...rest, insuranceDto, vehicleDeliveryChecklist, invoiceNumber: selectedOrder?.invoicehdrId };
                break;
            }
            case DELIVERY_TYPE.CHALLAN.key: {
                finalPayload = { chassisNumber: requestPayload?.deliveryNoteInvoiveDetails?.chassisNumber, engineNumber: requestPayload?.deliveryNoteInvoiveDetails?.engineNumber, vin: requestPayload?.vehicleDetails?.vinNumber, modelCode: requestPayload?.vehicleDetails?.modelCode, insuranceDto, vehicleDeliveryChecklist, invoiceNumber: selectedOrder?.invoicehdrId, customerId: requestPayload?.customerDetails?.customerId };
                break;
            }
            default: {
                finalPayload = { ...rest, insuranceDto, vehicleDeliveryChecklist, invoiceNumber: selectedOrder?.invoicehdrId };
            }
        }
        // console.log('finalPayload', finalPayload);
        const onSuccess = (res) => {
            form.resetFields();
            setShowDataLoading(true);
            fetchList({ setIsLoading: listShowLoading, userId, onSuccessAction, extraParams });
            setButtonData({ ...buttonData, formBtnActive: false });
            const messageList = res?.responseMessage?.split(' ');
            const Number = soldByDealer ? res?.responseMessage?.split('. ')?.[1] : messageList[messageList?.length - 1];
            setSelectedOrder((prev) => ({ ...prev, responseMessage: res?.responseMessage, vehicleDeliveryNote: Number, deliveryNoteDate: dayjs()?.format(dateFormatView) }));
            section && setCurrentSection(VEHICLE_DELIVERY_NOTE_SECTION.THANK_YOU_PAGE.id);
        };
        const onError = (message) => {
            showGlobalNotification({ message });
        };
        const requestData = {
            data: finalPayload,
            method: 'post',
            setIsLoading: listShowLoading,
            userId,
            onError,
            onSuccess,
            customURL: soldByDealer ? customURL : customChallanURL,
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
        resetDeliveryNoteMasterData();
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
        resetCheckListData();
    };

    const tableProps = {
        dynamicPagination,
        totalRecords,
        setPage,
        page,
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

    const handleCancelCheck = (soldByDealer) => {
        if (soldByDealer) {
            if (dayjs()?.isSame(selectedOrder?.deliveryNoteDate, 'year')) {
                setRetailMonth(dayjs()?.isSame(selectedOrder?.deliveryNoteDate, 'month'));
                setYesRetailMonth(true);
            } else {
                setRetailMonth(false);
                setYesRetailMonth(false);
            }
        } else {
            setRetailMonth(false);
            setYesRetailMonth(false);
        }
    };

    const onCancelDeliveryNote = () => {
        setCancelDeliveryNoteVisible(true);
        handleCancelCheck(soldByDealer);
        cancelDeliveryNoteForm.resetFields();
    };

    const onCancelFormFinish = (values) => {
        cancelDeliveryNoteForm
            .validateFields()
            .then((values) => {
                let data;
                if (soldByDealer) {
                    data = { ...values, invoiceHdrId: selectedOrder?.invoicehdrId, deliveryNoteId: selectedOrder?.deliveryHdrId, status: selectedOrder?.deliveryNoteStatus, cancellationReason: cancelDeliveryNoteForm.getFieldValue('cancellationReason') || '' };
                } else {
                    data = { ...values, oemId: selectedOrder?.invoicehdrId, deliveryChallanId: selectedOrder?.deliveryHdrId, status: selectedOrder?.deliveryNoteStatus, cancellationReason: cancelDeliveryNoteForm.getFieldValue('cancellationReason') || '' };
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
        onDeliveryTabChange,
        deliveryType,
    };

    const advanceFilterProps = {
        isVisible: isAdvanceSearchVisible,
        receiptType,
        partySegmentType,
        // icon: <FilterIcon size={20} />,
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
    const payloadRequestProps = {
        requestPayload,
        setRequestPayload,
        challanRequestPayload,
        setChallanRequestPayload,
        deliveryType,
    };

    const containerProps = {
        ...payloadRequestProps,
        record: selectedOrder,
        form,
        invoiceDetailForm,
        formActionType,
        setFormActionType,
        deliveryNoteOnFinish: onFinish,
        onFinishFailed,
        isVisible: isFormVisible,
        onCloseAction,
        titleOverride: drawerTitle.concat(soldByDealer ? moduleTitle : 'Challan'),
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
        saveButtonName: isLastSection ? 'Submit' : 'Continue',
        setLastSection,
        customerIdValue,
        setCustomerIdValue,
        chassisNoValue,
        setChassisNoValue,
        engineChallanNumber,
        setEngineChallanNumber,
        toolTipContent,
        deliveryNoteMasterData,
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
