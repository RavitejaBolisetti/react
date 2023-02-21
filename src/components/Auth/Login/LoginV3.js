import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Row, Col, Button, Input, message } from 'antd';
import { FaUser, FaTimes, FaExclamationTriangle } from 'react-icons/fa';
import { AiOutlineLock } from 'react-icons/ai';

import { doLogin, doCloseLoginError, doCloseUnAuthenticatedError } from 'store/actions/auth';
import { loginPageIsLoading } from 'store/actions/authPages/LoginPage';

import { ROUTING_FORGOT_PASSWORD, ROUTING_DASHBOARD } from 'constants/routing';
import { validateRequiredInputField } from 'utils/validation';
import styles from '../Auth.module.css';

import * as IMAGES from 'assets';
import ReactRecaptcha3 from 'react-google-recaptcha3';

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
    const [captcha, setCaptcha] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        ReactRecaptcha3.init('6LedAJEUAAAAAPttxeFNp6ZtAvKGI8D9gESE-hl3').then((status) => {
            console.log(status, 'status');
        });

        return () => {
            ReactRecaptcha3.destroy();
            form.resetFields();
            doCloseLoginError();
            setCaptcha('');
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                setCaptcha(captchaCode);
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

    return (
        <>
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
                                                            {<Input prefix={<FaUser size={16} />} type="text" placeholder="User ID (MILE ID.Parent ID / Token No.)" />}
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
                                                        <Button className={styles.button} style={{ marginTop: '20px' }} type="primary" htmlType="submit" loading={isLoading}>
                                                            Login
                                                        </Button>
                                                    </Col>
                                                </Row>
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
            </div>
        </>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
