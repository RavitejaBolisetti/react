/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Form, Input, Button } from 'antd';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { hideGlobalNotification, showGlobalNotification } from 'store/actions/notification';
import { CheckOutlined } from '@ant-design/icons';

import { customerMobileDetailsDataActions } from 'store/actions/data/customerMaster/searchMobileNumber';
import { forgotPasswordActions } from 'store/actions/data/forgotPassword';
import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { validateMobileNoField, validateRequiredInputField } from 'utils/validation';
import { MobileOtpVerificationModal } from './MobileOtpVerificationModal';
import { translateContent } from 'utils/translateContent';
import { FaEdit } from 'react-icons/fa';

const mapStateToProps = (state) => {
    const {
        auth: { userId },
        data: {
            CustomerMaster: {
                customerMobileDetail: { data: mobNoVerificationData },
            },
        },
    } = state;

    let returnValue = {
        userId,
        mobNoVerificationData,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchContactMobileNoDetails: customerMobileDetailsDataActions.fetchList,
            listContactMobileNoShowLoading: customerMobileDetailsDataActions.listShowLoading,

            sendOTP: forgotPasswordActions.sendOTP,
            validateOTP: forgotPasswordActions.validateOTP,

            showGlobalNotification,
        },
        dispatch
    ),
});

