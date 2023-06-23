/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Card, Descriptions } from 'antd';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';

const ViewDetailMain = (props) => {
    const { insuranceData } = props;
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };

    return (
        <Card>
            <Descriptions {...viewProps}>
                <Descriptions.Item label="Insurance Company">{checkAndSetDefaultValue(insuranceData?.insuranceCompany)}</Descriptions.Item>
                <Descriptions.Item label="Insurance Cover Note">{checkAndSetDefaultValue(insuranceData?.insuranceCoverNote)}</Descriptions.Item>
                <Descriptions.Item label="Insurance Amount">{checkAndSetDefaultValue(insuranceData?.insuranceAmount)}</Descriptions.Item>
                <Descriptions.Item label="Date">{checkAndSetDefaultValue(insuranceData?.insuranceDate)}</Descriptions.Item>
                <Descriptions.Item label="Registration Number">{checkAndSetDefaultValue(insuranceData?.registrationNumber)}</Descriptions.Item>
            </Descriptions>
        </Card>
    );
};

export const ViewDetail = ViewDetailMain;
