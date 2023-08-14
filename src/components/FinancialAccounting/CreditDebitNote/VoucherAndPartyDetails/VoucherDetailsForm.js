/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Input, Form } from 'antd';

import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { validateRequiredInputField } from 'utils/validation';

export const VoucherDetailsForm = (props) => {
    const { formType, formData } = props;

    return (
        <>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name={[formType, 'totalSettledAmount']} label="Total Settled Amount" initialValue={formData?.totalSettledAmount} rules={[validateRequiredInputField('Total Settled Amount')]}>
                        <Input maxLength={6} placeholder={preparePlaceholderText('Total Settled Amount')} disabled={true} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name={[formType, 'totalWriteOffAmount']} label="Total Write-Off Amount" initialValue={formData?.totalWriteOffAmount} rules={[validateRequiredInputField('Total Write-Off Amount')]}>
                        <Input placeholder={preparePlaceholderText('Total Write-Off Amount')} disabled={true} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name={[formType, 'totalApportionedAmount']} label="Total Apportioned Amount" initialValue={formData?.totalApportionedAmount} rules={[validateRequiredInputField('Total Apportioned Amount')]}>
                        <Input placeholder={preparePlaceholderText('Total Apportioned Amount')} disabled={true} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name={[formType, 'totalAmount']} label="Total Amount" initialValue={formData?.totalAmount} rules={[validateRequiredInputField('Total Amount')]}>
                        <Input placeholder={preparePlaceholderText('Total Amount')} disabled={true} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name={[formType, 'totalBalancedAmount']} label="Total Balanced Amount" initialValue={formData?.totalBalancedAmount} rules={[validateRequiredInputField('Total Balanced Amount')]}>
                        <Input placeholder={preparePlaceholderText('Total Balanced Amount')} disabled={true} />
                    </Form.Item>
                </Col>
            </Row>
        </>
    );
};
