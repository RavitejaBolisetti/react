/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Row, Col, Button, Input, message, notification, Space } from 'antd';
import { CiCircleRemove } from 'react-icons/ci';
import { FiLock } from 'react-icons/fi';
import { BiUser } from 'react-icons/bi';
import { AiOutlineEyeInvisible, AiOutlineEye, AiOutlineWarning } from 'react-icons/ai';

import { doLogin, doCloseLoginError, doCloseUnAuthenticatedError, authPostLogin, authPreLogin } from 'store/actions/auth';
import { showGlobalNotification, hideGlobalNotification } from 'store/actions/notification';
import { loginPageIsLoading } from 'store/actions/authPages/LoginPage';

import { ROUTING_FORGOT_PASSWORD, ROUTING_UPDATE_PASSWORD } from 'constants/routing';
import { validateRequiredInputField } from 'utils/validation';
import styles from '../Auth.module.css';
import notificationStyles from 'App.module.css';

import * as IMAGES from 'assets';
import ReactRecaptcha3 from 'react-google-recaptcha3';
import Footer from '../Footer';

const mapStateToProps = (state) => {
    let authApiCall = state.auth || {};

    const isError = authApiCall.isError || false;
    const loginFailure = authApiCall.loginFailure;
    const preLoginData = authApiCall.preLoginData;

    let returnValue = {
        notification,
        isUnauthenticated: authApiCall.isUnauthenticated,
        isLoggedIn: authApiCall.isLoggedIn,
        isLoading: state.authPages.LoginPage.isLoading,
        data: authApiCall.data,
        passwordStatus: authApiCall.passwordStatus,
        authData: authApiCall.authData,
        isError,
        loginFailure,
        preLoginData,
        message: '',
    };

    return returnValue;
};

const mapDispatchToProps = {
    doLogin,
    authPostLogin,
    authPreLogin,
    doCloseLoginError,
    doCloseUnAuthenticatedError,
    showGlobalNotification,
    hideGlobalNotification,
};

