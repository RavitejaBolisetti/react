/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Input, Form } from 'antd';

import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { validateRequiredInputField } from 'utils/validation';
import { translateContent } from 'utils/translateContent';

export const VoucherDetailsForm = (props) => {
    const { formType, formData } = props;

    return (
        <>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name={[formType, 'totalSettledAmount']} label={translateContent('creditDebitNote.voucherAndPartyDetails.label.totalSettledAmount')} initialValue={formData?.totalSettledAmount} rules={[validateRequiredInputField(translateContent('creditDebitNote.voucherAndPartyDetails.label.totalSettledAmount'))]}>
                        <Input maxLength={6} placeholder={preparePlaceholderText(translateContent('creditDebitNote.voucherAndPartyDetails.placeholder.totalSettledAmount'))} disabled={true} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name={[formType, 'totalWriteOffAmount']} label={translateContent('creditDebitNote.voucherAndPartyDetails.label.totalWrite-OffAmount')} initialValue={formData?.totalWriteOffAmount} rules={[validateRequiredInputField(translateContent('creditDebitNote.voucherAndPartyDetails.label.totalWrite-OffAmount'))]}>
                        <Input placeholder={preparePlaceholderText(translateContent('creditDebitNote.voucherAndPartyDetails.label.totalWrite-OffAmount'))} disabled={true} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name={[formType, 'totalApportionedAmount']} label={translateContent('creditDebitNote.voucherAndPartyDetails.label.totalApportionedAmount')} initialValue={formData?.totalApportionedAmount} rules={[validateRequiredInputField(translateContent('creditDebitNote.voucherAndPartyDetails.label.totalApportionedAmount'))]}>
                        <Input placeholder={preparePlaceholderText(translateContent('creditDebitNote.voucherAndPartyDetails.label.totalApportionedAmount'))} disabled={true} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name={[formType, 'totalAmount']} label={translateContent('creditDebitNote.voucherAndPartyDetails.label.totalAmount')} initialValue={formData?.totalAmount} rules={[validateRequiredInputField(translateContent('creditDebitNote.voucherAndPartyDetails.label.totalAmount'))]}>
                        <Input placeholder={preparePlaceholderText(translateContent('creditDebitNote.voucherAndPartyDetails.label.totalAmount'))} disabled={true} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name={[formType, 'totalBalancedAmount']} label={translateContent('creditDebitNote.voucherAndPartyDetails.label.totalBalancedAmount')} initialValue={formData?.totalBalancedAmount} rules={[validateRequiredInputField(translateContent('creditDebitNote.voucherAndPartyDetails.label.totalBalancedAmount'))]}>
                        <Input placeholder={preparePlaceholderText(translateContent('creditDebitNote.voucherAndPartyDetails.label.totalBalancedAmount'))} disabled={true} />
                    </Form.Item>
                </Col>
            </Row>
        </>
    );
};
