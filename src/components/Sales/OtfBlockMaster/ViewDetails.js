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
    const { isAreaOfficeLoading, viewTitle, styles, formData, selectedProductName, zoneMasterData, areaOfficeData } = props;
    const viewOneColProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        title: <div className={styles.viewContainerHeader}>{viewTitle}</div>,
        column: { xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 },
    };

    const zoneName = zoneMasterData.find((e) => e?.zoneCode === formData?.zoneCode)?.zoneDescription;
    const areaName = areaOfficeData.find((e) => e?.areaCode === formData?.areaCode)?.areaDescription;

    return (
        <div className={`${styles.viewContainer} ${styles.viewOneColProps}`}>
            <Descriptions {...viewOneColProps}>
                <Descriptions.Item label={translateContent('bookingBlockMaster.label.productHierarchy')}>{checkAndSetDefaultValue(selectedProductName, isAreaOfficeLoading)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('vehicleSalesSchemeMaster.label.zone')}>{checkAndSetDefaultValue(zoneName, isAreaOfficeLoading)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('vehicleSalesSchemeMaster.label.area')}>{checkAndSetDefaultValue(areaName, isAreaOfficeLoading)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('bookingBlockMaster.label.dealerCode')}>{checkAndSetDefaultValue(formData?.dealerCode, isAreaOfficeLoading)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('bookingBlockMaster.label.dealerName')}>{checkAndSetDefaultValue(formData?.dealerName, isAreaOfficeLoading)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('global.label.status')}>
                    <span className={formData?.status ? styles.activeText : styles?.inactiveText}>{checkAndSetDefaultValue(formData?.status ? translateContent('global.label.active') : translateContent('global.label.inActive'), isAreaOfficeLoading)}</span>
                </Descriptions.Item>
            </Descriptions>
        </div>
    );
};

export const ViewDetails = ViewMain;
