/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Card, Descriptions } from 'antd';
import { converDateDayjs } from 'utils/formatDateTime';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import styles from 'assets/sass/app.module.scss';

export const ViewIssueCard = ({ formData, isLoading = false }) => {
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };
    const viewData = {
        indentLocation: formData?.indentLocation,
        indentNumber: formData?.indentNumber ?? 'NA',
        indentDate: converDateDayjs(formData?.indentDate) ?? 'NA',
        indentStatus: formData?.indentStatus,
        requestedBy: formData?.requestedBy,
        remarks: formData?.remarks,
    };
    return (
        <Card className={styles.drawerCardView}>
            <Descriptions {...viewProps}>
                <Descriptions.Item label="ST Issue Note No.">{checkAndSetDefaultValue(viewData?.indentLocation, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="ST Issue Note Date">{checkAndSetDefaultValue(viewData?.indentNumber, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="ST Issue Note Status">{checkAndSetDefaultValue(viewData?.indentDate, isLoading)}</Descriptions.Item>
            </Descriptions>
            <Descriptions {...viewProps}>
                <Descriptions.Item label="Model Description">{checkAndSetDefaultValue(viewData?.indentStatus, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="VIN">{checkAndSetDefaultValue(viewData?.indentLocation, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Engine No.">{checkAndSetDefaultValue(viewData?.indentNumber, isLoading)}</Descriptions.Item>
            </Descriptions>
            <Descriptions {...viewProps}>
                <Descriptions.Item label="OEM Incoice No.">{checkAndSetDefaultValue(viewData?.indentDate, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="OEM Incoice Date">{checkAndSetDefaultValue(viewData?.indentStatus, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="GRN No.">{checkAndSetDefaultValue(viewData?.requestedBy, isLoading)}</Descriptions.Item>
            </Descriptions>
            <Descriptions {...viewProps}>
                <Descriptions.Item label="GRN Date">{checkAndSetDefaultValue(viewData?.indentDate, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Issue Charges">{checkAndSetDefaultValue(viewData?.indentStatus, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Net Dealer Price">{checkAndSetDefaultValue(viewData?.requestedBy, isLoading)}</Descriptions.Item>
            </Descriptions>
        </Card>
    );
};
