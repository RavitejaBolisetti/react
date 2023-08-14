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

import { FilterIcon } from 'Icons';
import { PoCancellationMaster } from './VehiclePurchaseOrderCancellation/PoCancellationMaster';
import { VehiclePurchaseOrderDetailMaster } from './VehiclePurchaseOrderDetail';
import { saveVPODataActions } from 'store/actions/data/vehicle/vehiclePurchaseOrderAction';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            Vehicle: {
                VehiclePurchaseOrderDetail: { data, filter: filterString },
            },
        },
    } = state;

    const moduleTitle = 'Vehicle Purchase Order';
    let returnValue = {
        userId,
        typeData: typeData,
        isDataLoaded: true,
        data: data.paginationData,
        vehicleDetailStatusList: typeData['PO_STATS'],
        vpoTypeList: typeData['PO_TYPE'],
        vehicleDetailData: [],
        moduleTitle,
        isLoading: false,
        isDetailLoaded: true,
        filterString,
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
            resetData: saveVPODataActions.reset,
            showGlobalNotification,
        },
        dispatch
    ),
});
export const VehiclePurchaseOrderMasterBase = (props) => {
    const { fetchList, saveData, listShowLoading, userId, data, vehicleDetailData } = props;
    const { typeData, moduleTitle, showGlobalNotification } = props;
    const { filterString, setFilterString, vehicleDetailStatusList, vpoTypeList } = props;
    const [isAdvanceSearchVisible, setAdvanceSearchVisible] = useState(false);
    const [listFilterForm] = Form.useForm();
    const [selectedRecord, setSelectedRecord] = useState();

    const [selectedRecordId, setSelectedRecordId] = useState();

    const [section, setSection] = useState();
    const [defaultSection, setDefaultSection] = useState();
    const [currentSection, setCurrentSection] = useState();
    const [sectionName, setSetionName] = useState();
    const [isLastSection, setLastSection] = useState(false);

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
                name: typeData?.find((i) => i?.key === filterString?.searchType)?.value,
                canRemove: false,
                filter: false,
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
                value: filterString?.orderTypeCode,
                name: vpoTypeList?.find((i) => i?.key === filterString?.orderTypeCode)?.value,
                canRemove: true,
                filter: true,
            },
            {
                key: 'status',
                title: 'Vehicle Purchase Status',
                value: filterString?.purchaseOrderStatusCode,
                name: vehicleDetailStatusList?.find((i) => i?.key === filterString?.purchaseOrderStatusCode)?.value,
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
        if (userId) {
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

    const onFinishSearch = (values) => {};

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
        setSelectedRecord();
        setIsFormVisible(false);
        setButtonData({ ...defaultBtnVisiblity });
    };
    const onCancelCloseAction = () => {
        setIsCancelVisible(false);
        vpoCancellationForm.resetFields();
    };
    const tableProps = {
        tableColumn: tableColumn(handleButtonClick),
        tableData: data,
        showAddButton: false,
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

    const handleResetFilter = (e) => {
        // setShowDataLoading(true);
        if (filterString) {
            setShowDataLoading(true);
        }
        setFilterString();
        advanceFilterForm.resetFields();
        setAdvanceSearchVisible(false);
    };
    const title = 'Search VPO';

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
        onFinishFailed,
        title,
        data,
        typeData,
        otfSearchRules,
        setOtfSearchRules,
        searchForm,
        onFinishSearch,
        setAdvanceSearchVisible,
        handleButtonClick,
        handleResetFilter,
    };

    const onFinishVPOCancellation = (values) => {
        let data = {
            ...values,
            id: selectedRecord?.id,
            purchaseOrderNumber: selectedRecord?.purchaseOrderNumber,
            cancelRemarksCode: values?.cancelRemarksCode,
        };

        const onSuccess = (res) => {
            showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
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
        icon: <FilterIcon size={20} />,
        titleOverride: 'Advance Filters',
        onCloseAction: onAdvanceSearchCloseAction,
        handleResetFilter,
        filterString,
        setFilterString,
        advanceFilterForm,
        setAdvanceSearchVisible,
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
        record: selectedRecord,
        form,
        formActionType,
        setFormActionType,
        onFinish,
        onFinishFailed,
        setIsFormVisible,
        isVisible: isFormVisible,
        onCloseAction,
        titleOverride: drawerTitle.concat(moduleTitle),
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
        saveButtonName: isLastSection ? 'Submit' : 'Save & Next',
        setIsCancelVisible,
        extraParamsAfterSave: extraParams,
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
