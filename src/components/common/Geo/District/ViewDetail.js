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
                    <Descriptions.Item label={translateContent('district.title.stateName')}>{formData?.stateName}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('district.title.districtCode')}>{formData?.code}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('district.title.districtName')}>{formData?.name}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('global.label.status')}>{formData?.status ? `${translateContent('global.label.active')}` : `${translateContent('global.label.inActive')}`}</Descriptions.Item>
                </Descriptions>
            </div>
        </>
    );
};

export const ViewDetail = ViewDetailMain;
