/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Col, Input, Form, Row, Checkbox } from 'antd';

import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { CustomerListMaster } from 'components/utils/CustomerListModal';
import { translateContent } from 'utils/translateContent';

export const AddressCommonForm = (props) => {
    const { formType, formData, handleOnChange, fnSetData, data, sameAsBookingCustomer, buttonData, setButtonData } = props;
    const canUpdate = (formType === 'ownerCustomer' && !data?.ownerCustomer?.customerId) || formType === 'billingCustomer';

    return (
        <>
            {canUpdate && (
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <CustomerListMaster disabled={sameAsBookingCustomer} fnSetData={fnSetData} buttonData={buttonData} setButtonData={setButtonData} />
                    </Col>
                </Row>
            )}

            <Row gutter={20}>
                {formType === 'billingCustomer' && (
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Form.Item name={[formType, 'sameAsOwner']} label="" initialValue={formData?.sameAsOwner} valuePropName="checked">
                            <Checkbox onClick={handleOnChange}>{translateContent('vehicleDetail.customerDetails.label.sameAsOwner')}</Checkbox>
                        </Form.Item>
                    </Col>
                )}
            </Row>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name={[formType, 'customerId']} label={translateContent('vehicleDetail.customerDetails.label.customerId')} initialValue={formData?.customerId}>
                        <Input disabled={true} maxLength={6} placeholder={preparePlaceholderText('customer Code')} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name={[formType, 'saluation']} label={translateContent('vehicleDetail.customerDetails.label.title')} initialValue={formData?.saluation}>
                        <Input disabled={true} maxLength={6} placeholder={preparePlaceholderText('Title')} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name={[formType, 'customerName']} label={translateContent('vehicleDetail.customerDetails.label.customerName')} initialValue={formData?.customerName}>
                        <Input disabled={true} placeholder={preparePlaceholderText('Name')} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name={[formType, 'address']} label={translateContent('vehicleDetail.customerDetails.label.address')} initialValue={formData?.address}>
                        <Input disabled={true} placeholder={preparePlaceholderText('Address')} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name={[formType, 'city']} label={translateContent('vehicleDetail.customerDetails.label.city')} initialValue={formData?.city}>
                        <Input disabled={true} placeholder={preparePlaceholderText('city')} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name={[formType, 'state']} label={translateContent('vehicleDetail.customerDetails.label.state')} initialValue={formData?.state}>
                        <Input disabled={true} placeholder={preparePlaceholderText('State')} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name={[formType, 'mobileNumber']} label={translateContent('vehicleDetail.customerDetails.label.mobileNumber')} initialValue={formData?.mobileNumber}>
                        <Input disabled={true} placeholder={preparePlaceholderText('mobile number')} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name={[formType, 'pincode']} label={translateContent('vehicleDetail.customerDetails.label.pincode')} initialValue={formData?.pincode}>
                        <Input disabled={true} placeholder={preparePlaceholderText('pincode')} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name={[formType, 'email']} label={translateContent('vehicleDetail.customerDetails.label.email')} initialValue={formData?.email}>
                        <Input disabled={true} placeholder={preparePlaceholderText('email')} />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name={[formType, 'gstin']} label={translateContent('vehicleDetail.customerDetails.label.gstin')} initialValue={formData?.gstin}>
                        <Input disabled={true} placeholder={preparePlaceholderText('gstin')} />
                    </Form.Item>
                </Col>
            </Row>
        </>
    );
};
