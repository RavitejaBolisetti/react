/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Card, Descriptions } from 'antd';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { translateContent } from 'utils/translateContent';

const ViewDetailMain = (props) => {
    const { formData, isLoading } = props;

    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };
    return (
        <Card>
            <Descriptions {...viewProps}>
                <Descriptions.Item label={translateContent('vehicleDeliveryNote.customerDetails.label.customerId')}>{checkAndSetDefaultValue(formData?.customerId, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('vehicleDeliveryNote.customerDetails.label.customerType')}>{checkAndSetDefaultValue(formData?.customerType, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('vehicleDeliveryNote.customerDetails.label.customerName')}>{checkAndSetDefaultValue(formData?.customerName, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('vehicleDeliveryNote.customerDetails.label.customerPhoneNumber')}>{checkAndSetDefaultValue(formData?.customerPhoneNumber, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('vehicleDeliveryNote.customerDetails.label.customerAddress')}>{checkAndSetDefaultValue(formData?.customerAddress, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('vehicleDeliveryNote.customerDetails.label.customerCity')}>{checkAndSetDefaultValue(formData?.customerCity, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('vehicleDeliveryNote.customerDetails.label.district')}>{checkAndSetDefaultValue(formData?.district, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('vehicleDeliveryNote.customerDetails.label.state')}>{checkAndSetDefaultValue(formData?.state, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('vehicleDeliveryNote.customerDetails.label.pinCode')}>{checkAndSetDefaultValue(formData?.pinCode, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('vehicleDeliveryNote.customerDetails.label.email')}>{checkAndSetDefaultValue(formData?.email, isLoading)}</Descriptions.Item>
            </Descriptions>
        </Card>
    );
};

export const ViewDetail = ViewDetailMain;
