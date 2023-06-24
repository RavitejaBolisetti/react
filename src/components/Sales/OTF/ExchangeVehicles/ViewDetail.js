/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Card, Descriptions } from 'antd';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';

const ViewDetailMain = (props) => {
    const { styles, formData } = props;

    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };

    return (
        <Card className={styles.drawerCardView}>
            <Descriptions {...viewProps}>
                <Descriptions.Item label="Customer ID">{checkAndSetDefaultValue(formData?.customerId)}</Descriptions.Item>
                <Descriptions.Item label="Customer Name">{checkAndSetDefaultValue(formData?.customerName)}</Descriptions.Item>
                <Descriptions.Item label="Make">{checkAndSetDefaultValue(formData?.make)}</Descriptions.Item>
                <Descriptions.Item label="Model Group">{checkAndSetDefaultValue(formData?.modelGroup)}</Descriptions.Item>
                <Descriptions.Item label="Variant">{checkAndSetDefaultValue(formData?.variant)}</Descriptions.Item>
                <Descriptions.Item label="Old Reg. Number">{checkAndSetDefaultValue(formData?.oldRegistrationNumber)}</Descriptions.Item>
                <Descriptions.Item label="Old Chassis Number">{checkAndSetDefaultValue(formData?.oldChessisNumber)}</Descriptions.Item>
                <Descriptions.Item label="Relationship">{checkAndSetDefaultValue(formData?.relationship)}</Descriptions.Item>
                <Descriptions.Item label="Month of Registration">{checkAndSetDefaultValue(formData?.monthOfRegistration)}</Descriptions.Item>
                <Descriptions.Item label="Year of Registration">{checkAndSetDefaultValue(formData?.yearOfRegistration)}</Descriptions.Item>
                <Descriptions.Item label="Usage">{checkAndSetDefaultValue(formData?.usage)}</Descriptions.Item>
                <Descriptions.Item label="Scheme Name">{checkAndSetDefaultValue(formData?.schemeName)}</Descriptions.Item>
                <Descriptions.Item label="Scheme Amount">{checkAndSetDefaultValue(formData?.schemeAmount)}</Descriptions.Item>
                <Descriptions.Item label="KM">{checkAndSetDefaultValue(formData?.kilometer)}</Descriptions.Item>
                <Descriptions.Item label="Customer Expected Price">{checkAndSetDefaultValue(formData?.customerExpectedPrice)}</Descriptions.Item>
                <Descriptions.Item label="Procurement Price">{checkAndSetDefaultValue(formData?.procurementPrice)}</Descriptions.Item>
                <Descriptions.Item label="Hypothecated To">{checkAndSetDefaultValue(formData?.hypothicatedTo)}</Descriptions.Item>
            </Descriptions>
        </Card>
    );
};

export const ViewDetail = ViewDetailMain;
