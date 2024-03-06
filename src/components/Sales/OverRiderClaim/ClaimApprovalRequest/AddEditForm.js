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
import { translateContent } from 'utils/translateContent';

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
                                    <Form.Item name="invoiceNo" label={translateContent('overRiderClaim.label.invoiceNumber')} initialValue={formData?.invoiceNo}>
                                        <Input placeholder={preparePlaceholderText(translateContent('overRiderClaim.placeholder.invoiceNumber'))} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item initialValue={formData?.invoiceDate} label={translateContent('overRiderClaim.label.invoiceDate')} name="invoiceDate" className={styles?.datePicker}>
                                        <DatePicker placeholder={preparePlaceholderSelect(translateContent('overRiderClaim.placeholder.invoiceDate'))} format={dateFormat} className={styles.fullWidth} {...disabledProps} />
                                    </Form.Item>
                                </Col>

                                <Divider />

                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="customerName" label={translateContent('overRiderClaim.label.customerName')}>
                                        <Input placeholder={preparePlaceholderText(translateContent('overRiderClaim.placeholder.customerName'))} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="customerCategory" label={translateContent('overRiderClaim.label.customerCategory')}>
                                        <Input placeholder={preparePlaceholderText(translateContent('overRiderClaim.placeholder.customerCategory'))} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="chassisNumber" label={translateContent('overRiderClaim.label.chassisNumber')} initialValue={formData?.chassisNumber}>
                                        <Input placeholder={preparePlaceholderText(translateContent('overRiderClaim.placeholder.chassisNumber'))} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>

                                {/* <Divider /> */}

                                {/* <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="claimNumber" label={translateContent('overRiderClaim.label.claimNumber')}>
                                <Input placeholder={preparePlaceholderText(translateContent('overRiderClaim.placeholder.claimNumber'))} maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="claimType" label={translateContent('overRiderClaim.label.claimType')}>
                                <Input placeholder={preparePlaceholderText(translateContent('overRiderClaim.placeholder.claimType'))} maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item label={translateContent('overRiderClaim.label.claimDate')} name="claimDate" className={styles?.oemShareAmount}>
                                <DatePicker placeholder={preparePlaceholderSelect(translateContent('overRiderClaim.placeholder.claimDate'))} format={dateFormat} className={styles.fullWidth} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="claimStatus" label={translateContent('overRiderClaim.label.claimStatus')}>
                                <Input placeholder={preparePlaceholderText(translateContent('overRiderClaim.placeholder.claimStatus'))} maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col> */}

                                <Divider />

                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item label={translateContent('overRiderClaim.label.insCoverNoteNo')} name="insCoverNoteNo" className={styles?.datePicker}>
                                        <Input placeholder={preparePlaceholderText(translateContent('overRiderClaim.placeholder.insCoverNoteNo'))} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>

                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item label={translateContent('overRiderClaim.label.insCoverNoteDate')} name="insCoverNoteDate" className={styles?.datePicker}>
                                        <DatePicker placeholder={preparePlaceholderSelect(translateContent('overRiderClaim.placeholder.insCoverNoteDate'))} format={dateFormat} className={styles.fullWidth} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="insPremiumValue" label={translateContent('overRiderClaim.label.insPremiumValue')} initialValue={formData?.insPremiumValue}>
                                        <Input placeholder={preparePlaceholderText(translateContent('overRiderClaim.placeholder.insPremiumValue'))} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="insCompanyName" label={translateContent('overRiderClaim.label.insuranceCompanyName')} initialValue={formData?.insCompanyName}>
                                        <Input placeholder={preparePlaceholderText(translateContent('overRiderClaim.placeholder.insuranceCompanyName'))} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>

                                <Divider />

                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="financierName" label={translateContent('overRiderClaim.label.financierName')} initialValue={formData?.financierName}>
                                        <Input placeholder={preparePlaceholderText(translateContent('overRiderClaim.placeholder.financierName'))} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>

                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="dealerShareAmount" label={translateContent('overRiderClaim.label.dealerShareAmount')} initialValue={formData?.financierName}>
                                        <Input placeholder={preparePlaceholderText(translateContent('overRiderClaim.placeholder.dealerShareAmount'))} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="oemShareAmount" label={translateContent('overRiderClaim.label.oemShareAmount')} initialValue={formData?.financierName}>
                                        <Input placeholder={preparePlaceholderText(translateContent('overRiderClaim.placeholder.oemShareAmount'))} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="mnmClaimNo" label={translateContent('overRiderClaim.label.mandmClaimNo')} initialValue={formData?.financierName}>
                                        <Input placeholder={preparePlaceholderText(translateContent('overRiderClaim.placeholder.mandmClaimNo'))} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>

                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="mnmClaimDate" label={translateContent('overRiderClaim.label.mandmClaimDate')} initialValue={formData?.financierName}>
                                        <Input placeholder={preparePlaceholderText(translateContent('overRiderClaim.placeholder.mandmClaimDate'))} maxLength={50} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                    <Form.Item name="remarks" label={translateContent('overRiderClaim.label.remarks')} initialValue={formData?.financierName}>
                                        <Input placeholder={preparePlaceholderText(translateContent('overRiderClaim.placeholder.remarks'))} maxLength={50} {...disabledProps} />
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
