/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Descriptions } from 'antd';
import { translateContent } from 'utils/translateContent';

const ViewDetailMain = (props) => {
    const { formData, styles } = props;

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
                    <Descriptions.Item label={translateContent('vehicleModelAndTaxCharges.label.modelGroupCode')}>{formData?.modelGroup}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('vehicleModelAndTaxCharges.label.taxCategoryDescription')}>{formData?.taxCategoryDescription}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('vehicleModelAndTaxCharges.label.accountCategoryDescription')}>{formData?.accountCategoryDescription}</Descriptions.Item>
                </Descriptions>
            </div>
        </>
    );
};

export const ViewDetail = ViewDetailMain;
