import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import { Form, Row, Col, Button, Input } from 'antd';
import { FaTimes, FaExclamationTriangle } from 'react-icons/fa';
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai';

import { doLogin, doCloseLoginError, doCloseLoginFailure, doCloseUnAuthenticatedError } from 'store/actions/auth';
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
        returnValue = { ...returnValue, message: authApiCall.message };
    }

    return returnValue;
};

const mapDispatchToProps = {
    doLogin,
    doCloseLoginError,
    doCloseLoginFailure,
    doCloseUnAuthenticatedError,
};

function hideError() {
    document.getElementById('loginErrorDiv').style.display = 'none';
}

const Login = (props) => {
    const { doLogin, isError, message } = props;
    const [form] = Form.useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [captcha, setCaptcha] = useState(false);

    const navigate = useNavigate();
    const recaptchaRef = React.useRef(null);

    const onFinish = (values) => {
        if (captcha) {
            // const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            // values.timeZone = timeZone;
            doLogin(values, loginPageIsLoading);
            navigate(ROUTING_DASHBOARD);
            form.resetFields();

            // localStorage.setItem('userData', JSON.stringify(response.data));
            // message.info(response.data.responseMessage);
            // setPost(response.data);
            // recaptchaRef.current.reset();
            // setCaptcha('');
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
        <div className={styles.loginSection}>
            <div className={styles.loginMnMlogo}>
                <img src={IMAGES.MAH_WHITE_LOGO} alt="" />
            </div>
            <div className={styles.center}>
                <div className={styles.loginLogoSection}>
                    <img src={IMAGES.RL_LOGO} alt="" />
                    <div className={styles.logoText}>Dealer Management System</div>
                </div>
                <div className={styles.loginWrap}>
                    <Form form={form} name="login_from" autoComplete="false" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                        {/* <Form form={form} name="login_from" onSubmit={handleSubmit}> */}
                        <Row>
                            <Col span={24}>
                                <div className={styles.loginHtml}>
                                    <div className={styles.center}>
                                        <div className={styles.loginForm}>
                                            <div className={styles.loginHeading}>
                                                <h4>Welcome!</h4>
                                                <div className={styles.loginSubHeading}>Please enter your credentials to login</div>
                                            </div>
                                            <Row gutter={20}>
                                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                    <Form.Item name="userId" rules={[validateRequiredInputField('User ID (MILE ID.Parent ID) / Token No.')]} className={styles.inputBox}>
                                                        {<Input prefix={<AiOutlineMail size={18} />} type="text" placeholder="User ID (MILE ID.Parent ID / Token No.)" />}
                                                        {/* As discussed with Rahul */}
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                            <Row gutter={20}>
                                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                    <Form.Item name="password" rules={[validateRequiredInputField('Password')]} className={styles.inputBox}>
                                                        <Input.Password prefix={<AiOutlineLock size={18} />} type="text" placeholder="Password" visibilityToggle={true} />
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
                                                    <Button className={styles.button} style={{ marginTop: '20px' }} type="primary" htmlType="submit">
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
                        <div className="errorLoginPoP" id="loginErrorDiv">
                            <h5>
                                <span className="icon">
                                    <FaExclamationTriangle size={18} />
                                </span>
                                {'Error'}
                                {/* <span className="fr hide-btn loginErrorClose" onClick={() => {}}> */}
                                <span className="fr hide-btn loginErrorClose" onClick={() => hideError()}>
                                    <FaTimes size={18} />
                                </span>
                            </h5>
                            <div className="form_card">
                                <p>{message}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
