/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Col, Form, Row, Select, DatePicker } from 'antd';
import { validateRequiredSelectField } from 'utils/validation';

import { showGlobalNotification } from 'store/actions/notification';
import { geoStateDataActions } from 'store/actions/data/geo/states';
import { geoDistrictDataActions } from 'store/actions/data/geo/districts';
import { geoCountryDataActions } from 'store/actions/data/geo/countries';
import { geoCityDataActions } from 'store/actions/data/geo/cities';
import { tncProductHierarchyDataActions } from 'store/actions/data/termsConditions/tncProductHierarchy';

import { dateFormat, formatDate, formatDateToCalenderDate } from 'utils/formatDateTime';
import { preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { disableFutureDate } from 'utils/disableDate';
import { withModal } from 'components/withModal';
import { ModalButtons } from 'components/common/Button';

import styles from 'assets/sass/app.module.scss';
//import styles from 'components/common/Common.module.css';

const { Option } = Select;

const mapStateToProps = (state) => {
    const {
        auth: { userId, accessToken, token },
        data: {
            VehiclePriceMaster: { isLoaded: isVehiclePriceDataLoaded = false, isLoading: isVehiclePriceLoading, data: vehiclePriceData = [], filter: filterString },
            Geo: {
                Country: { isLoaded: isDataCountryLoaded = false, isLoading: isCountryLoading = false, data: countryData },
                State: { isFilteredListLoaded: isStateDataLoaded = false, isLoading: isStateLoading, filteredListData: stateData },
                District: { isFilteredListLoaded: isDistrictDataLoaded = false, isLoading: isDistrictLoading, filteredListData: districtData },
                Tehsil: { isFilteredListLoaded: isTehsilDataLoaded = false, isLoading: isTehsilLoading, filteredListData: tehsilData },
                City: { isFilteredListLoaded: isCityDataLoaded = false, isLoading: isCityLoading, filteredListData: cityData },
            },
            TermCondition: {
                ProductHierarchyData: { isLoaded: isProductHierarchyDataLoaded = false, data: productHierarchyList, isProductHierarchyLoading },
            },
        },
    } = state;

    const moduleTitle = 'Vehicle Price Master';
    const finalCountryData = countryData?.map((item, index) => {
        return { ...item, default: index <= 0 || false };
    });
    const defaultCountry = finalCountryData && finalCountryData?.find((i) => i.default)?.countryCode;

    let returnValue = {
        userId,
        accessToken,
        token,
        moduleTitle,
        isCountryLoading,
        countryData: finalCountryData,
        isDataCountryLoaded,
        defaultCountry,
        isStateDataLoaded,
        isStateLoading,
        stateData,
        isCityDataLoaded,
        isCityLoading,
        cityData,
        isTehsilDataLoaded,
        isTehsilLoading,
        tehsilData,
        isDistrictDataLoaded,
        districtData,
        isProductHierarchyDataLoaded,
        productHierarchyList,
        isProductHierarchyLoading,
        isDistrictLoading,
        filteredStateData: stateData,
        filterString,
        isVehiclePriceLoading,
        isVehiclePriceDataLoaded,
        vehiclePriceData: vehiclePriceData?.vehicleSearch,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchStateLovList: geoStateDataActions.fetchFilteredList,
            listStateShowLoading: geoStateDataActions.listShowLoading,
            fetchDistrictLovList: geoDistrictDataActions.fetchFilteredList,
            listDistrictShowLoading: geoDistrictDataActions.listShowLoading,
            fetchCityLovList: geoCityDataActions.fetchFilteredList,
            listCityShowLoading: geoCityDataActions.listShowLoading,
            countryShowLoading: geoCountryDataActions.listShowLoading,
            fetchCountryList: geoCountryDataActions.fetchList,

            fetchProductLovList: tncProductHierarchyDataActions.fetchList,
            listProductShowLoading: tncProductHierarchyDataActions.listShowLoading,

            showGlobalNotification,
        },
        dispatch
    ),
});
export const AdvancedSearchFrom = (props) => {
    const { productHierarchyList, filteredStateData, filteredCityData, handleFilterChange } = props;
    const { filterString, setFilterString, advanceFilterForm, handleResetFilter, setAdvanceSearchVisible } = props;
    const { userId, isProductHierarchyDataLoaded, listProductShowLoading, fetchProductLovList, isDataCountryLoaded, fetchCountryList, countryShowLoading, isStateDataLoaded, listStateShowLoading, fetchStateLovList, isDistrictDataLoaded, isDistrictLoading, listDistrictShowLoading, fetchDistrictLovList, isCityDataLoaded, isCityLoading, listCityShowLoading, fetchCityLovList } = props;

    useEffect(() => {
        advanceFilterForm.resetFields();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString]);

    useEffect(() => {
        if (!isProductHierarchyDataLoaded) {
            fetchProductLovList({ setIsLoading: listProductShowLoading, userId });
        }
        if (!isDataCountryLoaded) {
            fetchCountryList({ setIsLoading: countryShowLoading, userId });
        }
        if (!isStateDataLoaded) {
            fetchStateLovList({ setIsLoading: listStateShowLoading, userId });
        }
        if (!isDistrictDataLoaded && !isDistrictLoading) {
            fetchDistrictLovList({ setIsLoading: listDistrictShowLoading, userId });
        }
        if (!isCityDataLoaded && !isCityLoading) {
            fetchCityLovList({ setIsLoading: listCityShowLoading, userId });
        }
        //  eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, isDataCountryLoaded, isStateDataLoaded, isProductHierarchyDataLoaded]);

    const onFinish = (values) => {
        setFilterString({
            ...filterString,
            ...values,
            priceAsOnDate: formatDate(values?.priceAsOnDate),
            advanceFilter: true,
        });
        setAdvanceSearchVisible(false);
    };

    const onFinishFailed = () => {
        return;
    };
    const selectProps = {
        optionFilterProp: 'children',
        showSearch: true,
        allowClear: true,
        // className: styles.headerSelectField,
    };
    const modalProps = {
        reset: true,
        submit: true,
        resetName: 'Reset',
        submitName: 'Search',
        handleResetFilter,
    };
    return (
        <Form autoComplete="off" layout="vertical" form={advanceFilterForm} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={16}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item label="Model" name="modelCode" rules={[validateRequiredSelectField('model')]}>
                        <Select showSearch placeholder="Select" allowClear>
                            {productHierarchyList?.map((item) => (
                                <Option key={'ph' + item.prodctCode} value={item.prodctCode}>
                                    {item.prodctShrtName}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>

                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item label="State" initialValue={filterString?.stateCode} name="stateCode" rules={[validateRequiredSelectField('state')]}>
                        <Select placeholder="Select" {...selectProps} onChange={handleFilterChange('stateCode')}>
                            {filteredStateData?.map((item) => (
                                <Option value={item?.key}>{item?.value}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item label="City" initialValue={filterString?.cityCode} name="cityCode">
                        <Select placeholder="Select" {...selectProps} onChange={handleFilterChange('cityCode')}>
                            {filteredCityData?.map((item) => (
                                <Option value={item?.key}>{item?.value}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item initialValue={formatDateToCalenderDate(filterString?.priceAsOnDate)} label="Price As On Date" name="priceAsOnDate" rules={[validateRequiredSelectField('Price As On Date')]} className={styles?.datePicker}>
                        <DatePicker placeholder={preparePlaceholderSelect('')} format={dateFormat} className={styles.fullWidth} disabledDate={disableFutureDate} />
                    </Form.Item>
                </Col>
            </Row>

            <ModalButtons {...modalProps} />
        </Form>
    );
};

export const AdvancedSearch = withModal(connect(mapStateToProps, mapDispatchToProps)(AdvancedSearchFrom), {});