const MobileOtpVerificationBase = (props) => {
    const { fetchContactMobileNoDetails, listContactMobileNoShowLoading, userId, mobNoVerificationData, sendOTP, validateOTP, showGlobalNotification, formData, selectedCustomer, form, defaultExtraParam, numbValidatedSuccess, setNumbValidatedSuccess, resetMobileNumber } = props;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [inValidOTP, setInValidOTP] = useState(false);
    const [otpInput, setOTPInput] = useState('');
    const [otpVerified, setOtpVerified] = useState(false);
    const [disableVerifyOTP, setDisableVerifyOTP] = useState(true);
    const RESEND_OTP_TIME = 60;
    const [counter, setCounter] = useState(RESEND_OTP_TIME);
    const [otpMessage, setOTPMessage] = useState();
    const [mobileNumber, setMobileNumber] = useState(false);
    const [editMobile, setEditMobile] = useState(false);

    useEffect(() => {
        if (!mobNoVerificationData?.customerMasterDetails?.length && mobileNumber?.length) {
            sendOTPVerificationCode();
            setIsModalOpen(true);
        } else if (mobNoVerificationData?.customerMasterDetails?.length) {
            showGlobalNotification({ notificationType: userId ? 'error' : 'errorBeforeLogin', title: translateContent('global.notificationError.title'), message: translateContent('vehicleSalesSchemeMaster.validation.mobileNumberFound') });
            setOtpVerified(false);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mobNoVerificationData]);

    useEffect(() => {
        const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
        return () => {
            clearInterval(timer);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [counter]);

    const handleOnEdit = () => {
        setEditMobile(true);
    };

    const handleNumberValidation = () => {
        if (mobileNumber) {
            const mobNoParam = [
                {
                    key: 'searchParam',
                    title: 'searchParam',
                    value: mobileNumber,
                    canRemove: true,
                },
            ];
            setOtpVerified(true);
            fetchContactMobileNoDetails({ setIsLoading: listContactMobileNoShowLoading, extraParams: [...defaultExtraParam, ...mobNoParam], userId });
        }
    };
    const handleOnchangeMobNoInput = (event) => {
        const Mno = event.target.value;
        const regex = new RegExp('^([5-9]){1}([0-9]){9}$');
        if (Mno?.length === 10 && regex.test(Mno)) {
            setMobileNumber(Mno);
        } else if (Mno?.length <= 10) {
            setMobileNumber(Mno);
        }
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

    const onSentOTP = (values) => {
        if (values) {
            hideGlobalNotification();
            handleSendOTP(values);
        }
    };

    const sendOTPVerificationCode = () => {
        const data = { userId: selectedCustomer?.customerId, mobileNumber: form.getFieldValue('mobileNumber'), sentOnMobile: true, sentOnEmail: false, functionality: 'CUST' };

        const onSuccess = (res) => {
            setCounter(RESEND_OTP_TIME);
            showGlobalNotification({ notificationType: userId ? 'warning' : 'warningBeforeLogin', title: translateContent('customerMaster.otpModal.notification.otpSent'), message: res?.responseMessage });
            setOTPMessage(res?.data?.message);
        };
        const requestData = {
            data: data,
            setIsLoading: () => {},
            onSuccess,
        };
        sendOTP(requestData);
    };

    const handleVerifyOTP = () => {
        if (userId) {
            const data = { userId: selectedCustomer?.customerId, mobileNumber: form.getFieldValue('mobileNumber'), otp: otpInput };
            const onSuccess = (res) => {
                showGlobalNotification({ notificationType: userId ? 'success' : 'successBeforeLogin', title: translateContent('global.notificationSuccess.success'), message: res?.responseMessage });
                setIsModalOpen(false);
                setNumbValidatedSuccess(true);
            };
            const onError = (message) => {
                showGlobalNotification({ notificationType: userId ? 'error' : 'errorBeforeLogin', title: translateContent('global.notificationError.title'), message: Array.isArray(message[0]) || message });
                if (otpInput?.length === 6) {
                    setCounter(0);
                }
                setInValidOTP(true);
                setDisableVerifyOTP(true);
                // setSubmitButtonActive(true);
            };
            const requestData = {
                data: data,
                setIsLoading: () => {},
                onSuccess,
                onError,
            };
            validateOTP(requestData);
        }
    };

    const handleSendOTP = () => {
        setCounter(RESEND_OTP_TIME);
        setInValidOTP(false);
        setOTPInput('');
        if (selectedCustomer?.customerId) {
            const data = { userId: selectedCustomer?.customerId, mobileNumber: form.getFieldValue('mobileNumber'), sentOnMobile: true, sentOnEmail: false, functionality: 'CUST' };
            const onSuccess = (res) => {
                showGlobalNotification({ notificationType: userId ? 'warning' : 'warningBeforeLogin', title: translateContent('customerMaster.otpModal.notification.otpSent'), message: res?.responseMessage });
                setOTPMessage(res?.data?.message);
            };
            const onError = (message) => {
                showGlobalNotification({ notificationType: userId ? 'error' : 'errorBeforeLogin', message });
            };
            const requestData = {
                data: data,
                userId,
                setIsLoading: () => {},
                onError,
                onSuccess,
            };
            sendOTP(requestData);
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setOtpVerified(false);
        setOTPInput('');
    };
    const modalProps = {
        isVisible: isModalOpen,
        onCloseAction: handleCancel,
        titleOverride: translateContent('customerMaster.otpModal.heading.modalTitle'),
        inValidOTP,
        counter,
        handleVerifyOTP,
        otpMessage,
        disableVerifyOTP,
        handleSendOTP,
        otpInput,
        onSentOTP,
        handleOTPInput,
    };

    return (
        <>
            <Form.Item label={translateContent('customerMaster.label.mobileNumber')} initialValue={formData?.mobileNumber} name="mobileNumber" data-testid="mobileNumber" rules={[validateMobileNoField(translateContent('customerMaster.validation.mobileNumber')), validateRequiredInputField(translateContent('customerMaster.validation.mobileNumber'))]}>
                <Input
                    placeholder={preparePlaceholderText(translateContent('customerMaster.placeholder.mobileNumber'))}
                    maxLength={10}
                    size="small"
                    onChange={handleOnchangeMobNoInput}
                    disabled={!editMobile || otpVerified}
                    suffix={
                        <>
                            {!editMobile && (
                                <Button type="link" onClick={handleOnEdit} style={{ transform: 'scale(-1,1)' }}>
                                    <FaEdit />
                                </Button>
                            )}
                            {!numbValidatedSuccess && mobileNumber?.length === 10 && (
                                <Button onClick={handleNumberValidation} type="link" style={{ transform: 'scale(-1,1)' }}>
                                    {translateContent('customerMaster.button.verify')}
                                </Button>
                            )}
                            {numbValidatedSuccess && <CheckOutlined style={{ color: '#70c922', fontSize: '16px', fotWeight: 'bold', transform: 'scale(-1,1)' }} />}
                        </>
                    }
                />
            </Form.Item>

            <MobileOtpVerificationModal {...modalProps} />
        </>
    );
};
export const MobileOtpVerificationMaster = connect(mapStateToProps, mapDispatchToProps)(MobileOtpVerificationBase);
