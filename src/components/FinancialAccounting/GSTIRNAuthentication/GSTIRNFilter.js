/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Input, Form, Select } from 'antd';
import { validateRequiredInputField } from 'utils/validation';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';
const { Option } = Select;

export default function GSTIRNFilter(props) {
    const { dealerGstData } = props;
    const { userId, isReadOnly = true, handleGstinNumber } = props;
    const disabledProps = { disabled: isReadOnly };

    return (
        <div className={styles.contentHeaderBackground}>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Row gutter={20}>
                        <Col xs={24} sm={4} md={4} lg={4} xl={4} className={styles.verticallyCentered}>
                            {translateContent('gstIRNAuthentication.heading.moduleTitle')}
                        </Col>
                        <Col xs={24} sm={4} md={4} lg={4} xl={4} className={styles.verticallyCentered}>
                            <Form.Item className={styles.marB0}>
                                <Input maxLength={6} placeholder={translateContent('gstIRNAuthentication.placeholder.dealerName')} value={userId} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={5} md={5} lg={5} xl={5} className={styles.selectError}>
                            <Form.Item name="gstinNumber" className={styles.marB0} rules={[validateRequiredInputField(translateContent('gstIRNAuthentication.validation.gstin'))]}>
                                <Select data-testid="handleGstinNumber" onChange={handleGstinNumber} placeholder={translateContent('gstIRNAuthentication.placeholder.gstin')} allowClear>
                                    {dealerGstData?.map((item) => (
                                        <Option value={item.value}>{item.value}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
}
