/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Button, Col, Form, Row } from 'antd';

import { tableColumn } from './tableColumn';
import AdvanceFilter from './AdvanceFilter';
import { ADD_ACTION, EDIT_ACTION, VIEW_ACTION, NEXT_ACTION, btnVisiblity } from 'utils/btnVisiblity';

import { ListDataTable } from 'utils/ListDataTable';
import { AdvancedSearch } from './AdvancedSearch';
import { showGlobalNotification } from 'store/actions/notification';

import { formatDateToCalenderDate, convertDateTime, dateFormatView } from 'utils/formatDateTime';
import styles from 'assets/sass/app.module.scss';

import { validateRequiredInputField } from 'utils/validation';
import { LANGUAGE_EN } from 'language/en';

import { QUERY_BUTTONS_CONSTANTS, QueryButtons } from './QueryButtons';
import { drawerTitle } from 'utils/drawerTitle';
import { AppliedAdvanceFilter } from 'utils/AppliedAdvanceFilter';
import { BinToBinTransferContainer } from './BinToBinTransferContainer';
import { BIN_TO_BIN_PART_SECTION } from 'constants/modules/Spares/BinToBinTransferSection';


const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            ProductHierarchy: { isFilteredListLoaded: isProductHierarchyDataLoaded = false, isLoading: isProductHierarchyLoading, filteredListData: VehicleLovCodeData = [] },
        },
        common: {
            Header: { data: loginUserData = [{}], isLoading, isLoaded: isDataLoaded = false },
        },
    } = state;
    const moduleTitle = 'GST Claim';

    let returnValue = {
        userId,
        loginUserType: loginUserData?.userType,
        moduleTitle,
        typeData: typeData['CHK_STATS'],
        typedataMaster: typeData,
        data: [{}],
    };
    return returnValue;
};

const tabledataOth = [
    {
        dealerName: 'Test Autos',
        dealerBranch: 'Greater noida',
        claimType: 'Test Calim type',
        clameNo: 'CLM988',
        modelName: 'XUV700',
        currentStatusButton: 'Pending For Approval',
    },
];

const tabledataPFG = [
    {
        invoiceNuber: 'Inv00987',
        invoiceDate: '07-12-1997',
        deliveryNoteNo: 'DNN933',
        deliveryNoteDate: '07-12-1997',
    },
];

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            showGlobalNotification,
        },
        dispatch
    ),
});

