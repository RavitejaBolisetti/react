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
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import AdvanceOtfFilter from './AdvanceOtfFilter';
import { btnVisiblity } from 'utils/btnVisiblity';
import { OTFMainConatiner } from './OTFMainConatiner';
import { ListDataTable } from 'utils/ListDataTable';
import { AdvancedSearch } from './AdvancedSearch';
import { OTF_STATUS } from 'constants/OTFStatus';
import { PARAM_MASTER } from 'constants/paramMaster';
import { OTF_SECTION } from 'constants/OTFSection';

import { showGlobalNotification } from 'store/actions/notification';
import { configParamEditActions } from 'store/actions/data/configurableParamterEditing';
import { otfDetailsDataActions } from 'store/actions/data/otf/otfDetails';
import { otfSearchListAction } from 'store/actions/data/otf/otfSearchAction';

import { FilterIcon } from 'Icons';
import dayjs from 'dayjs';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            OTF: {
                OtfDetails: { isLoaded: isDataLoaded = false, isLoading, data: otfData = [], filter: filterString },
                OtfSearchList: { isLoaded: isSearchDataLoaded = false, isLoading: isOTFSearchLoading, data },
            },
        },
    } = state;

    const moduleTitle = 'Order Tracking Form';

    let returnValue = {
        userId,
        typeData: typeData && typeData[PARAM_MASTER.OTF_SER.id],
        isDataLoaded,
        data: data?.otfDetails,
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
            setFilterString: otfDetailsDataActions.setFilter,
            fetchList: otfDetailsDataActions.fetchList,
            saveData: otfDetailsDataActions.saveData,
            resetData: otfDetailsDataActions.reset,
            listShowLoading: otfDetailsDataActions.listShowLoading,
            showGlobalNotification,
        },
        dispatch
    ),
});

