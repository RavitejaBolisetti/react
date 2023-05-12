import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button, Col, Form, Input, Row } from 'antd';
import { bindActionCreators } from 'redux';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { FiLock } from 'react-icons/fi';
import { changePasswordActions } from 'store/actions/data/changePassword';
import { showGlobalNotification } from 'store/actions/notification';
import { validateRequiredInputField } from 'utils/validation';
import { handleErrorModal } from 'utils/responseModal';
import { doLogoutAPI } from 'store/actions/auth';
import { ROUTING_LOGIN } from 'constants/routing';
import { useNavigate } from 'react-router-dom';
import { preparePlaceholderText } from 'utils/preparePlaceholder';
import styles from './ChangePassword.module.css';

import { PasswordStrengthMeter } from 'utils/PasswordStrengthMeter';

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

const ChangePasswordBase = ({ form, password, setPassword, showGlobalNotification, isOpen = false, onOk = () => { }, title = '', discreption = '', doLogout, saveData, isDataLoaded, listShowLoading, userId }) => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState({ oldPassword: false, newPassword: false, confirmNewPassword: false });

    const onFinish = (values) => {
        const data = { ...values };
        const onSuccess = (res) => {
            form.resetFields();
            showGlobalNotification({ notificationType: 'successBeforeLogin', title: 'Password Changed', message: res?.responseMessage });

            doLogout({
                onSuccess: (res) => {
                    if (res?.data) {
                        navigate(ROUTING_LOGIN);
                    }
                },
                onError,
                userId,
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
    };

    const passwordSuffix = (type) => (
        <span onMouseDown={() => setShowPassword({ [type]: true })} onMouseUp={() => setShowPassword({ [type]: false })} onMouseLeave={() => setShowPassword({ [type]: false })}>
            {!showPassword?.[type] ? <AiOutlineEyeInvisible size={18} /> : <AiOutlineEye size={18} />}
        </span>
    );

    return (
        <Form className={styles.changePasswordForm} form={form} name="change_password" layout="vertical" autoComplete="off" onFinish={onFinish}>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Form.Item name="oldPassword" rules={[validateRequiredInputField('old password')]}>
                        <Input type={showPassword?.oldPassword ? 'text' : 'password'} placeholder={preparePlaceholderText('old password')} prefix={<FiLock size={18} />} suffix={passwordSuffix('oldPassword')} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    {/* validateFieldsPassword('New password') */}
                    <Form.Item name="newPassword" rules={[validateRequiredInputField('new password')]}>
                        <Input onChange={(e) => setPassword(e.target.value)} type={showPassword?.newPassword ? 'text' : 'password'} placeholder={preparePlaceholderText('new password')} prefix={<FiLock size={18} />} suffix={passwordSuffix('newPassword')} />
                    </Form.Item>
                    {/* {password && <PasswordStrengthBar minLength={8} barColors={['#ddd', '#ef4836', '#f6b44d', '#2b90ef', '#25c281']} scoreWords={['poor', 'weak', 'okay', 'good', 'strong']} password={password} />}
                    <PasswordStrength password={password} /> */}
                    <PasswordStrengthMeter Row={Row} Col={Col} password={password} />
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Form.Item
                        name="confirmNewPassword"
                        dependencies={['newPassword']}
                        rules={[
                            validateRequiredInputField('confirm password'),
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('newPassword') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error("New Password and confirm Password doesn't match!"));
                                },
                            }),
                        ]}
                    >
                        <Input type={showPassword?.confirmNewPassword ? 'text' : 'password'} placeholder={preparePlaceholderText('confirm password')} prefix={<FiLock size={18} />} suffix={passwordSuffix('confirmNewPassword')} />
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
