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
// import AdvanceFilter from './AdvanceFilter';
import { ADD_ACTION, EDIT_ACTION, VIEW_ACTION, NEXT_ACTION, btnVisiblity } from 'utils/btnVisiblity';

import { ListDataTable } from 'utils/ListDataTable';
import { AdvancedSearch } from './AdvancedSearch';
import { showGlobalNotification } from 'store/actions/notification';

import styles from 'assets/sass/app.module.scss';

import { validateRequiredInputField } from 'utils/validation';

import { drawerTitle } from 'utils/drawerTitle';
import { AppliedAdvanceFilter } from 'utils/AppliedAdvanceFilter';
import { formatDateToCalenderDate } from 'utils/formatDateTime';
import { LANGUAGE_EN } from 'language/en';
import AdvanceFilter from './AdvanceFilter';
import { AddEditForm } from './AddEditForm';
import { CorporateSchemeRegistrationMainContainer } from './DealerCorporateClaimMasterMainContainer';
import { DEALER_CORPORATE_SECTION } from 'constants/modules/CorporateSchemeRegistration/CorporateSchemeSection';
import { SchemeRegistrationBulkUpload } from './SchemeRegistrationBulkUpload';
import { corporateSchemeRegistration } from 'store/actions/data/corporateSchemeRegistration/CorporateSchemeRegistration';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            corporateSchemeRegistrationData: {
                corporateSchemeRegistration: { isLoaded: isDataLoaded = false, isLoading, data: corporateSchemeRegistrationList, filter: filterString },
            },
        },
    } = state;
    
    const moduleTitle = 'Corporate Scheme';

    let returnValue = {
        userId,
        moduleTitle,
        typeData,
        corporateSchemeRegistrationList,
        typedataMaster: typeData,
    };
    return returnValue;
};

const tabledataOth = [
    {
        zone: 'East',
        areaOffice: 'Noida',
        dealerCode: 'DC999',
        corporateCategory: 'Category',
        dealerAmount: '990',
        oeMAmount: '100',
        totalAmount: '99',
        validFrom: '',
        validTo: '',
        status: '',
    },
];

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchCorporateSchemeList: corporateSchemeRegistration.fetchList,
            listShowLoading: corporateSchemeRegistration.listShowLoading,
            showGlobalNotification,
        },
        dispatch
    ),
});

