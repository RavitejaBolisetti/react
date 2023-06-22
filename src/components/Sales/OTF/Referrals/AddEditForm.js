/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';

import { Col, Input, Form, Row, DatePicker, Card, Button } from 'antd';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';

import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';

import styles from 'components/common/Common.module.css';
import { ViewDetail } from './ViewDetail';
import { validateMobileNoField } from 'utils/validation';
import dayjs from 'dayjs';

const AddEditFormMain = (props) => {
    const { formActionType, formData, form, onFinish, onFinishFailed } = props;
    useEffect(() => {
        if (formData?.hasOwnProperty('customerName')) {
            form.setFieldsValue({
                ...formData,
                registrationNumber: formData?.registrationNumber ?? 'NA',
                dob: dayjs(formData?.dob),
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);
    const viewProps = {
        styles,
    };

    return (
        <Card style={{ backgroundColor: '#F2F2F2' }}>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="mobileNumber" label="Mobile Number" initialValue={formData?.customerName} rules={[validateRequiredInputField('Mobile Number'), validateMobileNoField('Mobile Number'), { min: 10, message: 'Phone number must be minimum 10 digits Long.' }]}>
                        <Input placeholder={preparePlaceholderText('Mobile Number')} maxLength={10} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="customerId" label="Customer ID" initialValue={formData?.customerId}>
                        <Input disabled={true} maxLength={6} placeholder={preparePlaceholderText('id')} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="customerType" label="Customer Type" initialValue={formData?.customerType}>
                        <Input disabled={true} placeholder={preparePlaceholderText('customer type')} maxLength={50} />
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
                    <Form.Item name="registrationNumber" label="Reg. Number" initialValue={formData?.address}>
                        <Input disabled={true} placeholder={preparePlaceholderText('Regestration Number')} maxLength={50} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="chasisNumber" label="Chessis Number" initialValue={formData?.chessisNumber}>
                        <Input disabled={true} maxLength={50} placeholder={preparePlaceholderText('Chessis Number')} />
                    </Form.Item>
                </Col>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="dob" label="D.O.B">
                        <DatePicker format="YYYY/MM/DD" placeholder={preparePlaceholderSelect('Date of Birth')} style={{ width: '250px' }} />
                    </Form.Item>
                </Col>
            </Row>
            {/* <Button type="primary" htmlType="submit">
                Save
            </Button> */}
        </Card>
    );
};

export const AddEditForm = AddEditFormMain;
