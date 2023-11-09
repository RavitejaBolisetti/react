/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Col, Input, Form, Row, DatePicker } from 'antd';

import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { dateFormat } from 'utils/formatDateTime';
import { disableFutureDate } from 'utils/disableDate';
import { DELIVERY_NOTE_INVOICE_STATUS } from './utils/DeliveryNoteInvoiceStatus';

import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { translateContent } from 'utils/translateContent';

import styles from 'assets/sass/app.module.scss';

const { TextArea } = Input;

export const RequestDetailsForm = (props) => {
    const { invoiceStatusType } = props;
    return (
        <Row gutter={20}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                        <Form.Item label={translateContent('deliveryNoteInvoiceCancellation.label.requestType')} name="requestType" rules={[validateRequiredSelectField(translateContent('deliveryNoteInvoiceCancellation.label.requestType'))]}>
                            <Input placeholder={preparePlaceholderText(translateContent('deliveryNoteInvoiceCancellation.label.requestType'))} disabled={true} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                        <Form.Item name="requestNumber" label={translateContent('deliveryNoteInvoiceCancellation.label.requestNumber')} rules={[validateRequiredInputField(translateContent('deliveryNoteInvoiceCancellation.label.requestNumber'))]}>
                            <Input maxLength={30} placeholder={preparePlaceholderText(translateContent('deliveryNoteInvoiceCancellation.label.requestNumber'))} disabled={true} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                        <Form.Item name="requestStatus" label={translateContent('deliveryNoteInvoiceCancellation.label.requestStatus')} rules={[validateRequiredInputField(translateContent('deliveryNoteInvoiceCancellation.label.requestStatus'))]}>
                            <Input placeholder={preparePlaceholderText(translateContent('deliveryNoteInvoiceCancellation.label.requestStatus'))} disabled={true} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                        <Form.Item label={translateContent('deliveryNoteInvoiceCancellation.label.requestDate')} name="requestDate" rules={[validateRequiredInputField(translateContent('deliveryNoteInvoiceCancellation.label.requestDate'))]}>
                            <DatePicker format={dateFormat} className={styles.fullWidth} disabledDate={disableFutureDate} disabled={true} />
                        </Form.Item>
                    </Col>
                </Row>
                {!(invoiceStatusType === DELIVERY_NOTE_INVOICE_STATUS?.PENDING?.key) && (
                    <>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                <Form.Item label={translateContent('deliveryNoteInvoiceCancellation.label.RequestDetailsForm.cancelDate')} name="cancelDate" rules={[validateRequiredInputField(translateContent('deliveryNoteInvoiceCancellation.label.RequestDetailsForm.cancelDate'))]}>
                                    <DatePicker format={dateFormat} className={styles.fullWidth} disabledDate={disableFutureDate} disabled={true} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                <Form.Item label={translateContent('deliveryNoteInvoiceCancellation.label.RequestDetailsForm.remarks')} name="cancellationRequestRemark">
                                    <TextArea showCount maxLength={300} placeholder={preparePlaceholderText(translateContent('deliveryNoteInvoiceCancellation.label.RequestDetailsForm.remarks'))} disabled={true} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </>
                )}
            </Col>
        </Row>
    );
};
