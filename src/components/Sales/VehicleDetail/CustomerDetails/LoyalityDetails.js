/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Col, Input, Form, Row } from 'antd';
import { preparePlaceholderText } from 'utils/preparePlaceholder';

export const LoyalityDetails = (props) => {
    const { formType, formData } = props;

    return (
        <>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name={[formType, 'loyalityCardNumber']} label="Loyalty Card Number" initialValue={formData?.loyalityCardNumber}>
                        <Input maxLength={6} placeholder={preparePlaceholderText('Loyalty Card Number')} disabled={true} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name={[formType, 'assuredBuyBack']} label="Assured Buy Back" initialValue={formData?.assuredBuyBack}>
                        <Input placeholder={preparePlaceholderText('Assured Buy Back')} disabled={true} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name={[formType, 'statusOfVehicle']} label="Status Of Vehicle" initialValue={formData?.statusOfVehicle}>
                        <Input placeholder={preparePlaceholderText('Status Of Vehicle')} disabled={true} />
                    </Form.Item>
                </Col>
            </Row>
        </>
    );
};
