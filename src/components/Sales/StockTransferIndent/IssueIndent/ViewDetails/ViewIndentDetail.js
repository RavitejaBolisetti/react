/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Card, Descriptions } from 'antd';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { converDateDayjs } from 'utils/formatDateTime';
import styles from 'assets/sass/app.module.scss';
import { PARAM_MASTER } from 'constants/paramMaster';

const ViewIndentDetailMain = (props) => {
    const { formData, isLoading = false, typeData } = props;

    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 4, lg: 4, xl: 4, xxl: 4 },
    };
    const viewData = {
        ...formData,
        indentDate: converDateDayjs(formData?.indentDate),
        indentStatus: typeData[PARAM_MASTER?.INDNT_RAS?.id]?.find((i) => i?.key === formData?.indentStatus)?.value || '-',
    };

    return (
        <Card>
            <Descriptions {...viewProps}>
                <Descriptions.Item label="Indent Number">{checkAndSetDefaultValue(viewData?.indentNumber, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Indent Date">{checkAndSetDefaultValue(viewData?.indentDate, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Indent Status">{checkAndSetDefaultValue(viewData?.indentStatus, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Indent To Location">{checkAndSetDefaultValue(viewData?.indentToLocation, isLoading)}</Descriptions.Item>
            </Descriptions>
            <Descriptions {...viewProps}>
                <Descriptions.Item label="Model Description">{checkAndSetDefaultValue(viewData?.modelDescription, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Model Code">{checkAndSetDefaultValue(viewData?.modelCode, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Requested Quantity">{checkAndSetDefaultValue(String(viewData?.requestedQuantity), isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Cancelled Quantity">{checkAndSetDefaultValue(String(viewData?.cancelledQuantity), isLoading)}</Descriptions.Item>
            </Descriptions>
            <Descriptions {...viewProps}>
                <Descriptions.Item label="Issued & not received Quantity">{checkAndSetDefaultValue(String(viewData?.issuedAndNotReceivedQuantity), isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Received Quantity">{checkAndSetDefaultValue(String(viewData?.receivedQuantity), isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Balance Quantity">{checkAndSetDefaultValue(String(viewData?.balancedQuantity), isLoading)}</Descriptions.Item>
            </Descriptions>
        </Card>
    );
};

export const ViewIndentDetail = ViewIndentDetailMain;
