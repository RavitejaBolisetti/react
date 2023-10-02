/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import { useEffect, useState } from 'react';
import { Col, Input, Form, Row, Select, Card, Divider, Switch, Button } from 'antd';
import { validateEmailField, validateMobileNoField, validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';

import { CheckOutlined } from '@ant-design/icons';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import { CustomerNameChangeMaster } from './CustomerNameChange';
import { PARAM_MASTER } from 'constants/paramMaster';
import { customSelectBox } from 'utils/customSelectBox';
import { BiLockAlt } from 'react-icons/bi';
import { OtpVerification } from '../../Common/Contacts/OtpVerfication';

const AddEditFormMain = (props) => {
    const { numbValidatedSuccess, setNumbValidatedSuccess} = props;
    const { whatsAppConfiguration, setWhatsAppConfiguration, handleFormFieldChange } = props;
    const { form, typeData, formData, corporateLovData, formActionType: { editMode } = undefined, data, customerType, selectedCustomer, validateOTP, sendOTP, userId, showGlobalNotification, fetchContactMobileNoDetails, listContactMobileNoShowLoading, mobNoVerificationData, resetContactMobileNoData, continueWithOldMobNo, setContinueWithOldMobNo, RESEND_OTP_TIME, handleSendOTP, otpInput, setOTPInput, setDisableVerifyOTP, disableVerifyOTP, counter, setCounter, otpMessage, setOTPMessage, setInValidOTP, inValidOTP, handleOnchangeMobNoInput ,mobileNumber,setMobileNumber,onSentOTP} = props;
    const { contactOverWhatsApp, contactOverWhatsAppActive, sameMobileNoAsWhatsApp, sameMobileNoAsWhatsAppActive } = whatsAppConfiguration;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mobileLoader, setmobileLoader] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);


    const [otpValue, setOtpValue] = useState('');
    const [continueWithPreModalOpen, setContinueWithPreModalOpen] = useState(false);
    // const [numbValidatedSuccess, setNumbValidatedSuccess] = useState(false);
    const [validationKey, setValidationKey] = useState();

    

    const [corporateType, setCorporateType] = useState('');
    useEffect(() => {
        setCorporateType(formData?.corporateType);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData?.corporateType]);
    useEffect(() => {
    if ((!mobNoVerificationData?.customerMasterDetails?.length && mobileNumber?.length)) {
            sendOTPVerificationCode()
            setIsModalOpen(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mobNoVerificationData]);

    useEffect(() => {
        form.setFieldsValue({
            mobileNumber: data?.mobileNumber,
            corporateType: formData?.corporateType,
            corporateCode: formData?.corporateCode,
            corporateName: formData?.corporateName,
        });
    }, [data?.mobileNumber, form, formData]);

    useEffect(() => {
        setWhatsAppConfiguration({ contactOverWhatsApp: formData?.whatsappCommunicationIndicator, sameMobileNoAsWhatsApp: formData?.mobileNumberAsWhatsappNumber });
        handleFormFieldChange();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);
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

    const handleCorporateChange = (value) => {
        setCorporateType(value);
        if (value === 'NON-LIS') {
            form.setFieldsValue({
                corporateName: null,
            });
        } else if (value === 'LIS') {
            form.setFieldsValue({
                corporateCode: null,
                corporateName: null,
            });
        }
    };


    const onHandleSelect = (value) => {
        form.setFieldsValue({
            corporateCode: value,
            corporateCategory: corporateLovData?.find((i) => i?.key === value)?.parentKey,
        });
    };
     
    const validateSameNumber = (_, value) => {
        const { mobileNumber } = form.getFieldsValue();
        if (value === mobileNumber && contactOverWhatsApp && !sameMobileNoAsWhatsApp) {
            return Promise.reject('whatsapp number same as mobile number');
        } else {
            return Promise.resolve('');
        }
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
        setOtpVerified(false);
        // setContinueWithPreModalOpen(false);
        setContinueWithOldMobNo(false);
        setmobileLoader(false);
        // setIsAdding(false);
        // resetContactMobileNoData();
        setOTPInput('');
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
            setOtpVerified(true);
            fetchContactMobileNoDetails({ setIsLoading: listContactMobileNoShowLoading, extraParams: [...defaultExtraParam, ...mobNoParam], userId });
        }
    };
    const sendOTPVerificationCode = () => {
        const data = { userId: selectedCustomer?.customerId, mobileNumber:form.getFieldValue('mobileNumber'), sentOnMobile: true, sentOnEmail: false, functionality: 'CUST' };
      
        const onSuccess = (res) => {
            setCounter(RESEND_OTP_TIME);
            showGlobalNotification({ notificationType: 'warning', title: 'OTP Sent', message: res?.responseMessage });
            setOTPMessage(res?.data?.message)
        };
        // const onError = (message) => {
        //     showGlobalNotification({ title: 'ERROR', message: Array.isArray(message[0]) || message });
        //     if (otpInput?.length === 6) {
        //         setCounter(0);
        //     }
        //     setInValidOTP(true);
        //     setDisableVerifyOTP(true);
        //     // setSubmitButtonActive(true);
        // };
        const requestData = {
            data: data,
            setIsLoading: () => {},
            onSuccess,
        };
        sendOTP(requestData);
    };
    const handleVerifyOTP = () => {
        if (userId) {
            // hideGlobalNotification();
            const data = { userId: selectedCustomer?.customerId,  mobileNumber:form.getFieldValue('mobileNumber'), otp: otpInput };
            const onSuccess = (res) => {
                setValidationKey(res?.data?.validationKey);
                showGlobalNotification({ notificationType: 'successBeforeLogin', title: 'OTP Verified', message: res?.responseMessage });
                setIsModalOpen(false);
                setNumbValidatedSuccess(true);

            };
            const onError = (message) => {
                showGlobalNotification({ title: 'ERROR', message: Array.isArray(message[0]) || message });
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
   
    const modalProps = {
        isVisible: isModalOpen,
        icon: <BiLockAlt />,
        titleOverride: 'Mobile Number Validation',
        closable: true,
        onCloseAction: handleCancel,
        // onOnContinueWithOldMobNo,
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
        inValidOTP,
        disableVerifyOTP,
        setDisableVerifyOTP,
        setInValidOTP,
        setDisableVerifyOTP,
        disableVerifyOTP,
        handleSendOTP,
        onSentOTP,
    };
    const modalContinueProps = {
        isVisible: continueWithPreModalOpen,
        icon: <BiLockAlt />,
        titleOverride: 'Mobile Number Verification',
        closable: false,
        onCloseAction: handleCancel,
        onOnContinueWithOldMobNo,
    };

    return (
        <>
            <Card>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        {/* {editMode ? (
                                <Form.Item label="Mobile Number" initialValue={formData?.mobileNumber} name="mobileNumber" data-testid="mobileNumber" rules={[validateMobileNoField('mobile number')]}>
                                    <Input
                                        placeholder={preparePlaceholderText('mobile number')}
                                        onChange={handleNumberValidation}
                                        maxLength={10}
                                        size="small"
                                        suffix={
                                            <>
                                                {false ? (
                                                    <Button loading={mobileLoader} onClick={showModal} type="link">
                                                        Validate
                                                    </Button>
                                                ) : (
                                                    <CheckOutlined style={{ color: '#70c922', fontSize: '16px', fotWeight: 'bold' }} />
                                                )}
                                                <ValidateMobileNumberModal {...modalProps} />
                                            </>
                                        }
                                    />
                                </Form.Item>
                            ) : (
                               
                            )} */}
                        {editMode ? (
                            <Form.Item label="Mobile Number" initialValue={formData?.mobileNumber} name="mobileNumber" data-testid="mobileNumber" rules={[validateMobileNoField('mobile number'), validateRequiredInputField('mobile number')]}>
                                <Input
                                    placeholder={preparePlaceholderText('mobile number')}
                                    maxLength={10}
                                    size="small"
                                    onChange={handleOnchangeMobNoInput}
                                    disabled={otpVerified}
                                    suffix={
                                        <>
                                            {!numbValidatedSuccess ? (
                                                <Button onClick={handleNumberValidation} type="link" style={{ transform: 'scale(-1,1)' }}>
                                                    Verify
                                                </Button>
                                            ) : (
                                                <CheckOutlined style={{ color: '#70c922', fontSize: '16px', fotWeight: 'bold', transform: 'scale(-1,1)' }} />
                                            )}
                                        </>
                                    }
                                />
                            </Form.Item>
                        ) : (
                            <Form.Item label="Mobile Number" initialValue={formData?.mobileNumber} name="mobileNumber" data-testid="mobileNumber" rules={[validateMobileNoField('mobile number'), validateRequiredInputField('mobile number')]}>
                                <Input placeholder={preparePlaceholderText('mobile number')} maxLength={10} size="small" />
                            </Form.Item>
                        )}
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item initialValue={customerType} label="Customer Type" name="customerType" data-testid="customerType" rules={[validateRequiredSelectField('customer Type')]}>
                            <Select disabled={true} placeholder={preparePlaceholderSelect('customer type')} fieldNames={{ label: 'value', value: 'key' }} options={typeData?.[PARAM_MASTER?.CUST_TYPE?.id]} allowClear></Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Divider />
                <Row>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <CustomerNameChangeMaster {...props} />
                    </Col>
                </Row>
                <Divider />
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item label="Email ID" initialValue={formData?.emailId} name="emailId" data-testid="emailId" rules={[validateEmailField('email id'), validateRequiredInputField('email id')]}>
                            <Input placeholder={preparePlaceholderText('email id')} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item label="Contact over WhatsApp?" initialValue={formData?.whatsappCommunicationIndicator} name="whatsappCommunicationIndicator" data-testid="contactedOverWhatsapp">
                            <Switch
                                onChange={(prev) => {
                                    if (!prev) {
                                        form.setFieldsValue({ whatsAppNumber: null });
                                        setWhatsAppConfiguration({ contactOverWhatsAppActive: true, sameMobileNoAsWhatsApp: false, sameMobileNoAsWhatsAppActive: true });
                                    }
                                }}
                                checked={contactOverWhatsApp}
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item label="Want to use mobile no as WhatsApp no?" initialValue={formData?.mobileNumberAsWhatsappNumber} name="mobileNumberAsWhatsappNumber" data-testid="useMobileNumber">
                            <Switch
                                disabled={sameMobileNoAsWhatsAppActive}
                                onChange={() => {
                                    form.validateFields(['whatsAppNumber']);
                                }}
                                checked={sameMobileNoAsWhatsApp}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item label="Whatsapp Number" initialValue={formData?.whatsAppNumber} name="whatsAppNumber" data-testid="whatsAppNumber" rules={[validateMobileNoField('whatsapp number'), { validator: validateSameNumber }]}>
                            <Input placeholder={preparePlaceholderText('WhatsApp Number')} disabled={contactOverWhatsAppActive} maxLength={10} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={20}>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item label="Corporate Type" initialValue={formData?.corporateType} name="corporateType" data-testid="corporateType">
                            {customSelectBox({ data: typeData['CORP_TYPE'], placeholder: preparePlaceholderSelect('corporate type'), onChange: handleCorporateChange })}
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        {corporateType === 'NON-LIS' ? (
                            <Form.Item label="Corporate Name" initialValue={formData?.corporateName} name="corporateName" data-testid="corporateName">
                                <Input placeholder={preparePlaceholderText('corporate name')} />
                            </Form.Item>
                        ) : (
                            <Form.Item label="Corporate Name" initialValue={formData?.corporateName} name="corporateName" data-testid="corporateName">
                                {/* <Select placeholder={preparePlaceholderSelect('corporate name')} onChange={onHandleSelect} fieldNames={{ label: 'value', value: 'key' }} options={corporateLovData} allowClear></Select> */}

                                {customSelectBox({ data: corporateLovData, placeholder: preparePlaceholderSelect('corporate name'), onChange: onHandleSelect })}
                            </Form.Item>
                        )}
                    </Col>

                    {(corporateType === 'LIS' || corporateType === '') && (
                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                            <Form.Item initialValue={formData?.corporateCode} label="Corporate Code" name="corporateCode" data-testid="corporate code">
                                <Input placeholder={preparePlaceholderText('parent company name')} disabled />
                            </Form.Item>
                        </Col>
                    )}

                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item label="Corporate Category" initialValue={formData?.corporateCategory} name="corporateCategory" data-testid="corporateCategory">
                            <Select getPopupContainer={(triggerNode) => triggerNode.parentElement} placeholder={preparePlaceholderSelect('corporate category')} disabled={editMode} loading={false} allowClear fieldNames={{ label: 'value', value: 'key' }} options={typeData['CORP_CATE']}></Select>
                        </Form.Item>
                    </Col>
                    {/* <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item label="Membership Type" initialValue={formData?.membershipType} name="membershipType" data-testid="membershipType" rules={[validateRequiredSelectField('membership type')]}>
                            <Select getPopupContainer={(triggerNode) => triggerNode.parentElement} placeholder={preparePlaceholderSelect('membership type')} loading={false} allowClear fieldNames={{ label: 'value', value: 'key' }} options={typeData['MEM_TYPE']}></Select>
                        </Form.Item>
                    </Col> */}
                </Row>
            </Card>
            <OtpVerification {...modalProps} />
        </>
    );
};

export const AddEditForm = AddEditFormMain;
