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
import ReceiptFilter from './ReceiptFilter';
import { ADD_ACTION, EDIT_ACTION, VIEW_ACTION, NEXT_ACTION, btnVisiblity } from 'utils/btnVisiblity';

import { ReceiptMainConatiner } from './ReceiptMainConatiner';
import { ListDataTable } from 'utils/ListDataTable';
import { AdvancedSearch } from './AdvancedSearch';
import { CancelReceipt } from './CancelReceipt';
import { QUERY_BUTTONS_CONSTANTS } from './QueryButtons';
import { RECEIPT_SECTION } from 'constants/ReceiptSection';
import { convertDateTime, dateFormatView } from 'utils/formatDateTime';
import { EMBEDDED_REPORTS } from 'constants/EmbeddedReports';

import { showGlobalNotification } from 'store/actions/notification';
import { receiptDataActions } from 'store/actions/data/receipt/receipt';
import { receiptDetailDataActions } from 'store/actions/data/receipt/receiptDetails';
import { cancelReceiptDataActions } from 'store/actions/data/receipt/cancelReceipt';
import { PARAM_MASTER } from 'constants/paramMaster';
import { partyDetailDataActions } from 'store/actions/data/receipt/partyDetails';
import { ReportModal } from 'components/common/ReportModal/ReportModal';
import { translateContent } from 'utils/translateContent';
import { drawerTitle } from 'utils/drawerTitle';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            Receipt: {
                ReceiptSearchList: { isLoaded: isSearchDataLoaded = false, isLoading: isSearchLoading, data, filter: filterString },
                ReceiptDetails: { isLoaded: isDetailedDataLoaded = false, isLoading, data: receiptDetailData = [] },
            },
        },
    } = state;
    const moduleTitle = translateContent('receipts.heading.drawerTitleMain');
    const page = { pageSize: 10, current: 1 };

    let returnValue = {
        userId,
        typeData,
        receiptType: typeData[PARAM_MASTER.RECPT_TYPE.id],
        partySegmentType: typeData[PARAM_MASTER.PARTY_CATEG.id],
        paymentModeType: typeData[PARAM_MASTER.RECPT_PAYMNT_MODE.id],
        documentType: typeData[PARAM_MASTER.RECPT_DOC_TYPE.id],
        data: data?.paginationData,
        totalRecords: data?.totalRecords || [],
        receiptStatusList: Object.values(QUERY_BUTTONS_CONSTANTS),
        receiptDetailData,
        isLoading,
        moduleTitle,
        isSearchLoading,
        isSearchDataLoaded,
        isDetailedDataLoaded,
        filterString,
        page,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchReceiptDetails: receiptDetailDataActions.fetchList,
            saveData: receiptDetailDataActions.saveData,
            setFilterString: receiptDataActions.setFilter,
            resetData: receiptDetailDataActions.reset,
            fetchList: receiptDataActions.fetchList,
            cancelReceipt: cancelReceiptDataActions.saveData,
            listShowLoading: receiptDataActions.listShowLoading,

            //resetPartyDetailData: partyDetailDataActions.reset,

            showGlobalNotification,
        },
        dispatch
    ),
});

