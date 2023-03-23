import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Row, Col, Button, Input, message, notification, Space } from 'antd';
import { FaTimes } from 'react-icons/fa';
import {  AiOutlineCheckCircle } from 'react-icons/ai';
import { CiCircleRemove, CiCircleAlert } from 'react-icons/ci';
import { FiLock } from 'react-icons/fi';
import { BiUser } from 'react-icons/bi';

import { doLogin, doCloseLoginError, doCloseUnAuthenticatedError } from 'store/actions/auth';
import { loginPageIsLoading } from 'store/actions/authPages/LoginPage';

import { ROUTING_FORGOT_PASSWORD, ROUTING_UPDATE_PASSWORD, ROUTING_DASHBOARD } from 'constants/routing';
import { validateRequiredInputField } from 'utils/validation';
import styles from '../Auth.module.css';

import * as IMAGES from 'assets';
import ReactRecaptcha3 from 'react-google-recaptcha3';
import Footer from '../Footer';
import { AiOutlineCloseCircle } from 'react-icons/ai';

import { UpdatePassword } from '../UpdatePassword';

// const Context = React.createContext({
//     name: 'Default',
// });

const mapStateToProps = (state) => {
    let authApiCall = state.auth || {};

    const isError = authApiCall.isError || false;
    const loginFailure = authApiCall.loginFailure;

    let returnValue = {
        isUnauthenticated: authApiCall.isUnauthenticated,
        isLoggedIn: authApiCall.isLoggedIn,
        isLoading: state.authPages.LoginPage.isLoading,
        data: authApiCall.data,
        authData: authApiCall.authData,
        isError,
        loginFailure,
        message: '',
    };

    if (isError || returnValue.isUnauthenticated) {
        returnValue = {
            ...returnValue,
            errorTitle: authApiCall.title,
            errorMessage: authApiCall.message,
        };
    }

    return returnValue;
};

const mapDispatchToProps = {
    doLogin,
    doCloseLoginError,
    doCloseUnAuthenticatedError,
};

const GOOGLE_CAPTCHA_SITE_KEY = process.env.REACT_APP_GOOGLE_SITE_KEY;
const Login = (props) => {
    const { doLogin, isError, doCloseLoginError, errorTitle, errorMessage } = props;
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [isTrue, setIsTrue] = useState(false);

    useEffect(() => {
        ReactRecaptcha3.init(GOOGLE_CAPTCHA_SITE_KEY).then((status) => {
            // console.log(status, 'status');
        });

        return () => {
            ReactRecaptcha3.destroy();
            form.resetFields();
            doCloseLoginError();
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [GOOGLE_CAPTCHA_SITE_KEY]);

    const navigate = useNavigate();

    const onSuccess = () => {
        setIsLoading(false);
        ReactRecaptcha3.destroy();
        navigate(ROUTING_DASHBOARD);
    };

    const onError = () => {
        setIsLoading(false);
    };

    const onFinish = (values) => {
        setIsLoading(true);
        ReactRecaptcha3.getToken().then(
            (captchaCode) => {
                if (captchaCode) doLogin(values, loginPageIsLoading, onSuccess, onError);
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

    const [alertNotification, contextAlertNotification] = notification.useNotification();

    const skipPasswordUpdate = () => {
        const btn = (
            <Space>
                <Link to={ROUTING_DASHBOARD}>
                    <Button danger size="small">
                        Skip For Now
                    </Button>
                </Link>
                <Link to={ROUTING_UPDATE_PASSWORD}>
                    <Button type="primary" size="small" onClick={() => setIsTrue(true)}>
                        Update Password
                    </Button>
                </Link>
            </Space>
        );

        alertNotification.open({
            icon: <CiCircleAlert />,
            message: 'Update Password',
            description: 'Your password will expire in next 5 days. Please change your password.',
            btn,
            duration: 0,
            className: styles.warning,
        });
    };

    const updatePassword = () => {
        const btn = (
            <Link to={ROUTING_UPDATE_PASSWORD}>
                <Button type="primary" size="small">
                    Update Password
                </Button>
            </Link>
        );

        alertNotification.open({
            icon: <CiCircleRemove />,
            message: 'Password Expired',
            description: 'Your Password has expired. Please update your password to login.',
            btn,
            duration: 0,
            className: styles.error,
        });
    };

    const success = ({ title, message }) => {
        alertNotification.open({
            icon: <AiOutlineCheckCircle />,
            message: 'Success',
            description: 'Your Password has been successfully updated. Please login with your new credentials.',
            className: styles.success,
        });
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
                        <Form form={form} name="login_from" autoComplete="false" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                            <Row>
                                <Col span={24}>
                                    <div className={styles.loginHtml}>
                                        <div className={styles.centerInner}>
                                            <div className={styles.loginForm}>
                                                <div className={styles.loginHeading}>
                                                    <h1>Welcome!</h1>
                                                    <div className={styles.loginSubHeading}>Please enter your credentials to login</div>
                                                </div>
                                                <Row gutter={20}>
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                        <Form.Item name="userId" rules={[validateRequiredInputField('User ID (Parent ID.MILE ID)')]} className={styles.inputBox}>
                                                            {<Input prefix={<BiUser size={18} />} type="text" placeholder="User ID (Parent ID.MILE ID)" />}
                                                        </Form.Item>
                                                    </Col>
                                                </Row>
                                                <Row gutter={20}>
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                        <Form.Item name="password" rules={[validateRequiredInputField('Password')]} className={styles.inputBox}>
                                                            <Input.Password prefix={<FiLock size={18} />} type="text" placeholder="Password" visibilityToggle={true} />
                                                        </Form.Item>
                                                        <div className={styles.forgotPasswordLink}>
                                                            <Link to={ROUTING_FORGOT_PASSWORD}>Forgot password?</Link>
                                                        </div>
                                                    </Col>
                                                </Row>

                                                <Row gutter={20}>
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                        <Button className={styles.button} type="primary" htmlType="submit" loading={isLoading}>
                                                            Login
                                                        </Button>
                                                    </Col>
                                                </Row>
                                                <Row gutter={20}>
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                        <Space>
                                                            <Button type="primary" onClick={skipPasswordUpdate}>
                                                                skip
                                                            </Button>
                                                            <Button type="primary" onClick={updatePassword}>
                                                                Update
                                                            </Button>
                                                            <Button type="primary" onClick={success}>
                                                                Success
                                                            </Button>
                                                        </Space>
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
                        {isError && (
                            <div className={styles.errorBoxContainer}>
                                <h5>
                                    <span className={styles.icon}>
                                        <AiOutlineCloseCircle size={22} />
                                    </span>
                                    <span className={styles.errorTitle}>{errorTitle}</span>
                                    <span className={styles.loginErrorClose} onClick={() => doCloseLoginError()}>
                                        <FaTimes size={20} />
                                    </span>
                                </h5>
                                <div className="form_card">
                                    <p>{errorMessage}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
