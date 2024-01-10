/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Input, Form, DatePicker, Space,Card } from 'antd';

import { dateFormat } from 'utils/formatDateTime';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import styles from 'assets/sass/app.module.scss';

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
                                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item name="creditNoteNumber" label={'Credit Note Number'}>
                                        <Input placeholder={preparePlaceholderText('Credit Note Number')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item name="creditNoteDate" label={'Credit Note Date'}>
                                        <Input placeholder={preparePlaceholderText('Credit Note Date')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item name="creditNoteAmount" label={'Credit Note Amount'}>
                                        <Input placeholder={preparePlaceholderText('Credit Note Amount')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>

                                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item name="debitNoteNumber" label={'Debit Note Number'}>
                                        <Input placeholder={preparePlaceholderText('Debit Note Number')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item name="debitNoteDate" label={'Debit Note Date'}>
                                        <Input placeholder={preparePlaceholderText('Debit Note Date')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item name="debitNoteAmount" label={'Debit Note Amount'}>
                                        <Input placeholder={preparePlaceholderText('Debit Note Amount')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>

                                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item name="reCreditNoteNumber" label={'Re Credit Note Number'}>
                                        <Input placeholder={preparePlaceholderText('Re Credit Note Number')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item name="reCreditNoteDate" label={'Re Credit Note Date'}>
                                        <DatePicker placeholder={preparePlaceholderSelect('Re Credit Note Date')} format={dateFormat} className={styles.fullWidth} {...disabledProps} />
                                        {/* <Input placeholder={preparePlaceholderText('Re Credit Note Date')} maxLength={50} {...disabledProps} /> */}
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item name="reCreditNoteAmount" label={'Re Credit Note Amount'}>
                                        <Input placeholder={preparePlaceholderText('Re Credit Note Amount')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>

                                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item name="reDebitNoteNumber" label={'Re Debit Note Number'}>
                                        <Input placeholder={preparePlaceholderText('Re Debit Note Number')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item name="reDebitNoteDate" label={'Re Debit Note Date'}>
                                        <DatePicker placeholder={preparePlaceholderSelect('Re Debit Note Date')} format={dateFormat} className={styles.fullWidth} {...disabledProps} />

                                        {/* <Input placeholder={preparePlaceholderText('Re Debit Note Date')} maxLength={50} {...disabledProps} /> */}
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item name="reDebitNoteAmount" label={'Re Debit Note Amount'}>
                                        <Input placeholder={preparePlaceholderText('Re Debit Note Amount')} maxLength={50} {...disabledProps} />
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
