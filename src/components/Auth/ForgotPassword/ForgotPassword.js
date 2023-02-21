import React, { useEffect, useState } from 'react';
import OTPInput from 'otp-input-react';

import { Form, Row, Col, Button, Input, Checkbox } from 'antd';
import { FaKey, FaInfoCircle, FaTimes } from 'react-icons/fa';
import { BiUser } from 'react-icons/bi';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

import { ROUTING_LOGIN } from 'constants/routing';
import { validateRequiredInputField } from 'utils/validation';
import styles from '../Auth.module.css';

import * as IMAGES from 'assets';
import { Link } from 'react-router-dom';

const ForgotPassword = (props) => {
    const [form] = Form.useForm();
    const [showFields, setShowFields] = useState(false);
    const [OTP, setOTP] = useState(false);
    const [OTPsent, setOTPsent] = useState(false);
    const [value, setValue] = useState('');
    const [submit, setSubmit] = useState(false);
    const [validate, setValidate] = useState(false);
    const [showtimer, setShowTimer] = useState(true);
    const [password, setPassword] = useState(false);
    const [passwordChanged, setPasswordChanged] = useState(false);

    useEffect(() => {
        form.resetFields();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSendOtp = () => {
        setOTP(true);
        setShowTimer(true);
        setValidate(true);
        setPassword(false);
        setOTPsent(true);
        // alert('OTP sent to your registered mobile number and/or email ID');
    };

    const handleNewPassword = () => {
        setOTP(false);
        setShowTimer(false);
        setPassword(true);
        setSubmit(true);
        // alert('Create new password');
    };

    const handleChangedPassword = () => {
        setOTP(false);
        setShowTimer(false);
        setPassword(false);
        setSubmit(false);
        setPasswordChanged(true);
    };

    const handleChange = (event) => {
        setValue(event);
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
                        <Form form={form} name="login_from" autoComplete="false">
                            <Row>
                                <Col span={24}>
                                    {passwordChanged ? (
                                        <>
                                            <div className={styles.logOutHtml}>
                                                <div className={styles.centerInner}>
                                                    <div className={styles.loginForm}>
                                                        <div className={styles.logOutHeading}>
                                                            <h1>Congratulations!</h1>
                                                            <h3>Password changed successfully.</h3>
                                                            {/* <div className={styles.logOutSubHeading}>Password changed successfully.</div> */}
                                                            <div className={styles.logOutSubHeading}>Please click the <strong>Login</strong> button to <br></br> <strong>&nbsp;Login</strong> again.</div>
                                                        </div>
                                                        <Button className={styles.button} type="primary" htmlType="link" href={ROUTING_LOGIN}>
                                                            Login
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className={styles.loginHtml}>
                                                <div className={styles.centerInner}>
                                                    <div className={styles.loginForm}>
                                                        <div className={styles.loginHeading}>
                                                            {submit ? (
                                                                <>
                                                                    <h1 className={styles.inputBox}>Create New Password!</h1>
                                                                    {/* <div className={styles.loginSubHeading}>Please enter your user details.</div> */}
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <h1>Forgot Your Password!</h1>
                                                                    <div className={styles.loginSubHeading}>Please enter your user details.</div>
                                                                </>
                                                            )}
                                                        </div>
                                                        <Row gutter={20}>
                                                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                                <Form.Item name="userId" rules={[validateRequiredInputField('User ID (MILE ID.Parent ID) / Token No.')]} className={styles.inputBox}>
                                                                    <Input onBlur={() => setShowFields(true)} prefix={<BiUser size={18} />} type="text" placeholder="User ID (MILE ID.Parent ID / Token No.)" />
                                                                    {/* As discussed with Rahul */}
                                                                </Form.Item>
                                                            </Col>
                                                        </Row>
                                                        {showFields ? (
                                                            <Row gutter={20}>
                                                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                                    <Checkbox className={styles.checkColor} defaultChecked="true" disabled="true">
                                                                        Mobile Number - <span>XXXXXX1234</span>
                                                                    </Checkbox>
                                                                </Col>
                                                            </Row>
                                                        ) : null}

                                                        {showFields ? (
                                                            <Row gutter={20}>
                                                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                                    <Checkbox className={styles.checkColor} defaultChecked="true" disabled="true">
                                                                        Email ID - abcdefXXXX@mahindra.com
                                                                    </Checkbox>
                                                                </Col>
                                                            </Row>
                                                        ) : null}
                                                        {/* <br /> */}
                                                        {OTP ? (
                                                            <>
                                                                <Row>
                                                                    <Col span={4}>
                                                                        <OTPInput className={styles.changer} value={value} onChange={handleChange} autoFocus OTPLength={6} disabled={false} />
                                                                    </Col>
                                                                    <Col span={4} offset={15}>
                                                                        {showtimer ? (
                                                                            <>
                                                                                <CountdownCircleTimer
                                                                                    size={100}
                                                                                    isPlaying
                                                                                    duration={10}
                                                                                    colors={['#FF3E5B']}
                                                                                    onComplete={() => {
                                                                                        setShowTimer(false);
                                                                                    }}
                                                                                >
                                                                                    {({ remainingTime }) => {
                                                                                        return <div className={styles.clock}>{remainingTime} <br></br>Seconds</div>;
                                                                                    }}
                                                                                </CountdownCircleTimer>{' '}
                                                                            </>
                                                                        ) : (
                                                                            <>
                                                                                {' '}
                                                                                <Button onClick={handleSendOtp} className={styles.buttonResend} type="primary" htmlType="submit">
                                                                                    RESEND <br></br> OTP
                                                                                </Button>
                                                                            </>
                                                                        )}
                                                                    </Col>
                                                                </Row>
                                                            </>
                                                        ) : null}

                                                        {password ? (
                                                            <>
                                                                <Row gutter={20}>
                                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                                        <Form.Item name="newPassword" rules={[validateRequiredInputField('New password')]} className={`${styles.changer} ${styles.inputBox}`}>
                                                                            <Input.Password prefix={<FaKey size={18} />} type="text" placeholder="Enter new password" visibilityToggle={true} />
                                                                        </Form.Item>
                                                                    </Col>
                                                                </Row>
                                                                <Row gutter={20}>
                                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                                        <Form.Item name="confirmPassword" rules={[validateRequiredInputField('New password again')]} className={styles.inputBox}>
                                                                            <Input.Password prefix={<FaKey size={18} />} type="text" placeholder="Re-enter new password" visibilityToggle={false} />
                                                                        </Form.Item>
                                                                    </Col>
                                                                </Row>
                                                            </>
                                                        ) : null}

                                                        <Row gutter={20}>
                                                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                                {submit ? (
                                                                    <Button onClick={handleChangedPassword} className={styles.button} type="primary" htmlType="submit">
                                                                        Submit
                                                                    </Button>
                                                                ) : (
                                                                    validate ? (
                                                                        <Button onClick={handleNewPassword} className={styles.button} type="primary" htmlType="submit">
                                                                            Validate OTP
                                                                        </Button>
                                                                    ) : (
                                                                        <Button onClick={handleSendOtp} className={styles.button} type="primary" htmlType="submit">
                                                                            Generate OTP
                                                                        </Button>
                                                                    )
                                                                )}
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
                                        </>
                                    )}
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </div>
                {
                    OTPsent && (
                        <div className={styles.errorBoxContainer}>
                            <h5>
                                <span className={styles.infoIcon}>
                                    <FaInfoCircle size={18} />
                                </span>
                                <span className={styles.errorTitle}>
                                    {/* {errorTitle} */}
                                    Notification
                                </span>
                                <span className={styles.loginErrorClose}>
                                    <FaTimes size={18} />
                                </span>
                            </h5>
                            <div className="form_card">
                                {/* <p>{errorMessage}</p> */}
                                <p>OTP sent to your registered mobile number and/or email ID</p>
                            </div>
                        </div>
                    )
                }
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
            </div >
        </>
    );
};

export default ForgotPassword;
