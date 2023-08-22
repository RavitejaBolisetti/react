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

const AddEditForm = (uploadProps) => {
    const messageText = <>Click or drop your file here to Upload the Documents.</>;
    const { mandatoryFields } = uploadProps;

    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item label="File Name" name="fileName" rules={mandatoryFields ? [validateRequiredInputField('file name')] : ''}>
                        <Input placeholder={preparePlaceholderText('file name')} allowClear />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item label="Document Description" name="documentDescription" rules={mandatoryFields ? [validateRequiredInputField('document description')] : ''}>
                        <Input placeholder={preparePlaceholderText('document description')} allowClear />
                    </Form.Item>
                </Col>
            </Row>
            <UploadUtil {...uploadProps} messageText={messageText} />
        </>
    );
};

export default AddEditForm;
