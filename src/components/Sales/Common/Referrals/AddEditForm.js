/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Col, Input, Form, Row, DatePicker, Card, Select } from 'antd';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';

import { validateMobileNoField } from 'utils/validation';
import { formattedCalendarDate, dateFormat } from 'utils/formatDateTime';

import { CustomerListMaster } from 'components/utils/CustomerListModal';
import { translateContent } from 'utils/translateContent';

const AddEditFormMain = (props) => {
    const { form, formData, typeData, fnSetData, viewOnly = false } = props;

    useEffect(() => {
        if (formData) {
            form.setFieldsValue({
                ...formData,
                dob: formattedCalendarDate(formData?.dob || formData?.dateOfBirth),
                chassisNumber: formData?.chasisNumber || formData?.chassisNumber,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);

    const disabledProps = { disabled: true };

    return (
        <Card>
            {!viewOnly && <CustomerListMaster fnSetData={fnSetData} defaultOption={'customerName'} />}
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="registrationNumber" label={translateContent('commonModules.label.referrals.vehicleRegistrationNumber')} initialValue={formData?.registrationNumber}>
                        <Input {...disabledProps} maxLength={30} placeholder={preparePlaceholderText(translateContent('commonModules.label.referrals.vehicleRegistrationNumber'))} />
                    </Form.Item>
                </Col>

                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="chassisNumber" label={translateContent('commonModules.label.referrals.chassisNumber')} initialValue={formData?.chassisNumber}>
                        <Input {...disabledProps} maxLength={50} placeholder={preparePlaceholderText(translateContent('commonModules.label.referrals.chassisNumber'))} />
                    </Form.Item>
                </Col>

                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="customerId" label={translateContent('commonModules.label.referrals.customerCode')} initialValue={formData?.customerId}>
                        <Input {...disabledProps} maxLength={6} placeholder={preparePlaceholderText(translateContent('commonModules.label.referrals.customerCode'))} />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="customerType" initialValue={formData?.customerType} label={translateContent('commonModules.label.referrals.customerType')} data-testid="customerType">
                        <Select {...disabledProps} placeholder={preparePlaceholderSelect(translateContent('commonModules.label.referrals.customerType'))} fieldNames={{ label: 'value', value: 'key' }} options={typeData?.CUST_TYPE} allowClear></Select>
                    </Form.Item>
                </Col>

                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="customerName" label={translateContent('commonModules.label.referrals.customerName')} initialValue={formData?.customerName}>
                        <Input {...disabledProps} placeholder={preparePlaceholderText(translateContent('commonModules.label.referrals.customerName'))} maxLength={50} />
                    </Form.Item>
                </Col>

                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="mobileNumber" label={translateContent('commonModules.label.referrals.mobileNumber')} initialValue={formData?.mobileNumber} rules={[validateMobileNoField(translateContent('commonModules.label.referrals.mobileNumber')), { min: 10, message: translateContent('vehicleInvoiceGeneration.validation.referrals.mobileNumber') }]}>
                        <Input {...disabledProps} maxLength={6} placeholder={preparePlaceholderText(translateContent('commonModules.label.referrals.mobileNumber'))} />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="emailId" label={translateContent('commonModules.label.referrals.emailId')} initialValue={formData?.emailId}>
                        <Input {...disabledProps} maxLength={6} placeholder={preparePlaceholderText(translateContent('commonModules.label.referrals.emailId'))} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="dob" label={translateContent('commonModules.label.referrals.dateOfBirth')}>
                        <DatePicker {...disabledProps} format={dateFormat} placeholder={preparePlaceholderText(translateContent('commonModules.label.referrals.dateOfBirth'))} />
                    </Form.Item>
                </Col>
            </Row>
        </Card>
    );
};

export const AddEditForm = AddEditFormMain;
