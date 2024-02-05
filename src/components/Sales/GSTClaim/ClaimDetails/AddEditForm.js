/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Input, Form, DatePicker, Card } from 'antd';

import { dateFormat } from 'utils/formatDateTime';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

const { TextArea, Search } = Input;

const AddEditFormMain = (props) => {
    const { formData } = props;
    const disabledProps = { disabled: true };

    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Card>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                <Form.Item name="claimType" label={'Claim Type'} initialValue={formData?.claimType}>
                                    <Input placeholder={preparePlaceholderText('Claim Type')} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                <Form.Item name="retailInvoiceNumber" label={'Retail Invoice Number'}>
                                    <Input placeholder={preparePlaceholderText('Retail Invoice Number')} {...disabledProps} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                <Form.Item label={'Retail Invoice Date'} name="retailInvoiceDate" className={styles?.retailInvoiceDate}>
                                    <DatePicker placeholder={preparePlaceholderSelect('Retail Invoice Date')} format={dateFormat} className={styles.fullWidth} {...disabledProps} />
                                </Form.Item>
                            </Col>

                            <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                <Form.Item name="chassisNumber" label={'Chassis Number'} initialValue={formData?.chassisNumber}>
                                    <Input placeholder={preparePlaceholderText('Chassis Number')} {...disabledProps} />
                                </Form.Item>
                            </Col>

                            <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                <Form.Item name="approvedAmount" label={'Approved Amount'}>
                                    <Input placeholder={preparePlaceholderText('Approved Amount')} {...disabledProps} />
                                </Form.Item>
                            </Col>

                            <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                <Form.Item name="approvedAmount" label={'IGST/CGST/SGST Rate'}>
                                    <Input placeholder={preparePlaceholderText('IGST/CGST/SGST Rate')} {...disabledProps} />
                                </Form.Item>
                            </Col>

                            <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                <Form.Item name="approvedAmount" label={'IGST/CGST/SGST Amount'}>
                                    <Input placeholder={preparePlaceholderText('IGST/CGST/SGST Amount')} {...disabledProps} />
                                </Form.Item>
                            </Col>

                            <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                <Form.Item name="approvedAmount" label={'Claim Status'}>
                                    <Input placeholder={preparePlaceholderText('Claim Status')} {...disabledProps} />
                                </Form.Item>
                            </Col>

                            <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                                <Form.Item label={'Remarks'} name="insCoverNoteNo" className={styles?.datePicker}>
                                    <Input placeholder={preparePlaceholderText('Remarks')} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                <Form.Item label={translateContent('customerMaster.label.remark')} name="remarks">
                                    <TextArea maxLength={300} placeholder={preparePlaceholderText(translateContent('customerMaster.placeholder.remark'))}  showCount />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export const AddEditForm = AddEditFormMain;
