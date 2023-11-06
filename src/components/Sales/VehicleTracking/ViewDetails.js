/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Card, Descriptions, Divider, Typography, Button } from 'antd';
import moment from 'moment';
import { DATA_TYPE } from 'constants/dataType';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

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
                {translateContent('vehicleTracking.text.timeline')}
            </Button>

            <Button onClick={() => setIsMapFormVisible(true)} type="primary">
                {translateContent('vehicleTracking.text.showOnMap')}
            </Button>
        </>
    );

    return (
        <Card className={styles.whiteBG}>
            <Row gutter={20}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} className={styles.verticallyCentered}>
                    <Text strong>{translateContent('vehicleTracking.text.shipmentDetails')} {checkAndSetDefaultValue(formData?.vin, isLoading)} </Text>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} className={styles.buttonsGroupRight}>
                    {formData?.vin && checkAndSetDefaultValue(actionBtn, isLoading)}
                </Col>
            </Row>
            <Divider className={styles.marT20} />
            <Descriptions {...viewProps}>
                <Descriptions.Item label={translateContent('vehicleTracking.label.shipmentId')}>{checkAndSetDefaultValue(formData?.shipmentId, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('vehicleTracking.label.lrNumber')}>{checkAndSetDefaultValue(formData?.lrNumber, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('vehicleTracking.label.lrDate')}>{checkAndSetDefaultValue(formData?.lrDate, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('vehicleTracking.label.transporterName')}>{checkAndSetDefaultValue(formData?.transporterName, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('vehicleTracking.label.modeOfTransport')}>{checkAndSetDefaultValue(formData?.modeOfTransport, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('vehicleTracking.label.lastUpdatedLocation')}>{checkAndSetDefaultValue(formData?.lastUpdatedLocation, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('vehicleTracking.label.lastUpdatedDateAndTime')}>{checkAndSetDefaultValue(`${checkAndSetDefaultValue(formData?.lastUpdatedDateAndTime, isLoading, DATA_TYPE?.DATE?.key)} ${moment(formData?.lastUpdatedDateAndTime).format('LT')}`, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('vehicleTracking.label.oemInvoiceNumber')}>{checkAndSetDefaultValue(formData?.oemInvoiceNumber, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('vehicleTracking.label.oemInvoiceDate')}>{checkAndSetDefaultValue(formData?.oemInvoiceDate, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('vehicleTracking.label.shipmentStatus')}>{checkAndSetDefaultValue(formData?.shipmentStatus, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('vehicleTracking.label.currentLatitude')}>{checkAndSetDefaultValue(formData?.currentLatitude, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('vehicleTracking.label.currentLongitude')}>{checkAndSetDefaultValue(formData?.currentLongitude, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('vehicleTracking.label.etaDateAndTime')}>{checkAndSetDefaultValue(`${checkAndSetDefaultValue(formData?.etaDateAndTime, isLoading, DATA_TYPE?.DATE?.key)} ${moment(formData?.etaDateAndTime).format('LT')}`, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('vehicleTracking.label.shipmentDeliveryDateAndTime')}>{checkAndSetDefaultValue(`${checkAndSetDefaultValue(formData?.shipmentDeliveryDateAndTime, isLoading, DATA_TYPE?.DATE?.key)} ${moment(formData?.shipmentDeliveryDateAndTime).format('LT')}`, isLoading)}</Descriptions.Item>
            </Descriptions>
        </Card>
    );
};
