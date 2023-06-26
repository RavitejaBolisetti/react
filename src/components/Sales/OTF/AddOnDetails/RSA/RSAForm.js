/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd. 
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Input, Form, Button } from 'antd';
import { preparePlaceholderText } from 'utils/preparePlaceholder';

const RSAForm = ({ data }) => {
    const disableProps = { disabled: !!data?.name };
    const { form } = Form.useForm();

    const onFieldsChange = () => {};
    const onFinish = (data) => {};
    const onFinishFailed = () => {};

    return (
        <Form form={form} onFieldsChange={onFieldsChange} autoComplete="off" id="rsaForm" layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label="RSA" name="rsa">
                        <Input {...disableProps} placeholder={preparePlaceholderText('RSA')} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label="RSA Rate" name="rsaRate">
                        <Input {...disableProps} placeholder={preparePlaceholderText('RSA Rate')} />
                    </Form.Item>
                </Col>
                {!data?.name && (
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Button htmlType="submit" danger type="primary">
                            Save
                        </Button>
                    </Col>
                )}
            </Row>
        </Form>
    );
};

export default RSAForm;
