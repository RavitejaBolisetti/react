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
                    <Descriptions.Item label={'Zone' || translateContent('city.label.stateName')}>{formData?.stateName}</Descriptions.Item>
                    <Descriptions.Item label={'Area Office' || translateContent('city.label.districtName')}>{formData?.districtName}</Descriptions.Item>
                    <Descriptions.Item label={'Dealer Code' || translateContent('city.label.cityCode')}>{formData?.code}</Descriptions.Item>
                    <Descriptions.Item label={'Corporate Category' || translateContent('city.label.cityName')}>{formData?.name}</Descriptions.Item>
                    <Descriptions.Item label={'Dealer Amount' || translateContent('global.label.status')}>{formData?.status }</Descriptions.Item>
                    
                    <Descriptions.Item label={'OEM Amount' || translateContent('global.label.status')}>{formData?.status}</Descriptions.Item>
                    <Descriptions.Item label={'Valid From' || translateContent('global.label.status')}>{formData?.status}</Descriptions.Item>
                    <Descriptions.Item label={'Valid To' || translateContent('global.label.status')}>{formData?.status}</Descriptions.Item>
                    <Descriptions.Item label={'Status' || translateContent('global.label.status')}>{formData?.status}</Descriptions.Item>
                </Descriptions>
            </div>
        </>
    );
};

export const ViewDetail = ViewDetailMain;
