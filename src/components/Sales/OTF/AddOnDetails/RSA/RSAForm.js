/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import { Row, Col, Input, Form } from 'antd';
import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { validateNumberWithTwoDecimalPlaces } from 'utils/validation';

const RSAForm = ({ formData, rsaForm, setformDataSetter, formDataSetter, formActionType, handleFormValueChange }) => {
    const [isReadOnly, setisReadOnly] = useState(false);

    useEffect(() => {
        if ((formData === undefined || formData?.id === null || formData?.id === '') && !formActionType?.viewMode) {
            setisReadOnly(false);
        } else {
            setisReadOnly(true);
            rsaForm.setFieldsValue({
                rsa: formData?.rsa?.rsa ? formData?.rsa?.rsa : !formActionType?.viewMode ? null : 'NA',
                rsaRate: formData?.rsa?.rsaRate ? formData?.rsa?.rsaRate : !formActionType?.viewMode ? null : 'NA',
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);

    const onFinishFailed = () => {};
    const onValuesChange = (values) => {
        const Myvalues = rsaForm.getFieldsValue();
        setformDataSetter({ ...formDataSetter, rsa: { ...Myvalues } });
    };

    return (
        <Form form={rsaForm} onValuesChange={onValuesChange} onFieldsChange={handleFormValueChange} autoComplete="off" id="rsaForm" layout="vertical" onFinishFailed={onFinishFailed}>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label="RSA" name="rsa">
                        <Input disabled={isReadOnly} placeholder={preparePlaceholderText('RSA')} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label="RSA Rate" name="rsaRate" rules={[validateNumberWithTwoDecimalPlaces('RSA Rate')]}>
                        <Input disabled={isReadOnly} placeholder={preparePlaceholderText('RSA Rate')} />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
};

export default RSAForm;
