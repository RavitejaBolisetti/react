/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Descriptions } from 'antd';

const ViewDetailBase = ({ formData, styles }) => {
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
                    <Descriptions.Item label="Address Type">{formData?.addressType}</Descriptions.Item>
                    <Descriptions.Item label="Address Line 1">{formData?.address}</Descriptions.Item>
                    <Descriptions.Item label="Address Line 2">{formData?.address2}</Descriptions.Item>
                    <Descriptions.Item label="Pincode">{formData?.pincode}</Descriptions.Item>
                    <Descriptions.Item label="Tehsil">{formData?.tehsil}</Descriptions.Item>
                    <Descriptions.Item label="City">{formData?.city}</Descriptions.Item>
                    <Descriptions.Item label="District">{formData?.district}</Descriptions.Item>
                    <Descriptions.Item label="State">{formData?.state}</Descriptions.Item>
                    <Descriptions.Item label="Contact Name">{formData?.contactpersonName}</Descriptions.Item>
                    <Descriptions.Item label="Contact Mobile">{formData?.contactmobilenumber}</Descriptions.Item>
                    <Descriptions.Item>{formData?.defaultaddress}</Descriptions.Item>
                </Descriptions>
            </>
        </div>
    );
};

export const ViewDetail = ViewDetailBase;
