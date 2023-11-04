/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Col, Form, Row, Select, Input } from 'antd';
import { validateRequiredSelectField, searchValidator } from 'utils/validation';
import { withModal } from 'components/withModal';
import { ModalButtons } from 'components/common/Button';
import { useTranslation } from 'react-i18next';
import styles from 'assets/sass/app.module.scss';
const { Option } = Select;

export const AdvancedSearchFrom = (props) => {
    const { isDataCountryLoaded, countryData, defaultCountry, handleFilterChange, filteredStateData, filteredDistrictData } = props;
    const { filterString, setFilterString, advanceFilterForm, handleResetFilter, setAdvanceSearchVisible } = props;
    const { t: translate } = useTranslation();

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
                    <Form.Item initialValue={defaultCountry} label={translate('city.label.country_code')} name="countryCode" rules={[validateRequiredSelectField(translate('city.validation.country'))]}>
                        {defaultCountry && (
                            <Select defaultValue={defaultCountry} showSearch loading={!isDataCountryLoaded} placeholder={translate('city.placeholder.select')} allowClear onChange={handleFilterChange('countryCode')}>
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
                    <Form.Item label={translate('city.label.state')} initialValue={filterString?.stateCode} name="stateCode">
                        <Select placeholder={translate('city.placeholder.select')} {...selectProps} onChange={handleFilterChange('stateCode')}>
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
                    <Form.Item label={translate('city.label.district')} initialValue={filterString?.districtCode} name="districtCode">
                        <Select placeholder={translate('city.placeholder.select')} {...selectProps} onChange={handleFilterChange('districtCode')}>
                            {filteredDistrictData?.map((item) => (
                                <Option key={item?.key} value={item?.key}>
                                    {item?.value}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>

                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item label={translate('city.label.city_name')} initialValue={filterString?.keyword} name="keyword" rules={[{ validator: searchValidator }]}>
                        <Input placeholder={translate('city.placeholder.search')} maxLength={50} allowClear />
                    </Form.Item>
                </Col>
            </Row>

            <ModalButtons {...modalProps} />
        </Form>
    );
};

export const AdvancedSearch = withModal(AdvancedSearchFrom, {});
