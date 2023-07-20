/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Descriptions } from 'antd';

const ViewDetailBase = ({ formData, styles, parameterType }) => {
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
                    <Descriptions.Item label="Code">{formData?.taxCategoryCode}</Descriptions.Item>
                    <Descriptions.Item label="Description">{formData?.taxCategoryDescription}</Descriptions.Item>
                    <Descriptions.Item label="State">{formData?.state}</Descriptions.Item>
                    <Descriptions.Item label="Sale Type">{formData?.saleTypeCode}</Descriptions.Item>
                    {/* <Descriptions.Item label="Status">{formData?.status ? 'Active' : 'Inactive'}</Descriptions.Item> */}
                    {formData?.TaxChargesCalculation && formData?.TaxChargesCalculation?.length > 0 ? (
                        <>
                            <Descriptions.Item label="Tax/Charge Type">{formData?.taxChargeTypeCode}</Descriptions.Item>
                            <Descriptions.Item label="Tax/Charge Code">{formData?.taxChargeCode}</Descriptions.Item>
                            <Descriptions.Item label="Description">{formData?.chargeDesc}</Descriptions.Item>
                        </>
                    ) : null}
                </Descriptions>
            </>
        </div>
    );
};

export const ViewDetail = ViewDetailBase;
