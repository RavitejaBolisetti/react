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
import Footer from '../Footer';

const UpdatePassword = (props) => {
    const [form] = Form.useForm();
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
                                    <div className={styles.loginHtml}>
                                        <div className={styles.centerInner}>
                                            <div className={styles.loginForm}>
                                                <div className={styles.loginHeading}>
                                                    <h1>Update Your Password!</h1>
                                                    <div className={styles.loginSubHeading}>Please create a new password as your password has been expired after 90 days.</div>
                                                </div>
                                                <Row gutter={20}>
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                        <Form.Item name="oldPassword" rules={[validateRequiredInputField('Old password')]} className={`${styles.inputBox}`}>
                                                            <Input.Password prefix={<FaKey size={18} />} type="text" placeholder="Enter old password" visibilityToggle={true} />
                                                        </Form.Item>
                                                    </Col>
                                                </Row>
                                                <Row gutter={20}>
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                        <Form.Item name="newPassword" rules={[validateRequiredInputField('New password')]} className={`${styles.inputBox}`}>
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

                                                <Row gutter={20}>
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                        <Button onClick={handleChangedPassword} className={styles.button} type="primary" htmlType="submit">
                                                            Submit
                                                        </Button>
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

export default UpdatePassword;
