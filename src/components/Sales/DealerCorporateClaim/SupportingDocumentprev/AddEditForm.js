/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Form, Input } from 'antd';

import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { validateRequiredInputField } from 'utils/validation';
import { UploadUtil } from 'utils/Upload';
import { translateContent } from 'utils/translateContent';

const AddEditForm = (uploadProps) => {
    const messageText = <>Click or drop your file here to Upload the Documents.</>;
    const { mandatoryFields } = uploadProps;

    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item label={translateContent('vehicleReceiptChecklist.label.supportingDocument.fileName')} name="fileName" rules={mandatoryFields ? [validateRequiredInputField(translateContent('vehicleReceiptChecklist.label.supportingDocument.fileName'))] : ''}>
                        <Input placeholder={preparePlaceholderText(translateContent('vehicleReceiptChecklist.label.supportingDocument.fileName'))} allowClear />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item label={translateContent('vehicleReceiptChecklist.label.supportingDocument.documentDescription')} name="documentDescription" rules={mandatoryFields ? [validateRequiredInputField(translateContent('vehicleReceiptChecklist.label.supportingDocument.documentDescription'))] : ''}>
                        <Input placeholder={preparePlaceholderText(translateContent('vehicleReceiptChecklist.label.supportingDocument.documentDescription'))} allowClear />
                    </Form.Item>
                </Col>
            </Row>
            <UploadUtil {...uploadProps} messageText={messageText} />
        </>
    );
};

export default AddEditForm;
