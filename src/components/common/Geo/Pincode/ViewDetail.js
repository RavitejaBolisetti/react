/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Descriptions } from 'antd';

export const ViewDetail = ({ formData, styles, parameterType }) => {
    const viewOneColProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 },
    };
    return (
        <>
            <div className={`${styles.viewContainer} ${styles.viewOneColProps}`}>
                <Descriptions {...viewOneColProps}>
                    <Descriptions.Item label="PIN Code">{formData?.pinCode}</Descriptions.Item>
                    <Descriptions.Item label="PIN Category">{formData?.pinCategoryName || 'NA'}</Descriptions.Item>
                    <Descriptions.Item label="Locality">{formData?.localityName || 'NA'}</Descriptions.Item>
                    <Descriptions.Item label="Tehsil">{formData?.tehsilName || 'NA'}</Descriptions.Item>
                    <Descriptions.Item label="City">{formData?.cityName || 'NA'}</Descriptions.Item>
                    <Descriptions.Item label="District">{formData?.districtName || 'NA'}</Descriptions.Item>
                    <Descriptions.Item label="State">{formData?.stateName || 'NA'}</Descriptions.Item>
                    <Descriptions.Item label="Country">{formData?.countryName || 'NA'}</Descriptions.Item>
                    <Descriptions.Item label="Within 50 Km of GPO">{formData?.withIn50KmFromGpo ? 'Yes' : 'No'}</Descriptions.Item>
                    <Descriptions.Item label="Status">{formData?.status ? 'Active' : 'Inactive'}</Descriptions.Item>
                    <Descriptions.Item label="Approval Status">{formData?.approvalStatus ? 'Approved' : 'Not Approved'}</Descriptions.Item>
                </Descriptions>
            </div>
        </>
    );
};
