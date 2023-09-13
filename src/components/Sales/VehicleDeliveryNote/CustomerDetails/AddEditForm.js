/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Col, Input, Form, Row, Card, Space } from 'antd';

import { validateNumberWithTwoDecimalPlaces } from 'utils/validation';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';

import styles from 'assets/sass/app.module.scss';
import { customSelectBox } from 'utils/customSelectBox';

const AddEditFormMain = (props) => {
    const { formData } = props;

    return (
        <>
            <div className={styles.drawerCustomerMaster}>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Space style={{ display: 'flex' }} size="middle" direction="vertical">
                            <Card style={{ backgroundColor: '#F2F2F2' }}>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formData?.customerId} label="Customer ID" name="customerId" rules={[validateNumberWithTwoDecimalPlaces('customer code')]}>
                                            <Input placeholder={preparePlaceholderText('Custpmer Code')} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formData?.customerType} label="Customer Type" name="customerType">
                                        <Input placeholder={preparePlaceholderText('Customer Type')} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formData?.customerName} label="Customer Name" name="customerName" rules={[validateNumberWithTwoDecimalPlaces('customer name')]}>
                                            <Input placeholder={preparePlaceholderText('Customer Name')} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formData?.mobile} label="Mobile" name="mobile" rules={[validateNumberWithTwoDecimalPlaces('Mobile')]}>
                                            <Input placeholder={preparePlaceholderText('Mobile')} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formData?.address} label="Address" name="address" rules={[validateNumberWithTwoDecimalPlaces('Address')]}>
                                            <Input placeholder={preparePlaceholderText('Address')} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formData?.city} label="City" name="city">
                                            <Input placeholder={preparePlaceholderText('City')} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item label="District" name="district">
                                            <Input placeholder={preparePlaceholderText('District')} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item label="State" name="state">
                                            <Input placeholder={preparePlaceholderText('State')} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item label="Pincode" name="pincode">
                                            <Input placeholder={preparePlaceholderText('pincode')} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item label="E-Mail" name="email">
                                            <Input placeholder={preparePlaceholderText('Email')} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Card>
                        </Space>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export const AddEditForm = AddEditFormMain;
