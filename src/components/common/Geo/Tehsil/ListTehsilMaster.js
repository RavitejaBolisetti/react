/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { Form, Row, Col } from 'antd';

import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { filterFunction } from 'utils/filterFunction';
import { btnVisiblity } from 'utils/btnVisiblity';

import { tableColumn } from './tableColumn';

import { geoCountryDataActions } from 'store/actions/data/geo/countries';
import { geoStateDataActions } from 'store/actions/data/geo/states';
import { geoDistrictDataActions } from 'store/actions/data/geo/districts';
import { tehsilDataActions } from 'store/actions/data/geo/tehsils';

import { formatDate } from 'utils/formatDateTime';

import { showGlobalNotification } from 'store/actions/notification';
import { AddEditForm } from './AddEditForm';
import { bindActionCreators } from 'redux';
import { ListDataTable } from 'utils/ListDataTable';
import { AdvancedSearch } from './AdvancedSearch';
import { AppliedAdvanceFilter } from 'utils/AppliedAdvanceFilter';
import { PARAM_MASTER } from 'constants/paramMaster';
import { translateContent } from 'utils/translateContent';
import { drawerTitle } from 'utils/drawerTitle';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            Geo: {
                Country: { isLoaded: isDataCountryLoaded = false, isLoading: isCountryLoading = false, data: countryData = [] },
                State: { isFilteredListLoaded: isStateDataLoaded = false, isLoading: isStateLoading, filteredListData: stateData },
                District: { isFilteredListLoaded: isDistrictDataLoaded = false, isLoading: isDistrictLoading, filteredListData: districtData },
                Tehsil: { isLoaded: isDataLoaded = false, isLoading, data = [] },
            },
            ConfigurableParameterEditing: { filteredListData: tehsilCategoryData = [] },
        },
    } = state;

    const moduleTitle = translateContent('tehsil.heading.pageTitle');
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
        isLoading,
        isDistrictLoading,
        isStateLoading,
        isDistrictDataLoaded,
        districtData,
        tehsilCategoryData: tehsilCategoryData && tehsilCategoryData[PARAM_MASTER.GEO_TEH_CAT.id],
        stateData,
        data,
        isDataLoaded,
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
            fetchList: tehsilDataActions.fetchList,
            saveData: tehsilDataActions.saveData,
            listShowLoading: tehsilDataActions.listShowLoading,
            resetData: tehsilDataActions.reset,
            showGlobalNotification,
        },
        dispatch
    ),
});

