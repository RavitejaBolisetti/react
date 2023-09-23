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

export const AddressCommonForm = (props) => {
    const { formType, formData, disabledProps, handleOnChange, fnSetData, typeData, sameAsBookingCustomer, viewOnly = false } = props;
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
                        <CustomerListMaster disabled={sameAsBookingCustomer} fnSetData={fnSetData} defaultOption={'customerName'} />
                    </Col>
                </Row>
            )}
            {!viewOnly && formType === 'billingCustomer' && (
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Form.Item name={[formType, 'sameAsBookingCustomer']} label="" initialValue={formData?.sameAsBookingCustomer}>
                            <Checkbox valuePropName="checked" style={{ margin: '5px 0px 15px 0px' }} onClick={handleOnChange} name="sameAsBookingCustomer">
                                Same as Booking Customer
                            </Checkbox>
                        </Form.Item>
                    </Col>
                </Row>
            )}
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name={[formType, 'mobileNumber']} label="Mobile Number" initialValue={formData?.mobileNumber}>
                        <Input placeholder={preparePlaceholderText('Mobile Number')} maxLength={10} disabled={true} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name={[formType, 'customerId']} label="Customer ID" initialValue={formData?.customerId}>
                        <Input maxLength={6} placeholder={preparePlaceholderText('id')} disabled={true} />
                    </Form.Item>
                </Col>

                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name={[formType, 'customerName']} label="Customer Name" initialValue={formData?.customerName}>
                        <Input placeholder={preparePlaceholderText('Customer Name')} maxLength={50} disabled={true} />
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
                    <Form.Item name={[formType, 'email']} label="Email" initialValue={formData?.email} rules={[validateEmailField('Email')]}>
                        <Input placeholder={preparePlaceholderText('Email')} maxLength={50} disabled={true} />
                    </Form.Item>
                </Col>

                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name={[formType, 'gender']} label="Gender" initialValue={formData?.gender}>
                        {customSelectBox({ data: typeData['GENDER'], disabled: true })}
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name={[formType, 'ageGroup']} label="Age Group" initialValue={formData?.ageGroup}>
                        {customSelectBox({ data: typeData['AGE_RANGE'], disabled: true })}
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name={[formType, 'address']} label="Address" initialValue={formData?.address}>
                        <Input placeholder={preparePlaceholderText('Address')} maxLength={50} disabled={true} />
                    </Form.Item>
                </Col>

                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name={[formType, 'district']} label="City/District" initialValue={formData?.district}>
                        <Input maxLength={50} placeholder={preparePlaceholderText('District')} disabled={true} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name={[formType, 'state']} label="State" initialValue={formData?.state}>
                        <Input placeholder={preparePlaceholderText('State')} maxLength={50} disabled={true} />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name={[formType, 'pincode']} label="PIN Code" initialValue={formData?.pincode}>
                        <Input placeholder={preparePlaceholderText('PIN Code')} maxLength={8} disabled={true} />
                    </Form.Item>
                </Col>

                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name={[formType, 'alternateNumber']} label="Alternate Number" initialValue={formData?.alternateNumber} rules={[validateMobileNoField('alternate Number'), { validator: (rule, value) => alternateNumberCheck(value) }]}>
                        <Input maxLength={10} placeholder={preparePlaceholderText('alternate Number')} {...disabledProps} />
                    </Form.Item>
                </Col>

                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name={[formType, 'panNo']} label="PAN" initialValue={formData?.panNo} rules={[validatePanField('PAN')]}>
                        <Input placeholder={preparePlaceholderText('PAN')} onInput={convertToUpperCase} maxLength={10} {...disabledProps} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name={[formType, 'gstin']} label="GSTIN" initialValue={formData?.gstin} rules={[validateGSTIN('GSTIN')]}>
                        <Input placeholder={preparePlaceholderText('GSTIN')} onInput={convertToUpperCase} maxLength={15} {...disabledProps} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name={[formType, 'birthDate']} label="Birth Date">
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
