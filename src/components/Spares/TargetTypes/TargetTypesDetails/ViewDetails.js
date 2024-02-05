/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Descriptions } from 'antd';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { getCodeValue } from 'utils/getCodeValue';
import { translateContent } from 'utils/translateContent';

const ViewDetailsBase = (props) => {
    const { formData, styles, isLoading, addData } = props;

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
                    <Descriptions.Item label='Document Type'>{checkAndSetDefaultValue(getCodeValue(addData, formData?.addressType), isLoading)}</Descriptions.Item>
                    <Descriptions.Item label='Document Number'>{checkAndSetDefaultValue(formData?.addressLine1, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label='Document Date'>{checkAndSetDefaultValue(formData?.addressLine2, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label='Document Amount'>{checkAndSetDefaultValue(formData?.addressLine3, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label='Paid Amount'>{checkAndSetDefaultValue(formData?.pinCode, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label='Apportioned Amount'>{checkAndSetDefaultValue(formData?.tehsilName, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label='Write-off Amount'>{checkAndSetDefaultValue(formData?.cityName, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label='Balance Amount'>{checkAndSetDefaultValue(formData?.districtName, isLoading)}</Descriptions.Item>
                   
                </Descriptions>
            </>
        </div>
    );
};

export const ViewDetails = ViewDetailsBase;
