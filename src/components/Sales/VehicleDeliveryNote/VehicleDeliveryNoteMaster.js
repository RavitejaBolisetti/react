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
import { tableColumnDeliveryNoteMaster } from './tableColumn';
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

import VehicleDeliveryNoteFilter from './VehicleDeliveryNoteFilter';
import { validateDeliveryNote } from 'components/Sales/VehicleDeliveryNote/utils/validateDeliveryNote';
import { CancelDeliveryNote } from './CancelDeliveryNote';
import { challanCancelVehicleDeliveryNoteDataActions } from 'store/actions/data/vehicleDeliveryNote/challanCancel';
import { DeliverableChecklistMaindataActions } from 'store/actions/data/vehicleDeliveryNote';
import { vehicleChallanDetailsDataActions } from 'store/actions/data/vehicleDeliveryNote/vehicleChallanDetails';
import { DELIVERY_TYPE } from 'constants/modules/vehicleDetailsNotes.js/deliveryType';
import { FORMTYPE_CONSTANTS } from 'constants/formTypeConstant';

import { vehicleDeliveryNoteCustomerDetailDataActions } from 'store/actions/data/vehicleDeliveryNote/customerDetails';
import { DELIVERY_NOTE_STATUS } from './constants/deliveryNoteStatus';
import { translateContent } from 'utils/translateContent';
import { drawerTitle } from 'utils/drawerTitle';
import { UnSaveDataConfirmation } from 'utils/UnSaveDataConfirmation';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            VehicleDeliveryNote: {
                VehicleDeliveryNoteSearchList: { isLoaded: isSearchDataLoaded = false, isLoading: isSearchLoading, data, filter: filterString, isDetailLoaded: isDeliveryDataLoaded = false, detailData: deliveryNoteMasterData = [] },
                VehicleDetailsChallan: { data: vehicleChallanData = {} },
                CustomerDetailsDeliveryNote: { data: customerDetailsDataSearched = {}, isLoading: isCustomerLoading = false },
            },
        },
    } = state;
    const moduleTitle = translateContent('vehicleDeliveryNote.heading.mainTitle');
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

        deliveryNoteMasterData,
        isDeliveryDataLoaded,

        vehicleChallanData,
        customerDetailsDataSearched,

        isCustomerLoading,
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

            fetchCustomerListData: vehicleDeliveryNoteCustomerDetailDataActions.fetchList,
            listCustomerListLoading: vehicleDeliveryNoteCustomerDetailDataActions.listShowLoading,

            cancelDeliveryNote: cancelVehicleDeliveryNoteDataActions.saveData,
            cancelShowLoading: cancelVehicleDeliveryNoteDataActions.listShowLoading,
            cancelChallan: challanCancelVehicleDeliveryNoteDataActions.saveData,

            resetCheckListData: DeliverableChecklistMaindataActions.reset,
            resetChallanData: vehicleChallanDetailsDataActions.reset,
            resetCustomerdata: vehicleDeliveryNoteCustomerDetailDataActions.reset,

            showGlobalNotification,
        },
        dispatch
    ),
});

