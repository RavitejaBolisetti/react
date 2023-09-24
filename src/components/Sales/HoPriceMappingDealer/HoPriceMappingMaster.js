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

import { showGlobalNotification } from 'store/actions/notification';

import { FilterIcon } from 'Icons';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            ConfigurableParameterEditing: { filteredListData: typeData = [] },
            ProductHierarchy: { data: productHierarchyData = [] },
            Geo: {
                State: { isFilteredListLoaded: isStateDataLoaded = false, isLoading: isStateLoading, filteredListData: stateData },
                District: { isFilteredListLoaded: isDistrictDataLoaded = false, isLoading: isDistrictLoading, filteredListData: districtData },
                City: { isFilteredListLoaded: isCityDataLoaded = false, isLoading: isCityLoading, filteredListData: cityData },
            },
            TermCondition: {
                ProductHierarchyData: { isLoaded: isProductHierarchyDataLoaded = false, data: productHierarchyList },
            },
            HoPriceMapping: {
                HoPriceMappingSearchList: { isLoaded: isSearchDataLoaded = false, isLoading: isSearchLoading, data, filter: filterString },
                HoPriceDetailList: { isLoading: isHoPriceDetaiLoading, data: hoPriceDetailData = [] },
            },
        },
    } = state;

    const moduleTitle = 'Dealer List';
    let returnValue = {
        userId,
        typeData,
        isStateDataLoaded,
        isStateLoading,
        filteredStateData: stateData,
        isDistrictDataLoaded,
        isDistrictLoading,
        districtData,
        isCityDataLoaded,
        isCityLoading,
        cityData,
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

            fetchCityLovList: geoCityDataActions.fetchFilteredList,
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
    const { filterString, setFilterString, fetchList, saveData, listShowLoading, userId, fetchStateLovList, fetchDistrictLovList, fetchProductLovList, data, fetchDetail, listProductMainShowLoading, fetchProductList, listDetailShowLoading } = props;
    const { typeData, listStateShowLoading, listDistrictShowLoading, listProductShowLoading, filteredStateData, districtData, productHierarchyList, productHierarchyData, totalRecords, showGlobalNotification, hoPriceDetailData, isHoPriceDetaiLoading } = props;
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
    const [pricingType, setPricingType] = useState(PRICING_TYPE?.RSO_PLANT.key);
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

    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });

    const defaultFormActionType = { addMode: false, editMode: false, viewMode: false };
    const [formActionType, setFormActionType] = useState({ ...defaultFormActionType });

    const [formData, setFormData] = useState([]);
    // const [responseData, setResponseData] = useState([]);

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
                value: 'Pricing_Type',
            },
            {
                key: 'dealerParent',
                title: 'Dealer Parent',
                value: filterString?.dealerParent,
                canRemove: true,
                filter: true,
                name: filterString?.dealerParent ?? null,
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
            fetchProductList({ setIsLoading: listProductMainShowLoading, userId, onCloseAction, extraParams: [{ key: 'manufactureOrgCode', value: `LMM` }], onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    useEffect(() => {
        if (userId) {
            fetchList({ setIsLoading: listShowLoading, userId, extraParams, onSuccessAction, onErrorAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, pricingType, page, filterString]);

    useEffect(() => {
        if (userId) {
            fetchStateLovList({ setIsLoading: listStateShowLoading, userId });
            fetchDistrictLovList({ setIsLoading: listDistrictShowLoading, userId });
            fetchProductLovList({ setIsLoading: listProductShowLoading, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    const handlePricingTypeChange = (key) => {
        setPricingType(key);
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

    const handleResetFilter = () => {
        setShowDataLoading(false);
        setFilterString();
        advanceFilterForm.resetFields();
    };

    const handleButtonClick = ({ record = null, buttonAction, openDefaultSection = true }) => {
        form.resetFields();
        setFormData([]);

        setFormActionType({ addMode: buttonAction === ADD_ACTION, editMode: buttonAction === EDIT_ACTION, viewMode: buttonAction === VIEW_ACTION });
        setButtonData(btnVisiblity({ defaultBtnVisiblity, buttonAction, saveAndNewBtn: false }));

        record && setFormData(record);
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
            fetchDetail({ setIsLoading: listDetailShowLoading, userId, extraParams });
        }
    };

    const onFinishSearch = (values) => { };

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

    useEffect(() => {
        if (!formActionType?.addMode && productHierarchyData?.length) {
            //&& hoPriceDetailData?.modelDealerMapResponse?.length
            setCheckedKeys([]);
            setEditProductData(productHierarchyData?.map((i) => disableExceptModelGroup(i)));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hoPriceDetailData, productHierarchyData, formActionType]);

    // useEffect(() => {
    //     if (formActionType?.viewMode && hoPriceDetailData?.modelDealerMapResponse?.length) setResponseData(hoPriceDetailData?.modelDealerMapResponse);
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [hoPriceDetailData, formActionType]);

    const onFinish = (values) => {
        const { city, dealerBranch, dealerParent, productCode, state, ...rest } = values;

        let arr = [];
        for (let i = 0; i < checkedKeys?.length; i++) {
            let ifFind = hoPriceDetailData?.modelDealerMapResponse?.findIndex((e) => e?.modelGroupCode === checkedKeys[i]);
            if (ifFind > -1) {
                arr.push({ ...hoPriceDetailData?.modelDealerMapResponse[ifFind], status: true });
            } else {
                arr.push({ id: '', modelGroupCode: checkedKeys[i], status: true });
            }
        }

        for (let i = 0; i < hoPriceDetailData?.modelDealerMapResponse?.length; i++) {
            let ifFind = checkedKeys?.findIndex((e) => e === hoPriceDetailData?.modelDealerMapResponse[i]?.modelGroupCode);
            if (ifFind === -1) {
                arr.push({ ...hoPriceDetailData?.modelDealerMapResponse[i], status: false });
            }
        }
        const data = { ...rest, id: formData?.id, modelDetails: arr };
        const onSuccess = (res) => {
            form.resetFields();
            setShowDataLoading(true);
            showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage + 'Receipt No.:' + res?.data?.receiptsDetails?.receiptNumber });
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

    const tableProps = {
        dynamicPagination,
        totalRecords,
        page,
        setPage,
        tableColumn: tableColumn(handleButtonClick),
        tableData: data,
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

    const title = 'HO Price Upload Mapping for Dealer';

    const drawerTitle = useMemo(() => {
        if (formActionType?.viewMode) {
            return 'View ';
        } else if (formActionType?.editMode) {
            return 'Edit ';
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
        productHierarchyList,
        handleFilterChange,

        onCloseAction: onAdvanceSearchCloseAction,
        handleResetFilter,
        filterString,
        setFilterString,
        advanceFilterForm,
        setAdvanceSearchVisible,
        typeData,
        onFinishSearch,
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
    };

    return (
        <>
            <HoPriceMappingFilter {...advanceFilterResultProps} />
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

export const HoPriceMappingMaster = connect(mapStateToProps, mapDispatchToProps)(HoPriceMappingMasterBase);
