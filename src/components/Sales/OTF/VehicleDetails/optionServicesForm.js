/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Col, Input, Form, Row, Select, Button, Space, Collapse, Typography, Divider } from 'antd';
import { preparePlaceholderText } from 'utils/preparePlaceholder';

import styles from 'components/common/Common.module.css';

const OptionServicesFormMain = (props) => {
    const { handleCancel } = props;
    const [optionForm] = Form.useForm();

    const onFinish = (values) => {
        console.log('values', values);
    };
    const onFinishFailed = () => {
        optionForm
            .validateFields()
            .then(() => {})
            .catch(() => {});
    };

    return (
        <Row gutter={20}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Form autoComplete="off" layout="vertical" form={optionForm} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                            <Form.Item label="Service Name" name="serviceName">
                                <Input maxLength={50} placeholder={preparePlaceholderText('Service Name')} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                            <Form.Item label="Amount" name="amount">
                                <Input maxLength={50} placeholder={preparePlaceholderText('Amount')} />
                            </Form.Item>
                        </Col>
                        <Col style={{ marginTop: '28px' }} xs={24} sm={24} md={4} lg={4} xl={4}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Button style={{ marginLeft: '20px' }} htmlType="submit" type="primary">
                                    Save
                                </Button>
                                <Button style={{ marginLeft: '20px' }} onClick={handleCancel} danger>
                                    Cancel
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </Col>
        </Row>
    );
};

export const OptionServicesForm = OptionServicesFormMain;
