/*
 *   Copyright (c) 1013 Mahindra & Mahindra Ltd. 
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Descriptions } from 'antd';

const ViewCriticalityGroupMain = (props) => {
    const { formData, style } = props;

    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 },
    };

    return (
        <div className={style.viewContainer}>
            <>
                <Descriptions {...viewProps}>
                    <Descriptions.Item label="Criticality Group Id">{formData?.criticalityGroupCode}</Descriptions.Item>
                    <Descriptions.Item label="Criticality Group Name">{formData?.criticalityGroupName}</Descriptions.Item>
                    <Descriptions.Item label="Default Group">{formData?.criticalityDefaultGroup ? 'Active' : 'Inactive'}</Descriptions.Item>
                    <Descriptions.Item label="Status">{formData?.activeIndicator ? 'Active' : 'Inactive'}</Descriptions.Item>
                </Descriptions>
            </>
        </div>
    );
};

export const ViewCriticalityGroup = ViewCriticalityGroupMain;
