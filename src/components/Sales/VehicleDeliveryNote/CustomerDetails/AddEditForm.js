/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Col, Input, Form, Row, Card, Space } from 'antd';

import { preparePlaceholderText } from 'utils/preparePlaceholder';

import styles from 'assets/sass/app.module.scss';

const { Search } = Input;
const AddEditFormMain = (props) => {
    const { formData, handleCustomerIdSearch, handleOnChange, soldByDealer } = props;
    const [customer, setCustomer] = useState();

    const handleCustomerId = () => {
        setCustomer(true);
        handleCustomerIdSearch();
    };

    return (
        <>
            <div className={styles.drawerCustomerMaster}>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Space style={{ display: 'flex' }} size="middle" direction="vertical">
                            <Card style={{ backgroundColor: '#F2F2F2' }}>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formData?.customerId} label="Customer ID" name="customerId">
                                            {soldByDealer ? (
                                                <>
                                                    <Input placeholder={preparePlaceholderText('Customer ID')} disabled={true} />
                                                </>
                                            ) : (
                                                <Search onChange={handleOnChange} onSearch={handleCustomerId} placeholder={preparePlaceholderText('Customer ID')} allowClear />
                                            )}
                                        </Form.Item>
                                    </Col>
                                    {(customer || soldByDealer) && (
                                        <>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item label="Customer Type" name="customerType">
                                                    <Input placeholder={preparePlaceholderText('Customer Type')} disabled={true} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item initialValue={formData?.customerName} label="Customer Name" name="customerName">
                                                    <Input placeholder={preparePlaceholderText('Customer Name')} disabled={true} />
                                                </Form.Item>
                                            </Col>

                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item initialValue={formData?.mobile} label="Mobile" name="customerPhoneNumber">
                                                    <Input placeholder={preparePlaceholderText('Mobile')} disabled={true} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item initialValue={formData?.address} label="Address" name="customerAddress">
                                                    <Input placeholder={preparePlaceholderText('Address')} disabled={true} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item label="City" name="customerCity">
                                                    <Input placeholder={preparePlaceholderText('City')} disabled={true} />
                                                </Form.Item>
                                            </Col>

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
                                                <Form.Item label="Pincode" name="pinCode">
                                                    <Input placeholder={preparePlaceholderText('pincode')} disabled={true} />
                                                </Form.Item>
                                            </Col>

                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item label="E-Mail" name="email">
                                                    <Input placeholder={preparePlaceholderText('Email')} disabled={true} />
                                                </Form.Item>
                                            </Col>
                                        </>
                                    )}
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
