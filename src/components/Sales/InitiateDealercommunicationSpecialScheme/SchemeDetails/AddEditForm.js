/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Row, Col, Input, Form, DatePicker, Card, Space, Collapse, Divider, Switch } from 'antd';

import { dateFormat } from 'utils/formatDateTime';
import { prepareDatePickerText, preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';
import { customSelectBox } from 'utils/customSelectBox';
import { expandIcon } from 'utils/accordianExpandIcon';
import { validateRequiredInputField } from 'utils/validation';

const { Panel } = Collapse;
const { TextArea } = Input;

const AddEditFormMain = (props) => {
    const { formData, onHandleSelect } = props;
    const { isReadOnly = true } = props;
    const disabledProps = { disabled: isReadOnly };

    return (
        <>
            <Card>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Space style={{ display: 'flex' }} size="middle" direction="vertical">
                            <Row gutter={20}>
                                {
                                    <>
                                    {/*this field will enable when  !AO user || !SAP Indicator  */}
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                            <Form.Item label={'Applicable Dealer'} name="applicabledealer">
                                                {customSelectBox({ data: [], placeholder: preparePlaceholderSelect('Applicable Dealer' || translateContent('customerMaster.placeholder.corporateName')), onChange: onHandleSelect })}
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                            <Form.Item name="dealerName" label={'Dealer Name'}>
                                                <Input placeholder={preparePlaceholderText('Dealer Name')} {...disabledProps} />
                                            </Form.Item>
                                        </Col>
                                    </>
                                }
                                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item name="ao" label={'AO'}>
                                        <Input placeholder={preparePlaceholderText('AO')} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item name="SchemeDescription" label={'Scheme description'}>
                                        <Input placeholder={preparePlaceholderText('Scheme description')} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label={'Valid From Date'} name="validFromDate" className={styles?.datePicker}>
                                        <DatePicker format={dateFormat} disabled={isReadOnly} placeholder={prepareDatePickerText(dateFormat)}  {...disabledProps}/>
                                        {/* {customSelectBox({ data: [], placeholder: preparePlaceholderSelect('Valid From Date' || translateContent('customerMaster.placeholder.corporateName')), onChange: onHandleSelect })} */}
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label={'Valid To Date'} name="validToDate" className={styles?.datePicker}>
                                        <DatePicker format={dateFormat} disabled={isReadOnly} placeholder={prepareDatePickerText(dateFormat)}  {...disabledProps} />
                                        {/* {customSelectBox({ data: [], placeholder: preparePlaceholderSelect('Valid To Date' || translateContent('customerMaster.placeholder.corporateName')), onChange: onHandleSelect })} */}
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item name="dealerCode" label={'Dealer Code'}>
                                        <Input placeholder={preparePlaceholderText('Dealer Code')} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label={'Target/Non Target/MST Target'} name="TargetNonTargetMStTarget">
                                        {customSelectBox({ data: [], placeholder: preparePlaceholderSelect('Target/Non Target/MST Target' || translateContent('customerMaster.placeholder.corporateName')), onChange: onHandleSelect,  ...disabledProps })}
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label={'Based On'} name="basedOn">
                                        {customSelectBox({ data: [], placeholder: preparePlaceholderSelect('Based On   ' || translateContent('customerMaster.placeholder.corporateName')), ...disabledProps })}
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label={'Slab Type'} name="slabType">
                                        {customSelectBox({ data: [], placeholder: preparePlaceholderSelect('Slab Type' || translateContent('customerMaster.placeholder.corporateName')),  ...disabledProps })}
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item name="slabFrom" label={'Slab From'}>
                                        <Input placeholder={preparePlaceholderText('Slab From')} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item name="slabTo" label={'Slab To'}>
                                        <Input placeholder={preparePlaceholderText('Slab To')} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label={'Segment'} name="segment">
                                        {customSelectBox({ data: [], placeholder: preparePlaceholderSelect('Segment' || translateContent('customerMaster.placeholder.corporateName')),  ...disabledProps })}
                                    </Form.Item>
                                </Col>

                                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label={'Model group'} name="modelgroup">
                                        {customSelectBox({ data: [], placeholder: preparePlaceholderSelect('Model group' || translateContent('customerMaster.placeholder.corporateName')),  ...disabledProps })}
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label={'Varient'} name="varient">
                                        {customSelectBox({ data: [], placeholder: preparePlaceholderSelect('Varient' || translateContent('customerMaster.placeholder.corporateName')),  ...disabledProps })}
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label={'Chassis No'} name="chassisNo">
                                        {customSelectBox({ data: [], placeholder: preparePlaceholderSelect('Chassis No' || translateContent('customerMaster.placeholder.corporateName')),  ...disabledProps })}
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label={'Volume Qty'} name="volumeQty">
                                        {customSelectBox({ data: [], placeholder: preparePlaceholderSelect('Volume Qty' || translateContent('customerMaster.placeholder.corporateName')),  ...disabledProps })}
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item name="amountVehicle" label={'Amount Vehicle'}>
                                        <Input placeholder={preparePlaceholderText('Amount Vehicle')} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item name="totalAmount" label={'Total Amount'}>
                                        <Input placeholder={preparePlaceholderText('Total Amount')} {...disabledProps} />
                                    </Form.Item>
                                </Col>

                                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label={'Claim From Date'} name="claimFromDate" className={styles?.datePicker}>
                                        <DatePicker format={dateFormat} disabled={isReadOnly} placeholder={prepareDatePickerText(dateFormat)}  {...disabledProps}/>
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label={'Claim To Date'} name="claimToDate" className={styles?.datePicker}>
                                        <DatePicker format={dateFormat} disabled={isReadOnly} placeholder={prepareDatePickerText(dateFormat)}  {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label={'Calculation From Date'} name="CalculationFromDate" className={styles?.datePicker}>
                                        <DatePicker format={dateFormat} disabled={isReadOnly} placeholder={prepareDatePickerText(dateFormat)}  {...disabledProps}/>
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label={'Calculation To Date'} name="calculationToDate" className={styles?.datePicker}>
                                        <DatePicker format={dateFormat} disabled={isReadOnly} placeholder={prepareDatePickerText(dateFormat)}  {...disabledProps}/>
                                    </Form.Item>
                                </Col>

                                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item name="payoutIndicator" label={'Payout Indicator'}>
                                        <Input placeholder={preparePlaceholderText('Payout Indicator')} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item name="payoutslabFrom" label={'Payout Slab From'}>
                                        <Input placeholder={preparePlaceholderText('Payout Slab  From')} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item name="payoutSlabTo" label={'Payout Slab To'}>
                                        <Input placeholder={preparePlaceholderText('Payout Slab  To')} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item name="mdepApplicablity" label={'MDEP Applicablity'}>
                                        <Input placeholder={preparePlaceholderText('MDEP Applicablity')} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.textareaError}>
                                    <Form.Item initialValue={formData?.address} label={'Remarks' || translateContent('dealerCompany.label.companyAddress')} name="remarks" rules={[validateRequiredInputField('Remarks')]}>
                                        <TextArea placeholder={translateContent('Remarks')} showCount />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Space>
                    </Col>
                </Row>
            </Card>
        </>
    );
};

export const AddEditForm = AddEditFormMain;
