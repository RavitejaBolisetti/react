/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Col, Form, Row, Select, Input } from 'antd';
import { validateRequiredInputField, validateRequiredSelectField, searchValidatorPincode } from 'utils/validation';
import { withModal } from 'components/withModal';
import { ModalButtons } from 'components/common/Button';
import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

const { Option } = Select;

export const AdvancedSearchFrom = (props) => {
    const { isDataCountryLoaded, setAdvanceSearchVisible, countryData, defaultCountry, handleFilterChange, filteredStateData, filteredDistrictData, filteredCityData, filteredTehsilData } = props;
    const { filterString, setFilterString, advanceFilterForm, handleResetFilter } = props;

    useEffect(() => {
        advanceFilterForm.resetFields();
        advanceFilterForm.setFieldsValue({ pincode: filterString?.pincode });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString]);

    const onFinish = (values) => {
        setFilterString({ ...values, advanceFilter: true });
        handleFilterChange(false);
        setAdvanceSearchVisible(false);
    };

    const selectProps = {
        optionFilterProp: 'children',
        showSearch: true,
        allowClear: true,
        className: styles.headerSelectField,
    };

    const modalProps = {
        reset: true,
        submit: true,
        resetName: 'Reset',
        submitName: 'Search',
        handleResetFilter,
    };

    return (
        <Form autoComplete="off" layout="vertical" form={advanceFilterForm} onFinish={onFinish}>
            <Row gutter={16}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item initialValue={defaultCountry} label={translateContent('pincode.label.country')} name="countryCode" rules={[validateRequiredInputField(translateContent('pincode.validation.country'))]}>
                        {defaultCountry && (
                            <Select defaultValue={defaultCountry} showSearch loading={!isDataCountryLoaded} placeholder={translateContent('global.placeholder.select')} allowClear onChange={handleFilterChange('countryCode')}>
                                {countryData?.map((item) => (
                                    <Option key={item?.countryCode} value={item?.countryCode}>
                                        {item?.countryName}
                                    </Option>
                                ))}
                            </Select>
                        )}
                    </Form.Item>
                </Col>

                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item label={translateContent('pincode.label.state')}initialValue={filterString?.stateCode} rules={[validateRequiredInputField(translateContent('pincode.validation.state'))]} name="stateCode">
                        <Select placeholder={translateContent('global.placeholder.select')} {...selectProps} onChange={handleFilterChange('stateCode')}>
                            {filteredStateData?.map((item) => (
                                <Option key={item?.key} value={item?.key}>
                                    {item?.value}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item label={translateContent('pincode.label.district')} initialValue={filterString?.districtCode} name="districtCode" rules={[validateRequiredSelectField(translateContent('pincode.validation.district'))]}>
                        <Select placeholder={translateContent('global.placeholder.select')} {...selectProps} onChange={handleFilterChange('districtCode')}>
                            {filteredDistrictData?.map((item) => (
                                <Option key={item?.key} value={item?.key}>
                                    {item?.value}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>

                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item label={translateContent('pincode.label.city')} initialValue={filterString?.cityCode} name="cityCode">
                        <Select placeholder={translateContent('global.placeholder.select')} {...selectProps} onChange={handleFilterChange('cityCode')}>
                            {filteredCityData?.map((item) => (
                                <Option key={item?.code} value={item?.code}>
                                    {item?.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item label={translateContent('pincode.label.Tehsil')} initialValue={filterString?.tehsilCode} name="tehsilCode">
                        <Select placeholder={translateContent('global.placeholder.select')} {...selectProps} onChange={handleFilterChange('tehsilCode')}>
                            {filteredTehsilData?.map((item) => (
                                <Option key={item?.key} value={item?.key}>
                                    {item?.value}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>

                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item
                        label={translateContent('pincode.label.pinCode')}
                        initialValue={filterString?.pincode}
                        rules={[
                            {
                                validator: searchValidatorPincode,
                            },
                        ]}
                        name="pincode"
                    >
                        <Input placeholder={translateContent('global.placeholder.search')} maxLength={6} allowClear />
                    </Form.Item>
                </Col>
            </Row>

            <ModalButtons {...modalProps} />
        </Form>
    );
};

export const AdvancedSearch = withModal(AdvancedSearchFrom, {});
