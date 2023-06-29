/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Col, Form, Row } from 'antd';
import { tableColumn } from './tableColumn';
import AdvanceOtfFilter from './AdvanceOtfFilter';
import { ADD_ACTION, EDIT_ACTION, VIEW_ACTION, NEXT_ACTION, btnVisiblity } from 'utils/btnVisiblity';

import { OTFMainConatiner } from './OTFMainConatiner';
import { ListDataTable } from 'utils/ListDataTable';
import { AdvancedSearch } from './AdvancedSearch';
import { OTF_STATUS } from 'constants/OTFStatus';
import { OTF_SECTION } from 'constants/OTFSection';
import { validateRequiredInputField, validateMobileNoField, validateLettersWithWhitespaces, validateRequiredInputFieldMinLength } from 'utils/validation';

import { showGlobalNotification } from 'store/actions/notification';
import { otfDetailsDataActions } from 'store/actions/data/otf/otfDetails';
import { otfSearchListAction } from 'store/actions/data/otf/otfSearchAction';
import { convertCalenderDate } from 'utils/formatDateTime';

import { FilterIcon } from 'Icons';
import dayjs from 'dayjs';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            OTF: {
                OtfDetails: { isLoaded: isDataLoaded = false, isLoading, data: otfData = [] },
                OtfSearchList: { isLoaded: isSearchDataLoaded = false, isLoading: isOTFSearchLoading, data, filter: filterString },
            },
        },
    } = state;
    const moduleTitle = 'Order Tracking Form';
    console.log('Kuldeep ', filterString);

    let returnValue = {
        userId,
        typeData,
        isDataLoaded,
        data: data?.otfDetails,
        otfStatusList: Object.values(OTF_STATUS),
        otfData,
        isLoading,
        moduleTitle,
        isOTFSearchLoading,
        isSearchDataLoaded,
        filterString,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchOTFSearchedList: otfSearchListAction.fetchList,
            setFilterString: otfSearchListAction.setFilter,
            resetData: otfSearchListAction.reset,
            fetchList: otfDetailsDataActions.fetchList,
            saveData: otfDetailsDataActions.saveData,
            listShowLoading: otfDetailsDataActions.listShowLoading,
            showGlobalNotification,
        },
        dispatch
    ),
});

