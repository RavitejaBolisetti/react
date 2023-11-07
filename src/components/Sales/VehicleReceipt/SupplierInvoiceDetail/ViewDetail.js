/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Card, Descriptions } from 'antd';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { DATA_TYPE } from 'constants/dataType';
import { getCodeValue } from 'utils/getCodeValue';
import { translateContent } from 'utils/translateContent';

const ViewDetailMain = (props) => {
    const { formData, supplierTypeData, isLoading } = props;

    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };

    return (
        <Card>
            <Descriptions {...viewProps}>
                <Descriptions.Item label={translateContent('vehicleReceipt.label.supplierInvoiceDetails.supplierType')}>{checkAndSetDefaultValue(getCodeValue(supplierTypeData, formData?.supplierType), isLoading)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('vehicleReceipt.label.supplierInvoiceDetails.supplierName')}>{checkAndSetDefaultValue(formData?.supplierName, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('vehicleReceipt.label.supplierInvoiceDetails.supplierInvoiceNumber')}>{checkAndSetDefaultValue(formData?.supplierInvoiceNumber, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('vehicleReceipt.label.supplierInvoiceDetails.supplierInvoiceDate')}>{checkAndSetDefaultValue(formData?.supplierInvoiceDate, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('vehicleReceipt.label.supplierInvoiceDetails.roadPermitNumber')}>{checkAndSetDefaultValue(formData?.roadPermitNumber, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('vehicleReceipt.label.supplierInvoiceDetails.actualDispatchDate')}>{checkAndSetDefaultValue(formData?.actualDispatchDate, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('vehicleReceipt.label.supplierInvoiceDetails.totalInvoiceAmount')}>{checkAndSetDefaultValue(formData?.totalInvoiceAmount, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('vehicleReceipt.label.supplierInvoiceDetails.lorryReceiptNumber')}>{checkAndSetDefaultValue(formData?.lorryReceiptNumber, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('vehicleReceipt.label.supplierInvoiceDetails.transporter')}>{checkAndSetDefaultValue(formData?.transpoter, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('vehicleReceipt.label.supplierInvoiceDetails.supplierGstNumber')}>{checkAndSetDefaultValue(formData?.supplierGstNumber, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('vehicleReceipt.label.supplierInvoiceDetails.geoFencingDateAndTime')}>{checkAndSetDefaultValue(formData?.geoFencingDate, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
            </Descriptions>
        </Card>
    );
};

export const ViewDetail = ViewDetailMain;
