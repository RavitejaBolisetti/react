/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Input, DatePicker, Row, Col, Form } from 'antd';

import { validateRequiredInputField, validateNumberWithTwoDecimalPlaces } from 'utils/validation';
import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { dateFormat } from 'utils/formatDateTime';
import { translateContent } from 'utils/translateContent';

const CashFormBase = (props) => {
    const { formData } = props;

    return (
        <>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.receivedAmount} label={translateContent('receipts.label.apportionDetails.receivedAmount')} name="receivedAmount" rules={[validateRequiredInputField(translateContent('receipts.validation.receivedAmount')), validateNumberWithTwoDecimalPlaces(translateContent('receipts.validation.receivedAmount'))]}>
                        <Input placeholder={preparePlaceholderText(translateContent('receipts.placeholder.receivedAmount'))} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.transactionDate} label={translateContent('receipts.label.receiptDetails.transactionDate')} name="transactionDate">
                        <DatePicker format={dateFormat} placeholder={preparePlaceholderText(translateContent('receipts.placeholder.receivedAmount'))} style={{ display: 'auto', width: '100%' }} />
                    </Form.Item>
                </Col>
            </Row>
        </>
    );
};

export const CashForm = CashFormBase;