export const VehicleDeliveryNoteMasterBase = (props) => {
    const { data, receiptDetailData, userId, fetchList, listShowLoading, saveData } = props;
    const { typeData, receiptType, partySegmentType, paymentModeType, documentType, moduleTitle, totalRecords, showGlobalNotification } = props;
    const { filterString, setFilterString, deliveryStatusList, cancelDeliveryNote, cancelShowLoading, cancelChallan, resetCheckListData } = props;
    const { fetchDeliveryNoteMasterData, resetDeliveryNoteMasterData, deliveryNoteMasterData, isDeliveryDataLoaded, vehicleChallanData, resetChallanData } = props;
    const { fetchCustomerListData, listCustomerListLoading, resetCustomerdata, customerDetailsDataSearched, isCustomerLoading } = props;

    const defaultRequestPayload = {
        deliveryNoteInvoiveDetails: {},
        deliveryNoteAddOnDetails: {},
        financeDetails: {},
        insuranceDetails: {},
        vehicleDeliveryCheckList: {},
        customerDetails: {},
        vehicleDetails: {},
    };

    const [form] = Form.useForm();
    const [searchForm] = Form.useForm();
    const [advanceFilterForm] = Form.useForm();
    const [invoiceDetailForm] = Form.useForm();
    const [listFilterForm] = Form.useForm();
    const [cancelDeliveryNoteForm] = Form.useForm();

    const [requestPayload, setRequestPayload] = useState({ ...defaultRequestPayload });

    const [selectedOrder, setSelectedOrder] = useState();
    const [selectedOrderId, setSelectedOrderId] = useState();

    const [isAdvanceSearchVisible, setAdvanceSearchVisible] = useState(false);

    const [deliveryStatus, setDeliveryStatus] = useState(QUERY_BUTTONS_CONSTANTS.PENDING.key);

    const [soldByDealer, setSoldByDealer] = useState(undefined);
    const [selectedCustomerId, setSelectedCustomerId] = useState();

    const [retailMonth, setRetailMonth] = useState(false);
    const [yesRetailMonth, setYesRetailMonth] = useState(false);
    const [apportionList, setApportionList] = useState([]);
    const [showDataLoading, setShowDataLoading] = useState(true);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [cancelDeliveryNoteVisible, setCancelDeliveryNoteVisible] = useState(false);
    const [previousSection, setPreviousSection] = useState(1);
    const [actionButtonVisiblity, setActionButtonVisiblity] = useState({ canAdd: true, canView: false, canEdit: false });
    const [toolTipContent, setToolTipContent] = useState('');
    const [selectedOtfNumber, setSelectedOtfNumber] = useState();
    const [customerIdValue, setCustomerIdValue] = useState();
    const [additionalReportParams, setAdditionalReportParams] = useState();
    const [isReportVisible, setReportVisible] = useState();
    const [chassisNoValue, setChassisNoValue] = useState();
    const [engineChallanNumber, setEngineChallanNumber] = useState('');
    const [deliveryType, setDeliveryType] = useState(DELIVERY_TYPE.NOTE.key);
    const page = { pageSize: 10, current: 1 };

    const [section, setSection] = useState();
    const [defaultSection, setDefaultSection] = useState();
    const [currentSection, setCurrentSection] = useState();
    const [sectionName, setSetionName] = useState();
    const [isLastSection, setLastSection] = useState(false);
    const [formValuesChanged, setFormValuesChanges] = useState(false);
    const [isUnsavedDataPopup, setIsUnsavedDataPopup] = useState(false);
    const [localFormValueChange, setlocalFormValueChange] = useState(false);
    const [itemKey, setItemKey] = useState(false);

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

    const onDeliveryTabChange = (key) => {
        setDeliveryType(key);
        handleDeliveryNoteTypeChange(QUERY_BUTTONS_CONSTANTS?.PENDING);
        setFilterString({ deliveryType: key, deliveryStatus: QUERY_BUTTONS_CONSTANTS?.PENDING?.key, current: 1 });
        advanceFilterForm.resetFields();
    };

    const onSuccessAction = () => {
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
                        {translateContent('vehicleDeliveryNote.label.cancelledDate')} - <span>{deliveryNoteMasterData?.cancellationInformation?.cancelledDate ? dayjs(deliveryNoteMasterData?.cancellationInformation?.cancelledDate)?.format('DD MMM YYYY') : 'Na'}</span>
                    </p>
                    <p>
                        {translateContent('vehicleDeliveryNote.label.cancelledBy')} - <span>{deliveryNoteMasterData?.cancellationInformation?.cancelledBy ?? 'Na'}</span>
                    </p>
                    <p>
                        {translateContent('vehicleDeliveryNote.label.remarksForCancellation')} - <span>{deliveryNoteMasterData?.cancellationInformation?.remarks ?? 'Na'}</span>
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
    }, [typeData, typeData?.[PARAM_MASTER.DLVR_SER.id], deliveryStatus]);

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
                value: filterString?.deliveryStatus || deliveryStatus,
                canRemove: false,
                filter: false,
            },
            {
                key: 'deliveryNoteType',
                title: 'Delivery Status',
                value: filterString?.deliveryType || deliveryType,
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
    }, [userId, filterString]);

    useEffect(() => {
        const defaultSection = VEHICLE_DELIVERY_NOTE_SECTION.INVOICE_DETAILS;
        setDefaultSection(defaultSection?.id);
        setSetionName(VEHICLE_DELIVERY_NOTE_SECTION);
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

    const handleCustomerIdSearch = (customerIdValue = '') => {
        if (!customerIdValue) {
            showGlobalNotification({ notificationType: 'error', title: 'Error', message: translateContent('vehicleDeliveryNote.notificationError.enterCustomerId') });
            return false;
        }
        const onSuccessAction = (res) => {

            setSelectedOrder((prev) => ({ ...prev, customerName: res?.data?.customerName, customerId: res?.data?.customerId }));
            setButtonData({ ...buttonData, formBtnActive: true });
            if (res?.data?.customerId && res?.data?.customerName) {
                showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
            } else {
                showGlobalNotification({ message: translateContent('vehicleDeliveryNote.notificationError.customerDetails') });
            }
        };

        const searchParams = [
            {
                key: 'customerId',
                title: 'customerId',
                value: customerIdValue,
                name: 'Customer ID',
            },
        ];
        fetchCustomerListData({ setIsLoading: listCustomerListLoading, userId, extraParams: searchParams, onSuccessAction, onErrorAction });
    };
    const handleDeliveryNoteTypeChange = (buttonName) => {
        const buttonKey = buttonName?.key;
        setShowDataLoading(true);
        setDeliveryStatus(buttonKey);
        setFilterString({ deliveryStatus: buttonKey, current: 1 });
        switch (buttonKey) {
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

    const handlePrintDownload = (props) => {
        setReportVisible(true);
        setAdditionalReportParams([
            {
                key: deliveryType === DELIVERY_TYPE?.NOTE?.key ? 'delivery_note_id' : deliveryType === DELIVERY_TYPE?.CHALLAN?.key ? 'sa_od_delivery_challan_hdr_id' : null,
                value: deliveryType === DELIVERY_TYPE?.NOTE?.key ? selectedOrder?.vehicleDeliveryNote : deliveryType === DELIVERY_TYPE?.CHALLAN?.key ? selectedOrder?.deliveryHdrId : null,
            },
        ]);
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

    const handleDrawerButtonVisibility = (btnVisiblityProps) => {
        const { buttonAction, record } = btnVisiblityProps;
        let formAction = { addMode: buttonAction === ADD_ACTION, editMode: buttonAction === EDIT_ACTION, viewMode: buttonAction === VIEW_ACTION };
        let btnVisibilityStatus = { ...defaultBtnVisiblity };
        switch (true) {
            case buttonAction !== NEXT_ACTION && !(buttonAction === VIEW_ACTION): {
                btnVisibilityStatus = btnVisiblity({ defaultBtnVisiblity, buttonAction });
                break;
            }
            case deliveryStatus === QUERY_BUTTONS_CONSTANTS?.GENERATED?.key && buttonAction === VIEW_ACTION: {
                const deliveryButtonVisbility = typeData && record?.deliveryNoteStatus !== DELIVERY_NOTE_STATUS?.PENDING_CANCELLATION?.key;
                btnVisibilityStatus = { printDeliveryNoteBtn: true, cancelDeliveryNoteBtn: deliveryButtonVisbility, nextBtn: true, closeBtn: true };
                break;
            }

            case deliveryStatus === QUERY_BUTTONS_CONSTANTS?.CANCELLED?.key && buttonAction === VIEW_ACTION: {
                btnVisibilityStatus = { cancelDeliveryNoteBtn: false, nextBtn: true, closeBtn: true };
                break;
            }
            default:
                btnVisibilityStatus = buttonData;
                formAction = formActionType;
                break;
        }
        return { formAction, btnVisibilityStatus };
    };

    const handleButtonClick = ({ record = null, buttonAction, openDefaultSection = true }) => {
        form.resetFields();
        form.setFieldsValue(undefined);
        switch (buttonAction) {
            case ADD_ACTION:
                defaultSection && setCurrentSection(defaultSection);
                invoiceDetailForm.resetFields();
                setPreviousSection(1);
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
                if (nextSection?.id === VEHICLE_DELIVERY_NOTE_SECTION?.THANK_YOU_PAGE?.id && !formActionType?.addMode) {
                    return false;
                }
                section && setCurrentSection(nextSection?.id);
                setSection(nextSection);
                setLastSection(!nextSection?.id);
                setlocalFormValueChange(false);
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
            const deliveryButtonVisbility = typeData && record?.deliveryNoteStatus !== DELIVERY_NOTE_STATUS?.PENDING_CANCELLATION?.key;
            setButtonData({ printDeliveryNoteBtn: true, cancelDeliveryNoteBtn: deliveryButtonVisbility, nextBtn: true, closeBtn: true });
        } else if (deliveryStatus === QUERY_BUTTONS_CONSTANTS?.CANCELLED?.key && buttonAction === VIEW_ACTION) {
            setFormActionType({
                addMode: buttonAction === ADD_ACTION,
                editMode: buttonAction === EDIT_ACTION,
                viewMode: buttonAction === VIEW_ACTION,
            });
            setButtonData({ cancelDeliveryNoteBtn: false, nextBtn: true, closeBtn: true });
        }
        setButtonData(handleDrawerButtonVisibility({ buttonAction, record })?.btnVisibilityStatus);
        setFormActionType(handleDrawerButtonVisibility({ buttonAction, record })?.formAction);
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
        const { insuranceDetails: insuranceDto, vehicleDeliveryCheckList, ...rest } = requestPayload;
        const vehicleDeliveryChecklist = {
            vin: vehicleDeliveryCheckList?.vin,
            deliveryChecklistDtos: vehicleDeliveryCheckList?.deliveryChecklistDtos?.map((item) => {
                if (item?.answerType === FORMTYPE_CONSTANTS?.FIXED_OPTIONS?.key) {
                    return { ...item, answerText: item?.answerDescription };
                }
                return { ...item };
            }),
        };
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

        const onSuccess = (res) => {
            form.resetFields();
            setShowDataLoading(true);
            fetchList({ setIsLoading: listShowLoading, userId, onSuccessAction, extraParams });
            setButtonData({ ...buttonData, formBtnActive: false });
            const messageList = res?.responseMessage?.split(' ');
            const Number = soldByDealer ? res?.responseMessage?.split('. ')?.[1] : messageList[messageList?.length - 1];
            setSelectedOrder((prev) => ({ ...prev, responseMessage: res?.responseMessage, vehicleDeliveryNote: Number, deliveryNoteDate: dayjs()?.format(dateFormatView), deliveryNoteStatus: 'D', deliveryHdrId: res?.data?.deliveryHdrId }));
            section && setCurrentSection(VEHICLE_DELIVERY_NOTE_SECTION.THANK_YOU_PAGE.id);
            setFormValuesChanges(false);
            setlocalFormValueChange(false);
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

    const handleFormValueChange = () => {
        setFormValuesChanges(true);
        setButtonData({ ...buttonData, formBtnActive: true });
    };
    const handleLocalFormChange = () => {
        setlocalFormValueChange(true);
    };
    const onCloseDrawer = () => {
        if (formValuesChanged) {
            setIsUnsavedDataPopup(true);
        } else {
            onCloseAction();
        }
    };

    const onCloseAction = () => {
        resetDeliveryNoteMasterData();
        resetChallanData();
        resetCustomerdata();
        resetCheckListData();
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
        setFormValuesChanges(false);
        setIsUnsavedDataPopup(false);
        setlocalFormValueChange(false);
    };

    const tableProps = {
        dynamicPagination: true,
        totalRecords,
        setPage: setFilterString,
        page: filterString,
        tableColumn: tableColumnDeliveryNoteMaster({ handleButtonClick, actionButtonVisiblity, deliveryType, deliveryStatus }),
        tableData: data,
        showAddButton: false,
        typeData,
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
        setRetailMonth(false);
        setYesRetailMonth(false);
        cancelDeliveryNoteForm.resetFields();
    };

    const onCancelFormFinish = () => {
        cancelDeliveryNoteForm
            .validateFields()
            .then((values) => {
                let data = {};
                if (soldByDealer) {
                    data = { ...values, invoiceHdrId: selectedOrder?.invoicehdrId, deliveryNoteId: selectedOrder?.deliveryHdrId, status: selectedOrder?.deliveryNoteStatus, cancellationReason: cancelDeliveryNoteForm.getFieldValue('cancellationReason') || '' };
                } else {
                    data = { ...values, oemId: selectedOrder?.invoicehdrId, deliveryChallanId: selectedOrder?.deliveryHdrId, status: selectedOrder?.deliveryNoteStatus, cancellationReason: cancelDeliveryNoteForm.getFieldValue('cancellationReason') || '' };
                }
                const onSuccess = (res) => {
                    setShowDataLoading(true);
                    showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: res?.responseMessage });
                    fetchList({ setIsLoading: listShowLoading, userId, onSuccessAction, extraParams });
                    setButtonData({ ...buttonData, formBtnActive: false });
                    setIsFormVisible(false);
                    setCancelDeliveryNoteVisible(false);
                    cancelDeliveryNoteForm.resetFields();
                    onCloseAction();
                };
                const onError = (message) => {
                    showGlobalNotification({ message });
                };
                const requestData = {
                    data,
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

    const title = translateContent('vehicleDeliveryNote.heading.title');

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
        handleResetFilter,
        advanceFilterForm,
        handleButtonClick,
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
        titleOverride: translateContent('global.advanceFilter.title'),
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
        deliveryType,
    };

    const cancelModalCloseAction = () => {
        setCancelDeliveryNoteVisible(false);
        cancelDeliveryNoteForm.resetFields();
    };

    const cancelDeliveryNoteProps = {
        isVisible: cancelDeliveryNoteVisible,
        onCloseAction: cancelModalCloseAction,
        titleOverride: translateContent('vehicleDeliveryNote.buttons.cancelTitle').concat(' ') + (soldByDealer ? moduleTitle : translateContent('vehicleDeliveryNote.buttons.challan')),
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
        isVisible: isFormVisible,
        onCloseAction: onCloseDrawer,
        titleOverride: drawerTitle(formActionType)
            .concat(' ')
            .concat(soldByDealer ? moduleTitle : translateContent('vehicleDeliveryNote.cancelTitle.challan')),
        tableData: data,
        ADD_ACTION,
        EDIT_ACTION,
        VIEW_ACTION,
        NEXT_ACTION,
        buttonData,
        setButtonData,
        receiptDetailData,
        previousSection,
        setPreviousSection,
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
        handleFormValueChange,
        isLastSection,
        typeData,
        receiptType,
        partySegmentType,
        paymentModeType,
        documentType,
        onCancelDeliveryNote,
        saveButtonName: isLastSection ? translateContent('global.buttons.submit') : translateContent('global.buttons.continue'),
        CancelDeliveryButtonName: soldByDealer ? translateContent('vehicleDeliveryNote.buttons.cancelDeliveryNote') : translateContent('vehicleDeliveryNote.buttons.cancelChallan'),
        PrintButtonName: soldByDealer ? translateContent('vehicleDeliveryNote.buttons.printDeliveryNote') : translateContent('vehicleDeliveryNote.buttons.printChallan'),
        setLastSection,
        customerIdValue,
        setCustomerIdValue,
        chassisNoValue,
        setChassisNoValue,
        engineChallanNumber,
        setEngineChallanNumber,
        toolTipContent,
        deliveryNoteMasterData,
        vehicleChallanData,
        resetCustomerdata,
        handleCustomerIdSearch,
        customerDetailsDataSearched,
        setSection,
        handleLocalFormChange,
        localFormValueChange,
        setIsUnsavedDataPopup,
        setItemKey,
        isCustomerLoading,
    };

    const reportDetail = deliveryType === DELIVERY_TYPE?.NOTE?.key ? EMBEDDED_REPORTS?.DELIVERY_NOTE_DOCUMENT : deliveryType === DELIVERY_TYPE?.CHALLAN?.key ? EMBEDDED_REPORTS?.CHALLAN_DOCUMENT : null;

    const reportProps = {
        isVisible: isReportVisible,
        titleOverride: reportDetail?.title,
        additionalParams: additionalReportParams,
        onCloseAction: () => {
            setReportVisible(false);
        },
    };
    const handleCancelUnsaveDataModal = () => {
        setIsUnsavedDataPopup(false);
        setItemKey();
    };
    const handleLocalSaveClose = () => {
        setIsUnsavedDataPopup(false);
        setlocalFormValueChange(false);
        setCurrentSection(itemKey?.id);
        setSection(itemKey);
        setItemKey();
    };

    const unsavedDataModalProps = {
        isVisible: isUnsavedDataPopup,
        onCloseAction: handleCancelUnsaveDataModal,
        onSubmitAction: itemKey?.id ? handleLocalSaveClose : onCloseAction,
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
            <UnSaveDataConfirmation {...unsavedDataModalProps} />
        </>
    );
};

export const VehicleDeliveryNoteMaster = connect(mapStateToProps, mapDispatchToProps)(VehicleDeliveryNoteMasterBase);
