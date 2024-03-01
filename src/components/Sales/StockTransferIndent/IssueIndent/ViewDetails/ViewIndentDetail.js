/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Card, Descriptions } from 'antd';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { converDateDayjs } from 'utils/formatDateTime';
import { PARAM_MASTER } from 'constants/paramMaster';
import { translateContent } from 'utils/translateContent';

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
                <Descriptions.Item label={translateContent('stockTransferIndent.issueIndent.viewDetails.label.indentNumber')}>{checkAndSetDefaultValue(viewData?.indentNumber, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('stockTransferIndent.issueIndent.viewDetails.label.indentDate')}>{checkAndSetDefaultValue(viewData?.indentDate, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('stockTransferIndent.issueIndent.viewDetails.label.indentStatus')}>{checkAndSetDefaultValue(viewData?.indentStatus, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('stockTransferIndent.issueIndent.viewDetails.label.indentToLocation')}>{checkAndSetDefaultValue(viewData?.indentToLocation, isLoading)}</Descriptions.Item>
            </Descriptions>
            <Descriptions {...viewProps}>
                <Descriptions.Item label={translateContent('stockTransferIndent.issueIndent.viewDetails.label.modelDescription')}>{checkAndSetDefaultValue(viewData?.modelDescription, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('stockTransferIndent.issueIndent.viewDetails.label.modelCode')}>{checkAndSetDefaultValue(viewData?.modelCode, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('stockTransferIndent.issueIndent.viewDetails.label.requestedQuantity')}>{checkAndSetDefaultValue(String(viewData?.requestedQuantity), isLoading)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('stockTransferIndent.issueIndent.viewDetails.label.cancelledQuantity')}>{checkAndSetDefaultValue(String(viewData?.cancelledQuantity), isLoading)}</Descriptions.Item>
            </Descriptions>
            <Descriptions {...viewProps}>
                <Descriptions.Item label={translateContent('stockTransferIndent.issueIndent.viewDetails.label.issuedAndNotReceivedQuantity')}>{checkAndSetDefaultValue(String(viewData?.issuedAndNotReceivedQuantity), isLoading)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('stockTransferIndent.issueIndent.viewDetails.label.receivedQuantity')}>{checkAndSetDefaultValue(String(viewData?.receivedQuantity), isLoading)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('stockTransferIndent.issueIndent.viewDetails.label.balancedQuantity')}>{checkAndSetDefaultValue(String(viewData?.balancedQuantity), isLoading)}</Descriptions.Item>
            </Descriptions>
        </Card>
    );
};

export const ViewIndentDetail = ViewIndentDetailMain;
