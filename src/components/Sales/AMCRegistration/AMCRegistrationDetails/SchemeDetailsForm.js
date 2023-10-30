/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Form, DatePicker, Input } from 'antd';
import { validateRequiredSelectField, validateRequiredInputField, validateOnlyPositiveNumber } from 'utils/validation';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { customSelectBox } from 'utils/customSelectBox';
import { PARAM_MASTER } from 'constants/paramMaster';

const SchemeDetailsForm = (props) => {
    const { schemeForm, formData, typeData, handleFormValueChange, handleSchemeDescriptionChange, schemeData } = props;

    const isDiscountLessThanAmount = (value) => {
        if (Number(schemeForm.getFieldValue('schemeBasicAmount')) < Number(value)) {
            return Promise.reject('Discount cannot exceed Scheme amount');
        } else {
            return Promise.resolve();
        }
    };

    return (
        <Form layout="vertical" autoComplete="off" form={schemeForm} onFieldsChange={handleFormValueChange}>
            <Row gutter={16}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.saleType} label="AMC Type" name="amcType" rules={[validateRequiredSelectField('AMC Type')]}>
                        {customSelectBox({ data: typeData?.[PARAM_MASTER.AMC_SCHEME_TYPE.id], placeholder: preparePlaceholderSelect('AMC Type') })}
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label="Scheme Description" name="schemeDescription" rules={[validateRequiredSelectField('Scheme Description')]}>
                        {customSelectBox({ data: schemeData, placeholder: preparePlaceholderSelect('Scheme Description'), fieldNames: { key: 'schemeCode', value: 'schemeDescription' }, onChange: handleSchemeDescriptionChange })}
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label="Scheme Code" name="schemeCode" rules={[validateRequiredInputField('Scheme Code')]}>
                        <Input disabled maxLength={50} placeholder={preparePlaceholderText('Scheme Code')} />
                    </Form.Item>
                </Col>

                <Form.Item hidden label="" name="id">
                    <Input maxLength={50} />
                </Form.Item>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label="Scheme Basic Amount" name="schemeBasicAmount" rules={[validateRequiredInputField('Scheme Basic Amount')]}>
                        <Input disabled maxLength={50} placeholder={preparePlaceholderText('Scheme Basic Amount')} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label="Scheme Discount" name="schemeDiscount" rules={[validateRequiredInputField('Scheme Discount'), validateOnlyPositiveNumber('Scheme Discount'), { validator: (__, value) => isDiscountLessThanAmount(value) }]}>
                        <Input maxLength={50} placeholder={preparePlaceholderText('Scheme Discount')} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item
                        label="Scheme Tax Amount"
                        name="schemeTaxAmount"
                        //  rules={[validateRequiredInputField('Scheme Tax Amount')]}
                    >
                        <Input disabled maxLength={50} placeholder={preparePlaceholderText('Scheme Tax Amount')} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label="Scheme End Date" name="schemeEndDate">
                        <DatePicker disabled maxLength={50} placeholder={preparePlaceholderText('Scheme End Date')} />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
};

export default SchemeDetailsForm;
