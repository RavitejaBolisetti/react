import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Row, Col, Button, Input, message, notification, Space } from 'antd';
import { CiCircleRemove, CiCircleAlert } from 'react-icons/ci';
import { FiLock } from 'react-icons/fi';
import { BiUser } from 'react-icons/bi';

import { doLogin, doCloseLoginError, doCloseUnAuthenticatedError, authPostLogin, authPreLogin } from 'store/actions/auth';
import { showGlobalNotification } from 'store/actions/notification';
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
};

const GOOGLE_CAPTCHA_SITE_KEY = process.env.REACT_APP_GOOGLE_SITE_KEY;
const Login = (props) => {
    const { doLogin, authPostLogin, authPreLogin, showGlobalNotification, doCloseLoginError } = props;
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [tempData, setTempData] = useState();
    const [alertNotification, contextAlertNotification] = notification.useNotification();

    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

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

    const onSuccess = (data) => {
        setIsLoading(false);
        ReactRecaptcha3.destroy();
        const passwordStatus = data?.passwordStatus;
        if (passwordStatus) {
            authPreLogin(data);
            setTempData(data);
            updatePasswordStatusInfo(data);
            forceUpdate();
        } else {
            authPostLogin(data);
        }
    };

    const onError = ({ title, message }) => {
        showGlobalNotification({ title, message });
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

        const btn = (data) => (
            <Space>
                {status === 'A' && (
                    <Button onClick={() => handleSkipUpdatePassword(data)} danger size="small">
                        Skip For Now
                    </Button>
                )}
                <Button onClick={handleUpdatePassword} type="primary" size="small">
                    Update Password
                </Button>
            </Space>
        );

        alertNotification.open({
            icon: status === 'A' ? <CiCircleAlert /> : <CiCircleRemove />,
            message: title,
            description: message,
            btn: btn(data),
            duration: 0,
            className: status === 'E' ? notificationStyles.error : notificationStyles.warning,
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
                                                        <Form.Item name="userId" rules={[validateRequiredInputField('User ID (mile id.parent id')]} className={styles.inputBox}>
                                                            {<Input prefix={<BiUser size={18} />} type="text" placeholder="User ID (mile id.parent id)" />}
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
