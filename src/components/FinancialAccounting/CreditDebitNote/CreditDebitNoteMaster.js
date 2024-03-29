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
import { ADD_ACTION, EDIT_ACTION, VIEW_ACTION, NEXT_ACTION, btnVisiblity } from 'utils/btnVisiblity';
import { ReportModal } from 'components/common/ReportModal/ReportModal';
import { ListDataTable } from 'utils/ListDataTable';
import { getCodeValue } from 'utils/getCodeValue';
import { dateFormatView, convertDateTimedayjs } from 'utils/formatDateTime';
import { CreditDebitNoteMainContainer } from './CreditDebitNoteMainContainer';
import { AdvancedSearch } from './AdvancedSearch';
import { showGlobalNotification } from 'store/actions/notification';
import { BASE_URL_CREDIT_DEBIT_NOTE_SEARCH as customURL } from 'constants/routingApi';
import { BASE_URL_CREDIT_DEBIT_NOTE_DETAILS as customVoucherUrl } from 'constants/routingApi';
import { EMBEDDED_REPORTS } from 'constants/EmbeddedReports';
import { VOUCHER_TYPE } from 'constants/VoucherType';
import { creditDebitNoteSearchDataAction } from 'store/actions/data/financialAccounting/creditDebitNoteSearch';

import { CREDIT_DEBIT_SECTION } from 'constants/CreditDebitSection';
import { LANGUAGE_EN } from 'language/en';

