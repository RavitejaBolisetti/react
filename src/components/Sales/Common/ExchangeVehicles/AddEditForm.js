/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Row, Col, Input, Form, Select, Card, Switch } from 'antd';

import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { CustomerListMaster } from 'components/utils/CustomerListModal';

import { validateRequiredInputField, validateRequiredSelectField, validateNumberWithTwoDecimalPlaces } from 'utils/validation';
import { prepareCaption } from 'utils/prepareCaption';

import styles from 'assets/sass/app.module.scss';
import { convertToUpperCase } from 'utils/convertToUpperCase';

const AddEditFormMain = (props) => {
    const { formData, form, formActionType, editableOnSearch, showAlert } = props;
    const { financeLovData, schemeLovData, typeData, makeData } = props;
    const { isConfigLoading, isSchemeLovLoading, isFinanceLovLoading, isMakeLoading, isModelLoading, isVariantLoading } = props;
    const { filteredModelData, filteredVariantData, handleFilterChange, fnSetData, handleSchemeChange, viewOnly = false } = props;

    useEffect(() => {
        if (formData) {
            form.setFieldsValue({
                ...formData,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);

    const currentYear = new Date().getFullYear();
    const yearsList = [];
    for (let i = currentYear; i >= currentYear - 15; i--) {
        yearsList.push({ key: i, value: i });
    }

    const disabledProps = { disabled: viewOnly };
    return (
        <Card className={styles.ExchangeCard}>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formActionType?.editMode ? (formData?.exchange === 1 ? true : false) : false} labelAlign="left" wrapperCol={{ span: 24 }} name="exchange" label="Exchange" valuePropName="checked">
                        <Switch {...disabledProps} checkedChildren="Yes" unCheckedChildren="No" onChange={(checked) => (checked ? 1 : 0)} />
                    </Form.Item>
                </Col>
            </Row>
            {(form.getFieldValue('exchange') || formData?.exchange === 1) && (
                <>
                    {!viewOnly && <CustomerListMaster fnSetData={fnSetData} defaultOption={'registrationNumber'} />}

                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            {prepareCaption('Vehicle Details')}
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item name="oldRegistrationNumber" label="Reg Number" rules={[validateRequiredInputField('Reg Number')]}>
                                <Input {...disabledProps} onInput={convertToUpperCase} placeholder={preparePlaceholderText('Reg Number')} maxLength={50} />
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item label="Make" name="make" data-testid="make" rules={[validateRequiredSelectField('make')]}>
                                <Select {...disabledProps} placeholder="Select" loading={isMakeLoading} allowClear fieldNames={{ label: 'value', value: 'key' }} options={typeData['VEHCL_MFG']} onChange={(value, selectobj) => handleFilterChange('make', value, selectobj)} />
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item label="Model Group" name="modelGroup" data-testid="modelGroup" rules={[validateRequiredSelectField('model group')]}>
                                <Select
                                    placeholder="Select"
                                    loading={isModelLoading}
                                    allowClear
                                    fieldNames={{ label: 'value', value: 'key' }}
                                    options={filteredModelData}
                                    {...disabledProps}
                                    onChange={(value, selectobj) => {
                                        handleFilterChange('modelGroup', value, selectobj);
                                        showAlert(value);
                                    }}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item label="Variant" name="variant" data-testid="variant" rules={[validateRequiredSelectField('variant')]}>
                                <Select {...disabledProps} placeholder="Select" loading={isVariantLoading} allowClear fieldNames={{ label: 'value', value: 'key' }} options={filteredVariantData} />
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item name="kilometer" label="KMS" initialValue={formData?.kilometer} rules={[validateRequiredInputField('kilometer'), validateNumberWithTwoDecimalPlaces('kilometer')]}>
                                <Input {...disabledProps} placeholder={preparePlaceholderText('kilometer')} maxLength={50} />
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item name="usageCode" label="Usage" initialValue={formData?.usageCode} rules={[validateRequiredSelectField('Usage')]}>
                                <Select {...disabledProps} placeholder="Select" loading={false} allowClear fieldNames={{ label: 'value', value: 'key' }} options={typeData['VEHCL_USAG']} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item name="yearOfRegistrationCode" label="Year of Registration" initialValue={formData?.yearOfRegistrationCode} rules={[validateRequiredInputField('year of reg')]}>
                                <Select {...disabledProps} placeholder="Select" allowClear fieldNames={{ label: 'value', value: 'key' }} options={yearsList} />
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item name="monthOfRegistrationCode" label="Month of Registration" initialValue={formData?.monthOfRegistrationCode} rules={[validateRequiredSelectField('Month of Registration')]}>
                                <Select {...disabledProps} loading={isConfigLoading} fieldNames={{ label: 'value', value: 'key' }} options={typeData['MONTH']} placeholder={preparePlaceholderSelect('Month of Registration')} />
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item name="oldChessisNumber" label="VIN Number" rules={[validateRequiredInputField('VIN number')]}>
                                <Input {...disabledProps} onInput={convertToUpperCase} maxLength={50} placeholder={preparePlaceholderText('vin number')} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item name="hypothicatedToCode" label="Hypothecated To" initialValue={formData?.hypothicatedToCode} fieldNames={{ label: 'value', value: 'key' }}>
                                <Select {...disabledProps} loading={isFinanceLovLoading} fieldNames={{ label: 'value', value: 'key' }} options={financeLovData} placeholder={preparePlaceholderSelect('Finance Company')} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            {prepareCaption('Customer Details')}
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        {/* <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item name="customerId" label="Customer ID" rules={[validateRequiredInputField('customerId')]}>
                                <Input disabled={editableOnSearch} placeholder={preparePlaceholderText('customer id')} maxLength={35} allowClear />
                            </Form.Item>
                        </Col> */}
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item name="customerName" label="Customer Name" rules={[validateRequiredInputField('customer number')]}>
                                <Input disabled={viewOnly || editableOnSearch} placeholder={preparePlaceholderText('customer name')} maxLength={50} />
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item name="relationshipCode" label="Relationship" initialValue={formData?.relationshipCode} rules={[validateRequiredSelectField('Relationship')]}>
                                <Select {...disabledProps} placeholder="Select" loading={isConfigLoading} allowClear fieldNames={{ label: 'value', value: 'key' }} options={typeData['REL_TYPE']} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            {prepareCaption('Scheme')}
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item name="schemeCode" label="Scheme Name" initialValue={formData?.schemeCode} rules={[validateRequiredSelectField('Scheme Name')]}>
                                <Select {...disabledProps} loading={isSchemeLovLoading} fieldNames={{ label: 'value', value: 'key' }} options={schemeLovData} placeholder={preparePlaceholderSelect('Scheme Name')} onChange={handleSchemeChange} />
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item name="schemeAmount" label="Scheme Amount" initialValue={formData?.schemeAmount} rules={[validateRequiredInputField('Scheme Amount'), validateNumberWithTwoDecimalPlaces('Scheme Amount')]}>
                                <Input disabled maxLength={50} placeholder={preparePlaceholderText('Scheme Amount')} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            {prepareCaption('Vehicle Price')}
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item name="customerExpectedPrice" label="Customer Expected Price" initialValue={formData?.customerExpectedPrice} rules={[validateNumberWithTwoDecimalPlaces('Customer Expected Price')]}>
                                <Input {...disabledProps} placeholder={preparePlaceholderText('Customer Expected Price')} maxLength={50} />
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item name="procurementPrice" label="Procurement Price" initialValue={formData?.procurementPrice} rules={[validateNumberWithTwoDecimalPlaces('Procurement Price')]}>
                                <Input {...disabledProps} maxLength={50} placeholder={preparePlaceholderText('Procurement Price')} />
                            </Form.Item>
                        </Col>
                    </Row>
                </>
            )}
        </Card>
    );
};

export const AddEditForm = AddEditFormMain;
