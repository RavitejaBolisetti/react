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
    const { formData, isLoading, typeData, salesConsultantLov } = props;

    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };

    return (
        <Card className={styles.drawerCardView}>
            <Descriptions {...viewProps}>
                <Descriptions.Item label="Model Description">{checkAndSetDefaultValue(formData?.initialPromiseDeliveryDate, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                <Descriptions.Item label="VIN">{checkAndSetDefaultValue(formData?.custExpectedDeliveryDate, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                <Descriptions.Item label="Key Number">{checkAndSetDefaultValue(getCodeValue(typeData?.SALE_TYP, formData?.saleType), isLoading)}</Descriptions.Item>
                <Descriptions.Item label="MFG Date">{checkAndSetDefaultValue(getCodeValue(typeData?.PRC_TYP, formData?.priceType), isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Received On">{checkAndSetDefaultValue(formData?.bookingAmount, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Vehicle Cost">{checkAndSetDefaultValue(getCodeValue(salesConsultantLov, formData?.saleConsultant), isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Demo Vehicle">{checkAndSetDefaultValue(formData?.specialRequest, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Vehicle Status">{checkAndSetDefaultValue(formData?.placeOfRegistration, isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Physical Status">{checkAndSetDefaultValue(getCodeValue(typeData?.DLVR_AT, formData?.deliveryAt), isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Shortage">{checkAndSetDefaultValue(getCodeValue(typeData?.RFRL, formData?.referral), isLoading)}</Descriptions.Item>
                <Descriptions.Item label="Vehicle Receipt Checklist No.">{checkAndSetDefaultValue(formData?.mitraType, isLoading)}</Descriptions.Item>
            </Descriptions>
        </Card>
    );
};

export const ViewDetail = ViewDetailMain;
