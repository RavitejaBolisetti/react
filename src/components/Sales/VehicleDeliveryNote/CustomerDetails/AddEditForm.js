/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Col, Input, Form, Row, Card, Space } from 'antd';
import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { translateContent } from 'utils/translateContent';

import styles from 'assets/sass/app.module.scss';

const { Search } = Input;
const AddEditFormMain = (props) => {
    const { form, formData, handleCustomerIdSearch, handleOnChange, soldByDealer } = props;
    useEffect(() => {
        if (formData) {
            form.setFieldsValue({ ...formData });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData]);
    const showFields = soldByDealer || (formData && Object?.keys(formData)?.length > 0 && formData?.customerType);
    return (
        <>
            <div className={styles.drawerCustomerMaster}>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Space style={{ display: 'flex' }} size="middle" direction="vertical">
                            <Card style={{ backgroundColor: '#F2F2F2' }}>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formData?.customerId} label={translateContent('vehicleDeliveryNote.customerDetails.label.customerId')} name="customerId">
                                            {soldByDealer ? (
                                                <>
                                                    <Input placeholder={preparePlaceholderText('Customer ID')} disabled={true} />
                                                </>
                                            ) : (
                                                <Search onChange={handleOnChange} onSearch={handleCustomerIdSearch} placeholder={preparePlaceholderText('Customer ID')} allowClear />
                                            )}
                                        </Form.Item>
                                    </Col>
                                    {showFields && (
                                        <>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item label={translateContent('vehicleDeliveryNote.customerDetails.label.customerType')} name="customerType">
                                                    <Input placeholder={preparePlaceholderText(translateContent('vehicleDeliveryNote.customerDetails.label.customerType'))} disabled={true} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item initialValue={formData?.customerName} label={translateContent('vehicleDeliveryNote.customerDetails.label.customerName')} name="customerName">
                                                    <Input placeholder={preparePlaceholderText(translateContent('vehicleDeliveryNote.customerDetails.label.customerName'))} disabled={true} />
                                                </Form.Item>
                                            </Col>

                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item initialValue={formData?.mobile} label={translateContent('vehicleDeliveryNote.customerDetails.label.customerPhoneNumber')} name="customerPhoneNumber">
                                                    <Input placeholder={preparePlaceholderText(translateContent('vehicleDeliveryNote.customerDetails.label.customerPhoneNumber'))} disabled={true} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item initialValue={formData?.address} label={translateContent('vehicleDeliveryNote.customerDetails.label.customerAddress')} name="customerAddress">
                                                    <Input placeholder={preparePlaceholderText(translateContent('vehicleDeliveryNote.customerDetails.label.customerAddress'))} disabled={true} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item label={translateContent('vehicleDeliveryNote.customerDetails.label.customerCity')} name="customerCity">
                                                    <Input placeholder={preparePlaceholderText(translateContent('vehicleDeliveryNote.customerDetails.label.customerCity'))} disabled={true} />
                                                </Form.Item>
                                            </Col>

                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item label={translateContent('vehicleDeliveryNote.customerDetails.label.district')} name="district">
                                                    <Input placeholder={preparePlaceholderText(translateContent('vehicleDeliveryNote.customerDetails.label.district'))} disabled={true} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item label={translateContent('vehicleDeliveryNote.customerDetails.label.state')} name="state">
                                                    <Input placeholder={preparePlaceholderText(translateContent('vehicleDeliveryNote.customerDetails.label.state'))} disabled={true} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item label={translateContent('vehicleDeliveryNote.customerDetails.label.customerId')} name="pinCode">
                                                    <Input placeholder={preparePlaceholderText(translateContent('vehicleDeliveryNote.customerDetails.label.customerId'))} disabled={true} />
                                                </Form.Item>
                                            </Col>

                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item label={translateContent('vehicleDeliveryNote.customerDetails.label.email')} name="email">
                                                    <Input placeholder={preparePlaceholderText(translateContent('vehicleDeliveryNote.customerDetails.label.email'))} disabled={true} />
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
