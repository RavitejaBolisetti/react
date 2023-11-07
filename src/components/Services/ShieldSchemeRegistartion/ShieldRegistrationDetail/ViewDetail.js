/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Row, Col, Card, Descriptions, Divider, Button, Collapse, Typography } from 'antd';
import styles from 'assets/sass/app.module.scss';
import { expandIcon } from 'utils/accordianExpandIcon';
import { convertDateMonthYear } from 'utils/formatDateTime';

import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { getCodeValue } from 'utils/getCodeValue';

const { Panel } = Collapse;
const { Text } = Typography;

const ViewDetailMain = (props) => {
    const { formData, saleTypes, isLoading } = props;

    const [activeKey, setactiveKey] = useState([]);

    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };

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
        <div className={styles.viewDrawerContainer}>
            <Collapse expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(1)} expandIconPosition="end" collapsible="icon">
                <Panel header="Registration Information" key="1">
                    <Divider />
                    <Descriptions {...viewProps}>
                        <Descriptions.Item label="Sale Type">{checkAndSetDefaultValue(getCodeValue(saleTypes, formData?.registrationInformation?.saleType, isLoading))}</Descriptions.Item>
                        <Descriptions.Item label="Booking No.">{checkAndSetDefaultValue(formData?.registrationInformation?.otf, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Employee Name">{checkAndSetDefaultValue(formData?.registrationInformation?.employeeName, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Manager Name">{checkAndSetDefaultValue(formData?.registrationInformation?.managerName, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Credit Note Number">{checkAndSetDefaultValue(formData?.registrationInformation?.creditNoteNumber, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Credit Note Date">{checkAndSetDefaultValue(formData?.registrationInformation?.creditNoteDate ? convertDateMonthYear(formData?.registrationInformation?.creditNoteDate) : '', isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Credit Note Amount">{checkAndSetDefaultValue(formData?.registrationInformation?.creditNoteAmount, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Debit Note Number">{checkAndSetDefaultValue(formData?.registrationInformation?.debitNoteNumber, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Debit Note Date">{checkAndSetDefaultValue(formData?.registrationInformation?.debitNoteDate, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Debit Note Amount">{checkAndSetDefaultValue(formData?.registrationInformation?.debitNoteAmount, isLoading)}</Descriptions.Item>
                    </Descriptions>
                    {formData?.registrationInformation?.shieldIncentiveClaim && (
                        <Card>
                            <Row>
                                <Col xs={14} sm={14} md={14} lg={14} xl={14}>
                                    <Text strong>Scheme Incentive Claim:{checkAndSetDefaultValue(formData?.registrationInformation?.shieldIncentiveClaim, isLoading)}</Text>
                                </Col>
                                <Col xs={10} sm={10} md={10} lg={10} xl={10}>
                                    <div className={styles.floatRight}>
                                        <Button danger>Print/Download</Button>
                                    </div>
                                </Col>
                            </Row>
                            <Row className={styles.marB10}>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                    <Text type="secondary">Invoice Date: {checkAndSetDefaultValue(convertDateMonthYear(formData?.registrationInformation?.invoiceDate), isLoading)}</Text>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                    <Text type="secondary">IRN No.: {checkAndSetDefaultValue(formData?.registrationInformation?.irnNumber, isLoading)}</Text>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                    <Text type="secondary">IRN Status: {checkAndSetDefaultValue(formData?.registrationInformation?.shieldIncentiveClaim, isLoading)}</Text>
                                </Col>
                            </Row>
                        </Card>
                    )}
                    {formData?.registrationInformation?.shieldCertificateNumber && (
                        <Card>
                            <Row>
                                <Col xs={14} sm={14} md={14} lg={14} xl={14}>
                                    <Text strong>Scheme Certificate No.:{checkAndSetDefaultValue(formData?.registrationInformation?.shieldCertificateNumber, isLoading)}</Text>
                                </Col>
                                <Col xs={10} sm={10} md={10} lg={10} xl={10}>
                                    <div className={styles.floatRight}>
                                        <Button danger>Print/Download</Button>
                                    </div>
                                </Col>
                            </Row>
                            <Row className={styles.marB10}>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                    <Text type="secondary">Invoice Date: {checkAndSetDefaultValue(convertDateMonthYear(formData?.registrationInformation?.invoiceDate), isLoading)}</Text>
                                </Col>
                            </Row>
                        </Card>
                    )}
                    {formData?.registrationInformation?.invoiceNumber && (
                        <Card>
                            <Row>
                                <Col xs={14} sm={14} md={14} lg={14} xl={14}>
                                    <Text strong>Invoice No.:{checkAndSetDefaultValue(formData?.registrationInformation?.invoiceNumber, isLoading)}</Text>
                                </Col>
                                <Col xs={10} sm={10} md={10} lg={10} xl={10}>
                                    <div className={styles.floatRight}>
                                        <Button danger>Print/Download</Button>
                                    </div>
                                </Col>
                            </Row>
                            <Row className={styles.marB10}>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                    <Text type="secondary">Invoice Date: {checkAndSetDefaultValue(convertDateMonthYear(formData?.registrationInformation?.invoiceDate), isLoading)}</Text>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                    <Text type="secondary">IRN No.: {checkAndSetDefaultValue(formData?.registrationInformation?.irnNumber, isLoading)}</Text>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                    <Text type="secondary">IRN Status: {checkAndSetDefaultValue(formData?.registrationInformation?.shieldIncentiveClaim, isLoading)}</Text>
                                </Col>
                            </Row>
                        </Card>
                    )}
                </Panel>
            </Collapse>
            <Collapse expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(2)} expandIconPosition="end" collapsible="icon">
                <Panel header="Scheme Details" key="2">
                    <Divider />
                    <Descriptions {...viewProps}>
                        <Descriptions.Item label="Scheme Description">{checkAndSetDefaultValue(formData?.schemeDetails?.schemeDescription, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Scheme Code">{checkAndSetDefaultValue(formData?.schemeDetails?.schemeCode, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Scheme Basic Amount">{checkAndSetDefaultValue(formData?.schemeDetails?.schemeBasicAmount, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Scheme Discount">{checkAndSetDefaultValue(formData?.schemeDetails?.schemeDiscount, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Scheme Tax Amount">{checkAndSetDefaultValue(formData?.schemeDetails?.schemeTaxAmount, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Scheme Start Date">{checkAndSetDefaultValue(convertDateMonthYear(formData?.schemeDetails?.schemeStartDate), isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Scheme End Date">{checkAndSetDefaultValue(convertDateMonthYear(formData?.schemeDetails?.schemeEndDate), isLoading)}</Descriptions.Item>
                    </Descriptions>
                </Panel>
            </Collapse>
        </div>
    );
};

export const ViewDetail = ViewDetailMain;
