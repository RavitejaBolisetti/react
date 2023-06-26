/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import { Row, Col, Input, Form } from 'antd';
import { preparePlaceholderText } from 'utils/preparePlaceholder';

const ShieldForm = ({ formData, shieldForm }) => {
    const [isReadOnly, setisReadOnly] = useState(false);
    useEffect(() => {
        if (Object?.keys(formData['shield'])?.length) {
            setisReadOnly(true);
            shieldForm.setFieldsValue({
                ...formData['shield'],
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);
    const onFieldsChange = () => {};
    const onFinishFailed = () => {};

    return (
        <Form form={shieldForm} onFieldsChange={onFieldsChange} autoComplete="off" id="shieldForm" layout="vertical" onFinishFailed={onFinishFailed}>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label="Shield" name="shieldType">
                        <Input disabled={isReadOnly} placeholder={preparePlaceholderText('Shield')} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item label="Shield Rate" name="shieldRate">
                        <Input disabled={isReadOnly} placeholder={preparePlaceholderText('Shield Rate')} />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
};

export default ShieldForm;
