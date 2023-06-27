/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Row, Col, Input, Form, Select, Card } from 'antd';

import styles from 'components/common/Common.module.css';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';

import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';

const { Search } = Input;

const AddEditFormMain = (props) => {
    const { formData, form, isCustomerLoading, onSearch } = props;
    const { financeLovData, schemeLovData, typeData, makeData, modelData, variantData } = props;
    const { isConfigLoading, isSchemeLovLoading, isFinanceLovLoading, isMakeLoading, isModelLoading, isVariantLoading } = props;

    useEffect(() => {
        if (formData) {
            form.setFieldsValue({
                ...formData,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);

    const handleRelationshipChange = (value) => {
        form.setFieldsValue({
            ...form.getFieldsValue(),
            relationshipCode: value,
        });
    };
    const handleMonthofRegChange = (value) => {
        form.setFieldsValue({
            ...form.getFieldsValue(),
            monthOfRegistrationCode: value,
        });
    };
    const handleYearOfRegChange = (value) => {
        form.setFieldsValue({
            ...form.getFieldsValue(),
            yearOfRegistrationCode: value,
        });
    };
    const handleUsageChange = (value) => {
        form.setFieldsValue({
            ...form.getFieldsValue(),
            usageCode: value,
        });
    };
    const handleSchemeChange = (value) => {
        form.setFieldsValue({
            ...form.getFieldsValue(),
            schemeCode: value,
        });
    };
    const handleHypotheticatedChange = (value) => {
        form.setFieldsValue({
            ...form.getFieldsValue(),
            hypothicatedToCode: value,
        });
    };

    const currentYear = new Date().getFullYear();
    const yearsList = [];
    for (let i = currentYear; i >= currentYear - 15; i--) {
        yearsList.push({ key: i, value: i });
    }

    return (
        <Card className={styles.ExchangeCard}>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="customerId" label="Customer ID" initialValue={formData?.customerId} rules={[validateRequiredInputField('customer id')]}>
                        <Search loading={isCustomerLoading} placeholder={preparePlaceholderText('customer id')} style={{ width: '100%' }} maxLength={35} allowClear type="text" onSearch={onSearch} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="customerName" label="Customer Name" initialValue={formData?.customerName}>
                        <Input disabled={true} placeholder={preparePlaceholderText('customer name')} maxLength={50} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.make} label="Make" name="make" data-testid="make">
                        <Select placeholder="Select" loading={isMakeLoading} allowClear fieldNames={{ label: 'value', value: 'key' }} options={makeData}></Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.modelGroup} label="Model Group" name="modelGroup" data-testid="modelGroup">
                        <Select placeholder="Select" loading={isModelLoading} allowClear fieldNames={{ label: 'value', value: 'key' }} options={modelData}></Select>
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.variant} label="Variant" name="variant" data-testid="variant">
                        <Select placeholder="Select" loading={isVariantLoading} allowClear fieldNames={{ label: 'value', value: 'key' }} options={variantData}></Select>
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="oldRegistrationNumber" label="Old Reg Number" initialValue={formData?.oldRegistrationNumber} rules={[validateRequiredInputField('Old Reg Number')]}>
                        <Input placeholder={preparePlaceholderText('Old Reg Number')} maxLength={50} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="oldChessisNumber" label="Old Chessis Number" initialValue={formData?.oldChessisNumber} rules={[validateRequiredInputField('Old Chessis Number')]}>
                        <Input maxLength={50} placeholder={preparePlaceholderText('Old Chessis Number')} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="relationship" label="Relationship" initialValue={formData?.relationship} rules={[validateRequiredSelectField('Relationship')]}>
                        <Select placeholder="Select" onChange={handleRelationshipChange} loading={isConfigLoading} allowClear fieldNames={{ label: 'value', value: 'key' }} options={typeData['REL_TYPE']}></Select>
                    </Form.Item>
                    <Form.Item hidden name="relationshipCode" initialValue={formData?.relationshipCode}>
                        <Input></Input>
                    </Form.Item>
                    <Form.Item hidden name="monthOfRegistrationCode" initialValue={formData?.monthOfRegistrationCode}>
                        <Input></Input>
                    </Form.Item>

                    <Form.Item hidden name="yearOfRegistrationCode" initialValue={formData?.yearOfRegistrationCode}>
                        <Input></Input>
                    </Form.Item>
                    <Form.Item hidden name="usageCode" initialValue={formData?.usageCode}>
                        <Input></Input>
                    </Form.Item>
                    <Form.Item hidden name="schemeCode" initialValue={formData?.schemeCode}>
                        <Input></Input>
                    </Form.Item>
                    <Form.Item hidden name="id" initialValue={formData?.id}>
                        <Input></Input>
                    </Form.Item>
                    <Form.Item hidden name="hypothicatedToCode" initialValue={formData?.hypothicatedToCode}>
                        <Input></Input>
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="monthOfRegistration" label="Month of Registration" initialValue={formData?.monthOfRegistration} rules={[validateRequiredSelectField('Month of Registration')]}>
                        <Select
                            style={{
                                width: '100%',
                            }}
                            loading={isConfigLoading}
                            options={typeData['MONTH']}
                            onChange={handleMonthofRegChange}
                            placeholder={preparePlaceholderSelect('Month of Registration')}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="yearOfRegistration" label="Year of Registration" initialValue={formData?.yearOfRegistration} rules={[validateRequiredInputField('year of reg')]}>
                        <Select onChange={handleYearOfRegChange} placeholder="Select"  allowClear fieldNames={{ label: 'value', value: 'key' }} options={yearsList}></Select>
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="usage" label="Usage" initialValue={formData?.usage} rules={[validateRequiredSelectField('Usage')]}>
                        <Select onChange={handleUsageChange} placeholder="Select" loading={false} allowClear fieldNames={{ label: 'value', value: 'key' }} options={typeData['VEHCL_USAG']}></Select>
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="schemeName" label="Scheme Name" initialValue={formData?.schemeName} rules={[validateRequiredSelectField('Scheme Name')]}>
                        <Select
                            style={{
                                width: '100%',
                            }}
                            loading={isSchemeLovLoading}
                            onChange={handleSchemeChange}
                            fieldNames={{ label: 'value', value: 'key' }}
                            options={schemeLovData}
                            placeholder={preparePlaceholderSelect('Scheme Name')}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="schemeAmount" label="Scheme Amount" initialValue={formData?.schemeAmount} rules={[validateRequiredInputField('Scheme Amount')]}>
                        <Input maxLength={50} placeholder={preparePlaceholderText('Scheme Amount')} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="kilometer" label="KM" initialValue={formData?.kilometer} rules={[validateRequiredInputField('kilometer')]}>
                        <Input placeholder={preparePlaceholderText('kilometer')} maxLength={50} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="customerExpectedPrice" label="Customer Expected Price" initialValue={formData?.customerExpectedPrice} rules={[validateRequiredInputField('Customer Expected Price')]}>
                        <Input placeholder={preparePlaceholderText('Customer Expected Price')} maxLength={50} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="procurementPrice" label="Procurement Price" initialValue={formData?.procurementPrice} rules={[validateRequiredInputField('Procurement Price')]}>
                        <Input maxLength={50} placeholder={preparePlaceholderText('Procurement Price')} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="hypothicatedTo" label="Hypothecated To" initialValue={formData?.hypothicatedTo} fieldNames={{ label: 'value', value: 'key' }} rules={[validateRequiredSelectField('hypothecated')]}>
                        <Select
                            style={{
                                width: '100%',
                            }}
                            onChange={handleHypotheticatedChange}
                            loading={isFinanceLovLoading}
                            fieldNames={{ label: 'value', value: 'key' }}
                            options={financeLovData}
                            placeholder={preparePlaceholderSelect('Finance Company')}
                        />
                    </Form.Item>
                </Col>
            </Row>
        </Card>
    );
};

export const AddEditForm = AddEditFormMain;
