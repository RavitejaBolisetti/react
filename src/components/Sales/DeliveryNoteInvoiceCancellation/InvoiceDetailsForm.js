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

import styles from 'assets/sass/app.module.scss';

export const InvoiceDetailsForm = () => {
    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                    <Form.Item label="Invoice ID" name="invoiceId" rules={[validateRequiredSelectField('Invoice ID')]}>
                        <Input maxLength={30} placeholder={preparePlaceholderText('Invoice ID')} disabled={true} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                    <Form.Item label="Invoice Date" name="invoiceDate" rules={[validateRequiredInputField('Invoice Date')]}>
                        <DatePicker format={dateFormat} className={styles.fullWidth} disabledDate={disableFutureDate} disabled={true} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                    <Form.Item name="deliveryNoteId" label="Delivery Note ID" rules={[validateRequiredInputField('Delivery Note ID')]}>
                        <Input maxLength={30} placeholder={preparePlaceholderText('Delivery Note ID')} disabled={true} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                    <Form.Item label="Delivery Note Date" name="deliveryNoteDate" rules={[validateRequiredInputField('Delivery Note Date')]}>
                        <DatePicker format={dateFormat} className={styles.fullWidth} disabledDate={disableFutureDate} disabled={true} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                    <Form.Item name="deliveryNoteStatus" label="Delivery Note Status" rules={[validateRequiredInputField('Delivery Note Status')]}>
                        <Input maxLength={30} placeholder={preparePlaceholderText('Delivery Note Status')} disabled={true} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                    <Form.Item name="customerId" label="Customer ID" rules={[validateRequiredInputField('Customer ID')]}>
                        <Input maxLength={30} placeholder={preparePlaceholderText('Customer ID')} disabled={true} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                    <Form.Item name="customerName" label="Customer Name" rules={[validateRequiredInputField('Customer Name')]}>
                        <Input maxLength={30} placeholder={preparePlaceholderText('Customer Name')} disabled={true} />
                    </Form.Item>
                </Col>
            </Row>
        </>
    );
};
