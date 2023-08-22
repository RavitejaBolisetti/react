/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Descriptions } from 'antd';

const ViewQualificationListMain = ({ formData, styles }) => {
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 },
    };
    return (
        <div className={`${styles?.viewContainer} ${styles?.hierarchyRightContainers}`}>
            <>
                <Descriptions {...viewProps}>
                    <Descriptions.Item label="Qualification Code">{formData?.qualificationCode}</Descriptions.Item>
                    <Descriptions.Item label="Qualification Name">{formData?.qualificationName}</Descriptions.Item>
                    <Descriptions.Item label="Status">{formData?.status === 1 ? <text className={styles?.activeText}>Active</text> : <text className={styles?.inactiveText}>InActive</text>}</Descriptions.Item>
                </Descriptions>
            </>
        </div>
    );
};

export const ViewQualificationList = ViewQualificationListMain;
