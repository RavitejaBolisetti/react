import React, { useState } from 'react';

import { Col, Input, Form, Row, Checkbox, Space, Collapse, Typography } from 'antd';
import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';

import { validateRequiredInputField } from 'utils/validation';

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
                            <Input maxLength={6} placeholder={preparePlaceholderText('id')} disabled={formActionType?.editMode ? true : false} />
                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item name="customerType" label="Customer Type" initialValue={formData?.customerType} rules={[validateRequiredInputField('customer type')]}>
                            <Input placeholder={preparePlaceholderText('customer type')} maxLength={50} />
                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item name="customername" label="Customer Name" initialValue={formData?.customername} rules={[validateRequiredInputField('Customer Name')]}>
                            <Input placeholder={preparePlaceholderText('Customer Name')} maxLength={50} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item name="emailId" label="Email Id" initialValue={formData?.emailId} rules={[validateRequiredInputField('Email Id')]}>
                            <Input maxLength={6} placeholder={preparePlaceholderText('Email Id')} disabled={formActionType?.editMode ? true : false} />
                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item name="mobileNumber" label="Mobile Number" initialValue={formData?.customerName} rules={[validateRequiredInputField('Mobile Number')]}>
                            <Input placeholder={preparePlaceholderText('Mobile Number')} maxLength={50} />
                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item name="regNumber" label="Reg. Number" initialValue={formData?.address} rules={[validateRequiredInputField('Address')]}>
                            <Input placeholder={preparePlaceholderText('Regestration Number')} maxLength={50} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item name="chessisNumber" label="Chessis Number" initialValue={formData?.chessisNumber} rules={[validateRequiredInputField('Chessis Number')]}>
                            <Input maxLength={50} placeholder={preparePlaceholderText('Chessis Number')} disabled={formActionType?.editMode ? true : false} />
                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item name="State" label="State" initialValue={formData?.State} rules={[validateRequiredInputField('State')]}>
                            <Input placeholder={preparePlaceholderText('State')} maxLength={50} />
                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item name="pinCode" label="Pin Code" initialValue={formData?.pinCode} rules={[validateRequiredInputField('Pin Code')]}>
                            <Input placeholder={preparePlaceholderText('Pin Code')} maxLength={50} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item name="alternateNumber" label="Alternate Number" initialValue={formData?.alternateNumber} rules={[validateRequiredInputField('alternate Number')]}>
                            <Input maxLength={50} placeholder={preparePlaceholderText('alternate Number')} disabled={formActionType?.editMode ? true : false} />
                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item name="Email" label="Email" initialValue={formData?.Email} rules={[validateRequiredInputField('Email')]}>
                            <Input placeholder={preparePlaceholderText('Email')} maxLength={50} />
                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item name="PAN" label="PAN" initialValue={formData?.PAN} rules={[validateRequiredInputField('PAN')]}>
                            <Input placeholder={preparePlaceholderText('PAN')} maxLength={50} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item name="aadhar" label="Aadhar" initialValue={formData?.aadhar} rules={[validateRequiredInputField('Aadhar')]}>
                            <Input maxLength={50} placeholder={preparePlaceholderText('Aadhar')} disabled={formActionType?.editMode ? true : false} />
                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item name="GSTIN" label="GSTIN" initialValue={formData?.GSTIN} rules={[validateRequiredInputField('GSTIN')]}>
                            <Input placeholder={preparePlaceholderText('GSTIN')} maxLength={50} />
                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item name="drivingLicense" label="Driving License" initialValue={formData?.drivingLicense} rules={[validateRequiredInputField('Driving License')]}>
                            <Input placeholder={preparePlaceholderText('Driving License')} maxLength={50} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item name="tradeLicence" label="Trade Licence" initialValue={formData?.tradeLicence} rules={[validateRequiredInputField('trade Licence')]}>
                            <Input maxLength={50} placeholder={preparePlaceholderText('Trade Licence')} disabled={formActionType?.editMode ? true : false} />
                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item name="birthDate" label="Birth Date" initialValue={formData?.birthDate} rules={[validateRequiredInputField('Birth Date')]}>
                            <Input placeholder={preparePlaceholderText('Birth Date')} maxLength={50} />
                        </Form.Item>
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                        <Form.Item name="addCorporateDetails" label="Do You Want to Add Corporate Details" initialValue={formData?.addCorporateDetails} rules={[validateRequiredInputField('Do You Want to Add Corporate Details')]}>
                            <Input placeholder={preparePlaceholderText('Do You Want to Add Corporate Details')} maxLength={50} />
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
