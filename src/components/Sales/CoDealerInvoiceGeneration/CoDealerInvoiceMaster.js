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
import { CO_DEALER_QUERY_BUTTONS } from './constants';
import { showGlobalNotification } from 'store/actions/notification';
import { CO_DEALER_SECTIONS } from 'components/Sales/CoDealerInvoiceGeneration/constants';

import { CoDealerInvoiceFilter } from './CoDealerInvoiceFilter';
import { CoDealerSearchDataActions } from 'store/actions/data/CoDealerInvoice';
import { translateContent } from 'utils/translateContent';
import { PARAM_MASTER } from 'constants/paramMaster';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            CoDealerInvoice: {
                CoDealerInvoiceSearch: { isDetailLoaded: isSearchDataLoaded = false, isDetailLoading: isSearchLoading, detailData: data, filter: filterString },
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
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchCoDealerInvoice: CoDealerSearchDataActions.fetchDetail,
            resetCoDealerData: CoDealerSearchDataActions.resetDetail,
            listShowCoDealerLoading: CoDealerSearchDataActions.listShowLoading,
            setFilterString: CoDealerSearchDataActions.setFilter,

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

    const [form] = Form.useForm();
    const [searchForm] = Form.useForm();
    const [advanceFilterForm] = Form.useForm();

    const [CoDealerInvoiceStateMaster, setCoDealerInvoiceStateMaster] = useState({ currentQuery: CO_DEALER_QUERY_BUTTONS?.PENDING?.key, current: 1, pageSize: 10 });

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
    console.log(typeData?.[PARAM_MASTER.CO_DEALER_INV_SER.id]);
    useEffect(() => {
        typeData && typeData?.[PARAM_MASTER.CO_DEALER_INV_SER.id]?.length && searchForm.setFieldsValue({ searchType: 'indentNumber' });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [typeData, typeData?.[PARAM_MASTER.CO_DEALER_INV_SER.id]]);

    const extraParams = useMemo(() => {
        return [
            {
                key: 'searchType',
                title: 'Type',
                value: filterString?.searchType,
                name: typeData?.[PARAM_MASTER.CO_DEALER_INV_SER.id]?.find((i) => i?.key === filterString?.searchType)?.value,
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
            // {
            //     key: 'invoiceFromDate',
            //     title: 'Invoice From Date',
            //     value: filterString?.invoiceFromDate,
            //     name: filterString?.invoiceFromDate ? convertDateTime(filterString?.invoiceFromDate, dateFormatView) : '',
            //     canRemove: true,
            //     filter: true,
            // },
            // {
            //     key: 'invoiceToDate',
            //     title: 'Invoce To Date',
            //     value: filterString?.invoiceToDate,
            //     name: filterString?.invoiceToDate ? convertDateTime(filterString?.invoiceToDate, dateFormatView) : '',
            //     canRemove: true,
            //     filter: true,
            // },
            // {
            //     key: 'deliveryNoteFromDate',
            //     title: 'Delivery From Date',
            //     value: filterString?.deliveryNoteFromDate,
            //     name: filterString?.deliveryNoteFromDate ? convertDateTime(filterString?.deliveryNoteFromDate, dateFormatView) : '',
            //     canRemove: true,
            //     filter: true,
            // },
            // {
            //     key: 'deliveryNoteToDate',
            //     title: 'Delivery To Date',
            //     value: filterString?.deliveryNoteToDate,
            //     name: filterString?.deliveryNoteToDate ? convertDateTime(filterString?.deliveryNoteToDate, dateFormatView) : '',
            //     canRemove: true,
            //     filter: true,
            // },
            {
                key: 'coDealerStatus',
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
        setFilterString({ ...filterString, currentQuery: buttonKey, current: 1, pageSize: 10 });
        setCoDealerInvoiceStateMaster({ ...CoDealerInvoiceStateMaster, currentQuery: buttonKey });
        switch (buttonKey) {
            case CO_DEALER_QUERY_BUTTONS?.PENDING?.key: {
                setActionButtonVisiblity({ canAdd: true, canView: false, canEdit: false });
                break;
            }
            case CO_DEALER_QUERY_BUTTONS?.INVOICED?.key: {
                setActionButtonVisiblity({ canAdd: false, canView: true, canEdit: false });
                setButtonData({ ...buttonData, printDeliveryNoteBtn: true, cancelDeliveryNoteBtn: true });
                break;
            }
            case CO_DEALER_QUERY_BUTTONS?.CANCELLED?.key: {
                setActionButtonVisiblity({ canAdd: false, canView: true, canEdit: false });
                break;
            }
            default: {
                setActionButtonVisiblity({ canAdd: true, canView: false, canEdit: false });
            }
        }
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
    };
    const onFinish = () => {
        const onSuccess = (res) => {
            form.resetFields();
            setShowDataLoading(true);
            // fetchList({ setIsLoading: listShowLoading, userId, onSuccessAction, extraParams });
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

    const onCloseAction = () => {
        setSelectedOrder();
        setIsFormVisible(false);
        setButtonData({ ...defaultBtnVisiblity });
    };

    const tableProps = {
        dynamicPagination: true,
        totalRecords,
        setPage: setFilterString,
        page: filterString,
        tableColumn: tableColumnDeliveryNoteMaster({ handleButtonClick, actionButtonVisiblity }),
        tableData: data,
        typeData,
        filterString,
        handleButtonClick,
        isLoading: showdataLoading,
        showAddButton: false,
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

    const CoDealerInvoiceFilterProps = {
        // extraParams,
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
        typeData,
        searchForm,
        onFinishSearch,
        status: CoDealerInvoiceStateMaster?.currentQuery,
    };

    const CoDealerInvoiceAdvancedSearchProps = {
        isVisible: isAdvanceSearchVisible,
        receiptType,
        partySegmentType,
        titleOverride: 'Advance Filters',
        onCloseAction: onAdvanceSearchCloseAction,
        handleResetFilter,
        filterString,
        setFilterString,
        advanceFilterForm,
        setAdvanceSearchVisible,
        coDealerInvoiceStatusList,
        typeData,
        onFinishSearch,
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
        titleOverride: moduleTitle,
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
