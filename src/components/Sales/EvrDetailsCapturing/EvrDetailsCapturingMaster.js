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
import EvrDetailsCapturingFilter from './EvrDetailsCapturingFilter';
import { ADD_ACTION, EDIT_ACTION, VIEW_ACTION, btnVisiblity, NEXT_ACTION } from 'utils/btnVisiblity';
import { convertDateTime, dateFormatView, formattedCalendarDate } from 'utils/formatDateTime';

import { AddEditForm } from './AddEditForm';

import { ListDataTable } from 'utils/ListDataTable';
import { AdvancedSearch } from './AdvancedSearch';
import { EVR_STATUS } from 'constants/EvrStatus';
import { productHierarchyDataActions } from 'store/actions/data/productHierarchy';
import { evrDetailsCapturingDataActions } from 'store/actions/data/evrDetailsCapturing/evrDetailsCapturing';
import { MODEL_TYPE } from 'constants/modules/hoPricingMapping/index';
import { BASE_URL_EVR_DETAILS_CAPTURING_DETAIL as customURL } from 'constants/routingApi';

import { showGlobalNotification } from 'store/actions/notification';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            ProductHierarchy: { data: productHierarchyData = [] },

            EvrDetailsCapturing: {
                EvrDetailsCapturingSearchList: { isLoaded: isEvrDetailLoaded = false, isDetailLoaded = false, isLoading: isEvrDetailLoading, data, detailData: evrDetailData = [], filter: filterString },
            },
        },
    } = state;

    const moduleTitle = 'Vehicle Details';
    let returnValue = {
        userId,
        typeData,
        data: data?.paginationData,
        totalRecords: data?.totalRecords || [],
        evrStatusList: Object.values(EVR_STATUS),
        moduleTitle,
        isEvrDetailLoaded,
        filterString,
        productHierarchyData,
        isEvrDetailLoading,
        evrDetailData,
        isDetailLoaded,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchProductList: productHierarchyDataActions.fetchList,
            listProductMainShowLoading: productHierarchyDataActions.listShowLoading,

            fetchList: evrDetailsCapturingDataActions.fetchList,
            fetchDetail: evrDetailsCapturingDataActions.fetchDetail,
            listShowLoading: evrDetailsCapturingDataActions.listShowLoading,
            setFilterString: evrDetailsCapturingDataActions.setFilter,
            saveData: evrDetailsCapturingDataActions.saveData,

            showGlobalNotification,
        },
        dispatch
    ),
});

