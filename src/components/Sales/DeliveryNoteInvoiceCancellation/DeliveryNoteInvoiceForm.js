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

export const DeliveryNoteInvoiceForm = () => {
    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                    <Form.Item label={translateContent('deliveryNoteInvoiceCancellation.label.deliveryNoteInvoice.deliveryNoteId')} name="deliveryNoteId" rules={[validateRequiredSelectField(translateContent('deliveryNoteInvoiceCancellation.label.deliveryNoteInvoice.deliveryNoteId'))]}>
                        <Input maxLength={30} placeholder={preparePlaceholderText(translateContent('deliveryNoteInvoiceCancellation.label.deliveryNoteInvoice.deliveryNoteId'))} disabled={true} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                    <Form.Item label={translateContent('deliveryNoteInvoiceCancellation.label.deliveryNoteInvoice.deliveryNoteDate')} name="deliveryNoteDate" rules={[validateRequiredInputField(translateContent('deliveryNoteInvoiceCancellation.label.deliveryNoteInvoice.deliveryNoteDate'))]}>
                        <DatePicker format={dateFormat} className={styles.fullWidth} disabledDate={disableFutureDate} disabled={true} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                    <Form.Item name="invoiceId" label={translateContent('deliveryNoteInvoiceCancellation.label.deliveryNoteInvoice.invoiceId')} rules={[validateRequiredInputField(translateContent('deliveryNoteInvoiceCancellation.label.deliveryNoteInvoice.invoiceId'))]}>
                        <Input maxLength={30} placeholder={preparePlaceholderText(translateContent('deliveryNoteInvoiceCancellation.label.deliveryNoteInvoice.invoiceId'))} disabled={true} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                    <Form.Item label={translateContent('deliveryNoteInvoiceCancellation.label.deliveryNoteInvoice.invoiceDate')} name="invoiceDate" rules={[validateRequiredInputField(translateContent('deliveryNoteInvoiceCancellation.label.deliveryNoteInvoice.invoiceDate'))]}>
                        <DatePicker format={dateFormat} className={styles.fullWidth} disabledDate={disableFutureDate} disabled={true} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                    <Form.Item name="invoiceStatus" label={translateContent('deliveryNoteInvoiceCancellation.label.deliveryNoteInvoice.invoiceStatus')} rules={[validateRequiredInputField(translateContent('deliveryNoteInvoiceCancellation.label.deliveryNoteInvoice.invoiceStatus'))]}>
                        <Input maxLength={30} placeholder={preparePlaceholderText(translateContent('deliveryNoteInvoiceCancellation.label.deliveryNoteInvoice.invoiceStatus'))} disabled={true} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                    <Form.Item name="customerId" label={translateContent('deliveryNoteInvoiceCancellation.label.deliveryNoteInvoice.customerId')} rules={[validateRequiredInputField(translateContent('deliveryNoteInvoiceCancellation.label.deliveryNoteInvoice.customerId'))]}>
                        <Input maxLength={30} placeholder={preparePlaceholderText(translateContent('deliveryNoteInvoiceCancellation.label.deliveryNoteInvoice.customerId'))} disabled={true} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                    <Form.Item name="customerName" label={translateContent('deliveryNoteInvoiceCancellation.label.deliveryNoteInvoice.customerName')} rules={[validateRequiredInputField(translateContent('deliveryNoteInvoiceCancellation.label.deliveryNoteInvoice.customerName'))]}>
                        <Input maxLength={30} placeholder={preparePlaceholderText(translateContent('deliveryNoteInvoiceCancellation.label.deliveryNoteInvoice.customerName'))} disabled={true} />
                    </Form.Item>
                </Col>
            </Row>
        </>
    );
};
