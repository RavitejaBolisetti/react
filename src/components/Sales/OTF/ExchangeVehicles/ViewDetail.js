/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Card, Descriptions } from 'antd';

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
                <Descriptions.Item label="Customer ID">{formData?.customerId}</Descriptions.Item>
                <Descriptions.Item label="Customer Name">{formData?.customerName}</Descriptions.Item>
                <Descriptions.Item label="Make">{formData?.make}</Descriptions.Item>
                <Descriptions.Item label="Model Group">{formData?.modelGroup}</Descriptions.Item>
                <Descriptions.Item label="Variant">{formData?.variant}</Descriptions.Item>
                <Descriptions.Item label="Old Reg. Number">{formData?.oldRegistrationNumber}</Descriptions.Item>
                <Descriptions.Item label="Old Chassis Number">{formData?.oldChessisNumber}</Descriptions.Item>
                <Descriptions.Item label="Relationship">{formData?.relationship}</Descriptions.Item>
                <Descriptions.Item label="Month of Registration">{formData?.monthOfRegistration}</Descriptions.Item>
                <Descriptions.Item label="Year of Registration">{formData?.yearOfRegistration}</Descriptions.Item>
                <Descriptions.Item label="Usage">{formData?.usage}</Descriptions.Item>
                <Descriptions.Item label="Scheme Name">{formData?.schemeName}</Descriptions.Item>
                <Descriptions.Item label="Scheme Amount">{formData?.schemeAmount}</Descriptions.Item>
                <Descriptions.Item label="KM">{formData?.kilometer}</Descriptions.Item>
                <Descriptions.Item label="Customer Expected Price">{formData?.customerExpectedPrice}</Descriptions.Item>
                <Descriptions.Item label="Procurement Price">{formData?.procurementPrice}</Descriptions.Item>
                <Descriptions.Item label="Hypothecated To">{formData?.hypothicatedTo}</Descriptions.Item>
            </Descriptions>
        </Card>
    );
};

export const ViewDetail = ViewDetailMain;
