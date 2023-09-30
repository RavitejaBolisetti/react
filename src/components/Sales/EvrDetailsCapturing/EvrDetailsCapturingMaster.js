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
import { MODEL_TYPE } from 'constants/modules/hoPricingMapping/index';

import { AddEditForm } from './AddEditForm';

import { ListDataTable } from 'utils/ListDataTable';
import { AdvancedSearch } from './AdvancedSearch';
import { EVR_STATUS } from 'constants/EvrStatus';
import { productHierarchyDataActions } from 'store/actions/data/productHierarchy';
import { tncProductHierarchyDataActions } from 'store/actions/data/termsConditions/tncProductHierarchy';
import { evrDetailsCapturingDataActions } from 'store/actions/data/evrDetailsCapturing/evrDetailsCapturing';
import { evrDetailsCapturingDetailDataActions } from 'store/actions/data/evrDetailsCapturing/evrDetailsCapturingDetails';

import { showGlobalNotification } from 'store/actions/notification';

import { FilterIcon } from 'Icons';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            ProductHierarchy: { data: productHierarchyData = [] },
            OTF: {
                VehicleDetails: { isLoaded: isVehicleDataLoaded = false, isLoading: isVehicleDataLoading, data: vehicleDetailData = [] },
            },
            EvrDetailsCapturing: {
                EvrDetailsCapturingSearchList: { isLoaded: isSearchDataLoaded = false, isLoading: isSearchLoading, data, filter: filterString },
                EvrDetailsCapturingDetailList: { isLoading: isHoPriceDetaiLoading, data: hoPriceDetailData = [] },
            },
        },
    } = state;

    const moduleTitle = 'Vehicle Details';
    let returnValue = {
        userId,
        typeData,
        data: data?.paginationData,
        totalRecords: data?.totalRecords || [],
        moduleTitle,
        isSearchLoading,
        isSearchDataLoaded,
        filterString,
        productHierarchyData,
        hoPriceDetailData,
        isHoPriceDetaiLoading,
        vehicleDetailData,
        isVehicleDataLoaded,
        isVehicleDataLoading,
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
            listShowLoading: evrDetailsCapturingDataActions.listShowLoading,
            setFilterString: evrDetailsCapturingDataActions.setFilter,
            resetData: evrDetailsCapturingDataActions.reset,

            fetchDetail: evrDetailsCapturingDetailDataActions.fetchList,
            listDetailShowLoading: evrDetailsCapturingDetailDataActions.listShowLoading,
            saveData: evrDetailsCapturingDetailDataActions.saveData,

            showGlobalNotification,
        },
        dispatch
    ),
});

