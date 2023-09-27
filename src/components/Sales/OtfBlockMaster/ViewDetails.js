/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Descriptions } from 'antd';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';

export const ViewMain = (props) => {
    const { viewTitle, styles, formData, selectedProductName } = props;
    const viewOneColProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        title: <div className={styles.viewContainerHeader}>{viewTitle}</div>,
        column: { xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 },
    };

    return (
        <div className={`${styles.viewContainer} ${styles.viewOneColProps}`}>
            <Descriptions {...viewOneColProps}>
                <Descriptions.Item label="Product Hierarchy">{checkAndSetDefaultValue(selectedProductName)}</Descriptions.Item>
                <Descriptions.Item label="Manufacturer Administrative Hierarchy">{checkAndSetDefaultValue(formData?.hierarchyMstName)}</Descriptions.Item>
                <Descriptions.Item label="Dealer Code">{checkAndSetDefaultValue(formData?.dealerCode)}</Descriptions.Item>
                <Descriptions.Item label="Status">{checkAndSetDefaultValue(formData?.status ? 'Active' : 'Inactive')}</Descriptions.Item>
            </Descriptions>
        </div>
    );
};

export const ViewDetails = ViewMain;
