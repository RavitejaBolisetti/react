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
import { translateContent } from 'utils/translateContent';

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

    const selectProps = {
        optionFilterProp: 'children',
        showSearch: true,
        allowClear: true,
    };

    return (
        <Form autoComplete="off" layout="vertical" form={advanceFilterForm} onFinish={onFinish}>
            <Row gutter={16}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item label={translateContent('hoPriceMapping.label.state')} initialValue={filterString?.stateCode} name="stateCode" rules={[validateRequiredSelectField(translateContent('global.validation.state'))]}>
                        <Select placeholder={preparePlaceholderSelect(translateContent('hoPriceMapping.label.state'))} {...selectProps} onChange={handleFilterChange('stateCode')} loading={isStateLoading}>
                            {filteredStateData?.map((item) => (
                                <Option value={item?.key}>{item?.value}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item label={translateContent('hoPriceMapping.label.city')} initialValue={filterString?.cityCode} name="cityCode" rules={[validateRequiredSelectField(translateContent('global.validation.city'))]}>
                        <Select placeholder={preparePlaceholderSelect(translateContent('hoPriceMapping.label.city'))} {...selectProps} onChange={handleFilterChange('cityCode')}>
                            {filteredCityData?.map((item) => (
                                <Option value={item?.key}>{item?.value}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item initialValue={filterString?.modelCode} label={translateContent('hoPriceMapping.label.productHierarchy')} name="modelCode" rules={[validateRequiredSelectField(translateContent('global.validation.productHierarchy'))]}>
                        <Select placeholder={preparePlaceholderSelect(translateContent('hoPriceMapping.label.productHierarchy'))} {...selectProps} loading={isProductLoading}>
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
                    <Button onClick={handleResetFilter} danger data-testid="reset">
                        {translateContent('global.buttons.reset')}
                    </Button>
                </Col>

                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.alignRight} data-testid="apply">
                    <Button htmlType="submit" type="primary">
                        {translateContent('global.buttons.apply')}
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export const AdvancedSearch = withModal(AdvancedSearchFrom, {});
