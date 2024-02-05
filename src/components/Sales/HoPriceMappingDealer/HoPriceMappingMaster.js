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
import HoPriceMappingFilter from './HoPriceMappingFilter';
import { ADD_ACTION, EDIT_ACTION, VIEW_ACTION, btnVisiblity } from 'utils/btnVisiblity';
import { MODEL_TYPE } from 'constants/modules/hoPricingMapping/index';
import { ATTRIBUTE_TYPE } from 'constants/modules/hoPricingMapping/index';

import { AddEditForm } from './AddEditForm';

import { ListDataTable } from 'utils/ListDataTable';
import { AdvancedSearch } from './AdvancedSearch';
import { PRICING_TYPE } from 'constants/PricingType';
import { productHierarchyDataActions } from 'store/actions/data/productHierarchy';
import { geoStateDataActions } from 'store/actions/data/geo/states';
import { geoDistrictDataActions } from 'store/actions/data/geo/districts';
import { geoCityDataActions } from 'store/actions/data/geo/cities';
import { tncProductHierarchyDataActions } from 'store/actions/data/termsConditions/tncProductHierarchy';
import { hoPriceMappingDataActions } from 'store/actions/data/hoPriceMapping/hoPriceMapping';
import { hoPriceMappingDetailDataActions } from 'store/actions/data/hoPriceMapping/hoPriceMappingDetails';
import { translateContent } from 'utils/translateContent';

import { showGlobalNotification } from 'store/actions/notification';
import { drawerTitle } from 'utils/drawerTitle';
import { defaultPageProps } from 'utils/defaultPageProps';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            ProductHierarchy: { data: productHierarchyData = [] },
            Geo: {
                State: { isFilteredListLoaded: isStateDataLoaded = false, isLoading: isStateLoading, filteredListData: stateData },
                District: { isFilteredListLoaded: isDistrictDataLoaded = false, isLoading: isDistrictLoading, filteredListData: districtData },
                City: { isLoaded: isCityLoaded = false, data: cityData = [] },
            },
            TermCondition: {
                ProductHierarchyData: { isLoaded: isProductHierarchyDataLoaded = false, isLoading: isProductLoading, data: productHierarchyList },
            },
            HoPriceMapping: {
                HoPriceMappingSearchList: { isLoaded: isSearchDataLoaded = false, isLoading: isSearchLoading, data, filter: filterString },
                HoPriceDetailList: { isLoading: isHoPriceDetaiLoading, data: hoPriceDetailData = [] },
            },
        },
    } = state;

    const moduleTitle = translateContent('hoPriceMapping.heading.maintitle');
    const searchTypeConstant = `Pricing_Type`;
    let returnValue = {
        userId,
        typeData,
        isStateDataLoaded,
        isStateLoading,
        filteredStateData: stateData,
        isDistrictDataLoaded,
        isDistrictLoading,
        districtData,
        isCityLoaded,
        cityData: cityData?.filter((item) => item.status),
        isProductHierarchyDataLoaded,
        productHierarchyList,
        data: data?.paginationData,
        totalRecords: data?.totalRecords || [],
        moduleTitle,
        isSearchLoading,
        isSearchDataLoaded,
        filterString,
        productHierarchyData,
        hoPriceDetailData,
        isHoPriceDetaiLoading,
        isProductLoading,
        searchTypeConstant,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchProductList: productHierarchyDataActions.fetchList,
            listProductMainShowLoading: productHierarchyDataActions.listShowLoading,

            fetchStateLovList: geoStateDataActions.fetchFilteredList,
            listStateShowLoading: geoStateDataActions.listShowLoading,

            fetchDistrictLovList: geoDistrictDataActions.fetchFilteredList,
            listDistrictShowLoading: geoDistrictDataActions.listShowLoading,

            fetchListCity: geoCityDataActions.fetchList,
            listCityShowLoading: geoCityDataActions.listShowLoading,

            fetchProductLovList: tncProductHierarchyDataActions.fetchList,
            listProductShowLoading: tncProductHierarchyDataActions.listShowLoading,

            fetchList: hoPriceMappingDataActions.fetchList,
            listShowLoading: hoPriceMappingDataActions.listShowLoading,
            setFilterString: hoPriceMappingDataActions.setFilter,
            resetData: hoPriceMappingDataActions.reset,

            fetchDetail: hoPriceMappingDetailDataActions.fetchList,
            listDetailShowLoading: hoPriceMappingDetailDataActions.listShowLoading,
            saveData: hoPriceMappingDetailDataActions.saveData,

            showGlobalNotification,
        },
        dispatch
    ),
});

