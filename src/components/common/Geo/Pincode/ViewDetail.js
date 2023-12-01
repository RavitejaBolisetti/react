/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Descriptions } from 'antd';
import { translateContent } from 'utils/translateContent';

export const ViewDetail = ({ formData, styles }) => {
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
                    <Descriptions.Item label={translateContent('pincode.label.pinCode')}>{formData?.pinCode}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('pincode.label.pinCategory')}>{formData?.pinCategoryName || 'NA'}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('pincode.label.locality')}>{formData?.localityName || 'NA'}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('pincode.label.Tehsil')}>{formData?.tehsilName || 'NA'}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('pincode.label.City')}>{formData?.cityName || 'NA'}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('pincode.label.district')}>{formData?.districtName || 'NA'}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('pincode.label.state')}>{formData?.stateName || 'NA'}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('pincode.label.country')}>{formData?.countryName || 'NA'}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('pincode.label.withIn50KmFromGpo')}>{formData?.withIn50KmFromGpo ? 'Yes' : 'No'}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('global.label.status')}>
                    <span className={formData?.status ? styles.activeText : styles?.inactiveText}> {formData?.status ? translateContent('global.label.active') : translateContent('global.label.inActive')} </span>
                    </Descriptions.Item>
                    <Descriptions.Item label={translateContent('pincode.label.approvalStatus')}>{formData?.approvalStatus ? 'Approved' : 'Not Approved'}</Descriptions.Item>
                </Descriptions>
            </div>
        </>
    );
};
