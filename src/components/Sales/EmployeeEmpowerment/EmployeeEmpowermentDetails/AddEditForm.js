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
                                    <Form.Item name="invoiceNo" label={'Invoice Number'} initialValue={formData?.invoiceNo}>
                                        <Input placeholder={preparePlaceholderText('Invoice Number')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item initialValue={formData?.invoiceDate} label={'Invoice Date'} name="invoiceDate" className={styles?.datePicker}>
                                        <DatePicker placeholder={preparePlaceholderSelect('Invoice Date')} format={dateFormat} className={styles.fullWidth} {...disabledProps} />
                                    </Form.Item>
                                </Col>

                                <Divider />

                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="customerName" label={'Customer Name'}>
                                        <Input placeholder={preparePlaceholderText('Customer Name')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="customerCategory" label={'Customer Category'}>
                                        <Input placeholder={preparePlaceholderText('Customer Category')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="chassisNumber" label={'Chassis Number'} initialValue={formData?.chassisNumber}>
                                        <Input placeholder={preparePlaceholderText('Chassis Number')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>

                                <Divider />

                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item label={'Ins. Cover Note No.'} name="insCoverNoteNo" className={styles?.datePicker}>
                                        <Input placeholder={preparePlaceholderText('Ins. Cover Note No.')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>

                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item label={'Ins. Cover Note Date'} name="insCoverNoteDate" className={styles?.datePicker}>
                                        <DatePicker placeholder={preparePlaceholderSelect('Ins. Cover Note Date')} format={dateFormat} className={styles.fullWidth} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="insPremiumValue" label={'Ins Premium Value'} initialValue={formData?.insPremiumValue}>
                                        <Input placeholder={preparePlaceholderText('Ins Premium Value')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="insCompanyName" label={'Insurance Company Name'} initialValue={formData?.insCompanyName}>
                                        <Input placeholder={preparePlaceholderText('Insurance Company Name')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>

                                <Divider />

                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="financierName" label={'Financier Name'} initialValue={formData?.financierName}>
                                        <Input placeholder={preparePlaceholderText('Financier Name')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                            
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="dealerShareAmount" label={'Dealer Share Amount'} initialValue={formData?.financierName}>
                                        <Input placeholder={preparePlaceholderText('Dealer Share Amount')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="oemShareAmount" label={'OEM Share Amount'} initialValue={formData?.financierName}>
                                        <Input placeholder={preparePlaceholderText('OEM Share Amount')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="mnmClaimNo" label={'M & M Claim No'} initialValue={formData?.financierName}>
                                        <Input placeholder={preparePlaceholderText('M & M Claim No')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>

                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="mnmClaimDate" label={'M & M Claim Date'} initialValue={formData?.financierName}>
                                        <Input placeholder={preparePlaceholderText('M & M Claim Date')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="remarks" label={'Remarks'} initialValue={formData?.financierName}>
                                        <Input placeholder={preparePlaceholderText('Remarks')} maxLength={50} {...disabledProps} />
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
