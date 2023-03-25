import React, { useEffect, useState } from 'react';
import OTPInput from 'otp-input-react';
import { useNavigate } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


import { doLogoutAPI } from 'store/actions/auth';
import { Form, Row, Col, Button, Input, Checkbox, Alert, notification } from 'antd';
import { UndoOutlined, CheckCircleOutlined,StopOutlined  } from '@ant-design/icons';
import { FaKey, FaInfoCircle, FaTimes, FaLock } from 'react-icons/fa';


import { handleErrorModal, handleSuccessModal } from 'utils/responseModal';

import { BiUser } from 'react-icons/bi';
import { CiCircleAlert } from 'react-icons/ci';
import OtpTimer from 'otp-timer';

import { ROUTING_LOGIN } from 'constants/routing';
import { validateRequiredInputField ,validateFieldsPassword} from 'utils/validation';
import styles from '../Auth.module.css';

import * as IMAGES from 'assets';
import { Link } from 'react-router-dom';
import Footer from '../Footer';
import { forgotPasswordActions } from 'store/actions/data/forgotPassword';
import { FiLock } from 'react-icons/fi';


const mapStateToProps = (state) => {
    const {
        auth: { token, isLoggedIn, userId },
        data: {
            ForgotPassword: { isLoading, isLoaded: isDataLoaded = false },
        },
    } = state;

    return {
        isDataLoaded,
        token,
        isLoggedIn,
        userId,
        isLoading,
    };
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            verifyUsers: forgotPasswordActions.saveData,
            doLogout: doLogoutAPI,
            listShowLoading: forgotPasswordActions.listShowLoading,
        },
        dispatch
    ),
});

