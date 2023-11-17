/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Form, Input, Divider, Card, Space } from 'antd';

import { preparePlaceholderText } from 'utils/preparePlaceholder';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

const { Search } = Input;

const CustomerDetailsForm = (props) => {
    const { handleCustomerChange, handleCustomerSearch, disabledProps, formData, formActionType, form, validCustomerID = false } = props;
    const showCustomerDetails = formActionType?.addMode && form?.getFieldValue('customerCode') && validCustomerID;
    return (
        <>
            <div className={styles.drawerCustomerMaster}>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Space style={{ display: 'flex' }} size="middle" direction="vertical">
                            <Card style={{ backgroundColor: '#F2F2F2' }}>
                                <Row gutter={20}>
                                    <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formData?.customerId} label={translateContent('amcRegistration.label.customerId')} name="customerCode">
                                            <Search {...disabledProps} placeholder={preparePlaceholderText(translateContent('amcRegistration.label.customerId'))} onChange={handleCustomerChange} onSearch={handleCustomerSearch} allowClear />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Divider />
                                {showCustomerDetails && (
                                    <Row gutter={20}>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item initialValue={formData?.customerName} label={translateContent('amcRegistration.label.customerName')} name="customerName">
                                                <Input placeholder={preparePlaceholderText(translateContent('amcRegistration.label.customerName'))} disabled={true} />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item label={translateContent('amcRegistration.label.customerAddress')} name="customerAddress">
                                                <Input placeholder={preparePlaceholderText(translateContent('amcRegistration.label.customerAddress'))} disabled={true} />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item label={translateContent('amcRegistration.label.state')} name="state">
                                                <Input placeholder={preparePlaceholderText(translateContent('amcRegistration.label.state'))} disabled={true} />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item label={translateContent('amcRegistration.label.city')} name="customerCity">
                                                <Input placeholder={preparePlaceholderText(translateContent('amcRegistration.label.city'))} disabled={true} />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item label={translateContent('amcRegistration.label.district')} name="district">
                                                <Input placeholder={preparePlaceholderText(translateContent('amcRegistration.label.district'))} disabled={true} />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item label={translateContent('amcRegistration.label.tehsil')} name="tehsil">
                                                <Input placeholder={preparePlaceholderText(translateContent('amcRegistration.label.tehsil'))} disabled={true} />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item label={translateContent('amcRegistration.label.locality')} name="locality">
                                                <Input placeholder={preparePlaceholderText(translateContent('amcRegistration.label.locality'))} disabled={true} />
                                            </Form.Item>
                                        </Col>

                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item label={translateContent('amcRegistration.label.pinCode')} name="pinCode">
                                                <Input placeholder={preparePlaceholderText(translateContent('amcRegistration.label.pinCode'))} disabled={true} />
                                            </Form.Item>
                                        </Col>

                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item label={translateContent('amcRegistration.label.mobile')} name="customerPhoneNumber">
                                                <Input placeholder={preparePlaceholderText(translateContent('amcRegistration.label.mobile'))} disabled={true} />
                                            </Form.Item>
                                        </Col>

                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item label={translateContent('amcRegistration.label.gstin')} name="gstin">
                                                <Input placeholder={preparePlaceholderText(translateContent('amcRegistration.label.gstin'))} disabled={true} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                )}
                            </Card>
                        </Space>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default CustomerDetailsForm;
