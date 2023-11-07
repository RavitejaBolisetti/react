/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Input, Form, DatePicker, Switch, Card } from 'antd';

import { formattedCalendarDate, dateFormat } from 'utils/formatDateTime';
import { noWhiteSpaceinBeginning } from 'utils/validation';

import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { customSelectBox } from 'utils/customSelectBox';
import { prepareCaption } from 'utils/prepareCaption';
import { translateContent } from 'utils/translateContent';

const AddEditFormMain = (props) => {
    const { formData, disabledProps, formActionType, typeData, salesConsultantLov } = props;

    return (
        <Card>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    {prepareCaption(translateContent('bookingManagement.label.orderDetails'))}
                </Col>
            </Row>

            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.bookingAmount} label={translateContent('bookingManagement.label.bookingAmount')} name="bookingAmount">
                        <Input maxLength={10} placeholder={preparePlaceholderText(translateContent('bookingManagement.label.bookingAmount'))} disabled={formActionType?.editMode ? true : false} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item rules={[noWhiteSpaceinBeginning()]} initialValue={formData?.placeOfRegistration} label={translateContent('bookingManagement.label.placeOfRegistration')} name="placeOfRegistration">
                        <Input maxLength={50} placeholder={preparePlaceholderText(translateContent('bookingManagement.label.placeOfRegistration'))} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item rules={[noWhiteSpaceinBeginning()]} initialValue={formData?.specialRequest} label={translateContent('bookingManagement.label.specialRequest')} name="specialRequest">
                        <Input maxLength={50} placeholder={preparePlaceholderText(translateContent('bookingManagement.label.specialRequest'))} />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.modeOfPAyment} label={translateContent('bookingManagement.label.modeOfPAyment')} name="modeOfPAyment">
                        <Input maxLength={50} placeholder={preparePlaceholderText(translateContent('bookingManagement.label.modeOfPAyment'))} disabled={formActionType?.editMode ? true : false} />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    {prepareCaption(translateContent('bookingManagement.label.deliveryDetails'))}
                </Col>
            </Row>

            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formattedCalendarDate(formData?.initialPromiseDeliveryDate)} label={translateContent('bookingManagement.label.initialPromiseDeliveryDate')} name="initialPromiseDeliveryDate">
                        <DatePicker {...disabledProps} format={dateFormat} style={{ display: 'auto', width: '100%' }} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formattedCalendarDate(formData?.custExpectedDeliveryDate)} label={translateContent('bookingManagement.label.customerExpectedDeliveryDate')} name="custExpectedDeliveryDate">
                        <DatePicker {...disabledProps} format={dateFormat} style={{ display: 'auto', width: '100%' }} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.deliveryAt} label={translateContent('bookingManagement.label.deliveryAt')} name="deliveryAt">
                        {customSelectBox({ data: typeData['DELIVERYAT_IND'] })}
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    {prepareCaption(translateContent('bookingManagement.label.salesDetails'))}
                </Col>
            </Row>

            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.saleConsultant} name="saleConsultant" label={translateContent('bookingManagement.label.saleConsultant')}>
                        {customSelectBox({ data: salesConsultantLov })}
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.mitraType} name="mitraType" label={translateContent('bookingManagement.label.mitraType')}>
                        <Input maxLength={50} placeholder={preparePlaceholderText(translateContent('bookingManagement.label.mitraType'))} disabled={formActionType?.editMode ? true : false} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.mitraName} name="mitraName" label={translateContent('bookingManagement.label.mitraName')}>
                        <Input maxLength={50} placeholder={preparePlaceholderText(translateContent('bookingManagement.label.mitraName'))} disabled={formActionType?.editMode ? true : false} />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    {prepareCaption(translateContent('bookingManagement.label.otherDetails'))}
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formActionType?.editMode ? (formData?.referral === 'Y' ? true : false) : false} labelAlign="left" wrapperCol={{ span: 24 }} name="referral" label={translateContent('bookingManagement.label.referralScheme')} valuePropName="checked">
                        <Switch checkedChildren={translateContent('global.yesNo.yes')} unCheckedChildren={translateContent('global.yesNo.no')} valuePropName="checked" onChange={(checked) => (checked ? 'Y' : 'N')} />
                    </Form.Item>
                </Col>

                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formActionType?.editMode ? (formData?.loyaltyScheme === 1 ? true : false) : false} labelAlign="left" wrapperCol={{ span: 24 }} name="loyaltyScheme" label={translateContent('bookingManagement.label.loyaltyScheme')} valuePropName="checked">
                        <Switch checkedChildren={translateContent('global.yesNo.yes')} unCheckedChildren={translateContent('global.yesNo.no')} valuePropName="checked" onChange={(checked) => (checked ? 1 : 0)} />
                    </Form.Item>
                </Col>
            </Row>
        </Card>
    );
};

export const AddEditForm = AddEditFormMain;
