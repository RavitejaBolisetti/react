/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { Form, Row, Col } from 'antd';
import { bindActionCreators } from 'redux';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { geoCountryDataActions } from 'store/actions/data/geo/countries';
import { tableColumn } from './tableColumn';

import { ListDataTable } from 'utils/ListDataTable';
import { filterFunction } from 'utils/filterFunction';
import { btnVisiblity } from 'utils/btnVisiblity';

import { showGlobalNotification } from 'store/actions/notification';
import { geoDistrictDataActions } from 'store/actions/data/geo/districts';
import { geoStateDataActions } from 'store/actions/data/geo/states';
import { geoCityDataActions } from 'store/actions/data/geo/cities';

import { AddEditForm } from './AddEditForm';
import { AdvancedSearch } from './AdvancedSearch';

import { AppliedAdvanceFilter } from 'utils/AppliedAdvanceFilter';
import { FilterIcon } from 'Icons';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            Geo: {
                Country: { isLoaded: isDataCountryLoaded = false, isLoading: isCountryLoading = false, data: countryData = [] },
                State: { isFilteredListLoaded: isStateDataLoaded = false, isLoading: isStateLoading, filteredListData: stateData },
                District: { isFilteredListLoaded: isDistrictDataLoaded = false, isLoading: isDistrictLoading, filteredListData: districtData },
                City: { isLoaded: isDataLoaded = false, isLoading, data = [] },
            },
        },
    } = state;

    const moduleTitle = 'City';
    const finalCountryData = countryData?.map((item, index) => {
        return { ...item, default: index <= 0 || false };
    });

    const defaultCountry = finalCountryData && finalCountryData?.find((i) => i.default)?.countryCode;
    let returnValue = {
        userId,
        isDataCountryLoaded,
        isCountryLoading,
        countryData: finalCountryData,
        defaultCountry,
        isStateDataLoaded,
        isStateLoading,
        stateData,
        isDistrictDataLoaded,
        isDistrictLoading,
        districtData,
        isDataLoaded,
        isLoading,
        data,
        moduleTitle,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchCountryList: geoCountryDataActions.fetchList,
            listCountryShowLoading: geoCountryDataActions.listShowLoading,
            fetchStateLovList: geoStateDataActions.fetchFilteredList,
            listStateShowLoading: geoStateDataActions.listShowLoading,
            fetchDistrictLovList: geoDistrictDataActions.fetchFilteredList,
            listDistrictShowLoading: geoDistrictDataActions.listShowLoading,
            fetchList: geoCityDataActions.fetchList,
            saveData: geoCityDataActions.saveData,
            listShowLoading: geoCityDataActions.listShowLoading,
            resetData: geoCityDataActions.reset,
            showGlobalNotification,
        },
        dispatch
    ),
});
export const ListCityMasterBase = (props) => {
    const { data, saveData, fetchList, userId, resetData, isDataLoaded, listShowLoading, showGlobalNotification, moduleTitle } = props;
    const { isDataCountryLoaded, isCountryLoading, countryData, defaultCountry, fetchCountryList, listCountryShowLoading } = props;

    const { isStateDataLoaded, stateData, listStateShowLoading, fetchStateLovList } = props;
    const { isDistrictDataLoaded, districtData, listDistrictShowLoading, fetchDistrictLovList } = props;
    const [isAdvanceSearchVisible, setAdvanceSearchVisible] = useState(false);

    const [form] = Form.useForm();
    const [listFilterForm] = Form.useForm();
    const [advanceFilterForm] = Form.useForm();

    const [showDataLoading, setShowDataLoading] = useState(true);
    const [filteredStateData, setFilteredStateData] = useState([]);
    const [filteredDistrictData, setFilteredDistrictData] = useState([]);

    const [searchData, setSearchdata] = useState('');
    const [refershData, setRefershData] = useState(false);

    const [formData, setFormData] = useState([]);
    const [filterString, setFilterString] = useState();
    const [isFormVisible, setIsFormVisible] = useState(false);

    const defaultBtnVisiblity = { editBtn: false, saveBtn: false, saveAndNewBtn: false, saveAndNewBtnClicked: false, closeBtn: false, cancelBtn: false, formBtnActive: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });

    const defaultFormActionType = { addMode: false, editMode: false, viewMode: false };
    const [formActionType, setFormActionType] = useState({ ...defaultFormActionType });

    const ADD_ACTION = FROM_ACTION_TYPE?.ADD;
    const EDIT_ACTION = FROM_ACTION_TYPE?.EDIT;
    const VIEW_ACTION = FROM_ACTION_TYPE?.VIEW;

    const onSuccessAction = (res) => {
        refershData && showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
        setRefershData(false);
        setShowDataLoading(false);
    };

    useEffect(() => {
        if (userId) {
            if (!isDataCountryLoaded) {
                fetchCountryList({ setIsLoading: listCountryShowLoading, userId });
            }
            if (!isStateDataLoaded) {
                fetchStateLovList({ setIsLoading: listStateShowLoading, userId });
            }
            if (!isDistrictDataLoaded) {
                fetchDistrictLovList({ setIsLoading: listDistrictShowLoading, userId });
            }
            if (!isDataLoaded) {
                fetchList({ setIsLoading: listShowLoading, userId, onSuccessAction });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, isDataCountryLoaded, isStateDataLoaded, isDataLoaded]);

    useEffect(() => {
        if (userId && refershData) {
            fetchList({ setIsLoading: listShowLoading, userId, onSuccessAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, refershData]);

    useEffect(() => {
        if (isDataCountryLoaded && defaultCountry && isStateDataLoaded) {
            setFilterString({ countryCode: defaultCountry });
            defaultCountry ? setFilteredStateData(stateData?.filter((i) => i?.parentKey === defaultCountry)) : setFilteredStateData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDataCountryLoaded, isStateDataLoaded]);

    useEffect(() => {
        if (isDataLoaded && data && userId) {
            if (filterString) {
                const keyword = filterString?.code ? filterString?.code : filterString?.keyword;
                const state = filterString?.stateCode;
                const district = filterString?.districtCode;
                const filterDataItem = data?.filter((item) => (keyword ? filterFunction(keyword)(item?.name) : true) && (state ? filterFunction(state)(item?.stateCode) : true) && (district ? filterFunction(district)(item?.districtCode) : true));
                setSearchdata(filterDataItem);
                setShowDataLoading(false);
            } else {
                setSearchdata(data);
                setShowDataLoading(false);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString, isDataLoaded, data, userId]);

    const extraParams = [
        {
            key: 'countryCode',
            title: 'Country',
            value: filterString?.countryCode,
            canRemove: true,
            name: countryData?.find((i) => i?.countryCode === filterString?.countryCode)?.countryName,
        },
        {
            key: 'stateCode',
            title: 'State',
            value: filterString?.stateCode,
            canRemove: true,
            name: filteredStateData?.find((i) => i?.key === filterString?.stateCode)?.value,
        },
        {
            key: 'districtCode',
            title: 'District',
            canRemove: true,
            value: filterString?.districtCode,
            name: filteredDistrictData?.find((i) => i?.key === filterString?.districtCode)?.value,
        },

        {
            key: 'keyword',
            title: 'keyword',
            canRemove: true,
            value: filterString?.keyword,
            name: filterString?.keyword,
        },
    ];

    const handleButtonClick = ({ record = null, buttonAction }) => {
        form.resetFields();
        setFormData([]);

        setFormActionType({ addMode: buttonAction === ADD_ACTION, editMode: buttonAction === EDIT_ACTION, viewMode: buttonAction === VIEW_ACTION });
        setButtonData(btnVisiblity({ defaultBtnVisiblity, buttonAction }));

        record && setFormData(record);
        setIsFormVisible(true);
    };

    const handleReferesh = () => {
        setShowDataLoading(true);
        setRefershData(!refershData);
    };

    const removeFilter = (key) => {
        if (key === 'countryCode') {
            setFilterString(undefined);
            setFilteredDistrictData([]);
        } else if (key === 'stateCode') {
            const { stateCode, districtCode, ...rest } = filterString;
            setFilterString({ ...rest });
            setFilteredDistrictData([]);
        } else if (key === 'districtCode') {
            const { districtCode, ...rest } = filterString;
            setFilterString({ ...rest });
        } else {
            const { [key]: names, ...rest } = filterString;
            advanceFilterForm.setFieldsValue({ keyword: undefined, code: undefined });

            if (!filterString?.countryCode && !filterString?.stateCode && !filterString?.districtCode) {
                setFilterString();
                advanceFilterForm.resetFields();
            } else {
                setFilterString({ ...rest });
            }
        }
    };

    const onSearchHandle = (value) => {
        if (value?.trim()?.length >= 3) {
            setFilterString({ ...filterString, advanceFilter: true, keyword: value });
            listFilterForm.setFieldsValue({ code: undefined });
        }
    };

    const handleClearInSearch = (e) => {
        if (e.target.value.length > 2) {
            listFilterForm.validateFields(['code']);
        } else if (e?.target?.value === '') {
            setFilterString();
            listFilterForm.resetFields();
            setShowDataLoading(false);
        }
    };

    const handleFilterChange =
        (name, type = 'value') =>
        (value) => {
            const filterValue = type === 'text' ? value.target.value : value;

            if (name === 'countryCode') {
                if (typeof filterValue === 'undefined') {
                    advanceFilterForm.setFieldsValue({ stateCode: undefined, districtCode: undefined, cityCode: undefined, tehsilCode: undefined });
                } else {
                    setFilteredStateData(stateData?.filter((i) => i?.parentKey === filterValue));
                    advanceFilterForm.setFieldsValue({ stateCode: undefined, districtCode: undefined, cityCode: undefined, tehsilCode: undefined });
                }
            }

            if (name === 'stateCode') {
                if (typeof filterValue === 'undefined') {
                    advanceFilterForm.setFieldsValue({ districtCode: undefined, cityCode: undefined, tehsilCode: undefined });
                } else {
                    setFilteredDistrictData(districtData?.filter((i) => i?.parentKey === filterValue));
                    advanceFilterForm.setFieldsValue({ districtCode: undefined, cityCode: undefined, tehsilCode: undefined });
                }
            }
        };

    const onFinish = (values) => {
        let data = { ...values };
        const onSuccess = (res) => {
            form.resetFields();
            setShowDataLoading(true);

            showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
            fetchList({ setIsLoading: listShowLoading, userId });

            setButtonData({ ...buttonData, formBtnActive: false });
            if (buttonData?.saveAndNewBtnClicked) {
                setIsFormVisible(true);
                showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage, placement: 'bottomRight' });
            } else {
                setIsFormVisible(false);
                showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
            }
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
        form.validateFields().then((values) => {});
    };

    const onCloseAction = () => {
        form.resetFields();
        setIsFormVisible(false);
        setButtonData({ ...defaultBtnVisiblity });
    };

    const drawerTitle = useMemo(() => {
        if (formActionType?.viewMode) {
            return 'View ';
        } else if (formActionType?.editMode) {
            return 'Edit ';
        } else {
            return 'Add ';
        }
    }, [formActionType]);

    const formProps = {
        form,
        formData,
        formActionType,
        setFormActionType,
        onFinish,
        onFinishFailed,

        isVisible: isFormVisible,
        onCloseAction,
        titleOverride: drawerTitle.concat(moduleTitle),
        tableData: data,

        isDataCountryLoaded,
        isCountryLoading,
        countryData,
        defaultCountry,

        districtData,
        stateData,
        data,

        ADD_ACTION,
        EDIT_ACTION,
        VIEW_ACTION,
        buttonData,

        setButtonData,
        handleButtonClick,
    };
    const onAdvanceSearchCloseAction = () => {
        setAdvanceSearchVisible(false);
        advanceFilterForm.resetFields();
        //  setFilteredDistrictData([]);
    };

    const handleResetFilter = () => {
        setFilterString({ countryCode: defaultCountry });
        setFilteredStateData(stateData?.filter((i) => i?.parentKey === defaultCountry));
        advanceFilterForm.resetFields();
        setShowDataLoading(false);
        setFilteredDistrictData(undefined);
    };

    const advanceFilterProps = {
        isVisible: isAdvanceSearchVisible,
        onCloseAction: onAdvanceSearchCloseAction,
        icon: <FilterIcon size={20} />,
        titleOverride: 'Advance Filters',
        isDataCountryLoaded,
        isCountryLoading,
        countryData,
        defaultCountry,
        districtData,
        stateData,
        data,
        handleFilterChange,
        filteredStateData,
        filteredDistrictData,
        filterString,
        setFilterString,
        advanceFilterForm,
        resetData,
        handleResetFilter,
        isAdvanceSearchVisible,
        setAdvanceSearchVisible,
    };

    const tableProps = {
        tableColumn: tableColumn(handleButtonClick),
        tableData: searchData,
    };

    const title = 'City Name';
    const advanceFilterResultProps = {
        advanceFilter: true,
        filterString,
        from: listFilterForm,
        onFinish,
        onFinishFailed,
        extraParams,
        removeFilter,
        handleResetFilter,
        onSearchHandle,
        handleClearInSearch,
        setAdvanceSearchVisible,
        handleReferesh,
        handleButtonClick,
        advanceFilterProps,
        title,
        setFilteredDistrictData,
    };

    return (
        <>
            <AppliedAdvanceFilter {...advanceFilterResultProps} />
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <ListDataTable isLoading={showDataLoading} {...tableProps} handleAdd={() => handleButtonClick({ buttonAction: FROM_ACTION_TYPE?.ADD })} />
                </Col>
            </Row>

            <AdvancedSearch {...advanceFilterProps} />

            <AddEditForm {...formProps} />
        </>
    );
};

export const ListCityMaster = connect(mapStateToProps, mapDispatchToProps)(ListCityMasterBase);