export const ListTehsilBase = (props) => {
    const { data, saveData, fetchList, userId, resetData, isDataLoaded, listShowLoading, showGlobalNotification, moduleTitle } = props;
    const { isDataCountryLoaded, isCountryLoading, countryData, defaultCountry, fetchCountryList, listCountryShowLoading } = props;
    const { isTehsilCategoryDataLoaded, isTehsilCategoryDataLoading, tehsilCategoryData } = props;

    const { isStateDataLoaded, stateData, listStateShowLoading, fetchStateLovList } = props;
    const { isDistrictDataLoaded, districtData, listDistrictShowLoading, fetchDistrictLovList } = props;

    const [form] = Form.useForm();
    const [listFilterForm] = Form.useForm();
    const [advanceFilterForm] = Form.useForm();

    const [showDataLoading, setShowDataLoading] = useState(true);
    const [filteredStateData, setFilteredStateData] = useState([]);
    const [filteredDistrictData, setFilteredDistrictData] = useState([]);
    const [isAdvanceSearchVisible, setAdvanceSearchVisible] = useState(false);
    const [filterString, setFilterString] = useState();

    const [searchData, setSearchdata] = useState('');
    const [refershData, setRefershData] = useState(false);

    const [formData, setFormData] = useState([]);
    const [isFormVisible, setIsFormVisible] = useState(false);

    const defaultBtnVisiblity = { editBtn: false, saveBtn: false, saveAndNewBtn: false, saveAndNewBtnClicked: false, closeBtn: false, cancelBtn: false, formBtnActive: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });

    const defaultFormActionType = { addMode: false, editMode: false, viewMode: false };
    const [formActionType, setFormActionType] = useState({ ...defaultFormActionType });

    const ADD_ACTION = FROM_ACTION_TYPE?.ADD;
    const EDIT_ACTION = FROM_ACTION_TYPE?.EDIT;
    const VIEW_ACTION = FROM_ACTION_TYPE?.VIEW;
    const VIEW_ONLY_ACTION = FROM_ACTION_TYPE?.VIEW_ONLY;

    const onSuccessAction = (res) => {
        refershData && showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: res?.responseMessage });
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
        if (userId && refershData && extraParams) {
            fetchList({ setIsLoading: listShowLoading, userId, extraParams, onSuccessAction });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, refershData]);

    useEffect(() => {
        setFilterString({ countryCode: defaultCountry });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [defaultCountry]);

    useEffect(() => {
        if (isDataCountryLoaded && defaultCountry && isStateDataLoaded) {
            setFilterString({ countryCode: defaultCountry });
            defaultCountry ? setFilteredStateData(stateData?.filter((i) => i?.parentKey === defaultCountry)) : setFilteredStateData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDataCountryLoaded, isStateDataLoaded]);

    const extraParams = [
        {
            key: 'countryCode',
            title: 'Country',
            value: filterString?.countryCode,
            name: countryData?.find((i) => i?.countryCode === filterString?.countryCode)?.countryName,
            canRemove: true,
        },
        {
            key: 'stateCode',
            title: 'State',
            value: filterString?.stateCode,
            name: filteredStateData?.find((i) => i?.key === filterString?.stateCode)?.value,
            canRemove: true,
        },
        {
            key: 'districtCode',
            title: 'District',
            value: filterString?.districtCode,
            name: filteredDistrictData?.find((i) => i?.key === filterString?.districtCode)?.value,
            canRemove: true,
        },
        {
            key: 'keyword',
            title: 'tehsil',
            value: filterString?.keyword,
            name: filterString?.keyword,
            canRemove: true,
        },
    ];

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

    const handleReferesh = () => {
        setShowDataLoading(true);
        setRefershData(!refershData);
    };

    const handleButtonClick = ({ record = null, buttonAction }) => {
        form.resetFields();
        setFormData([]);

        setFormActionType({ addMode: buttonAction === ADD_ACTION, editMode: buttonAction === EDIT_ACTION, viewMode: buttonAction === VIEW_ACTION });
        setButtonData(btnVisiblity({ defaultBtnVisiblity, buttonAction: buttonAction === VIEW_ACTION ? VIEW_ONLY_ACTION : buttonAction }));

        const tehsilCategory = tehsilCategoryData?.find((category) => category.key === record?.tehsilCategoryCode)?.value;
        record && setFormData({ ...record, tehsilCategory });
        setIsFormVisible(true);
    };

    const handleFilterChange =
        (name, type = 'value') =>
        (value) => {
            const filterValue = type === 'text' ? value.target.value : value;
            if (!value) {
                switch (name) {
                    case 'countryCode': {
                        setFilteredStateData();
                        setFilteredDistrictData();
                        advanceFilterForm.setFieldsValue({ stateCode: undefined });
                        advanceFilterForm.setFieldsValue({ districtCode: undefined });
                        break;
                    }
                    case 'stateCode': {
                        setFilteredDistrictData();
                        advanceFilterForm.setFieldsValue({ districtCode: undefined });
                        break;
                    }
                    default: {
                        break;
                    }
                }
                return;
            }

            if (name === 'countryCode') {
                setFilteredStateData(stateData?.filter((i) => i?.parentKey === filterValue));
                advanceFilterForm.setFieldsValue({ stateCode: undefined });
                advanceFilterForm.setFieldsValue({ districtCode: undefined });
                advanceFilterForm.setFieldsValue({ tehsilCode: undefined });
            }

            if (name === 'stateCode') {
                setFilteredDistrictData(districtData?.filter((i) => i?.parentKey === filterValue));
                advanceFilterForm.setFieldsValue({ districtCode: undefined });
                advanceFilterForm.setFieldsValue({ tehsilCode: undefined });
            }
        };

    const onFinish = (values) => {
        let data = { ...values, includedOn: formatDate(values?.includedOn) };

        const onSuccess = (res) => {
            form.resetFields();
            setShowDataLoading(true);

            showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
            fetchList({ setIsLoading: listShowLoading, userId, onSuccessAction });

            setButtonData({ ...buttonData, formBtnActive: false });
            if (buttonData?.saveAndNewBtnClicked) {
                setIsFormVisible(true);
                showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: res?.responseMessage, placement: 'bottomRight' });
            } else {
                setIsFormVisible(false);
                showGlobalNotification({ notificationType: 'success', title: translateContent('global.notificationSuccess.success'), message: res?.responseMessage });
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
        form.validateFields()
            .then((values) => {})
            .catch((err) => console.error(err));
    };

    const onCloseAction = () => {
        form.resetFields();
        setIsFormVisible(false);
        setButtonData({ ...defaultBtnVisiblity });
    };

    const formProps = {
        form,
        formData,
        formActionType,
        setFormActionType,
        onFinish,
        onFinishFailed,

        isVisible: isFormVisible,
        onCloseAction,
        titleOverride: drawerTitle(formActionType).concat(moduleTitle),
        tableData: searchData,

        isDataCountryLoaded,
        isCountryLoading,
        countryData,
        defaultCountry,

        districtData,
        stateData,
        data,

        isTehsilCategoryDataLoading,
        isTehsilCategoryDataLoaded,
        tehsilCategoryData,

        ADD_ACTION,
        EDIT_ACTION,
        VIEW_ACTION,

        buttonData,
        setButtonData,
        handleButtonClick,
    };

    const showAddButton = false;
    const tableProps = {
        tableColumn: tableColumn(handleButtonClick),
        tableData: searchData,
        showAddButton,
    };

    const onAdvanceSearchCloseAction = () => {
        setAdvanceSearchVisible(false);
        advanceFilterForm.resetFields();
        // setFilteredDistrictData([]);
        filterString?.countryCode && setFilteredStateData(stateData?.filter((i) => i?.parentKey === filterString?.countryCode));
        filterString?.stateCode && setFilteredDistrictData(districtData?.filter((i) => i?.parentKey === filterString?.stateCode));
    };

    const handleResetFilter = () => {
        setFilterString();
        advanceFilterForm.resetFields();
        setShowDataLoading(false);
        setFilteredStateData(stateData?.filter((i) => i?.parentKey === defaultCountry));
        setFilteredDistrictData(undefined);
    };

    const advanceFilterProps = {
        isVisible: isAdvanceSearchVisible,
        onCloseAction: onAdvanceSearchCloseAction,
        // icon: <FilterIcon size={20} />,
        titleOverride: translateContent('global.advanceFilter.title'),
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

    const removeFilter = (key) => {
        if (key === 'countryCode') {
            setFilterString(undefined);
        } else if (key === 'stateCode') {
            const { stateCode, districtCode, ...rest } = filterString;
            setFilterString({ ...rest });
        } else if (key === 'districtCode') {
            const { districtCode, ...rest } = filterString;
            setFilterString({ ...rest });
        } else {
            const { [key]: names, ...rest } = filterString;
            advanceFilterForm.setFieldsValue({ keyword: undefined, code: undefined });

            if (!rest?.stateCode && !rest?.districtCode && !rest?.keyword) {
                setFilterString();
            } else {
                setFilterString({ ...rest });
            }
        }
    };

    const title = translateContent('tehsil.heading.title');
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
        tableData: searchData,
        showAddButton,
    };
    return (
        <>
            <AppliedAdvanceFilter {...advanceFilterResultProps} />
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <ListDataTable isLoading={showDataLoading} {...tableProps} handleAdd={() => handleButtonClick({ buttonAction: FROM_ACTION_TYPE?.ADD })} />
                </Col>
            </Row>
            <AdvancedSearch {...advanceFilterProps} />
            <AddEditForm {...formProps} />
        </>
    );
};

export const ListTehsilMaster = connect(mapStateToProps, mapDispatchToProps)(ListTehsilBase);
