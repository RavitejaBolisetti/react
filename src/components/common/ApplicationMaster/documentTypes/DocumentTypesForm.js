import React from 'react';
import { Input, Form, Col, Row, Switch, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { duplicateValidator, validateAlphanumericWithSpace, validateRequiredInputField, validationFieldLetterAndNumber } from 'utils/validation';
import { preparePlaceholderText } from 'utils/preparePlaceholder';

function DocumentTypesForm({ form, onFinish, isEditing, isBtnDisabled, setIsBtnDisabled, finalFormdata, documentTypeDescription, documentTypeCode }) {

    const onFinishFailed = (err) => {
        console.error(err);
    };


    return (
        <Form form={form} id="myForm" layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={20}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item label="Code" name="documentTypeCode" rules={[{ max: 3, message: 'Code must be 3 characters long.' }, validateRequiredInputField('document code'), validationFieldLetterAndNumber('document code'), { validator: (rule, value) => duplicateValidator(value, 'documentTypeCode', finalFormdata?.documentType, documentTypeCode) }]}>
                        <Input disabled={isBtnDisabled} placeholder={preparePlaceholderText('document code')} />
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item label="Document Name" name="documentTypeDescription" rules={[ { max: 50, message: 'Document Name must be less then 50 characters.' }, validateRequiredInputField('document name'), validateAlphanumericWithSpace('document name'), { validator: (rule, value) => duplicateValidator(value, 'documentTypeDescription', finalFormdata?.documentType, documentTypeDescription) }]}>
                        <Input disabled={isBtnDisabled} maxLength={50} placeholder={preparePlaceholderText('document name')} />
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