const ForgotPasswordBase = ({ verifyUsers, isDataLoaded, listShowLoading }) => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedUserId, setSelectedUserId] = useState();

    const [alertNotification, contextAlertNotification] = notification.useNotification();
    const [otpverification, setotpverification] = useState(false);
    const [OTP, setOTP] = useState(false);
    const [OTPsent, setOTPsent] = useState(false);
    const [value, setValue] = useState('');
    const [submit, setSubmit] = useState(false);
    const [showtimer, setShowTimer] = useState(true);
    const [password, setPassword] = useState(false);

  
    const tailFormItemLayout = {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
      };

    useEffect(() => {
        form.resetFields();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [counter, setCounter] = React.useState(30);
    React.useEffect(() => {
        const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
        return () => {
            clearInterval(timer);
        };
    }, [counter]);

    const handleSendOtp = () => {
        setOTP(true);
        setOTPsent(true);
        setotpverification(true);
        setShowTimer(true);
        setPassword(false);

        alertNotification.open({
            icon: <CiCircleAlert />,
            message: 'OTP Sent',
            description: 'OTP sent to your registered mobile number and/or email ID.',
            duration: 5,
            className: styles.warning,
        });
        // alert('OTP sent to your registered mobile number and/or email ID');
    };

    const [mobileCheckBox, setMobileCheckBox] = useState(true);
    const [emailCheckBox, setEmailCheckBox] = useState(true);

    const Alert = () => {
        setCounter(30);
        alertNotification.open({
            icon: <CiCircleAlert />,
            message: 'OTP Sent',
            description: 'OTP sent to your registered mobile number and/or email ID.',
            duration: 5,
            className: styles.warning,
        });
    };

    const handleVerifyUser = () => {
        const userId = form.getFieldValue('userId');

        if (userId) {
            //APi Call
            setSelectedUserId(userId);
            setCurrentStep(2);
        }

        alertNotification.open({
            icon: <StopOutlined className={styles.toasticon} />,
            message: 'Invalid User ID',
            description: 'User id that you have entered is invalid, please try again.',
            duration: 0,
            className: styles.warning,
        });
    };

    const handleSendOTP = () => {
        const userId = form.getFieldValue('userId');
        if (userId) {
            //APi Call

            if (mobileCheckBox || emailCheckBox) {
                alertNotification.open({
                    icon: <CheckCircleOutlined />,
                    message: 'Success',
                    description: 'OTP sent successfully',
                    duration: 5,
                    className: styles.success,
                });
                setSelectedUserId(userId);
                setCurrentStep(3);
            }
        }
    };

    const handleVerifyOTP = () => {
        const userId = form.getFieldValue('userId');
        if (userId) {
            alertNotification.open({
                icon: <CheckCircleOutlined />,
                message: 'Success',
                description: 'OTP verified successfully',
                duration: 5,
                className: styles.success,
            });
            //APi Call
            setSelectedUserId(userId);
            setCurrentStep(4);
        }
    };
    const onFinish = (values) => {
        const data = { ...values };
        const onSuccess = (res) => {
            form.resetFields();
            // doLogout({
            //     successAction: () => {
            //     handleSuccessModal({ title: 'SUCCESS', message: res?.responseMessage });
            //     }
            // });
        };

        const onError = (message) => {
            handleErrorModal(message);
        };

        const requestData = {
            data: data,
            setIsLoading: listShowLoading,
            onSuccess,
            onError,
        };

        verifyUsers(requestData);
    }

    const compareToFirstPassword = (rule, value, callback) => {
        if (value && value !== form.getFieldValue('newPassword')) {
            callback("New Password and Confirm Password doesn't match!");
        } else {
            callback();
        }
    };
    const mobileCheckBoxChange = (event) => {
        console.log(event.target.checked,'Final Chek');
        setMobileCheckBox(event.target.checked);
      }
    
      const emailCheckBoxChange = (event) => {
        setEmailCheckBox(event.target.checked);
      }

    const handleNewPassword = () => {
        setOTP(false);
        setShowTimer(false);
        setPassword(true);
        setSubmit(true);

        alertNotification.open({
            icon: <CheckCircleOutlined />,
            message: 'Success',
            description: 'OTP verified successfully',
            duration: 5,
            className: styles.success,
        });
        // alert('Create new password');
    };

    const handleChangedPassword = () => {
        setOTP(false);
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
                        <Form form={form} name="login_from" autoComplete="false" onFinish={onFinish}>
                            <Row>
                                <Col span={24}>
                                    <div className={styles.loginHtml}>
                                        {currentStep === 1 ? (
                                            <div className={styles.centerInner}>
                                                <div className={styles.loginForm}>
                                                    <div className={styles.loginHeading}>
                                                        <h1>Forgot Your Password</h1>
                                                        <div className={styles.loginSubHeading}>Please enter your user credential</div>
                                                    </div>

                                                    <Row gutter={20}>
                                                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                            <Form.Item name="userId" rules={[validateRequiredInputField('User ID (mile id.parent id)')]} className={`${styles.inputBox} ${styles.marginBottomZero}`}>
                                                                <Input prefix={<BiUser size={18} style={{ color: '#ffffff' }} />} type="text" placeholder="User ID (mile id.parent id)" />
                                                            </Form.Item>
                                                        </Col>
                                                    </Row>

                                                    <Row gutter={20}>
                                                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                            <Button onClick={() => handleVerifyUser()} className={styles.button} id="login_from" type="primary" htmlType="submit">
                                                                Verify User
                                                            </Button>
                                                        </Col>
                                                    </Row>

                                                    <Row gutter={20}>
                                                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                            <div className={styles.loginFooter} type="radio">
                                                                <Link to={ROUTING_LOGIN}>Back to Login</Link>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </div>
                                        ) : currentStep === 2 ? (
                                            <>
                                            <div className={styles.centerInner}>
                                                <div className={styles.loginForm}>
                                                    <div className={styles.loginHeading}>
                                                        <h1>Forgot Your Password</h1>
                                                        <div className={styles.loginSubHeading}>User credential verified successfully.</div>
                                                    </div>
                                                    <Row gutter={20}>
                                                        <Col xs={24} sm={24} md={24} lg={20} xl={24}>
                                                            <Form.Item initialValue={selectedUserId}  name="userId" rules={[validateRequiredInputField('User id, mobile no, or email id')]} className={`${styles.inputBox} ${styles.disabledInput}`}>
                                                                <Input disabled prefix={<BiUser size={18}/>} type="text" placeholder="User ID (mile id.parent id)" style={{color: '#838383'}} />
                                                            </Form.Item>
                                                        </Col>
                                                    </Row>

                                                    <Row gutter={20}>
                                                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                            <div className={styles.registered}> OTP will be sent on </div>
                                                        </Col>
                                                    </Row>
                                                   

                                                    <Row gutter={20}>
                                                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                            <Checkbox className={styles.registered} defaultChecked="true"   onChange={mobileCheckBoxChange}>
                                                                Registered Mobile Number
                                                            </Checkbox>
                                                        </Col>
                                                    </Row>
                                                    <Row gutter={20}>
                                                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                            <Checkbox className={styles.registered} defaultChecked="true"  onChange={emailCheckBoxChange}>
                                                                Registered Mail ID
                                                            </Checkbox>
                                                        </Col>
                                                    </Row>
                                                    <Form.Item
                                                        name="agreement"
                                                        valuePropName="checked"
                                                        className={styles.fielderror}
                                                        rules={[
                                                            {
                                                            
                                                            validator: (_, value) =>
                                                            mobileCheckBox || emailCheckBox ? Promise.resolve() : Promise.reject(new Error('Please choose at least one option')),
                                                            },
                                                        ]}
                                                        
                                                    ></Form.Item>
                                                  
                                                
                                                    <Row gutter={20}>
                                                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                            <Button onClick={() => handleSendOTP()} className={styles.button} id="login_from" type="primary" htmlType="submit">
                                                                Send OTP
                                                            </Button>
                                                        </Col>
                                                    </Row>
                                                    

                                                    <Row gutter={20}>
                                                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                            <div className={styles.loginFooter} type="radio">
                                                                <Link to={ROUTING_LOGIN}>Back to Login</Link>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </div>
                                               
                                            </div> </>
                                        ) : currentStep === 3 ? (
                                            <div className={styles.centerInner}>
                                                <div className={styles.loginForm}>
                                                    <div className={styles.loginHeading}>
                                                        <h1>OTP Verification</h1>
                                                        <div className={styles.loginSubHeading}>
                                                            Please enter 6 digit OTP sent to your <br></br> registered mobile number +91-96 XXXX XXXX
                                                        </div>
                                                    </div>
                                                    <Row gutter={20}>
                                                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                            <div className={styles.checkColor}> Enter Otp </div>
                                                        </Col>
                                                    </Row>
                                                    <Row gutter={20}>
                                                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                            <OTPInput className={styles.changer} value={value} onChange={handleChange} autoFocus OTPLength={6} disabled={false} />
                                                        </Col>
                                                    </Row>
                                                    <Row gutter={20}>
                                                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                            {counter != 0 ? (
                                                                <>
                                                                    <Row gutter={20}>
                                                                        <Col xs={16} sm={16} md={16} lg={16} xl={16}>
                                                                            <div className={styles.checkColor}>
                                                                                00:{counter > 9 ? null : '0'}
                                                                                {counter}s
                                                                            </div>
                                                                        </Col>
                                                                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                                                            <div onClick={() => setCounter(30)} className={styles.resendDisabled} type="radio">
                                                                                <UndoOutlined /> Resend OTP
                                                                            </div>
                                                                        </Col>{' '}
                                                                    </Row>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Row gutter={20}>
                                                                        <Col xs={16} sm={16} md={16} lg={16} xl={16}>
                                                                            <div className={styles.checkColors}>Didn't receive OTP?</div>
                                                                        </Col>
                                                                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                                                            <div onClick={() => Alert()} className={styles.resendEnabled} type="radio">
                                                                                <UndoOutlined /> Resend OTP
                                                                            </div>
                                                                        </Col>{' '}
                                                                    </Row>{' '}
                                                                </>
                                                            )}
                                                        </Col>
                                                    </Row>

                                                    <Button onClick={handleVerifyOTP} className={styles.button} type="primary" htmlType="submit">
                                                        Verify OTP
                                                    </Button>

                                                    <Row gutter={20}>
                                                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                            <div className={styles.loginFooter} type="radio">
                                                                <Link to={ROUTING_LOGIN}>Back to Login</Link>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </div>
                                        ) : currentStep === 4 ? (
                                            <div className={styles.centerInner}>
                                                <div className={styles.loginForm}>
                                                    <div className={styles.loginHeading}>
                                                        <h1 className={styles.inputBox}>Create New Password</h1>

                                                        <Row gutter={20}>
                                                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                                <Form.Item name="newPassword" rules={[validateRequiredInputField('New password'),validateFieldsPassword('New Password')]} className={`${styles.changer} ${styles.inputBox}`}>
                                                                    <Input.Password prefix={<FiLock size={18} />} type="text" placeholder="Enter new password" visibilityToggle={true} />
                                                                </Form.Item>
                                                            </Col>
                                                        </Row>
                                                        <Row gutter={20}>
                                                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                                <Form.Item name="confirmPassword" rules={[validateRequiredInputField('New password again'),validateFieldsPassword('New Password again'),{ validator: compareToFirstPassword,}]} className={styles.inputBox}>
                                                                    <Input.Password prefix={<FiLock size={18} />} type="text" placeholder="Re-enter new password" visibilityToggle={true} />
                                                                </Form.Item>
                                                            </Col>
                                                        </Row>
                                                        <Button id="login_from"  onClick={handleChangedPassword} className={styles.button} type="primary" htmlType="submit">
                                                            Submit
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : null}
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

export const ForgotPassword = connect(null, mapDispatchToProps)(ForgotPasswordBase);