const GOOGLE_CAPTCHA_SITE_KEY = process.env.REACT_APP_GOOGLE_SITE_KEY;
const Login = (props) => {
    const { doLogin, authPostLogin, authPreLogin, showGlobalNotification, hideGlobalNotification, doCloseLoginError } = props;
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [fieldData, setFieldData] = useState();

    const userIdRef = useRef(null);
    const passwordInputRef = useRef(null);
    const [alertNotification, contextAlertNotification] = notification.useNotification();

    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    useEffect(() => {
        ReactRecaptcha3.init(GOOGLE_CAPTCHA_SITE_KEY).then((status) => {});

        return () => {
            ReactRecaptcha3.destroy();
            form.resetFields();
            doCloseLoginError();
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [GOOGLE_CAPTCHA_SITE_KEY]);

    const onSuccess = (data) => {
        hideGlobalNotification();
        setIsLoading(false);
        const passwordStatus = data?.passwordStatus;
        if (passwordStatus) {
            authPreLogin(data);
            updatePasswordStatusInfo(data);
            forceUpdate();
        } else {
            ReactRecaptcha3.destroy();
            authPostLogin(data);
        }
    };

    const onError = ({ title, message }) => {
        showGlobalNotification({ notificationType: 'errorBeforeLogin', title, message });
        setIsLoading(false);
    };

    const handleUpdatePassword = () => {
        navigate(ROUTING_UPDATE_PASSWORD);
    };

    const handleSkipUpdatePassword = (data) => {
        authPostLogin(data);
    };

    const onFinish = (values) => {
        setIsLoading(true);

        hideGlobalNotification();
        ReactRecaptcha3.getToken().then(
            (captchaCode) => {
                if (captchaCode) {
                    doLogin(values, loginPageIsLoading, onSuccess, onError);
                }
            },
            (error) => {
                message.error(error || 'Please select Captcha');
                setIsLoading(false);
            }
        );
    };

    const onFinishFailed = (errorInfo) => {
        form.validateFields().then((values) => {});
    };

    const updatePasswordStatusInfo = (data) => {
        const { passwordStatus } = data;
        const { status, title, message } = passwordStatus;

        const shandleSkipForNow = () => {
            status === 'A' && handleSkipUpdatePassword(data);
        };
        const btn = (data) => (
            <Space>
                {status === 'A' && (
                    <Button onClick={shandleSkipForNow} danger size="small">
                        Skip For Now
                    </Button>
                )}
                <Button onClick={handleUpdatePassword} type="primary" size="small">
                    Update Password
                </Button>
            </Space>
        );

        alertNotification.open({
            icon: status === 'A' ? <AiOutlineWarning /> : <CiCircleRemove />,
            message: title,
            description: message,
            btn: btn(data),
            duration: 0,
            onClose: shandleSkipForNow,
            className: status === 'E' ? notificationStyles.error : notificationStyles.warning,
        });
    };

    const handleShowPassword = () => {
        setShowPassword(true);
    };

    const handleHidePassword = () => {
        setShowPassword(false);
    };

    const passowrdSuffix = (
        <span onMouseDown={handleShowPassword} onMouseUp={handleHidePassword} onMouseLeave={handleHidePassword}>
            {!showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
        </span>
    );

    const handleFormChange = (field) => (e) => {
        setFieldData({ ...fieldData, [field]: e?.target?.value?.length > 0 ? true : false });
    };

    const handleFieldFocus = (field) => (e) => {
        field?.current.focus();
    };
    return (
        <>
            {contextAlertNotification}
            <div className={styles.loginSection}>
                <div className={styles.loginMnMlogo}>
                    <img src={IMAGES.MAH_WHITE_LOGO} alt="" />
                </div>
                <div className={styles.center}>
                    <div className={styles.loginLogoSection}>
                        <img src={IMAGES.RL_LOGO} className={styles.mainLogo} alt="" />
                        <br></br>
                        <img src={IMAGES.LINE} className={styles.mainLogoLine} alt="" />
                        <div className={styles.logoText}>Dealer Management System</div>
                    </div>
                    <div className={styles.loginWrap}>
                        <Form form={form} name="login_from" autoComplete="off" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                            <Row>
                                <Col span={24}>
                                    <div className={styles.loginHtml}>
                                        <div className={styles.centerInner}>
                                            <div className={styles.loginForm}>
                                                <div className={styles.loginHeading}>
                                                    <h1>Welcome</h1>
                                                    <div className={styles.loginSubHeading}>Please enter your credentials to login</div>
                                                </div>
                                                <Row gutter={20}>
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} className="textfieldWithPrefix">
                                                        <Form.Item name="userId" className="textfieldWithPrefix__input" data-testid="userIdInput" rules={[validateRequiredInputField('user id')]} className={styles.inputBox}>
                                                            {<Input data-testid="userNameInput" ref={userIdRef} prefix={<BiUser size={18} />} type="text" maxLength={25} onChange={handleFormChange('userId')} />}
                                                        </Form.Item>
                                                        {!fieldData?.userId && (
                                                            <label className="textfieldWithPrefix__label" onClick={handleFieldFocus(userIdRef)}>
                                                                User ID (MILE ID.Parent ID)
                                                            </label>
                                                        )}
                                                    </Col>
                                                </Row>
                                                <Row gutter={20}>
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} className="textfieldWithPrefix">
                                                        <Form.Item name="password" className="textfieldWithPrefix__input" data-testid="password" rules={[validateRequiredInputField('password')]} className={styles.inputBox}>
                                                            <Input data-testid="inputPassword" ref={passwordInputRef} type={showPassword ? 'text' : 'password'} prefix={<FiLock size={18} />} suffix={passowrdSuffix} onChange={handleFormChange('password')} />
                                                        </Form.Item>
                                                        {!fieldData?.password && (
                                                            <label className="textfieldWithPrefix__label" onClick={handleFieldFocus(passwordInputRef)}>
                                                                Password
                                                            </label>
                                                        )}
                                                        <div className={styles.forgotPasswordLink}>
                                                            <Link to={ROUTING_FORGOT_PASSWORD}>Forgot Password?</Link>
                                                        </div>
                                                    </Col>
                                                </Row>

                                                <Row gutter={20}>
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                        <Button icon={<FiLock size={18} />} data-testid="Login" className={styles.button} type="primary" htmlType="submit" loading={isLoading}>
                                                            Login
                                                        </Button>
                                                    </Col>
                                                </Row>
                                                <Row gutter={20}>
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                        <div className={styles.loginFooter}>
                                                            <Link to={process.env.REACT_APP_SSO_LOGIN_URL}>M&M User Login</Link>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
};

export const Logins = connect(mapStateToProps, mapDispatchToProps)(Login);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
