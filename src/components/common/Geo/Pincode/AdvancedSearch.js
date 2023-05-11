import React, { useState } from 'react';
import { Col, Form, Row, Select, Input, Button } from 'antd';
import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import { withModal } from 'components/withModal';

import styles from 'components/common/Common.module.css';

const { Option } = Select;
const { Search } = Input;

export const AdvancedSearchFrom = (props) => {
    const { isDataCountryLoaded, countryData, defaultCountry, handleFilterChange, filteredStateData, filteredDistrictData, filteredCityData, filteredTehsilData, filterString } = props;
    console.log('🚀 ~ file: AdvancedSearch.js:14 ~ AdvancedSearchFrom ~ filterString:', filterString);

    const [formFieldActive, handleFormFieldChange] = useState(true);

    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log('advance values', values);
    };

    const onFinishFailed = () => {
        return;
    };

    return (
        <Form layout="vertical" form={form} onValuesChange={() => handleFormFieldChange(true)} onFieldsChange={() => handleFormFieldChange(true)} onFinish={onFinish} onFinishFailed={onFinishFailed}>
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

                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item label="PIN Code" initialValue={filterString?.pincode} name="pincode" rules={[validateRequiredSelectField('pincode')]}>
                        <Input placeholder="Search" allowClear onChange={handleFilterChange('pincode', 'text')} />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={20}>
                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.alignLeft}>
                    <Button danger>Reset</Button>
                </Col>
                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.alignRight}>
                    <Button disabled={!formFieldActive} htmlType="submit" type="primary">
                        Search
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export const AdvancedSearch = withModal(AdvancedSearchFrom, {});
