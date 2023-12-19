/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Descriptions } from 'antd';
import { translateContent } from 'utils/translateContent';

const ViewDetailBase = ({ formData, styles }) => {
    const viewOneColProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 2 },
    };
    return (
        <>
            <div className={`${styles.viewContainer} ${styles.viewOneColProps}`}>
                <Descriptions {...viewOneColProps}>
                    <Descriptions.Item label={translateContent('LoyaltyDocumentMaster.label.documentId')}>{formData?.documentId}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('LoyaltyDocumentMaster.label.documentName')}>{formData?.documentName}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('LoyaltyDocumentMaster.label.status')}>{formData?.status ? translateContent('LoyaltyDocumentMaster.label.active') : translateContent('LoyaltyDocumentMaster.label.inactive')}</Descriptions.Item>
                </Descriptions>
            </div>
        </>
    );
};

export const ViewDetail = ViewDetailBase;