export const EvrDetailsCapturingMasterBase = (props) => {
    const { filterString, setFilterString, vehicleDetailData, fetchList, saveData, listShowLoading, userId, fetchProductLovList, data, fetchDetail, listProductMainShowLoading, fetchProductList, listDetailShowLoading } = props;
    const { typeData, listProductShowLoading, filteredStateData, districtData, productHierarchyData, totalRecords, showGlobalNotification, hoPriceDetailData, isHoPriceDetaiLoading } = props;
    const [isAdvanceSearchVisible, setAdvanceSearchVisible] = useState(false);
    const [filteredCityData, setFilteredCityData] = useState([]);
    const [editProductData, setEditProductData] = useState([]);
    const [viewProductData, setViewProductData] = useState([]);
    const [modelGroupArr, setModelGroupArr] = useState([]);
    const [checkedKeys, setCheckedKeys] = useState([]);

    const [form] = Form.useForm();
    const [searchForm] = Form.useForm();
    const [advanceFilterForm] = Form.useForm();

    const [showDataLoading, setShowDataLoading] = useState(true);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [pricingType, setPricingType] = useState(EVR_STATUS?.DUE_FOR_CHARGING.key);
    const fieldNames = { title: 'prodctShrtName', key: 'prodctCode', children: 'subProdct' };
    const [page, setPage] = useState({ pageSize: 10, current: 1 });
    const [modelDetails, setModelDetails] = useState([]);
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
    const [selectedTreeSelectKey, setSelectedTreeSelectKey] = useState(null);

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
                value: pricingType,
                filter: false,
            },
            {
                key: 'searchType',
                title: 'Type',
                value: 'chargingStatus',
            },
            {
                key: 'modelCode',
                title: 'Model Code',
                value: filterString?.modelCode,
                canRemove: true,
                filter: true,
                name: filterString?.modelCode ?? null,
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
                key: 'stateCode',
                title: 'State',
                value: filterString?.stateCode,
                name: filterString?.stateCodeName,
                canRemove: true,
                filter: true,
            },
            {
                key: 'cityCode',
                title: 'City',
                value: filterString?.cityCode,
                name: filterString?.cityCodeName,
                canRemove: true,
                filter: true,
            },
            {
                key: 'modelCode',
                title: 'Product Hierarchy',
                value: filterString?.modelCode,
                name: filterString?.modelCodeName,
                canRemove: true,
                filter: true,
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
    }, [pricingType, filterString, page]);

    useEffect(() => {
        if (userId) {
            const extraParams = [
                {
                    key: 'unit',
                    value: 'Sales',
                },
                {
                    key: 'prodctCode',
                    value: vehicleDetailData?.modelCode,
                },
                {
                    key: 'hierarchyNode',
                    value: 'MV',
                },
            ];
            //  [{ key: 'manufactureOrgCode', value: `LMM` }]
            fetchProductList({ setIsLoading: listProductMainShowLoading, userId, onCloseAction, extraParams, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    useEffect(() => {
        if (userId) {
            fetchList({ setIsLoading: listShowLoading, userId, extraParams, onSuccessAction, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, pricingType, page, filterString]);

    const handlePricingTypeChange = (buttonName) => {
        setPricingType(buttonName?.key);
        searchForm.resetFields();
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
    };

    const handleFilterChange =
        (name, type = 'value') =>
        (value) => {
            if (!value) {
                switch (name) {
                    case 'stateCode': {
                        setFilteredCityData();
                        advanceFilterForm.setFieldsValue({ cityCode: undefined });
                        break;
                    }
                    case 'cityCode': {
                        break;
                    }
                    default: {
                        break;
                    }
                }
                return;
            }
            const filterValue = type === 'text' ? value.target.value : value;

            if (name === 'stateCode') {
                setFilteredCityData(districtData?.filter((i) => i?.parentKey === filterValue));
                advanceFilterForm.setFieldsValue({ cityCode: undefined });
            }
        };

    const handleSearch = (value) => {
        setFilterString({ ...filterString, dealerParent: value, advanceFilter: true });
        searchForm.resetFields();
    };

    const handleSelectTreeClick = (value, treeObj) => {
        // setUserApplicationId(value);
        // setAppSelectName(treeObj?.[0]);

        let obj = {
            model: value,
            // applicationName: treeObj?.[0],
            // documentTypeCode: null,
        };

        advanceFilterForm.setFieldsValue(obj);
        setSelectedTreeSelectKey(value);
    };

    const handleResetFilter = () => {
        setShowDataLoading(false);
        setFilterString();
        advanceFilterForm.resetFields();
        setFilteredCityData([]);
    };

    const handleButtonClick = ({ record = null, buttonAction, openDefaultSection = true }) => {
        form.resetFields();
        setFormData([]);
        record && setFormData(record);
        setIsFormVisible(true);

        if (buttonAction !== NEXT_ACTION && !(buttonAction === VIEW_ACTION)) {
            setFormActionType({
                addMode: buttonAction === ADD_ACTION,
                editMode: buttonAction === EDIT_ACTION,
                viewMode: buttonAction === VIEW_ACTION,
            });
            setButtonData(btnVisiblity({ defaultBtnVisiblity, buttonAction }));
        } else if (pricingType === EVR_STATUS?.DUE_FOR_CHARGING?.key && buttonAction === EDIT_ACTION) {
            setFormActionType({
                addMode: buttonAction === ADD_ACTION,
                editMode: buttonAction === EDIT_ACTION,
                viewMode: buttonAction === VIEW_ACTION,
            });
            setButtonData({ nextBtn: true, closeBtn: true, saveBtn: true });
        } else if (pricingType === EVR_STATUS?.CHARGED?.key && buttonAction === VIEW_ACTION) {
            setFormActionType({
                addMode: buttonAction === ADD_ACTION,
                editMode: buttonAction === EDIT_ACTION,
                viewMode: buttonAction === VIEW_ACTION,
            });
            setButtonData({ nextBtn: true, closeBtn: true });
        }

        if (buttonAction !== ADD_ACTION) {
            const extraParams = [
                {
                    key: 'id',
                    title: 'id',
                    value: record?.id,
                    name: 'id',
                },
            ];
            fetchDetail({ setIsLoading: listDetailShowLoading, userId, extraParams });
        }
    };

    const onFinishSearch = (values) => {};

    const disableExceptModelGroup = (node) => {
        if (node?.attributeType === MODEL_TYPE.MODAL_GROUP.key) {
            node[`disabled`] = false;
            let key = hoPriceDetailData?.modelDealerMapResponse?.find((e) => e?.modelGroupCode === node?.prodctCode);
            if (key && Object.values(key) && key?.status === true) setCheckedKeys((prev) => [...prev, node?.prodctCode]);
            setModelGroupArr((prev) => [...prev, node]);
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

    // useEffect(() => {
    //     if (!formActionType?.addMode && productHierarchyData?.length) {
    //         //&& hoPriceDetailData?.modelDealerMapResponse?.length
    //         setCheckedKeys([]);
    //         setEditProductData(productHierarchyData?.map((i) => disableExceptModelGroup(i)));
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [hoPriceDetailData, productHierarchyData, formActionType]);

    // useEffect(() => {
    //     if (formActionType?.viewMode && hoPriceDetailData?.modelDealerMapResponse?.length) setResponseData(hoPriceDetailData?.modelDealerMapResponse);
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [hoPriceDetailData, formActionType]);

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
            setIsLoading: listDetailShowLoading,
            userId,
            onError,
            errorData: true,
            onSuccess,
        };

        saveData(requestData);
    };

    const onFinishFailed = (errorInfo) => {
        return;
    };

    const onCloseAction = () => {
        form.resetFields();
        setIsFormVisible(false);
        setButtonData({ ...defaultBtnVisiblity });
        form.resetFields();
        form.setFieldsValue();

        advanceFilterForm.resetFields();
        advanceFilterForm.setFieldsValue();
        setAdvanceSearchVisible(false);
    };

    const tempdata = [{ modelCode: 'model', modelDescription: 'description', chargingStatus: 'charged' }];

    const tableProps = {
        dynamicPagination,
        totalRecords,
        page,
        setPage,
        tableColumn: tableColumn({ handleButtonClick, actionButtonVisiblity }),
        tableData: tempdata,
        showAddButton: false,
        typeData,
    };

    const onAdvanceSearchCloseAction = () => {
        form.resetFields();
        advanceFilterForm.resetFields();
        advanceFilterForm.setFieldsValue();
        setAdvanceSearchVisible(false);
    };

    const removeFilter = (key) => {
        switch (true) {
            case key === `stateCode`:
                const { stateCode, stateCodeName, ...restSatate } = filterString;
                setFilterString({ ...restSatate });
                break;
            case key === `cityCode`:
                const { cityCode, cityCodeName, ...restCity } = filterString;
                setFilterString({ ...restCity });
                break;
            case key === `modelCode`:
                const { modelCode, modelCodeName, ...restModule } = filterString;
                setFilterString({ ...restModule });
                break;
            default:
                const { [key]: names, ...restDefault } = filterString;
                setFilterString({ ...restDefault });
                break;
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
        pricingType,
        setPricingType,
        handlePricingTypeChange,
        title,
        data,
        setAdvanceSearchVisible,
        typeData,
        searchForm,
    };

    const advanceFilterProps = {
        isVisible: isAdvanceSearchVisible,

        icon: <FilterIcon size={20} />,
        titleOverride: 'Advance Filters',
        filteredStateData,
        filteredCityData,
        handleFilterChange,

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
        fieldNames,
        modelDetails,
        setModelDetails,
        onFinish,
        viewProductData,
        modelGroupArr,
        editProductData,
        setViewProductData,
        hoPriceDetailData,
        // responseData,
        checkedKeys,
        setCheckedKeys,
        isHoPriceDetaiLoading,
        selectedTreeSelectKey,
        setSelectedTreeSelectKey,
        productHierarchyData,
    };

    return (
        <>
            <EvrDetailsCapturingFilter {...advanceFilterResultProps} />
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <ListDataTable
                        handleButtonClick={handleButtonClick}
                        // isLoading={showDataLoading}
                        {...tableProps}
                        showAddButton={false}
                    />
                </Col>
            </Row>

            <AdvancedSearch {...advanceFilterProps} />

            <AddEditForm {...formProps} />
        </>
    );
};

export const EvrDetailsCapturingMaster = connect(mapStateToProps, mapDispatchToProps)(EvrDetailsCapturingMasterBase);
