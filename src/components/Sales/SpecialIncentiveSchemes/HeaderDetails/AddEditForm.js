/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Row, Col, Input, Form, DatePicker, Card, Space, Collapse, Divider, Switch, Select, Button } from 'antd';

import { dateFormat } from 'utils/formatDateTime';
import { prepareDatePickerText, preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';
import { customSelectBox } from 'utils/customSelectBox';
import { expandIcon } from 'utils/accordianExpandIcon';
import { UploadUtil } from 'utils/Upload';

const { Panel } = Collapse;

const AddEditFormMain = (props) => {
    const { formData, onHandleSelect, isDataLoading, editMode, handleFormValueChange } = props;
    const { pushIndicator, setPushIndicator, handleViewBudget } = props;
    const { isReadOnly = true } = props;
    const disabledProps = { disabled: isReadOnly };

    const downloadTemplate = () => {};

    const handleChangeSapIndicator = (val) => {
        console.log('🚀 ~ handleChangeSapIndicator ~ val:', val);
        setPushIndicator(prev => !prev);
    };

    const mmtType = [];
    // {!pushIndicator ? (

    return (
        <>
            <Card>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Space style={{ display: 'flex' }} size="middle" direction="vertical">
                            <Row gutter={20}>
                                {/* <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label={'Revision No'} name="rivisionNo">
                                        {customSelectBox({ data: assosiateType, placeholder: preparePlaceholderSelect('Revision No' || translateContent('customerMaster.placeholder.corporateName')), onChange: onHandleSelect })}
                                    </Form.Item>
                                </Col>
                                 */}
                                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item initialValue={pushIndicator} name="sapPushIndicator" label={'SAP Push Indicator'}>
                                        <Switch checked={pushIndicator} onChange={handleChangeSapIndicator} checkedChildren={translateContent('global.label.yes')} unCheckedChildren={translateContent('global.label.no')} valuePropName="checked" />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label={'Financial Year'} name="financialYear">
                                        {customSelectBox({ data: [], placeholder: preparePlaceholderSelect('Financial Year' || translateContent('customerMaster.placeholder.corporateName')), onChange: onHandleSelect })}
                                    </Form.Item>
                                </Col>
                                <Col xs={12} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item label="Zone" name="zone">
                                        <Select optionFilterProp="children" options={[]} placeholder={preparePlaceholderSelect('Zone')} fieldNames={{ label: 'prodctShrtName', value: 'prodctCode' }} loading={isDataLoading} allowClear showSearch filterOption={(input, option) => (option?.prodctShrtName ?? '').toLowerCase().includes(input.toLowerCase())} />
                                    </Form.Item>
                                </Col>
                                <Col xs={12} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item label="Area Office" name="areaOffice">
                                        <Select optionFilterProp="children" options={[]} placeholder={preparePlaceholderSelect('Area Office')} fieldNames={{ label: 'prodctShrtName', value: 'prodctCode' }} loading={isDataLoading} allowClear showSearch filterOption={(input, option) => (option?.prodctShrtName ?? '').toLowerCase().includes(input.toLowerCase())} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                    <Form.Item label="Claim Type" name="claimType">
                                        <Select optionFilterProp="children" options={[]} placeholder={preparePlaceholderSelect('Claim Type')} fieldNames={{ label: 'value', value: 'key' }} loading={isDataLoading} allowClear showSearch filterOption={(input, option) => (option?.prodctShrtName ?? '').toLowerCase().includes(input.toLowerCase())} />
                                    </Form.Item>
                                </Col>
                                {!pushIndicator && (
                                    <Col xs={12} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item label="Dealer Name" name="dealerName">
                                            {customSelectBox({ data: [], placeholder: preparePlaceholderSelect('Dealer Name' || translateContent('customerMaster.placeholder.corporateName')) })}
                                        </Form.Item>
                                    </Col>
                                )}
                                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item name="sourceBudget" label={'Source Budget'}>
                                        {customSelectBox({ data: mmtType, placeholder: preparePlaceholderSelect('Source Budget' || translateContent('customerMaster.placeholder.corporateName')), onChange: onHandleSelect })}
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label={'Source Budget Amount'} name="sourceBudgetAmount">
                                        <Input placeholder={preparePlaceholderText('Source Budget Amount')} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                    <Button onClick={handleViewBudget} type="primary" className={styles.marT30}>{'View Budget'}</Button>
                                </Col>
                                {!pushIndicator && (
                                    <>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                            <Form.Item label={'Scheme TGT/Non TGT/Must do TGT'} name="SchemeTGT/NonTGT/MustdoTGT">
                                                {customSelectBox({ data: [], placeholder: preparePlaceholderSelect('Scheme TGT/Non TGT/Must do TGT' || translateContent('customerMaster.placeholder.corporateName')), onChange: onHandleSelect })}
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                            <Form.Item label={'Scheme Valid From Date'} name="schemeValidFromDate" className={styles?.datePicker}>
                                                <DatePicker format={dateFormat} disabled={isReadOnly} placeholder={prepareDatePickerText(dateFormat)} />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                            <Form.Item label={'Scheme Valid To Date'} name="schemeValidToDate" className={styles?.datePicker}>
                                                <DatePicker format={dateFormat} disabled={isReadOnly} placeholder={prepareDatePickerText(dateFormat)} />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                            <Form.Item label={'Segment'} name="segment">
                                                {customSelectBox({ data: [], placeholder: preparePlaceholderSelect('Segment' || translateContent('customerMaster.placeholder.corporateName')), onChange: onHandleSelect })}
                                            </Form.Item>
                                        </Col>

                                        <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                            <Form.Item label={'Model group'} name="Model group">
                                                {customSelectBox({ data: [], placeholder: preparePlaceholderSelect('Model group' || translateContent('customerMaster.placeholder.corporateName')), onChange: onHandleSelect })}
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                            <Form.Item label={'Lump Sum'} name="Lump Sum">
                                                {customSelectBox({ data: [], placeholder: preparePlaceholderSelect('Lump Sum' || translateContent('customerMaster.placeholder.corporateName')), onChange: onHandleSelect })}
                                            </Form.Item>
                                        </Col>
                                    </>
                                )}

                                {!pushIndicator && (
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                        <Form.Item label={'Retail Quantity'} name="retailQuantity">
                                            <Input placeholder={preparePlaceholderText('Retail Quantity')} />
                                        </Form.Item>
                                    </Col>
                                )}
                            </Row>
                        </Space>
                    </Col>
                </Row>
            </Card>
        </>
    );
};

export const AddEditForm = AddEditFormMain;
