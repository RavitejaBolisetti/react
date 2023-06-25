/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd. 
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Descriptions } from 'antd';

const AccessoriesInformationCard = () => {
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };

    return (
        <>
            <Descriptions {...viewProps}>
                <Descriptions.Item label="Type">{'Accessories type'}</Descriptions.Item>
                <Descriptions.Item label="Selling Price">{'4567'}</Descriptions.Item>
                <Descriptions.Item label="MRP">{'6543'}</Descriptions.Item>
            </Descriptions>
        </>
    );
};

export default AccessoriesInformationCard;