export const OtfMasterBase = (props) => {
    const { fetchList, saveData, listShowLoading, userId, fetchOTFSearchedList, data, otfData, resetData } = props;
    const { typeData, moduleTitle } = props;
    const { filterString, setFilterString, otfStatusList } = props;
    const [isAdvanceSearchVisible, setAdvanceSearchVisible] = useState(false);

    const [refreshData, setRefreshData] = useState(true);
    const [listFilterForm] = Form.useForm();

    const [selectedOrder, setSelectedOrder] = useState();
    const [selectedOrderId, setSelectedOrderId] = useState();

    const [section, setSection] = useState();
    const [defaultSection, setDefaultSection] = useState();
    const [currentSection, setCurrentSection] = useState();
    const [sectionName, setSetionName] = useState();
    const [isLastSection, setLastSection] = useState(false);

    const [form] = Form.useForm();
    const [searchForm] = Form.useForm();
    const [advanceFilterForm] = Form.useForm();

    const [showDataLoading, setShowDataLoading] = useState(true);
    const [isFormVisible, setIsFormVisible] = useState(false);

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

    const [formData, setFormData] = useState([]);
    const [otfSearchRules, setOtfSearchRules] = useState({ rules: [validateRequiredInputField('search parametar')] });
    const reff = useRef(null);

    const extraParams = useMemo(() => {
        return [
            {
                key: 'searchType',
                title: 'Type',
                value: filterString?.searchType,
                canRemove: true,
                filter: false,
            },
            {
                key: 'searchParam',
                title: 'Value',
                value: filterString?.searchParam,
                name: filterString?.searchParam,
                canRemove: true,
            },
            {
                key: 'fromDate',
                title: 'Start Date',
                value: filterString?.fromDate,
                name: filterString?.fromDate,
                canRemove: true,
                filter: true,
            },
            {
                key: 'toDate',
                title: 'End Date',
                value: filterString?.toDate,
                name: filterString?.toDate,
                canRemove: true,
                filter: true,
            },
            {
                key: 'oftStatus',
                title: 'OTF Status',
                value: filterString?.otfStatus,
                name: otfStatusList?.find((i) => i?.title === filterString?.otfStatus)?.desc,
                canRemove: true,
                filter: true,
            },
            {
                key: 'pageSize',
                title: 'Value',
                value: 1000,
                canRemove: true,
                filter: false,
            },
            {
                key: 'pageNumber',
                title: 'Value',
                value: 1,
                canRemove: true,
                filter: false,
            },
        ];
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString]);

    useEffect(() => {
        if (userId && refreshData) {
            fetchOTFSearchedList({ setIsLoading: listShowLoading, userId, extraParams, onSuccessAction, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, refreshData]);

    useEffect(() => {
        const defaultSection = OTF_SECTION.OTF_DETAILS.id;
        setDefaultSection(defaultSection);
        setSetionName(OTF_SECTION);
        setSection(defaultSection);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (currentSection && sectionName) {
            const section = Object.values(sectionName)?.find((i) => i.id === currentSection);
            setSection(section);

            const nextSection = Object.values(sectionName)?.find((i) => i.id > currentSection);
            setLastSection(!nextSection?.id);
        }
        form.resetFields();
        form.setFieldsValue(undefined);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentSection, sectionName]);

    const onSuccessAction = (res) => {
        showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
        setShowDataLoading(false);
        setRefreshData(false);
    };

    const onErrorAction = (message) => {
        showGlobalNotification({ message });
        setShowDataLoading(false);
        setRefreshData(false);
    };

    const handleButtonClick = ({ record = null, buttonAction, openDefaultSection = true }) => {
        form.resetFields();
        form.setFieldsValue(undefined);
        switch (buttonAction) {
            case ADD_ACTION:
                defaultSection && setCurrentSection(defaultSection);
                break;
            case EDIT_ACTION:
                setSelectedOrder(record);
                record && setSelectedOrderId(record?.otfNumber);
                openDefaultSection && setCurrentSection(defaultSection);
                break;
            case VIEW_ACTION:
                setSelectedOrder(record);
                record && setSelectedOrderId(record?.otfNumber);
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

    const handleResetFilter = (e) => {
        resetData();
        setFilterString();
        setShowDataLoading(false);
        advanceFilterForm.resetFields();
    };

    const onFinish = (values) => {
        const recordId = formData?.parentId || form.getFieldValue('parentId');
        let data = { ...values, parentId: recordId };

        const onSuccess = (res) => {
            form.resetFields();
            setShowDataLoading(true);

            showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
            fetchList({ setIsLoading: listShowLoading, userId, onSuccessAction });

            setButtonData({ ...buttonData, formBtnActive: false });

            setIsFormVisible(false);
        };

        const onError = (message) => {
            showGlobalNotification({ message });
        };

        const requestData = {
            data: data,
            method: formActionType?.editMode ? 'put' : 'post',
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
        setSelectedOrder();
        setIsFormVisible(false);
        setButtonData({ ...defaultBtnVisiblity });
    };

    const tableProps = {
        tableColumn: tableColumn(handleButtonClick),
        tableData: data,
        showAddButton: false,
    };

    const handleSearchTypeChange = (searchType) => {
        setFilterString({ ...filterString, searchType: searchType });
        setFilterString({ ...filterString, searchType: searchType });
        if (searchType === 'mobileNumber') {
            setOtfSearchRules({ rules: [validateMobileNoField('Mobile Number'), validateRequiredInputField('Mobile Number')] });
        } else if (searchType === 'customerName') {
            setOtfSearchRules({ rules: [validateLettersWithWhitespaces('Customer Name'), validateRequiredInputFieldMinLength('Customer Name')] });
        } else if (searchType === 'otfNumber') {
            setOtfSearchRules({ rules: [validateRequiredInputField('OTF Number')] });
        } else {
            searchForm.setFieldsValue({ searchParam: undefined, searchType: undefined });
            setFilterString({ ...filterString, searchParam: undefined, searchType: undefined });
        }
    };

    const handleSearchParamChange = (event) => {
        // setFilterString({ ...filterString, searchParam: event.target.value });
    };

    const handleSearchParamSearch = (value) => {
        searchForm
            .validateFields()
            .then((values) => {
                console.log('🚀 ~ file: OtfMaster.js:348 ~ .then ~ values:', values);
                setFilterString({ ...filterString, searchParam: value });
                setRefreshData(true);
                setShowDataLoading(true);
            })
            .catch((err) => {
                console.log(err);
                return;
            });
    };

    const handleFilterChange =
        (name, type = 'value') =>
        (value) => {
            if (name === 'code') {
            }
        };

    const onAdvanceSearchCloseAction = () => {
        setAdvanceSearchVisible(false);
        form.resetFields();
    };

    const removeFilter = (key) => {
        const { [key]: names, ...rest } = filterString;
        setFilterString({ ...rest });
        setRefreshData(true);
    };

    const title = 'Search OTF';

    const advanceFilterResultProps = {
        extraParams,
        removeFilter,
        setRefreshData,
        otfStatusList,
        advanceFilter: true,
        otfFilter: true,
        filterString,
        setFilterString,
        from: listFilterForm,
        onFinish,
        onFinishFailed,
        handleResetFilter,

        title,
        data,
        setAdvanceSearchVisible,
        typeData,
        otfSearchRules,
        setOtfSearchRules,
        searchForm,
        reff,
        onFinishSearch,
        handleSearchTypeChange,
        handleSearchParamChange,
        handleSearchParamSearch,
    };

    const advanceFilterProps = {
        isVisible: isAdvanceSearchVisible,

        icon: <FilterIcon size={20} />,
        titleOverride: 'Advance Filters 2',

        onCloseAction: onAdvanceSearchCloseAction,
        handleResetFilter,
        handleFilterChange,
        filterString,
        setFilterString,
        advanceFilterForm,
        setAdvanceSearchVisible,
        otfStatusList,
        setRefreshData,
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
        onFinish,
        onFinishFailed,
        isVisible: isFormVisible,
        onCloseAction,
        titleOverride: drawerTitle.concat(moduleTitle),
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
        selectedOrderId,
        setSelectedOrderId,
        selectedOrder,
        setSelectedOrder,
        section,
        currentSection,
        sectionName,
        setCurrentSection,
        setFormData,
        handleFormValueChange,
        isLastSection,
        typeData,
        otfData,
        saveButtonName: !selectedOrderId ? 'Create Customer ID' : isLastSection ? 'Submit' : 'Save & Next',
    };

    return (
        <>
            <AdvanceOtfFilter {...advanceFilterResultProps} />
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <ListDataTable handleAdd={handleButtonClick} isLoading={showDataLoading} {...tableProps} showAddButton={false} />
                </Col>
            </Row>
            <AdvancedSearch {...advanceFilterProps} />
            <OTFMainConatiner {...containerProps} />
        </>
    );
};

export const OtfMaster = connect(mapStateToProps, mapDispatchToProps)(OtfMasterBase);
