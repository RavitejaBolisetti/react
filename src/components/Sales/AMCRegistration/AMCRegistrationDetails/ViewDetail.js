/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Col, Row, Collapse, Descriptions, Divider } from 'antd';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';

import styles from 'assets/sass/app.module.scss';
import { expandIcon } from 'utils/accordianExpandIcon';
import { getCodeValue } from 'utils/getCodeValue';

const { Panel } = Collapse;

const ViewDetailMain = (props) => {
    const { formData, isLoading, typeData } = props;
    const [activeKey, setactiveKey] = useState([]);
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };

    console.log('formData', formData);

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
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Collapse expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(1)} expandIconPosition="end" className={styles.drawerGap}>
                        <Panel header="Registration Information" key="1">
                            <Divider />
                            <Descriptions {...viewProps}>
                                <Descriptions.Item label="Sale Type">{checkAndSetDefaultValue(formData?.amcRegistration?.saleType, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Employee Name">{checkAndSetDefaultValue(formData?.amcRegistration?.employeeName, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Manager Name">{checkAndSetDefaultValue(formData?.amcRegistration?.managerName, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Remarks">{checkAndSetDefaultValue(formData?.amcRegistration?.remarks, isLoading)}</Descriptions.Item>
                            </Descriptions>
                            <Divider />
                            <Descriptions {...viewProps}>
                                <Descriptions.Item label="Credit Note Number">{checkAndSetDefaultValue(formData?.amcRegistration?.creditNoteNumber, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Credit Note Date">{checkAndSetDefaultValue(formData?.amcRegistration?.creditNoteDate, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Credit Note Amount">{checkAndSetDefaultValue(formData?.amcRegistration?.creditNoteAmount, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Debit Note Number">{checkAndSetDefaultValue(formData?.amcRegistration?.debitNoteNumber, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Debit Note Date">{checkAndSetDefaultValue(formData?.amcRegistration?.debitNoteDate, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Debit Note Amount">{checkAndSetDefaultValue(formData?.amcRegistration?.debitNoteAmount, isLoading)}</Descriptions.Item>
                            </Descriptions>
                        </Panel>
                    </Collapse>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Collapse expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(2)} expandIconPosition="end" className={styles.drawerGap}>
                        <Panel header="Scheme Details" key="2">
                            <Divider />
                            <Descriptions {...viewProps}>
                                <Descriptions.Item label="AMC Type">{checkAndSetDefaultValue(getCodeValue(typeData?.AMC_SCHEME_TYPE, formData?.amcRegistration?.bookingNumber), isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Scheme Description">{checkAndSetDefaultValue(formData?.amcRegistration?.schemeDescription, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Scheme Code">{checkAndSetDefaultValue(formData?.amcRegistration?.schemeCode, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Scheme Basic Amount">{checkAndSetDefaultValue(formData?.amcRegistration?.schemeBasicAmount, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Scheme Discount">{checkAndSetDefaultValue(formData?.amcRegistration?.schemeDiscount, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Scheme Tax Amount">{checkAndSetDefaultValue(formData?.amcRegistration?.schemeTaxAmount, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Scheme End Date">{checkAndSetDefaultValue(formData?.amcRegistration?.schemeEndDate, isLoading)}</Descriptions.Item>
                            </Descriptions>
                        </Panel>
                    </Collapse>
                </Col>
            </Row>
        </div>
    );
};

const ViewDetail = ViewDetailMain;
export default ViewDetail;
