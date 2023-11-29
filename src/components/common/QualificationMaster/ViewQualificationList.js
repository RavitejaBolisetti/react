/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Descriptions } from 'antd';
import { translateContent } from 'utils/translateContent';

const ViewQualificationListMain = ({ formData, styles }) => {
    const viewOneColProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 },
    };
    return (
        <>
            <div className={`${styles?.viewDrawerContainer} ${styles?.viewOneColProps}`}>
                <Descriptions {...viewOneColProps}>
                    <Descriptions.Item label={translateContent('qualificationMaster.label.qualificationCode')}>{formData?.qualificationCode}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('qualificationMaster.label.qualificationName')}>{formData?.qualificationName}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('qualificationMaster.label.status')}>{formData?.status === 1 ? <text className={styles?.activeText}>{translateContent('qualificationMaster.label.active')}</text> : <text className={styles?.inactiveText}>{translateContent('qualificationMaster.label.inActive')}</text>}</Descriptions.Item>
                </Descriptions>
            </div>
        </>
    );
};

export const ViewQualificationList = ViewQualificationListMain;
