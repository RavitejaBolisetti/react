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

const ShieldForm = ({ formData, shieldForm, setFormDataSetter, formDataSetter, formActionType, handleFormValueChange }) => {
    useEffect(() => {
        shieldForm.setFieldsValue({
            shieldType: formData?.shield?.shieldType ? formData?.shield?.shieldType : !formActionType?.viewMode ? null : 'NA',
            shieldRate: formData?.shield?.shieldRate ? formData?.shield?.shieldRate : !formActionType?.viewMode ? null : 'NA',
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);
    const onValuesChange = () => {
        const Myvalues = shieldForm.getFieldsValue();
        setFormDataSetter({ ...formDataSetter, shield: { ...Myvalues } });
    };

    return (
        <Form form={shieldForm} onValuesChange={onValuesChange} onFieldsChange={handleFormValueChange} autoComplete="off" layout="vertical">
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label={translateContent('bookingManagement.label.shield')} name="shieldType">
                        <Input disabled={true} placeholder={preparePlaceholderText(translateContent('bookingManagement.label.shield'))} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label={translateContent('bookingManagement.label.shieldRate')} name="shieldRate" rules={[validateNumberWithTwoDecimalPlaces(translateContent('bookingManagement.label.shieldRate'))]}>
                        <Input disabled={true} placeholder={preparePlaceholderText(translateContent('bookingManagement.label.shieldRate'))} />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
};

export default ShieldForm;
