/*
 *   Copyright (c) 2024 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Descriptions } from 'antd';
import { translateContent } from 'utils/translateContent';
import { TAXI_NO_TAXI } from './fameSubsidryConstants';

export const ViewDetail = (props) => {
    const { formData, styles, showFields } = props;

    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 },
    };
    const ConsitionalFields = showFields && (
        <>
            <Descriptions.Item label={translateContent('centralFameSubsidy.label.percentageOnExShowRoomPrice')}>{formData?.percentageOnExShowRoomPrice + '%'}</Descriptions.Item>
            <Descriptions.Item label={translateContent('centralFameSubsidy.label.demandIncentive')}>{formData?.demandIncentive}</Descriptions.Item>
            <Descriptions.Item label={translateContent('centralFameSubsidy.label.totalAmount')}>{formData?.totalAmount}</Descriptions.Item>
        </>
    );
    return (
        <div className={styles.viewDrawerContainer}>
            <Descriptions {...viewProps}>
                <Descriptions.Item label={translateContent('commonModules.label.exchangeDetails.modelGroup')}>{formData?.modelGroupName || formData?.modelGroupCode}</Descriptions.Item>
                <Descriptions.Item label={translateContent('commonModules.label.exchangeDetails.variant')}>{formData?.variantName || formData?.variantCode}</Descriptions.Item>
                <Descriptions.Item label={translateContent('centralFameSubsidy.label.batterycapacity')}>{formData?.batteryCapacity + ' KVA'}</Descriptions.Item>
                <Descriptions.Item label={translateContent('centralFameSubsidy.label.taxiIndicator')}>{formData?.taxiIndicator === TAXI_NO_TAXI?.TAXI?.key ? 'Taxi' : 'Non taxi'}</Descriptions.Item>
                <Descriptions.Item label={translateContent('centralFameSubsidy.label.subsidyAmount')}>{formData?.subsidyAmount}</Descriptions.Item>
                {ConsitionalFields}
                <Descriptions.Item label={translateContent('centralFameSubsidy.label.activeIndicator')}>
                    <span className={formData?.activeIndicator ? styles.activeText : styles?.inactiveText}>{formData?.activeIndicator ? translateContent('global.label.yes') : translateContent('global.label.no')}</span>
                </Descriptions.Item>
            </Descriptions>
        </div>
    );
};
