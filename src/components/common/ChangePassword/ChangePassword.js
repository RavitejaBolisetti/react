import React from 'react';
import { Col, Form, Input, Modal, Row } from 'antd';

import { validateRequiredInputField } from 'utils/validation';

export const ChangePassword = ({ isOpen = false, onOk = () => {}, onCancel = () => {}, title = '', discreption = '' }) => {
    const [form] = Form.useForm();
    const onFinish = (values) => {
        console.log('🚀 ~ file: ChangePassword.js:8 ~ onFinish ~ values', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('🚀 ~ file: ChangePassword.js:12 ~ onFinishFailed ~ errorInfo', errorInfo);
    };

    return (
        <>
            <Modal open={isOpen} title={title} okText="Submit" okType="primary" onOk={onFinish}  onCancel={onCancel}>
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
                                <Input.Password type="text" placeholder="Enter Old Password" visibilityToggle={true} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item label="New Password" name="newPassword" rules={[validateRequiredInputField('New Password')]}>
                                <Input.Password type="text" placeholder="Enter New Password" visibilityToggle={true} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item label="Confirm Password" name="confirmPassword" rules={[validateRequiredInputField('Confirm Password')]}>
                                <Input.Password type="text" placeholder="Enter Confirm Password" visibilityToggle={true} />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    );
};
