/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Col, Form, Row } from 'antd';

import { tableColumn } from './tableColumn';
import AdvanceFilter from './AdvanceFilter';
import { ADD_ACTION, EDIT_ACTION, VIEW_ACTION, NEXT_ACTION, btnVisiblity } from 'utils/btnVisiblity';

import { ListDataTable } from 'utils/ListDataTable';
import { AdvancedSearch } from './AdvancedSearch';
import { showGlobalNotification } from 'store/actions/notification';


import styles from 'assets/sass/app.module.scss';

import { validateRequiredInputField } from 'utils/validation';
import { LANGUAGE_EN } from 'language/en';

import { productHierarchyDataActions } from 'store/actions/data/productHierarchy';
import { translateContent } from 'utils/translateContent';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            ProductHierarchy: { isFilteredListLoaded: isProductHierarchyDataLoaded = false, isLoading: isProductHierarchyLoading, filteredListData: VehicleLovCodeData = [], data: productHierarchyData },
        },
    } = state;
    const moduleTitle = 'Demand Forecasting';

    
    
    return {
        userId,
        moduleTitle,
        typeData: typeData['CHK_STATS'],
        typedataMaster: typeData,
        isProductHierarchyDataLoaded,
        isProductHierarchyLoading,
        VehicleLovCodeData,
        productHierarchyData,
    };
};



const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchProductData: productHierarchyDataActions.fetchList,
            ProductLovLoading: productHierarchyDataActions.listShowLoading,
            showGlobalNotification,
        },
        dispatch
    ),
});

export const DemandForecastingMasterBase = (props) => {
    // const { data, totalRecords, moduleTitle } = props;
    const { data, totalRecords,moduleTitle } = props;
    const { isModelDataLoading, vehicleModelData } = props;
    const { isProfileDataLoaded, ProfileData, ChecklistData, typeData } = props;
    const { VehicleLovCodeData, isProfileDataLoading, isProductHierarchyLoading } = props;
    const { fetchProductData, productHierarchyData, ProductLovLoading, userId } = props;

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
        saveAndNewBtn: true,
        saveAndNewBtnClicked: false,
        closeBtn: false,
        cancelBtn: false,
        formBtnActive: true,
        transferBtn: false,
        allotBtn: false,
        unAllotBtn: false,
        invoiceBtn: false,
        deliveryNote: false,
        cancelOtfBtn: false,
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
    //const [buttonType, setbuttonType] = useState(QUERY_BUTTONS?.APPROVAL_PENDING?.key);

    const [page, setPage] = useState({ ...pageIntialState });
    const dynamicPagination = true;
    const [formData, setFormData] = useState([]);
    const [otfSearchRules, setOtfSearchRules] = useState({ rules: [validateRequiredInputField('search parametar')] });
    const [isAdvanceSearchVisible, setAdvanceSearchVisible] = useState(false);
    const [actionButtonVisibility, setactionButtonVisibility] = useState({ canEdit: false, canView: false, DeleteIcon: false, canAdd: true });
    const [rules, setrules] = useState({ ...rulesIntialstate });
    // const [btnStatus, setBtnStatus] = useState(QUERY_BUTTONS?.APPROVAL_PENDING?.key);

    useEffect(() => {
        return () => {
            setFilterString();
        };
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
        if (userId) {
            fetchProductData({
                setIsLoading: ProductLovLoading,
                userId,
                onErrorAction: (message) => {
                    showGlobalNotification({ message });
                },
                extraParams: [{ key: 'unit', value: 'Sales' }],
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

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
        }
        setIsFormVisible(true);
    };

    const onFinishSearch = (values) => {};
    // const onFinish = (data) => {
    //     console.log('🚀 ~ file: DealerCorporateClaimMaster.js:438 ~ onFinish ~ data:', data);
    // };

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
    const tabledataOth = [
        {   modelDescription: 'Scorpio N Z2 Diesel',
            DealerName: 'NBS International Ltd',
            areaOffice: 'Greater Noida',
            location: 'NB01',           
            currentYearRetail: '04/10/2024',            
            lastYearRetail: '04/11/2023',
        },
    ];
    const tableProps = {
        dynamicPagination,
        totalRecords,
        page,
        setPage,
        tableColumn: tableColumn({ handleButtonClick, actionButtonVisibility }),
        tableData: tabledataOth,
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

    const advanceFilterResultProps = {
        removeFilter,
        advanceFilter: true,
        filter: true,
        filterString,
        setFilterString,
        from: listFilterForm,
        onFinishFailed,
        title: 'Search By Product',
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
        showAddButton: true,
        showRefreshBtn: false,
        tableData: new Array(10).fill({}),
        productHierarchyData,
    };

    const containerProps = {
        isProfileDataLoaded,
        ProfileData,
        record: selectedRecord,
        form,
        formActionType,
        setFormActionType,
        onFinishFailed,
        setIsFormVisible,
        isVisible: isFormVisible,
        onCloseAction,
       // titleOverride: (drawerTitle(formActionType)).concat(' ' + moduleTitle),
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
        supportingData: ChecklistData,
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
        saveButtonName: translateContent('global.buttons.submit'),
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
        showAddButton: true,
        showRefreshBtn: false,
        productHierarchyData,
    };

    return (
        <>
            <AdvanceFilter {...advanceFilterResultProps} />
            <AdvancedSearch {...advanceFilterProps} />

            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <ListDataTable {...tableProps} />
                </Col>
            </Row>          
        </>
    );
    
};

export const DemandForecastingMaster = connect(mapStateToProps, mapDispatchToProps)(DemandForecastingMasterBase);
