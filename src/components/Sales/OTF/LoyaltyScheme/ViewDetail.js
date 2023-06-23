/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Card, Descriptions } from 'antd';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';

const ViewDetailMain = (props) => {
    const { styles, customerForm } = props;
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };

    return (
        <Card className={styles.drawerCardView} style={{ backgroundColor: '#F2F2F2', borderRadius: '8px' }}>
            <Descriptions {...viewProps}>
                <Descriptions.Item label="Customer ID">{checkAndSetDefaultValue(customerForm?.customerCode)}</Descriptions.Item>
                <Descriptions.Item label="Customer Name">{checkAndSetDefaultValue(customerForm?.customerName)}</Descriptions.Item>
                <Descriptions.Item label="Make">{checkAndSetDefaultValue(customerForm?.make)}</Descriptions.Item>
                <Descriptions.Item label="Model Group">{checkAndSetDefaultValue(customerForm?.vehicleModelGroup)}</Descriptions.Item>
                <Descriptions.Item label="Variant">{checkAndSetDefaultValue(customerForm?.variantName)}</Descriptions.Item>
                <Descriptions.Item label="Old Reg. Number">{checkAndSetDefaultValue(customerForm?.registrationNumber)}</Descriptions.Item>
                <Descriptions.Item label="Old Chassis Number">{checkAndSetDefaultValue(customerForm?.oldChassisNumber)}</Descriptions.Item>
                <Descriptions.Item label="Date of Birth">{checkAndSetDefaultValue(customerForm?.customerDOB)}</Descriptions.Item>
                <Descriptions.Item label="Relationship">{checkAndSetDefaultValue(customerForm?.relationName)}</Descriptions.Item>
                <Descriptions.Item label="Year of Registration">{checkAndSetDefaultValue(customerForm?.registrationYear)}</Descriptions.Item>
                <Descriptions.Item label="Month of Registration">{checkAndSetDefaultValue(customerForm?.registrationMonth)}</Descriptions.Item>
                <Descriptions.Item label="Usage">{checkAndSetDefaultValue(customerForm?.vehicleUsage)}</Descriptions.Item>
                <Descriptions.Item label="Scheme Name">{checkAndSetDefaultValue(customerForm?.schemeName)}</Descriptions.Item>
                <Descriptions.Item label="Scheme Amount">{checkAndSetDefaultValue(customerForm?.schemeAmount)}</Descriptions.Item>
                <Descriptions.Item label="Remarks">{checkAndSetDefaultValue(customerForm?.remarks)}</Descriptions.Item>
            </Descriptions>
        </Card>
    );
};

export const ViewDetail = ViewDetailMain;
