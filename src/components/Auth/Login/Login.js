import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import { Form, Row, Col, Button, Input, message } from 'antd';
import { FaTimes, FaExclamationTriangle } from 'react-icons/fa';
import { FiLock } from 'react-icons/fi';
import { BiUser } from 'react-icons/bi';

import { doLogin, doCloseLoginError, doCloseUnAuthenticatedError } from 'store/actions/auth';
import { loginPageIsLoading } from 'store/actions/authPages/LoginPage';

import { ROUTING_FORGOT_PASSWORD, ROUTING_DASHBOARD } from 'constants/routing';
import { validateRequiredInputField } from 'utils/validation';
import styles from '../Auth.module.css';

import * as IMAGES from 'assets';

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
        returnValue = { ...returnValue, errorTitle: authApiCall.title, errorMessage: authApiCall.message };
    }

    return returnValue;
};

const mapDispatchToProps = {
    doLogin,
    doCloseLoginError,
    doCloseUnAuthenticatedError,
};

const Login = (props) => {
    const { doLogin, isError, doCloseLoginError, errorTitle, errorMessage } = props;
    const [form] = Form.useForm();
    const recaptchaRef = React.useRef(null);
    const [captcha, setCaptcha] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    useEffect(() => {
        doCloseLoginError();

        form.resetFields();
        setCaptcha('');
        recaptchaRef.current.reset();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onSuccess = () => {
        setIsLoading(false);
        navigate(ROUTING_DASHBOARD);
    };

    const onError = () => {
        setIsLoading(false);
    };

    const onFinish = (values) => {
        setIsLoading(true);
        if (captcha) {
            doLogin(values, loginPageIsLoading, onSuccess, onError);
        } else {
            message.error('Please select Captcha');
            setIsLoading(false);
        }
    };

    const onFinishFailed = (errorInfo) => {
        form.validateFields().then((values) => { });
    };

    const onReCAPTCHAChange = async (captchaCode) => {
        // If the reCAPTCHA code is null or undefined indicating that
        // the reCAPTCHA was expired then return early
        if (!captchaCode) {
            return;
        } else {
            setCaptcha(captchaCode);
        }
    };
    return (
        <>
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
                                                        <Form.Item name="userId" rules={[validateRequiredInputField('User ID (MILE ID.Parent ID) / Token No.')]} className={styles.inputBox}>
                                                            {<Input prefix={<BiUser size={18} />} type="text" placeholder="User ID (MILE ID.Parent ID / Token No.)" />}
                                                            {/* As discussed with Rahul */}
                                                        </Form.Item>
                                                    </Col>
                                                </Row>
                                                <Row gutter={20}>
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                        <Form.Item name="password" rules={[validateRequiredInputField('Password')]} className={styles.inputBox}>
                                                            <Input.Password prefix={<FiLock size={18} />} type="text" placeholder="Password" visibilityToggle={true} />
                                                        </Form.Item>
                                                    </Col>
                                                </Row>
                                                <Row gutter={20}>
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                        <ReCAPTCHA className={'g-recaptcha'} ref={recaptchaRef} size="normal" theme="dark" border="" sitekey={process.env.REACT_APP_GOOGLE_SITW_KEY} onChange={onReCAPTCHAChange} />
                                                    </Col>
                                                </Row>
                                                <Row gutter={20}>
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                        <Button className={styles.button} type="primary" htmlType="submit" loading={isLoading}>
                                                            Login
                                                        </Button>
                                                    </Col>
                                                </Row>
                                                {/* <div className="hr"></div> */}
                                                <Row gutter={20}>
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                        <div className={styles.loginFooter} type="radio">
                                                            <Link to={ROUTING_FORGOT_PASSWORD}>Forgot password?</Link>
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
                                        <FaExclamationTriangle size={18} />
                                    </span>
                                    <span className={styles.errorTitle}>{errorTitle}</span>
                                    <span className={styles.loginErrorClose} onClick={() => doCloseLoginError()}>
                                        <FaTimes size={18} />
                                    </span>
                                </h5>
                                <div className="form_card">
                                    <p>{errorMessage}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className={styles.loginMainFooter}>
                    <Row gutter={20}>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                            <div>
                                <a>Terms of use</a>
                                <a>About us</a>
                                <a>Disclaimer</a>
                                <a>Contact us</a>
                            </div>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                            <div className={styles.floatRight}>
                                <span>&copy; 2023 ROBIN. All Rights Reserved.</span>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
