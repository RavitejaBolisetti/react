import React, { useState, useEffect } from 'react';
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

const ChangePasswordBase = ({ form, password, setPassword, showGlobalNotification, isOpen = false, onOk = () => {}, title = '', discreption = '', doLogout, saveData, isDataLoaded, listShowLoading, userId }) => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState({ oldPassword: false, newPassword: false, confirmNewPassword: false });
    const [tooltipVisible, setTooltipVisible] = useState(false);

    useEffect(() => {
        password && setTooltipVisible(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [password]);

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
                    <Form.Item name="oldPassword" rules={[validateRequiredInputField('old password', false)]}>
                        <Input type={showPassword?.oldPassword ? 'text' : 'password'} placeholder={preparePlaceholderText('Old password*', false)} prefix={<FiLock size={18} />} suffix={passwordSuffix('oldPassword')} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Form.Item name="newPassword" rules={[validateRequiredInputField('new password')]}>
                        <Input onChange={(e) => setPassword(e.target.value)} type={showPassword?.newPassword ? 'text' : 'password'} placeholder={preparePlaceholderText('New password*', false)} prefix={<FiLock size={18} />} suffix={passwordSuffix('newPassword')} onFocus={() => setTooltipVisible(true)} onBlur={() => setTooltipVisible(false)} />
                    </Form.Item>
                    <PasswordStrengthMeter Row={Row} Col={Col} password={password} tooltipVisible={tooltipVisible} />
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Form.Item
                        name="confirmNewPassword"
                        dependencies={['newPassword']}
                        rules={[
                            validateRequiredInputField('confirm password', false),
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
                        <Input type={showPassword?.confirmNewPassword ? 'text' : 'password'} placeholder={preparePlaceholderText('Confirm password*', false)} prefix={<FiLock size={18} />} suffix={passwordSuffix('confirmNewPassword')} />
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
