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
import AdvanceVehiclePurchaseOrderFilter from './AdvanceVehiclePurchaseOrderFilter';
import { ADD_ACTION, EDIT_ACTION, VIEW_ACTION, NEXT_ACTION, CANCEL_ACTION, btnVisiblity } from 'utils/btnVisiblity';

import { ListDataTable } from 'utils/ListDataTable';
import { AdvancedSearch } from './AdvancedSearch';
import { VEHICLE_PURCHASE_ORDER_SECTION } from 'constants/VehiclePurchaseOrderSection';
import { validateRequiredInputField } from 'utils/validation';

import { showGlobalNotification } from 'store/actions/notification';
import { vehiclePurchaseOrderDataActions } from 'store/actions/data/vehicle/vehiclePurchaseOrderDetails';

import { PoCancellationMaster } from './VehiclePurchaseOrderCancellation/PoCancellationMaster';
import { VehiclePurchaseOrderDetailMaster } from './VehiclePurchaseOrderDetail';
import { saveVPODataActions } from 'store/actions/data/vehicle/vehiclePurchaseOrderAction';
import { translateContent } from 'utils/translateContent';
import { drawerTitle } from 'utils/drawerTitle';
import { productHierarchyDataActions } from 'store/actions/data/productHierarchy';
import { DisableParent } from 'components/common/ProductHierarchy/ProductHierarchyUtils';
const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            Vehicle: {
                VehiclePurchaseOrderDetail: { data, filter: filterString },
            },
            // ProductHierarchy: { isFilteredListLoaded: isProductHierarchyDataLoaded = false, productCode = undefined, isLoading: isProductHierarchyLoading, filteredListData: productAttributeData = [], isLoaded: isProductDataLoaded = false, data: productHierarchyData = [] },
            ProductHierarchy: { data: productHierarchyData = [] },
        },
    } = state;

    const moduleTitle = translateContent('vehiclePurchaseOrder.heading.moduleTitle');
    let returnValue = {
        userId,
        typeData: typeData,
        isDataLoaded: true,
        data: data?.paginationData,
        totalRecords: data?.totalRecords || [],
        vehicleDetailStatusList: typeData['PO_STATS'],
        vpoTypeList: typeData['PO_TYPE'],
        vehicleDetailData: [],
        moduleTitle,
        isLoading: false,
        isDetailLoaded: true,
        filterString,        
        productHierarchyDataListArray: productHierarchyData,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: vehiclePurchaseOrderDataActions.fetchList,
            listShowLoading: vehiclePurchaseOrderDataActions.listShowLoading,
            setFilterString: vehiclePurchaseOrderDataActions.setFilter,
            saveData: saveVPODataActions.saveData,
            resetData: vehiclePurchaseOrderDataActions.reset,

            fetchProductList: productHierarchyDataActions.fetchList,
            ProductLovCodeLoading: productHierarchyDataActions.listShowLoading,

            showGlobalNotification,
        },
        dispatch
    ),
});
export const VehiclePurchaseOrderMasterBase = (props) => {
    const { fetchList, saveData, listShowLoading, userId, data, vehicleDetailData, totalRecords } = props;
    const { typeData, moduleTitle, showGlobalNotification } = props;
    const { vehicleDetailStatusList, vpoTypeList, resetData } = props;
    const { fetchProductList, productHierarchyDataListArray } = props;
    const [productHierarchyDataArray, setProductHierarchyDataArray] = useState([]);

    const [isAdvanceSearchVisible, setAdvanceSearchVisible] = useState(false);
    const [listFilterForm] = Form.useForm();
    const [selectedRecord, setSelectedRecord] = useState();

    const [selectedRecordId, setSelectedRecordId] = useState();

    const [section, setSection] = useState();
    const [defaultSection, setDefaultSection] = useState();
    const [currentSection, setCurrentSection] = useState();
    const [sectionName, setSetionName] = useState();
    const [isLastSection, setLastSection] = useState(false);
    const [filterString, setFilterString] = useState({ pageSize: 10, current: 1 });
    const dynamicPagination = true;

    const [form] = Form.useForm();
    const [searchForm] = Form.useForm();
    const [advanceFilterForm] = Form.useForm();

    const [showDataLoading, setShowDataLoading] = useState(true);

    const [vpoCancellationForm] = Form.useForm();
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

    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isCancelVisible, setIsCancelVisible] = useState(false);
    const [changeView, setChangeView] = useState(false);

    useEffect(() => {
        setProductHierarchyDataArray(productHierarchyDataListArray?.map((i) => DisableParent(i, 'subProdct')));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productHierarchyDataListArray]);

    useEffect(() => {
        if (userId) {
            const extraParams = [
                {
                    key: 'unit',
                    value: 'Sales',
                },                
                {
                    key: 'hierarchyNode',
                    value: 'MV',
                },
            ];
            fetchProductList({ setIsLoading: listShowLoading, userId, extraParams, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);
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
                key: 'orderType',
                title: 'Order Type',
                value: filterString?.orderType,
                name: vpoTypeList?.find((i) => i?.key === filterString?.orderType)?.value,
                canRemove: true,
                filter: true,
            },
            {
                key: 'status',
                title: 'Vehicle Purchase Status',
                value: filterString?.status,
                name: vehicleDetailStatusList?.find((i) => i?.key === filterString?.status)?.value,
                canRemove: true,
                filter: true,
            },
            {
                key: 'purchaseOrderNumber',
                title: 'Purchase Order Number',
                value: filterString?.purchaseOrderNumber,
                name: filterString?.purchaseOrderNumber,
                canRemove: true,
                filter: true,
            },
            {
                key: 'pageSize',
                title: 'Value',
                value: filterString?.pageSize,
                canRemove: true,
                filter: false,
            },
            {
                key: 'pageNumber',
                title: 'Value',
                value: filterString?.current,
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
        return () => {
            resetData();
            setFilterString();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (userId) {
            setShowDataLoading(true);
            fetchList({ setIsLoading: listShowLoading, userId, extraParams, onSuccessAction, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, extraParams]);

    useEffect(() => {
        const defaultSection = VEHICLE_PURCHASE_ORDER_SECTION.PURCHASE_ORDER.id;
        setDefaultSection(defaultSection);
        setSetionName(VEHICLE_PURCHASE_ORDER_SECTION);
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

    const handleButtonClick = ({ record = null, buttonAction, openDefaultSection = true }) => {
        setChangeView(() => !changeView);

        form.resetFields();
        form.setFieldsValue(undefined);
        setIsFormVisible(true);
        setIsCancelVisible(false);
        switch (buttonAction) {
            case ADD_ACTION:
                defaultSection && setCurrentSection(defaultSection);
                break;
            case EDIT_ACTION:
                setSelectedRecord(record);
                record && setSelectedRecordId(record?.id);
                openDefaultSection && setCurrentSection(defaultSection);
                break;
            case VIEW_ACTION:
                setSelectedRecord(record);

                record && setSelectedRecordId(record?.id);
                defaultSection && setCurrentSection(defaultSection);
                break;
            case NEXT_ACTION:
                const nextSection = Object.values(sectionName)?.find((i) => i.id > currentSection);
                section && setCurrentSection(nextSection?.id);
                setLastSection(!nextSection?.id);
                break;
            case CANCEL_ACTION:
                setSelectedRecord(record);
                setIsCancelVisible(true);
                setIsFormVisible(false);

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
    };
    const onFinish = (values) => {
        const recordId = formData?.parentId || form.getFieldValue('parentId');
        let data = { ...values, parentId: recordId };
        const onSuccess = (res) => {
            form.resetFields();
            setShowDataLoading(false);
            showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: res?.responseMessage });
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
    const onCancelCloseAction = () => {
        setIsCancelVisible(false);
        vpoCancellationForm.resetFields();
    };
    const tableProps = {
        dynamicPagination,
        totalRecords,
        tableColumn: tableColumn(handleButtonClick),
        tableData: data,
        showAddButton: false,
        filterString,
        setPage: setFilterString,
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

    const handleResetFilter = () => {
        if (filterString) {
            setShowDataLoading(true);
        }
        setFilterString({ current: 1, pageSize: 10 });
        advanceFilterForm.resetFields();
        setAdvanceSearchVisible(false);
    };
    const handleCancelFilter = () => {
        if (filterString) {
            setShowDataLoading(true);
        }
        setFilterString({ current: 1, pageSize: 10 });
        advanceFilterForm.resetFields();
    };

    const title = translateContent('vehiclePurchaseOrder.placeholder.searchVPO');

    const advanceFilterResultProps = {
        extraParams,
        removeFilter,
        vehicleDetailStatusList,
        advanceFilter: true,
        vpoFilter: true,
        filterString,
        setFilterString,
        from: listFilterForm,
        onFinish,
        title,
        data,
        typeData,
        otfSearchRules,
        setOtfSearchRules,
        searchForm,
        setAdvanceSearchVisible,
        handleButtonClick,
        handleResetFilter,
        handleCancelFilter,
    };

    const onFinishVPOCancellation = (values) => {
        let data = {
            ...values,
            id: selectedRecord?.id,
            purchaseOrderNumber: selectedRecord?.purchaseOrderNumber,
            cancelRemarksCode: values?.cancelRemarksCode,
        };

        const onSuccess = (res) => {
            showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: res?.responseMessage });
            setShowDataLoading(true);
            setIsCancelVisible(false);
            fetchList({ setIsLoading: listShowLoading, userId, extraParams, onSuccessAction, onErrorAction });
            vpoCancellationForm.resetFields();
            setButtonData({ ...buttonData, formBtnActive: false });
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
            onSuccess,
        };
        saveData(requestData);
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
        handleCancelFilter,
    };

    const containerProps = {
        record: selectedRecord,
        form,
        formActionType,
        setFormActionType,
        onFinish,
        setIsFormVisible,
        isVisible: isFormVisible,
        onCloseAction,
        titleOverride: drawerTitle(formActionType).concat(' ').concat(moduleTitle),
        tableData: data,
        ADD_ACTION,
        EDIT_ACTION,
        VIEW_ACTION,
        NEXT_ACTION,
        CANCEL_ACTION,
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
        setFormData,
        handleFormValueChange,
        isLastSection,
        typeData,
        vehicleDetailData,
        saveButtonName: isLastSection ? translateContent('global.buttons.submit') : translateContent('global.buttons.saveAndNext'),
        setIsCancelVisible,
        extraParamsAfterSave: extraParams,
        showDataLoading,
        changeView,
        productHierarchyDataArray,
    };
    const cancelProps = {
        ...props,
        vpoCancellationForm,
        CANCEL_ACTION,
        isVisible: isCancelVisible,
        onCloseAction: onCancelCloseAction,
        onFinishVPOCancellation,
        selectedRecord,
        setSelectedRecord,
        setIsCancelVisible,
    };

    return (
        <>
            <AdvanceVehiclePurchaseOrderFilter {...advanceFilterResultProps} />
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <ListDataTable isLoading={showDataLoading} {...tableProps} showAddButton={false} />
                </Col>
            </Row>
            <AdvancedSearch {...advanceFilterProps} />
            <VehiclePurchaseOrderDetailMaster {...containerProps} />
            <PoCancellationMaster {...cancelProps} />
        </>
    );
};

export const VehiclePurchaseOrderMaster = connect(mapStateToProps, mapDispatchToProps)(VehiclePurchaseOrderMasterBase);