export const HoPriceMappingMasterBase = (props) => {
    const { filterString, setFilterString, fetchList, saveData, listShowLoading, userId, fetchStateLovList, fetchProductLovList, data, fetchDetail, listProductMainShowLoading, fetchProductList, listDetailShowLoading, isProductLoading, searchTypeConstant, fetchListCity, listCityShowLoading } = props;
    const { typeData, listStateShowLoading, listProductShowLoading, filteredStateData, cityData, productHierarchyList, productHierarchyData, totalRecords, showGlobalNotification, hoPriceDetailData, isHoPriceDetaiLoading, isStateLoading } = props;
    const [isAdvanceSearchVisible, setAdvanceSearchVisible] = useState(false);
    const [filteredCityData, setFilteredCityData] = useState([]);
    const [editProductData, setEditProductData] = useState([]);
    const [viewProductData, setViewProductData] = useState([]);
    const [modelGroupArr, setModelGroupArr] = useState([]);
    const [checkedKeys, setCheckedKeys] = useState([]);

    const [form] = Form.useForm();
    const [searchForm] = Form.useForm();
    const [advanceFilterForm] = Form.useForm();

    const [modelCodeName, setModelCodeName] = useState();
    const [modelGroupProductData, setModelGroupProductData] = useState([]);
    const [selectedTreeSelectKey, setSelectedTreeSelectKey] = useState([]);
    const [showDataLoading, setShowDataLoading] = useState(false);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [pricingType, setPricingType] = useState(PRICING_TYPE?.RSO_PLANT.key);
    const [flatternData, setFlatternData] = useState();
    const fieldNames = { title: 'prodctShrtName', key: 'id', children: 'subProdct' };
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

    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });
    const defaultFormActionType = { addMode: false, editMode: false, viewMode: false };
    const [formActionType, setFormActionType] = useState({ ...defaultFormActionType });
    const [formData, setFormData] = useState([]);

    const onSuccessAction = (res) => {
        showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: res?.responseMessage });
        searchForm.setFieldsValue({ searchType: undefined, searchParam: undefined });
        searchForm.resetFields();
        setShowDataLoading(false);
    };

    const onErrorAction = (message) => {
        showGlobalNotification({ message });
        setShowDataLoading(false);
    };

    useEffect(() => {
        if (filterString && isAdvanceSearchVisible) {
            advanceFilterForm.setFieldsValue({ ...filterString });
            filterString?.modelCodeName && setSelectedTreeSelectKey(filterString?.modelCodeName);
            filterString?.stateCode && setFilteredCityData(cityData?.filter((item) => item?.stateCode === filterString?.stateCode));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAdvanceSearchVisible, filterString]);

    const extraParams = useMemo(() => {
        return [
            {
                key: 'searchParam',
                title: 'searchParam',
                value: filterString?.pricingType || PRICING_TYPE?.RSO_PLANT.key,
                filter: false,
            },
            {
                key: 'searchType',
                title: 'Type',
                value: searchTypeConstant,
            },
            {
                key: 'dealerParent',
                title: 'Dealer Parent',
                value: filterString?.dealerParent,
                name: filterString?.dealerParent || undefined,
                canRemove: true,
                filter: true,
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
            ...defaultPageProps(filterString),
        ];
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString]);

    useEffect(() => {
        if (userId) {
            fetchProductList({
                setIsLoading: listProductMainShowLoading,
                userId,
                onCloseAction,
                onErrorAction,
                extraParams: [
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
                ],
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    useEffect(() => {
        if (userId) {
            setShowDataLoading(true);
            fetchList({
                setIsLoading: listShowLoading,
                userId,
                extraParams,
                onSuccessAction: () => {
                    setShowDataLoading(false);
                },
                onErrorAction,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, filterString]);

    useEffect(() => {
        if (userId) {
            fetchStateLovList({ setIsLoading: listStateShowLoading, userId });
            fetchListCity({ setIsLoading: listCityShowLoading, userId });
            fetchProductLovList({ setIsLoading: listProductShowLoading, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    const handlePricingTypeChange = (key) => {
        setPricingType(key);
        setFilterString({ ...filterString, pricingType: key });
        searchForm.resetFields();
    };

    const handleFilterChange =
        (name, type = 'value') =>
        (value) => {
            if (!value) {
                switch (name) {
                    case 'stateCode': {
                        setFilteredCityData();
                        advanceFilterForm.setFieldsValue({ cityCode: undefined });
                        return false;
                    }
                    default: {
                        return false;
                    }
                }
            }
            const filterValue = type === 'text' ? value.target.value : value;

            if (name === 'stateCode') {
                setFilteredCityData(cityData?.filter((i) => i?.stateCode === filterValue));
                advanceFilterForm.setFieldsValue({ cityCode: undefined });
            }
        };

    const handleSearch = (value) => {
        setFilterString({ ...filterString, dealerParent: value, advanceFilter: true });
        searchForm.resetFields();
    };

    const handleResetFilter = () => {
        setShowDataLoading(false);
        setSelectedTreeSelectKey([]);
        advanceFilterForm.setFieldsValue({ stateCode: undefined, cityCode: undefined, modelCode: undefined });
        setFilterString({ ...filterString, stateCode: undefined, cityCode: undefined, modelCode: undefined });
        setFilteredCityData([]);
    };

    const handleSelectTreeClick = (value, name) => {
        const obj = {
            modelCode: value,
        };

        setModelCodeName(name);
        advanceFilterForm.setFieldsValue(obj);
        setSelectedTreeSelectKey(value);
    };

    const handleButtonClick = ({ record = null, buttonAction }) => {
        form.resetFields();
        setFormData([]);

        setFormActionType({ addMode: buttonAction === ADD_ACTION, editMode: buttonAction === EDIT_ACTION, viewMode: buttonAction === VIEW_ACTION });
        setButtonData(btnVisiblity({ defaultBtnVisiblity, buttonAction, saveAndNewBtn: false }));

        record && setFormData(record);
        setIsFormVisible(true);
        if (buttonAction !== ADD_ACTION) {
            fetchDetail({
                setIsLoading: listDetailShowLoading,
                userId,
                extraParams: [
                    {
                        key: 'id',
                        title: 'id',
                        value: record ? record?.id : '',
                        name: 'id',
                    },
                ],
            });
        }
    };
    const disableExceptModelGroup = (node) => {
        if (node?.attributeType === MODEL_TYPE.MODAL_GROUP.key && (node?.parntProdctCode !== ATTRIBUTE_TYPE.SERVICE.key || node?.parntProdctCode === null)) {
            let key = hoPriceDetailData?.modelDealerMapResponse?.find((e) => e?.modelGroupCode === node?.prodctCode);
            if (key && Object.values(key) && key?.status === true) setCheckedKeys((prev) => [...prev, node?.id]);
            setModelGroupArr((prev) => [...prev, node]);
        } else {
            node[`checkable`] = false;
        }
        if (node?.subProdct?.length > 0) {
            node?.subProdct?.forEach((child) => {
                disableExceptModelGroup(child);
            });
        }

        return node;
    };

    useEffect(() => {
        if (!formActionType?.addMode && productHierarchyData?.length) {
            setCheckedKeys([]);
            setEditProductData(productHierarchyData?.map((i) => disableExceptModelGroup(i)));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hoPriceDetailData, productHierarchyData, formActionType]);

    useEffect(() => {
        if (productHierarchyData?.length) {
            const dataList = [];
            const generateList = (data) => {
                for (let i = 0; i < data?.length; i++) {
                    const node = data[i];
                    const { [fieldNames?.key]: key } = node;
                    dataList.push({
                        key,
                        data: node,
                    });
                    if (node[fieldNames?.children]) {
                        generateList(node[fieldNames?.children]);
                    }
                }
                return dataList;
            };

            setFlatternData(generateList(productHierarchyData));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productHierarchyData]);

    const onFinish = (values) => {
        const { city, dealerBranch, dealerParent, productCode, state, ...rest } = values;

        let checkedKeysCd = [];
        for (let i = 0; i < checkedKeys?.length; i++) {
            checkedKeysCd.push(flatternData?.find((e) => e?.key === checkedKeys[i])?.data?.prodctCode);
        }

        let arr = [];
        for (let i = 0; i < checkedKeysCd?.length; i++) {
            let ifFind = hoPriceDetailData?.modelDealerMapResponse?.findIndex((e) => e?.modelGroupCode === checkedKeysCd[i]);
            if (ifFind > -1) {
                arr.push({ ...hoPriceDetailData?.modelDealerMapResponse[ifFind], status: true });
            } else {
                arr.push({ id: '', modelGroupCode: checkedKeysCd[i], status: true });
            }
        }

        for (let i = 0; i < hoPriceDetailData?.modelDealerMapResponse?.length; i++) {
            let ifFind = checkedKeysCd?.findIndex((e) => e === hoPriceDetailData?.modelDealerMapResponse[i]?.modelGroupCode);
            if (ifFind === -1) {
                arr.push({ ...hoPriceDetailData?.modelDealerMapResponse[i], status: false });
            }
        }
        const data = { ...rest, id: formData?.id, modelDetails: arr };
        const onSuccess = (res) => {
            form.resetFields();
            setShowDataLoading(true);
            showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: res?.responseMessage });
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

    const onCloseAction = () => {
        form.resetFields();
        setIsFormVisible(false);
        setButtonData({ ...defaultBtnVisiblity });
        form.resetFields();
        form.setFieldsValue();

        advanceFilterForm.resetFields();
        advanceFilterForm.setFieldsValue();
        setSelectedTreeSelectKey([]);
        setAdvanceSearchVisible(false);
    };
    console.log('filterString', filterString, selectedTreeSelectKey);
    const tableProps = {
        dynamicPagination,
        totalRecords,
        page: filterString,
        setPage: setFilterString,
        tableColumn: tableColumn(handleButtonClick),
        tableData: data,
        showAddButton: false,
        typeData,
        isLoading: showDataLoading,
        handleButtonClick,
        filterString,
    };

    const onAdvanceSearchCloseAction = () => {
        form.resetFields();
        advanceFilterForm.resetFields();
        advanceFilterForm.setFieldsValue();
        setSelectedTreeSelectKey([]);
        setAdvanceSearchVisible(false);
    };

    const removeFilter = (key) => {
        switch (key) {
            case `stateCode`: {
                const { stateCode, stateCodeName, cityCode, cityCodeName, ...rest } = filterString;
                setFilterString({ ...rest });
                break;
            }
            case `cityCode`: {
                const { stateCode, stateCodeName, cityCode, cityCodeName, ...rest } = filterString;
                setFilterString({ ...rest });
                break;
            }
            case `modelCode`:
                const { modelCode, modelCodeName, ...rest } = filterString;
                setFilterString({ ...rest });
                break;
            default:
                break;
        }
    };

    const disableExceptModelsGroup = (node) => {
        if (node?.attributeType === MODEL_TYPE?.MODAL_GROUP?.key) {
            node[`disabled`] = false;
        } else {
            node[`disabled`] = true;
        }

        if (node?.subProdct?.length > 0) {
            node?.subProdct?.forEach((child) => {
                disableExceptModelsGroup(child);
            });
        }

        return node;
    };

    useEffect(() => {
        setModelGroupProductData(productHierarchyData?.map((e) => disableExceptModelsGroup(e)));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productHierarchyData]);

    const title = translateContent('hoPriceMapping.heading.title');
    const drawerTitleHeading = translateContent('hoPriceMapping.heading.drawerTitleHeading');

    const advanceFilterResultProps = {
        extraParams,
        removeFilter,
        advanceFilter: true,
        filterString,
        setFilterString,
        onFinish,
        handleResetFilter,
        advanceFilterForm,
        handleButtonClick,
        handleSearch,
        pricingType,
        handlePricingTypeChange,
        title,
        data,
        setAdvanceSearchVisible,
        typeData,
        searchForm,
        setShowDataLoading,
        setSelectedTreeSelectKey,
        setFilteredCityData,
    };

    const advanceFilterProps = {
        isVisible: isAdvanceSearchVisible,
        titleOverride: translateContent('global.advanceFilter.title'),
        filteredStateData,
        filteredCityData,
        productHierarchyList,
        handleFilterChange,
        onCloseAction: onAdvanceSearchCloseAction,
        handleResetFilter,
        filterString,
        setFilterString,
        advanceFilterForm,
        setAdvanceSearchVisible,
        typeData,
        setFilteredCityData,
        isProductLoading,
        isStateLoading,

        handleSelectTreeClick,
        modelGroupProductData,
        selectedTreeSelectKey,
        modelCodeName,
        setSelectedTreeSelectKey,
    };

    const formProps = {
        isVisible: isFormVisible,
        titleOverride: drawerTitle(formActionType).concat(' ').concat(drawerTitleHeading),
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
        checkedKeys,
        setCheckedKeys,
        isHoPriceDetaiLoading,
    };

    return (
        <>
            <HoPriceMappingFilter {...advanceFilterResultProps} />
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <ListDataTable {...tableProps} />
                </Col>
            </Row>
            <AdvancedSearch {...advanceFilterProps} />
            <AddEditForm {...formProps} />
        </>
    );
};

export const HoPriceMappingMaster = connect(mapStateToProps, mapDispatchToProps)(HoPriceMappingMasterBase);