export const BinToBinTransferBase = (props) => {
    const { userId, data, totalRecords, moduleTitle, loginUserType } = props;
    const { isModelDataLoading, vehicleModelData } = props;
    const { isProfileDataLoaded, ProfileData, ChecklistData, typeData } = props;
    const { VehicleLovCodeData, isProfileDataLoading, isProductHierarchyLoading } = props;

    const [listFilterForm] = Form.useForm();
    const [filterString, setFilterString] = useState({});
    const [selectedRecord, setSelectedRecord] = useState();
    const [selectedRecordId, setSelectedRecordId] = useState();
    const [checkListDataModified, setcheckListDataModified] = useState([]);
    const [payload, setPayload] = useState([]);
    const [deletedUpload, setdeletedUpload] = useState([]);
    const [fileList, setFileList] = useState([]);

    const [section, setSection] = useState();
    const [defaultSection, setDefaultSection] = useState();
    const [currentSection, setCurrentSection] = useState();
    const [previousSection, setPreviousSection] = useState(1);
    const [sectionName, setSetionName] = useState();
    const [isLastSection, setLastSection] = useState(false);

    const [form] = Form.useForm();
    const [searchForm] = Form.useForm();
    const [advanceFilterForm] = Form.useForm();

    const [showDataLoading, setShowDataLoading] = useState(false);
    const [isFormVisible, setIsFormVisible] = useState(false);

    const defaultBtnVisiblity = {
        editBtn: false,
        saveBtn: true,
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
        claimInvoice: false,
        creditNote: false,
        attachDigitalSignature: false,
        generateIRN: false,
    };
    const pageIntialState = {
        pageSize: 10,
        current: 1,
    };
    const rulesIntialstate = {
        fromdate: false,
        todate: false,
    };

    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });

    const defaultFormActionType = { addMode: false, editMode: false, viewMode: false };
    const [formActionType, setFormActionType] = useState({ ...defaultFormActionType });
    const [buttonType, setbuttonType] = useState(QUERY_BUTTONS_CONSTANTS?.UNCLAIMED?.key);

    const [page, setPage] = useState({ ...pageIntialState });
    const dynamicPagination = true;
    const [formData, setFormData] = useState([]);
    const [otfSearchRules, setOtfSearchRules] = useState({ rules: [validateRequiredInputField('search parametar')] });
    const [isAdvanceSearchVisible, setAdvanceSearchVisible] = useState(false);
    const [rules, setrules] = useState({ ...rulesIntialstate });
    const [currentStatusButton, setcurrentStatusButton] = useState(QUERY_BUTTONS_CONSTANTS?.UNCLAIMED?.key);

    const extraParams = useMemo(() => {
        return [
            {
                key: 'checklistStatus',
                title: 'checklistStatus',
                value: buttonType,
                canRemove: false,
                filter: false,
            },
            {
                key: 'grnNumber',
                title: 'grnNumber',
                value: filterString?.grnNumber,
                name: filterString?.grnNumber ?? null,
                canRemove: true,
                filter: true,
            },
            {
                key: 'fromDate',
                title: 'Reciept From Date',
                value: filterString?.fromDate,
                name: convertDateTime(filterString?.fromDate, dateFormatView, 'fromDate'),
                canRemove: true,
                filter: true,
            },
            {
                key: 'toDate',
                title: 'Reciept To Date',
                value: filterString?.toDate,
                name: convertDateTime(filterString?.toDate, dateFormatView, 'toDate'),
                canRemove: false,
                filter: true,
            },
            {
                key: 'model',
                title: 'Model',
                value: filterString?.model,
                name: vehicleModelData?.find((element) => filterString?.model === element?.prodctCode)?.prodctShrtName,
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
    }, [filterString, page, buttonType]);

    useEffect(() => {
        return () => {
            setFilterString();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const defaultSection = BIN_TO_BIN_PART_SECTION.DETAILS.id;
        setDefaultSection(defaultSection);
        setSetionName(BIN_TO_BIN_PART_SECTION);
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

    useEffect(() => {
        if (isAdvanceSearchVisible && filterString) {
            advanceFilterForm.resetFields();
            const { toDate, fromDate } = filterString;
            if (fromDate && toDate) setrules({ fromdate: true, todate: true });
            advanceFilterForm.setFieldsValue({ ...filterString, fromDate: formatDateToCalenderDate(fromDate), toDate: formatDateToCalenderDate(toDate) });
        } else {
            setrules({ fromdate: false, todate: false });
            advanceFilterForm.setFieldsValue({ ...filterString, fromDate: undefined, toDate: undefined, model: undefined });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAdvanceSearchVisible, filterString]);

    const onAdvanceSearchCloseAction = () => {
        setAdvanceSearchVisible(false);
        setrules({ fromdate: false, todate: false });
    };
    const handleSearchChange = (value) => {
        const searchValue = value?.trim();
        if (!searchValue) {
            return;
        }
        searchForm.resetFields();
        setFilterString({
            ...filterString,
            grnNumber: value,
            advanceFilter: true,
        });
    };

    const handleResetFilter = (e) => {
        if (filterString) {
            setShowDataLoading(true);
        }
        setFilterString();
        setrules({ ...rulesIntialstate });
        advanceFilterForm.resetFields();
    };

    const handleButtonClick = ({ record = null, buttonAction, openDefaultSection = true }) => {

        form.resetFields();
        switch (buttonAction) {
            case ADD_ACTION:
                defaultSection && setCurrentSection(defaultSection);
                setPreviousSection(1);
                setSelectedRecord(record);
                setcheckListDataModified([]);
                setPayload([]);
                setdeletedUpload([]);
                setFileList([]);
                break;
            case EDIT_ACTION:
                setSelectedRecord(record);
                record && setSelectedRecordId(record?.grnNumber ?? '');
                openDefaultSection && setCurrentSection(defaultSection);
                setcheckListDataModified([]);
                setPayload([]);
                setdeletedUpload([]);
                setFileList([]);

                break;
            case VIEW_ACTION:
                setSelectedRecord(record);
                record && setSelectedRecordId(record?.grnNumber ?? '');
                defaultSection && setCurrentSection(defaultSection);
                setcheckListDataModified([]);
                setPayload([]);
                setdeletedUpload([]);
                setFileList([]);

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
            setButtonData(btnVisiblity({ defaultBtnVisiblity, buttonAction }));
        } else {
        }
        setIsFormVisible(true);
    };

    const onFinishSearch = (values) => {};

    const onFinish = (data) => {
        console.log('🚀 ~ file: BinToBinTransfer.js:438 ~ onFinish ~ data:', data);
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
    };
    const isUnclaimedStatus = currentStatusButton === QUERY_BUTTONS_CONSTANTS?.UNCLAIMED?.key;

    const tableProps = {
        dynamicPagination,
        totalRecords,
        page,
        setPage,
        tableColumn: tableColumn({ handleButtonClick, canAdd: !!isUnclaimedStatus, canEdit: !isUnclaimedStatus, canView: !isUnclaimedStatus }),
        tableData: tabledataPFG,
        showAddButton: false,
        handleAdd: handleButtonClick,
        noMessge: LANGUAGE_EN.GENERAL.LIST_NO_DATA_FOUND.TITLE,
        isLoading: showDataLoading,
    };
    const removeFilter = (key) => {
        if (key === 'fromDate') {
            const { fromDate, toDate, ...rest } = filterString;
            setrules({ ...rulesIntialstate });
            setFilterString({ ...rest });
        } else {
            const { [key]: names, ...rest } = filterString;
            setFilterString({ ...rest });
        }
    };

    const handleQuickFilter = (value) => {
        setcurrentStatusButton(value?.key);
    };

    const advanceFilterResultProps = {
        extraParams,
        removeFilter,
        advanceFilter: true,
        filter: true,
        filterString,
        setFilterString,
        onFinish,
        onFinishFailed,
        currentStatusButton,
        statusBtnList: QUERY_BUTTONS_CONSTANTS,
        handleStatusTypeChange: handleQuickFilter,
        data,
        otfSearchRules,
        setOtfSearchRules,
        searchForm,
        onFinishSearch,
        handleResetFilter,
        isAdvanceSearchVisible,
        setAdvanceSearchVisible,
        handleSearchChange,
        handleButtonClick,
        saveButtonName: 'Save',
        currentStatusButton,
        showAddButton: isUnclaimedStatus,
    };

    const containerProps = {
        isProfileDataLoaded,
        ProfileData,
        record: selectedRecord,
        form,
        formActionType,
        setFormActionType,
        onFinish,
        onFinishFailed,
        setIsFormVisible,
        isVisible: isFormVisible,
        onCloseAction,
        titleOverride: drawerTitle(formActionType).concat(moduleTitle),
        tableData: data,
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
        previousSection,
        setPreviousSection,
        formData,
        setFormData,
        handleFormValueChange,
        isLastSection,
        VehicelReceiptChecklistOnfinish: onFinish,
        supportingData: ChecklistData,
        buttonType: buttonType === QUERY_BUTTONS_CONSTANTS?.COMPLETED?.key ? true : false,
        checkListDataModified,
        setcheckListDataModified,
        addMode: formActionType?.addMode,
        editMode: formActionType?.editMode,
        payload,
        setPayload,
        deletedUpload,
        setdeletedUpload,
        fileList,
        setFileList,
        typeData,
        VehicleLovCodeData,
        data,
        isProfileDataLoading,
        isProductHierarchyLoading,
        currentStatusButton,
        loginUserType,
        setSection,
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
        isAdvanceSearchVisible,
        onFinishSearch,
        vehicleModelData,
        isModelDataLoading,
        rules,
        setrules,
        // showAddButton: false,
        // showRefreshBtn: false,
        tableData: [{}],
        currentStatusButton,
        loginUserType,
    };

    return (
        <>
            {/* <AdvanceFilter {...advanceFilterResultProps} /> */}
            <AppliedAdvanceFilter {...advanceFilterResultProps} />
            <AdvancedSearch {...advanceFilterProps} />
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <ListDataTable {...tableProps} />
                </Col>
            </Row>
            <BinToBinTransferContainer {...containerProps} />
        </>
    );
};

export const BinToBinTransferMaster = connect(mapStateToProps, mapDispatchToProps)(BinToBinTransferBase);
