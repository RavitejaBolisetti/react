/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Descriptions } from 'antd';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { translateContent } from 'utils/translateContent';

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
                <Descriptions.Item label={translateContent('bookingBlockMaster.label.productHierarchy')}>{checkAndSetDefaultValue(selectedProductName)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('bookingBlockMaster.label.manufacturerAdmin')}>{checkAndSetDefaultValue(formData?.hierarchyMstName)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('bookingBlockMaster.label.dealerCode')}>{checkAndSetDefaultValue(formData?.dealerCode)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('global.label.status')}>{checkAndSetDefaultValue(formData?.status ? translateContent('global.label.active') : translateContent('global.label.inActive'))}</Descriptions.Item>
            </Descriptions>
        </div>
    );
};

export const ViewDetails = ViewMain;
