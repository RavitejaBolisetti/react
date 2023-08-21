/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Form, Input } from 'antd';

import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { validateRequiredInputField } from 'utils/validation';
import { UploadUtil } from 'utils/Upload';

const { TextArea } = Input;

const AddEditForm = (uploadProps) => {
    const messageText = <>Click or drop your file here to Upload the Documents.</>;
    const { mandatoryFields } = uploadProps;

    return (
        <>
            <Row gutter={16}>
                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item label="File Name" name="fileName" rules={mandatoryFields ? [validateRequiredInputField('fileName')] : ''} placeholder={preparePlaceholderSelect('fileName')}>
                        <Input placeholder={preparePlaceholderText('file name')} allowClear />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item label="Document Description" name="documentDescription" rules={mandatoryFields ? [validateRequiredInputField('document description')] : ''}>
                        <TextArea style={{ height: '36px' }} placeholder={preparePlaceholderText('document description')} allowClear maxLength={50} />
                    </Form.Item>
                </Col>
            </Row>
            <UploadUtil {...uploadProps} messageText={messageText} />
        </>
    );
};

export default AddEditForm;
