/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Descriptions, Card } from 'antd';

import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { DATA_TYPE } from 'constants/dataType';
import { translateContent } from 'utils/translateContent';

import styles from 'assets/sass/app.module.scss';

const ViewDetailMain = (props) => {
    const { formData, isLoading } = props;
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 2, lg: 2, xl: 2, xxl: 2 },
    };

    return (
        <>
            <Card className={styles.ExchangeCard1}>
                <Descriptions {...viewProps}>
                    <Descriptions.Item label={translateContent('vehiclePurchaseOrder.VehiclePurchaseOrderDetail.label.orderType')}>{checkAndSetDefaultValue(formData?.orderType, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('vehiclePurchaseOrder.VehiclePurchaseOrderDetail.label.purchaseOrderNumber')}>{checkAndSetDefaultValue(formData?.purchaseOrderNumber, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('vehiclePurchaseOrder.VehiclePurchaseOrderDetail.label.purchaseOrderDate')}> {checkAndSetDefaultValue(formData?.purchaseOrderDate, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('vehiclePurchaseOrder.VehiclePurchaseOrderDetail.label.purchaseOrderStatus')}>{checkAndSetDefaultValue(formData?.purchaseOrderStatus, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('vehiclePurchaseOrder.VehiclePurchaseOrderDetail.label.dealerCode')}>{checkAndSetDefaultValue(formData?.dealerParentCode, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('vehiclePurchaseOrder.VehiclePurchaseOrderDetail.label.dealerLocation')}> {checkAndSetDefaultValue(formData?.dealerLocation, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('vehiclePurchaseOrder.VehiclePurchaseOrderDetail.label.purchaseOrderCancelDate')}> {checkAndSetDefaultValue(formData?.purchaseOrderCancelDate, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('vehiclePurchaseOrder.VehiclePurchaseOrderDetail.label.soNo')}>{checkAndSetDefaultValue(formData?.soNumber, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('vehiclePurchaseOrder.VehiclePurchaseOrderDetail.label.soDate')}>{checkAndSetDefaultValue(formData?.soDate, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('vehiclePurchaseOrder.VehiclePurchaseOrderDetail.label.soStatus')}>{checkAndSetDefaultValue(formData?.soStatus, isLoading)}</Descriptions.Item>
                </Descriptions>
            </Card>

            <h4 className={styles.marB5}> Product Details</h4>
            <Card className={styles.ExchangeCard1}>
                <Descriptions {...viewProps}>
                    <Descriptions.Item label={translateContent('vehiclePurchaseOrder.VehiclePurchaseOrderDetail.label.modal')}>{checkAndSetDefaultValue(formData?.modelCode, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('vehiclePurchaseOrder.VehiclePurchaseOrderDetail.label.quantity')}>{checkAndSetDefaultValue(formData?.quantity, isLoading)}</Descriptions.Item>
                </Descriptions>
            </Card>
            {formData?.cancelRemarks != null && (
                <>
                    <h4 className={styles.marB5}> {translateContent('vehiclePurchaseOrder.VehiclePurchaseOrderDetail.heading.cancelReason')}</h4>
                    <Card className={styles.ExchangeCard1}>
                        <Descriptions {...viewProps}>
                            <Descriptions.Item label="">{checkAndSetDefaultValue(formData?.cancelRemarks, isLoading)}</Descriptions.Item>
                        </Descriptions>
                    </Card>
                </>
            )}
        </>
    );
};

export const ViewDetail = ViewDetailMain;
