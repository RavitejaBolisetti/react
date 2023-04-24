import React, { useEffect, useState } from 'react';
import OTPInput from 'otp-input-react';
import { useNavigate } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Form, Row, Col, Button, Input, Checkbox } from 'antd';
import { UndoOutlined } from '@ant-design/icons';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { showGlobalNotification, hideGlobalNotification } from 'store/actions/notification';

import { BiUser } from 'react-icons/bi';

import { ROUTING_LOGIN } from 'constants/routing';
import { validateRequiredInputField } from 'utils/validation';
import { preparePlaceholderText } from 'utils/preparePlaceholder';
import styles from '../Auth.module.css';

import * as IMAGES from 'assets';
import { Link } from 'react-router-dom';
import Footer from '../Footer';
import { forgotPasswordActions } from 'store/actions/data/forgotPassword';
import { FiLock } from 'react-icons/fi';
import { PasswordStrengthMeter } from 'utils/PasswordStrengthMeter';

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            verifyUser: forgotPasswordActions.verifyUser,
            sendOTP: forgotPasswordActions.sendOTP,
            validateOTP: forgotPasswordActions.validateOTP,
            updatePassword: forgotPasswordActions.updatePassword,
            listShowLoading: forgotPasswordActions.listShowLoading,
            showGlobalNotification,
            hideGlobalNotification,
        },
        dispatch
    ),
});

