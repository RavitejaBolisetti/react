import React, { Fragment, useState, useReducer } from 'react';
import { Input, Form, Col, Card, Row, Switch, Button, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { validateRequiredInputField, validationFieldLetterAndNumber } from 'utils/validation';
import { preparePlaceholderText } from 'utils/preparePlaceholder';

import style from 'pages/common/Common.module.css';

function DocumentTypesForm({ form, onFinish, isEditing, isBtnDisabled, setIsBtnDisabled }) {

    

    const onFinishFailed = (err) => {
        console.error(err);
    };

    const handleForm = (value) => {
        // setFormBtnDisable(true);
    };

    return (
        <Form form={form} id="myForm" layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={20}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item label="Code" name="docCode" rules={[validateRequiredInputField('Application Code'), validationFieldLetterAndNumber('Application Code')]}>
                        <Input maxLength={50} placeholder={preparePlaceholderText('Name')} />
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item label="Document Name" name="documentName" rules={[validateRequiredInputField('Document Name'), validationFieldLetterAndNumber('Document Name')]}>
                        <Input maxLength={50} placeholder={preparePlaceholderText('Name')} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item initialValue={true} labelAlign="left" wrapperCol={{ span: 24 }} name="tncReq" label="T&C Required" valuePropName="checked">
                        <Switch checkedChildren="Yes" unCheckedChildren="Inactive" valuePropName="checked" />
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item initialValue={true} labelAlign="left" wrapperCol={{ span: 24 }} name="signatureReq" label="Digital Signature Required" valuePropName="checked">
                        <Switch checkedChildren="Yes" unCheckedChildren="Inactive" valuePropName="checked" />
                    </Form.Item>
                </Col>
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
