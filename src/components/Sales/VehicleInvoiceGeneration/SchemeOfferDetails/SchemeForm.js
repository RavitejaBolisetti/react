/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Row, Col, Form, DatePicker, Input } from 'antd';

import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { dateFormat } from 'utils/formatDateTime';

const { TextArea } = Input;
const SchemeForm = (props) => {
    const { receiptData, formData, setOtfNumber, setReceipt } = props;

    useEffect(() => {
        if (receiptData?.receiptType) {
            setReceipt(receiptData?.receiptType);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [receiptData?.receiptType]);

    const handleChange = (value) => {
        setOtfNumber(value);
    };

    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Form.Item initialValue={formData?.schemeType} label="Scheme Type" name="schemeType">
                        <Input placeholder={preparePlaceholderText('Scheme Type')} disabled={true} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Form.Item initialValue={formData?.schemeCategory} label="Scheme Category" name="schemeCategory">
                        <Input placeholder={preparePlaceholderText('Scheme Category')} disabled={true} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Form.Item initialValue={formData?.amount} label="Amount" name="amount">
                        <Input placeholder={preparePlaceholderText('Amount')} disabled={true} />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={receiptData?.totalApportionAmount} label="Valid From" name="validFrom">
                        <DatePicker format={dateFormat} placeholder={preparePlaceholderText('valid from')} style={{ display: 'auto', width: '100%' }} disabled={true} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={receiptData?.totalApportionAmount} label="Valid To" name="validTo">
                        <DatePicker format={dateFormat} placeholder={preparePlaceholderText('valid to')} style={{ display: 'auto', width: '100%' }} disabled={true} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Form.Item label="Description" name="description" initialValue={formData?.description}>
                        <TextArea showCount maxLength={300} placeholder={preparePlaceholderText('description')} disabled={true} />
                    </Form.Item>
                </Col>
            </Row>
        </>
    );
};

export default SchemeForm;
