/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Col, Form, Row, Button, Select } from 'antd';

import { withModal } from 'components/withModal';
import { preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { validateRequiredSelectField } from 'utils/validation';

import styles from 'assets/sass/app.module.scss';

const { Option } = Select;

export const AdvancedSearchFrom = (props) => {
    const { setAdvanceSearchVisible, filteredStateData, filteredCityData, productHierarchyList, handleFilterChange, setFilteredCityData, isProductLoading, isStateLoading } = props;
    const {
        filterString,
        setFilterString,
        advanceFilterForm,
        advanceFilterForm: { resetFields },
        handleResetFilter,
    } = props;

    const onFinish = (values) => {
        setFilterString({
            ...filterString,
            ...values,
            stateCode: values?.stateCode,
            stateCodeName: filteredStateData?.find((i) => i?.key === values?.stateCode)?.value,
            cityCode: values?.cityCode,
            cityCodeName: filteredCityData?.find((i) => i?.key === values?.cityCode)?.value,
            modelCode: values?.modelCode,
            modelCodeName: productHierarchyList?.find((i) => i?.prodctCode === values?.modelCode)?.prodctShrtName,
            advanceFilter: true,
        });
        setAdvanceSearchVisible(false);
        resetFields();
        setFilteredCityData([]);
    };

    const onFinishFailed = () => {
        return;
    };

    const selectProps = {
        optionFilterProp: 'children',
        showSearch: true,
        allowClear: true,
    };

    return (
        <Form autoComplete="off" layout="vertical" form={advanceFilterForm} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={16}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item label="State" initialValue={filterString?.stateCode} name="stateCode" rules={[validateRequiredSelectField('state')]}>
                        <Select placeholder={preparePlaceholderSelect(`State`)} {...selectProps} onChange={handleFilterChange('stateCode')} loading={isStateLoading}>
                            {filteredStateData?.map((item) => (
                                <Option value={item?.key}>{item?.value}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item label="City" initialValue={filterString?.cityCode} name="cityCode" rules={[validateRequiredSelectField('city')]}>
                        <Select placeholder={preparePlaceholderSelect(`City`)} {...selectProps} onChange={handleFilterChange('cityCode')}>
                            {filteredCityData?.map((item) => (
                                <Option value={item?.key}>{item?.value}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item initialValue={filterString?.modelCode} label="Product Hierarchy" name="modelCode" rules={[validateRequiredSelectField('Product Hierarchy')]}>
                        <Select placeholder={preparePlaceholderSelect(`Product Hierarchy`)} {...selectProps} loading={isProductLoading}>
                            {productHierarchyList?.map((item) => (
                                <Option key={'ph' + item.prodctCode} value={item.prodctCode}>
                                    {item.prodctShrtName}
                                </Option>
                            ))}
                        </Select>
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
                        Apply
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export const AdvancedSearch = withModal(AdvancedSearchFrom, {});
