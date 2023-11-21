/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Col, Form, Row } from 'antd';
import { tableColumnDeliveryNoteMaster } from './tableColumn';
import { ADD_ACTION, EDIT_ACTION, VIEW_ACTION, NEXT_ACTION } from 'utils/btnVisiblity';

import { CoDealerInvoiceMainContainer } from './CoDealerInvoiceMainContainer';
import { ListDataTable } from 'utils/ListDataTable';
import { CoDealerInvoiceAdvancedSearch } from './CoDealerInvoiceAdvancedSearch';
import { CO_DEALER_QUERY_BUTTONS, SEARCH_PARAM_CONSTANTS } from './constants';
import { showGlobalNotification } from 'store/actions/notification';
import { CO_DEALER_SECTIONS } from 'components/Sales/CoDealerInvoiceGeneration/constants';

import { CoDealerInvoiceFilter } from './CoDealerInvoiceFilter';
import { CoDealerSearchDataActions } from 'store/actions/data/CoDealerInvoice';
import { dealerParentLovDataActions } from 'store/actions/data/dealer/dealerParentsLov';
import { translateContent } from 'utils/translateContent';
import { PARAM_MASTER } from 'constants/paramMaster';
import { convertDateTime, dateFormatView, formatDateToCalenderDate } from 'utils/formatDateTime';
import { getCodeValue } from 'utils/getCodeValue';
import { DATE_CONSTANTS } from './constants/DateConstants';
import { validateRequiredSelectField } from 'utils/validation';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            CoDealerInvoice: {
                CoDealerInvoiceSearch: { isDetailLoaded: isSearchDataLoaded = false, isDetailLoading: isSearchLoading, data, detailData, filter: filterString },
            },
            DealerHierarchy: {
                DealerParentsLov: { filteredListData: indentToDealerData = [] },
            },
        },
    } = state;

    const moduleTitle = translateContent('coDealer.heading.title');

    let returnValue = {
        userId,
        typeData,
        data: data?.paginationData || [],
        totalRecords: data?.totalRecords || [],
        coDealerInvoiceStatusList: Object.values(CO_DEALER_QUERY_BUTTONS),
        moduleTitle,
        isSearchLoading,
        isSearchDataLoaded,
        filterString,
        indentToDealerData,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchCoDealerInvoice: CoDealerSearchDataActions.fetchList,
            resetCoDealerData: CoDealerSearchDataActions.resetDetail,
            listShowCoDealerLoading: CoDealerSearchDataActions.listShowLoading,
            setFilterString: CoDealerSearchDataActions.setFilter,

            fetchDealerParentsLovList: dealerParentLovDataActions.fetchFilteredList,
            listShowDealerLoading: dealerParentLovDataActions.listShowLoading,

            // fetchList: CoDealerInvoiceSearchDataAction.fetchList,
            // fetchDeliveryNoteMasterData: vehicleDeliveryNoteDataActions.fetchDetail,
            // saveData: vehicleDeliveryNoteDataActions.saveData,

            // fetchCustomerListData: vehicleDeliveryNoteCustomerDetailDataActions.fetchList,
            // listCustomerListLoading: vehicleDeliveryNoteCustomerDetailDataActions.listShowLoading,

            // cancelDeliveryNote: cancelVehicleDeliveryNoteDataActions.saveData,
            // cancelShowLoading: cancelVehicleDeliveryNoteDataActions.listShowLoading,
            // cancelChallan: challanCancelVehicleDeliveryNoteDataActions.saveData,

            // resetCheckListData: DeliverableChecklistMaindataActions.reset,
            // resetChallanData: vehicleChallanDetailsDataActions.reset,
            // resetCustomerdata: vehicleDeliveryNoteCustomerDetailDataActions.reset,

            showGlobalNotification,
        },
        dispatch
    ),
});

