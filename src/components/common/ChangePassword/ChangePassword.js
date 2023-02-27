import React, { useState } from 'react';
import { Button, Col, Form, Input, Modal, Row } from 'antd';

import { validateFieldsPassword, validateRequiredInputField } from 'utils/validation';

export const ChangePassword = ({ isOpen = false, onOk = () => {}, onCancel = () => {}, title = '', discreption = '' }) => {
    const [form] = Form.useForm();

    const [confirmDirty, setConfirmDirty] = useState(false);

    const onFinish = (values) => {
        console.log('🚀 ~ file: ChangePassword.js:8 ~ onFinish ~ values', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('🚀 ~ file: ChangePassword.js:12 ~ onFinishFailed ~ errorInfo', errorInfo);
    };

    const validateToNextPassword = (rule, value, callback) => {
        if (value && confirmDirty) {
            form.validateFields(['confirmPassword'], { force: true });
        }
        callback();
    };

    const compareToFirstPassword = (rule, value, callback) => {
        if (value && value !== form.getFieldValue('newPassword')) {
            callback("New Password and Confirm Password doesn't match!");
        } else {
            callback();
        }
    };

    const handleConfirmBlur = (e) => {
        const value = e.target.value;
        setConfirmDirty(confirmDirty || !!value);
    };
    return (
        <>
            <Modal open={isOpen} title={title} okText="Submit" footer={false} okType="primary" onOk={onFinish} onCancel={onCancel}>
                {discreption ? (
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <p>{discreption}</p>
                        </Col>
                    </Row>
                ) : (
                    ''
                )}
                <Form form={form} name="change_password" layout="vertical" autoComplete="false" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item label="Old Password" name="oldPassword" rules={[validateRequiredInputField('Old Password')]}>
                                <Input.Password type="text" allowClear placeholder="Enter Old Password" visibilityToggle={true} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item
                                label="New Password"
                                name="newPassword"
                                rules={[
                                    validateRequiredInputField('New Password'),
                                    validateFieldsPassword('New Password'),
                                    {
                                        validator: validateToNextPassword,
                                    },
                                ]}
                            >
                                <Input.Password type="text" allowClear placeholder="Enter New Password" visibilityToggle={true} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item
                                label="Confirm Password"
                                name="confirmPassword"
                                rules={[
                                    validateRequiredInputField('Confirm Password'),
                                    validateFieldsPassword('Confirm Password'),
                                    {
                                        validator: compareToFirstPassword,
                                    },
                                ]}
                            >
                                <Input.Password type="text" allowClear placeholder="Enter Confirm Password" onBlur={handleConfirmBlur} visibilityToggle={true} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                            <Button style={{ marginTop: '20px' }}>Cancel</Button>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} style={{ textAlign: 'right' }}>
                            <Button style={{ marginTop: '20px' }} type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    );
};
