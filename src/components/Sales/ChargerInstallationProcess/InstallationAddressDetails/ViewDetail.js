/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Col, Row, Descriptions, Divider, Typography, Space, Card } from 'antd';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';

import styles from 'assets/sass/app.module.scss';

const ViewDetailMain = (props) => {
    const { chargerInstallationMasterData, isLoading } = props;
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

    return (
        <div className={styles.viewDrawerContainer}>
            <Row gutter={20}>
                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <Space style={{ display: 'flex' }} size="middle" direction="vertical">
                        <Card style={{ backgroundColor: '#F2F2F2' }}>
                            <Typography>Customer Details</Typography>
                            <Divider className={styles.marT20} />
                            <Descriptions {...customerProps}>
                                <Descriptions.Item label="Customer Name">{checkAndSetDefaultValue(chargerInstallationMasterData?.chargerInstAddressDetails?.customerDetails?.customerName, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Address">{checkAndSetDefaultValue(chargerInstallationMasterData?.chargerInstAddressDetails?.customerDetails?.address, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Pincode">{checkAndSetDefaultValue(chargerInstallationMasterData?.chargerInstAddressDetails?.customerDetails?.pinCode, isLoading)}</Descriptions.Item>
                            </Descriptions>
                            <Descriptions {...addressProps}>
                                <Descriptions.Item label="City">{checkAndSetDefaultValue(chargerInstallationMasterData?.chargerInstAddressDetails?.customerDetails?.city, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="State">{checkAndSetDefaultValue(chargerInstallationMasterData?.chargerInstAddressDetails?.customerDetails?.state, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Customer Mobile No.">{checkAndSetDefaultValue(chargerInstallationMasterData?.chargerInstAddressDetails?.otfDetails?.customerMobileNumber, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label="Customer Email Id.">{checkAndSetDefaultValue(chargerInstallationMasterData?.chargerInstAddressDetails?.customerDetails?.customerEmail, isLoading)}</Descriptions.Item>
                            </Descriptions>
                        </Card>
                    </Space>
                </Col>
                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <Card style={{ backgroundColor: '#F2F2F2' }}>
                        <Typography>Installation Address</Typography>
                        <Divider className={styles.marT20} />
                        <Descriptions {...customerProps}>
                            <Descriptions.Item label="Installation Address">{checkAndSetDefaultValue(chargerInstallationMasterData?.chargerInstAddressDetails?.instAddressDetails?.address, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Pincode">{checkAndSetDefaultValue(chargerInstallationMasterData?.chargerInstAddressDetails?.instAddressDetails?.pinCode, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="City">{checkAndSetDefaultValue(chargerInstallationMasterData?.chargerInstAddressDetails?.instAddressDetails?.city, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="State">{checkAndSetDefaultValue(chargerInstallationMasterData?.chargerInstAddressDetails?.instAddressDetails?.state, isLoading)}</Descriptions.Item>
                            <Descriptions.Item label="Contact No.">{checkAndSetDefaultValue(chargerInstallationMasterData?.chargerInstAddressDetails?.instAddressDetails?.customerMobileNumber, isLoading)}</Descriptions.Item>
                        </Descriptions>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export const ViewDetail = ViewDetailMain;
