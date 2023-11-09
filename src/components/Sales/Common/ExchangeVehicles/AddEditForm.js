/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import { Row, Col, Input, Form, Card, Switch } from 'antd';

import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { CustomerListMaster } from 'components/utils/CustomerListModal';

import { validateRequiredInputField, validateRequiredSelectField, validateNumberWithTwoDecimalPlaces } from 'utils/validation';
import { prepareCaption } from 'utils/prepareCaption';
import { getCodeValue } from 'utils/getCodeValue';
import styles from 'assets/sass/app.module.scss';
import { convertToUpperCase } from 'utils/convertToUpperCase';
import { customSelectBox } from 'utils/customSelectBox';
import { registrationYearList } from 'utils/registrationYearList';
import { translateContent } from 'utils/translateContent';

const AddEditFormMain = (props) => {
    const { formData, form, formActionType, editableOnSearch, showAlert } = props;
    const { financeLovData, schemeLovData, typeData, isMahindraMake } = props;
    const { isConfigLoading, isSchemeLovLoading, isMakeLoading, isModelLoading, isVariantLoading } = props;
    const { filteredModelData, filteredVariantData, handleFilterChange, fnSetData, handleSchemeChange, viewOnly = false } = props;
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (formData) {
            form.setFieldsValue({
                ...formData,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);

    useEffect(() => {
        setVisible(!!formData?.exchange);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData?.exchange]);

    const disabledProps = { disabled: viewOnly };
    return (
        <Card className={styles.ExchangeCard}>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formActionType?.editMode ? (formData?.exchange === 1 ? true : false) : false} labelAlign="left" wrapperCol={{ span: 24 }} name="exchange" label={translateContent('commonModules.label.exchangeDetails.exchange')} valuePropName="checked">
                        <Switch {...disabledProps} checkedChildren="Yes" unCheckedChildren="No" onClick={(value) => setVisible(value)} onChange={(checked) => (checked ? 1 : 0)} />
                    </Form.Item>
                </Col>
            </Row>
            {visible && (
                <>
                    {!viewOnly && <CustomerListMaster fnSetData={fnSetData} defaultOption={'registrationNumber'} />}

                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            {prepareCaption(translateContent('commonModules.exchangeVehicle.captions.sectionOne'))}
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item name="oldRegistrationNumber" initialValue={formData?.oldRegistrationNumber} label={translateContent('commonModules.label.exchangeDetails.registrationNumber')} rules={[validateRequiredInputField(translateContent('commonModules.label.exchangeDetails.registrationNumber'))]}>
                                <Input {...disabledProps} onInput={convertToUpperCase} placeholder={preparePlaceholderText(translateContent('commonModules.label.exchangeDetails.registrationNumber'))} maxLength={50} />
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item label={translateContent('commonModules.label.exchangeDetails.make')} name="make" data-testid="make" initialValue={getCodeValue(typeData['VEHCL_MFG'], formData?.make)} rules={[validateRequiredSelectField(translateContent('commonModules.label.exchangeDetails.make'))]}>
                                {customSelectBox({ data: typeData['VEHCL_MFG'], disabled: viewOnly, loading: isMakeLoading, onChange: (value) => handleFilterChange('make', value) })}
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item label={translateContent('commonModules.label.exchangeDetails.modelGroup')} name="modelGroup" initialValue={formData?.modelGroup} data-testid="modelGroup" rules={[validateRequiredSelectField(translateContent('commonModules.label.exchangeDetails.modelGroup'))]}>
                                {customSelectBox({
                                    data: filteredModelData,
                                    loading: isModelLoading,
                                    disabled: viewOnly,
                                    fieldNames: isMahindraMake ? { key: 'modelGroupCode', value: 'modelGroupDescription' } : undefined,
                                    onChange: (value) => {
                                        handleFilterChange('modelGroup', value);
                                        showAlert(value);
                                    },
                                })}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item label={translateContent('commonModules.label.exchangeDetails.variant')} name="variant" data-testid="variant" initialValue={formData?.variant} rules={[validateRequiredSelectField(translateContent('commonModules.label.exchangeDetails.variant'))]}>
                                {customSelectBox({
                                    data: filteredVariantData,
                                    loading: isVariantLoading,
                                    disabled: viewOnly,
                                    fieldNames: isMahindraMake ? { key: 'variantCode', value: 'variantDescription' } : undefined,
                                })}
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item name="kilometer" label={translateContent('commonModules.label.exchangeDetails.kms')} initialValue={formData?.kilometer} rules={[validateRequiredInputField(translateContent('commonModules.label.exchangeDetails.kilometer')), validateNumberWithTwoDecimalPlaces(translateContent('commonModules.label.exchangeDetails.kilometer'))]}>
                                <Input {...disabledProps} placeholder={preparePlaceholderText(translateContent('commonModules.label.exchangeDetails.kilometer'))} maxLength={50} />
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item name="usageCode" label={translateContent('commonModules.label.exchangeDetails.usage')} initialValue={formData?.usageCode} rules={[validateRequiredSelectField(translateContent('commonModules.label.exchangeDetails.usage'))]}>
                                {customSelectBox({ data: typeData['VEHCL_USAG'], disabled: viewOnly, loading: false })}
                            </Form.Item>
                        </Col>

                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item name="yearOfRegistrationCode" label={translateContent('commonModules.label.exchangeDetails.yearOfRegistration')} initialValue={formData?.yearOfRegistrationCode} rules={[validateRequiredInputField(translateContent('commonModules.label.exchangeDetails.yearOfRegistration'))]}>
                                {customSelectBox({ data: registrationYearList, disabled: viewOnly, loading: false })}
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item name="monthOfRegistrationCode" label={translateContent('commonModules.label.exchangeDetails.monthOfRegistration')} initialValue={formData?.monthOfRegistrationCode} rules={[validateRequiredSelectField(translateContent('commonModules.label.exchangeDetails.monthOfRegistration'))]}>
                                {customSelectBox({ data: typeData['MONTH'], disabled: viewOnly, loading: isConfigLoading })}
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item name="oldChessisNumber" label={translateContent('commonModules.label.exchangeDetails.vin')} rules={[validateRequiredInputField(translateContent('commonModules.label.exchangeDetails.vin'))]}>
                                <Input {...disabledProps} onInput={convertToUpperCase} maxLength={50} placeholder={preparePlaceholderText(translateContent('commonModules.label.exchangeDetails.vin'))} />
                            </Form.Item>
                        </Col>

                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item name="hypothicatedToCode" label={translateContent('commonModules.label.exchangeDetails.hypotheticatedTo')} initialValue={formData?.hypothicatedToCode}>
                                {customSelectBox({ data: financeLovData, disabled: viewOnly, loading: isConfigLoading })}
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            {prepareCaption(translateContent('commonModules.exchangeVehicle.captions.sectionTwo'))}
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        {/* <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item name="customerId" label="Customer ID" rules={[validateRequiredInputField('customerId')]}>
                                <Input disabled={editableOnSearch} placeholder={preparePlaceholderText('customer id')} maxLength={35} allowClear />
                            </Form.Item>
                        </Col> */}
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item name="customerName" label={translateContent('commonModules.label.exchangeDetails.customerName')} rules={[validateRequiredInputField('customer number')]}>
                                <Input disabled={viewOnly || editableOnSearch} placeholder={preparePlaceholderText(translateContent('commonModules.label.exchangeDetails.customerName'))} maxLength={50} />
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item name="relationshipCode" label={translateContent('commonModules.label.exchangeDetails.relationShip')} initialValue={formData?.relationshipCode} rules={[validateRequiredSelectField(translateContent('commonModules.label.exchangeDetails.relationShip'))]}>
                                {customSelectBox({ data: typeData['REL_TYPE'], disabled: viewOnly, loading: false })}
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            {prepareCaption(translateContent('commonModules.exchangeVehicle.captions.sectionThree'))}
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item name="schemeCode" label={translateContent('commonModules.label.exchangeDetails.schemeName')} initialValue={formData?.schemeCode} rules={[validateRequiredSelectField(translateContent('commonModules.label.exchangeDetails.schemeName'))]}>
                                {customSelectBox({ data: schemeLovData, disabled: viewOnly, loading: isSchemeLovLoading, onChange: handleSchemeChange })}
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item name="schemeAmount" label={translateContent('commonModules.label.exchangeDetails.schemeAmount')} initialValue={formData?.schemeAmount} rules={[validateRequiredInputField(translateContent('commonModules.label.exchangeDetails.schemeAmount')), validateNumberWithTwoDecimalPlaces(translateContent('commonModules.label.exchangeDetails.schemeAmount'))]}>
                                <Input disabled maxLength={50} placeholder={preparePlaceholderText(translateContent('commonModules.label.exchangeDetails.schemeAmount'))} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            {prepareCaption(translateContent('commonModules.exchangeVehicle.captions.sectionFour'))}
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item name="customerExpectedPrice" label={translateContent('commonModules.label.exchangeDetails.customerExpectedPrice')} initialValue={formData?.customerExpectedPrice} rules={[validateNumberWithTwoDecimalPlaces(translateContent('commonModules.label.exchangeDetails.customerExpectedPrice'))]}>
                                <Input {...disabledProps} placeholder={preparePlaceholderText(translateContent('commonModules.label.exchangeDetails.customerExpectedPrice'))} maxLength={50} />
                            </Form.Item>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Form.Item name="procurementPrice" label={translateContent('commonModules.label.exchangeDetails.procurementPrice')} initialValue={formData?.procurementPrice} rules={[validateNumberWithTwoDecimalPlaces(translateContent('commonModules.label.exchangeDetails.procurementPrice'))]}>
                                <Input {...disabledProps} maxLength={50} placeholder={preparePlaceholderText(translateContent('commonModules.label.exchangeDetails.procurementPrice'))} />
                            </Form.Item>
                        </Col>
                    </Row>
                </>
            )}
        </Card>
    );
};

export const AddEditForm = AddEditFormMain;