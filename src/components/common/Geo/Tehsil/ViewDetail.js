/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Descriptions } from 'antd';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { DATA_TYPE } from 'constants/dataType';

const ViewDetailMain = ({ formData, styles, parameterType, isLoading = false }) => {
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 },
    };

    return (
        <div className={`${styles.viewContainer} ${styles.hierarchyRightContaners}`}>
            <>
                <Descriptions {...viewProps}>
                    <Descriptions.Item label="State Name">{checkAndSetDefaultValue(formData?.stateName, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="District Name">{checkAndSetDefaultValue(formData?.districtName, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="Tehsil Code">{checkAndSetDefaultValue(formData?.code, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="Tehsil Name">{checkAndSetDefaultValue(formData?.name, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="Tehsil Category">{checkAndSetDefaultValue(formData?.tehsilCategory, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="Included On">{checkAndSetDefaultValue(formData?.includedOn, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                    <Descriptions.Item label="Status">{checkAndSetDefaultValue(formData?.status ? 'Active' : 'Inactive', isLoading)}</Descriptions.Item>
                </Descriptions>
            </>
        </div>
    );
};

export const ViewDetail = ViewDetailMain;
