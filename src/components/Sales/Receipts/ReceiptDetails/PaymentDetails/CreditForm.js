/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Input, Row, Col, Form } from 'antd';

import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { validationNumber, validationFieldLetterAndNumber, validateNumberWithTwoDecimalPlaces } from 'utils/validation';

const CreditFormBase = (props) => {
    const { formData } = props;

    return (
        <>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.creditCardTransNumber} label="Credit Card Transaction No." name="creditCardTransNumber" rules={[validationFieldLetterAndNumber('credit card transaction no')]}>
                        <Input placeholder={preparePlaceholderText('Credit Card Transaction No')} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.receivedAmount} label="Receive Amount" name="receivedAmount" rules={[validationNumber('received amount')]}>
                        <Input placeholder={preparePlaceholderText('received amount')} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.ccServiceChargePercentage} label="Service Charge Percentage" name="ccServiceChargePercentage" rules={[validateNumberWithTwoDecimalPlaces('service charge percentage')]}>
                        <Input placeholder={preparePlaceholderText('Service Charge Percentage')} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.ccServiceChargeAmount} label="Service Charge Amount" name="ccServiceChargeAmount" rules={[validateNumberWithTwoDecimalPlaces('service charge amount')]}>
                        <Input placeholder={preparePlaceholderText('Service Charge Amount')} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.taxChargeAmount} label="Tax On Service Charge" name="taxChargeAmount" rules={[validateNumberWithTwoDecimalPlaces('tax on service charge')]}>
                        <Input placeholder={preparePlaceholderText('Tax On Service Charge')} />
                    </Form.Item>
                </Col>
            </Row>
        </>
    );
};

export const CreditForm = CreditFormBase;
