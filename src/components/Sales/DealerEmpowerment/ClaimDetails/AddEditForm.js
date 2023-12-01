/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Input, Form, DatePicker, Divider, Card, Space } from 'antd';

import { dateFormat } from 'utils/formatDateTime';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import styles from 'assets/sass/app.module.scss';

const AddEditFormMain = (props) => {
    const { formData } = props;
    const { isReadOnly = true } = props;
    const disabledProps = { disabled: isReadOnly };

    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Space style={{ display: 'flex' }} size="middle" direction="vertical">
                        <Card style={{ backgroundColor: '#f2f2f2' }}>
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="invoiceNo" label={'Emp Request ID'} initialValue={formData?.invoiceNo}>
                                        <Input placeholder={preparePlaceholderText('Emp Request ID')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item initialValue={formData?.invoiceDate} label={'Request Date'} name="invoiceDate" className={styles?.datePicker}>
                                        <DatePicker placeholder={preparePlaceholderSelect('Request Date')} format={dateFormat} className={styles.fullWidth} {...disabledProps} />
                                    </Form.Item>
                                </Col>

                                <Divider />

                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="customerName" label={'Request Status'}>
                                        <Input placeholder={preparePlaceholderText('Request Status')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="customerCategory" label={'Reason for Delay'}>
                                        <Input placeholder={preparePlaceholderText('Reason for Delay')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="chassisNumber" label={'Invoice ID'} initialValue={formData?.chassisNumber}>
                                        <Input placeholder={preparePlaceholderText('Invoice ID')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>

                                <Divider />

                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item label={'Invoice Date'} name="insCoverNoteNo" className={styles?.datePicker}>
                                        <Input placeholder={preparePlaceholderText('Invoice Date')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>

                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item label={'Invoice Status'} name="insCoverNoteDate" className={styles?.datePicker}>
                                        <DatePicker placeholder={preparePlaceholderSelect('Invoice Status')} format={dateFormat} className={styles.fullWidth} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="insPremiumValue" label={'Segment'} initialValue={formData?.insPremiumValue}>
                                        <Input placeholder={preparePlaceholderText('Segment')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="insCompanyName" label={'Model Description'} initialValue={formData?.insCompanyName}>
                                        <Input placeholder={preparePlaceholderText('Model Description')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>

                                <Divider />

                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="financierName" label={'Chassis No'} initialValue={formData?.financierName}>
                                        <Input placeholder={preparePlaceholderText('Chassis No')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                            
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="dealerShareAmount" label={'Customer Name'} initialValue={formData?.financierName}>
                                        <Input placeholder={preparePlaceholderText('Customer Name')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="oemShareAmount" label={'Requested Amount'} initialValue={formData?.financierName}>
                                        <Input placeholder={preparePlaceholderText('Requested Amount')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>

                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="mnmClaimDate" label={'Dealer remarks'} initialValue={formData?.financierName}>
                                        <Input placeholder={preparePlaceholderText('Dealer remarks')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="remarks" label={'VDN Date'} initialValue={formData?.financierName}>
                                        <Input placeholder={preparePlaceholderText('VDN Date')} maxLength={50} {...disabledProps} />
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
