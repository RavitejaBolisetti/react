/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Descriptions } from 'antd';

const ViewDetailMain = ({ formData, styles, parameterType }) => {
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 },
    };
    return (
        <div className={styles.viewContainer}>
            <>
                <Descriptions {...viewProps}>
                    <Descriptions.Item label="State Name">{formData?.stateName}</Descriptions.Item>
                    <Descriptions.Item label="District Name">{formData?.districtName}</Descriptions.Item>
                    <Descriptions.Item label="City Code">{formData?.code}</Descriptions.Item>
                    <Descriptions.Item label="City Name">{formData?.name}</Descriptions.Item>
                    <Descriptions.Item label="Status">{formData?.status ? 'Active' : 'Inactive'}</Descriptions.Item>
                </Descriptions>
            </>
        </div>
    );
};

export const ViewDetail = ViewDetailMain;
