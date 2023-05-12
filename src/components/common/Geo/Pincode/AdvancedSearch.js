import React, { useState } from 'react';
import { Col, Form, Row, Select, Input, Button } from 'antd';
import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import { withModal } from 'components/withModal';

import styles from 'components/common/Common.module.css';

const { Option } = Select;
const { Search } = Input;

export const AdvancedSearchFrom = (props) => {
    const { isDataCountryLoaded, countryData, defaultCountry, handleFilterChange, filteredStateData, filteredDistrictData, filteredCityData, filteredTehsilData } = props;
    const { filterString, setFilterString } = props;

    const [formFieldActive, handleFormFieldChange] = useState(true);

    const [form] = Form.useForm();

    const onFinish = (values) => {
        setFilterString({ ...values, advanceFilter: true });
    };

    const onFinishFailed = () => {
        return;
    };

    return (
        <Form layout="vertical" form={form} onValuesChange={() => handleFormFieldChange(true)} onFieldsChange={() => handleFormFieldChange(true)} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={16}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item initialValue={defaultCountry} label="Country" name="countryCode">
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
                    <Form.Item label="State" initialValue={filterString?.stateCode} rules={[validateRequiredInputField('State')]} name="stateCode">
                        <Select placeholder="Select" allowClear className={styles.headerSelectField} onChange={handleFilterChange('stateCode')}>
                            {filteredStateData?.map((item) => (
                                <Option value={item?.code}>{item?.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item label="District" initialValue={filterString?.districtCode} name="districtCode" rules={[validateRequiredSelectField('District')]}>
                        <Select placeholder="Select" allowClear className={styles?.headerSelectField} onChange={handleFilterChange('districtCode')}>
                            {filteredDistrictData?.map((item) => (
                                <Option value={item?.code}>{item?.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>

                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item label="City" initialValue={filterString?.cityCode} name="cityCode" rules={[validateRequiredSelectField('City')]}>
                        <Select placeholder="Select" allowClear className={styles?.headerSelectField} onChange={handleFilterChange('cityCode')}>
                            {filteredCityData?.map((item) => (
                                <Option value={item?.code}>{item?.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item label="Tehsil" initialValue={filterString?.tehsilCode} name="tehsilCode" rules={[validateRequiredSelectField('Tehsil')]}>
                        <Select placeholder="Select" allowClear className={styles?.headerSelectField} onChange={handleFilterChange('tehsilCode')}>
                            {filteredTehsilData?.map((item) => (
                                <Option value={item?.code}>{item?.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>

                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item label="PIN Code" initialValue={filterString?.code} name="pinCode" rules={[validateRequiredSelectField('Pincode')]}>
                        <Input placeholder="Search" allowClear onChange={handleFilterChange('code', 'text')} />
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