export const ReceiptMasterBase = (props) => {
    const { fetchList, saveData, listShowLoading, userId, fetchReceiptDetails, resetPartyDetailData, data, receiptDetailData, resetData, cancelReceipt } = props;
    const { typeData, receiptType, partySegmentType, paymentModeType, documentType, moduleTitle, totalRecords, showGlobalNotification, page } = props;
    const { filterString, setFilterString, receiptStatusList } = props;
    const [isAdvanceSearchVisible, setAdvanceSearchVisible] = useState(false);
    const [receiptStatus, setReceiptStatus] = useState(QUERY_BUTTONS_CONSTANTS.OPENED.key);
    const [requestPayload, setRequestPayload] = useState({ partyDetails: {}, receiptsDetails: {}, apportionDetails: {} });
    const [listFilterForm] = Form.useForm();
    const [cancelReceiptForm] = Form.useForm();

    const [searchValue, setSearchValue] = useState();

    const [selectedOrder, setSelectedOrder] = useState();
    const [selectedOrderId, setSelectedOrderId] = useState();

    const [section, setSection] = useState();
    const [defaultSection, setDefaultSection] = useState();
    const [currentSection, setCurrentSection] = useState();
    const [sectionName, setSetionName] = useState();
    const [isLastSection, setLastSection] = useState(false);
    const [receipt, setReceipt] = useState('');
    const [totalReceivedAmount, setTotalReceivedAmount] = useState(0.0);

    const [apportionList, setApportionList] = useState([]);

    const [form] = Form.useForm();
    const [searchForm] = Form.useForm();
    const [advanceFilterForm] = Form.useForm();
    const [partyDetailForm] = Form.useForm();

    const [showDataLoading, setShowDataLoading] = useState(true);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [cancelReceiptVisible, setCancelReceiptVisible] = useState(false);
    const [partySegment, setPartySegment] = useState('');
    const [partyId, setPartyId] = useState();
    const [additionalReportParams, setAdditionalReportParams] = useState();
    const [isReportVisible, setReportVisible] = useState();
    const [previousSection, setPreviousSection] = useState(1);

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
        cancelReceiptBtn: false,
        printReceiptBtn: false,
    };

    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });

    const defaultFormActionType = { addMode: false, editMode: false, viewMode: false };
    const [formActionType, setFormActionType] = useState({ ...defaultFormActionType });

    const onSuccessAction = (res) => {
        showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: res?.responseMessage });
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
                key: 'pageNumber',
                title: 'Value',
                value: filterString?.current ?? page?.current,
                canRemove: true,
                filter: false,
            },
            {
                key: 'pageSize',
                title: 'Value',
                value: filterString?.pageSize ?? page?.pageSize,
                canRemove: true,
                filter: false,
            },
            {
                key: 'searchType',
                title: 'Value',
                value: 'receiptNumber',
                canRemove: false,
                filter: false,
            },
            {
                key: 'searchParam',
                title: 'searchParam',
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
                key: 'receiptStatus',
                title: 'Receipt Status',
                value: receiptStatus,
                canRemove: false,
                filter: false,
            },
            {
                key: 'receiptType',
                title: 'Receipt Type',
                value: filterString?.receiptType,
                name: receiptType?.find((i) => i?.key === filterString?.receiptType)?.value,
                canRemove: true,
                filter: true,
            },
            {
                key: 'partySegment',
                title: 'Party Segment',
                value: filterString?.partySegment,
                name: partySegmentType?.find((i) => i?.key === filterString?.partySegment)?.value,
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
    }, [searchValue, receiptStatus, filterString, page]);

    useEffect(() => {
        return () => {
            resetData();
            setFilterString();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (userId) {
            setShowDataLoading(true);
            fetchList({ setIsLoading: listShowLoading, userId, extraParams, onSuccessAction, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, receiptStatus, filterString]);

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
            fetchReceiptDetails({ setIsLoading: listShowLoading, userId, extraParams });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, selectedOrderId]);

    useEffect(() => {
        const defaultSection = RECEIPT_SECTION.PARTY_DETAILS.id;
        setDefaultSection(defaultSection);
        setSetionName(RECEIPT_SECTION);
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

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentSection, sectionName]);

    const handleReceiptTypeChange = (buttonName) => {
        setReceiptStatus(buttonName?.key);
        setFilterString({ current: 1 });
        searchForm.resetFields();
    };

    const handleChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleSearch = (value) => {
        setFilterString({ ...filterString, searchParam: value, current: 1, advanceFilter: true });
        searchForm?.resetFields();
        setSearchValue(value);
    };

    const handleButtonClick = ({ record = null, buttonAction, openDefaultSection = true }) => {
        switch (buttonAction) {
            case ADD_ACTION:
                setPreviousSection(1);
                defaultSection && setCurrentSection(defaultSection);
                partyDetailForm.resetFields();
                setApportionList([]);
                break;
            case EDIT_ACTION:
                setSelectedOrder(record);
                record && setSelectedOrderId(record?.id);
                openDefaultSection && setCurrentSection(defaultSection);

                break;
            case VIEW_ACTION:
                setSelectedOrder(record);
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
            if (buttonAction === EDIT_ACTION) {
                setButtonData({ ...buttonData, nextBtn: true, editBtn: false, saveBtn: true });
            } else {
                const Visibility = btnVisiblity({ defaultBtnVisiblity, buttonAction });
                setButtonData(Visibility);
                if (buttonAction === VIEW_ACTION) {
                    receiptStatus === QUERY_BUTTONS_CONSTANTS.CANCELLED.key ? setButtonData({ ...Visibility, editBtn: false, cancelReceiptBtn: false, printReceiptBtn: true }) : receiptStatus === QUERY_BUTTONS_CONSTANTS.APPORTION.key ? setButtonData({ ...Visibility, editBtn: false, cancelReceiptBtn: true, printReceiptBtn: true }) : setButtonData({ ...Visibility, editBtn: true, cancelReceiptBtn: true, printReceiptBtn: true });
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

    const handlePrintDownload = (record) => {
        setReportVisible(true);
        setAdditionalReportParams([
            {
                key: 'fn_vc_receipts_hdr_id',
                value: record?.id,
            },
        ]);
    };

    const onFinish = (receiptData) => {
        const data = { ...requestPayload, apportionDetails: receiptData.hasOwnProperty('receiptType') ? [] : apportionList, receiptsDetails: receiptData.hasOwnProperty('receiptType') ? receiptData : requestPayload?.receiptsDetails };

        const onSuccess = (res) => {
            form.resetFields();
            setShowDataLoading(true);
            showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: res?.responseMessage + translateContent('receipts.heading.profileCard.receiptNumber') + res?.data?.receiptsDetails?.receiptNumber });
            fetchList({ setIsLoading: listShowLoading, userId, onSuccessAction, extraParams });
            setButtonData({ ...buttonData, formBtnActive: false });
            setIsFormVisible(false);
            onCloseAction();
        };

        const sectionKey = {
            partyDetails: RECEIPT_SECTION.PARTY_DETAILS.id,
            receiptsDetails: RECEIPT_SECTION.RECEIPT_DETAILS.id,
            apportionDetails: RECEIPT_SECTION.APPORTION_DETAILS.id,
        };

        const onError = (message, errorData, errorSection) => {
            showGlobalNotification({ message });
            if (errorSection) {
                errorSection && setCurrentSection(sectionKey?.[errorSection]);
            }
        };

        const requestData = {
            data: data,
            method: 'post',
            setIsLoading: listShowLoading,
            userId,
            onError,
            errorData: true,
            onSuccess,
        };

        saveData(requestData);
    };
    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const onCloseAction = () => {
        resetData();
        form.resetFields();
        form.setFieldsValue();
        setSelectedOrderId();
        partyDetailForm.resetFields();
        setReceipt();
        setTotalReceivedAmount(0.0);
        //resetPartyDetailData();

        advanceFilterForm.resetFields();
        advanceFilterForm.setFieldsValue();
        setAdvanceSearchVisible(false);

        setApportionList([]);
        setSelectedOrder();
        setIsFormVisible(false);
        setCancelReceiptVisible(false);
        setButtonData({ ...defaultBtnVisiblity });
        setRequestPayload();
    };

    const tableProps = {
        dynamicPagination,
        totalRecords,
        page: filterString,
        setPage: setFilterString,
        tableColumn: tableColumn(handleButtonClick),
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

    const onCancelCloseAction = () => {
        setCancelReceiptVisible(false);
        cancelReceiptForm.resetFields();
    };

    const removeFilter = (key) => {
        if (key === 'searchParam') {
            const { searchType, searchParam, ...rest } = filterString;
            setFilterString({ ...rest });
        } else {
            const { [key]: names, ...rest } = filterString;
            setFilterString({ ...rest });
        }
    };

    const onCancelReceipt = () => {
        setCancelReceiptVisible(true);
    };

    const handleCloseReceipt = () => {
        setCancelReceiptVisible(false);
        cancelReceiptForm.resetFields();
    };

    const handleCancelReceipt = () => {
        const recordId = selectedOrderId;
        const cancelRemark = cancelReceiptForm.getFieldValue().cancelRemarks;
        const data = { id: recordId ?? '', receiptNumber: receiptDetailData?.receiptsDetails?.receiptNumber, cancelRemarks: cancelRemark };

        const onSuccess = (res) => {
            setShowDataLoading(true);
            showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: res?.responseMessage });
            fetchList({ setIsLoading: listShowLoading, userId, onSuccessAction, extraParams });
            setButtonData({ ...buttonData, formBtnActive: false });
            setIsFormVisible(false);
            setCancelReceiptVisible(false);
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

        cancelReceipt(requestData);
    };

    const title = translateContent('receipts.heading.mainTitle');

    const advanceFilterResultProps = {
        extraParams,
        removeFilter,
        receiptStatus,
        receiptStatusList,
        advanceFilter: true,
        otfFilter: true,
        filterString,
        setFilterString,
        from: listFilterForm,
        onFinish,
        handleResetFilter,
        advanceFilterForm,
        handleButtonClick,
        handleChange,
        handleSearch,
        handleReceiptTypeChange,

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
        titleOverride: translateContent('global.advanceFilter.title'),

        onCloseAction: onAdvanceSearchCloseAction,
        handleResetFilter,
        filterString,
        setFilterString,
        advanceFilterForm,
        setAdvanceSearchVisible,
        receiptStatusList,
        typeData,
        searchForm,
    };

    const containerProps = {
        record: selectedOrder,
        form,
        partyDetailForm,
        formActionType,
        setFormActionType,
        receiptOnFinish: onFinish,
        isVisible: isFormVisible,
        onCloseAction,
        titleOverride: drawerTitle(formActionType).concat(' ').concat(moduleTitle),
        tableData: data,
        ADD_ACTION,
        EDIT_ACTION,
        VIEW_ACTION,
        NEXT_ACTION,
        buttonData,
        receiptDetailData,
        apportionList,
        setApportionList,
        requestPayload,
        setRequestPayload,
        receipt,
        setReceipt,
        receiptStatus,
        totalReceivedAmount,
        setTotalReceivedAmount,

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
        handleFormValueChange,
        isLastSection,
        typeData,
        receiptType,
        partySegmentType,
        paymentModeType,
        documentType,
        onCancelReceipt,
        handlePrintDownload,
        saveButtonName: isLastSection ? translateContent('global.buttons.submit') : translateContent('global.buttons.saveAndNext'),
        setLastSection,
        partySegment,
        setPartySegment,
        partyId,
        setPartyId,

        previousSection,
        setPreviousSection,
    };

    const cancelReceiptProps = {
        isVisible: cancelReceiptVisible,
        titleOverride: translateContent('receipts.heading.cancellationTitle'),
        handleCloseReceipt,
        handleCancelReceipt,
        cancelReceiptForm,
        onCloseAction: onCancelCloseAction,
    };
    const reportDetail = EMBEDDED_REPORTS?.RECIEPT_DOCUMENT;
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
            <ReceiptFilter {...advanceFilterResultProps} />
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <ListDataTable handleButtonClick={handleButtonClick} isLoading={showDataLoading} {...tableProps} showAddButton={false} />
                </Col>
            </Row>
            <AdvancedSearch {...advanceFilterProps} />
            <ReceiptMainConatiner {...containerProps} />
            <CancelReceipt {...cancelReceiptProps} />
            <ReportModal {...reportProps} reportDetail={reportDetail} />
        </>
    );
};

export const ReceiptMaster = connect(mapStateToProps, mapDispatchToProps)(ReceiptMasterBase);
