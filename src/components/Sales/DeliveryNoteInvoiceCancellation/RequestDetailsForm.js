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

import styles from 'assets/sass/app.module.scss';

const { TextArea } = Input;

export const RequestDetailsForm = (props) => {
    const { invoiceStatusType } = props;
    return (
        <Row gutter={20}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                        <Form.Item label="Request Type" name="requestType" rules={[validateRequiredSelectField('Request Type')]}>
                            <Input placeholder={preparePlaceholderText('Request Type')} disabled={true} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                        <Form.Item name="requestNumber" label="Request Number" rules={[validateRequiredInputField('Request Number')]}>
                            <Input maxLength={30} placeholder={preparePlaceholderText('Request Number')} disabled={true} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                        <Form.Item name="requestStatus" label="Request Status" rules={[validateRequiredInputField('Request Status')]}>
                            <Input placeholder={preparePlaceholderText('Request Status')} disabled={true} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                        <Form.Item label="Request Date" name="requestDate" rules={[validateRequiredInputField('Request Date')]}>
                            <DatePicker format={dateFormat} className={styles.fullWidth} disabledDate={disableFutureDate} disabled={true} />
                        </Form.Item>
                    </Col>
                </Row>
                {!(invoiceStatusType === DELIVERY_NOTE_INVOICE_STATUS?.PENDING?.key) && (
                    <>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                <Form.Item label="Cancel Date" name="cancelDate" rules={[validateRequiredInputField('Cancel Date')]}>
                                    <DatePicker format={dateFormat} className={styles.fullWidth} disabledDate={disableFutureDate} disabled={true} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                <Form.Item label="Remarks" name="cancellationRequestRemark">
                                    <TextArea showCount maxLength={300} placeholder={preparePlaceholderText('remark')} disabled={true} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </>
                )}
            </Col>
        </Row>
    );
};
