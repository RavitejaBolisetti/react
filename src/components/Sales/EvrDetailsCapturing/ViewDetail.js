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
                    <Descriptions.Item label={translateContent('evrDetailsCapturing.label.vin')}>{checkAndSetDefaultValue(formData?.vin, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('evrDetailsCapturing.label.modelGroup')}>{checkAndSetDefaultValue(formData?.modelGroupCode, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('evrDetailsCapturing.label.modelCode')}>{checkAndSetDefaultValue(formData?.modelCode, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('evrDetailsCapturing.label.modelDescription')}>{checkAndSetDefaultValue(formData?.modelDescription, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('evrDetailsCapturing.label.grnId')}>{checkAndSetDefaultValue(formData?.grnId, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('evrDetailsCapturing.label.grnDate')}>{checkAndSetDefaultValue(formData?.grnDate, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('evrDetailsCapturing.label.grnStatus')}>{checkAndSetDefaultValue(getCodeValue(grnStatusType, formData?.grnStatus), isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('evrDetailsCapturing.label.vehicleStatus')}>{checkAndSetDefaultValue(formData?.vehicleStatus, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('evrDetailsCapturing.label.ageInDays')}>{checkAndSetDefaultValue(formData?.ageInDays, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('evrDetailsCapturing.label.lastChargeDate')}>{checkAndSetDefaultValue(formData?.lastChargeDate, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('evrDetailsCapturing.label.chargingDueDate')}>{checkAndSetDefaultValue(formData?.chargingDueDate, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('evrDetailsCapturing.label.chargingStatus')}>{checkAndSetDefaultValue(formData?.chargingStatus, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('evrDetailsCapturing.label.remarks')}>{checkAndSetDefaultValue(formData?.remarks, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('evrDetailsCapturing.label.status')}>{checkAndSetDefaultValue(formData?.chargeIndicator ? translateContent('evrDetailsCapturing.label.charged') : translateContent('evrDetailsCapturing.label.unCharged'), isLoading)}</Descriptions.Item>
                </Descriptions>
            </Card>
        </div>
    );
};

export const ViewDetail = ViewDetailMain;
