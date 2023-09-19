/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState, useRef } from 'react';
import { Form, Row, Col, Button, Input, Checkbox } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useNavigate, Link } from 'react-router-dom';
import OTPInput from 'otp-input-react';

import { BiUser } from 'react-icons/bi';
import { FiLock } from 'react-icons/fi';
import { TbRefresh } from 'react-icons/tb';
import { RxCrossCircled } from 'react-icons/rx';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';

import { showGlobalNotification, hideGlobalNotification } from 'store/actions/notification';
import { forgotPasswordActions } from 'store/actions/data/forgotPassword';

import * as IMAGES from 'assets';
import Footer from '../Footer';

import { ROUTING_LOGIN } from 'constants/routing';
import { validateRequiredInputField } from 'utils/validation';
import { PasswordStrengthMeter } from 'utils/PasswordStrengthMeter';

import styles from '../Auth.module.scss';

const mapStateToProps = (state) => {
    const {
        data: {
            ForgotPassword: { isLoading },
        },
    } = state;
    return {
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
            listShowLoading: forgotPasswordActions.listShowLoading,
            showGlobalNotification,
            hideGlobalNotification,
        },
        dispatch
    ),
});

const ForgotPasswordBase = (props) => {
    const { verifyUser, sendOTP, validateOTP, updatePassword, showGlobalNotification, hideGlobalNotification, listShowLoading, isLoading } = props;

    const [form] = Form.useForm();
    const navigate = useNavigate();
    const userIdRef = useRef(null);

    const newPasswordInput = useRef(null);
    const confirmPasswordInput = useRef(null);

    const [fieldData, setFieldData] = useState();

    const RESEND_OTP_TIME = 60;
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedUserId, setSelectedUserId] = useState();
    const [otpMessage, setOTPMessage] = useState();
    const [counter, setCounter] = useState(RESEND_OTP_TIME);
    const [otpInput, setOTPInput] = useState();
    const [validationKey, setValidationKey] = useState();
    const [inValidOTP, setInValidOTP] = useState(false);
    const [disableVerifyOTP, setDisableVerifyOTP] = useState(true);
    const [showPassword, setShowPassword] = useState({ newPassword: false, confirmNewPassword: false });
    const [password, setPassword] = useState('');
    const [verifiedUserData, setVerifiedUserData] = useState();
    const [tooltipVisible, setTooltipVisible] = useState(false);
    const [submitButtonActive, setSubmitButtonActive] = useState(true);

    useEffect(() => {
        const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
        return () => {
            clearInterval(timer);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [counter]);

    useEffect(() => {
        password && setTooltipVisible(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [password]);

    const handleFormValueChange = () => {
        setSubmitButtonActive(false);
    };

    const onError = (message) => {
        showGlobalNotification({ title: 'ERROR', message: Array.isArray(message[0]) || message });
        if (otpInput?.length === 6) {
            setCounter(0);
        }
        setInValidOTP(true);
        setDisableVerifyOTP(true);
        setSubmitButtonActive(true);
    };

    const onVerifyUser = (values) => {
        hideGlobalNotification();

        const userId = values?.userId;

        if (userId) {
            hideGlobalNotification();
            const data = { userId };
            setSelectedUserId(userId);

            const onSuccess = (res) => {
                setVerifiedUserData(res?.data);
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
            handleSendOTP(values);
        }
    };

    const handleSendOTP = (values = '') => {
        setOTPInput();
        setInValidOTP(false);
        setDisableVerifyOTP(true);

        let otpSentOnMobile = '';
        let otpSentOnEmail = '';

        if (selectedUserId) {
            if (values) {
                otpSentOnMobile = values?.otpSentOn.includes('sentOnMobile');
                otpSentOnEmail = values?.otpSentOn?.includes('sentOnEmail');
            } else {
                otpSentOnMobile = form.getFieldValue('otpSentOn').includes('sentOnMobile');
                otpSentOnEmail = form.getFieldValue('otpSentOn')?.includes('sentOnEmail');
            }

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
                    setIsLoading: () => {},
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
                showGlobalNotification({ notificationType: 'successBeforeLogin', title: 'OTP Verified', message: res?.responseMessage });
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

            showGlobalNotification({ notificationType: 'successBeforeLogin', title: 'Password Changed', message: res?.responseMessage });
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

    const validateOTPOption = (_, value) => {
        if (!value || value?.length <= 0) {
            return Promise.reject(new Error('Please choose at least one option'));
        }
        return Promise.resolve();
    };

    const handleOTPInput = (value) => {
        setOTPInput(value);
        setInValidOTP(false);
        if (value?.length === 6) {
            setDisableVerifyOTP(false);
        } else {
            setDisableVerifyOTP(true);
        }
    };

    const onFinishFailed = ({ values, errorFields, outOfDate }) => {
        // handle invalid form submission
    };

    const passwordSuffix = (type) => (
        <span onMouseDown={() => setShowPassword({ [type]: true })} onMouseUp={() => setShowPassword({ [type]: false })} onMouseLeave={() => setShowPassword({ [type]: false })}>
            {!showPassword?.[type] ? <AiOutlineEyeInvisible size={18} /> : <AiOutlineEye size={18} />}
        </span>
    );

    const handleFormChange = (field) => (e) => {
        setFieldData({ ...fieldData, [field]: e?.target?.value?.length > 0 ? true : false });
    };

    const handleFieldFocus = (field) => (e) => {
        field?.current.focus();
    };

    const handleNewPasswordChange = (e) => {
        setPassword(e.target.value);
        setFieldData({ ...fieldData, newPassword: e?.target?.value?.length > 0 ? true : false });
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
                                                        <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.inputLabelPlaceholder}>
                                                            <Form.Item name="userId" data-testid="userIdInput" rules={[validateRequiredInputField('user id')]} className={`${styles.inputBox} ${styles.marginBottomZero}`}>
                                                                {<Input ref={userIdRef} prefix={<BiUser size={16} />} type="text" maxLength={25} onChange={handleFormChange('userId')} />}
                                                            </Form.Item>
                                                            {!fieldData?.userId && <label onClick={handleFieldFocus(userIdRef)}>User ID (MILE ID.Parent ID)</label>}
                                                        </Col>
                                                    </Row>

                                                    <Row gutter={20}>
                                                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                            <Button icon={<FiLock size={18} />} form="verifyUser" loading={isLoading} className={styles.button} type="primary" htmlType="submit">
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
                                                    </div>
                                                    <Form form={form} id="sendOTP" autoComplete="off" onFinish={onSentOTP} onFinishFailed={onFinishFailed}>
                                                        <Row gutter={20}>
                                                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                                <Form.Item initialValue={selectedUserId} name="userId" rules={[validateRequiredInputField('User id, mobile no, or email id')]} className={`${styles.inputBox} ${styles.disabledInput}`}>
                                                                    <Input value={selectedUserId} disabled prefix={<BiUser size={16} />} type="text" placeholder="User ID (MILE ID.Parent ID)" />
                                                                    <p>User credentials verified successfully</p>
                                                                </Form.Item>
                                                            </Col>
                                                        </Row>

                                                        <Row gutter={20}>
                                                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                                <div className={styles.registered}>Please choose the option for getting the OTP</div>
                                                            </Col>
                                                        </Row>
                                                        <Form.Item
                                                            name="otpSentOn"
                                                            rules={[
                                                                {
                                                                    validator: validateOTPOption,
                                                                },
                                                            ]}
                                                            initialValue={['sentOnMobile', 'sentOnEmail']}
                                                        >
                                                            <Checkbox.Group>
                                                                <Row>
                                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.fielderror}>
                                                                        <Checkbox className={styles.registered} name="mobileCheckBox" value="sentOnMobile">
                                                                            Registered Mobile Number
                                                                            <p>{verifiedUserData?.contactNumber}</p>
                                                                        </Checkbox>
                                                                    </Col>
                                                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.fielderror}>
                                                                        <Checkbox className={styles.registered} name="emailCheckBox" value="sentOnEmail">
                                                                            Registered Email Address
                                                                            <p>{verifiedUserData?.email}</p>
                                                                        </Checkbox>
                                                                    </Col>
                                                                </Row>
                                                            </Checkbox.Group>
                                                        </Form.Item>

                                                        <Row gutter={20}>
                                                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                                <Button icon={<FiLock size={18} />} form="sendOTP" loading={isLoading} className={styles.button} type="primary" htmlType="submit">
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
                                                        <div className={styles.otpTitle}>Enter OTP</div>
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
                                                            <Col xs={14} sm={14} md={16} lg={16} xl={16}>
                                                                {counter ? (
                                                                    <div className={styles.otpCounter}>{`${counter >= 10 ? `00:${counter}` : `00:0${counter}`}s`}</div>
                                                                ) : (
                                                                    <div className={styles.otpNotReceive}>
                                                                        {inValidOTP ? (
                                                                            <span>
                                                                                <RxCrossCircled />
                                                                                {'Incorrect OTP'}
                                                                            </span>
                                                                        ) : (
                                                                            <span>{"Didn't receive an OTP?"}</span>
                                                                        )}
                                                                    </div>
                                                                )}
                                                            </Col>
                                                            <Col xs={10} sm={10} md={8} lg={8} xl={8}>
                                                                <div onClick={() => handleSendOTP()} className={counter ? styles.resendDisabled : styles.resendEnabled} type="radio">
                                                                    <TbRefresh /> Resend OTP
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                                <Button icon={<FiLock size={18} />} onClick={handleVerifyOTP} disabled={disableVerifyOTP} loading={isLoading} className={styles.button} type="primary">
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
                                                <Form id="updatePassword" form={form} autoComplete="off" onValuesChange={handleFormValueChange} onFieldsChange={handleFormValueChange} onFinish={onUpdatePassword} layout="vertical">
                                                    <div className={styles.loginHeading}>
                                                        <h1 className={styles.inputBox}>Create New Password</h1>
                                                        <Row gutter={20}>
                                                            <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.inputLabelPlaceholder}>
                                                                <Form.Item name="newPassword" className={styles.inputBox} rules={[validateRequiredInputField('new password')]}>
                                                                    <Input data-testid="newPassword" onChange={handleNewPasswordChange} type={showPassword?.newPassword ? 'text' : 'password'} ref={newPasswordInput} prefix={<FiLock size={16} />} suffix={passwordSuffix('newPassword')} onFocus={() => setTooltipVisible(true)} onBlur={() => setTooltipVisible(false)} />
                                                                </Form.Item>
                                                                {!fieldData?.newPassword && <label onClick={handleFieldFocus(newPasswordInput)}>New password</label>}
                                                                {form.getFieldValue('newPassword') && <PasswordStrengthMeter password={form.getFieldValue('newPassword')} beforeLogin={true} tooltipVisible={tooltipVisible} />}
                                                            </Col>
                                                        </Row>
                                                        <Row gutter={20}>
                                                            <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.inputLabelPlaceholder}>
                                                                <Form.Item
                                                                    name="confirmNewPassword"
                                                                    dependencies={['newPassword']}
                                                                    className={styles.inputBox}
                                                                    rules={[
                                                                        validateRequiredInputField('confirm password', false),
                                                                        ({ getFieldValue }) => ({
                                                                            validator(_, value) {
                                                                                if (!value || getFieldValue('newPassword') === value) {
                                                                                    return Promise.resolve();
                                                                                }
                                                                                return Promise.reject(new Error("New Password and confirm Password doesn't match!"));
                                                                            },
                                                                        }),
                                                                    ]}
                                                                >
                                                                    <Input data-testid="confirmPassword" type={showPassword?.confirmNewPassword ? 'text' : 'password'} ref={confirmPasswordInput} prefix={<FiLock size={16} />} onChange={handleFormChange('confirmNewPassword')} suffix={passwordSuffix('confirmNewPassword')} />
                                                                </Form.Item>
                                                                {!fieldData?.confirmNewPassword && <label onClick={handleFieldFocus(confirmPasswordInput)}>Confirm password</label>}
                                                            </Col>
                                                        </Row>
                                                        <Row gutter={20}>
                                                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                                <Button icon={<FiLock size={18} />} loading={isLoading} disabled={submitButtonActive} form="updatePassword" className={styles.button} type="primary" htmlType="submit">
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

export const ForgotPassword = connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordBase);
