import React, { useState } from 'react';

import { Col, Input, Form, Row, Checkbox, Select, Button, InputNumber, DatePicker, Space, Card, Collapse, Typography, Descriptions } from 'antd';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';

import { validateAlphanumericWithSpace, validateRequiredInputField, validationFieldLetterAndNumber } from 'utils/validation';

import styles from 'components/common/Common.module.css';
import { ViewDetail } from './ViewDetail';

const { Text, Link } = Typography;

const { Panel } = Collapse;

const AddEditForm = (props) => {
    const { buttonData, setButtonData, formActionType, setIsFormVisible, onFinish, onFinishFailed, form, formData } = props;
    const [activeKey, setactiveKey] = useState([1]);
    console.log('formActionType?.viewMode', formActionType?.viewMode);

    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xxl: 3, xl: 3, lg: 3, md: 3, sm: 3, xs: 3 },
        styles,
        activeKey,
        setactiveKey,
    };

    const onChange = (values) => {
        const isPresent = activeKey.includes(values);

        if (isPresent) {
            const newActivekeys = [];

            activeKey.filter((item) => {
                if (item != values) {
                    newActivekeys.push(item);
                }
            });
            setactiveKey(newActivekeys);
        } else {
            setactiveKey([...activeKey, values]);
        }
    };

    return (
        <>
            {!formActionType?.viewMode ? (
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Space style={{ display: 'flex' }} size="middle" direction="vertical">
                            <Collapse
                                expandIcon={() => {
                                    if (activeKey.includes(1)) {
                                        return <MinusOutlined className={styles.iconsColor} />;
                                    } else {
                                        return <PlusOutlined className={styles.iconsColor} />;
                                    }
                                }}
                                activeKey={activeKey}
                                onChange={() => onChange(1)}
                                expandIconPosition="end"
                            >
                                <Panel
                                    header={
                                        <div className={styles.alignUser}>
                                            <Text strong style={{ marginTop: '4px', marginLeft: '8px' }}>
                                                Booking Customer
                                            </Text>
                                        </div>
                                    }
                                    key="1"
                                >
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
                                                <Form.Item name="mobileNumber" label="Mobile Number" initialValue={formData?.customerType} rules={[validateRequiredInputField('Mobile Number')]}>
                                                    <Input placeholder={preparePlaceholderText('Mobile Number')} maxLength={50} />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={20}>
                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item name="salutation" label="Salutation" initialValue={formData?.Salutation} rules={[validateRequiredInputField('Salutation')]}>
                                                    <Input maxLength={6} placeholder={preparePlaceholderText('Salutation')} disabled={formActionType?.editMode ? true : false} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item name="customerName" label="Customer Name" initialValue={formData?.customerName} rules={[validateRequiredInputField('Customer Name')]}>
                                                    <Input placeholder={preparePlaceholderText('Customer Name')} maxLength={50} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item name="address" label="Address" initialValue={formData?.address} rules={[validateRequiredInputField('Address')]}>
                                                    <Input placeholder={preparePlaceholderText('Address')} maxLength={50} />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={20}>
                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item name="City/District" label="City/District" initialValue={formData?.CityDistrict} rules={[validateRequiredInputField('City/District')]}>
                                                    <Input maxLength={50} placeholder={preparePlaceholderText('City/District')} disabled={formActionType?.editMode ? true : false} />
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
                                </Panel>
                            </Collapse>
                            <Collapse
                                expandIcon={() => {
                                    if (activeKey.includes(2)) {
                                        return <MinusOutlined className={styles.iconsColor} />;
                                    } else {
                                        return <PlusOutlined className={styles.iconsColor} />;
                                    }
                                }}
                                activeKey={activeKey}
                                onChange={() => onChange(2)}
                                expandIconPosition="end"
                            >
                                <Panel
                                    header={
                                        <div className={styles.alignUser}>
                                            <Text strong style={{ marginTop: '4px', marginLeft: '8px' }}>
                                                Billing Customer
                                            </Text>
                                        </div>
                                    }
                                    key="2"
                                >
                                    <Checkbox>Same as Booking Customer</Checkbox>
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
                                                <Form.Item name="mobileNumber" label="Mobile Number" initialValue={formData?.customerType} rules={[validateRequiredInputField('Mobile Number')]}>
                                                    <Input placeholder={preparePlaceholderText('Mobile Number')} maxLength={50} />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={20}>
                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item name="salutation" label="Salutation" initialValue={formData?.Salutation} rules={[validateRequiredInputField('Salutation')]}>
                                                    <Input maxLength={6} placeholder={preparePlaceholderText('Salutation')} disabled={formActionType?.editMode ? true : false} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item name="customerName" label="Customer Name" initialValue={formData?.customerName} rules={[validateRequiredInputField('Customer Name')]}>
                                                    <Input placeholder={preparePlaceholderText('Customer Name')} maxLength={50} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item name="address" label="Address" initialValue={formData?.address} rules={[validateRequiredInputField('Address')]}>
                                                    <Input placeholder={preparePlaceholderText('Address')} maxLength={50} />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={20}>
                                            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                                <Form.Item name="City/District" label="City/District" initialValue={formData?.CityDistrict} rules={[validateRequiredInputField('City/District')]}>
                                                    <Input maxLength={50} placeholder={preparePlaceholderText('City/District')} disabled={formActionType?.editMode ? true : false} />
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
                                </Panel>
                            </Collapse>
                        </Space>
                    </Col>
                </Row>
            ) : (
                <ViewDetail {...viewProps} />
            )}
        </>
    );
};

export default AddEditForm;
