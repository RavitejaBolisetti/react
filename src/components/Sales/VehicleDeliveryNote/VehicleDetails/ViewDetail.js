/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Col, Row, Collapse, Card, Divider, Typography, Descriptions } from 'antd';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { expandIcon } from 'utils/accordianExpandIcon';
import { NoDataFound } from 'utils/noDataFound';
import { translateContent } from 'utils/translateContent';

import styles from 'assets/sass/app.module.scss';

const { Panel } = Collapse;
const { Text } = Typography;

const ViewDetailMain = (props) => {
    const { formData, isLoading } = props;
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };

    return (
        <div className={styles.viewDrawerContainer}>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Collapse collapsible="icon" expandIcon={expandIcon} defaultActiveKey={['VI1']} expandIconPosition="end">
                        <Panel header={translateContent('vehicleDeliveryNote.vehicleDetails.heading.vehicleInfo')} key="VI1">
                            <Divider />
                            <Descriptions {...viewProps}>
                                <Descriptions.Item label={translateContent('vehicleDeliveryNote.vehicleDetails.label.vinNumber')}>{checkAndSetDefaultValue(formData?.vinNumber, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('vehicleDeliveryNote.vehicleDetails.label.engineNumber')}>{checkAndSetDefaultValue(formData?.engineNumber, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('vehicleDeliveryNote.vehicleDetails.label.keyNumber')}>{checkAndSetDefaultValue(formData?.keyNumber, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('vehicleDeliveryNote.vehicleDetails.label.modelCode')}>{checkAndSetDefaultValue(formData?.modelCode, isLoading)}</Descriptions.Item>
                                <Descriptions.Item label={translateContent('vehicleDeliveryNote.vehicleDetails.label.modelDescription')}>{checkAndSetDefaultValue(formData?.modelDescription, isLoading)}</Descriptions.Item>
                            </Descriptions>
                        </Panel>
                    </Collapse>

                    <Collapse collapsible="icon" expandIcon={expandIcon} defaultActiveKey={['BD1']} expandIconPosition="end">
                        <Panel header={translateContent('vehicleDeliveryNote.vehicleDetails.heading.batteryDetails')} key="BD1">
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
