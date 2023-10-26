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

import styles from 'assets/sass/app.module.scss';

const ViewDetailMain = (props) => {
    const { formData, isLoading, grnStatusType } = props;
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };

    return (
        <div className={styles.viewDrawerContainer}>
            <Card>
                <Descriptions {...viewProps}>
                    <Descriptions.Item label="VIN">{checkAndSetDefaultValue(formData?.vin, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="Model Group">{checkAndSetDefaultValue(formData?.modelGroupCode, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="Model Code">{checkAndSetDefaultValue(formData?.modelCode, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="Model Description">{checkAndSetDefaultValue(formData?.modelDescription, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="GRN ID">{checkAndSetDefaultValue(formData?.grnId, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="GRN Date">{checkAndSetDefaultValue(formData?.grnDate, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                    <Descriptions.Item label="GRN Status">{checkAndSetDefaultValue(getCodeValue(grnStatusType, formData?.grnStatus), isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="Vehicle Status">{checkAndSetDefaultValue(formData?.vehicleStatus, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="Age In Days">{checkAndSetDefaultValue(formData?.ageInDays, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="Date of Last Charge">{checkAndSetDefaultValue(formData?.lastChargeDate, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                    <Descriptions.Item label="Charging Due Date">{checkAndSetDefaultValue(formData?.chargingDueDate, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                    <Descriptions.Item label="Charging Status">{checkAndSetDefaultValue(formData?.chargingStatus, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="Remarks">{checkAndSetDefaultValue(formData?.remarks, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="Status">{checkAndSetDefaultValue(formData?.chargeIndicator ? 'Charged' : 'UnCharged', isLoading)}</Descriptions.Item>
                </Descriptions>
            </Card>
        </div>
    );
};

export const ViewDetail = ViewDetailMain;
