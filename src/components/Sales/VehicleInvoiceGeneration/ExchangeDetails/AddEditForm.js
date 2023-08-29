/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Col, Input, Form, Row, Card, Space } from 'antd';

import { customSelectBox } from 'utils/customSelectBox';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';

import styles from 'assets/sass/app.module.scss';

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
                                        <Form.Item initialValue={formData?.registeredNumber} label="Registered No." name="registeredNumber">
                                            <Input placeholder={preparePlaceholderText('Registered No.')} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formData?.evaluationNumber} label="Evaluation Number" name="evaluationNumber">
                                            <Input placeholder={preparePlaceholderText('Evaluation Number')} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formData?.customerName} label="Customer Name" name="customerName">
                                            <Input placeholder={preparePlaceholderText('Customer Name')} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formData?.make} label="Make" name="make">
                                            <Input placeholder={preparePlaceholderText('make')} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formData?.modalGroup} label="Modal Group" name="modalGroup">
                                            <Input placeholder={preparePlaceholderText('Modal Group')} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formData?.variant} label="Variant" name="variant">
                                            <Input placeholder={preparePlaceholderText('Variant')} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formData?.oldChasisNumber} label="Old Chasis Number" name="oldChasisNumber">
                                            <Input placeholder={preparePlaceholderText('Old Chasis Number')} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formData?.relationship} label="Relationship" name="relationship">
                                            <Input placeholder={preparePlaceholderText('Relationship')} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formData?.monthOfRegistration} label="Month Of Registration" name="monthOfRegistration">
                                            <Input placeholder={preparePlaceholderText('Month Of Registration')} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formData?.registrationNumber} label="Year Of Registration" name="yearOfRegistration">
                                            <Input placeholder={preparePlaceholderText('Year Of Registration')} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formData?.registrationNumber} label="Usage" name="usage">
                                            <Input placeholder={preparePlaceholderText('Usage')} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formData?.registrationNumber} label="Scheme Name" name="schemeName">
                                            <Input placeholder={preparePlaceholderText('Scheme Name')} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formData?.schemeAmount} label="Scheme Amount" name="schemeAmount">
                                            <Input placeholder={preparePlaceholderText('Scheme Amount')} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formData?.km} label="KM" name="km">
                                            <Input placeholder={preparePlaceholderText('KM')} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formData?.customerExpectedPrice} label="Customer Expected Price" name="customerExpectedPrice">
                                            <Input placeholder={preparePlaceholderText('Customer Expected Price')} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formData?.procurementPrice} label="Procurement Price" name="procurementPrice">
                                            <Input placeholder={preparePlaceholderText('Procurement Price')} disabled={true} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formData?.totalWriteOffAmount} label="Hypothecated To" name="hypothecatedTo">
                                            {customSelectBox({ disabled: true, placeholder: preparePlaceholderSelect('Hypothecated To') })}
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
