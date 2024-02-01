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

const { Panel } = Collapse;

const AddEditFormMain = (props) => {
    const { formData, editMode } = props;
    const { isReadOnly = true } = props;
    const disabledProps = { disabled: isReadOnly };

    return (
        <>
            {/* <Card> */}
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Space style={{ display: 'flex' }} size="middle" direction="vertical">
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item name="amountVehicle" label={'Amount/Vehicle'}>
                                        <Input placeholder={preparePlaceholderText('Amount Vehicle')} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label={'Calculation From Date'} name="CalculationFromDate" className={styles?.datePicker}>
                                        <DatePicker format={dateFormat} disabled={isReadOnly} placeholder={prepareDatePickerText(dateFormat)} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label={'Calculation To Date'} name="calculationToDate" className={styles?.datePicker}>
                                        <DatePicker format={dateFormat} disabled={isReadOnly} placeholder={prepareDatePickerText(dateFormat)} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item name="chassis" label={'Chassis '}>
                                        <Input placeholder={preparePlaceholderText('Chassis ')} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label={'Claim From Date'} name="claimFromDate" className={styles?.datePicker}>
                                        <DatePicker format={dateFormat} disabled={isReadOnly} placeholder={prepareDatePickerText(dateFormat)} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label={'Claim To Date'} name="claimToDate" className={styles?.datePicker}>
                                        <DatePicker format={dateFormat} disabled={isReadOnly} placeholder={prepareDatePickerText(dateFormat)} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item name="dealerCode" label={'Dealer Code'}>
                                        <Input placeholder={preparePlaceholderText('Dealer Code')} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item initialValue={formData?.schemeType} label={'Exclude Models'} name="excludeModels" className={styles?.datePicker}>
                                        {customSelectBox({ data: [], placeholder: preparePlaceholderSelect('Exclude Models' || translateContent('customerMaster.placeholder.corporateName')) })}
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label={'Group List'} name="groupList">
                                        {customSelectBox({ data: [], placeholder: preparePlaceholderSelect('Group List' || translateContent('customerMaster.placeholder.corporateName')) })}
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label={'Incentive Type'} name="iceentiveType">
                                        {customSelectBox({ data: [], placeholder: preparePlaceholderSelect('Incentive Type' || translateContent('customerMaster.placeholder.corporateName')) })}
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item initialValue={editMode ? formData.status : true} labelAlign="left" valuePropName="checked" name="mdepApplicablity" label={'MDEP Applicablity'}>
                                        <Switch checkedChildren={translateContent('global.label.yes')} unCheckedChildren={translateContent('global.label.no')} />
                                    </Form.Item>
                                </Col>

                                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label={'Model Group'} name="modelgroup">
                                        {customSelectBox({ data: [], placeholder: preparePlaceholderSelect('Model Group' || translateContent('customerMaster.placeholder.corporateName')) })}
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item initialValue={editMode ? formData.status : true} labelAlign="left" valuePropName="checked" name="payoutIndicator" label={'Payout Indicator'}>
                                        <Switch checkedChildren={translateContent('global.label.yes')} unCheckedChildren={translateContent('global.label.no')} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item name="payoutSlabFrom" label={'Payout Slab from'}>
                                        <Input placeholder={preparePlaceholderText('Payout Slab from')} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item name="payoutSlabTo" label={'Slab To'}>
                                        <Input placeholder={preparePlaceholderText('Slab To')} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item name="remarks" label={'Remarks'}>
                                        <Input placeholder={preparePlaceholderText('Remarks')} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item name="slabFrom" label={'Slab from'}>
                                        <Input placeholder={preparePlaceholderText('Slab from')} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item name="slabTo" label={'Slab To'}>
                                        <Input placeholder={preparePlaceholderText('Slab To')} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item name="slabType" label={'Slab Type'}>
                                        {customSelectBox({ data: [], placeholder: preparePlaceholderSelect('Slab Type' || translateContent('customerMaster.placeholder.corporateName')) })}
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item initialValue={editMode ? formData.status : true} labelAlign="left" valuePropName="checked" name="status" label={translateContent('global.label.status')}>
                                        <Switch checkedChildren={translateContent('global.label.active')} unCheckedChildren={translateContent('global.label.inActive')} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label={'Scheme TGT/Non TGT/Must do TGT'} name="SchemeTGT/NonTGT/MustdoTGT">
                                        {customSelectBox({ data: [], placeholder: preparePlaceholderSelect('Scheme TGT/Non TGT/Must do TGT' || translateContent('customerMaster.placeholder.corporateName')) })}
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item name="totalAmount" label={'Total Amount'}>
                                        <Input placeholder={preparePlaceholderText('Total Amount')} {...disabledProps} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label={'Valid From Date'} name="validFromDate" className={styles?.datePicker}>
                                        <DatePicker format={dateFormat} disabled={isReadOnly} placeholder={prepareDatePickerText(dateFormat)} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label={'Valid To Date'} name="validToDate" className={styles?.datePicker}>
                                        <DatePicker format={dateFormat} disabled={isReadOnly} placeholder={prepareDatePickerText(dateFormat)} />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Space>
                    </Col>
                </Row>
            {/* </Card> */}
        </>
    );
};

export const AddEditForm = AddEditFormMain;
