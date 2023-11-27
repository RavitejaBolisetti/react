/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Col, Row, Descriptions, Divider, Typography, Space, Card } from 'antd';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

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
            <Space style={{ display: 'flex' }} size="small" direction="horizontal">
                <Row gutter={20} xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Space style={{ display: 'flex' }} size="middle" direction="vertical">
                            <Card style={{ backgroundColor: '#F2F2F2' }}>
                                <Typography>{translateContent('installationAddressDetials.heading.customerDetails')}</Typography>
                                <Divider className={styles.marT20} />
                                <Descriptions {...customerProps}>
                                    <Descriptions.Item label={translateContent('installationAddressDetials.label.customerName')}>{checkAndSetDefaultValue(chargerInstallationMasterData?.chargerInstAddressDetails?.customerDetails?.customerName, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label={translateContent('installationAddressDetials.label.address')}>{checkAndSetDefaultValue(chargerInstallationMasterData?.chargerInstAddressDetails?.customerDetails?.address, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label={translateContent('installationAddressDetials.label.pincode')}>{checkAndSetDefaultValue(chargerInstallationMasterData?.chargerInstAddressDetails?.customerDetails?.pinCode, isLoading)}</Descriptions.Item>
                                </Descriptions>
                                <Descriptions {...addressProps}>
                                    <Descriptions.Item label={translateContent('installationAddressDetials.label.city')}>{checkAndSetDefaultValue(chargerInstallationMasterData?.chargerInstAddressDetails?.customerDetails?.city, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label={translateContent('installationAddressDetials.label.state')}>{checkAndSetDefaultValue(chargerInstallationMasterData?.chargerInstAddressDetails?.customerDetails?.state, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label={translateContent('installationAddressDetials.label.custMobNo')}>{checkAndSetDefaultValue(chargerInstallationMasterData?.chargerInstAddressDetails?.customerDetails?.customerMobileNumber, isLoading)}</Descriptions.Item>
                                    <Descriptions.Item label={translateContent('installationAddressDetials.label.custEmailId')}>{checkAndSetDefaultValue(chargerInstallationMasterData?.chargerInstAddressDetails?.customerDetails?.customerEmail, isLoading)}</Descriptions.Item>
                                </Descriptions>
                            </Card>
                        </Space>
                    </Col>
                </Row>
                <Row gutter={20} xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Card style={{ backgroundColor: '#F2F2F2' }}>
                            <Typography>{translateContent('installationAddressDetials.label.installationAddress')}</Typography>
                            <Divider className={styles.marT20} />
                            <Descriptions {...customerProps}>
                                <Descriptions.Item label={translateContent('installationAddressDetials.label.installationAddress')}>{checkAndSetDefaultValue(chargerInstallationMasterData?.chargerInstAddressDetails?.instAddressDetails?.address, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('installationAddressDetials.label.pincode')}>{checkAndSetDefaultValue(chargerInstallationMasterData?.chargerInstAddressDetails?.instAddressDetails?.pinCode, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('installationAddressDetials.label.city')}>{checkAndSetDefaultValue(chargerInstallationMasterData?.chargerInstAddressDetails?.instAddressDetails?.city, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('installationAddressDetials.label.state')}>{checkAndSetDefaultValue(chargerInstallationMasterData?.chargerInstAddressDetails?.instAddressDetails?.state, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('installationAddressDetials.label.contactNo')}>{checkAndSetDefaultValue(chargerInstallationMasterData?.chargerInstAddressDetails?.instAddressDetails?.customerMobileNumber, isLoading)}</Descriptions.Item>
                            </Descriptions>
                        </Card>
                    </Col>
                </Row>
            </Space>
        </div>
    );
};

export const ViewDetail = ViewDetailMain;
