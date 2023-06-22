/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Card, Descriptions, Skeleton } from 'antd';

const ViewDetailMain = (props) => {
    const { styles, customerForm, isLoyaltySchemeDataLoaded } = props;
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };

    return (
        <Card className={styles.drawerCardView} style={{ backgroundColor: '#F2F2F2', borderRadius: '8px' }}>
            <Descriptions {...viewProps}>
                <Descriptions.Item label="Customer ID">{customerForm?.customerCode}</Descriptions.Item>
                <Descriptions.Item label="Customer Name">{customerForm?.customerName}</Descriptions.Item>
                <Descriptions.Item label="Make">{customerForm?.make}</Descriptions.Item>
                <Descriptions.Item label="Model Group">{customerForm?.vehicleModelGroup}</Descriptions.Item>
                <Descriptions.Item label="Variant">{customerForm?.variantName}</Descriptions.Item>
                <Descriptions.Item label="Old Reg. Number">{customerForm?.registrationNumber}</Descriptions.Item>
                <Descriptions.Item label="Old Chassis Number">{customerForm?.oldChassisNumber}</Descriptions.Item>
                <Descriptions.Item label="Date of Birth">{customerForm?.customerDOB}</Descriptions.Item>
                <Descriptions.Item label="Relationship">{customerForm?.relationName}</Descriptions.Item>
                <Descriptions.Item label="Year of Registration">{customerForm?.registrationYear}</Descriptions.Item>
                <Descriptions.Item label="Month of Registration">{customerForm?.registrationMonth}</Descriptions.Item>
                <Descriptions.Item label="Usage">{customerForm?.vehicleUsage}</Descriptions.Item>
                <Descriptions.Item label="Scheme Name">{customerForm?.schemeName}</Descriptions.Item>
                <Descriptions.Item label="Scheme Amount">{customerForm?.schemeAmount}</Descriptions.Item>
                <Descriptions.Item label="Remarks">{customerForm?.remarks}</Descriptions.Item>
            </Descriptions>
        </Card>
    );
};

export const ViewDetail = ViewDetailMain;
