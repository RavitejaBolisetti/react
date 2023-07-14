/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Input, Form, Select, DatePicker, Switch, Card } from 'antd';

import { convertCalenderDate } from 'utils/formatDateTime';

import { validateRequiredSelectField, validateRequiredInputField } from 'utils/validation';
import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { disablePastDate } from 'utils/disableDate';

import styles from 'components/common/Common.module.css';

const { Option } = Select;

const AddEditFormMain = (props) => {
    const { formData, formActionType, typeData, salesConsultantLov, exchangeValue, loyaltyValue } = props;

    return (
        <Card className={styles.drawerCardView}>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={convertCalenderDate(formData?.initialPromiseDeliveryDate, 'YYYY/MM/DD')} label="Model Description" name="initialPromiseDeliveryDate" rules={[validateRequiredInputField('Initial Promise Delivery Date')]}>
                        <Input maxLength={10} placeholder={preparePlaceholderText('Model Description')} disabled={true} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={convertCalenderDate(formData?.custExpectedDeliveryDate, 'YYYY/MM/DD')} label="VIN" name="custExpectedDeliveryDate">
                        <Input maxLength={10} placeholder={preparePlaceholderText('VIN')} disabled={true} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.saleType} name="saleType" label="Key Number" rules={[validateRequiredSelectField('Sale Type')]}>
                        <Input maxLength={10} placeholder={preparePlaceholderText('Key Number')} disabled={true} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.priceType} label="MFG Date" name="priceType">
                        <DatePicker disabled={true} format="YYYY-MM-DD" style={{ display: 'auto', width: '100%' }} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.saleConsultant} name="saleConsultant" label="Received On" rules={[validateRequiredSelectField('Sales Consultant')]}>
                        <DatePicker disabled={true} format="YYYY-MM-DD" style={{ display: 'auto', width: '100%' }} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.bookingAmount} label="Vehicle Cost" name="bookingAmount">
                        <Input maxLength={10} placeholder={preparePlaceholderText('Vehicle Cost')} disabled={true} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.specialRequest} label="Demo Vehicle" name="specialRequest">
                        <Select placeholder="Select" showSearch allowClear options={typeData['SALE_TYP']} fieldNames={{ label: 'value', value: 'key' }} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.placeOfRegistration} label="Vehicle Status" name="placeOfRegistration">
                        <Select placeholder="Select" showSearch allowClear options={typeData['SALE_TYP']} fieldNames={{ label: 'value', value: 'key' }} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.deliveryAt} label="Physical Status" name="deliveryAt" rules={[validateRequiredSelectField('Delivery At')]}>
                        <Select placeholder="Select" showSearch allowClear options={typeData['SALE_TYP']} fieldNames={{ label: 'value', value: 'key' }} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.referral} label="Shortage" name="referral">
                        <Select placeholder="Select" showSearch allowClear options={typeData['SALE_TYP']} fieldNames={{ label: 'value', value: 'key' }} />
                    </Form.Item>
                </Col>

                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.mitraType} name="mitraType" label="Vehicle Receipt Checklist No.">
                        <Input maxLength={10} placeholder={preparePlaceholderText('Vehicle Receipt Checklist No.')} disabled={true} />
                    </Form.Item>
                </Col>
            </Row>
        </Card>
    );
};

export const AddEditForm = AddEditFormMain;
