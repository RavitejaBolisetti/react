/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Descriptions } from 'antd';
import { translateContent } from 'utils/translateContent';

const ViewDetailBase = ({ formData, styles, parameterType }) => {
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
                    <Descriptions.Item label={translateContent('dealerCompany.label.parentGroupCode')}>{formData?.parentCode}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('dealerCompany.label.parentGroupName')}>{formData?.dealerParentName}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('dealerCompany.label.companyCode')}>{formData?.companyCode}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('dealerCompany.label.companyName')}>{formData?.companyName}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('dealerCompany.label.companyAddress')}>{formData?.address}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('dealerCompany.label.pinCode')}>{formData?.pinCode}</Descriptions.Item>
                    {/* <Descriptions.Item label="Locality">{formData?.locality}</Descriptions.Item> */}
                    <Descriptions.Item label={translateContent('dealerCompany.label.city')}>{formData?.cityName}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('dealerCompany.label.tehsil')}>{formData?.tehsilName}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('dealerCompany.label.district')}>{formData?.districtName}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('dealerCompany.label.state')}>{formData?.stateName}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('dealerCompany.label.tin')}>{formData?.companyTin}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('dealerCompany.label.tan')}>{formData?.companyTan}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('dealerCompany.label.pan')}>{formData?.companyPan}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('dealerCompany.label.status')}>{formData?.status ? 'Active' : 'Inactive'}</Descriptions.Item>
                </Descriptions>
            </div>
        </>
    );
};

export const ViewDetail = ViewDetailBase;
