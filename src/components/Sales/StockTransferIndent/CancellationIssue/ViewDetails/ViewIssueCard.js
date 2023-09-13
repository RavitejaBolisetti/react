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
import { PARAM_MASTER } from 'constants/paramMaster';
import { getCodeValue } from 'utils/getCodeValue';

export const ViewIssueCard = ({ formData, isLoading = false, typeData }) => {
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };
    const viewData = {
        ...formData,
        issueDate: converDateDayjs(formData?.issueDate),
        oemInvoiceDate: converDateDayjs(formData?.oemInvoiceDate),
        grnDate: converDateDayjs(formData?.grnDate),
        issueStatus: typeData[PARAM_MASTER?.ISS_STS?.id]?.find((i) => i?.key === formData?.issueStatus)?.value,
    };
    return (
        <Card className={styles.drawerCardView}>
            <Descriptions {...viewProps}>
                <Descriptions.Item label="ST Issue Note No.">{checkAndSetDefaultValue(viewData?.issueNumber, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="ST Issue Note Date">{checkAndSetDefaultValue(viewData?.issueDate, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="ST Issue Note Status">{checkAndSetDefaultValue(viewData?.issueStatus, isLoading)}</Descriptions.Item>
            </Descriptions>
            <Descriptions {...viewProps}>
                <Descriptions.Item label="Model Description">{checkAndSetDefaultValue(viewData?.modelDescription, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="VIN">{checkAndSetDefaultValue(viewData?.vin, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Engine No.">{checkAndSetDefaultValue(viewData?.engineNumber, isLoading)}</Descriptions.Item>
            </Descriptions>
            <Descriptions {...viewProps}>
                <Descriptions.Item label="OEM Incoice No.">{checkAndSetDefaultValue(viewData?.oemInvoiceNumber, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="OEM Incoice Date">{checkAndSetDefaultValue(viewData?.oemInvoiceDate, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="GRN No.">{checkAndSetDefaultValue(viewData?.grnNumber, isLoading)}</Descriptions.Item>
            </Descriptions>
            <Descriptions {...viewProps}>
                <Descriptions.Item label="GRN Date">{checkAndSetDefaultValue(viewData?.grnDate, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Issue Charges">{checkAndSetDefaultValue(viewData?.issueCharges, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Net Dealer Price">{checkAndSetDefaultValue(viewData?.netDealerPrice, isLoading)}</Descriptions.Item>
            </Descriptions>
        </Card>
    );
};
