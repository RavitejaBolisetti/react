/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Col, Input, Form, Row} from 'antd';

import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';

const { TextArea } = Input;

export const VehicleDetailsForm = () => {
    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                    <Form.Item label="Model Group" name="modelGroup" rules={[validateRequiredSelectField('Model Group')]}>
                        <Input maxLength={30} placeholder={preparePlaceholderText('Model Group')} disabled={true} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                    <Form.Item label="Model Varient" name="modelVarient" rules={[validateRequiredInputField('Model Varient')]}>
                        <Input maxLength={30} placeholder={preparePlaceholderText('Model Varient')} disabled={true} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                    <Form.Item name="model" label="Model" rules={[validateRequiredInputField('Model')]}>
                        <Input maxLength={30} placeholder={preparePlaceholderText('Model')} disabled={true} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                    <Form.Item label="VIN" name="vin" rules={[validateRequiredInputField('VIN')]}>
                        <Input maxLength={30} placeholder={preparePlaceholderText('vin')} disabled={true} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                    <Form.Item name="reasonForCancellation" label="Reason for Cancellation" rules={[validateRequiredInputField('Reason For Cancellation')]}>
                        <Input maxLength={30} placeholder={preparePlaceholderText('Reason for Cancellation')} disabled={true} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Form.Item label="Cancellation Remarks" name="cancellationRemarks">
                        <TextArea showCount maxLength={300} placeholder={preparePlaceholderText('cancellation remarks')} disabled={true} />
                    </Form.Item>
                </Col>
            </Row>
        </>
    );
};
