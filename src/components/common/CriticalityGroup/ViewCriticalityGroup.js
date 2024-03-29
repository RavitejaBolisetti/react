/*
 *   Copyright (c) 1013 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Descriptions } from 'antd';
import { translateContent } from 'utils/translateContent';

const ViewCriticalityGroupMain = (props) => {
    const { formData, styles } = props;

    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 },
    };

    return (
        <div className={styles?.viewDrawerContainer}>
            <>
                <Descriptions {...viewProps}>
                    <Descriptions.Item label={translateContent('criticalityGroup.label.criticalityGroupId')}>{formData?.criticalityGroupCode}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('criticalityGroup.label.criticalityGroupName')}>{formData?.criticalityGroupName}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('criticalityGroup.label.defaultGroup')}>
                        <span className={formData?.criticalityDefaultGroup ? styles.activeText : styles?.inactiveText}>{formData?.criticalityDefaultGroup ? translateContent('global.label.active') : translateContent('global.label.inActive')}</span>
                    </Descriptions.Item>
                    <Descriptions.Item label={translateContent('criticalityGroup.label.status')}>
                        <span className={formData?.activeIndicator ? styles.activeText : styles?.inactiveText}>{formData?.activeIndicator ? translateContent('global.label.active') : translateContent('global.label.inActive')}</span>
                    </Descriptions.Item>
                </Descriptions>
            </>
        </div>
    );
};

export const ViewCriticalityGroup = ViewCriticalityGroupMain;
