/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Row, Col, Input, Form, Select, Card } from 'antd';

import styles from 'components/common/Common.module.css';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';

import { validateRequiredInputField, validateRequiredSelectField, validateNumberWithTwoDecimalPlaces } from 'utils/validation';

const { Search } = Input;

const AddEditFormMain = (props) => {
    const { formData, form, isCustomerLoading, onSearch } = props;
    const { financeLovData, schemeLovData, typeData, makeData } = props;
    const { isConfigLoading, isSchemeLovLoading, isFinanceLovLoading, isMakeLoading, isModelLoading, isVariantLoading } = props;
    const { filteredModelData, filteredVariantData, handleFilterChange } = props;
    useEffect(() => {
        if (formData) {
            form.setFieldsValue({
                ...formData,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);
    const onHandleChange = () => {
        form.setFieldsValue({ customerName: undefined });
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
                        <Search loading={isCustomerLoading} placeholder={preparePlaceholderText('customer id')} maxLength={35} allowClear type="text" onSearch={onSearch} onChange={onHandleChange} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="customerName" label="Customer Name" initialValue={formData?.customerName}>
                        <Input disabled={true} placeholder={preparePlaceholderText('customer name')} maxLength={50} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.make} label="Make" name="make" data-testid="make" rules={[validateRequiredSelectField('make')]}>
                        <Select placeholder="Select" loading={isMakeLoading} allowClear fieldNames={{ label: 'value', value: 'key' }} options={makeData} onChange={(value, selectobj) => handleFilterChange('make', value, selectobj)} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.modelGroup} label="Model Group" name="modelGroup" data-testid="modelGroup" rules={[validateRequiredSelectField('model group')]}>
                        <Select placeholder="Select" loading={isModelLoading} allowClear fieldNames={{ label: 'value', value: 'key' }} options={filteredModelData} onChange={(value, selectobj) => handleFilterChange('modelGroup', value, selectobj)} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.variant} label="Variant" name="variant" data-testid="variant" rules={[validateRequiredSelectField('Variant')]}>
                        <Select placeholder="Select" loading={isVariantLoading} allowClear fieldNames={{ label: 'value', value: 'key' }} options={filteredVariantData} />
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
                    <Form.Item name="oldChessisNumber" label="Old Chassis Number" initialValue={formData?.oldChessisNumber} rules={[validateRequiredInputField('Old Chassis Number')]}>
                        <Input maxLength={50} placeholder={preparePlaceholderText('Old Chassis Number')} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="relationshipCode" label="Relationship" initialValue={formData?.relationshipCode} rules={[validateRequiredSelectField('Relationship')]}>
                        <Select placeholder="Select" loading={isConfigLoading} allowClear fieldNames={{ label: 'value', value: 'key' }} options={typeData['REL_TYPE']} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="monthOfRegistrationCode" label="Month of Registration" initialValue={formData?.monthOfRegistrationCode} rules={[validateRequiredSelectField('Month of Registration')]}>
                        <Select loading={isConfigLoading} fieldNames={{ label: 'value', value: 'key' }} options={typeData['MONTH']} placeholder={preparePlaceholderSelect('Month of Registration')} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="yearOfRegistrationCode" label="Year of Registration" initialValue={formData?.yearOfRegistrationCode} rules={[validateRequiredInputField('year of reg')]}>
                        <Select placeholder="Select" allowClear fieldNames={{ label: 'value', value: 'key' }} options={yearsList} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="usageCode" label="Usage" initialValue={formData?.usageCode} rules={[validateRequiredSelectField('Usage')]}>
                        <Select placeholder="Select" loading={false} allowClear fieldNames={{ label: 'value', value: 'key' }} options={typeData['VEHCL_USAG']} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="schemeCode" label="Scheme Name" initialValue={formData?.schemeCode} rules={[validateRequiredSelectField('Scheme Name')]}>
                        <Select loading={isSchemeLovLoading} fieldNames={{ label: 'value', value: 'key' }} options={schemeLovData} placeholder={preparePlaceholderSelect('Scheme Name')} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="schemeAmount" label="Scheme Amount" initialValue={formData?.schemeAmount} rules={[validateRequiredInputField('Scheme Amount'), validateNumberWithTwoDecimalPlaces('Scheme Amount')]}>
                        <Input maxLength={50} placeholder={preparePlaceholderText('Scheme Amount')} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="kilometer" label="KM" initialValue={formData?.kilometer} rules={[validateRequiredInputField('kilometer'), validateNumberWithTwoDecimalPlaces('kilometer')]}>
                        <Input placeholder={preparePlaceholderText('kilometer')} maxLength={50} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="customerExpectedPrice" label="Customer Expected Price" initialValue={formData?.customerExpectedPrice} rules={[validateNumberWithTwoDecimalPlaces('Customer Expected Price')]}>
                        <Input placeholder={preparePlaceholderText('Customer Expected Price')} maxLength={50} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="procurementPrice" label="Procurement Price" initialValue={formData?.procurementPrice} rules={[validateNumberWithTwoDecimalPlaces('Procurement Price')]}>
                        <Input maxLength={50} placeholder={preparePlaceholderText('Procurement Price')} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="hypothicatedToCode" label="Hypothecated To" initialValue={formData?.hypothicatedToCode} fieldNames={{ label: 'value', value: 'key' }} rules={[validateRequiredSelectField('hypothecated')]}>
                        <Select loading={isFinanceLovLoading} fieldNames={{ label: 'value', value: 'key' }} options={financeLovData} placeholder={preparePlaceholderSelect('Finance Company')} />
                    </Form.Item>
                </Col>
            </Row>
        </Card>
    );
};

export const AddEditForm = AddEditFormMain;
