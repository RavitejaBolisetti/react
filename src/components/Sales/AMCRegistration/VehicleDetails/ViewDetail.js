/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Descriptions, Divider } from 'antd';

import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { DATA_TYPE } from 'constants/dataType';
import { translateContent } from 'utils/translateContent';

const ViewDetailBase = (props) => {
    const { formData, styles } = props;
    const { isLoading } = props;
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xxl: 3, xl: 3, lg: 3, md: 3, sm: 1, xs: 1 },
    };

    return (
        <div className={styles.viewDrawerContainer}>
            <>
                <Descriptions {...viewProps}>
                    <Descriptions.Item label={translateContent('amcRegistration.label.vin')}>{checkAndSetDefaultValue(formData?.vin, isLoading)}</Descriptions.Item>
                </Descriptions>
                <Divider />
                <Descriptions {...viewProps}>
                    <Descriptions.Item label={translateContent('amcRegistration.label.vehicleRegistrationNumber')}>{checkAndSetDefaultValue(formData?.vehicleRegistrationNumber, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('amcRegistration.label.orignallyWarrantyStartDate')}>{checkAndSetDefaultValue(formData?.orignallyWarrantyStartDate, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>

                    <Descriptions.Item label={translateContent('amcRegistration.label.modelGroup')}>{checkAndSetDefaultValue(formData?.modelGroup, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('amcRegistration.label.modelFamily')}>{checkAndSetDefaultValue(formData?.modelFamily, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('amcRegistration.label.modelDescription')}>{checkAndSetDefaultValue(formData?.modelDescription, isLoading)}</Descriptions.Item>
                </Descriptions>
            </>
        </div>
    );
};

export const ViewDetail = ViewDetailBase;
