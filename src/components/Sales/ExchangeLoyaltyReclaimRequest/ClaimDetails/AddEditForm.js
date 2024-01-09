/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Input, Form, DatePicker, Checkbox, Space, Card } from 'antd';

import { dateFormat } from 'utils/formatDateTime';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import styles from 'assets/sass/app.module.scss';
import { customSelectBox } from 'utils/customSelectBox';
import { translateContent } from 'utils/translateContent';

const { TextArea } = Input;

const AddEditFormMain = (props) => {
    const { formData, isReadOnly = true } = props;
    const disabledProps = { disabled: true };

    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Space style={{ display: 'flex' }} size="middle" direction="vertical">
                        <Card style={{ backgroundColor: '#f2f2f2' }}>
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="requestType" label={'Request Type'}>
                                        {customSelectBox({ data: [], placeholder: preparePlaceholderText('Request Type') })}
                                        {/* <Input placeholder={preparePlaceholderText('Request Type')} maxLength={50} {...disabledProps} /> */}
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="invoiceId" label={'Invoice Id'}>
                                        <Input placeholder={preparePlaceholderText('Invoice Id')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="registrationNumber" label={'Registration Number'}>
                                        <Input placeholder={preparePlaceholderText('Registration Number')} maxLength={50} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item label={'invoiceDate'} name="InvoiceData" className={styles?.datePicker}>
                                        <DatePicker placeholder={preparePlaceholderSelect('Invoice Date')} format={dateFormat} className={styles.fullWidth} />
                                    </Form.Item>
                                </Col>

                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="chassisNumber" label={'Chassis Number'} initialValue={formData?.chassisNumber}>
                                        <Input placeholder={preparePlaceholderText('Chassis Number')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="vehicleType" label={'Vehicle Type'} initialValue={formData?.vehicleType}>
                                        <Input placeholder={preparePlaceholderText('Vehicle Type')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="customerID" label={'Customer ID'}>
                                        <Input placeholder={preparePlaceholderText('Customer ID')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="customerName" label={'Customer Name'}>
                                        <Input placeholder={preparePlaceholderText('Customer Name')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                    <Form.Item name="reasonForRequest" label={'Reason For Request'}>
                                        <TextArea showCount maxLength={300} placeholder={preparePlaceholderText('Reason For Request' || translateContent('customerMaster.placeholder.remarks'))} />

                                        {/* <Input placeholder={preparePlaceholderText('Reason For Request')} maxLength={50} {...disabledProps} /> */}
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Card>
                    </Space>
                </Col>
            </Row>
        </>
    );
};

export const AddEditForm = AddEditFormMain;
