import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Col, Form, Input, Row } from 'antd';
import { bindActionCreators } from 'redux';
import { changePasswordActions } from 'store/actions/data/changePassword';
import { showGlobalNotification } from 'store/actions/notification';
import { validateFieldsPassword, validateRequiredInputField } from 'utils/validation';
import { handleErrorModal } from 'utils/responseModal';
import { doLogoutAPI } from 'store/actions/auth';
import { ROUTING_LOGIN } from 'constants/routing';
import { useNavigate } from 'react-router-dom';
import styles from './ChangePassword.module.css';

const mapStateToProps = (state) => {
    const {
        auth: { token, isLoggedIn, userId },

        data: {
            ChangePassword: { isLoading, isLoaded: isDataLoaded = false },
        },
    } = state;

    return {
        isDataLoaded,
        token,
        isLoggedIn,
        userId,
        isLoading,
    };
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            saveData: changePasswordActions.saveData,
            doLogout: doLogoutAPI,
            listShowLoading: changePasswordActions.listShowLoading,
            showGlobalNotification,
        },
        dispatch
    ),
});

const ChangePasswordBase = ({ showGlobalNotification, isOpen = false, onOk = () => {}, onCancel = () => {}, title = '', discreption = '', doLogout, saveData, isDataLoaded, listShowLoading, userId }) => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const [confirmDirty, setConfirmDirty] = useState(false);

    const onFinish = (errorInfo) => {
        // form.validateFields().then((values) => {});
    };

    const successAction = (title, message) => {
        showGlobalNotification({ notificationType: 'success', title, message });
        navigate(ROUTING_LOGIN);
    };
    const onFinishFailed = (values) => {
        if (values.errorFields.length === 0) {
            const data = { ...values.values };
            const onSuccess = (res) => {
                form.resetFields();
                doLogout({
                    successAction,
                });
            };

            const onError = (message) => {
                handleErrorModal(message);
            };

            const requestData = {
                data: data,
                setIsLoading: listShowLoading,
                userId,
                onSuccess,
                onError,
            };

            saveData(requestData);
        }
    };

    const validateToNextPassword = (rule, value, callback) => {
        if (value && confirmDirty) {
            form.validateFields(['confirmNewPassword'], { force: true });
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
        <Form className={styles.changePasswordForm} form={form} name="change_password" layout="vertical" autoComplete="false" onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Form.Item label="Old Password" name="oldPassword" rules={[validateRequiredInputField('Old Password')]}>
                        <Input.Password type="text" placeholder="Enter old password" visibilityToggle={true} />
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
                        <Input.Password type="text" placeholder="Enter new password" visibilityToggle={true} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Form.Item
                        label="Confirm Password"
                        name="confirmNewPassword"
                        rules={[
                            validateRequiredInputField('Confirm Password'),
                            validateFieldsPassword('Confirm Password'),
                            {
                                validator: compareToFirstPassword,
                            },
                        ]}
                    >
                        <Input.Password type="text" placeholder="Enter confirm password" onBlur={handleConfirmBlur} visibilityToggle={true} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.textCenter}>
                    <Button style={{ marginTop: '6px' }} type="primary" htmlType="submit">
                        Change Password
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export const ChangePasswordForm = connect(mapStateToProps, mapDispatchToProps)(ChangePasswordBase);
