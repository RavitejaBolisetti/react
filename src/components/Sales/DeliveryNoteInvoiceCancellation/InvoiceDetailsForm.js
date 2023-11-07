/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Input, Form, DatePicker } from 'antd';

import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { dateFormat } from 'utils/formatDateTime';
import { disableFutureDate } from 'utils/disableDate';
import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { translateContent } from 'utils/translateContent';

import styles from 'assets/sass/app.module.scss';

export const InvoiceDetailsForm = () => {
    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                    <Form.Item label={translateContent('deliveryNoteInvoiceCancellation.label.invoiceDetailsForm.invoiceId')} name="invoiceId" rules={[validateRequiredSelectField(translateContent('deliveryNoteInvoiceCancellation.label.invoiceDetailsForm.invoiceId'))]}>
                        <Input maxLength={30} placeholder={preparePlaceholderText(translateContent('deliveryNoteInvoiceCancellation.label.invoiceDetailsForm.invoiceId'))} disabled={true} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                    <Form.Item label={translateContent('deliveryNoteInvoiceCancellation.label.invoiceDetailsForm.invoiceDate')} name="invoiceDate" rules={[validateRequiredInputField(translateContent('deliveryNoteInvoiceCancellation.label.invoiceDetailsForm.invoiceDate'))]}>
                        <DatePicker format={dateFormat} className={styles.fullWidth} disabledDate={disableFutureDate} disabled={true} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                    <Form.Item name="deliveryNoteId" label={translateContent('deliveryNoteInvoiceCancellation.label.invoiceDetailsForm.deliveryNoteId')} rules={[validateRequiredInputField(translateContent('deliveryNoteInvoiceCancellation.label.invoiceDetailsForm.deliveryNoteId'))]}>
                        <Input maxLength={30} placeholder={preparePlaceholderText(translateContent('deliveryNoteInvoiceCancellation.label.invoiceDetailsForm.deliveryNoteId'))} disabled={true} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                    <Form.Item label={translateContent('deliveryNoteInvoiceCancellation.label.invoiceDetailsForm.deliveryNoteDate')} name="deliveryNoteDate" rules={[validateRequiredInputField(translateContent('deliveryNoteInvoiceCancellation.label.invoiceDetailsForm.deliveryNoteDate'))]}>
                        <DatePicker format={dateFormat} className={styles.fullWidth} disabledDate={disableFutureDate} disabled={true} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                    <Form.Item name="deliveryNoteStatus" label={translateContent('deliveryNoteInvoiceCancellation.label.invoiceDetailsForm.deliveryNoteStatus')} rules={[validateRequiredInputField(translateContent('deliveryNoteInvoiceCancellation.label.invoiceDetailsForm.deliveryNoteStatus'))]}>
                        <Input maxLength={30} placeholder={preparePlaceholderText(translateContent('deliveryNoteInvoiceCancellation.label.invoiceDetailsForm.deliveryNoteStatus'))} disabled={true} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                    <Form.Item name="customerId" label={translateContent('deliveryNoteInvoiceCancellation.label.invoiceDetailsForm.customerId')} rules={[validateRequiredInputField(translateContent('deliveryNoteInvoiceCancellation.label.invoiceDetailsForm.customerId'))]}>
                        <Input maxLength={30} placeholder={preparePlaceholderText(translateContent('deliveryNoteInvoiceCancellation.label.invoiceDetailsForm.customerId'))} disabled={true} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                    <Form.Item name="customerName" label={translateContent('deliveryNoteInvoiceCancellation.label.invoiceDetailsForm.customerName')} rules={[validateRequiredInputField(translateContent('deliveryNoteInvoiceCancellation.label.invoiceDetailsForm.customerName'))]}>
                        <Input maxLength={30} placeholder={preparePlaceholderText(translateContent('deliveryNoteInvoiceCancellation.label.invoiceDetailsForm.customerName'))} disabled={true} />
                    </Form.Item>
                </Col>
            </Row>
        </>
    );
};
