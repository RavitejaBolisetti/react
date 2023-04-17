import React from 'react';
import { Input, Form, Col, Row, Switch, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { validateAlphanumericWithSpace, validateRequiredInputField, validationFieldLetterAndNumber } from 'utils/validation';
import { preparePlaceholderText } from 'utils/preparePlaceholder';

function DocumentTypesForm({ form, onFinish, isEditing, isBtnDisabled, setIsBtnDisabled, finalFormdata }) {
    
    const onFinishFailed = (err) => {
        console.error(err);
    };

    const handleForm = (value) => {
        // setFormBtnDisable(true);
    };

    const duplicateValidator = (value, type) => {
        // onUpdate check id
        if (finalFormdata?.documentType.findIndex((el) => el[type] === value) !== -1) {
            return Promise.reject('Duplicate not allowed');
        } else {
            return Promise.resolve();
        }
    };
    return (
        <Form form={form} id="myForm" layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={20}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item label="Code" name="documentTypeCode" rules={[validateRequiredInputField('Application Code'), validationFieldLetterAndNumber('Application Code'), { validator: (rule, value) => duplicateValidator(value, 'documentTypeCode') }]}>
                        <Input disabled={isBtnDisabled} maxLength={50} placeholder={preparePlaceholderText('Application Code')} />
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item label="Document Name" name="documentTypeDescription" rules={[validateRequiredInputField('Document Name'), validateAlphanumericWithSpace('Document Name'), { validator: (rule, value) => duplicateValidator(value, 'documentTypeDescription') }]}>
                        <Input disabled={isBtnDisabled} maxLength={50} placeholder={preparePlaceholderText('Document Name')} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item initialValue={true} labelAlign="left" wrapperCol={{ span: 24 }} name="termAndConRequired" label="T&C Required" valuePropName="checked">
                        <Switch disabled={isBtnDisabled} checkedChildren="Yes" unCheckedChildren="Inactive" valuePropName="checked" />
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item initialValue={true} labelAlign="left" wrapperCol={{ span: 24 }} name="digitalSignatureRequired" label="Digital Signature Required" valuePropName="checked">
                        <Switch disabled={isBtnDisabled} checkedChildren="Yes" unCheckedChildren="Inactive" valuePropName="checked" />
                    </Form.Item>
                </Col>
                <Form.Item hidden name="id">
                    <Input />
                </Form.Item>
            </Row>
            {!isEditing && (
                <Button disabled={isBtnDisabled} icon={<PlusOutlined />} type="primary" danger htmlType="submit">
                    Add
                </Button>
            )}
        </Form>
    );
}

export default DocumentTypesForm;
