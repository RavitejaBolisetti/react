/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Col, Input, Form, Row } from 'antd';

import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { translateContent } from 'utils/translateContent';

const { TextArea } = Input;

export const VehicleDetailsForm = () => {
    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                    <Form.Item label={translateContent('deliveryNoteInvoiceCancellation.label.vehicleDetails.modelGroup')} name="modelGroup" rules={[validateRequiredSelectField(translateContent('deliveryNoteInvoiceCancellation.label.vehicleDetails.modelGroup'))]}>
                        <Input maxLength={30} placeholder={preparePlaceholderText(translateContent('deliveryNoteInvoiceCancellation.label.vehicleDetails.modelGroup'))} disabled={true} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                    <Form.Item label={translateContent('deliveryNoteInvoiceCancellation.label.vehicleDetails.modelVarient')} name="modelVarient" rules={[validateRequiredInputField(translateContent('deliveryNoteInvoiceCancellation.label.vehicleDetails.modelVarient'))]}>
                        <Input maxLength={30} placeholder={preparePlaceholderText(translateContent('deliveryNoteInvoiceCancellation.label.vehicleDetails.modelVarient'))} disabled={true} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                    <Form.Item name="model" label={translateContent('deliveryNoteInvoiceCancellation.label.vehicleDetails.model')} rules={[validateRequiredInputField(translateContent('deliveryNoteInvoiceCancellation.label.vehicleDetails.model'))]}>
                        <Input maxLength={30} placeholder={preparePlaceholderText(translateContent('deliveryNoteInvoiceCancellation.label.vehicleDetails.model'))} disabled={true} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                    <Form.Item label={translateContent('deliveryNoteInvoiceCancellation.label.vehicleDetails.vin')} name="vin" rules={[validateRequiredInputField(translateContent('deliveryNoteInvoiceCancellation.label.vehicleDetails.vin'))]}>
                        <Input maxLength={30} placeholder={preparePlaceholderText(translateContent('deliveryNoteInvoiceCancellation.label.vehicleDetails.vin'))} disabled={true} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                    <Form.Item name="reasonForCancellation" label={translateContent('deliveryNoteInvoiceCancellation.label.vehicleDetails.reasonForCancellation')} rules={[validateRequiredInputField(translateContent('deliveryNoteInvoiceCancellation.label.vehicleDetails.reasonForCancellation'))]}>
                        <Input maxLength={30} placeholder={preparePlaceholderText(translateContent('deliveryNoteInvoiceCancellation.label.vehicleDetails.reasonForCancellation'))} disabled={true} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Form.Item label={translateContent('deliveryNoteInvoiceCancellation.label.vehicleDetails.cancellationRemarks')} name="cancellationRemarks">
                        <TextArea showCount maxLength={300} placeholder={preparePlaceholderText(translateContent('deliveryNoteInvoiceCancellation.label.vehicleDetails.cancellationRemarks'))} disabled={true} />
                    </Form.Item>
                </Col>
            </Row>
        </>
    );
};