export const CoDealerInvoiceMasterBase = (props) => {
    const { data, receiptDetailData = {}, userId = undefined, fetchList = () => {}, listShowLoading = () => {}, saveData = () => {} } = props;
    const { typeData, receiptType = undefined, partySegmentType = undefined, paymentModeType = undefined, documentType = undefined, moduleTitle = '', totalRecords = 0, showGlobalNotification = () => {} } = props;
    const { filterString, setFilterString, coDealerInvoiceStatusList = Object?.values(CO_DEALER_QUERY_BUTTONS) } = props;
    const { fetchCoDealerInvoice, resetCoDealerData, listShowCoDealerLoading } = props;
    const { indentToDealerData, fetchDealerParentsLovList, listShowDealerLoading } = props;

    const [form] = Form.useForm();
    const [searchForm] = Form.useForm();
    const [advanceFilterForm] = Form.useForm();

    const [CoDealerInvoiceStateMaster, setCoDealerInvoiceStateMaster] = useState({ currentQuery: CO_DEALER_QUERY_BUTTONS?.PENDING?.key, current: 1, pageSize: 10, typeDataFilter: [], INVOICE_FROM_DATE: [], INVOICE_TO_DATE: [], requestpayload: {} });

    const [section, setSection] = useState();
    const [defaultSection, setDefaultSection] = useState();
    const [currentSection, setCurrentSection] = useState();
    const [sectionName, setSetionName] = useState();
    const [isLastSection, setLastSection] = useState(false);
    const [previousSection, setPreviousSection] = useState(1);
    const [showdataLoading, setShowDataLoading] = useState(false);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(false);
    const [isAdvanceSearchVisible, setAdvanceSearchVisible] = useState(false);
    const [actionButtonVisiblity, setActionButtonVisiblity] = useState({ canAdd: true, canView: false, canEdit: false });

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
            setCoDealerInvoiceStateMaster({ ...CoDealerInvoiceStateMaster, typeData: typeData?.[PARAM_MASTER.CO_DEALER_INV_SER.id], typeDataFilter: typeData?.[PARAM_MASTER.CO_DEALER_INV_SER.id]?.filter((i) => i?.key !== SEARCH_PARAM_CONSTANTS?.INVOICE_NUMBER?.key) });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [typeData, typeData?.[PARAM_MASTER.CO_DEALER_INV_SER.id]]);

    useEffect(() => {
        if (isAdvanceSearchVisible && filterString?.invoiceFromDate && filterString?.invoiceToDate) {
            advanceFilterForm.setFieldsValue({ ...filterString, status: CoDealerInvoiceStateMaster?.currentQuery, invoiceFromDate: formatDateToCalenderDate(filterString?.invoiceFromDate), invoiceToDate: formatDateToCalenderDate(filterString?.invoiceToDate) });
        } else if (isAdvanceSearchVisible) {
            advanceFilterForm.setFieldsValue({ ...filterString, status: CoDealerInvoiceStateMaster?.currentQuery });
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
                name: getCodeValue(typeData?.[PARAM_MASTER.CO_DEALER_INV_SER.id], filterString?.searchType, 'value', false),
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
                key: 'invoiceFromDate',
                title: 'Invoice From Date',
                value: filterString?.invoiceFromDate,
                name: convertDateTime(filterString?.invoiceFromDate, dateFormatView, 'NA'),
                canRemove: true,
                filter: true,
            },
            {
                key: 'invoiceToDate',
                title: 'Invoice To Date',
                value: filterString?.invoiceToDate,
                name: convertDateTime(filterString?.invoiceToDate, dateFormatView, 'NA'),
                canRemove: true,
                filter: true,
            },
            {
                key: 'status',
                title: 'Delivery Status',
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
            fetchDealerParentsLovList({ setIsLoading: listShowDealerLoading, userId, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, extraParams]);

    useEffect(() => {
        const defaultSection = CO_DEALER_SECTIONS.INVOICE_DETAILS;
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
        let typeDataFilter = [];
        setFilterString({ ...filterString, currentQuery: buttonKey, current: 1, pageSize: 10 });
        switch (buttonKey) {
            case CO_DEALER_QUERY_BUTTONS?.PENDING?.key: {
                setActionButtonVisiblity({ canAdd: true, canView: false, canEdit: false });
                typeDataFilter = CoDealerInvoiceStateMaster?.typeData?.filter((item) => item?.key !== SEARCH_PARAM_CONSTANTS?.INVOICE_NUMBER?.key);
                break;
            }
            case CO_DEALER_QUERY_BUTTONS?.INVOICED?.key: {
                setActionButtonVisiblity({ canAdd: false, canView: true, canEdit: false });
                setButtonData({ ...buttonData, printDeliveryNoteBtn: true, cancelDeliveryNoteBtn: true });
                typeDataFilter = CoDealerInvoiceStateMaster?.typeData;
                break;
            }
            case CO_DEALER_QUERY_BUTTONS?.CANCELLED?.key: {
                setActionButtonVisiblity({ canAdd: false, canView: true, canEdit: false });
                typeDataFilter = CoDealerInvoiceStateMaster?.typeData;
                break;
            }
            default: {
                setActionButtonVisiblity({ canAdd: true, canView: false, canEdit: false });
                typeDataFilter = CoDealerInvoiceStateMaster?.typeData;
            }
        }
        setCoDealerInvoiceStateMaster({ ...CoDealerInvoiceStateMaster, currentQuery: buttonKey, typeDataFilter });
    };

    const handleDrawerButtonVisibility = (btnVisiblityProps) => {
        const { buttonAction } = btnVisiblityProps;
        let formAction = { addMode: buttonAction === ADD_ACTION, editMode: buttonAction === EDIT_ACTION, viewMode: buttonAction === VIEW_ACTION };
        let btnVisibilityStatus = { ...defaultBtnVisiblity };
        return { formAction, btnVisibilityStatus };
    };

    const handleButtonClick = ({ record = null, buttonAction, openDefaultSection = true }) => {
        form.resetFields();
        form.setFieldsValue(undefined);
        switch (buttonAction) {
            case ADD_ACTION:
                defaultSection && setCurrentSection(defaultSection);
                setPreviousSection(1);
                setSelectedOrder(record);
                break;
            case EDIT_ACTION:
                setSelectedOrder(record);
                openDefaultSection && setCurrentSection(defaultSection);
                break;
            case VIEW_ACTION:
                setSelectedOrder(record);
                defaultSection && setCurrentSection(defaultSection);
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

    const onFinishSearch = (values) => {};

    const handleResetFilter = (e) => {
        setShowDataLoading(false);
        setFilterString({});
        advanceFilterForm.resetFields();
        setCoDealerInvoiceStateMaster((prev) => ({ ...prev, INVOICE_FROM_DATE: [], INVOICE_TO_DATE: [] }));
    };
    const onFinish = () => {
        const onSuccess = (res) => {
            form.resetFields();
            setShowDataLoading(true);
            fetchCoDealerInvoice({ setIsLoading: listShowLoading, userId, onSuccessAction, extraParams });
            setButtonData({ ...buttonData, formBtnActive: false });
            section && setCurrentSection(CO_DEALER_SECTIONS.THANK_YOU_PAGE.id);
        };
        const onError = (message) => {
            showGlobalNotification({ message });
        };

        // const requestData = {
        //     data: finalPayload,
        //     method: 'post',
        //     setIsLoading: listShowLoading,
        //     userId,
        //     onError,
        //     onSuccess,
        //     customURL: '',
        // };
        // saveData(requestData);
    };

    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };
    const resetDataOnClose = () => {
        resetCoDealerData();
        setSelectedOrder();
        setButtonData({ ...defaultBtnVisiblity });
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
        tableColumn: tableColumnDeliveryNoteMaster({ handleButtonClick, actionButtonVisiblity, currentQuery: CoDealerInvoiceStateMaster?.currentQuery }),
        tableData: data,
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
        searchForm,
        onFinishSearch,
        status: CoDealerInvoiceStateMaster?.currentQuery,
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
        onFinishSearch,
        indentToDealerData,
        CoDealerInvoiceStateMaster,
        handleDateChange,
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

    const containerProps = {
        record: selectedOrder,
        form,
        formActionType,
        setFormActionType,
        deliveryNoteOnFinish: onFinish,
        isVisible: isFormVisible,
        onCloseAction,
        titleOverride: drawerTitle.concat(moduleTitle),
        tableData: data || [],
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
        </>
    );
};

export const CoDealerInvoiceMaster = connect(mapStateToProps, mapDispatchToProps)(CoDealerInvoiceMasterBase);
