/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Col, Row, Collapse, Card, Divider, Typography, Descriptions } from 'antd';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { expandIcon } from 'utils/accordianExpandIcon';
import { NoDataFound } from 'utils/noDataFound';

import styles from 'assets/sass/app.module.scss';

const { Panel } = Collapse;
const { Text } = Typography;

const ViewDetailMain = (props) => {
    const { formData, isLoading } = props;
    const [activeKey, setactiveKey] = useState([1, 2]);
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
                    <Collapse expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(1)} expandIconPosition="end">
                        <Panel header="Vehicle Information" key="1">
                            <Divider />
                            <Descriptions {...viewProps}>
                                {/* <Descriptions.Item label="Search Vehicle Registration No.">{checkAndSetDefaultValue(formData?.registrationNumber, isLoading)}</Descriptions.Item> */}
                                <Descriptions.Item label="VIN No.">{checkAndSetDefaultValue(formData?.vinNumber, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Engine Number">{checkAndSetDefaultValue(formData?.engineNumber, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Key Number">{checkAndSetDefaultValue(formData?.keyNumber, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Model Code">{checkAndSetDefaultValue(formData?.modelCode, isLoading)}</Descriptions.Item>
                                {/* <Descriptions.Item label="Modal Color">{checkAndSetDefaultValue(formData?.modelColor, isLoading)}</Descriptions.Item> */}
                                <Descriptions.Item label="Modal Description">{checkAndSetDefaultValue(formData?.modelDescription, isLoading)}</Descriptions.Item>
                            </Descriptions>
                        </Panel>
                    </Collapse>

                    <Collapse expandIcon={expandIcon} activeKey={activeKey} onChange={() => onChange(2)} expandIconPosition="end">
                        <Panel header="Battery Information" key="2">
                            <Divider />
                            <Row gutter={20}>
                                {formData?.batteryDetail?.length > 0 &&
                                    formData?.batteryDetail?.map((battery) => {
                                        return (
                                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                                <Card className={`${styles.cardView} ${styles.cardDark}`} battery={battery} {...props}>
                                                    <Text>{battery?.batteryMake}</Text>
                                                    <div>
                                                        <Text type="secondary">{battery?.batteryName}</Text>
                                                    </div>
                                                </Card>
                                            </Col>
                                        );
                                    })}
                                {!formData?.batteryDetail?.length > 0 && (
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <NoDataFound />
                                    </Col>
                                )}
                            </Row>
                        </Panel>
                    </Collapse>
                </Col>
            </Row>
        </div>
    );
};

export const ViewDetail = ViewDetailMain;
