/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Descriptions, Divider } from 'antd';

import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { getCodeValue } from 'utils/getCodeValue';

const ViewDetailBase = (props) => {
    const { formData, styles } = props;
    const { isLoading, typeData } = props;
    console.log('xdcfvgbhnj', formData);
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
                    <Descriptions.Item label="VIN">{checkAndSetDefaultValue(formData?.vin, isLoading)}</Descriptions.Item>
                </Descriptions>
                <Divider />
                <Descriptions {...viewProps}>
                    <Descriptions.Item label="Vehicle Registration No.">{checkAndSetDefaultValue(formData?.mobileNumber, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="Original Warranty Start Date">{checkAndSetDefaultValue(formData?.alternateMobileNumber, isLoading)}</Descriptions.Item>

                    <Descriptions.Item label="Model Group">{checkAndSetDefaultValue(getCodeValue(typeData?.GENDER_CD, formData?.gender), isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="Model Family">{checkAndSetDefaultValue(getCodeValue(typeData?.TITLE, formData?.title), isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="Model Description">{checkAndSetDefaultValue(formData?.modelDescription, isLoading)}</Descriptions.Item>
                </Descriptions>
            </>
        </div>
    );
};

export const ViewDetail = ViewDetailBase;
