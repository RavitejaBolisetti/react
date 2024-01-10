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
    const disabledProps = { disabled: true };
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

    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Space style={{ display: 'flex' }} size="middle" direction="vertical">
                        <Card style={{ backgroundColor: '#f2f2f2' }}>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
                                <Form.Item name="chassisNo" label={'Chassis No'} initialValue={formData?.invoiceNo}>
                                    {customSelectBox({ data: [], placeholder: preparePlaceholderSelect('Chassis No' || translateContent('customerMaster.placeholder.corporateName')), onChange: onHandleSelect })}
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
                                <Form.Item name="invoiceNo" label={'Invoice No'} initialValue={formData?.invoiceNo}>
                                    {customSelectBox({ data: requesterData, placeholder: preparePlaceholderSelect('Invoice No' || translateContent('customerMaster.placeholder.corporateName')), onChange: onHandleSelect })}
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
                                <Form.Item name="invoiceDate" label={'Invoice Date'} initialValue={formData?.invoiceNo}>
                                    <DatePicker placeholder={preparePlaceholderSelect('Invoice Date')} format={dateFormat} picker="year" className={styles.fullWidth} {...disabledProps} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                <Form.Item name="corporateType" label={'Corporate Type'} initialValue={formData?.insPremiumValue} disabled={true}>
                                    <Input placeholder={preparePlaceholderText('Corporate Type')} maxLength={50} {...disabledProps} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                <Form.Item name="customerId" label={'Customer Id'} initialValue={formData?.insCompanyName}>
                                    <Input placeholder={preparePlaceholderText('Customer Id')} maxLength={50} {...disabledProps} />
                                </Form.Item>
                            </Col>

                            <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                <Form.Item name="customerType" label={'Customer Type'} initialValue={formData?.customerType}>
                                    <Input placeholder={preparePlaceholderText('Customer Type')} maxLength={50} {...disabledProps} />
                                </Form.Item>
                            </Col>

                            <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                <Form.Item name="customerName" label={'Customer Name'} initialValue={formData?.financierName}>
                                    <Input placeholder={preparePlaceholderText('Customer Name')} maxLength={50} {...disabledProps} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                <Form.Item name="evaluationId" label={'Evaluation Id'} initialValue={formData?.financierName}>
                                    <Input placeholder={preparePlaceholderText('Evaluation Id')} maxLength={50} {...disabledProps} />
                                </Form.Item>
                            </Col>
                            {/* <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                <Form.Item name="approverRemark" label={'Approver Remarks'} initialValue={formData?.financierName}>
                                    <Input placeholder={preparePlaceholderText('Approver Remarks')} maxLength={50} {...disabledProps} />
                                </Form.Item>
                            </Col> */}
                        </Row>
                        <Row gutter={20}>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="dealerShareAmount" label={'Dealer Share Amount'} initialValue={formData?.insPremiumValue} disabled={true}>
                                        <Input placeholder={preparePlaceholderText('Dealer Share Amount')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="oemShareAmount" label={'OEM Share Amount'} initialValue={formData?.insPremiumValue} disabled={true}>
                                        <Input placeholder={preparePlaceholderText('OEM Share Amount')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="totalAmount" label={'Total Amount'} initialValue={formData?.insPremiumValue} disabled={true}>
                                        <Input placeholder={preparePlaceholderText('Total Amount')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="approvedDealerAmount" label={'Approved Dealer Amount'} initialValue={formData?.insPremiumValue} disabled={true}>
                                        <Input placeholder={preparePlaceholderText('Approved Dealer Amount')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="approvedTotalAmount" label={'Approved Total Amount'} initialValue={formData?.insPremiumValue} disabled={true}>
                                        <Input placeholder={preparePlaceholderText('Approved Total Amount')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>

                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="MnMclaimNumber" label={'M&M claim Number'} initialValue={formData?.insPremiumValue} disabled={true}>
                                        <Input placeholder={preparePlaceholderText('M&M claim Number')} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6}>
                                    <Form.Item name="MnMClaimDate" label={'M&M claim Date'} initialValue={formData?.insPremiumValue} disabled={true}>
                                        <DatePicker placeholder={preparePlaceholderSelect('M&M claim Date')} format={dateFormat} picker="year" className={styles.fullWidth} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="Remark" label={'remarks'} initialValue={formData?.financierName}>
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
