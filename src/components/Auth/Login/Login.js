import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import { Form, Row, Col, Button } from 'antd';
import { FaTimes, FaExclamationTriangle } from 'react-icons/fa';
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineMail, AiOutlineLock } from 'react-icons/ai';

import { doLogin, doCloseLoginError, doCloseLoginFailure, doCloseUnAuthenticatedError } from 'store/actions/auth';
import { loginPageIsLoading } from 'store/actions/authPages/LoginPage';

import { ROUTING_FORGOT_PASSWORD, ROUTING_DASHBOARD } from 'constants/routing';
import { validateRequiredInputField } from 'utils/validation';
import styles from '../Auth.module.css';

import * as IMAGES from 'assets';

import 'assets/style/new_robin.css';
import 'assets/style/new_robin.scss';

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
        form.validateFields().then((values) => {});
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
        <div className="loginSection">
            <div className="loginMMlogo">
                <img src={IMAGES.MAH_WHITE_LOGO} alt="" />
            </div>
            <div className="loginlogoSection">
                <img src={IMAGES.RL_LOGO} alt="" />
                <div className="logotext">Dealer Management System</div>
            </div>
            <Row>
                <Col xs={20} sm={18} md={14} lg={12} xl={8} style={{ margin: '23px auto 0' }}>
                    <div className="login-wrap">
                        <Form form={form} name="login_from" autoComplete="false" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                            {/* <Form form={form} name="login_from" onSubmit={handleSubmit}> */}
                            <Row>
                                <Col span={24}>
                                    <div className="login-html">
                                        <div className="login-form">
                                            <div>
                                                <div className="loginHeading">
                                                    <h4>Welcome!</h4>
                                                    <div className="loginsubHeading">Please enter your credentials to login</div>
                                                </div>
                                                <Form.Item name="userId" rules={[validateRequiredInputField('User ID(MILE ID.Parent ID)')]}>
                                                    <div className="input-group mb-3">
                                                        <div className="input-group-prepend">
                                                            <span className="input-group-text login_input-group-text">
                                                                <AiOutlineMail size={18} />
                                                            </span>
                                                        </div>
                                                        <input type="text" className="form-control input loginTextfield" placeholder="User ID(MILE ID.Parent ID)" />
                                                    </div>
                                                </Form.Item>
                                                <Form.Item name="password" rules={[validateRequiredInputField('password')]}>
                                                    <Row gutter={20}>
                                                        <Col span={24}>
                                                            <div className="input-group mb-3">
                                                                {' '}
                                                                <div className="input-group-prepend">
                                                                    <span className="input-group-text login_input-group-text">
                                                                        <AiOutlineLock size={18} />
                                                                    </span>
                                                                </div>
                                                                <input type={showPassword ? 'text' : 'password'} id="password" className="form-control input loginTextfield" placeholder="Password" />
                                                                <div className="input-group-prepend">
                                                                    <span className="input-group-text login_input-group-text fr" style={{ cursor: 'pointer' }} onClick={() => setShowPassword(!showPassword)}>
                                                                        {!showPassword ? <AiOutlineEyeInvisible className="text-[#DEDEDE]" size={18} /> : <AiOutlineEye className="text-white" size={18} />}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </Form.Item>

                                                <Row gutter={20}>
                                                    <Col span={24}>
                                                        <ReCAPTCHA className={'g-recaptcha'} ref={recaptchaRef} size="normal" theme="dark" border="" sitekey={process.env.REACT_APP_GOOGLE_SITW_KEY} onChange={onReCAPTCHAChange} />
                                                    </Col>
                                                </Row>

                                                <Row gutter={20}>
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.mrt10}>
                                                        <Button className={styles.button} type="primary" htmlType="submit">
                                                            Login
                                                        </Button>
                                                    </Col>
                                                </Row>
                                                <div className="hr"></div>
                                                <Row gutter={20}>
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                        <div className="loginFooter" type="radio">
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
                    </div>
                </Col>
            </Row>
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
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
