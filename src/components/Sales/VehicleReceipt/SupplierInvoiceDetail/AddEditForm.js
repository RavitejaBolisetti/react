/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Input, Form, DatePicker, Card } from 'antd';

import { formattedCalendarDate } from 'utils/formatDateTime';
import { preparePlaceholderText } from 'utils/preparePlaceholder';

import styles from 'components/common/Common.module.css';

const AddEditFormMain = (props) => {
    const { formData } = props;

    return (
        <Card className={styles.drawerCardView}>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.supplierType} label="Supplier Type" name="supplierType">
                        <Input maxLength={10} placeholder={preparePlaceholderText('Supplier Type')} disabled={true} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.supplierName} label="Supplier Name" name="supplierName">
                        <Input maxLength={10} placeholder={preparePlaceholderText('Supplier Name')} disabled={true} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.supplierInvoiceNumber} name="supplierInvoiceNumber" label="Supplier Invoice No.">
                        <Input maxLength={10} placeholder={preparePlaceholderText('Supplier Invoice')} disabled={true} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formattedCalendarDate(formData?.supplierInvoiceDate)} label="Supplier Invoice Date" name="supplierInvoiceDate">
                        <DatePicker disabled={true} style={{ display: 'auto', width: '100%' }} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.bookingAmount} label="Road Permit Number" name="bookingAmount">
                        <Input maxLength={10} placeholder={preparePlaceholderText('Road Permit No.')} disabled={true} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formattedCalendarDate(formData?.actualDispatchDate)} name="actualDispatchDate" label="Actual Dispatch Date">
                        <DatePicker disabled={true} style={{ display: 'auto', width: '100%' }} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.totalInvoiveAmount} label="Total Invoice Amount" name="totalInvoiveAmount">
                        <Input disabled={true} maxLength={50} placeholder={preparePlaceholderText('Special Request')} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.lorryRecieptNumber} label="Lorry Receipt No." name="lorryRecieptNumber">
                        <Input disabled={true} maxLength={50} placeholder={preparePlaceholderText('Place Of Registration')} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.transporter} label="Transporter" name="transporter">
                        <Input disabled={true} maxLength={50} placeholder={preparePlaceholderText('Transporter')} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.supplierGstNumber} label="Supplier GST Number" name="supplierGstNumber">
                        <Input disabled={true} maxLength={50} placeholder={preparePlaceholderText('Supplier GST Number')} />
                    </Form.Item>
                </Col>

                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formattedCalendarDate(formData?.goFencingDateAndTime)} name="goFencingDateAndTime" label="GEO Fencing Date & Time">
                        <DatePicker disabled={true} style={{ display: 'auto', width: '100%' }} />
                    </Form.Item>
                </Col>
            </Row>
        </Card>
    );
};

export const AddEditForm = AddEditFormMain;
