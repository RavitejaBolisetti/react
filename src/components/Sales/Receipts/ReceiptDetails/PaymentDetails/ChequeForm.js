/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Input, DatePicker, Row, Col, Form } from 'antd';

import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { dateFormat } from 'utils/formatDateTime';
import { validateLettersWithWhitespaces, validationFieldLetterAndNumber, validateRequiredInputField, validateNumberWithTwoDecimalPlaces, validationNumber } from 'utils/validation';
import { translateContent } from 'utils/translateContent';
import { disableFutureDate } from 'utils/disableDate';

const { Search } = Input;

const ChequeFormBase = (props) => {
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
                    <Form.Item initialValue={formData?.ddCheckNumber} label={translateContent('receipts.label.receiptDetails.chequeDDNumber')} name="ddCheckNumber" rules={[validationFieldLetterAndNumber(translateContent('receipts.validation.chequeNo')), validationNumber(translateContent('receipts.validation.chequeNo'))]}>
                        <Input maxLength={6} placeholder={preparePlaceholderText(translateContent('receipts.placeholder.chequeNo'))} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.ddCheckDate} label={translateContent('receipts.label.receiptDetails.chequeDDDate')} name="ddCheckDate">
                        <DatePicker format={dateFormat} disabledDate={disableFutureDate} placeholder={preparePlaceholderText(translateContent('receipts.placeholder.chequeDate'))} style={{ display: 'auto', width: '100%' }} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.bankName} label={translateContent('receipts.label.receiptDetails.bankName')} name="bankName" rules={[validateLettersWithWhitespaces(translateContent('receipts.validation.bankName'))]}>
                        <Input placeholder={preparePlaceholderText(translateContent('receipts.placeholder.bankName'))} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.bankLocationName} label={translateContent('receipts.label.receiptDetails.bankLocation')} name="bankLocationName" rules={[validateLettersWithWhitespaces(translateContent('receipts.validation.bankLocationName'))]}>
                        <Input placeholder={preparePlaceholderText(translateContent('receipts.placeholder.bankLocation'))} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.paymentBankPartyId} label={translateContent('receipts.label.receiptDetails.paymentBankPartyId')} name="paymentBankPartyId" rules={[validationFieldLetterAndNumber(translateContent('receipts.validation.paymentBankPartyId'))]}>
                        <Search allowClear onChange={handleChange} onSearch={handlePaymentSearch} placeholder={preparePlaceholderText(translateContent('receipts.placeholder.paymentBankPartyId'))} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
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

export const ChequeForm = ChequeFormBase;
