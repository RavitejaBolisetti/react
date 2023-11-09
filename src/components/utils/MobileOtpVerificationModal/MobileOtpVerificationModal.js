/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd. 
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import React from 'react';
import OTPInput from 'otp-input-react';

import { Form, Row, Col, Button } from 'antd';

import { TbRefresh } from 'react-icons/tb';
import { RxCrossCircled } from 'react-icons/rx';
import { withModal } from 'components/withModal';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';
const MobileOtpVerificationModalMain = (props) => {
    const {  inValidOTP, counter, handleVerifyOTP, otpMessage, disableVerifyOTP, handleSendOTP, otpInput, onSentOTP, handleOTPInput } = props;
    const [form] = Form.useForm();
    return (
        <div className={styles.centerInner}>
            <div className={styles.otpCustomerForm}>
                <div className={styles.otpCustomerHeading}>
                    <div className={styles.otpCustomerSubHeading}>{otpMessage}</div>
                </div>
                <Form form={form} id="sendOTP" autoComplete="off" onFinish={onSentOTP}>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <div className={styles.otpTitle}>{translateContent('customerMaster.otpModal.buttons.enterOtp')}</div>
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
                                                    {translateContent('customerMaster.otpModal.label.incorrectOtp')}
                                                </span>
                                            ) : (
                                                <span>{translateContent('customerMaster.otpModal.label.didntReceiveOtp')}</span>
                                            )}
                                        </div>
                                    )}
                                </Col>
                                <Col xs={10} sm={10} md={8} lg={8} xl={8}>
                                    <div onClick={() => handleSendOTP()} className={counter ? styles.resendDisabled : styles.resendEnabled} type="radio">
                                        <TbRefresh /> {translateContent('customerMaster.otpModal.buttons.resendOtp')}
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Button onClick={handleVerifyOTP} disabled={disableVerifyOTP} loading={false} className={styles.button} type="primary">
                       {translateContent('customerMaster.otpModal.buttons.verifyOtp')}
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

export const MobileOtpVerificationModal = withModal(MobileOtpVerificationModalMain, { width: 400 });