import { PARAM_MASTER } from 'constants/paramMaster';
import { translateContent } from 'utils/translateContent';
import { drawerTitle } from 'utils/drawerTitle';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            FinancialAccounting: {
                CreditDebitNoteSearch: { isLoading: isCreditDrawerDataLoading = false, isLoaded: isDataLoaded = false, isDetailLoaded = false, data, detailData: creditDebitData = [], filter: filterString },
            },
        },
    } = state;
    const moduleTitle = translateContent('creditDebitNote.heading.moduleTitle');
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
        isCreditDrawerDataLoading,
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
    const { fetchList, saveData, listShowLoading, userId, data, totalRecords, isDataLoaded, isDetailLoaded, showGlobalNotification, resetData } = props;
    const { typeData, moduleTitle } = props;
    const { fetchDetail, filterString, setFilterString, creditDebitData, isCreditDrawerDataLoading } = props;
    const [form] = Form.useForm();
    const [searchForm] = Form.useForm();
    const [advanceFilterForm] = Form.useForm();
    const [listFilterForm] = Form.useForm();

    const [selectedRecord, setSelectedRecord] = useState();
    const [vouchertype, setVoucherType] = useState();
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
    const [additionalReportParams, setAdditionalReportParams] = useState();
    const [isReportVisible, setReportVisible] = useState();
    const [previousSection, setPreviousSection] = useState(1);
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
        printBtn: false,
        continueBtn: false,
    };

    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });

    const defaultFormActionType = { addMode: false, editMode: false, viewMode: false };
    const [formActionType, setFormActionType] = useState({ ...defaultFormActionType });

    const dynamicPagination = true;
    const [selectedVoucher, setSelectedVoucher] = useState('');

    useEffect(() => {
        if (formActionType?.viewMode) {
            setButtonData({ ...buttonData, printBtn: true });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formActionType]);

    useEffect(() => {
        if (formActionType?.viewMode || formActionType?.editMode) {
            setRequestPayload({ ...creditDebitData });
            setVoucherTableData(creditDebitData?.voucherAccountHeadDetailsDto);
            setApportionTableData(creditDebitData?.apportionDetailsDto);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [creditDebitData]);

    useEffect(() => {
        setFilterString({ ...filterString, pageSize: 10, current: 1 });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (creditDebitData && isDetailLoaded && formActionType?.addMode) {
            setVoucherTableData([]);
            setApportionTableData([]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [creditDebitData, isDetailLoaded, formActionType?.addMode]);

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
                name: filterString?.searchType ? 'Voucher Number' : filterString?.searchType,
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
                name: filterString?.voucherType && getCodeValue(typeData[PARAM_MASTER?.VOUCHR_TYPE?.id], filterString?.voucherType),
                canRemove: true,
                filter: true,
            },
            {
                key: 'partySegment',
                title: 'Party Segment',
                value: filterString?.partySegment,
                name: filterString?.partySegment && getCodeValue(typeData[PARAM_MASTER?.PARTY_CATEG?.id], filterString?.partySegment),
                canRemove: true,
                filter: true,
            },

            {
                key: 'fromDate',
                title: 'Start Date',
                value: filterString?.fromDate,
                name: convertDateTimedayjs(filterString?.fromDate, dateFormatView, 'fromData'),
                canRemove: true,
                filter: true,
            },
            {
                key: 'toDate',
                title: 'End Date',
                value: filterString?.toDate,
                name: convertDateTimedayjs(filterString?.toDate, dateFormatView, 'toDate'),
                canRemove: true,
                filter: true,
            },

            {
                key: 'pageSize',
                title: 'Value',
                value: filterString?.pageSize ?? 10,
                canRemove: true,
            },
            {
                key: 'pageNumber',
                title: 'Value',
                value: filterString?.current ?? 1,
                canRemove: true,
            },
            {
                key: 'sortBy',
                title: 'Sort By',
                value: filterString?.sortBy,
                canRemove: true,
            },
            {
                key: 'sortIn',
                title: 'Sort Type',
                value: filterString?.sortType,
                canRemove: true,
            },
        ];
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString]);

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

    const handleResetFilter = () => {
        const { pageSize } = filterString;
        if (filterString) {
            setShowDataLoading(true);
        }
        setFilterString({ pageSize, current: 1 });
        advanceFilterForm.resetFields();
    };

    const handleButtonClick = ({ record = null, buttonAction, openDefaultSection = true, voucherType = VOUCHER_TYPE?.CREDIT_TYPE?.type }) => {
        setVoucherType(record?.voucherType);
        form.resetFields();
        form.setFieldsValue(undefined);
        switch (buttonAction) {
            case ADD_ACTION:
                defaultSection && setCurrentSection(defaultSection);
                setPreviousSection(1);
                setRequestPayload({ ...requestPayload, voucherType });
                setSelectedRecord({
                    voucherType,
                });
                break;
            case EDIT_ACTION:
                setSelectedRecord({ ...record, voucherType: record?.voucherType === VOUCHER_TYPE?.DEBIT_TYPE?.key ? VOUCHER_TYPE?.DEBIT_TYPE?.type : VOUCHER_TYPE?.CREDIT_TYPE?.type });
                setSelectedVoucher();
                openDefaultSection && setCurrentSection(defaultSection);
                break;
            case VIEW_ACTION:
                setSelectedRecord({ ...record, voucherType: record?.voucherType === VOUCHER_TYPE?.DEBIT_TYPE?.key ? VOUCHER_TYPE?.DEBIT_TYPE?.type : VOUCHER_TYPE?.CREDIT_TYPE?.type });
                defaultSection && setCurrentSection(defaultSection);
                break;
            case NEXT_ACTION:
                const nextSection = Object.values(sectionName)?.find((i) => i.id > currentSection);
                section && setCurrentSection(nextSection?.id);
                setLastSection(!nextSection?.id);
                break;

            default:
                return false;
        }

        if (buttonAction !== NEXT_ACTION) {
            setFormActionType({
                addMode: buttonAction === ADD_ACTION,
                editMode: buttonAction === EDIT_ACTION,
                viewMode: buttonAction === VIEW_ACTION,
            });

            if (buttonAction === VIEW_ACTION || buttonAction === ADD_ACTION) {
                setButtonData(btnVisiblity({ defaultBtnVisiblity, buttonAction, orderStatus: record?.orderStatus }));
            } else if (buttonAction === EDIT_ACTION) {
                setButtonData({ ...defaultBtnVisiblity, orderStatus: record?.orderStatus, saveBtn: false, nextBtn: false, continueBtn: true, cancelBtn: true });
            }
        }
        setIsFormVisible(true);
    };

    const handlePrintDownload = (record) => {
        const message = translateContent('creditDebitNote.validation.apportionDetailMissing');
        if (Object.keys?.(selectedVoucher?.data?.apportionDetailsDto)?.length <= 0) {
            showGlobalNotification({ message });
        } else {
            setReportVisible(true);
            setAdditionalReportParams([
                {
                    key: 'fn_vc_debit_credit_note_hdr_id',
                    value: record?.id,
                },
            ]);
        }
    };

    const onFinish = () => {
        const recordId = selectedRecord?.id;
        const data = { ...requestPayload, id: recordId ?? '', voucherNumber: selectedRecord?.voucherNumber, voucherType: selectedRecord?.voucherType, apportionDetailsDto: apportionTableData };
        const onSuccess = (res) => {
            form.resetFields();
            setShowDataLoading(true);
            showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: res?.responseMessage });
            fetchList({ setIsLoading: listShowLoading, userId, customURL, onSuccessAction, extraParams });
            setButtonData({ ...buttonData, formBtnActive: false });
            setIsFormVisible(false);
            setRequestPayload({ voucherDetailsDto: {}, partyDetailsDto: {}, voucherAccountHeadDetailsDto: [], apportionDetailsDto: [] });
            resetData();
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
        setRequestPayload({ voucherDetailsDto: {}, partyDetailsDto: {}, voucherAccountHeadDetailsDto: [], apportionDetailsDto: [] });
    };

    const setPage = (page) => {
        setFilterString({ ...filterString, ...page });
    };

    const tableProps = {
        dynamicPagination,
        filterString,
        totalRecords,
        setPage: setPage,
        tableColumn: tableColumn({ handleButtonClick, typeData }),
        tableData: data,
        showAddButton: false,
        handleButtonClick,
        noMessge: LANGUAGE_EN.GENERAL.LIST_NO_DATA_FOUND.TITLE,
    };

    const removeFilter = (key) => {
        const { pageSize } = filterString;
        if (key === 'searchParam') {
            const { searchType, searchParam, ...rest } = filterString;
            setFilterString({ ...rest });
        } else if (key === 'fromDate' || key === 'toDate') {
            setFilterString({ current: 1, pageSize });
            advanceFilterForm.resetFields();
        } else {
            const { [key]: names, ...rest } = filterString;
            setFilterString({ ...rest });
        }
    };

    const title = translateContent('creditDebitNote.placeholder.searchTitle');

    const advanceFilterResultProps = {
        extraParams,
        removeFilter,
        advanceFilter: true,
        otfFilter: true,
        filterString,
        setFilterString,
        from: listFilterForm,
        onFinish,
        title,
        data,
        typeData,

        searchForm,
        handleResetFilter,
        handleButtonClick,
        setAdvanceSearchVisible,
    };

    const onAdvanceSearchCloseAction = () => {
        form.resetFields();
        advanceFilterForm.resetFields();
        advanceFilterForm.setFieldsValue();
        setAdvanceSearchVisible(false);
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
        typeData,
    };

    const containerProps = {
        record: selectedRecord,
        requestPayload,
        isDataLoaded,
        isDetailLoaded,
        form,
        formActionType,
        setFormActionType,
        creditDebitNoteOnFinish: onFinish,
        setIsFormVisible,
        isVisible: isFormVisible,
        onCloseAction,
        titleOverride: drawerTitle(formActionType).concat(' ').concat(moduleTitle),
        ADD_ACTION,
        EDIT_ACTION,
        VIEW_ACTION,
        NEXT_ACTION,
        buttonData,
        handlePrintDownload,
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
        saveButtonName: isLastSection ? translateContent('global.buttons.submit') : translateContent('global.buttons.saveAndNext'),
        previousSection,
        setPreviousSection,
        setRequestPayload,
        selectedVoucher,
        setSelectedVoucher,
        voucherTableData,
        setVoucherTableData,
        apportionTableData,
        setApportionTableData,
        isCreditDrawerDataLoading,
    };

    const reportDetail = vouchertype === VOUCHER_TYPE?.CREDIT_TYPE?.key ? EMBEDDED_REPORTS?.CREDIT_DOCUMENT : VOUCHER_TYPE?.DEBIT_TYPE?.key ? EMBEDDED_REPORTS?.DEBIT_DOCUMENT : null;
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
            <CreditDebitNoteMainContainer {...containerProps} />
            <ReportModal {...reportProps} reportDetail={reportDetail} />
        </>
    );
};

export const CreditDebitNoteMaster = connect(mapStateToProps, mapDispatchToProps)(CreditDebitNoteMasterBase);
