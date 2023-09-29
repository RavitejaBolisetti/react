/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { Button, Form, Row, Col, Select, Input, Checkbox } from 'antd';
import { validateLettersWithWhitespaces, validateEmailField, validateRequiredInputField, validateRequiredSelectField, validateMobileNoField, duplicateValidator } from 'utils/validation';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import { CUSTOMER_TYPE } from 'constants/CustomerType';
import { BiLockAlt } from 'react-icons/bi';
import { CheckOutlined } from '@ant-design/icons';

import styles from 'assets/sass/app.module.scss';
import { useEffect, useState } from 'react';
import { ValidateMobileNumberModal } from './ValidateMobileNumberModal';
import { OtpVerification } from './OtpVerfication';

const AddEditForm = (props) => {
    const { userId,isReadOnly = false, onSaveFormData, contactform, form,setShowAddEditForm, setIsEditing, typeData, customerType, uploadImgDocId, formActionType, handleFormValueChange, setIsAdding, contactData, editingData,setContinueWithOldMobNo, continueWithOldMobNo } = props;
    const { fetchContactMobileNoDetails,selectedCustomer, listContactMobileNoShowLoading, mobNoVerificationData, resetContactMobileNoData, showGlobalNotification, sendOTP, validateOTP,otpMessage,
        setOTPMessage, } = props;
    const RESEND_OTP_TIME = 60;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [continueWithPreModalOpen, setContinueWithPreModalOpen] = useState(false);
    const [mobileNumber, setMobileNumber] = useState(false);
    const [mobileLoader, setmobileLoader] = useState(false);
    const [otpInput, setOTPInput] = useState('');
    const [numbValidatedSuccess, setNumbValidatedSuccess] = useState(false);
    const [counter, setCounter] = useState();

    const disabledProps = { disabled: isReadOnly || formActionType?.viewMode };
    useEffect(() => {
        if (mobNoVerificationData?.customerMasterDetails?.length && mobileNumber?.length) {
            sendOTPVerificationCode()
            setContinueWithPreModalOpen(true);
        } else if ((!mobNoVerificationData?.customerMasterDetails?.length && !mobileLoader && mobileNumber) || continueWithOldMobNo) {
            sendOTPVerificationCode()
            setIsModalOpen(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mobNoVerificationData, mobileLoader]);
    useEffect(() => {
        const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
        return () => {
            clearInterval(timer);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [counter]);
    const defaultExtraParam = [
        {
            key: 'customerType',
            title: 'Customer Type',
            value: customerType,
            canRemove: true,
        },
        {
            key: 'pageSize',
            title: 'Value',
            value: 1,
            canRemove: true,
        },
        {
            key: 'pageNumber',
            title: 'Value',
            value: 1,
            canRemove: true,
        },
        {
            key: 'searchType',
            title: 'searchType',
            value: 'mobileNumber',
            canRemove: true,
        },
    ];



    const handleCancelFormEdit = () => {
        contactform.resetFields();
        setIsAdding(false);
        setIsEditing(false);
        setShowAddEditForm(false);
    };

    		
    const onSuccessAction = (res) => {
        showGlobalNotification({ notificationType: 'success', title: 'Success', message: res?.responseMessage });
        setmobileLoader(false);
    };
    const onErrorAction = (res) => {
        showGlobalNotification({ message: res?.responseMessage });
        setmobileLoader(false);
    };
    const onOnContinueWithOldMobNo = () => {
        setContinueWithPreModalOpen(false);
        setIsModalOpen(true);
        setmobileLoader(false);
        setContinueWithOldMobNo(true);
        resetContactMobileNoData();
        setOTPInput('');
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        setContinueWithPreModalOpen(false);
        setContinueWithOldMobNo(false);
        setmobileLoader(false);
        setIsAdding(false);
        resetContactMobileNoData();
        setOTPInput('');
    };
    const handleOnchangeMobNoInput = (event) => {
        const Mno = event.target.value;
        const regex = new RegExp('^([5-9]){1}([0-9]){9}$');
        if (Mno?.length === 10 && regex.test(Mno)) {
            setMobileNumber(Mno);
        }
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
            setmobileLoader(true);
            fetchContactMobileNoDetails({ setIsLoading: listContactMobileNoShowLoading, extraParams: [...defaultExtraParam, ...mobNoParam], userId, onSuccessAction, onErrorAction });
        }
    };
    const sendOTPVerificationCode = () => {
        const data = { userId: selectedCustomer?.customerId, mobileNumber:form.getFieldValue('mobileNumber'), sentOnMobile: true, sentOnEmail: false, functionality: 'CUST' };
        const onSuccess = (res) => {
            setCounter(RESEND_OTP_TIME);
            showGlobalNotification({ notificationType: 'warning', title: 'OTP Sent', message: res?.responseMessage });
            setOTPMessage(res?.data?.message);
        };
        const onError = (message) => {
            showGlobalNotification({ title: 'ERROR', message: Array.isArray(message[0]) || message });
            if (otpInput?.length === 6) {
                setCounter(0);
            }
            // setInValidOTP(true);
            // setDisableVerifyOTP(true);
            // setSubmitButtonActive(true);
        };
        const requestData = {
            data: data,
            setIsLoading: () => {},
            onSuccess,
            onError,
        };
        sendOTP(requestData);
    };
    const handleVerifyOTP = () => {
        if (userId) {
            // hideGlobalNotification();
            const data = { userId: selectedCustomer?.customerId,  mobileNumber:contactform.getFieldValue('mobileNumber'), sentOnMobile: true, sentOnEmail: false, functionality: 'CUST'};
            const onSuccess = (res) => {
                // setValidationKey(res?.data?.validationKey);
                showGlobalNotification({ notificationType: 'successBeforeLogin', title: 'OTP Verified', message: res?.responseMessage });
                setIsModalOpen(false);
                setNumbValidatedSuccess(true);
            };
            const requestData = {
                data: data,
                setIsLoading: () => {},
                onSuccess,
                onError:err =>  console.log(err),
            };
            validateOTP(requestData);
        }
    };
    const modalProps = {
        isVisible: isModalOpen,
        icon: <BiLockAlt />,
        titleOverride: 'Mobile Number Validation',
        closable: true,
        onCloseAction: handleCancel,
        onOnContinueWithOldMobNo,
        handleVerifyOTP,
        sendOTPVerificationCode,
        otpInput,
        setOTPInput,
        sendOTP,
        validateOTP,
        userId,
        counter,
        otpMessage,
        setOTPMessage,
    };
    const modalContinueProps = {
        isVisible: continueWithPreModalOpen,
        icon: <BiLockAlt />,
        titleOverride: 'Mobile Number Validation',
        closable: false,
        onCloseAction: handleCancel,
        onOnContinueWithOldMobNo,
    };

    return (
        <>
            <Form form={contactform} autoComplete="off" onFinish={onSaveFormData} onFieldsChange={handleFormValueChange} layout="vertical">
                {/* <UploadUtils {...props} isViewModeVisible={isViewModeVisible} setUploadImgDocId={setUploadImgDocId} formActionType={formActionType} /> */}
                {/* <Divider /> */}
                <Row gutter={20}>
                    <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                        <Form.Item label="Purpose of Contact" name="purposeOfContact" rules={[validateRequiredSelectField('purpose of contact'), { validator: (rule, value) => duplicateValidator(value, 'purposeOfContact', contactData, editingData?.purposeOfContact) }]}>
                            <Select {...disabledProps} placeholder={preparePlaceholderSelect('purpose of contact')} fieldNames={{ label: 'value', value: 'key' }} getPopupContainer={(triggerNode) => triggerNode.parentElement} options={typeData['PURPOSE']} allowClear></Select>
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                        <Form.Item label="Mobile Number" name="mobileNumber" rules={[validateRequiredInputField('mobile number'), validateMobileNoField('mobile number')]}>
                        <Input
                                    maxLength={10}
                                    onChange={handleOnchangeMobNoInput}
                                    placeholder={preparePlaceholderText('mobile number')}
                                    allowClear
                                    // enterButton="Send OTP"
                                    size="small"
                                    suffix={
                                        <>
                                            {!numbValidatedSuccess ? (
                                                <Button loading={mobileLoader} onClick={handleNumberValidation} type="link" style={{ transform: 'scale(-1,1)' }}>
                                                    Verify
                                                </Button>
                                            ) : (
                                                <CheckOutlined style={{ color: '#70c922', fontSize: '16px', fotWeight: 'bold',transform: 'scale(-1,1)' }} />
                                            )}
                                        </>
                                    }
                                />
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                        <Form.Item initialValue={''} label="Alternate Mobile Number" name="alternateMobileNumber" rules={[validateMobileNoField('alternate mobile number')]}>
                            <Input maxLength={10} placeholder={preparePlaceholderText('alternate mobile number')} {...disabledProps} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                        {customerType === CUSTOMER_TYPE?.INDIVIDUAL?.id ? (
                            <>
                                <Form.Item label="Relationship" name="relationCode">
                                    <Select {...disabledProps} placeholder={preparePlaceholderSelect('relation')} fieldNames={{ label: 'value', value: 'key' }} getPopupContainer={(triggerNode) => triggerNode.parentElement} options={[...typeData['REL_TYPE']]} allowClear></Select>
                                    {/* <Select {...disabledProps} placeholder={preparePlaceholderSelect('releation')} fieldNames={{ label: 'value', value: 'key' }} getPopupContainer={(triggerNode) => triggerNode.parentElement} options={typeData['FAMLY_RELTN']} allowClear></Select> */}
                                </Form.Item>
                                <Form.Item initialValue={''} hidden name="designation">
                                    <Input />
                                </Form.Item>
                            </>
                        ) : (
                            <>
                                <Form.Item initialValue={''} label="Designation" name="designation">
                                    <Input placeholder={preparePlaceholderText('Designation')} {...disabledProps} />
                                </Form.Item>
                                <Form.Item initialValue={''} hidden name="relationCode">
                                    <Input />
                                </Form.Item>
                            </>
                        )}
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                        <Form.Item label="Gender" name="gender">
                            <Select {...disabledProps} placeholder={preparePlaceholderSelect('gender')} fieldNames={{ label: 'value', value: 'key' }} getPopupContainer={(triggerNode) => triggerNode.parentElement} options={typeData['GENDER_CD']} allowClear></Select>
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                        <Form.Item label="Title" name="title" rules={[validateRequiredSelectField('title')]}>
                            <Select {...disabledProps} placeholder={preparePlaceholderSelect('title')} fieldNames={{ label: 'value', value: 'key' }} getPopupContainer={(triggerNode) => triggerNode.parentElement} options={typeData['TITLE']} allowClear></Select>
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                        <Form.Item label="First Name" name="firstName" rules={[validateRequiredInputField('First Name'), validateLettersWithWhitespaces('First Name')]}>
                            <Input placeholder={preparePlaceholderText('first name')} {...disabledProps} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                        <Form.Item initialValue={''} label="Middle Name" name="middleName" rules={[validateLettersWithWhitespaces('middle name')]}>
                            <Input placeholder={preparePlaceholderText('middle name')} {...disabledProps} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                        <Form.Item label="Last/Surname" name="lastName" rules={[validateRequiredInputField('lastName'), validateLettersWithWhitespaces('last name')]}>
                            <Input placeholder={preparePlaceholderText('last name')} {...disabledProps} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                        <Form.Item label="E-mail" initialValue={''} name="contactEmailId" rules={[validateEmailField('E-mail')]}>
                            <Input placeholder={preparePlaceholderText('email id')} {...disabledProps} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                        <Form.Item initialValue={''} label="Alternate Email ID" name="alternateEmailId" rules={[validateEmailField('E-mail')]}>
                            <Input placeholder={preparePlaceholderText('alternate email id')} {...disabledProps} />
                        </Form.Item>
                    </Col>

                    {/* <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Divider />
                    </Col> 
                    <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                        <Form.Item initialValue={''} label="Facebook Link" name="facebookId" rules={[validatFacebookProfileUrl('facebook')]}>
                            <Input placeholder={preparePlaceholderText('facebook link')} {...disabledProps} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                        <Form.Item initialValue={''} label="Twitter Link" name="twitterId" rules={[validattwitterProfileUrl('twitter')]}>
                            <Input placeholder={preparePlaceholderText('Twitter Link')} {...disabledProps} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                        <Form.Item initialValue={''} label="Instagram Link" name="instagramId" rules={[validatInstagramProfileUrl('instagram')]}>
                            <Input placeholder={preparePlaceholderText('instagram link')} {...disabledProps} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                        <Form.Item initialValue={''} label="Youtube Channel" name="youTubeChannel" rules={[validatYoutubeProfileUrl('youtube channel')]}>
                            <Input placeholder={preparePlaceholderText('youtube channel')} {...disabledProps} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                        <Form.Item initialValue={''} label="Team BHP Link" name="teamBhp">
                            <Input placeholder={preparePlaceholderText('team BHP link')} {...disabledProps} />
                        </Form.Item>
                    </Col> */}

                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Form.Item initialValue={false} valuePropName="checked" name="defaultContactIndicator">
                            <Checkbox>Mark As Default</Checkbox>
                        </Form.Item>
                    </Col>
                    <Form.Item hidden initialValue={''} name="id">
                        <Input />
                    </Form.Item>
                    {/* <Form.Item hidden initialValue={uploadImgDocId} value={uploadImgDocId} name="docId">
                        <Input />
                    </Form.Item> */}
                    <Form.Item hidden initialValue={true} name="status">
                        <Input />
                    </Form.Item>
                    <Form.Item hidden initialValue={true} name="continueWith">
                        <Input />
                    </Form.Item>
                </Row>
                {!formActionType?.viewMode && (
                    <Row gutter={20} className={styles.marB20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className={styles.buttonsGroupLeft}>
                            <Button onClick={onSaveFormData} type="primary">
                                Save
                            </Button>
                            <Button onClick={handleCancelFormEdit} danger>
                                Cancel
                            </Button>
                        </Col>
                    </Row>
                )}
            </Form>
            <ValidateMobileNumberModal {...modalContinueProps} />
            <OtpVerification {...modalProps} />
        </>
    );
};

export default AddEditForm;
