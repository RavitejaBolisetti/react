/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Row, Col, Form } from 'antd';
import { tableColumn } from './tableColumn';
import AdvanceFilter from './AdvanceFilter';
import { FilterIcon } from 'Icons';
import { ADD_ACTION, EDIT_ACTION, VIEW_ACTION, NEXT_ACTION, btnVisiblity } from 'utils/btnVisiblity';

import { ListDataTable } from 'utils/ListDataTable';
import { getCodeValue } from 'utils/getCodeValue';
import { monthDateFormat, convertDate } from 'utils/formatDateTime';
import { CreditDebitNoteMainContainer } from './CreditDebitNoteMainContainer';
import { AdvancedSearch } from './AdvancedSearch';
import { showGlobalNotification } from 'store/actions/notification';
import { BASE_URL_CREDIT_DEBIT_NOTE_SEARCH as customURL } from 'constants/routingApi';
import { BASE_URL_CREDIT_DEBIT_NOTE_DETAILS as customVoucherUrl } from 'constants/routingApi';

import { creditDebitNoteSearchDataAction } from 'store/actions/data/financialAccounting/creditDebitNoteSearch';

import { CREDIT_DEBIT_SECTION } from 'constants/CreditDebitSection';
import { LANGUAGE_EN } from 'language/en';

import { PARAM_MASTER } from 'constants/paramMaster';
import { TRANSACTION_TYPE } from './transactionType';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            FinancialAccounting: {
                CreditDebitNoteSearch: { isLoaded: isDataLoaded = false, isDetailLoaded = false, data, detailData: creditDebitData = [], filter: filterString },
            },
        },
    } = state;
    const moduleTitle = ' Note';
    let returnValue = {
        userId,
        typeData,
        data: data?.paginationData,
        isDataLoaded,
        isDetailLoaded,
        totalRecords: data?.totalRecords || [],
        moduleTitle,
        filterString,
        creditDebitData,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: creditDebitNoteSearchDataAction.fetchList,
            fetchDetail: creditDebitNoteSearchDataAction.fetchDetail,
            listShowLoading: creditDebitNoteSearchDataAction.listShowLoading,
            setFilterString: creditDebitNoteSearchDataAction.setFilter,
            resetData: creditDebitNoteSearchDataAction.reset,

            saveData: creditDebitNoteSearchDataAction.saveData,
            showGlobalNotification,
        },
        dispatch
    ),
});

