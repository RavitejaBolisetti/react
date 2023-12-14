/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Row, Col, Input, Form, DatePicker, Card, Space, Collapse, Divider, Switch } from 'antd';

import { dateFormat } from 'utils/formatDateTime';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';
import { customSelectBox } from 'utils/customSelectBox';
import { expandIcon } from 'utils/accordianExpandIcon';

const { Panel } = Collapse;

const AddEditFormMain = (props) => {
    const { formData, onHandleSelect, formActionType } = props;
    const disabledProps = { disabled: true };
    const [openAccordian, setOpenAccordian] = useState(1);

    const handleCollapse = (key) => {
        setOpenAccordian(key);
    };

    return (
        <>
            <Collapse onChange={() => handleCollapse(1)} expandIcon={expandIcon} expandIconPosition="end" collapsible="icon" activeKey={openAccordian}>
                <Panel header={'Claim Detail' || translateContent('applicationMaster.text.applicationActions')} key="1">
                    <Divider />
                    <Row gutter={20}>
                      
                        <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
                            <Form.Item name="mnmInvoice No" label={'M&M Invoice No'} initialValue={formData?.invoiceNo}  >
                                <Input placeholder={preparePlaceholderText('M&M Invoice No')} maxLength={50} disabled={!formActionType?.addMode} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="mnmInvoiceDate" label={'M&M Invoice Date'} initialValue={formData?.financierName}>
                                <DatePicker placeholder={preparePlaceholderSelect('M&M Invoice Date')} format={dateFormat} className={styles.fullWidth} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name='Chessis No' label={'Chessis No'} initialValue={formData?.financierName}>
                                <Input placeholder={preparePlaceholderText('Chessis No')} maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="month" label={'Dealer Claim Amount'} initialValue={formData?.invoiceNo}>
                                <Input placeholder={preparePlaceholderText('Dealer Claim Amount')} maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="month" label={'Approved Claim Amount'} initialValue={formData?.invoiceNo}>
                                <Input placeholder={preparePlaceholderText('Approved Claim Amount')} maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="month" label={'GST %'} initialValue={formData?.invoiceNo}>
                                <Input placeholder={preparePlaceholderText('GST %')} maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="month" label={'GST Amount'} initialValue={formData?.invoiceNo}>
                                <Input placeholder={preparePlaceholderText('GST Amount')} maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="month" label={'Total Claim Amount'} initialValue={formData?.invoiceNo}>
                                <Input placeholder={preparePlaceholderText('Total Claim Amount')} maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="month" label={'Credit Note No'} initialValue={formData?.invoiceNo}>
                                <Input placeholder={preparePlaceholderText('Credit Note No')} maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="month" label={'Credit Note Date'} initialValue={formData?.invoiceNo}>
                                <DatePicker placeholder={preparePlaceholderSelect('Credit Note Date')} format={dateFormat} className={styles.fullWidth} {...disabledProps} />
                            </Form.Item>
                        </Col> 
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="month" label={'Credit Note Amount'} initialValue={formData?.invoiceNo}>
                                <Input placeholder={preparePlaceholderText('Credit Note Amount')} maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="month" label={'TDS Amount'} initialValue={formData?.invoiceNo}>
                                <Input placeholder={preparePlaceholderText('Credit Note Amount')} maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="month" label={'Debit Note No'} initialValue={formData?.invoiceNo}>
                                <Input placeholder={preparePlaceholderText('Debit Note No')} maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="month" label={'Debit Note Date'} initialValue={formData?.invoiceNo}>
                                <DatePicker placeholder={preparePlaceholderSelect('Debit Note Date')} format={dateFormat} className={styles.fullWidth} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="month" label={'Debit Note Amount'} initialValue={formData?.invoiceNo}>
                                <Input placeholder={preparePlaceholderText('Debit Note Amount')} maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="month" label={'IRN Number'} initialValue={formData?.invoiceNo}>
                                <Input placeholder={preparePlaceholderText('IRN Number')} maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>{' '}
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="month" label={'IRN Status'} initialValue={formData?.invoiceNo}>
                                <Input placeholder={preparePlaceholderText('IRN Status')} maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>{' '}
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="month" label={'IRN Desc'} initialValue={formData?.invoiceNo}>
                                <Input placeholder={preparePlaceholderText('IRN Desc')} maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>
                    </Row>
                </Panel>
            </Collapse>
        </>
    );
};

export const AddEditForm = AddEditFormMain;
