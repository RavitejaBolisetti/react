/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Card, Descriptions, Divider, Typography, Button } from 'antd';

import { DATA_TYPE } from 'constants/dataType';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';

import styles from 'assets/sass/app.module.scss';

const { Text } = Typography;

export const ViewDetails = (props) => {
    const { formData, isLoading, setIsFormVisible, setIsMapFormVisible } = props;
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 4, lg: 4, xl: 4, xxl: 4 },
    };

    const actionBtn = (
        <>
            <Button onClick={() => setIsFormVisible(true)} type="primary">
                Timeline
            </Button>

            <Button onClick={() => setIsMapFormVisible(true)} type="primary">
                Show On Map
            </Button>
        </>
    );

    return (
        <Card className={styles.mainDisplay}>
            <Row gutter={20}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} className={styles.verticallyCentered}>
                    <Text strong>Shipment Details | VIN : {checkAndSetDefaultValue(formData?.vin, isLoading)} </Text>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} className={styles.buttonsGroupRight}>
                    {formData?.vin && checkAndSetDefaultValue(actionBtn, isLoading)}
                </Col>
            </Row>
            <Divider className={styles.marT20} />
            <Descriptions {...viewProps}>
                <Descriptions.Item label="Shipment ID">{checkAndSetDefaultValue(formData?.shipmentId, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="LR Number">{checkAndSetDefaultValue(formData?.lrNumber, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="LR Date">{checkAndSetDefaultValue(formData?.lrDate, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                <Descriptions.Item label="Transporter Name">{checkAndSetDefaultValue(formData?.transporterName, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Mode of transport">{checkAndSetDefaultValue(formData?.modeOfTransport, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Last Updated Location">{checkAndSetDefaultValue(formData?.lastUpdatedLocation, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Last Update Date & Time">{checkAndSetDefaultValue(formData?.lastUpdatedDateAndTime, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                <Descriptions.Item label="OEM Invoice Number">{checkAndSetDefaultValue(formData?.oemInvoiceNumber, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="OEM Invoice Date">{checkAndSetDefaultValue(formData?.oemInvoiceDate, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                <Descriptions.Item label="Shipment Status">{checkAndSetDefaultValue(formData?.shipmentStatus, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Current Latitude">{checkAndSetDefaultValue(formData?.currentLatitude, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Current Logitude">{checkAndSetDefaultValue(formData?.currentLongitude, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="ETA Date & Time">{checkAndSetDefaultValue(formData?.etaDateAndTime, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                <Descriptions.Item label="Shipment Delivery Date & Time">{checkAndSetDefaultValue(formData?.shipmentDeliveryDateAndTime, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
            </Descriptions>
        </Card>
    );
};