const ForgotPasswordBase = ({ verifyUser, sendOTP, validateOTP, updatePassword, showGlobalNotification, hideGlobalNotification, listShowLoading }) => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const RESEND_OTP_TIME = 60;
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedUserId, setSelectedUserId] = useState();
    const [otpMessage, setOTPMessage] = useState();
    const [otpSentOnMobile, setOTPSentOnMobile] = useState(true);
    const [otpSentOnEmail, setOTPSentOnEmail] = useState(true);
    const [counter, setCounter] = useState(RESEND_OTP_TIME);
    const [otpInput, setOTPInput] = useState();
    const [validationKey, setValidationKey] = useState();
    const [inValidOTP, setInValidOTP] = useState(false);
    const [showPassword, setShowPassword] = useState({ newPassword: false, confirmNewPassword: false });
    const [password, setPassword] = useState('');

    useEffect(() => {
        const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
        return () => {
            clearInterval(timer);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [counter]);

    const onError = (message) => {
        showGlobalNotification({ title: 'ERROR', message: Array.isArray(message[0]) || message });
        if (otpInput.length === 6) {
            setCounter(0);
        }
        setInValidOTP(true);
    };

    const onVerifyUser = (values) => {
        hideGlobalNotification();

        const userId = values?.userId;

        if (userId) {
            hideGlobalNotification();
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
            hideGlobalNotification();
            handleSendOTP();
        }
    };

    const handleSendOTP = () => {
        setOTPInput();
        setInValidOTP(false);

        if (selectedUserId) {
            if (otpSentOnMobile || otpSentOnEmail) {
                hideGlobalNotification();
                const data = { userId: selectedUserId, sentOnMobile: otpSentOnMobile, sentOnEmail: otpSentOnEmail };

                const onSuccess = (res) => {
                    setCounter(RESEND_OTP_TIME);
                    showGlobalNotification({ notificationType: 'warning', title: 'OTP Sent', message: res?.responseMessage });
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
            hideGlobalNotification();
            const data = { userId: selectedUserId, otp: otpInput };

            const onSuccess = (res) => {
                setValidationKey(res?.data?.validationKey);
                showGlobalNotification({ notificationType: 'success', title: 'OTP Verified', message: res?.responseMessage });
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
        hideGlobalNotification();
        const data = { ...values, userId: selectedUserId, validationKey };

        const onSuccess = (res) => {
            form.resetFields();

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
    };

    const otpSentOnMobileChange = (event) => {
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

    const handleOTPInput = (value) => {
        setOTPInput(value);
        setInValidOTP(false);
    };

    const onFinishFailed = ({ values, errorFields, outOfDate }) => {
        // handle invalid form submission
    };

    const passwordSuffix = (type) => (
        <span onMouseDown={() => setShowPassword({ [type]: true })} onMouseUp={() => setShowPassword({ [type]: false })} onMouseLeave={() => setShowPassword({ [type]: false })}>
            {!showPassword?.[type] ? <AiOutlineEyeInvisible size={18} /> : <AiOutlineEye size={18} />}
        </span>
    );
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
                        <Row>
                            <Col span={24}>
                                <div className={styles.loginHtml}>
                                    {currentStep === 1 ? (
                                        <div className={styles.centerInner}>
                                            <div className={styles.loginForm}>
                                                <Form form={form} id="verifyUser" autoComplete="off" onFinish={onVerifyUser} onFinishFailed={onFinishFailed}>
                                                    <div className={styles.loginHeading}>
                                                        <h1>Forgot Your Password</h1>
                                                        <div className={styles.loginSubHeading}>Please enter your user credential</div>
                                                    </div>

                                                    <Row gutter={20}>
                                                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                            <Form.Item name="userId" rules={[validateRequiredInputField('user id')]} className={`${styles.inputBox} ${styles.marginBottomZero}`}>
                                                                <Input prefix={<BiUser size={18} style={{ color: '#ffffff' }} />} type="text" placeholder="User ID (MILE ID.Parent ID)" />
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
                                                        <div className={styles.loginSubHeading}>User credential verified successfully.</div>
                                                    </div>
                                                    <Form form={form} id="sendOTP" autoComplete="off" onFinish={onSentOTP} onFinishFailed={onFinishFailed}>
                                                        <Row gutter={20}>
                                                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                                <Form.Item initialValue={selectedUserId} name="userId" rules={[validateRequiredInputField('User id, mobile no, or email id')]} className={`${styles.inputBox} ${styles.disabledInput}`}>
                                                                    <Input value={selectedUserId} disabled prefix={<BiUser size={18} />} type="text" placeholder="User ID (MILE ID.Parent ID)" style={{ color: '#838383' }} />
                                                                </Form.Item>
                                                            </Col>
                                                        </Row>

                                                        <Row gutter={20}>
                                                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                                <div className={styles.registered}>Please choose the option for getting the OTP</div>
                                                            </Col>
                                                        </Row>

                                                        <Row gutter={20}>
                                                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                                <Form.Item name="sentOnMobile" className={styles.fielderror}>
                                                                    <Checkbox className={styles.registered} defaultChecked="true" onChange={otpSentOnMobileChange}>
                                                                        Registered mobile number
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
                                                                        Registered email ID
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
                                                    <div className={styles.loginSubHeading}>{otpMessage}</div>
                                                </div>
                                                <Row gutter={20}>
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                        <div className={styles.otpTitle}>Enter OTP </div>
                                                    </Col>
                                                </Row>
                                                <Row gutter={20}>
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                        <OTPInput className={`${styles.changer} ${inValidOTP ? styles.otpFilled : styles.otpEmpty}`} otpType="number" value={otpInput} onChange={handleOTPInput} autoFocus OTPLength={6} disabled={false} />
                                                    </Col>
                                                </Row>
                                                <Row gutter={20}>
                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                        <Row gutter={20} className={styles.otpVerificationContainer}>
                                                            <Col xs={16} sm={16} md={16} lg={16} xl={16}>
                                                                {counter ? <div className={styles.otpCounter}>{`${counter >= 10 ? `00:${counter}` : `00:0${counter}`}s`}</div> : <div className={styles.otpNotReceive}>{inValidOTP ? <span>{'Incorrect code'}</span> : <span>{"Didn't receive OTP?"}</span>}</div>}
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
                                                <Form id="updatePassword" form={form} autoComplete="off" onFinish={onUpdatePassword} layout="vertical">
                                                    <div className={styles.loginHeading}>
                                                        <h1 className={styles.inputBox}>Create New Password</h1>
                                                        <Row gutter={20}>
                                                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                                <Form.Item name="newPassword" rules={[validateRequiredInputField('new password')]} className={`${styles.changer} ${styles.inputBox}`}>
                                                                    <Input onChange={(e) => setPassword(e.target.value)} type={showPassword?.newPassword ? 'text' : 'password'} placeholder={preparePlaceholderText('new password')} prefix={<FiLock size={18} />} suffix={passwordSuffix('newPassword')} />
                                                                </Form.Item>
                                                                <PasswordStrengthMeter password={password} beforeLogin={true} />
                                                            </Col>
                                                        </Row>
                                                        <Row gutter={20}>
                                                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                                <Form.Item
                                                                    name="confirmNewPassword"
                                                                    dependencies={['newPassword']}
                                                                    rules={[
                                                                        validateRequiredInputField('confirm password'),
                                                                        ({ getFieldValue }) => ({
                                                                            validator(_, value) {
                                                                                if (!value || getFieldValue('newPassword') === value) {
                                                                                    return Promise.resolve();
                                                                                }
                                                                                return Promise.reject(new Error("New password and confirm password doesn't match!"));
                                                                            },
                                                                        }),
                                                                    ]}
                                                                    className={styles.inputBox}
                                                                >
                                                                    <Input type={showPassword?.confirmNewPassword ? 'text' : 'password'} placeholder={preparePlaceholderText('confirm password')} prefix={<FiLock size={18} />} suffix={passwordSuffix('confirmNewPassword')} />
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
