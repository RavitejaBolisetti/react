/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';

import { Col, Input, Form, Row, Card } from 'antd';
import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { validateRequiredInputField, validateRequiredSelectField, validateNumberWithTwoDecimalPlaces } from 'utils/validation';
import { CustomerListMaster } from 'components/utils/CustomerListModal';
import { prepareCaption } from 'utils/prepareCaption';

import styles from 'assets/sass/app.module.scss';
import { convertToUpperCase } from 'utils/convertToUpperCase';
import { customSelectBox } from 'utils/customSelectBox';
import { registrationYearList } from 'utils/registrationYearList';
import { translateContent } from 'utils/translateContent';
const { TextArea } = Input;

const AddEditFormMain = (props) => {
    const { form, formData } = props;
    const { schemeLovData, typeData } = props;
    const { isConfigLoading, isSchemeLovLoading, isModelLoading, isVariantLoading } = props;
    const { filteredModelData, filteredVariantData, handleFilterChange, fnSetData, handleSchemeChange, viewOnly = false } = props;

    useEffect(() => {
        if (formData) {
            form.setFieldsValue({
                ...formData,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);

    const disabledProps = { disabled: viewOnly };

    return (
        <Card className={styles.ExchangeCard}>
            {!viewOnly && <CustomerListMaster fnSetData={fnSetData} defaultOption={'registrationNumber'} />}
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    {prepareCaption(translateContent('vehicleInvoiceGeneration.heading.captions.vehicleDetails'))}
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="registrationNumber" label={translateContent('commonModules.label.loyaltyScheme.oldRegistrationNumber')} initialValue={formData?.oldRegNumber}>
                        <Input disabled={true} onInput={convertToUpperCase} placeholder={preparePlaceholderText(translateContent('commonModules.label.loyaltyScheme.oldRegistrationNumber'))} maxLength={50} />
                    </Form.Item>
                </Col>

                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label={translateContent('commonModules.label.loyaltyScheme.make')} name="make" data-testid="make" rules={[validateRequiredSelectField(translateContent('commonModules.label.loyaltyScheme.make'))]}>
                        {customSelectBox({ data: typeData['VEHCL_MFG'], disabled: true, onChange: (value, selectobj) => handleFilterChange('make', value, selectobj) })}
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label={translateContent('commonModules.label.loyaltyScheme.modelGroup')} name="vehicleModelGroup" data-testid="modelGroup" rules={[validateRequiredSelectField(translateContent('commonModules.label.loyaltyScheme.modelGroup'))]}>
                        {customSelectBox({
                            data: filteredModelData,
                            loading: isModelLoading,
                            disabled: true,
                            fieldNames: { key: 'modelGroupCode', value: 'modelGroupDescription' },
                            onChange: (value, selectobj) => handleFilterChange('modelGroupCode', value, selectobj),
                        })}
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label={translateContent('commonModules.label.loyaltyScheme.variant')} name="variantCode" data-testid="variant" rules={[validateRequiredSelectField(translateContent('commonModules.label.loyaltyScheme.variant'))]}>
                        {customSelectBox({
                            data: filteredVariantData,
                            loading: isVariantLoading,
                            disabled: true,
                            fieldNames: { key: 'variantCode', value: 'variantDescription' },
                        })}
                    </Form.Item>
                </Col>

                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="vehicleUsageCode" label={translateContent('commonModules.label.loyaltyScheme.usage')} initialValue={formData?.usageCode} rules={[validateRequiredSelectField(translateContent('commonModules.label.loyaltyScheme.usage'))]}>
                        {customSelectBox({ data: typeData['VEHCL_USAG'], disabled: viewOnly, loading: false })}
                    </Form.Item>
                </Col>

                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="registrationYearCode" label={translateContent('commonModules.label.loyaltyScheme.yearOfRegistration')} initialValue={formData?.yearOfRegistrationCode} rules={[validateRequiredInputField(translateContent('commonModules.label.loyaltyScheme.yearOfRegistration'))]}>
                        {customSelectBox({ data: registrationYearList, disabled: viewOnly, loading: false })}
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="registrationMonthCode" label={translateContent('commonModules.label.loyaltyScheme.monthOfRegistration')} initialValue={formData?.monthOfRegistrationCode} rules={[validateRequiredSelectField(translateContent('commonModules.label.loyaltyScheme.monthOfRegistration'))]}>
                        {customSelectBox({ data: typeData?.MONTH, disabled: viewOnly, loading: false })}
                    </Form.Item>
                </Col>

                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="oldChassisNumber" label={translateContent('commonModules.label.loyaltyScheme.oldChassisNumber')} initialValue={formData?.oldChassisNumber}>
                        <Input {...disabledProps} onInput={convertToUpperCase} maxLength={50} placeholder={preparePlaceholderText(translateContent('commonModules.label.loyaltyScheme.oldChassisNumber'))} {...disabledProps} />
                    </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Form.Item name="remarks" label={translateContent('commonModules.label.loyaltyScheme.remarks')} initialValue={formData?.remarks}>
                        <TextArea {...disabledProps} placeholder={preparePlaceholderText(translateContent('commonModules.label.loyaltyScheme.remarks'))} maxLength={300} showCount />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    {prepareCaption(translateContent('vehicleInvoiceGeneration.heading.captions.customerDetails'))}
                </Col>
            </Row>

            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="customerName" label={translateContent('commonModules.label.referrals.customerName')} initialValue={formData?.customerName}>
                        <Input {...disabledProps} placeholder={preparePlaceholderText(translateContent('commonModules.label.referrals.customerName'))} maxLength={50} />
                    </Form.Item>
                </Col>

                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="relationCode" label={translateContent('commonModules.label.loyaltyScheme.relationShip')} initialValue={formData?.relationship}>
                        {customSelectBox({ data: typeData?.REL_TYPE, disabled: viewOnly, loading: isConfigLoading })}
                    </Form.Item>
                </Col>

                <Col xs={0} sm={0} md={0} lg={0} xl={0} xxl={0}>
                    <Form.Item hidden name="customerCode" initialValue={formData?.customerCode}>
                        <Input />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    {prepareCaption(translateContent('vehicleInvoiceGeneration.heading.captions.scheme'))}

                </Col>
            </Row>

            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="schemeCode" label={translateContent('commonModules.label.loyaltyScheme.schemeName')} initialValue={formData?.schemeCode} rules={[validateRequiredSelectField(translateContent('commonModules.label.loyaltyScheme.schemeName'))]}>
                        {customSelectBox({ data: schemeLovData, disabled: viewOnly, loading: isSchemeLovLoading, onChange: handleSchemeChange })}
                    </Form.Item>
                </Col>

                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="schemeAmount" label={translateContent('commonModules.label.loyaltyScheme.schemeAmount')} initialValue={formData?.schemeAmount} rules={[validateNumberWithTwoDecimalPlaces(translateContent('commonModules.label.loyaltyScheme.schemeAmount'))]}>
                        <Input disabled={true} placeholder={preparePlaceholderText(translateContent('commonModules.label.loyaltyScheme.schemeAmount'))} maxLength={50} />
                    </Form.Item>
                </Col>
            </Row>
        </Card>
    );
};

export const AddEditForm = AddEditFormMain;
