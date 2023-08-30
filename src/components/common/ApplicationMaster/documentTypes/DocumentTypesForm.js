/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Input, Form, Col, Row, Switch, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import styles from 'assets/sass/app.module.scss';
// import styles from 'components/common/Common.module.css';

import { duplicateValidator, validateAlphanumericWithSpace, validateRequiredInputField, validationFieldLetterAndNumber } from 'utils/validation';
import { preparePlaceholderText } from 'utils/preparePlaceholder';

function DocumentTypesForm({ form, onFieldsChange, onFinish, isEditing, isBtnDisabled, setIsBtnDisabled, finalFormdata, documentTypeDescription, documentTypeCode }) {
    const onFinishFailed = (err) => {
        console.error(err);
    };

    return (
        <Form form={form} onFieldsChange={onFieldsChange} autoComplete="off" id="myForm" layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={20}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item label="Code" name="documentTypeCode" rules={[{ max: 3, message: 'Code must be 3 characters long.' }, validateRequiredInputField('document code'), validationFieldLetterAndNumber('document code'), { validator: (rule, value) => duplicateValidator(value, 'documentTypeCode', finalFormdata?.documentType, documentTypeCode) }]}>
                        <Input disabled={isBtnDisabled} placeholder={preparePlaceholderText('document code')} />
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item label="Document Name" name="documentTypeDescription" rules={[{ max: 50, message: 'Document Name must be less then 50 characters.' }, validateRequiredInputField('document name'), validateAlphanumericWithSpace('document name'), { validator: (rule, value) => duplicateValidator(value, 'documentTypeDescription', finalFormdata?.documentType, documentTypeDescription) }]}>
                        <Input disabled={isBtnDisabled} maxLength={50} placeholder={preparePlaceholderText('document name')} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item initialValue={true} labelAlign="left" wrapperCol={{ span: 24 }} name="termAndConRequired" label="T&C Required" valuePropName="checked">
                        <Switch disabled={isBtnDisabled} checkedChildren="Yes" unCheckedChildren="No" valuePropName="checked" />
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item initialValue={true} labelAlign="left" wrapperCol={{ span: 24 }} name="digitalSignatureRequired" label="Digital Signature Required" valuePropName="checked">
                        <Switch disabled={isBtnDisabled} checkedChildren="Yes" unCheckedChildren="No" valuePropName="checked" />
                    </Form.Item>
                </Col>
                <Form.Item hidden name="id">
                    <Input />
                </Form.Item>
            </Row>
            {!isEditing && (
                <Row>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={styles.marB20}>
                        <Button disabled={isBtnDisabled} icon={<PlusOutlined />} type="primary" htmlType="submit">
                            Add
                        </Button>
                    </Col>
                </Row>
            )}
        </Form>
    );
}

export default DocumentTypesForm;
