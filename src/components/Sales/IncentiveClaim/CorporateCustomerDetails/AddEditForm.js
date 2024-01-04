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
    const { formData, onHandleSelect } = props;
    const { isReadOnly = true } = props;
    const disabledProps = { disabled: isReadOnly };

    return (
        <>
            <Card>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                        <Form.Item name="budgetedQuentity" label={'Budgeted Quantity'} initialValue={formData?.financierName}>
                            <Input placeholder={preparePlaceholderText('Budgeted Quantity')} maxLength={50} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                        <Form.Item name="budgetedAmount" label={'Bugeted Amount'} initialValue={formData?.financierName}>
                            <Input placeholder={preparePlaceholderText('Bugeted Amount')} maxLength={50} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                        <Form.Item name="alreadyClaimedQuantity" label={'Already Claimed Quantity'} initialValue={formData?.financierName}>
                            <Input placeholder={preparePlaceholderText('Already Claimed Quantity')} maxLength={50} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                        <Form.Item name="alreadyClaimedAmount" label={'Already Claimed Amount'} initialValue={formData?.financierName}>
                            <Input placeholder={preparePlaceholderText('Already Claimed Amount')} maxLength={50} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                        <Form.Item name="claimedQuantity" label={'Claim Quantity'} initialValue={formData?.financierName}>
                            <Input placeholder={preparePlaceholderText('Claimed Quantity')} maxLength={50} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
                        <Form.Item name="claimedAmount" label={'Claim Amount'} initialValue={formData?.financierName}>
                            <Input placeholder={preparePlaceholderText('Claimed Amount')} maxLength={50} />
                        </Form.Item>
                    </Col>
                </Row>
            </Card>
        </>
    );
};

export const AddEditForm = AddEditFormMain;
