import React, { useEffect, useState } from 'react';
import OTPInput from 'otp-input-react';

import { Form, Row, Col, Button, Input, Checkbox } from 'antd';
import { AiOutlineMail } from 'react-icons/ai';
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
    const [value, setValue] = useState('');
    const [submit, setSubmit] = useState(false);
    const [showtimer, setShowTimer] = useState(true);

    useEffect(() => {
        form.resetFields();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSendOtp = () => {
        setOTP(true);
        setShowTimer(true);
        setSubmit(true);
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
                        <img src={IMAGES.RL_LOGO} alt="" />
                        <div className={styles.logoText}>Dealer Management System</div>
                    </div>
                    <div className={styles.loginWrap}>
                        <Form form={form} name="login_from" autoComplete="false">
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
                                                            <Input onBlur={() => setShowFields(true)} prefix={<AiOutlineMail size={18} />} type="text" placeholder="User ID (MILE ID.Parent ID / Token No.)" />
                                                            {/* As discussed with Rahul */}
                                                        </Form.Item>
                                                    </Col>
                                                </Row>
                                                {showFields ? (
                                                    <Row gutter={20}>
                                                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                            <Checkbox className={styles.checkColor} defaultChecked="true">
                                                                Mobile Number - <span>99****1234</span>
                                                            </Checkbox>
                                                        </Col>
                                                    </Row>
                                                ) : null}

                                                {showFields ? (
                                                    <Row gutter={20}>
                                                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                            <Checkbox className={styles.checkColor} defaultChecked="true">
                                                                Email ID - abcdef@mahindra.com
                                                            </Checkbox>
                                                        </Col>
                                                    </Row>
                                                ) : null}
                                                <br />
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
                                                                            duration={5}
                                                                            colors={['#FF3E5B']}
                                                                            onComplete={() => {
                                                                                setShowTimer(false);
                                                                            }}
                                                                        >
                                                                            {({ remainingTime }) => {
                                                                                return <div className={styles.clock}>{remainingTime} Seconds</div>;
                                                                            }}
                                                                        </CountdownCircleTimer>{' '}
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        {' '}
                                                                        <Button onClick={handleSendOtp} className={styles.buttonResend} type="primary" htmlType="submit">
                                                                            RE-SEND <br></br> OTP
                                                                        </Button>
                                                                    </>
                                                                )}
                                                            </Col>
                                                        </Row>
                                                    </>
                                                ) : null}

                                                <Row gutter={20}>
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                        {submit ? (
                                                            <Button onClick={handleSendOtp} className={styles.button} type="primary" htmlType="submit">
                                                                Submit
                                                            </Button>
                                                        ) : (
                                                            <Button onClick={handleSendOtp} className={styles.button} type="primary" htmlType="submit">
                                                                SEND OTP
                                                            </Button>
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
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ForgotPassword;
