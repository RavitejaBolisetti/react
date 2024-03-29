/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Col, Input, Form, Row, DatePicker, Checkbox } from 'antd';

import { disableFutureDate } from 'utils/disableDate';
import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { dateFormat } from 'utils/formatDateTime';
import { convertToUpperCase } from 'utils/convertToUpperCase';

import { validateEmailField, validateMobileNoField, validatePanField, validateGSTIN } from 'utils/validation';
import { customSelectBox } from 'utils/customSelectBox';
import { CustomerListMaster } from 'components/utils/CustomerListModal';
import { translateContent } from 'utils/translateContent';

export const AddressCommonForm = (props) => {
    const { formType, formData, disabledProps, handleOnChange, fnSetData, typeData, sameAsBookingCustomer, viewOnly = false, showAgeGroup = true, buttonData, setButtonData } = props;
    const canUpdate = ((formType === 'bookingCustomer' && !formData?.billingCustomer?.customerId) || formType === 'billingCustomer') && !viewOnly;

    const alternateNumberCheck = (value) => {
        if (formData?.mobileNumber && value && value === formData?.mobileNumber) {
            return Promise.reject('Alternative and Mobile Number cannot be same');
        } else {
            return Promise.resolve();
        }
    };

    return (
        <>
            {formType === 'billingCustomer' && canUpdate && (
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <CustomerListMaster disabled={sameAsBookingCustomer} fnSetData={fnSetData} defaultOption={'customerName'} buttonData={buttonData} setButtonData={setButtonData} />
                    </Col>
                </Row>
            )}
            {!viewOnly && formType === 'billingCustomer' && (
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Form.Item name={[formType, 'sameAsBookingCustomer']} valuePropName="checked" label="" initialValue={formData?.sameAsBookingCustomer}>
                            <Checkbox onClick={handleOnChange}>{translateContent('commonModules.label.bookingCustomerAndBillingCustomer.sameAsBookingCustomer')}</Checkbox>
                        </Form.Item>
                    </Col>
                </Row>
            )}
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name={[formType, 'mobileNumber']} label={translateContent('commonModules.label.bookingCustomerAndBillingCustomer.mobileNumber')} initialValue={formData?.mobileNumber}>
                        <Input placeholder={preparePlaceholderText(translateContent('commonModules.label.bookingCustomerAndBillingCustomer.mobileNumber'))} maxLength={10} disabled={true} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name={[formType, 'customerId']} label={translateContent('commonModules.label.bookingCustomerAndBillingCustomer.customerId')} initialValue={formData?.customerId}>
                        <Input maxLength={6} placeholder={preparePlaceholderText(translateContent('commonModules.label.bookingCustomerAndBillingCustomer.customerId'))} disabled={true} />
                    </Form.Item>
                </Col>

                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name={[formType, 'customerName']} label={translateContent('commonModules.label.bookingCustomerAndBillingCustomer.customerName')} initialValue={formData?.customerName}>
                        <Input placeholder={preparePlaceholderText(translateContent('commonModules.label.bookingCustomerAndBillingCustomer.customerName'))} maxLength={50} disabled={true} />
                    </Form.Item>
                </Col>

                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    {/* <Form.Item name={[formType, 'customerType']} label="Customer Type" initialValue={formData?.customerType} data-testid="customerType">
                        <Input maxLength={6} placeholder={preparePlaceholderText('id')} disabled={true} />
                    </Form.Item> */}
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name={[formType, 'email']} label={translateContent('commonModules.label.bookingCustomerAndBillingCustomer.emailId')} initialValue={formData?.email} rules={[validateEmailField('Email ID')]}>
                        <Input placeholder={preparePlaceholderText(translateContent('commonModules.label.bookingCustomerAndBillingCustomer.emailId'))} maxLength={50} disabled={true} />
                    </Form.Item>
                </Col>

                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name={[formType, 'gender']} label={translateContent('commonModules.label.bookingCustomerAndBillingCustomer.gender')} initialValue={formData?.gender}>
                        {customSelectBox({ data: typeData['GENDER'], disabled: true })}
                    </Form.Item>
                </Col>
                {showAgeGroup && (
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item name={[formType, 'ageGroup']} label={translateContent('commonModules.label.bookingCustomerAndBillingCustomer.ageGroup')} initialValue={formData?.ageGroup}>
                            {customSelectBox({ data: typeData['AGE_RANGE'], disabled: true })}
                        </Form.Item>
                    </Col>
                )}
            </Row>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name={[formType, 'address']} label={translateContent('commonModules.label.bookingCustomerAndBillingCustomer.address')} initialValue={formData?.address}>
                        <Input placeholder={preparePlaceholderText(translateContent('commonModules.label.bookingCustomerAndBillingCustomer.address'))} maxLength={50} disabled={true} />
                    </Form.Item>
                </Col>

                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name={[formType, 'district']} label={translateContent('commonModules.label.bookingCustomerAndBillingCustomer.cityDistrict')} initialValue={formData?.district}>
                        <Input maxLength={50} placeholder={preparePlaceholderText(translateContent('commonModules.label.bookingCustomerAndBillingCustomer.cityDistrict'))} disabled={true} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name={[formType, 'state']} label={translateContent('commonModules.label.bookingCustomerAndBillingCustomer.state')} initialValue={formData?.state}>
                        <Input placeholder={preparePlaceholderText(translateContent('commonModules.label.bookingCustomerAndBillingCustomer.state'))} maxLength={50} disabled={true} />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name={[formType, 'pincode']} label={translateContent('commonModules.label.bookingCustomerAndBillingCustomer.pinCode')} initialValue={formData?.pincode}>
                        <Input placeholder={preparePlaceholderText(translateContent('commonModules.label.bookingCustomerAndBillingCustomer.pinCode'))} maxLength={8} disabled={true} />
                    </Form.Item>
                </Col>

                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name={[formType, 'alternateNumber']} label={translateContent('commonModules.label.bookingCustomerAndBillingCustomer.alternateNumber')} initialValue={formData?.alternateNumber} rules={[validateMobileNoField('alternate Number'), { validator: (rule, value) => alternateNumberCheck(value) }]}>
                        <Input maxLength={10} placeholder={preparePlaceholderText(translateContent('commonModules.label.bookingCustomerAndBillingCustomer.alternateNumber'))} {...disabledProps} />
                    </Form.Item>
                </Col>

                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name={[formType, 'panNo']} label={translateContent('commonModules.label.bookingCustomerAndBillingCustomer.pan')} initialValue={formData?.panNo} rules={[validatePanField('PAN')]}>
                        <Input placeholder={preparePlaceholderText(translateContent('commonModules.label.bookingCustomerAndBillingCustomer.pan'))} onInput={convertToUpperCase} maxLength={10} {...disabledProps} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name={[formType, 'gstin']} label={translateContent('commonModules.label.bookingCustomerAndBillingCustomer.gstin')} initialValue={formData?.gstin} rules={[validateGSTIN('GSTIN')]}>
                        <Input placeholder={preparePlaceholderText(translateContent('commonModules.label.bookingCustomerAndBillingCustomer.gstin'))} onInput={convertToUpperCase} maxLength={15} {...disabledProps} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name={[formType, 'birthDate']} label={translateContent('commonModules.label.bookingCustomerAndBillingCustomer.birthDate')}>
                        <DatePicker disabledDate={disableFutureDate} format={dateFormat} style={{ display: 'auto', width: '100%' }} {...disabledProps} />
                    </Form.Item>
                </Col>
            </Row>
            {/* <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name={[formType, 'aadharNumber']} label="Aadhar" initialValue={formData?.aadharNumber} rules={[validateAadhar('Aadhar')]}>
                        <Input maxLength={12} placeholder={preparePlaceholderText('Aadhar')} {...disabledProps} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name={[formType, 'tradeLicense']} label="Trade Licence" initialValue={formData?.tradeLicense}>
                        <Input maxLength={15} placeholder={preparePlaceholderText('Trade Licence')} {...disabledProps} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name={[formType, 'drivingLicense']} label="Driving License" initialValue={formData?.drivingLicense} rules={[validateDrivingLicenseNoWithSpace('Driving License')]}>
                        <Input placeholder={preparePlaceholderText('Driving License')} maxLength={16} {...disabledProps} />
                    </Form.Item>
                </Col>
            </Row> */}
        </>
    );
};
