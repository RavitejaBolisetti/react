/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Form, Col, Row, Card, Space, Input } from 'antd';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';
import { preparePlaceholderText } from 'utils/preparePlaceholder';

export const AddEditForm = (props) => {
    const { formData, formActionType, typeData, isReadOnly = true } = props;

    const disabledProps = { disabled: isReadOnly };

    return (
        <>
            <div className={styles.drawerCustomerMaster}>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Space style={{ display: 'flex' }} size="middle" direction="vertical">
                            <Card style={{ backgroundColor: '#F2F2F2' }}>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item initialValue={formData?.corporateCode} label={translateContent('coDealer.label.indentDetails.indentNumber')} name="indentNumber" data-testid="indent number">
                                            <Input placeholder={preparePlaceholderText(translateContent('coDealer.label.indentDetails.indentNumber'))} {...disabledProps} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item initialValue={formData?.corporateCode} label={translateContent('coDealer.label.indentDetails.indentDate')} name="indentDate" data-testid="indent date">
                                            <Input placeholder={preparePlaceholderText(translateContent('coDealer.label.indentDetails.indentDate'))} {...disabledProps} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item initialValue={formData?.corporateCode} label={translateContent('coDealer.label.indentDetails.dealerCode')} name="DealerCode" data-testid="dealer code">
                                            <Input placeholder={preparePlaceholderText(translateContent('coDealer.label.indentDetails.dealerCode'))} {...disabledProps} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item initialValue={formData?.corporateCode} label={translateContent('coDealer.label.indentDetails.dealerName')} name="DealerName" data-testid="dealer name">
                                            <Input placeholder={preparePlaceholderText(translateContent('coDealer.label.indentDetails.dealerName'))} {...disabledProps} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item initialValue={formData?.corporateCode} label={translateContent('coDealer.label.indentDetails.address')} name="Address" data-testid="address">
                                            <Input placeholder={preparePlaceholderText(translateContent('coDealer.label.indentDetails.address'))} {...disabledProps} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item initialValue={formData?.corporateCode} label={translateContent('coDealer.label.indentDetails.cityDistrict')} name="cityDistrict" data-testid="citydistrict">
                                            <Input placeholder={preparePlaceholderText(translateContent('coDealer.label.indentDetails.cityDistrict'))} {...disabledProps} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item initialValue={formData?.corporateCode} label={translateContent('coDealer.label.indentDetails.state')} name="state" data-testid="state">
                                            <Input placeholder={preparePlaceholderText(translateContent('coDealer.label.indentDetails.state'))} {...disabledProps} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item initialValue={formData?.corporateCode} label={translateContent('coDealer.label.indentDetails.pinCode')} name="pinCode" data-testid="pincode">
                                            <Input placeholder={preparePlaceholderText(translateContent('coDealer.label.indentDetails.pinCode'))} {...disabledProps} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item initialValue={formData?.corporateCode} label={translateContent('coDealer.label.indentDetails.gstIn')} name="gstIn" data-testid="gstIn">
                                            <Input placeholder={preparePlaceholderText(translateContent('coDealer.label.indentDetails.gstIn'))} {...disabledProps} />
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
