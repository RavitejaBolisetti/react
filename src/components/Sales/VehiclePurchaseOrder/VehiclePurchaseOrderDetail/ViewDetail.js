/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Descriptions, Card } from 'antd';

import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { DATA_TYPE } from 'constants/dataType';

import styles from 'components/common/Common.module.css';

const ViewDetailMain = (props) => {
    const { formData, isLoading, selectedRecord } = props;
    console.log('viewselectedRecord', selectedRecord);
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
                    <Descriptions.Item label="Order Type">{checkAndSetDefaultValue(formData?.orderType, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="Purchase Order Number">{checkAndSetDefaultValue(formData?.purchaseOrderNumber, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="Purchase Order Date"> {checkAndSetDefaultValue(formData?.purchaseOrderDate, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                    <Descriptions.Item label="Purchase Order Status">{checkAndSetDefaultValue(formData?.purchaseOrderStatus, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="Dealer Code">{checkAndSetDefaultValue(formData?.dealerParentCode, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="Dealer Location"> {checkAndSetDefaultValue(formData?.dealerLocation, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="Purchase Cancel Date"> {checkAndSetDefaultValue(formData?.purchaseOrderCancelDate, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                    <Descriptions.Item label="SO Number">{checkAndSetDefaultValue(formData?.soNumber, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="SO Date">{checkAndSetDefaultValue(formData?.soDate, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                    <Descriptions.Item label="SO Status">{checkAndSetDefaultValue(formData?.soStatus, isLoading)}</Descriptions.Item>
                </Descriptions>
            </Card>

            <h4 className={styles.marB5}> Product Details</h4>
            <Card className={styles.ExchangeCard1}>
                <Descriptions {...viewProps}>
                    <Descriptions.Item label="Model">{checkAndSetDefaultValue(formData?.modelCode, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="Quantity">{checkAndSetDefaultValue(formData?.quantity, isLoading)}</Descriptions.Item>
                </Descriptions>
            </Card>
            <h4 className={styles.marB5}> Cancel Reason</h4>
            <Card className={styles.ExchangeCard1}>
                <Descriptions {...viewProps}>
                    <Descriptions.Item label="">{checkAndSetDefaultValue(formData?.cancelRemarks, isLoading)}</Descriptions.Item>
                </Descriptions>
            </Card>
        </>
    );
};

export const ViewDetail = ViewDetailMain;