export const EvrDetailsCapturingMasterBase = (props) => {
    const { filterString, setFilterString, fetchList, evrDetailData, isDetailLoaded, isEvrDetailLoading, saveData, listShowLoading, userId, data, fetchDetail, listProductMainShowLoading, fetchProductList } = props;
    const { typeData, evrStatusList, filteredStateData, productHierarchyData, totalRecords, showGlobalNotification } = props;
    const [isAdvanceSearchVisible, setAdvanceSearchVisible] = useState(false);
    const [modelCodeName, setModelCodeName] = useState();
    const [modelGroupProductData, setModelGroupProductData] = useState([]);

    const [form] = Form.useForm();
    const [searchForm] = Form.useForm();
    const [advanceFilterForm] = Form.useForm();

    const [showDataLoading, setShowDataLoading] = useState(true);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [chargingStatusType, setChargingStatusType] = useState(EVR_STATUS?.DUE_FOR_CHARGING.key);
    const [page, setPage] = useState({ pageSize: 10, current: 1 });
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
    };

    const actionBtns = { canAdd: false, canView: false, canEdit: true };
    const [actionButtonVisiblity, setActionButtonVisiblity] = useState({ ...actionBtns });

    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });

    const defaultFormActionType = { addMode: false, editMode: false, viewMode: false };
    const [formActionType, setFormActionType] = useState({ ...defaultFormActionType });
    const [selectedTreeSelectKey, setSelectedTreeSelectKey] = useState([]);

    const [formData, setFormData] = useState([]);

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

    useEffect(() => {
        if (filterString) {
            setPage({ ...page, current: 1 });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString]);

    const extraParams = useMemo(() => {
        return [
            {
                key: 'searchParam',
                title: 'searchParam',
                value: chargingStatusType,
                filter: false,
            },
            {
                key: 'searchType',
                title: 'Type',
                value: 'chargingStatus',
            },
            {
                key: 'modelDescription',
                title: 'Model Description',
                value: filterString?.modelDescription,
                canRemove: true,
                filter: true,
                name: filterString?.modelDescription ?? null,
            },
            {
                key: 'dueFromDate',
                title: 'Due From Date',
                value: filterString?.dueFromDate,
                name: filterString?.dueFromDate ? convertDateTime(filterString?.dueFromDate, dateFormatView) : '',
                canRemove: true,
                filter: true,
            },
            {
                key: 'dueToDate',
                title: 'Due To Date',
                value: filterString?.dueToDate,
                name: filterString?.dueToDate ? convertDateTime(filterString?.dueToDate, dateFormatView) : '',
                canRemove: true,
                filter: true,
            },
            {
                key: 'modelGroupCode',
                title: 'Product Hierarchy',
                value: filterString?.model,
                name: filterString?.modelCodeName,
                canRemove: true,
                filter: true,
            },
            {
                key: 'pageNumber',
                title: 'Value',
                value: page?.current,
            },
            {
                key: 'pageSize',
                title: 'Value',
                value: page?.pageSize,
            },
            {
                key: 'sortBy',
                title: 'Sort By',
                value: page?.sortBy,
                filter: false,
            },
            {
                key: 'sortIn',
                title: 'Sort Type',
                value: page?.sortType,
                filter: false,
            },
        ];
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chargingStatusType, filterString, page]);

    useEffect(() => {
        if (userId) {
            const extraParams = [
                {
                    key: 'unit',
                    value: 'Sales',
                },
                {
                    key: 'prodctCode',
                    value: productHierarchyData?.modelCode,
                },
                {
                    key: 'hierarchyNode',
                    value: 'MV',
                },
            ];
            fetchProductList({ setIsLoading: listProductMainShowLoading, userId, onCloseAction, extraParams, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    useEffect(() => {
        if (userId) {
            setShowDataLoading(true);
            fetchList({ setIsLoading: listShowLoading, userId, extraParams, onSuccessAction, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, chargingStatusType, page, filterString]);

    useEffect(() => {
        if (isAdvanceSearchVisible && filterString) {
            setSelectedTreeSelectKey(modelCodeName);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAdvanceSearchVisible, filterString]);

    useEffect(() => {
        if (isDetailLoaded) {
            setFormData(evrDetailData);
            evrDetailData && form.setFieldsValue({ ...evrDetailData, grnDate: formattedCalendarDate(evrDetailData?.grnDate), lastChargeDate: formattedCalendarDate(evrDetailData?.lastChargeDate), chargingDueDate: formattedCalendarDate(evrDetailData?.chargingDueDate) });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDetailLoaded, evrDetailData, isFormVisible]);

    const disableExceptModelGroup = (node) => {
        if (node?.attributeType === MODEL_TYPE?.MODAL_GROUP?.key) {
            node[`disabled`] = false;
        } else {
            node[`disabled`] = true;
        }

        if (node?.subProdct?.length > 0) {
            node?.subProdct?.forEach((child) => {
                disableExceptModelGroup(child);
            });
        }

        return node;
    };

    useEffect(() => {
        setModelGroupProductData(productHierarchyData?.map((e) => disableExceptModelGroup(e)));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productHierarchyData]);

    const handleChargingTypeChange = (buttonName) => {
        switch (buttonName?.key) {
            case EVR_STATUS?.DUE_FOR_CHARGING?.key: {
                setActionButtonVisiblity({ canAdd: false, canView: false, canEdit: true });
                break;
            }
            case EVR_STATUS?.CHARGED?.key: {
                setActionButtonVisiblity({ canAdd: false, canView: true, canEdit: false });
                setButtonData({ ...buttonData });
                break;
            }

            default: {
                setActionButtonVisiblity({ canAdd: false, canView: false, canEdit: true });
            }
        }
        setChargingStatusType(buttonName?.key);
        searchForm.resetFields();
    };

    const handleSelectTreeClick = (value, name) => {
        let obj = {
            model: value,
        };

        setModelCodeName(name);

        advanceFilterForm.setFieldsValue(obj);
        setSelectedTreeSelectKey(value);
    };

    const handleSearch = (value) => {
        setFilterString({ ...filterString, modelDescription: value, advanceFilter: true });
        searchForm.resetFields();
    };

    const handleResetFilter = () => {
        setShowDataLoading(false);
        setFilterString();
        setSelectedTreeSelectKey(null);
        advanceFilterForm.resetFields();
    };

    const handleButtonClick = ({ record = null, buttonAction, openDefaultSection = true }) => {
        form.resetFields();

        if (buttonAction !== NEXT_ACTION && !(buttonAction === VIEW_ACTION)) {
            setFormActionType({
                addMode: buttonAction === ADD_ACTION,
                editMode: buttonAction === EDIT_ACTION,
                viewMode: buttonAction === VIEW_ACTION,
            });
            setButtonData(btnVisiblity({ defaultBtnVisiblity, buttonAction }));
        } else if (chargingStatusType === EVR_STATUS?.DUE_FOR_CHARGING?.key && buttonAction === EDIT_ACTION) {
            setFormActionType({
                addMode: buttonAction === ADD_ACTION,
                editMode: buttonAction === EDIT_ACTION,
                viewMode: buttonAction === VIEW_ACTION,
            });
            setButtonData({ nextBtn: true, closeBtn: true, saveBtn: true });
        } else if (chargingStatusType === EVR_STATUS?.CHARGED?.key && buttonAction === VIEW_ACTION) {
            setFormActionType({
                addMode: buttonAction === ADD_ACTION,
                editMode: buttonAction === EDIT_ACTION,
                viewMode: buttonAction === VIEW_ACTION,
            });
            setButtonData({ nextBtn: true, closeBtn: true });
        }

        setIsFormVisible(true);

        if (buttonAction !== ADD_ACTION) {
            const extraParams = [
                {
                    key: 'id',
                    title: 'id',
                    value: record?.id,
                    name: 'id',
                },
            ];
            fetchDetail({ setIsLoading: listShowLoading, userId, extraParams, customURL, onErrorAction });
        }
    };

    const onFinishSearch = (values) => {};

    const onFinish = (values) => {
        const { vin, modelGroup, modelCode, modelDescription, grnId, grnDate, grnStatus, vehicleStatus, ageInDays, chargingStatus, ...rest } = values;
        const data = { ...rest, id: formData?.id };

        const onSuccess = (res) => {
            form.resetFields();
            setShowDataLoading(true);
            showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
            fetchList({ setIsLoading: listShowLoading, userId, onSuccessAction, extraParams });
            setButtonData({ ...buttonData, formBtnActive: false });
            setIsFormVisible(false);
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
            errorData: true,
            onSuccess,
            customURL,
        };

        saveData(requestData);
    };

    const onFinishFailed = (errorInfo) => {
        return;
    };

    const onCloseAction = () => {
        setIsFormVisible(false);
        setButtonData({ ...defaultBtnVisiblity });
        advanceFilterForm.resetFields();
        setAdvanceSearchVisible(false);
    };

    const tableProps = {
        dynamicPagination,
        totalRecords,
        page,
        setPage,
        tableColumn: tableColumn({ handleButtonClick, actionButtonVisiblity }),
        tableData: data,
        showAddButton: false,
        typeData,
    };

    const onAdvanceSearchCloseAction = () => {
        form.resetFields();
        advanceFilterForm.resetFields();
        setSelectedTreeSelectKey();
        setAdvanceSearchVisible(false);
    };

    const removeFilter = (key) => {
        if (key === 'searchParam') {
            const { searchType, searchParam, ...rest } = filterString;
            setFilterString({ ...rest });
        } else if (key === 'dueFromDate' || key === 'dueToDate') {
            setFilterString();
            advanceFilterForm.resetFields();
        } else if (key === 'modelGroupCode') {
            const { modelGroupCode, model, modelCodeName, ...rest } = filterString;
            setFilterString({ ...rest });
        } else {
            const { [key]: names, ...rest } = filterString;
            setFilterString({ ...rest });
        }
    };

    const title = 'EVR Details Capturing';

    const drawerTitle = useMemo(() => {
        if (formActionType?.viewMode) {
            return 'View Vehicle Details';
        } else if (formActionType?.editMode) {
            return 'Edit Vehicle Details ';
        } else {
            return 'Add New ';
        }
    }, [formActionType]);

    const advanceFilterResultProps = {
        extraParams,
        removeFilter,
        advanceFilter: true,
        filterString,
        setFilterString,
        onFinish,
        onFinishFailed,
        handleResetFilter,
        advanceFilterForm,
        handleButtonClick,
        handleSearch,
        chargingStatusType,
        setChargingStatusType,
        handleChargingTypeChange,
        title,
        data,
        setAdvanceSearchVisible,
        typeData,
        searchForm,
        evrStatusList,
    };

    const advanceFilterProps = {
        isVisible: isAdvanceSearchVisible,
        titleOverride: 'Advance Filters',
        filteredStateData,
        onCloseAction: onAdvanceSearchCloseAction,
        handleResetFilter,
        filterString,
        setFilterString,
        advanceFilterForm,
        setAdvanceSearchVisible,
        typeData,
        onFinishSearch,
        productHierarchyData,
        handleSelectTreeClick,
        selectedTreeSelectKey,
        modelCodeName,
        setSelectedTreeSelectKey,
        modelGroupProductData,
    };

    const formProps = {
        isVisible: isFormVisible,
        titleOverride: drawerTitle,
        handleButtonClick,
        formActionType,
        onCloseAction,
        buttonData,
        setButtonData,
        formData,
        form,
        onFinish,
        selectedTreeSelectKey,
        setSelectedTreeSelectKey,
        productHierarchyData,
        isEvrDetailLoading,
    };

    return (
        <>
            <EvrDetailsCapturingFilter {...advanceFilterResultProps} />
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <ListDataTable handleButtonClick={handleButtonClick} isLoading={showDataLoading} {...tableProps} showAddButton={false} />
                </Col>
            </Row>

            <AdvancedSearch {...advanceFilterProps} />

            <AddEditForm {...formProps} />
        </>
    );
};

export const EvrDetailsCapturingMaster = connect(mapStateToProps, mapDispatchToProps)(EvrDetailsCapturingMasterBase);
