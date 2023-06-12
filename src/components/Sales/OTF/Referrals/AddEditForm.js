import React, { useState } from 'react';

import { Col, Input, Form, Row, DatePicker, Space, Collapse, Typography } from 'antd';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';

import { validateRequiredInputField, validateRequiredSelectField } from 'utils/validation';

import styles from 'components/common/Common.module.css';
import { ViewDetail } from './ViewDetail';

const AddEditFormMain = (props) => {
    const { formActionType, formData, form, onFinish, onFinishFailed } = props;

    const viewProps = {
        styles,
    };

    return !formActionType?.viewMode ? (
        <>
            <Form form={form} autoComplete="off" layout="vertical" colon={false} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Row gutter={20}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item name="customerId" label="Customer ID" initialValue={formData?.customerId} rules={[validateRequiredInputField('id')]}>
                            <Input maxLength={6} placeholder={preparePlaceholderText('id')} />
                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item name="customerType" label="Customer Type" initialValue={formData?.customerType} rules={[validateRequiredInputField('customer type')]}>
                            <Input disabled={true} placeholder={preparePlaceholderText('customer type')} maxLength={50} />
                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item name="customername" label="Customer Name" initialValue={formData?.customername} rules={[validateRequiredInputField('Customer Name')]}>
                            <Input disabled={true} placeholder={preparePlaceholderText('Customer Name')} maxLength={50} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item name="emailId" label="Email Id" initialValue={formData?.emailId} rules={[validateRequiredInputField('Email Id')]}>
                            <Input disabled={true} maxLength={6} placeholder={preparePlaceholderText('Email Id')} />
                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item name="mobileNumber" label="Mobile Number" initialValue={formData?.customerName} rules={[validateRequiredInputField('Mobile Number')]}>
                            <Input disabled={true} placeholder={preparePlaceholderText('Mobile Number')} maxLength={50} />
                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item name="regNumber" label="Reg. Number" initialValue={formData?.address} rules={[validateRequiredInputField('Address')]}>
                            <Input disabled={true} placeholder={preparePlaceholderText('Regestration Number')} maxLength={50} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item name="chessisNumber" label="Chessis Number" initialValue={formData?.chessisNumber} rules={[validateRequiredInputField('Chessis Number')]}>
                            <Input disabled={true} maxLength={50} placeholder={preparePlaceholderText('Chessis Number')} />
                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item name="dob" label="D.O.B" initialValue={formData?.chessisNumber} rules={[validateRequiredSelectField('D.O.B')]}>
                            <DatePicker placeholder={preparePlaceholderSelect('Date of Birth')} style={{ width: '280px' }} />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </>
    ) : (
        <ViewDetail {...viewProps} />
    );
};

export const AddEditForm = AddEditFormMain;
