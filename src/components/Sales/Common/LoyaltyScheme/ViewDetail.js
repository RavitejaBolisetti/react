/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Card, Descriptions } from 'antd';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { prepareCaption } from 'utils/prepareCaption';

const ViewDetailMain = (props) => {
    const { styles, customerForm, isLoading } = props;

    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };

    return (
        <Card>
            <Descriptions {...viewProps} title={prepareCaption('Vehicle Details')}>
                <Descriptions.Item label="Old Reg. Number">{checkAndSetDefaultValue(customerForm?.registrationNumber, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Make">{checkAndSetDefaultValue(customerForm?.make, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Model Group">{checkAndSetDefaultValue(customerForm?.vehicleModelGroup, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Variant">{checkAndSetDefaultValue(customerForm?.variantName, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Usage">{checkAndSetDefaultValue(customerForm?.vehicleUsage, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Year of Registration">{checkAndSetDefaultValue(customerForm?.registrationYear, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Month of Registration">{checkAndSetDefaultValue(customerForm?.registrationMonth, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Old Chassis Number">{checkAndSetDefaultValue(customerForm?.oldChassisNumber, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Remarks">{checkAndSetDefaultValue(customerForm?.remarks, isLoading)}</Descriptions.Item>
            </Descriptions>
            <Descriptions {...viewProps} title={prepareCaption('Customer Details')}>
                <Descriptions.Item label="Customer Name">{checkAndSetDefaultValue(customerForm?.customerName, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Relationship">{checkAndSetDefaultValue(customerForm?.relationName, isLoading)}</Descriptions.Item>
            </Descriptions>
            <Descriptions {...viewProps} title={prepareCaption('Scheme')}>
                <Descriptions.Item label="Scheme Name">{checkAndSetDefaultValue(customerForm?.schemeName, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Scheme Amount">{checkAndSetDefaultValue(customerForm?.schemeAmount, isLoading)}</Descriptions.Item>
            </Descriptions>
        </Card>
    );
};

export const ViewDetail = ViewDetailMain;
