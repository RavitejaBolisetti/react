import React, { useEffect } from 'react';
import { Col, Form, Row, Select, Input, Button } from 'antd';
import { validateRequiredInputField, validateRequiredSelectField, validatePincodeField } from 'utils/validation';
import { withModal } from 'components/withModal';
import { searchValidator } from 'utils/validation';

import styles from 'components/common/Common.module.css';

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

    const onFinishFailed = () => {
        return;
    };

    const selectProps = {
        optionFilterProp: 'children',
        showSearch: true,
        allowClear: true,
        className: styles.headerSelectField,
    };
    return (
        <Form autoComplete="off" layout="vertical" form={advanceFilterForm} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={16}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item initialValue={defaultCountry} label="Country" name="countryCode">
                        {defaultCountry && (
                            <Select defaultValue={defaultCountry} className={styles.headerSelectField} showSearch loading={!isDataCountryLoaded} placeholder="Select" allowClear onChange={handleFilterChange('countryCode')}>
                                {countryData?.map((item) => (
                                    <Option value={item?.countryCode}>{item?.countryName}</Option>
                                ))}
                            </Select>
                        )}
                    </Form.Item>
                </Col>

                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item label="State" initialValue={filterString?.stateCode} rules={[validateRequiredInputField('State')]} name="stateCode">
                        <Select placeholder="Select" {...selectProps} onChange={handleFilterChange('stateCode')}>
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
                        <Select placeholder="Select" {...selectProps} onChange={handleFilterChange('districtCode')}>
                            {filteredDistrictData?.map((item) => (
                                <Option value={item?.code}>{item?.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>

                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item label="City" initialValue={filterString?.cityCode} name="cityCode">
                        <Select placeholder="Select" {...selectProps} onChange={handleFilterChange('cityCode')}>
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
                        <Select placeholder="Select" {...selectProps} onChange={handleFilterChange('tehsilCode')}>
                            {filteredTehsilData?.map((item) => (
                                <Option value={item?.code}>{item?.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>

                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item label="PIN Code" initialValue={filterString?.pincode} name="pincode">
                        <Input placeholder="Search" maxLength={6} allowClear />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={20}>
                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.alignLeft}>
                    <Button onClick={handleResetFilter} danger>
                        Reset
                    </Button>
                </Col>

                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.alignRight}>
                    <Button htmlType="submit" type="primary">
                        Search
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export const AdvancedSearch = withModal(AdvancedSearchFrom, {});
