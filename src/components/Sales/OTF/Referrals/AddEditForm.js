/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';

import { Col, Input, Form, Row, DatePicker, Card, Select } from 'antd';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';

import { validateRequiredInputField, validateMobileNoField } from 'utils/validation';
import { disableFutureDate } from 'utils/disableDate';
import { convertDateToCalender } from 'utils/formatDateTime';

import styles from 'components/common/Common.module.css';

const { Search } = Input;

const AddEditFormMain = (props) => {
    const { formData, form, onSearch, isCustomerLoading, typeData } = props;


    useEffect(() => {
        if (formData?.hasOwnProperty('mobileNumber')) {
            form.setFieldsValue({
                ...formData,
                registrationNumber: formData?.registrationNumber ?? 'NA',
                dob: convertDateToCalender(formData?.dob),
            });
        } else {
            form.resetFields();
            form.setFieldsValue({ customerId: undefined, customerType: undefined, emailId: undefined, customerName: undefined, registrationNumber: undefined, chasisNumber: undefined });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);

    return (
        <Card style={{ backgroundColor: '#F2F2F2' }}>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8} className={styles.uniqueSearchInput}>
                    <Form.Item name="mobileNumber" label="Mobile Number" initialValue={formData?.mobileNumber} rules={[validateRequiredInputField('Mobile Number'), validateMobileNoField('Mobile Number'), { min: 10, message: 'Phone number must be minimum 10 digits Long.' }]}>
                        <Search loading={isCustomerLoading} placeholder={preparePlaceholderText('Mobile Number')} style={{ width: '100%' }} maxLength={10} allowClear type="text" onSearch={onSearch} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="customerId" label="Customer ID" initialValue={formData?.customerId}>
                        <Input disabled={true} maxLength={6} placeholder={preparePlaceholderText('id')} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item initialValue={formData?.customerType} label="Customer Type" name="customerType" data-testid="customerType">
                        <Select disabled={true} placeholder={preparePlaceholderSelect('customer type')} fieldNames={{ label: 'value', value: 'key' }} options={typeData?.CUST_TYPE} allowClear></Select>
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
                    <Form.Item name="customerName" label="Customer Name" initialValue={formData?.customername}>
                        <Input disabled={true} placeholder={preparePlaceholderText('Customer Name')} maxLength={50} />
                    </Form.Item>
                </Col>

                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="registrationNumber" label="Reg. Number" initialValue={formData?.registrationNumber}>
                        <Input disabled={true} placeholder={preparePlaceholderText('Regestration Number')} maxLength={50} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="chasisNumber" label="Chessis Number" initialValue={formData?.chasisNumber}>
                        <Input disabled={true} maxLength={50} placeholder={preparePlaceholderText('Chessis Number')} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item  initialValue={convertDateToCalender(formData?.dob)} name="dob" label="D.O.B">
                        <DatePicker format="YYYY-MM-DD" disabledDate={disableFutureDate} placeholder={preparePlaceholderSelect('Date of Birth')} style={{ width: '250px' }} />
                    </Form.Item>
                </Col>
            </Row>
        </Card>
    );
};

export const AddEditForm = AddEditFormMain;