export const CreditDebitNoteMasterBase = (props) => {
    const { fetchList, saveData, listShowLoading, userId, data, totalRecords, isDataLoaded, isDetailLoaded, showGlobalNotification } = props;
    const { typeData, moduleTitle } = props;
    const { fetchDetail, filterString, setFilterString, creditDebitData } = props;

    const [form] = Form.useForm();
    const [searchForm] = Form.useForm();
    const [advanceFilterForm] = Form.useForm();
    const [listFilterForm] = Form.useForm();

    const [selectedRecord, setSelectedRecord] = useState();
    const [selectedRecordId, setSelectedRecordId] = useState();

    const [section, setSection] = useState();
    const [defaultSection, setDefaultSection] = useState();
    const [currentSection, setCurrentSection] = useState();
    const [sectionName, setSetionName] = useState();
    const [isLastSection, setLastSection] = useState(false);

    const [showDataLoading, setShowDataLoading] = useState(true);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isAdvanceSearchVisible, setAdvanceSearchVisible] = useState(false);
    const [voucherTableData, setVoucherTableData] = useState([]);
    const [apportionTableData, setApportionTableData] = useState([]);

    const [requestPayload, setRequestPayload] = useState({ voucherDetailsDto: {}, partyDetailsDto: {}, voucherAccountHeadDetailsDto: [], apportionDetailsDto: [] });

    const defaultBtnVisiblity = {
        editBtn: false,
        saveBtn: false,
        saveAndNewBtn: false,
        saveAndNewBtnClicked: false,
        closeBtn: false,
        cancelBtn: false,
        formBtnActive: false,
        transferBtn: false,
        allotBtn: false,
        unAllotBtn: false,
        invoiceBtn: false,
        deliveryNote: false,
        cancelOtfBtn: false,
    };

    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });

    const defaultFormActionType = { addMode: false, editMode: false, viewMode: false };
    const [formActionType, setFormActionType] = useState({ ...defaultFormActionType });

    const [page, setPage] = useState({ pageSize: 10, current: 1 });
    const dynamicPagination = true;

    const [transactionType, setTransactionType] = useState(TRANSACTION_TYPE?.Credit?.value);
    const [selectedVoucher, setSelectedVoucher] = useState('');

    useEffect(() => {
        if (creditDebitData && isDetailLoaded && formActionType?.addMode) {
            setVoucherTableData([]);
            setApportionTableData([]);
        } else if (creditDebitData && isDetailLoaded) {
            setVoucherTableData(creditDebitData?.voucherAccountHeadDetailsDto);
            setApportionTableData(creditDebitData?.apportionDetailsDto);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [creditDebitData, isDetailLoaded, formActionType?.addMode]);

    const onSuccessAction = (res) => {
        showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
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
                name: typeData[PARAM_MASTER.CRDR_SEARCH_PARAM.id]?.find((i) => i?.key === filterString?.searchType)?.value,
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
                key: 'voucherType',
                title: 'Voucher Type',
                value: filterString?.voucherType,
                name: filterString?.voucherType,
                canRemove: true,
                filter: true,
            },
            {
                key: 'partySegment',
                title: 'Party Segment',
                value: filterString?.partySegment,
                name: getCodeValue(typeData[PARAM_MASTER?.PARTY_CATEG?.id], filterString?.partySegment),
                canRemove: true,
                filter: true,
            },

            {
                key: 'fromDate',
                title: 'Start Date',
                value: filterString?.fromDate,
                name: convertDate(filterString?.fromDate, monthDateFormat),
                canRemove: true,
                filter: true,
            },
            {
                key: 'toDate',
                title: 'End Date',
                value: filterString?.toDate,
                name: convertDate(filterString?.toDate, monthDateFormat),

                canRemove: true,
                filter: true,
            },

            {
                key: 'pageSize',
                title: 'Value',
                value: page?.pageSize,
                canRemove: true,
            },
            {
                key: 'pageNumber',
                title: 'Value',
                value: page?.current,
                canRemove: true,
            },
            {
                key: 'sortBy',
                title: 'Sort By',
                value: page?.sortBy,
                canRemove: true,
            },
            {
                key: 'sortIn',
                title: 'Sort Type',
                value: page?.sortType,
                canRemove: true,
            },
        ];
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString, page]);

    useEffect(() => {
        if (userId && extraParams) {
            setShowDataLoading(true);
            fetchList({ setIsLoading: listShowLoading, customURL, userId, extraParams, onSuccessAction, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, extraParams]);

    useEffect(() => {
        const extraParams = [
            {
                key: 'id',
                title: 'Details',
                value: selectedRecord?.id,
            },
        ];
        const customURL = customVoucherUrl;
        const onSuccessAction = (res) => {
            setSelectedVoucher(res);
        };
        if (userId && extraParams && selectedRecord && !formActionType?.addMode) {
            fetchDetail({ setIsLoading: listShowLoading, userId, customURL, extraParams, onSuccessAction, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, selectedRecord]);

    useEffect(() => {
        return () => {
            setFilterString();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const defaultSection = CREDIT_DEBIT_SECTION.VOUCHER_AND_PARTY_DETAILS.id;
        setDefaultSection(defaultSection);
        setSetionName(CREDIT_DEBIT_SECTION);
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

    const handleResetFilter = (e) => {
        if (filterString) {
            setShowDataLoading(true);
        }
        setFilterString();
        advanceFilterForm.resetFields();
    };

    const handleButtonClick = ({ record = null, buttonAction, openDefaultSection = true, transactionType = 'credit' }) => {
        form.resetFields();
        form.setFieldsValue(undefined);
        switch (buttonAction) {
            case ADD_ACTION:
                defaultSection && setCurrentSection(defaultSection);
                transactionType === 'debit' ? setTransactionType(TRANSACTION_TYPE?.Debit?.value) : setTransactionType(TRANSACTION_TYPE?.Credit?.value);
                setRequestPayload({ ...requestPayload, voucherType: transactionType === 'debit' ? TRANSACTION_TYPE?.Debit?.value.concat(' Note') : TRANSACTION_TYPE?.Credit?.value.concat(' Note') });
                setSelectedRecord({
                    voucherType: transactionType === 'debit' ? TRANSACTION_TYPE?.Debit?.value.concat(' Note') : TRANSACTION_TYPE?.Credit?.value.concat(' Note'),
                });
                break;
            case EDIT_ACTION:
                setSelectedRecord(record);
                setSelectedVoucher();
                openDefaultSection && setCurrentSection(defaultSection);
                break;
            case VIEW_ACTION:
                setSelectedRecord(record);
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
            setButtonData(btnVisiblity({ defaultBtnVisiblity, buttonAction, orderStatus: record?.orderStatus }));
        }
        setIsFormVisible(true);
    };

    const onFinishSearch = (values) => {};

    const onFinish = () => {
        const recordId = selectedRecord?.id;

        const data = { ...requestPayload, id: recordId ?? '', voucherNumber: selectedRecord?.voucherNumber, apportionDetailsDto: apportionTableData };
        const onSuccess = (res) => {
            form.resetFields();
            setShowDataLoading(true);
            showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
            fetchList({ setIsLoading: listShowLoading, userId, customURL, onSuccessAction, extraParams });
            setButtonData({ ...buttonData, formBtnActive: false });
            setIsFormVisible(false);
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
        form.resetFields();
        form.setFieldsValue();
        setSelectedRecord();
        setIsFormVisible(false);
        setButtonData({ ...defaultBtnVisiblity });
        setVoucherTableData([]);
        setApportionTableData([]);
    };

    const tableProps = {
        dynamicPagination,
        totalRecords,
        page,
        setPage,
        tableColumn: tableColumn(handleButtonClick),
        tableData: data,
        showAddButton: false,
        handleButtonClick,
        noMessge: LANGUAGE_EN.GENERAL.LIST_NO_DATA_FOUND.TITLE,
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

    const title = 'Search Credit/Debit';

    const advanceFilterResultProps = {
        extraParams,
        removeFilter,
        advanceFilter: true,
        otfFilter: true,
        filterString,
        setFilterString,
        from: listFilterForm,
        onFinish,
        onFinishFailed,
        title,
        data,
        typeData,

        searchForm,
        onFinishSearch,
        handleResetFilter,
        handleButtonClick,
        setAdvanceSearchVisible,
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

    const onAdvanceSearchCloseAction = () => {
        form.resetFields();
        advanceFilterForm.resetFields();
        advanceFilterForm.setFieldsValue();
        setAdvanceSearchVisible(false);
    };

    const advanceFilterProps = {
        isVisible: isAdvanceSearchVisible,

        icon: <FilterIcon size={20} />,
        titleOverride: 'Advance Filters',

        onCloseAction: onAdvanceSearchCloseAction,
        handleResetFilter,
        filterString,
        setFilterString,
        advanceFilterForm,
        setAdvanceSearchVisible,
        typeData,
    };

    const containerProps = {
        record: selectedRecord,
        creditDebitData: formActionType?.addMode ? requestPayload : creditDebitData,
        isDataLoaded,
        isDetailLoaded,
        form,
        formActionType,
        setFormActionType,
        creditDebitNoteOnFinish: onFinish,
        onFinishFailed,
        setIsFormVisible,
        isVisible: isFormVisible,
        onCloseAction,
        titleOverride: drawerTitle.concat(transactionType).concat(moduleTitle),
        ADD_ACTION,
        EDIT_ACTION,
        VIEW_ACTION,
        NEXT_ACTION,
        buttonData,

        setButtonData,
        handleButtonClick,
        defaultFormActionType,
        defaultBtnVisiblity,
        selectedRecordId,
        setSelectedRecordId,
        selectedRecord,
        setSelectedRecord,
        section,
        currentSection,
        sectionName,
        setCurrentSection,
        handleFormValueChange,
        isLastSection,
        typeData,
        saveButtonName: isLastSection ? 'Submit' : 'Save & Next',

        requestPayload,
        setRequestPayload,
        selectedVoucher,
        setSelectedVoucher,
        voucherTableData,
        setVoucherTableData,
        apportionTableData,
        setApportionTableData,
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
            <CreditDebitNoteMainContainer {...containerProps} />
        </>
    );
};

export const CreditDebitNoteMaster = connect(mapStateToProps, mapDispatchToProps)(CreditDebitNoteMasterBase);