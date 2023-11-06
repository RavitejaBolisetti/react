/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Col, Input, Form, Row, Select, DatePicker, Collapse, Card, Divider } from 'antd';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import { dateFormat, formattedCalendarDate } from 'utils/formatDateTime';

import { expandIcon } from 'utils/accordianExpandIcon';
import { translateContent } from 'utils/translateContent';

const { TextArea } = Input;
const { Panel } = Collapse;

const AddEditFormMain = (props) => {
    const { schemeData, styles, viewOnly = true } = props;
    const [activeKey, setactiveKey] = useState([1]);

    const onChange = (values) => {
        const isPresent = activeKey.includes(values);
        if (isPresent) {
            const newActivekeys = [];
            activeKey.forEach((item) => {
                if (item !== values) {
                    newActivekeys.push(item);
                }
            });
            setactiveKey(newActivekeys);
        } else {
            setactiveKey([...activeKey, values]);
        }
    };

    const disabledProps = { disabled: viewOnly };

    return (
        <Row gutter={20}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                {schemeData && schemeData?.schemes?.length > 0 ? (
                    schemeData?.schemes?.map((schemeForm, index) => (
                        <Collapse expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(schemeForm?.id)} expandIconPosition="end" collapsible="icon">
                            <Panel header={schemeForm?.schemeName} key={schemeForm?.id}>
                                <Divider />
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={schemeForm?.schemeType} label={translateContent('commonModules.label.schemeAndOfferDetails.schemeType')} name="schemeType">
                                            <Select placeholder={preparePlaceholderSelect('Scheme Type')} {...disabledProps}></Select>
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={schemeForm?.schemeCategory} label={translateContent('commonModules.label.schemeAndOfferDetails.schemeCategory')} name="schemeCategory">
                                            <Input placeholder={preparePlaceholderText('Scheme Category')} {...disabledProps} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={schemeForm?.amount} label={translateContent('commonModules.label.schemeAndOfferDetails.Amount')} name="amount">
                                            <Input placeholder={preparePlaceholderText('Amount')} {...disabledProps} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formattedCalendarDate(schemeForm?.validFrom)} label={translateContent('commonModules.label.schemeAndOfferDetails.validFrom')} name="validFrom">
                                            <DatePicker format={dateFormat} placeholder={preparePlaceholderText('Valid From')} onChange={onChange} {...disabledProps} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                        <Form.Item initialValue={formattedCalendarDate(schemeForm?.validTo)} label={translateContent('commonModules.label.schemeAndOfferDetails.validTo')} name="validTo">
                                            <DatePicker format={dateFormat} placeholder={preparePlaceholderText('Valid To')} onChange={onChange} {...disabledProps} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <Form.Item initialValue={schemeForm?.description} label={translateContent('commonModules.label.schemeAndOfferDetails.description')} name="description">
                                            <TextArea maxLength={300} placeholder={preparePlaceholderText('Description')} {...disabledProps} showCount />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Panel>
                        </Collapse>
                    ))
                ) : (
                    <Card>
                        <div className={styles?.marB20}>{translateContent('commonModules.label.schemeAndOfferDetails.noScheme')}</div>
                    </Card>
                )}
            </Col>
        </Row>
    );
};

export const AddEditForm = AddEditFormMain;