export const OtfMasterBase = (props) => {
    const { fetchList, saveData, listShowLoading, userId, fetchOTFSearchedList, data, isSearchDataLoaded } = props;
    const { typeData, moduleTitle } = props;
    const { filterString, setFilterString } = props;
    const [otfSearchvalue, setOtfSearchvalue] = useState();
    const [otfSearchSelected, setOtfSearchSelected] = useState();
    const [isAdvanceSearchVisible, setAdvanceSearchVisible] = useState(false);

    const [refershData, setRefershData] = useState();
    const [listFilterForm] = Form.useForm();

    const [selectedOrder, setSelectedOrder] = useState();
    const [selectedOrderId, setSelectedOrderId] = useState();

    const [section, setSection] = useState();
    const [defaultSection, setDefaultSection] = useState();
    const [currentSection, setCurrentSection] = useState();
    const [sectionName, setSetionName] = useState();
    const [isLastSection, setLastSection] = useState(false);

    const [form] = Form.useForm();
    const [showDataLoading, setShowDataLoading] = useState(true);
    const [isFormVisible, setIsFormVisible] = useState(false);

    const defaultBtnVisiblity = { editBtn: false, saveBtn: false, saveAndNewBtn: false, saveAndNewBtnClicked: false, closeBtn: false, cancelBtn: false, formBtnActive: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });

    const defaultFormActionType = { addMode: false, editMode: false, viewMode: false };
    const [formActionType, setFormActionType] = useState({ ...defaultFormActionType });

    const [formData, setFormData] = useState([]);
    const ADD_ACTION = FROM_ACTION_TYPE?.ADD;
    const EDIT_ACTION = FROM_ACTION_TYPE?.EDIT;
    const VIEW_ACTION = FROM_ACTION_TYPE?.VIEW;
    const NEXT_ACTION = FROM_ACTION_TYPE?.NEXT;
    const NEXT_EDIT_ACTION = FROM_ACTION_TYPE?.NEXT_EDIT;

    const extraParams = [
        {
            key: 'searchType',
            title: 'Type',
            value: filterString?.searchType,
            canRemove: true,
        },
        {
            key: 'searchParam',
            title: 'Value',
            value: filterString?.searchParam,
            canRemove: true,
        },
        {
            key: 'pageSize',
            title: 'Value',
            value: 1000,
            canRemove: true,
        },
        {
            key: 'pageNumber',
            title: 'Value',
            value: 1,
            canRemove: true,
        },
    ];

    const onSuccessAction = (res) => {
        showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
        setShowDataLoading(false);
        setRefershData(false);
    };

    const onErrorAction = (message) => {
        showGlobalNotification({ message });
        setShowDataLoading(false);
        setRefershData(false);
    };

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
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentSection, sectionName]);

    useEffect(() => {
        if (userId) {
            fetchOTFSearchedList({ setIsLoading: listShowLoading, userId, extraParams, onSuccessAction, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSearchDataLoaded, userId, refershData]);

    const handleButtonClick = ({ record = null, buttonAction, formVisible = false }) => {
        form.resetFields();

        if (buttonAction === ADD_ACTION) {
            defaultSection && setCurrentSection(defaultSection);
        }

        if (buttonAction === EDIT_ACTION) {
            setSelectedOrder(record);
            record && setSelectedOrderId(record?.otfNumber);
            !formVisible && setCurrentSection(defaultSection);
        }

        if (buttonAction === VIEW_ACTION) {
            setOtfSearchSelected(record);
            record && setSelectedOrderId(record?.otfNumber);
            defaultSection && setCurrentSection(defaultSection);
        }

        if (buttonAction === NEXT_ACTION || buttonAction === NEXT_EDIT_ACTION) {
            const nextSection = Object.values(sectionName)?.find((i) => i.id > currentSection);
            section && setCurrentSection(nextSection?.id);
            setLastSection(!nextSection?.id);
        }

        setFormActionType({ addMode: buttonAction === ADD_ACTION, editMode: buttonAction === EDIT_ACTION || buttonAction === NEXT_EDIT_ACTION, viewMode: buttonAction === VIEW_ACTION || buttonAction === NEXT_ACTION });
        setButtonData(btnVisiblity({ defaultBtnVisiblity, buttonAction }));
        setIsFormVisible(true);
    };

    const onSearchHandle = (value) => {
        setShowDataLoading(true);
        fetchOTFSearchedList({ setIsLoading: listShowLoading, extraParams, userId, onSuccessAction, onErrorAction });
    };

    const handleResetFilter = (e) => {
        setFilterString();
        listFilterForm.resetFields();
        form.resetFields();
        setShowDataLoading(false);
    };

    const handleClearInSearch = (e) => {
        if (e?.target?.value === '') {
            setFilterString();
            listFilterForm.resetFields();
            setShowDataLoading(false);
        } else if (e.target.value.length > 2) {
            listFilterForm.validateFields(['code']);
        }
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

    const onFinishAdvanceFilter = (values) => {
        //let extraParams = [...extraParams, ...searchedParams];
        extraParams.push(
            { key: 'fromDate', title: 'Type', value: values?.fromDate ? dayjs(values?.fromDate).format('YYYY-MM-DD') : undefined, canRemove: true },
            {
                key: 'toDate',
                title: 'Type',
                value: values?.toDate ? dayjs(values?.toDate).format('YYYY-MM-DD') : undefined,
                canRemove: true,
            },
            {
                key: 'otfStatus',
                title: 'Type',
                value: values?.otfStatus,
                canRemove: true,
            }
        );
        setShowDataLoading(true);
        fetchOTFSearchedList({ setIsLoading: listShowLoading, extraParams, userId, onSuccessAction, onErrorAction });
        onAdvanceSearchCloseAction();
    };

    const onFinishFailed = (errorInfo) => {
        return;
    };

    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const onCloseAction = () => {
        form.resetFields();
        setIsFormVisible(false);
        setButtonData({ ...defaultBtnVisiblity });
    };

    const tableProps = {
        tableColumn: tableColumn(handleButtonClick),
        tableData: data,
    };

    const handleOTFChange = (selectedvalue) => {
        setFilterString({ searchType: selectedvalue });
        setOtfSearchvalue(''); // Cleared search value
    };

    const ChangeSearchHandler = (event) => {
        if (event.target.value === undefined) {
            return false;
        }
        setFilterString({ ...filterString, searchParam: event.target.value });
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

    const title = 'Search OTF';

    const advanceFilterResultProps = {
        advanceFilter: true,
        otfFilter: true,
        filterString,
        setFilterString,
        from: listFilterForm,
        onFinish,
        onFinishFailed,
        onSearchHandle,
        handleResetFilter,
        handleClearInSearch,
        handleButtonClick,
        title,
        data,
        ChangeSearchHandler,
        handleOTFChange,
        otfSearchvalue,
        setAdvanceSearchVisible,
        typeData,
    };

    const advanceFilterProps = {
        isVisible: isAdvanceSearchVisible,

        icon: <FilterIcon size={20} />,
        titleOverride: 'Advance Filters',

        onCloseAction: onAdvanceSearchCloseAction,
        handleResetFilter,
        handleFilterChange,
        filterString,
        setFilterString,
        form,
        setAdvanceSearchVisible,
        otfStatusList: Object.values(OTF_STATUS),
        onFinishAdvanceFilter,
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
        otfSearchSelected,
        isLastSection,
        saveButtonName: formActionType?.addMode ? 'Create Customer ID' : isLastSection ? 'Submit' : 'Save & Next',
    };

    return (
        <>
            <AdvanceOtfFilter {...advanceFilterResultProps} />
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <ListDataTable handleAdd={handleButtonClick} isLoading={showDataLoading} {...tableProps} />
                </Col>
            </Row>
            <AdvancedSearch {...advanceFilterProps} />
            <OTFMainConatiner {...containerProps} />
        </>
    );
};

export const OtfMaster = connect(mapStateToProps, mapDispatchToProps)(OtfMasterBase);
