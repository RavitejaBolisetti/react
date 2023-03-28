import React, { useEffect, useState } from 'react';
import OTPInput from 'otp-input-react';
import { useNavigate } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { doLogoutAPI } from 'store/actions/auth';
import { Form, Row, Col, Button, Input, Checkbox, notification } from 'antd';
import { UndoOutlined, CheckCircleOutlined, StopOutlined } from '@ant-design/icons';
import { showGlobalNotification } from 'store/actions/notification';

import { BiUser } from 'react-icons/bi';
import { CiCircleAlert } from 'react-icons/ci';
// import OTPTimer from 'otp-timer';

import { ROUTING_LOGIN } from 'constants/routing';
import { validateFieldsPassword, validateRequiredInputField } from 'utils/validation';
import styles from '../Auth.module.css';

import * as IMAGES from 'assets';
import { Link } from 'react-router-dom';
import Footer from '../Footer';
import { forgotPasswordActions } from 'store/actions/data/forgotPassword';
import { FiLock } from 'react-icons/fi';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { ButtonGroup } from 'react-bootstrap';

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
            verifyUser: forgotPasswordActions.verifyUser,
            sendOTP: forgotPasswordActions.sendOTP,
            validateOTP: forgotPasswordActions.validateOTP,
            updatePassword: forgotPasswordActions.updatePassword,
            doLogout: doLogoutAPI,
            listShowLoading: forgotPasswordActions.listShowLoading,
            showGlobalNotification,
        },
        dispatch
    ),
});

