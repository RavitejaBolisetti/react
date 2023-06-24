/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Card, Descriptions } from 'antd';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';

const ViewDetailMain = (props) => {
    const { styles, formData, isLoading } = props;

    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };

    return (
        <Card className={styles.drawerCardView}>
            <Descriptions {...viewProps}>
                <Descriptions.Item label="Customer ID">{checkAndSetDefaultValue(formData?.customerId, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Customer Name">{checkAndSetDefaultValue(formData?.customerName, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Make">{checkAndSetDefaultValue(formData?.make, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Model Group">{checkAndSetDefaultValue(formData?.modelGroup, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Variant">{checkAndSetDefaultValue(formData?.variant, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Old Reg. Number">{checkAndSetDefaultValue(formData?.oldRegistrationNumber, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Old Chassis Number">{checkAndSetDefaultValue(formData?.oldChessisNumber, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Relationship">{checkAndSetDefaultValue(formData?.relationship, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Month of Registration">{checkAndSetDefaultValue(formData?.monthOfRegistration, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Year of Registration">{checkAndSetDefaultValue(formData?.yearOfRegistration, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Usage">{checkAndSetDefaultValue(formData?.usage, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Scheme Name">{checkAndSetDefaultValue(formData?.schemeName, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Scheme Amount">{checkAndSetDefaultValue(formData?.schemeAmount, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="KM">{checkAndSetDefaultValue(formData?.kilometer, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Customer Expected Price">{checkAndSetDefaultValue(formData?.customerExpectedPrice, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Procurement Price">{checkAndSetDefaultValue(formData?.procurementPrice, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Hypothecated To">{checkAndSetDefaultValue(formData?.hypothicatedTo, isLoading)}</Descriptions.Item>
            </Descriptions>
        </Card>
    );
};

export const ViewDetail = ViewDetailMain;
