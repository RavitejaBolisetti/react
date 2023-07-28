/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Col, Input, Form, Row, Select, DatePicker, Space, Collapse, Card } from 'antd';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';
import { formattedCalendarDate } from 'utils/formatDateTime';

import { expandIcon } from 'utils/accordianExpandIcon';
import styles from 'components/common/Common.module.css';

const { TextArea } = Input;
const { Panel } = Collapse;

const AddEditFormMain = (props) => {
    const { schemeData } = props;
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

    return (
        <Row gutter={20}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Space style={{ display: 'flex' }} size="middle" direction="vertical" className={styles.accordianContainer}>
                    {schemeData ? (
                        schemeData?.schemes?.map((schemeForm, index) => (
                            <Collapse expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(schemeForm?.id)} expandIconPosition="end">
                                <Panel header={schemeForm?.schemeName} key={schemeForm?.id}>
                                    <div className={styles.sectionborder}>
                                        <Row gutter={20}>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item initialValue={schemeForm?.schemeType} label="Scheme Type" name="schemeType">
                                                    <Select
                                                        disabled={true}
                                                        placeholder={preparePlaceholderSelect('Scheme Type')}
                                                        style={{
                                                            width: '100%',
                                                        }}
                                                    ></Select>
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item initialValue={schemeForm?.schemeCategory} label="Scheme Category" name="schemeCategory">
                                                    <Input placeholder={preparePlaceholderText('Scheme Category')} disabled={true} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Form.Item initialValue={schemeForm?.amount} label="Amount" name="amount">
                                                    <Input placeholder={preparePlaceholderText('Amount')} disabled={true} />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </div>

                                    <Row gutter={20}>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item initialValue={formattedCalendarDate(schemeForm?.validFrom)} label="Valid From" name="validFrom">
                                                <DatePicker placeholder={preparePlaceholderText('Valid From')} onChange={onChange} style={{ width: '100%' }} disabled={true} />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                            <Form.Item initialValue={formattedCalendarDate(schemeForm?.validTo)} label="Valid To" name="validTo">
                                                <DatePicker placeholder={preparePlaceholderText('Valid To')} onChange={onChange} style={{ width: '100%' }} disabled={true} />
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Row gutter={20}>
                                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                            <Form.Item initialValue={schemeForm?.description} label="Description" name="description">
                                                <TextArea maxLength={300} placeholder={preparePlaceholderText('Description')} disabled={true} showCount />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Panel>
                            </Collapse>
                        ))
                    ) : (
                        <Card className={styles.viewCardSize}>No Scheme and Offer Details Available</Card>
                    )}
                </Space>
            </Col>
        </Row>
    );
};

export const AddEditForm = AddEditFormMain;
