/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Input, DatePicker, Row, Col, Form } from 'antd';

import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { dateFormat } from 'utils/formatDateTime';
import { validationFieldLetterAndNumber, validateRequiredInputField, validateNumberWithTwoDecimalPlaces } from 'utils/validation';
import { translateContent } from 'utils/translateContent';

const { Search } = Input;
const NeftFormBase = (props) => {
    const { formData, handleChange, handlePaymentSearch } = props;

    return (
        <>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.receivedAmount} label={translateContent('receipts.label.receiptDetails.receivedAmount')} name="receivedAmount" rules={[validateRequiredInputField(translateContent('receipts.validation.receivedAmount')), validateNumberWithTwoDecimalPlaces(translateContent('receipts.validation.receivedAmount'))]}>
                        <Input placeholder={preparePlaceholderText(translateContent('receipts.placeholder.receivedAmount'))} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.transactionNumber} label={translateContent('receipts.label.receiptDetails.transactionNumber')} name="transactionNumber" rules={[validationFieldLetterAndNumber(translateContent('receipts.validation.transactionNumber'))]}>
                        <Input placeholder={preparePlaceholderText(translateContent('receipts.placeholder.transactionNumber'))} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.transactionDate} label={translateContent('receipts.label.receiptDetails.transactionDate')} name="transactionDate">
                        <DatePicker format={dateFormat} placeholder={preparePlaceholderText(translateContent('receipts.placeholder.transactionDate'))} style={{ display: 'auto', width: '100%' }} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.paymentBankPartyId} label={translateContent('receipts.label.receiptDetails.paymentBankPartyId')} name="paymentBankPartyId" rules={[validationFieldLetterAndNumber(translateContent('receipts.validation.paymentBankPartyId'))]}>
                        <Search allowClear onChange={handleChange} onSearch={handlePaymentSearch} placeholder={preparePlaceholderText(translateContent('receipts.placeholder.paymentBankPartyId'))} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.paymentBankName} label={translateContent('receipts.label.receiptDetails.paymentBankName')} name="paymentBankName">
                        <Input placeholder={preparePlaceholderText(translateContent('receipts.placeholder.paymentBankName'))} disabled={true} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.paymentBankLocation} label={translateContent('receipts.label.receiptDetails.paymentBankLocation')} name="paymentBankLocation">
                        <Input placeholder={preparePlaceholderText(translateContent('receipts.placeholder.paymentBankLocation'))} disabled={true} />
                    </Form.Item>
                </Col>
            </Row>
        </>
    );
};

export const NeftForm = NeftFormBase;
