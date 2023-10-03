/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import React, { useState } from 'react';
import OTPInput from 'otp-input-react';

import { Form, Row, Col, Button } from 'antd';

import { TbRefresh } from 'react-icons/tb';
import { RxCrossCircled } from 'react-icons/rx';
//import { FiLock } from 'react-icons/fi';
import { withModal } from 'components/withModal';

import styles from 'assets/sass/app.module.scss';
// import styles from 'components/Auth/Auth.module.scss'
const OtpVarificationModalMain = (props) => {
    const { setInValidOTP, inValidOTP, counter, handleVerifyOTP, otpMessage, disableVerifyOTP, setDisableVerifyOTP, handleSendOTP, otpInput, setOTPInput, onSentOTP } = props;
    const [form] = Form.useForm();

    const handleOTPInput = (value) => {
        setOTPInput(value);
        setInValidOTP(false);
        if (value?.length === 6) {
            setDisableVerifyOTP(false);
        } else {
            setDisableVerifyOTP(true);
        }
    };
    return (
        <div className={styles.centerInner}>
            <div className={styles.otpCustomerForm}>
                <div className={styles.otpCustomerHeading}>
                    <div className={styles.otpCustomerSubHeading}>{otpMessage}</div>
                </div>
                <Form form={form} id="sendOTP" autoComplete="off" onFinish={onSentOTP}>
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
                    <Button onClick={handleVerifyOTP} disabled={disableVerifyOTP} loading={false} className={styles.button} type="primary">
                        Verify OTP
                    </Button>

                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <div className={styles.loginFooter} type="radio"></div>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
    );
};

export const OtpVerification = withModal(OtpVarificationModalMain, { width: 400 });

