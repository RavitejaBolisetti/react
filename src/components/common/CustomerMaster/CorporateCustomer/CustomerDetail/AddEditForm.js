/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { useEffect, useState } from 'react';
import { Col, Input, Form, Row, Select, Space, Divider, Card, Button } from 'antd';

import { validateMobileNoField, validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import { CheckOutlined } from '@ant-design/icons';


import { PARAM_MASTER } from 'constants/paramMaster';
import { customSelectBox } from 'utils/customSelectBox';
import { OtpVerification } from '../../Common/Contacts/OtpVerfication';
import { BiLockAlt } from 'react-icons/bi';

const AddEditFormMain = (props) => {
    const { typeData, formData, form, corporateLovData, formActionType: { editMode } = undefined, customerType, customerParentCompanyData, validateParentCode, inValidOTP, setInValidOTP, numbValidatedSuccess, setNumbValidatedSuccess, otpInput, setOTPInput, disableVerifyOTP, setDisableVerifyOTP, RESEND_OTP_TIME, counter, setCounter, otpMessage, setOTPMessage, mobileNumber, setMobileNumber, mobNoVerificationData, fetchContactMobileNoDetails, listContactMobileNoShowLoading, userId, selectedCustomer, showGlobalNotification, sendOTP, validateOTP, handleSendOTP,onSentOTP,handleOnchangeMobNoInput, } = props;
    const [corporateType, setCorporateType] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);
    const [validationKey, setValidationKey] = useState();



    useEffect(() => {
        if (!mobNoVerificationData?.customerMasterDetails?.length && mobileNumber?.length) {
            sendOTPVerificationCode();
            setIsModalOpen(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mobNoVerificationData]);
    useEffect(() => {
        setCorporateType(formData?.corporateType);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData?.corporateType]);

    const handleCorporateChange = (value) => {
        setCorporateType(value);
        if (value === 'NON-LIS') {
            form.setFieldsValue({
                corporateName: null,
            });
        } else if (value === 'LIS') {
            form.setFieldsValue({
                corporateCode: null,
            });
        }
    };

    const onHandleSelect = (value) => {
        form.setFieldsValue({
            corporateCode: value,
            corporateCategory: corporateLovData?.find((i) => i?.key === value)?.parentKey,
        });
    };
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
    const handleCancel = () => {
        setIsModalOpen(false);
        setOtpVerified(false);
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
        const requestData = {
            data: data,
            setIsLoading: () => {},
            onSuccess,
        };
        sendOTP(requestData);
    };
    const handleVerifyOTP = () => {
        if (userId) {
            const data = { userId: selectedCustomer?.customerId,  mobileNumber:form.getFieldValue('mobileNumber'), otp: otpInput };
            const onSuccess = (res) => {
                setValidationKey(res?.data?.validationKey);
                showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
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
        titleOverride: 'Mobile Number Verification',
        closable: true,
        onCloseAction: handleCancel,
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

    return (
        <Space direction="vertical" size="small" style={{ display: 'flex' }}>
            <Card style={{ backgroundColor: '#F2F2F2' }}>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
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
                            <Select getPopupContainer={(triggerNode) => triggerNode.parentElement} disabled={true} placeholder={preparePlaceholderSelect('customer type')} fieldNames={{ label: 'value', value: 'key' }} options={typeData?.[PARAM_MASTER?.CUST_TYPE?.id]} allowClear></Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Divider />

                <Row gutter={20}>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item initialValue={formData?.companyName} label="Company Name" name="companyName" data-testid="companyName" rules={[validateRequiredInputField('company name')]}>
                            <Input placeholder={preparePlaceholderText('company name')} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item initialValue={formData?.parentCompanyCode} label="Parent Company Code" name="parentCompanyCode" data-testid="parentCode" rules={[validateRequiredInputField('parent company code')]}>
                            <Input placeholder={preparePlaceholderText('parent company code')} onBlur={validateParentCode} disabled={editMode} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item initialValue={formData?.parentCompanyName || (customerParentCompanyData && customerParentCompanyData.length > 0) ? customerParentCompanyData[0]?.parentCompanyName : ''} label="Parent Company Name" name="parentCompanyName" data-testid="parentName">
                            <Input placeholder={preparePlaceholderText('parent company name')} disabled />
                        </Form.Item>
                    </Col>
                </Row>
                <Divider />
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item initialValue={formData?.corporateType} label="Corporate Type" name="corporateType" data-testid="corporateType">
                            <Select getPopupContainer={(triggerNode) => triggerNode.parentElement} placeholder={preparePlaceholderSelect('corporate type')} loading={false} allowClear fieldNames={{ label: 'value', value: 'key' }} options={typeData['CORP_TYPE']} onChange={handleCorporateChange}></Select>
                        </Form.Item>
                    </Col>

                    {/* <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item label="Corporate Name" initialValue={corporateType === 'NON-LIS' ? '' : formData?.corporateName} name="corporateName" data-testid="corporateName" >
                            {corporateType === 'NON-LIS' ? <Input placeholder={preparePlaceholderText('corporate name')} /> : <Select getPopupContainer={(triggerNode) => triggerNode.parentElement} onSelect={onHandleSelect} disabled={false} loading={false} placeholder={preparePlaceholderSelect('corporate name')} fieldNames={{ label: 'value', value: 'key' }} options={corporateLovData} allowClear></Select>}
                        </Form.Item>
                    </Col> */}

                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        {corporateType === 'NON-LIS' ? (
                            <Form.Item label="Corporate Name" initialValue={formData?.corporateName} name="corporateName" data-testid="corporateName">
                                <Input placeholder={preparePlaceholderText('corporate name')} />
                            </Form.Item>
                        ) : (
                            <Form.Item label="Corporate Name" initialValue={formData?.corporateName} name="corporateName" data-testid="corporateName">
                                {/* <Select placeholder={preparePlaceholderSelect('customer name')} onChange={onHandleSelect} fieldNames={{ label: 'value', value: 'key' }} options={corporateLovData} allowClear></Select> */}
                                {customSelectBox({ data: corporateLovData, placeholder: preparePlaceholderSelect('corporate name'), onChange: onHandleSelect })}
                            </Form.Item>
                        )}
                    </Col>

                    {(corporateType === 'LIS' || corporateType === '') && (
                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                            <Form.Item initialValue={formData?.corporateCode} label="Corporate Code" name="corporateCode" data-testid="corporate code">
                                <Input placeholder={preparePlaceholderText('corporate code')} disabled />
                            </Form.Item>
                        </Col>
                    )}
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item initialValue={formData?.corporateCategory} label="Corporate Category" name="corporateCategory" data-testid="corporateCategory">
                            <Select getPopupContainer={(triggerNode) => triggerNode.parentElement} placeholder={preparePlaceholderSelect('corporate category')} disabled={editMode} loading={false} allowClear fieldNames={{ label: 'value', value: 'key' }} options={typeData['CORP_CATE']}></Select>
                        </Form.Item>
                    </Col>

                    {/* <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item initialValue={formData?.membershipType} label="Membership Type" name="membershipType" data-testid="membershipType" rules={[validateRequiredSelectField('membership type')]}>
                            <Select getPopupContainer={(triggerNode) => triggerNode.parentElement} placeholder={preparePlaceholderSelect('membership type')} loading={false} allowClear fieldNames={{ label: 'value', value: 'key' }} options={typeData['MEM_TYPE']}></Select>
                        </Form.Item>
                    </Col> */}
                </Row>
            </Card>
            <OtpVerification {...modalProps}/>
        </Space>
    );
};

export const AddEditForm = AddEditFormMain;
