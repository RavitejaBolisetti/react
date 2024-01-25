/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Descriptions } from 'antd';
import { translateContent } from 'utils/translateContent';

const ViewDetailMain = ({ formData, styles, parameterType }) => {
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
                    <Descriptions.Item label={'channel' || translateContent('city.label.stateName')}>{formData?.channel}</Descriptions.Item>
                    <Descriptions.Item label={'Campaign No' || translateContent('city.label.stateName')}>{formData?.campaignNo}</Descriptions.Item>
                    <Descriptions.Item label={'Campaign Name' || translateContent('city.label.stateName')}>{formData?.campaignName}</Descriptions.Item>
                    <Descriptions.Item label={'Start Date' || translateContent('city.label.stateName')}>{formData?.startDate}</Descriptions.Item>
                    <Descriptions.Item label={'End Date' || translateContent('city.label.stateName')}>{formData?.endDate}</Descriptions.Item>
                    
                </Descriptions>
            </div>
        </>
    );
};

export const ViewDetail = ViewDetailMain;
