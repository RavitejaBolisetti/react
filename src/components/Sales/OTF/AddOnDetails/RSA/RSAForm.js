/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Row, Col, Input, Form, Button } from 'antd';
import { preparePlaceholderText } from 'utils/preparePlaceholder';

const RSAForm = ({ formData, rsaForm }) => {
    useEffect(() => {
        if (Object?.keys(formData['rsa'])?.length) {
            rsaForm.setFieldsValue({
                ...formData['rsa'],
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);

    const onFieldsChange = () => {};
    const onFinish = (data) => {};
    const onFinishFailed = () => {};

    return (
        <Form form={rsaForm} onFieldsChange={onFieldsChange} autoComplete="off" id="rsaForm" layout="vertical" onFinishFailed={onFinishFailed}>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label="RSA" name="rsa">
                        <Input placeholder={preparePlaceholderText('RSA')} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label="RSA Rate" name="rsaRate">
                        <Input placeholder={preparePlaceholderText('RSA Rate')} />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
};

export default RSAForm;
