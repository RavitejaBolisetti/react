/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Input, Form, DatePicker, Switch, Card } from 'antd';

import { formattedCalendarDate, dateFormat } from 'utils/formatDateTime';
import { noWhiteSpaceinBeginning, validateRequiredSelectField } from 'utils/validation';

import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { customSelectBox } from 'utils/customSelectBox';
import { prepareCaption } from 'utils/prepareCaption';

import styles from 'assets/sass/app.module.scss';

const AddEditFormMain = (props) => {
    const { formData, disabledProps, formActionType, typeData, salesConsultantLov,handleDeliveryChange } = props;

    return (
        <Card className={styles.drawerCardView}>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    {prepareCaption('Order Details')}
                </Col>
            </Row>

            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.bookingAmount} label="Booking Amount" name="bookingAmount">
                        <Input maxLength={10} placeholder={preparePlaceholderText('Booking Amount')} disabled={formActionType?.editMode ? true : false} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item rules={[noWhiteSpaceinBeginning()]} initialValue={formData?.placeOfRegistration} label="Place Of Registration" name="placeOfRegistration">
                        <Input maxLength={50} placeholder={preparePlaceholderText('Place Of Registration')} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item rules={[noWhiteSpaceinBeginning()]} initialValue={formData?.specialRequest} label="Special Request" name="specialRequest">
                        <Input maxLength={50} placeholder={preparePlaceholderText('Special Request')} />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.modeOfPAyment} label="Mode Of Payment" name="modeOfPAyment">
                        <Input maxLength={50} placeholder={preparePlaceholderText('Mode Of Payment')} disabled={formActionType?.editMode ? true : false} />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    {prepareCaption('Delivery Details')}
                </Col>
            </Row>

            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formattedCalendarDate(formData?.initialPromiseDeliveryDate)} label="Initial Promise Delivery Date" name="initialPromiseDeliveryDate">
                        <DatePicker {...disabledProps} format={dateFormat} style={{ display: 'auto', width: '100%' }} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formattedCalendarDate(formData?.custExpectedDeliveryDate)} label="Cust. Expected Delivery Date" name="custExpectedDeliveryDate">
                        <DatePicker {...disabledProps} format={dateFormat} style={{ display: 'auto', width: '100%' }} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.deliveryAt} label="Delivery At" name="deliveryAt" rules={[validateRequiredSelectField('delivery at')]}>
                        {customSelectBox({ data: typeData['DELIVERYAT_IND'], onChange : handleDeliveryChange })}
                    </Form.Item>
                </Col>  
            </Row>

            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    {prepareCaption('Sales Details')}
                </Col>
            </Row>

            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.saleConsultant} name="saleConsultant" label="Sales Consultant" rules={[validateRequiredSelectField('sales consultant')]}>
                        {customSelectBox({ data: salesConsultantLov })}
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.mitraType} name="mitraType" label="Influencer/Mitra Type">
                        <Input maxLength={50} placeholder={preparePlaceholderText('Influencer/Mitra Type')} disabled={formActionType?.editMode ? true : false} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.mitraName} name="mitraName" label="Influencer/Mitra Name">
                        <Input maxLength={50} placeholder={preparePlaceholderText('Influencer/Mitra Name')} disabled={formActionType?.editMode ? true : false} />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    {prepareCaption('Other Details')}
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formActionType?.editMode ? (formData?.referral === 'Y' ? true : false) : false} labelAlign="left" wrapperCol={{ span: 24 }} name="referral" label="Referral" valuePropName="checked">
                        <Switch checkedChildren="Yes" unCheckedChildren="No" valuePropName="checked" onChange={(checked) => (checked ? 'Y' : 'N')} />
                    </Form.Item>
                </Col>

                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formActionType?.editMode ? (formData?.loyaltyScheme === 1 ? true : false) : false} labelAlign="left" wrapperCol={{ span: 24 }} name="loyaltyScheme" label="Loyalty Scheme" valuePropName="checked">
                        <Switch checkedChildren="Yes" unCheckedChildren="No" valuePropName="checked" onChange={(checked) => (checked ? 1 : 0)} />
                    </Form.Item>
                </Col>
            </Row>
        </Card>
    );
};

export const AddEditForm = AddEditFormMain;
