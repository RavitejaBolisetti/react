/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import { Row, Col, Input, Form, Button } from 'antd';
import { preparePlaceholderText } from 'utils/preparePlaceholder';

const AMCForm = ({ formData, amcForm }) => {
    const [isReadOnly, setisReadOnly] = useState(false);

    useEffect(() => {
        if (Object?.keys(formData['amc'])?.length) {
            setisReadOnly(true);
            amcForm.setFieldsValue({
                ...formData['amc'],
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);

    const onFieldsChange = () => {};

    const onFinishFailed = () => {};

    return (
        <Form form={amcForm} onFieldsChange={onFieldsChange} autoComplete="off" id="rsaForm" layout="vertical" onFinishFailed={onFinishFailed}>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label="AMC" name="amc">
                        <Input disabled={isReadOnly} placeholder={preparePlaceholderText('RSA')} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label="AMC Rate" name="amcRate">
                        <Input disabled={isReadOnly} placeholder={preparePlaceholderText('amc rate')} />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
};

export default AMCForm;
