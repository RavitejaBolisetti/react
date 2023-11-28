/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Form, DatePicker, Input } from 'antd';
import { validateRequiredSelectField, validateRequiredInputField, validateNumberWithTwoDecimalPlaces } from 'utils/validation';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { customSelectBox } from 'utils/customSelectBox';
import { PARAM_MASTER } from 'constants/paramMaster';
import { translateContent } from 'utils/translateContent';
import { AMC_CONSTANTS } from '../utils/AMCConstants';
import { dateFormat } from 'utils/formatDateTime';

const SchemeDetailsForm = (props) => {
    const { schemeForm, registrationForm, formData, typeData, handleFormValueChange, handleSchemeDescriptionChange, schemeData, schemeList, handleTaxChange } = props;

    const isDiscountLessThanAmount = (value) => {
        if (Number(schemeForm.getFieldValue('schemeBasicAmount')) < Number(value)) {
            return Promise.reject(translateContent('amcRegistration.validation.discoutGreaterThanScheme'));
        } else {
            return Promise.resolve();
        }
    };

    return (
        <Form layout="vertical" autoComplete="off" form={schemeForm} onFieldsChange={handleFormValueChange}>
            <Row gutter={16}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.amcType} label={translateContent('amcRegistration.label.amcType')} name="amcType" rules={[validateRequiredSelectField(translateContent('amcRegistration.label.amcType'))]}>
                        {customSelectBox({
                            data: typeData?.[PARAM_MASTER.AMC_SCHEME_TYPE.id],
                            placeholder: preparePlaceholderSelect(translateContent('amcRegistration.label.amcType')),
                            onChange: () => {
                                schemeForm.resetFields(['schemeDescription']);
                                schemeList(registrationForm?.getFieldValue('priceType') === AMC_CONSTANTS?.MNM_FOC?.key ? registrationForm?.getFieldValue('vin') : null);
                            },
                        })}
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label={translateContent('amcRegistration.label.schemeDescription')} name="schemeDescription" rules={[validateRequiredSelectField(translateContent('amcRegistration.label.schemeDescription'))]}>
                        {customSelectBox({ data: schemeData, placeholder: preparePlaceholderSelect(translateContent('amcRegistration.label.schemeDescription')), fieldNames: { key: 'schemeCode', value: 'schemeDescription' }, onChange: handleSchemeDescriptionChange })}
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label={translateContent('amcRegistration.label.schemeCode')} name="schemeCode" rules={[validateRequiredInputField(translateContent('amcRegistration.label.schemeCode'))]}>
                        <Input disabled maxLength={50} placeholder={preparePlaceholderText(translateContent('amcRegistration.label.schemeCode'))} />
                    </Form.Item>
                </Col>

                <Form.Item hidden label="" name="id" />
                <Form.Item hidden label="" name="sgstAmount" />
                <Form.Item hidden label="" name="igstAmount" />
                <Form.Item hidden label="" name="cgstAmount" />

                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label={translateContent('amcRegistration.label.schemeBasicAmount')} name="schemeBasicAmount" rules={[validateRequiredInputField(translateContent('amcRegistration.label.schemeBasicAmount'))]}>
                        <Input disabled maxLength={50} placeholder={preparePlaceholderText(translateContent('amcRegistration.label.schemeBasicAmount'))} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label={translateContent('amcRegistration.label.schemeDiscount')} name="schemeDiscount" rules={[validateRequiredInputField(translateContent('amcRegistration.label.schemeDiscount')), validateNumberWithTwoDecimalPlaces(translateContent('amcRegistration.label.schemeDiscount')), { validator: (__, value) => isDiscountLessThanAmount(value) }]}>
                        <Input onChange={handleTaxChange} maxLength={50} placeholder={preparePlaceholderText(translateContent('amcRegistration.label.schemeDiscount'))} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item
                        label={translateContent('amcRegistration.label.schemeTaxAmount')}
                        name="schemeTaxAmount"
                        //  rules={[validateRequiredInputField('Scheme Tax Amount')]}
                    >
                        <Input disabled maxLength={50} placeholder={preparePlaceholderText(translateContent('amcRegistration.label.schemeTaxAmount'))} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label={translateContent('amcRegistration.label.schemeEndDate')} name="schemeEndDate">
                        <DatePicker format={dateFormat} disabled maxLength={50} placeholder={preparePlaceholderText(translateContent('amcRegistration.label.schemeEndDate'))} />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
};

export default SchemeDetailsForm;
