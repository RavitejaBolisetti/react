/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Col, Row, Collapse, Descriptions, Divider, Typography, Space, Card } from 'antd';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';

import styles from 'assets/sass/app.module.scss';
import { DataTable } from 'utils/dataTable';
import { prepareCaption } from 'utils/prepareCaption';

const { Panel } = Collapse;

const ViewDetailMain = (props) => {
    const { chargerInstallationMasterData, isLoading } = props;
    const [activeKey, setactiveKey] = useState([]);
    const addressProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 2, lg: 2, xl: 2, xxl: 2 },
    };
    const customerProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 1, lg: 1, xl: 1, xxl: 1 },
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
                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <Space style={{ display: 'flex' }} size="middle" direction="vertical">
                        <Card style={{ backgroundColor: '#F2F2F2' }}>
                            <Typography>Customer Details</Typography>
                            <Divider className={styles.marT20} />
                            <Descriptions {...customerProps}>
                                <Descriptions.Item label="Customer Name">{chargerInstallationMasterData?.chargerInstAddressDetails?.customerDetails?.customerName}</Descriptions.Item>
                                <Descriptions.Item label="Address">{chargerInstallationMasterData?.chargerInstAddressDetails?.customerDetails?.address}</Descriptions.Item>
                                <Descriptions.Item label="Pincode">{chargerInstallationMasterData?.chargerInstAddressDetails?.customerDetails?.pinCode}</Descriptions.Item>
                            </Descriptions>
                            <Descriptions {...addressProps}>
                                <Descriptions.Item label="City">{chargerInstallationMasterData?.chargerInstAddressDetails?.customerDetails?.city}</Descriptions.Item>
                                <Descriptions.Item label="State">{chargerInstallationMasterData?.chargerInstAddressDetails?.customerDetails?.state}</Descriptions.Item>
                                <Descriptions.Item label="Customer Mobile No.">{chargerInstallationMasterData?.chargerInstAddressDetails?.otfDetails?.customerMobileNumber}</Descriptions.Item>
                                <Descriptions.Item label="Customer Email Id.">{chargerInstallationMasterData?.chargerInstAddressDetails?.customerDetails?.email}</Descriptions.Item>
                            </Descriptions>
                        </Card>
                    </Space>
                </Col>
                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <Card style={{ backgroundColor: '#F2F2F2' }}>
                        <Typography>Installation Address</Typography>
                        <Divider className={styles.marT20} />
                        <Descriptions {...customerProps}>
                            <Descriptions.Item label="Installation Address">{chargerInstallationMasterData?.chargerInstAddressDetails?.instAddressDetails?.address}</Descriptions.Item>
                            <Descriptions.Item label="Pincode">{chargerInstallationMasterData?.chargerInstAddressDetails?.instAddressDetails?.pinCode}</Descriptions.Item>
                            <Descriptions.Item label="City">{chargerInstallationMasterData?.chargerInstAddressDetails?.instAddressDetails?.city}</Descriptions.Item>
                            <Descriptions.Item label="State">{chargerInstallationMasterData?.chargerInstAddressDetails?.instAddressDetails?.state}</Descriptions.Item>
                            <Descriptions.Item label="Contact No.">{chargerInstallationMasterData?.chargerInstAddressDetails?.instAddressDetails?.customerMobileNumber}</Descriptions.Item>
                        </Descriptions>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export const ViewDetail = ViewDetailMain;
