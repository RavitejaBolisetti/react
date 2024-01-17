/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Input, Row, Col, Form, Divider } from 'antd';

import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { validationFieldLetterAndNumber, validateNumberWithTwoDecimalPlaces, validateRequiredInputField, DecimalPercentageValidation } from 'utils/validation';
import { translateContent } from 'utils/translateContent';

const CreditFormBase = (props) => {
    const { formData } = props;

    return (
        <>
            <Divider />
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.creditCardTransNumber} label={translateContent('receipts.label.receiptDetails.creditCardTransactionsNumber')} name="creditCardTransNumber" rules={[validationFieldLetterAndNumber(translateContent('receipts.validation.creditCardTransactionsNumber'))]}>
                        <Input placeholder={preparePlaceholderText(translateContent('receipts.placeholder.creditCardTransactionsNumber'))} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.receivedAmount} label={translateContent('receipts.label.receiptDetails.receivedAmount')} name="receivedAmount" rules={[validateRequiredInputField(translateContent('receipts.validation.receivedAmount')), validateNumberWithTwoDecimalPlaces(translateContent('receipts.validation.receivedAmount'))]}>
                        <Input placeholder={preparePlaceholderText(translateContent('receipts.placeholder.receivedAmount'))} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.ccServiceChargePercentage} label={translateContent('receipts.label.receiptDetails.serviceChargePercentage')} name="ccServiceChargePercentage" rules={[DecimalPercentageValidation(translateContent('receipts.validation.serviceChargePercentage'))]}>
                        <Input placeholder={preparePlaceholderText(translateContent('receipts.label.receiptDetails.serviceChargePercentage'))} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.ccServiceChargeAmount} label={translateContent('receipts.label.receiptDetails.serviceChargeAmount')} name="ccServiceChargeAmount" rules={[validateNumberWithTwoDecimalPlaces(translateContent('receipts.validation.serviceChargeAmount'))]}>
                        <Input placeholder={preparePlaceholderText(translateContent('receipts.label.receiptDetails.serviceChargeAmount'))} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.taxChargeAmount} label={translateContent('receipts.label.receiptDetails.taxOnServiceCharge')} name="taxChargeAmount" rules={[validateNumberWithTwoDecimalPlaces(translateContent('receipts.validation.taxOnServiceCharge'))]}>
                        <Input placeholder={preparePlaceholderText(translateContent('receipts.placeholder.taxOnServiceCharge'))} />
                    </Form.Item>
                </Col>
            </Row>
        </>
    );
};

export const CreditForm = CreditFormBase;