const ForgotPasswordBase = ({ verifyUser, sendOTP, validateOTP, updatePassword, showGlobalNotification, listShowLoading }) => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const [currentStep, setCurrentStep] = useState(1);
    const [selectedUserId, setSelectedUserId] = useState();
    const [otpMessage, setOTPMessage] = useState();
    const [otpSentOnMobile, setOTPSentOnMobile] = useState(true);
    const [otpSentOnEmail, setOTPSentOnEmail] = useState(true);
    const [counter, setCounter] = useState(30);
    const [otpInput, setOTPInput] = useState();
    const [validationKey, setValidationKey] = useState();

    const [alertNotification, contextAlertNotification] = notification.useNotification();

    useEffect(() => {
        const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
        return () => {
            clearInterval(timer);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [counter]);

    const onError = (message) => {
        showGlobalNotification({ title: 'Information', message: message[0] || message });
    };

    const onVerifyUser = (values) => {
        const userId = values?.userId;

        if (userId) {
            const data = { userId };
            setSelectedUserId(userId);

            const onSuccess = () => {
                setCurrentStep(2);
            };

            const requestData = {
                data: data,
                setIsLoading: listShowLoading,
                onSuccess,
                onError,
            };
            verifyUser(requestData);
        }
    };

    const onSentOTP = (values) => {
        if (values) {
            handleSendOTP();
        }
    };

    const handleSendOTP = () => {
        if (selectedUserId) {
            if (otpSentOnMobile || otpSentOnEmail) {
                const data = { userId: selectedUserId, sentOnMobile: otpSentOnMobile, sentOnEmail: otpSentOnEmail };

                const onSuccess = (res) => {
                    setCounter(30);
                    showGlobalNotification({ notificationType: 'success', title: 'OTP Sent', message: res?.responseMessage });
                    setOTPMessage(res?.data?.message);
                    setCurrentStep(3);
                };

                const requestData = {
                    data: data,
                    setIsLoading: listShowLoading,
                    onSuccess,
                    onError,
                };

                sendOTP(requestData);
            }
        }
    };

    const handleVerifyOTP = () => {
        if (selectedUserId) {
            const data = { userId: selectedUserId, otp: otpInput };

            const onSuccess = (res) => {
                setValidationKey(res?.data?.validationKey);
                showGlobalNotification({ notificationType: 'success', title: 'OTP Sent', message: res?.responseMessage });
                setCurrentStep(4);
            };

            const requestData = {
                data: data,
                setIsLoading: listShowLoading,
                onSuccess,
                onError,
            };

            validateOTP(requestData);
        }
    };

    const onUpdatePassword = (values) => {
        if (selectedUserId && values) {
            const data = { ...values, userId: selectedUserId, validationKey };

            const onSuccess = (res) => {
                showGlobalNotification({ notificationType: 'success', title: 'Password Changed', message: res?.responseMessage });
                navigate(ROUTING_LOGIN);
            };

            const requestData = {
                data: data,
                setIsLoading: listShowLoading,
                onSuccess,
                onError,
            };

            updatePassword(requestData);
        }
    };

    const onUpdatePasswordFailed = ({ values, errorFields, outOfDate }) => {
        // handle invalid form submission
    };

    const otpSentOnMobileChange = (event) => {
        console.log(event.target.checked, 'Final Chek');
        setOTPSentOnMobile(event.target.checked);
    };

    const otpSentOnEmailChange = (event) => {
        setOTPSentOnEmail(event.target.checked);
    };


    const validateOTPOption = (_, value) => {
        if (!(otpSentOnMobile || otpSentOnEmail)) {
            return Promise.reject(new Error('Please choose at least one option'));
        }
        return Promise.resolve();
    };

    const validateToNextPassword = (_, value) => {
        if (value) {
            form.validateFields(['confirmNewPassword'], { force: true });
            return Promise.resolve();
        }
        return Promise.resolve();
    };

    const compareToFirstPassword = (_, value) => {
        if (value && value !== form.getFieldValue('newPassword')) {
            return Promise.reject(new Error("New Password and Confirm Password doesn't match"));
        } else {
            return Promise.resolve();
        }
    };

    const handleOTPInput = (value) => {
        setOTPInput(value);
    };

    const onFinishFailed = ({ values, errorFields, outOfDate }) => {
        // handle invalid form submission
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
                        <Row>
                            <Col span={24}>
                                <div className={styles.loginHtml}>
                                    {currentStep === 1 ? (
                                        <div className={styles.centerInner}>
                                            <div className={styles.loginForm}>
                                                <Form form={form} id="verifyUser" autoComplete="false" onFinish={onVerifyUser} onFinishFailed={onFinishFailed}>
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
                                                            <Button form="verifyUser" className={styles.button} type="primary" htmlType="submit">
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
                                                </Form>
                                            </div>
                                        </div>
                                    ) : currentStep === 2 ? (
                                        <>
                                            <div className={`${styles.centerInner} ${styles.verifyUser}`}>
                                                <div className={styles.loginForm}>
                                                    <div className={styles.loginHeading}>
                                                        <h1>Forgot Your Password</h1>
                                                        <div className={styles.loginSubHeading}>User verified successfully</div>
                                                    </div>
                                                    <Form form={form} id="sendOTP" autoComplete="false" onFinish={onSentOTP} onFinishFailed={onFinishFailed}>
                                                        <Row gutter={20}>
                                                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                                <Form.Item initialValue={selectedUserId} name="userId" rules={[validateRequiredInputField('User id, mobile no, or email id')]} className={`${styles.inputBox} ${styles.disabledInput}`}>
                                                                    <Input value={selectedUserId} disabled prefix={<BiUser size={18} />} type="text" placeholder="User ID (mile id.parent id)" style={{ color: '#838383' }} />
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
                                                                <Form.Item name="sentOnMobile" className={styles.fielderror}>
                                                                    <Checkbox className={styles.registered} defaultChecked="true" onChange={otpSentOnMobileChange}>
                                                                        Registered Mobile Number
                                                                    </Checkbox>
                                                                </Form.Item>
                                                            </Col>
                                                        </Row>
                                                        <Row gutter={20}>
                                                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                                <Form.Item
                                                                    name="sentOnEmail"
                                                                    className={styles.fielderror}
                                                                    rules={[
                                                                        {
                                                                            validator: validateOTPOption,
                                                                        },
                                                                    ]}
                                                                >
                                                                    <Checkbox className={styles.registered} defaultChecked="true" onChange={otpSentOnEmailChange}>
                                                                        Registered Mail ID
                                                                    </Checkbox>
                                                                </Form.Item>
                                                            </Col>
                                                        </Row>

                                                        <Row gutter={20}>
                                                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                                <Button form="sendOTP" className={styles.button} type="primary" htmlType="submit">
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
                                                    </Form>
                                                </div>
                                            </div>{' '}
                                        </>
                                    ) : currentStep === 3 ? (
                                        <div className={styles.centerInner}>
                                            <div className={styles.loginForm}>
                                                <div className={styles.loginHeading}>
                                                    <h1>OTP Verification</h1>
                                                    <div className={styles.loginSubHeading}>{otpMessage ? otpMessage : 'Please enter 6 digit OTP sent to your <br></br> registered mobile number +91-96 XXXX XXXX'}</div>
                                                </div>
                                                <Row gutter={20}>
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                        <div className={styles.checkColor}> Enter OTP </div>
                                                    </Col>
                                                </Row>
                                                <Row gutter={20}>
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                        <OTPInput className={styles.changer} value={otpInput} onChange={handleOTPInput} autoFocus OTPLength={6} disabled={false} />
                                                    </Col>
                                                </Row>
                                                <Row gutter={20}>
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                        <Row gutter={20}>
                                                            <Col xs={16} sm={16} md={16} lg={16} xl={16}>
                                                                <div className={styles.checkColors}>{counter ? `${counter >= 10 ? counter : `0${counter}`}s` : "Didn't receive OTP?"}</div>
                                                            </Col>
                                                            <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                                                <div onClick={() => handleSendOTP()} className={counter ? styles.resendDisabled : styles.resendEnabled} type="radio">
                                                                    <UndoOutlined /> Resend OTP
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>

                                                <Button onClick={handleVerifyOTP} className={styles.button} type="primary">
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
                                                <Form id="updatePassword" form={form} autoComplete="false" onFinish={onUpdatePassword} onFinishFailed={onUpdatePasswordFailed} layout="vertical">
                                                    <div className={styles.loginHeading}>
                                                        <h1 className={styles.inputBox}>Create New Password</h1>
                                                        <Row gutter={20}>
                                                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                                <Form.Item
                                                                    name="newPassword"
                                                                    rules={[
                                                                        validateRequiredInputField('New Password'),
                                                                        validateFieldsPassword('New Password'),
                                                                        // {
                                                                        //     validator: validateToNextPassword,
                                                                        // },
                                                                    ]}
                                                                    className={`${styles.changer} ${styles.inputBox}`}
                                                                >
                                                                    <Input.Password prefix={<FiLock size={18} />} type="text" placeholder="Enter new password" visibilityToggle={true} />
                                                                </Form.Item>
                                                            </Col>
                                                        </Row>
                                                        <Row gutter={20}>
                                                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                                <Form.Item name="confirmNewPassword" rules={[validateRequiredInputField('New password again'), validateFieldsPassword('New Password again'), { validator: compareToFirstPassword }]} className={styles.inputBox}>
                                                                    <Input.Password prefix={<FiLock size={18} />} type="text" placeholder="Re-enter new password" visibilityToggle={true} />
                                                                </Form.Item>
                                                            </Col>
                                                        </Row>
                                                        <Row gutter={20}>
                                                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                                <Button form="updatePassword" className={styles.button} type="primary" htmlType="submit">
                                                                    Submit
                                                                </Button>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </Form>
                                            </div>
                                        </div>
                                    ) : null}
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
};

export const ForgotPassword = connect(null, mapDispatchToProps)(ForgotPasswordBase);
