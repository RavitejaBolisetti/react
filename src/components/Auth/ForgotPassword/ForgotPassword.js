import React, { useEffect, useState } from 'react';
import OTPInput, { ResendOTP } from 'otp-input-react';

import { connect } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Row, Col, Button, Input, Checkbox } from 'antd';
import { FaTimes, FaExclamationTriangle } from 'react-icons/fa';
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai';

import { doLogin, doCloseLoginError, doCloseUnAuthenticatedError } from 'store/actions/auth';
import { loginPageIsLoading } from 'store/actions/authPages/LoginPage';

import { ROUTING_DASHBOARD, ROUTING_LOGIN } from 'constants/routing';
import { validateRequiredInputField } from 'utils/validation';
import styles from './ForgotPassword.module.css';

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

const ForgotPassword = (props) => {
    const { doLogin, isError, doCloseLoginError, errorTitle, errorMessage } = props;
    const [form] = Form.useForm();
    const [showFields, setShowFields] = useState(false);
    const [OTP, setOTP] = useState(false);

    const navigate = useNavigate();
    useEffect(() => {
        doCloseLoginError();

        form.resetFields();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onFinish = (values) => {
        // const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        // values.timeZone = timeZone;
        doLogin(values, loginPageIsLoading, () => navigate(ROUTING_DASHBOARD));
    };

    const onFinishFailed = (errorInfo) => {
        form.validateFields().then((values) => {});
    };

    const handleSendOtp = () => {
        setOTP(true)
        setShowFields(false)
    }

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
                                                    <h4>Forgot Your Password!</h4>
                                                    <div className={styles.loginSubHeading}>Please enter your user details.</div>
                                                </div>
                                                <Row gutter={20}>
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                        <Form.Item name="userId" rules={[validateRequiredInputField('User ID (MILE ID.Parent ID) / Token No.')]} className={styles.inputBox}>
                                                            <Input onBlur ={() => setShowFields(!showFields)} prefix={<AiOutlineMail size={18} />} type="text" placeholder="User ID (MILE ID.Parent ID / Token No.)" />
                                                            {/* As discussed with Rahul */}
                                                        </Form.Item>
                                                    </Col>
                                                </Row>
                                                {showFields ? (
                                                    <Row gutter={20}>
                                                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                            <Checkbox  className={styles.checkColor} defaultChecked="true">
                                                                Mobile Number - <span>99****1234</span>
                                                            </Checkbox>
                                                        </Col>
                                                    </Row>
                                                ) : null}
                                                {showFields ? (
                                                    <Row gutter={20}>
                                                        <Col xs={24} sm={24} md={24} lg={24} xl={24} >
                                                            <Checkbox className={styles.checkColor} defaultChecked="true">Email ID - abcdef@mahindra.com</Checkbox>
                                                        </Col>
                                                    </Row>
                                                ) : null}
                                               {OTP? (
                                                <>
                                               <OTPInput value={OTP} onChange={setOTP} autoFocus OTPLength={4} otpType="number" disabled={false} secure />
                                                <ResendOTP handelResendClick={() => console.log('Resend clicked')}/>
                                                </> )
                                                : null } 

                                                <Row gutter={20}>
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                        <Button onClick={handleSendOtp} className={styles.button} style={{ marginTop: '20px' }} type="primary" htmlType="submit">
                                                            SEND OTP
                                                        </Button>
                                                    </Col>
                                                </Row>
                                                <Row gutter={20}>
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                        <div className={styles.loginFooter} type="radio">
                                                            <Link to={ROUTING_LOGIN}>Back To Login Page</Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
