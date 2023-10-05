/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Col, Row, Collapse, Descriptions, Divider, Space, Card } from 'antd';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';

import styles from 'assets/sass/app.module.scss';
import { DataTable } from 'utils/dataTable';
import { prepareCaption } from 'utils/prepareCaption';
import { optionalServicesColumns } from './tableColumn';

const { Panel } = Collapse;

const ViewDetailMain = (props) => {
    const { otfFormData, isLoading } = props;
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
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Space style={{ display: 'flex' }} size="middle" direction="vertical">
                        <Card style={{ backgroundColor: '#F2F2F2' }}>
                            <Descriptions {...viewProps}>
                                <Descriptions.Item label="Request Id">{checkAndSetDefaultValue(otfFormData?.bookingNumber || otfFormData?.otfNumber, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Request Date">{checkAndSetDefaultValue(otfFormData?.otfDate, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Request Status">{checkAndSetDefaultValue(otfFormData?.taxCalculationType, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Model Group">{checkAndSetDefaultValue(otfFormData?.taxPayableOnReverseCharges, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Model Variant">{checkAndSetDefaultValue(otfFormData?.saleConsultant, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Seating Capacity">{checkAndSetDefaultValue(otfFormData?.mitraType, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Color">{checkAndSetDefaultValue(otfFormData?.mitraName, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Model Code">{checkAndSetDefaultValue(otfFormData?.mitraName, isLoading)}</Descriptions.Item>
                            </Descriptions>
                        </Card>
                        <Card style={{ backgroundColor: '#F2F2F2' }}>
                            <DataTable tableColumn={optionalServicesColumns()} pagination={false} />
                        </Card>
                    </Space>
                </Col>
            </Row>
        </div>
    );
};

export const ViewDetail = ViewDetailMain;
