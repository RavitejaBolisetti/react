/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Card, Descriptions } from 'antd';
import styles from 'components/common/Common.module.css';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { getCodeValue } from 'utils/getCodeValue';
import { DATA_TYPE } from 'constants/dataType';

const ViewDetailMain = (props) => {
    const { formData, isLoading, typeData } = props;

    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };

    return (
        <Card className={styles.drawerCardView}>
            <Descriptions {...viewProps}>
                <Descriptions.Item label="Supplier Type">{checkAndSetDefaultValue(formData?.supplierType, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Supplier Name">{checkAndSetDefaultValue(formData?.supplierName, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Supplier Invoice No.">{checkAndSetDefaultValue(formData?.supplierInvoiceNumber, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Supplier Invoice Date">{checkAndSetDefaultValue(formData?.supplierInvoiceDate, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                <Descriptions.Item label="Road Permit Number">{checkAndSetDefaultValue(formData?.bookingAmount, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Actual Dispatch Date">{checkAndSetDefaultValue(formData?.actualDispatchDate, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                <Descriptions.Item label="Total Invoice Amount">{checkAndSetDefaultValue(formData?.totalInvoiceAmount, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Lorry Receipt No.">{checkAndSetDefaultValue(formData?.lorryReceiptNumber, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Transporter">{checkAndSetDefaultValue(formData?.transpoter, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Supplier GST Number">{checkAndSetDefaultValue(formData?.supplierGstNumber, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Geo Fencing Date & Time">{checkAndSetDefaultValue(formData?.geoFencingDate, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
            </Descriptions>
        </Card>
    );
};

export const ViewDetail = ViewDetailMain;
