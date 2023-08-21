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

const { Search } = Input;

const ChequeFormBase = (props) => {
    const { formData, handleChange, handlePaymentSearch } = props;

    return (
        <>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.receivedAmount} label="Receive Amount" name="receivedAmount" rules={[validateRequiredInputField('received amount'), validateNumberWithTwoDecimalPlaces('received amount')]}>
                        <Input placeholder={preparePlaceholderText('received amount')} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.ddCheckNumber} label="Cheque/DD No." name="ddCheckNumber" rules={[validationFieldLetterAndNumber('cheque no'), validationNumber('cheque no')]}>
                        <Input maxLength={6} placeholder={preparePlaceholderText('Cheque/DD No.')} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.ddCheckDate} label="Cheque/DD Date" name="ddCheckDate">
                        <DatePicker format={dateFormat} placeholder={preparePlaceholderText('cheque/dd date')} style={{ display: 'auto', width: '100%' }} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.bankName} label="Bank Name" name="bankName" rules={[validateLettersWithWhitespaces('bank name')]}>
                        <Input placeholder={preparePlaceholderText('Bank Name')} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.bankLocationName} label="Bank Location" name="bankLocationName" rules={[validateLettersWithWhitespaces('bank location')]}>
                        <Input placeholder={preparePlaceholderText('Bank Location')} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.paymentBankPartyId} label="Payment Bank Party ID" name="paymentBankPartyId" rules={[validationFieldLetterAndNumber('payment bank Id')]}>
                        <Search allowClear onChange={handleChange} onSearch={handlePaymentSearch} placeholder={preparePlaceholderText('Payment Bank Party ID')} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.partyName} label="Payment Bank Name" name="partyName">
                        <Input placeholder={preparePlaceholderText('Payment Bank Name')} disabled={true} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.partyLocationCode} label="Payment Bank Location" name="partyLocationCode">
                        <Input placeholder={preparePlaceholderText('Payment Bank Location')} disabled={true} />
                    </Form.Item>
                </Col>
            </Row>
        </>
    );
};

export const ChequeForm = ChequeFormBase;
