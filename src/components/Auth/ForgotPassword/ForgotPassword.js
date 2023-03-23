import React, { useEffect, useState } from 'react';
import OTPInput from 'otp-input-react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Form, Row, Col, Button, Input, Checkbox,Alert } from 'antd';
import {UndoOutlined} from '@ant-design/icons'
import { FaKey, FaInfoCircle, FaTimes } from 'react-icons/fa';
import { BiUser } from 'react-icons/bi';
import OtpTimer from 'otp-timer'


import { ROUTING_LOGIN } from 'constants/routing';
import { validateRequiredInputField } from 'utils/validation';
import styles from '../Auth.module.css';

import * as IMAGES from 'assets';
import { Link, Navigate } from 'react-router-dom';
import Footer from '../Footer';

const ForgotPassword = (props) => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [showFields, setShowFields] = useState(false);
    const [resend, setresend] = useState(false);
    const [userId, setuserId] = useState(true)
    const [otpverification, setotpverification] = useState(false);
    const [OTP, setOTP] = useState(false);
    const [OTPsent, setOTPsent] = useState(false);
    const [value, setValue] = useState('');
    const [submit, setSubmit] = useState(false);
    const [validate, setValidate] = useState(false);
    const [verifyUser, setverifyUser] = useState(false);
    const [showtimer, setShowTimer] = useState(true);
    const [password, setPassword] = useState(false);
    const [passwordChanged, setPasswordChanged] = useState(false);

    useEffect(() => {
        form.resetFields();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [counter, setCounter] = React.useState(10);
    React.useEffect(() => {
        const timer =
        counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
        return () => {
            clearInterval(timer);
        }
        
    }, [counter]);

    const handleSendOtp = () => {
        setOTP(true);
        setotpverification(true);
        setShowFields(false);
        setShowTimer(true);
        setValidate(true);
        setPassword(false);
     
        // alert('OTP sent to your registered mobile number and/or email ID');
    };

    const resendOTP= ()=>
    {
        setOTPsent(true);
        
    }

    const verifyUserbtn =()=>{
        setverifyUser(true);
        setShowFields(true);
        setuserId(false);
    }

    const handleNewPassword = () => {
        setOTP(false);
        setShowTimer(false);
        setPassword(true);
        setSubmit(true);
        // alert('Create new password');
    };

    const handleChangedPassword = () => {
        setOTP(false);
        setPasswordChanged(true);
        navigate(ROUTING_LOGIN);
        setShowTimer(false);
        setPassword(false);
        setSubmit(false);
        
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
                                          <Alert message="Your password has been successfully changed. Please login with your new credentials" type="success" showIcon />
                                             
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
                                                            ) : (userId ?(
                                                                <>
                                                                    <h1>Forgot Your Password</h1>
                                                                    <div className={styles.loginSubHeading}>Please enter your user details.</div>
                                                                </>
                                                            ):(otpverification ?(
                                                                <>
                                                                <h1>OTP Verification</h1>
                                                                <div className={styles.loginSubHeading}>Please enter 6 digit OTP sent to your registered Mobile number +91-966 XXXX XXXX</div>
                                                                 </>

                                                             ) :
                                                             <>
                                                            <h1>Forgot Your Password</h1>
                                                            <div className={styles.loginSubHeading}>User Credentials verified successfully</div>
                                                             </>
                                                        ))
                                                        }
                                                        </div>

                                                        {userId ? (
                                                        <Row gutter={20}>
                                                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                                <Form.Item name="userId" rules={[validateRequiredInputField('User id, mobile no, or email id')]} className={styles.inputBox}>
                                                                    <Input prefix={<BiUser size={18} />} type="text" placeholder="User id, mobile no, or email id" />
                                                                    {/* As discussed with Rahul */}
                                                                </Form.Item>
                                                            </Col>
                                                        </Row>):null}
                                                        {showFields ? (
                                                            <>
                                                            <Row gutter={20}>
                                                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                               <div className={styles.registered} > OTP will be sent on </div>
                                                            </Col>
                                                            </Row>
                                                            <Row gutter={20}>
                                                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                                    <Checkbox className={styles.registered} defaultChecked="true" disabled="true">
                                                                        Registered Mobile Number
                                                                    </Checkbox>
                                                                </Col>
                                                            </Row></>
                                                        ) : null}

                                                        {showFields ? (
                                                            <Row gutter={20}>
                                                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                                    <Checkbox className={styles.registered} defaultChecked="true" disabled="true">
                                                                        Registered Mail ID
                                                                    </Checkbox>
                                                                </Col>
                                                            </Row>
                                                        ) : null}
                                                        {/* <br /> */}
                                                        {OTP ? (
                                                            <>
                                                            <Row>
                                                                <Col span={4}>
                                                                    <div className={styles.checkColor}> Enter Otp </div>
                                                                </Col>
                                                            </Row>
                                                                <Row>
                                                                    <Col span={4}>
                                                                        <OTPInput  className={styles.changer} value={value} onChange={handleChange} autoFocus OTPLength={6} disabled={false}  />
                                                                    </Col>
                                                                </Row>
                                                                <Row >
                                                                    <Col>
                                                                        {counter != 0 ? (
                                                                            <>
                                                                           
                                                                                <div>
                                                                                  <span style={{color:"white"}}>
                                                                                     00:{counter > 9 ? null : "0"}{counter}
                                                                                    </span>

                                                                                </div> 

                                                                                
                                                                                
                                                                            </>
                                                                        ) : (
                                                                            <>
                                                                            
                                                                                <div onClick={ () => setCounter(10)} className={styles.resend} type="radio">
                                                                                <UndoOutlined />  Resend OTP
                                                                                 </div>
                                                                            </>
                                                                        )
                                                                        }
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
                                                                ) : validate ? (
                                                                    <Button onClick={handleNewPassword} className={styles.button} type="primary" htmlType="submit">
                                                                        Verify OTP
                                                                    </Button>
                                                                ) : verifyUser?(
                                                                <Button onClick={handleSendOtp} className={styles.button} type="primary" htmlType="submit">
                                                                     Send OTP
                                                                </Button>
                                                                ):(
                
                                                             <Button onClick= {() => verifyUserbtn()} className={styles.button} id="login_from" type="primary" htmlType="submit">
                                                                Verify User
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
                                        </>
                                    )}
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </div>
                {OTPsent && (
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
                )}
                <Footer />
            </div>
        </>
    );
};

export default ForgotPassword;
