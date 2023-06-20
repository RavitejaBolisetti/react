/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Space } from 'antd';
import { withModal } from '../../../../withModal/withModal';
import OTPInput from 'otp-input-react';

import styles from '../../CustomertMaster.module.css';
import { RxCrossCircled } from 'react-icons/rx';
import { TbRefresh } from 'react-icons/tb';
import { FiLock } from 'react-icons/fi';

const ValidateMobileModalMain = (props) => {
    const { onCloseAction } = props;
    const [otpModal, setOtpModal] = useState(false);
    const [counter, setCounter] = useState(false);
    const [otpMessage, setOTPMessage] = useState();
    const [inValidOTP, setInValidOTP] = useState(false);
    const [otpInput, setOTPInput] = useState();
    const [disableVerifyOTP, setDisableVerifyOTP] = useState(true);

    const handleOtpModal = () => {
        setOtpModal(true);
    };
    useEffect(() => {
        const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
        return () => {
            clearInterval(timer);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [counter]);
    const handleOTPInput = (value) => {
        setOTPInput(value);
        setInValidOTP(false);
        console.log('value', value);
        if (value?.length === 6) {
            setDisableVerifyOTP(false);
        } else {
            setDisableVerifyOTP(true);
        }
    };

    return (
        <>
            {!otpModal ? (
                <>
                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.information}>
                            The mobile number you have entered is already used for customer ID-C12345678. Do you want to continue with the same number?
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Space>
                                <Button ghost onClick={onCloseAction} htmlType="submit" type="primary" className={styles.modalButton}>
                                    No
                                </Button>
                                <Button onClick={handleOtpModal} htmlType="submit" type="primary" className={styles.modalButton}>
                                    Yes, Continue
                                </Button>
                            </Space>
                        </Col>
                    </Row>
                </>
            ) : (
                <>
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
                                            <div onClick={false} className={counter ? styles.resendDisabled : styles.resendEnabled} type="radio">
                                                <TbRefresh /> Resend OTP
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Button icon={<FiLock size={18} />} onClick={onCloseAction} disabled={false} loading={false} className={styles.button} type="primary">
                                Verify OTP
                            </Button>

                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                    <div className={styles.loginFooter} type="radio"></div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export const ValidateMobileNumberModal = withModal(ValidateMobileModalMain, { width: 400 });
