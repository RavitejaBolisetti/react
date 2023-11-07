/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Descriptions } from 'antd';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { DATA_TYPE } from 'constants/dataType';

const ViewTermConditionListMain = ({ formData, isLoading, styles }) => {
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
                    <Descriptions.Item label="Product Hierarchy">{checkAndSetDefaultValue(formData?.productName, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="Document Type">{checkAndSetDefaultValue(formData?.documentTypeCode, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="Language">{checkAndSetDefaultValue(formData?.language || formData?.languageDesc, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="Effective From">{checkAndSetDefaultValue(formData?.effectiveFrom || formData?.effectivefrom, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                    <Descriptions.Item label="Effective To">{checkAndSetDefaultValue(formData?.effectiveTo || formData?.effectiveto, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>
                    <Descriptions.Item label="Version">{checkAndSetDefaultValue(formData?.version, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="Terms & Conditions">{checkAndSetDefaultValue(formData?.termConditionDescription?.replace(/<\/?[^>]+(>|$)/g, '') || formData?.termsconditiondescription?.replace(/<\/?[^>]+(>|$)/g, ''), isLoading)}</Descriptions.Item>
                </Descriptions>
            </div>
        </>
    );
};

export const ViewTermConditionList = ViewTermConditionListMain;
