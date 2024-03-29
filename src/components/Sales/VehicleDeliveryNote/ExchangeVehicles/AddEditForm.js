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
import { registrationYearList } from 'utils/registrationYearList';

const AddEditFormMain = (props) => {
    const { formData, form, formActionType, editableOnSearch, showAlert } = props;
    const { financeLovData, schemeLovData, typeData, makeData } = props;
    const { isConfigLoading, isSchemeLovLoading, isFinanceLovLoading, isMakeLoading, isModelLoading, isVariantLoading } = props;
    const { filteredModelData, filteredVariantData, handleFilterChange, fnSetData, handleSchemeChange } = props;

    useEffect(() => {
        if (formData) {
            form.setFieldsValue({
                ...formData,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);

    return (
        <Card className={styles.ExchangeCard}>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formActionType?.editMode ? (formData?.exchange === 1 ? true : false) : false} labelAlign="left" wrapperCol={{ span: 24 }} name="exchange" label="Exchange" valuePropName="checked">
                        <Switch checkedChildren="Yes" unCheckedChildren="No" onChange={(checked) => (checked ? 1 : 0)} />
                    </Form.Item>
                </Col>
            </Row>
            {(form.getFieldValue('exchange') || formData?.exchange === 1) && (
                <>
                    <CustomerListMaster fnSetData={fnSetData} defaultOption={'registrationNumber'} />

                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            {prepareCaption('Vehicle Details')}
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item name="oldRegistrationNumber" label="Registration Number" rules={[validateRequiredInputField('Registration Number')]}>
                                <Input placeholder={preparePlaceholderText('Registration Number')} maxLength={50} />
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item label="Make" name="make" data-testid="make" rules={[validateRequiredSelectField('make')]}>
                                <Select placeholder="Select" loading={isMakeLoading} allowClear fieldNames={{ label: 'value', value: 'key' }} options={makeData} onChange={(value, selectobj) => handleFilterChange('make', value, selectobj)} />
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
                                <Select placeholder="Select" loading={isVariantLoading} allowClear fieldNames={{ label: 'value', value: 'key' }} options={filteredVariantData} />
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item name="kilometer" label="KMS" initialValue={formData?.kilometer} rules={[validateRequiredInputField('kilometer'), validateNumberWithTwoDecimalPlaces('kilometer')]}>
                                <Input placeholder={preparePlaceholderText('kilometer')} maxLength={50} />
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item name="usageCode" label="Usage" initialValue={formData?.usageCode} rules={[validateRequiredSelectField('Usage')]}>
                                <Select placeholder="Select" loading={false} allowClear fieldNames={{ label: 'value', value: 'key' }} options={typeData['VEHCL_USAG']} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item name="yearOfRegistrationCode" label="Year of Registration" initialValue={formData?.yearOfRegistrationCode} rules={[validateRequiredInputField('year of reg')]}>
                                <Select placeholder="Select" allowClear fieldNames={{ label: 'value', value: 'key' }} options={registrationYearList} />
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item name="monthOfRegistrationCode" label="Month of Registration" initialValue={formData?.monthOfRegistrationCode} rules={[validateRequiredSelectField('Month of Registration')]}>
                                <Select loading={isConfigLoading} fieldNames={{ label: 'value', value: 'key' }} options={typeData['MONTH']} placeholder={preparePlaceholderSelect('Month of Registration')} />
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item name="oldChessisNumber" label="VIN" rules={[validateRequiredInputField('VIN')]}>
                                <Input maxLength={50} placeholder={preparePlaceholderText('VIN')} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item name="hypothicatedToCode" label="Hypothecated To" initialValue={formData?.hypothicatedToCode} fieldNames={{ label: 'value', value: 'key' }}>
                                <Select loading={isFinanceLovLoading} fieldNames={{ label: 'value', value: 'key' }} options={financeLovData} placeholder={preparePlaceholderSelect('Finance Company')} />
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
                                <Input disabled={editableOnSearch} placeholder={preparePlaceholderText('customer name')} maxLength={50} />
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item name="relationshipCode" label="Relationship" initialValue={formData?.relationshipCode} rules={[validateRequiredSelectField('Relationship')]}>
                                <Select placeholder="Select" loading={isConfigLoading} allowClear fieldNames={{ label: 'value', value: 'key' }} options={typeData['REL_TYPE']} />
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
                                <Select loading={isSchemeLovLoading} fieldNames={{ label: 'value', value: 'key' }} options={schemeLovData} placeholder={preparePlaceholderSelect('Scheme Name')} onChange={handleSchemeChange} />
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
                            {prepareCaption('Price')}
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item name="customerExpectedPrice" label="Customer Expected Price" initialValue={formData?.customerExpectedPrice} rules={[validateNumberWithTwoDecimalPlaces('Customer Expected Price')]}>
                                <Input placeholder={preparePlaceholderText('Customer Expected Price')} maxLength={50} />
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item name="procurementPrice" label="Procurement Price" initialValue={formData?.procurementPrice} rules={[validateNumberWithTwoDecimalPlaces('Procurement Price')]}>
                                <Input maxLength={50} placeholder={preparePlaceholderText('Procurement Price')} />
                            </Form.Item>
                        </Col>
                    </Row>
                </>
            )}
        </Card>
    );
};

export const AddEditForm = AddEditFormMain;
