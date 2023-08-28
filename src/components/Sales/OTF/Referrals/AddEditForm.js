/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Col, Input, Form, Row, DatePicker, Card, Select } from 'antd';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';

import { validateRequiredInputField, validateMobileNoField } from 'utils/validation';
import { formattedCalendarDate, dateFormat } from 'utils/formatDateTime';

import { CustomerListMaster } from 'components/utils/CustomerListModal';
import styles from 'assets/sass/app.module.scss';
//import styles from 'components/common/Common.module.css';

const AddEditFormMain = (props) => {
    const { form, formData, typeData, fnSetData } = props;

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

    return (
        <Card>
            <CustomerListMaster fnSetData={fnSetData} />
            <Row gutter={20} className={styles.marT20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="registrationNumber" label="Vehicle Registration Number" initialValue={formData?.registrationNumber}>
                        <Input disabled={true} maxLength={30} placeholder={preparePlaceholderText('Vehicle Registration Number')} />
                    </Form.Item>
                </Col>

                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="chassisNumber" label="Chassis Number" initialValue={formData?.chassisNumber}>
                        <Input disabled={true} maxLength={50} placeholder={preparePlaceholderText('Chassis Number')} />
                    </Form.Item>
                </Col>

                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="customerId" label="Customer Code" initialValue={formData?.customerId}>
                        <Input disabled={true} maxLength={6} placeholder={preparePlaceholderText('Customer Code')} />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="customerType" initialValue={formData?.customerType} label="Customer Type" data-testid="customerType">
                        <Select disabled={true} placeholder={preparePlaceholderSelect('customer Type')} fieldNames={{ label: 'value', value: 'key' }} options={typeData?.CUST_TYPE} allowClear></Select>
                    </Form.Item>
                </Col>

                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="customerName" label="Customer Name" initialValue={formData?.customerName}>
                        <Input disabled={true} placeholder={preparePlaceholderText('Customer Name')} maxLength={50} />
                    </Form.Item>
                </Col>

                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="mobileNumber" label="Mobile Number" initialValue={formData?.mobileNumber} rules={[validateRequiredInputField('Mobile Number'), validateMobileNoField('Mobile Number'), { min: 10, message: 'Phone number must be minimum 10 digits Long.' }]}>
                        <Input disabled={true} maxLength={6} placeholder={preparePlaceholderText('Vehicle Registration Number')} />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="emailId" label="Email Id" initialValue={formData?.emailId}>
                        <Input disabled={true} maxLength={6} placeholder={preparePlaceholderText('Email Id')} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="dob" label="Date of Birth">
                        <DatePicker disabled={true} format={dateFormat} placeholder={preparePlaceholderText('Date of Birth')} />
                    </Form.Item>
                </Col>
            </Row>
        </Card>
    );
};

export const AddEditForm = AddEditFormMain;
