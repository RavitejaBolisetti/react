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
import { validateRequiredInputField } from 'utils/validation';

const { Panel } = Collapse;

const AddEditFormMain = (props) => {
    const { formData, onHandleSelect, isDataLoading, editMode, handleFormValueChange } = props;
    const { isReadOnly = true } = props;

    const mmtType = [];

    return (
        <>
            <Card>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Space style={{ display: 'flex' }} size="middle" direction="vertical">
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label={'Financial Year'} name="financialYear">
                                        {customSelectBox({ data: [], placeholder: preparePlaceholderSelect('Financial Year' || translateContent('customerMaster.placeholder.corporateName')), onChange: onHandleSelect })}
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label={'Area Office'} name="areaOffice">
                                        {customSelectBox({ data: [], placeholder: preparePlaceholderSelect('Area Office' || translateContent('customerMaster.placeholder.corporateName')), onChange: onHandleSelect })}
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label={'Claim Type'} name="claimType">
                                        {customSelectBox({ data: [], placeholder: preparePlaceholderSelect('Claim Type' || translateContent('customerMaster.placeholder.corporateName')), onChange: onHandleSelect })}
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                                    <Form.Item label={translateContent('Scheme From Date')} name="schemeFromDate" rules={[validateRequiredInputField(translateContent('Scheme From Date'))]}>
                                        <DatePicker format={dateFormat} placeholder={prepareDatePickerText(dateFormat)} disabled={isReadOnly} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                                    <Form.Item label={translateContent('Scheme From Date')} name="schemeToDate" rules={[validateRequiredInputField(translateContent('Scheme From Date'))]}>
                                        <DatePicker format={dateFormat} placeholder={prepareDatePickerText(dateFormat)} disabled={isReadOnly} />
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