export const CorporateSchemeRegistrationBase = (props) => {
    const { userId, listShowLoading, data, totalRecords, moduleTitle, fetchCorporateSchemeList, corporateSchemeRegistrationList } = props;
    console.log(corporateSchemeRegistrationList, "asdfasd");
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
        saveBtn: false,
        saveAndNewBtn: false,
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

    const [page, setPage] = useState({ ...pageIntialState });
    const dynamicPagination = true;
    const [formData, setFormData] = useState([]);
    const [otfSearchRules, setOtfSearchRules] = useState({ rules: [validateRequiredInputField('search parametar')] });
    const [isAdvanceSearchVisible, setAdvanceSearchVisible] = useState(false);
    const [actionButtonVisibility, setactionButtonVisibility] = useState({ canEdit: false, canView: false, DeleteIcon: false, canAdd: true });
    const [rules, setrules] = useState({ ...rulesIntialstate });
    const [isUploadDrawer, setIsUploadDrawer] = useState(false);

    const extraParams = useMemo(() => {
        return [
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
                // name: convertDateTime(filterString?.fromDate, dateFormatView, 'fromDate'),
                canRemove: true,
                filter: true,
            },
            {
                key: 'toDate',
                title: 'Reciept To Date',
                value: filterString?.toDate,
                // name: convertDateTime(filterString?.toDate, dateFormatView, 'toDate'),
                canRemove: false,
                filter: true,
            },
            {
                key: 'model',
                title: 'Model',
                value: filterString?.model,
                // name: vehicleModelData?.find((element) => filterString?.model === element?.prodctCode)?.prodctShrtName,
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
                key: 'pageNo',
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
        return () => {
            setFilterString();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const defaultSection = DEALER_CORPORATE_SECTION.CLAIM_DETAILS.id;
        setDefaultSection(defaultSection);
        setSetionName(DEALER_CORPORATE_SECTION);
        setSection(defaultSection);
        fetchCorporateSchemeList({setIsLoading: listShowLoading, extraParams});
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [extraParams]);

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
                setFormActionType({ addMode: true, editMode: false, viewMode: false });
                defaultSection && setCurrentSection(defaultSection);
                setPreviousSection(1);
                setSelectedRecord(record);
                setcheckListDataModified([]);
                setPayload([]);
                setdeletedUpload([]);
                setFileList([]);
                break;
            case EDIT_ACTION:
                setFormActionType({ addMode: false, editMode: true, viewMode: false });
                setSelectedRecord(record);
                record && setSelectedRecordId(record?.grnNumber ?? '');
                openDefaultSection && setCurrentSection(defaultSection);
                setcheckListDataModified([]);
                setPayload([]);
                setdeletedUpload([]);
                setFileList([]);

                break;
            case VIEW_ACTION:
                setFormActionType({ addMode: false, editMode: false, viewMode: true });
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

    const handleOnClickUpload = () => {
        setIsUploadDrawer(true);
        setButtonData({ ...defaultBtnVisiblity, saveAndNewBtn: false, cancelBtn: true, saveBtn: true, editBtn: false });
    };

    const onFinishSearch = (values) => {};

    const onFinish = (data) => {
        console.log('🚀 ~ file: DealerCorporateClaimMaster.js:438 ~ onFinish ~ data:', data);
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

    const tableProps = {
        dynamicPagination,
        totalRecords,
        page,
        setPage,
        tableColumn: tableColumn({ handleButtonClick, actionButtonVisibility }),
        tableData: corporateSchemeRegistrationList?.paginationData || [],
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

    const containerProps = {
        form,
        formData,
        formActionType,
        setFormActionType,
        onFinish,
        isVisible: isFormVisible,
        onCloseAction,
        titleOverride: drawerTitle(formActionType).concat(' ').concat(moduleTitle),
        data,
        ADD_ACTION,
        EDIT_ACTION,
        VIEW_ACTION,
        buttonData,
        setButtonData,
        handleButtonClick,
        record: selectedRecord,
        onFinishFailed,
        setIsFormVisible,
        selectedRecordId,
        setSelectedRecordId,
        selectedRecord,
        section,
        currentSection,
        sectionName,
        setCurrentSection,
        previousSection,
        setPreviousSection,
        setFormData,
        handleFormValueChange,
        isLastSection,
        VehicelReceiptChecklistOnfinish: onFinish,
        // supportingData: ChecklistData,
        // buttonType: buttonType === QUERY_BUTTONS_CONSTANTS?.COMPLETED?.key ? true : false,
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
    };

    const uploadProps = {
        ...props,
        isVisible: isUploadDrawer,
        titleOverride: 'Upload Scheme Registration Details',
        onFinish,
        setIsUploadDrawer,
        showGlobalNotification,
        onCloseAction: () => {
            setButtonData({ ...defaultBtnVisiblity, editBtn: true, childBtn: true, siblingBtn: true });
            setIsUploadDrawer(false);
        },
        ADD_ACTION,
        EDIT_ACTION,
        VIEW_ACTION,
        buttonData,
        setButtonData,

        fileList,
        setFileList,
    };

    const advanceFilterResultProps = {
        extraParams,
        removeFilter,
        advanceFilter: true,
        filter: true,
        filterString,
        setFilterString,
        from: listFilterForm,
        onFinish,
        onFinishFailed,
        title: 'Product',
        // title: <span className={styles.marR20}>Product</span>,
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
        // saveButtonName: !isLastSection && 'Save'
        saveButtonName: 'Save',
        showAddButton: true,
        addBtnVisible: true,
        showRefreshBtn: false,
        uploadBtn: true,
        handleOnClickUpload,
        isUploadDrawer,
        setIsUploadDrawer,
        treeSearch: true,
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
        rules,
        setrules,
        showAddButton: true,
        showRefreshBtn: false,
        tableData: [{}],
    };

    return (
        <>
            {/* <AdvanceFilter {...advanceFilterResultProps} /> */}
            <AdvancedSearch {...advanceFilterProps} />
            <AppliedAdvanceFilter {...advanceFilterResultProps} />

            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <ListDataTable {...tableProps} />
                </Col>
            </Row>
            <CorporateSchemeRegistrationMainContainer {...containerProps} />
            <SchemeRegistrationBulkUpload {...uploadProps} />
        </>
    );
};

export const CorporateSchemeRegistrationMaster = connect(mapStateToProps, mapDispatchToProps)(CorporateSchemeRegistrationBase);
