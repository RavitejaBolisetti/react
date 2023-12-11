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
    const { formData, onHandleSelect } = props;
    const { isReadOnly = true } = props;
    const disabledProps = { disabled: isReadOnly };
    const [openAccordian, setOpenAccordian] = useState(1);

    const financialYrData = [
        {
            key: '2',
            value: '2023 - 2024',
        },
        {
            key: '3',
            value: '2022 - 2023',
        },
    ];
    const requesterData = [
        {
            key: '2',
            value: 'Token 1',
        },
        {
            key: '3',
            value: 'Token 2',
        },
    ];
    const month = [
        { key: 'Jan', value: 'Jan' },
        { key: 'Feb', value: 'Feb' },
        { key: 'Mar', Mar: 'Mar' },
        { key: 'Apr', value: 'Apr' },
        { key: 'May', value: 'Apr' },
        { key: 'Jun', value: 'Jun' },
        { key: 'Jul', value: 'Jul' },
        { key: 'Aug', value: 'Aug' },
        { key: 'Sep', value: 'Sep' },
        { key: 'Oct', value: 'Oct' },
        { key: 'Nov', value: 'Nov' },
        { key: 'Dec', value: 'Dec' },
    ];

    const handleCollapse = (key) => {
        setOpenAccordian(key);
    };

    return (
        <>
            <Collapse onChange={() => handleCollapse(1)} expandIcon={expandIcon} expandIconPosition="end" collapsible="icon" activeKey={openAccordian}>
                <Panel header={'Claim Detail' || translateContent('applicationMaster.text.applicationActions')} key="1">
                    <Divider />
                    <Row gutter={20}>
                        {/* <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}> */}
                        {/* <DatePicker placeholder={preparePlaceholderSelect('Financial Year')} format={dateFormat} picker="year" className={styles.fullWidth} {...disabledProps} /> */}
                        {/* <Form.Item name="financialYear" label={'Financial Year'} initialValue={formData?.invoiceNo}>
                                {customSelectBox({ data: financialYrData, placeholder: preparePlaceholderSelect('Financial Year' || translateContent('customerMaster.placeholder.corporateName')), onChange: onHandleSelect })}
                            </Form.Item> */}
                        {/* </Col> */}
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="insPremiumValue" label={'Claim No'} initialValue={formData?.insPremiumValue} disabled={true}>
                                <Input placeholder={preparePlaceholderText('Claim No')} maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="insCompanyName" label={'Claim Date'} initialValue={formData?.insCompanyName}>
                                <DatePicker placeholder={preparePlaceholderSelect('Claim Date')} format={dateFormat} className={styles.fullWidth} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="financierName" label={'Claim Status'} initialValue={formData?.financierName}>
                                <Input placeholder={'Claim Status' || preparePlaceholderText('Recognition Amount')} maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        {/* <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
                            <Form.Item name="dealerBranch" label={'Dealer Branch'} initialValue={formData?.invoiceNo}>
                                {customSelectBox({ data: requesterData, placeholder: preparePlaceholderSelect('Dealer Branchx' || translateContent('customerMaster.placeholder.corporateName')), onChange: onHandleSelect })}
                            </Form.Item>
                        </Col> */}
                        <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
                            <Form.Item name="month" label={'M&M Invoice No'} initialValue={formData?.invoiceNo}>
                                <Input placeholder={preparePlaceholderText('M&M Invoice No')} maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="dealerShareAmount" label={'M&M Invoice Date'} initialValue={formData?.financierName}>
                                <DatePicker placeholder={preparePlaceholderSelect('M&M Invoice Date')} format={dateFormat} className={styles.fullWidth} {...disabledProps} />
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
