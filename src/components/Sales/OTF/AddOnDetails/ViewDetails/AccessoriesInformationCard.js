/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Descriptions } from 'antd';
import { translateContent } from 'utils/translateContent';

const AccessoriesInformationCard = ({ formData }) => {
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };

    return (
        <>
            <Descriptions {...viewProps}>
                <Descriptions.Item label={translateContent('bookingManagement.label.type')}>{formData?.type ?? 'Na'}</Descriptions.Item>
                <Descriptions.Item label={translateContent('bookingManagement.label.sellingPrice')}>{formData?.sellingPrice ?? 'Na'}</Descriptions.Item>
                <Descriptions.Item label={translateContent('bookingManagement.label.mrp')}>{formData?.mrp ?? 'Na'}</Descriptions.Item>
            </Descriptions>
        </>
    );
};

export default AccessoriesInformationCard;
