/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Col, Form, Row, Select } from 'antd';
import { validateRequiredSelectField } from 'utils/validation';
import { showGlobalNotification } from 'store/actions/notification';
import { geoCityDataActions } from 'store/actions/data/geo/cities';
import { tncProductHierarchyDataActions } from 'store/actions/data/termsConditions/tncProductHierarchy';
import { onRoadPriceMasterAction } from 'store/actions/data/vehicle/onRoadPriceMasterAction';
import { withModal } from 'components/withModal';
import { ModalButtons } from 'components/common/Button';
import { ONROAD_PRICE_EX_SHOWROOM_STATUS } from 'constants/OnRoadPriceExShowroomStatus';

const { Option } = Select;

const mapStateToProps = (state) => {
    const {
        auth: { userId, accessToken, token },
        data: {
            Vehicle: {
                OnRoadPriceMasterDetails: { isLoaded: isVehiclePriceDataLoaded = false, isLoading: isVehiclePriceLoading, data: vehiclePriceData = [], filter: filterString },
            },
            Geo: {
                City: { isFilteredListLoaded: isCityDataLoaded = false, isLoading: isCityLoading, filteredListData: cityData },
            },
        },
    } = state;

    const moduleTitle = 'OnRoad Price Master';
    let returnValue = {
        userId,
        accessToken,
        token,
        moduleTitle,
        isCityDataLoaded,
        isCityLoading,
        cityData,
        filterString,
        isVehiclePriceLoading,
        isVehiclePriceDataLoaded,
        vehiclePriceData: vehiclePriceData?.paginationData,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchCityLovList: geoCityDataActions.fetchFilteredList,
            listCityShowLoading: geoCityDataActions.listShowLoading,

            fetchProductLovList: tncProductHierarchyDataActions.fetchList,
            listProductShowLoading: tncProductHierarchyDataActions.listShowLoading,

            fetchOnRoadPriceList: onRoadPriceMasterAction.fetchList,
            listVehiclePriceShowLoading: onRoadPriceMasterAction.listShowLoading,
            setFilterString: onRoadPriceMasterAction.setFilter,
            showGlobalNotification,
        },
        dispatch
    ),
});
export const AdvancedSearchFrom = (props) => {
    const { typeData, cityData } = props;
    const { filterString, setFilterString, advanceFilterForm, handleResetFilter, setAdvanceSearchVisible } = props;
    const { userId, isProductHierarchyDataLoaded, listProductShowLoading, fetchProductLovList, isCityDataLoaded, isCityLoading, listCityShowLoading, fetchCityLovList } = props;

    useEffect(() => {
        advanceFilterForm.resetFields();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString]);

    useEffect(() => {
        if (!isProductHierarchyDataLoaded) {
            fetchProductLovList({ setIsLoading: listProductShowLoading, userId });
        }
        if (!isCityDataLoaded && !isCityLoading) {
            fetchCityLovList({ setIsLoading: listCityShowLoading, userId });
        }
        //  eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, isProductHierarchyDataLoaded]);

    const onFinish = (values) => {
        setFilterString({
            ...filterString,
            ...values,
            advanceFilter: true,
        });
        setAdvanceSearchVisible(false);
    };

    const selectProps = {
        optionFilterProp: 'children',
        showSearch: true,
        allowClear: true,
    };
    const modalProps = {
        reset: true,
        submit: true,
        resetName: 'Reset',
        submitName: 'Search',
        handleResetFilter,
        htmltype: true,
    };
    return (
        <Form autoComplete="off" layout="vertical" form={advanceFilterForm} onFinish={onFinish}>
            <Row gutter={16}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item label="Pricing Type" initialValue={filterString?.priceType} name="priceType" rules={[validateRequiredSelectField('Pricing Type')]}>
                        <Select placeholder="Select" {...selectProps}>
                            {typeData['PRC_TYP']?.map((item) => (
                                <Option value={item?.key}>{item?.value}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>

                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item label="Change in EX showroom org" initialValue={filterString?.changeInExShowroomOrg || ONROAD_PRICE_EX_SHOWROOM_STATUS.EXSHROOM.key} name="changeInExShowroomOrg">
                        <Select placeholder="Select" {...selectProps}>
                            {typeData['CHNG_EX_ORG']?.map((item) => (
                                <Option value={item?.key}>{item?.value}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item label="Pricing City" initialValue={filterString?.pricingCity} name="pricingCity">
                        <Select placeholder="Select" {...selectProps}>
                            {cityData?.map((item) => (
                                <Option value={item?.code}>{item?.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item label="Status" initialValue={filterString?.status} name="status">
                        <Select placeholder="Select" {...selectProps}>
                            {typeData['ON_ROAD_STATUS']?.map((item) => (
                                <Option value={item?.key}>{item?.value}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>

            <ModalButtons {...modalProps} />
        </Form>
    );
};

export const AdvancedSearch = withModal(connect(mapStateToProps, mapDispatchToProps)(AdvancedSearchFrom), {});
