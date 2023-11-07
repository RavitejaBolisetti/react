/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import { Row, Col, Input, Form } from 'antd';
import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { validateNumberWithTwoDecimalPlaces } from 'utils/validation';
import { translateContent } from 'utils/translateContent';

const AMCForm = ({ formData, amcForm, setFormDataSetter, formDataSetter, formActionType, handleFormValueChange }) => {
    const [isReadOnly, setisReadOnly] = useState(false);

    useEffect(() => {
        if ((formData === undefined || formData?.id === null || formData?.id === '') && !formActionType?.viewMode) {
            setisReadOnly(false);
        } else {
            setisReadOnly(true);
            amcForm.setFieldsValue({
                amc: formData?.amc?.amc ? formData?.amc?.amc : !formActionType?.viewMode ? null : 'NA',
                amcRate: formData?.amc?.amcRate ? formData?.amc?.amcRate : !formActionType?.viewMode ? null : 'NA',
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);

    const onValuesChange = () => {
        const Myvalues = amcForm.getFieldsValue();
        setFormDataSetter({ ...formDataSetter, shield: { ...Myvalues } });
    };

    return (
        <Form form={amcForm} onValuesChange={onValuesChange} onFieldsChange={handleFormValueChange} autoComplete="off" id="rsaForm" layout="vertical">
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label={translateContent('bookingManagement.label.amc')} name="amc">
                        <Input disabled={isReadOnly} placeholder={preparePlaceholderText(translateContent('bookingManagement.label.amc'))} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label={translateContent('bookingManagement.label.amcRate')} name="amcRate" rules={[validateNumberWithTwoDecimalPlaces(translateContent('bookingManagement.label.amcRate'))]}>
                        <Input disabled={isReadOnly} placeholder={preparePlaceholderText(translateContent('bookingManagement.label.amcRate'))} />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
};

export default AMCForm;
