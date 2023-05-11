import React, { useEffect, useState } from 'react';
import { Col, Input, Form, Row, Select, Button, InputNumber, Switch, DatePicker } from 'antd';
import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { withDrawer } from 'components/withDrawer';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';

import styles from 'components/common/Common.module.css';

const { Option } = Select;

export const AdvancedSearch = (props) => {
    const { isDataCountryLoaded, isCountryLoading, countryData, defaultCountry, districtData, stateData, data, handleFilterChange, filteredStateData, filteredDistrictData, filteredCityData, filteredTehsilData, filterString } = props;

    const onFinish = (values) => {
        console.log('advance values', values);
    };

    const onFinishFailed = () => {
        return;
    };

    return (
        // <Form layout="vertical" searchForm={searchForm} onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish} onFinishFailed={onFinishFailed} {...viewProps}>
        <>
            <Row gutter={16}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item initialValue={'India'} label="Select Country" name="countryName">
                        {defaultCountry && (
                            <Select disabled={!!defaultCountry} defaultValue={defaultCountry} className={styles.headerSelectField} showSearch loading={!isDataCountryLoaded} placeholder="Select" allowClear>
                                {countryData?.map((item) => (
                                    <Option value={item?.countryCode}>{item?.countryName}</Option>
                                ))}
                            </Select>
                        )}
                    </Form.Item>
                </Col>

                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item label="Select State" initialValue={filterString?.state} rules={[validateRequiredInputField('State')]} name="stateCode">
                        <Select placeholder="State" allowClear className={styles.headerSelectField} onChange={handleFilterChange('state')}>
                            {filteredStateData?.map((item) => (
                                <Option value={item?.code}>{item?.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item label="Select District" initialValue={filterString?.district} name="districtName" rules={[validateRequiredSelectField('District')]}>
                        <Select placeholder="District" allowClear className={styles?.headerSelectField} onChange={handleFilterChange('district')}>
                            {filteredDistrictData?.map((item) => (
                                <Option value={item?.code}>{item?.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>

                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item label="Select City" initialValue={filterString?.city} name="cityName" rules={[validateRequiredSelectField('City')]}>
                        <Select placeholder="City" allowClear className={styles?.headerSelectField} onChange={handleFilterChange('city')}>
                            {filteredCityData?.map((item) => (
                                <Option value={item?.code}>{item?.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item label="Select Tehsil" initialValue={filterString?.tehsil} name="tehsilName" rules={[validateRequiredSelectField('Tehsil')]}>
                        <Select placeholder="Tehsil" allowClear className={styles?.headerSelectField} onChange={handleFilterChange('tehsil')}>
                            {filteredTehsilData?.map((item) => (
                                <Option value={item?.code}>{item?.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={20} className={styles.formFooter}>
                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.footerBtnRight}>
                    <Button htmlType="submit" type="primary">
                        Search
                    </Button>
                </Col>
            </Row>
        </>
    );
};

// export const AdvancedSearch = withDrawer(AdvanceSearchMain, { title: 'Advanced Search' });
