/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Input, Form, DatePicker, InputNumber, Checkbox } from 'antd';
import { validateRequiredInputField, validateOnlyPositiveNumber, valueBetween0to100 } from 'utils/validation';

import { dateFormat, formattedCalendarDate } from 'utils/formatDateTime';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import { translateContent } from 'utils/translateContent';
import styles from 'assets/sass/app.module.scss';

const AddEditFormMain = (props) => {
    const { buttonData, setButtonData, formData, saveData, isLoading, onFinish } = props;
    const { form, isReadOnly = true, userId, listShowLoading, handleButtonClick, setIsFormVisible, showGlobalNotification } = props;
    const disabledProps = { disabled: isReadOnly };

    return (
        <>
            <Row gutter={20} className={styles.drawerBody}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="clameNo" label={'Claim Number'}>
                                <Input placeholder={preparePlaceholderText('Claim Number')} maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item label={'Claim Date'} name="claimData" className={styles?.datePicker}>
                                <DatePicker placeholder={preparePlaceholderSelect('Claim Date')} format={dateFormat} className={styles.fullWidth} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="claimStatus" label={'Claim Status'}>
                                <Input placeholder={preparePlaceholderText('Claim Status')} maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        {/* <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item label={'Co-Dealer Invoice'} initialValue={false} valuePropName="checked" name="defaultContactIndicator">
                                <Checkbox></Checkbox>
                            </Form.Item>
                        </Col> */}

                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="chassisNumber" label={'Chassis Number'} initialValue={formData?.chassisNumber}>
                                <Input placeholder={preparePlaceholderText('Chassis Number')} maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>
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
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="customerCategory" label={'Customer Category'}>
                                <Input placeholder={preparePlaceholderText('Customer Category')} maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="customerName" label={'Customer Name'}>
                                <Input placeholder={preparePlaceholderText('Customer Name')} maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="insCoverNoteNo" label={'Ins. Cover Note No.'}>
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

                        <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                            <Form.Item name="financierName" label={'Financier Name'} initialValue={formData?.financierName}>
                                <Input placeholder={preparePlaceholderText('Financier Name')} maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <Form.Item label={''} initialValue={false} valuePropName="checked" name="defaultContactIndicator">
                                <Checkbox>Co-Dealer Invoice</Checkbox>
                            </Form.Item>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
};

export const AddEditForm = AddEditFormMain;
