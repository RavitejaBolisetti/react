/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Row, Col, Input, Form } from 'antd';
import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { validateNumberWithTwoDecimalPlaces } from 'utils/validation';
import { translateContent } from 'utils/translateContent';

const RSAForm = ({ formData, rsaForm, setFormDataSetter, formDataSetter, formActionType, handleFormValueChange }) => {
    useEffect(() => {
        rsaForm.setFieldsValue({
            rsa: formData?.rsa?.rsa ? formData?.rsa?.rsa : !formActionType?.viewMode ? null : 'NA',
            rsaRate: formData?.rsa?.rsaRate ? formData?.rsa?.rsaRate : !formActionType?.viewMode ? null : 'NA',
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);

    const onValuesChange = () => {
        const Myvalues = rsaForm.getFieldsValue();
        setFormDataSetter({ ...formDataSetter, rsa: { ...Myvalues } });
    };

    return (
        <Form form={rsaForm} onValuesChange={onValuesChange} onFieldsChange={handleFormValueChange} autoComplete="off" id="rsaForm" layout="vertical">
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label={translateContent('bookingManagement.label.rsa')} name="rsa">
                        <Input disabled={true} placeholder={preparePlaceholderText(translateContent('bookingManagement.label.rsa'))} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label={translateContent('bookingManagement.label.rsaRate')} name="rsaRate" rules={[validateNumberWithTwoDecimalPlaces(translateContent('bookingManagement.label.rsaRate'))]}>
                        <Input disabled={true} placeholder={preparePlaceholderText(translateContent('bookingManagement.label.rsaRate'))} />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
};

export default RSAForm;
