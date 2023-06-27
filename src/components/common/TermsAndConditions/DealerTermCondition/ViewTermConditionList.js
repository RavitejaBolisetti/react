/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Descriptions } from 'antd';
import { convertDate } from 'utils/formatDateTime';

const ViewTermConditionListMain = ({ formData, styles }) => {
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 },
    };
    return (
        <div className={`${styles.viewContainer} ${styles.hierarchyRightContaners}`}>
            <>
                <Descriptions {...viewProps}>
                    <Descriptions.Item label="Product Hierarchy">{formData?.productName ? formData?.productName : formData?.productName}</Descriptions.Item>
                    <Descriptions.Item label="Document Type">{formData?.documentTypeCode}</Descriptions.Item>
                    <Descriptions.Item label="Language">{formData?.language ? formData?.language : formData?.languageDesc}</Descriptions.Item>
                    <Descriptions.Item label="Effective From">{formData?.effectiveFrom ? convertDate(formData?.effectiveFrom) : convertDate(formData?.effectivefrom)}</Descriptions.Item>
                    <Descriptions.Item label="Effective To">{formData?.effectiveTo ? convertDate(formData?.effectiveTo) : convertDate(formData?.effectiveto)}</Descriptions.Item>
                    <Descriptions.Item label="Version">{formData?.version}</Descriptions.Item>
                    <Descriptions.Item label="Terms & Conditions">{formData?.termConditionDescription ? formData?.termConditionDescription : formData?.termsconditiondescription}</Descriptions.Item>
                </Descriptions>
            </>
        </div>
    );
};

export const ViewTermConditionList = ViewTermConditionListMain;
