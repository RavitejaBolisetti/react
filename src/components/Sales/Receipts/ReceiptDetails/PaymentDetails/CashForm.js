/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Input, DatePicker, Row, Col, Form } from 'antd';

import { validationNumber } from 'utils/validation';
import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { dateFormat } from 'utils/formatDateTime';

const CashFormBase = (props) => {
    const { formData } = props;

    return (
        <>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.receivedAmount} label="Receive Amount" name="receivedAmount" rules={[validationNumber('received amount')]}>
                        <Input placeholder={preparePlaceholderText('received amount')} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.transactionDate} label="Transaction Date" name="transactionDate">
                        <DatePicker format={dateFormat} placeholder={preparePlaceholderText('transaction date')} style={{ display: 'auto', width: '100%' }} />
                    </Form.Item>
                </Col>
            </Row>
        </>
    );
};

export const CashForm = CashFormBase;
