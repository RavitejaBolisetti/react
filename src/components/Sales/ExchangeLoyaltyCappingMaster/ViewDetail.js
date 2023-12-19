/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Descriptions } from 'antd';
import { translateContent } from 'utils/translateContent';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { DATA_TYPE } from 'constants/dataType';

const ViewDetailBase = ({ formData, styles, isLoading }) => {
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
                    <Descriptions.Item label={translateContent('ExchangeLoyaltyCappingMaster.label.modelGroup')}>{formData?.modelGroup}</Descriptions.Item>

                    <Descriptions.Item label={translateContent('ExchangeLoyaltyCappingMaster.label.modelVariant')}>{formData?.modelVariant}</Descriptions.Item>

                    <Descriptions.Item label={translateContent('ExchangeLoyaltyCappingMaster.label.zone')}>{formData?.zone}</Descriptions.Item>

                    <Descriptions.Item label={translateContent('ExchangeLoyaltyCappingMaster.label.areaOffice')}>{formData?.areaOffice}</Descriptions.Item>

                    <Descriptions.Item label={translateContent('ExchangeLoyaltyCappingMaster.label.dealerCode')}>{formData?.dealerCode}</Descriptions.Item>
                    
                    <Descriptions.Item label={translateContent('ExchangeLoyaltyCappingMaster.label.dealerName')}>{formData?.dealerName}</Descriptions.Item>

                    <Descriptions.Item label={translateContent('ExchangeLoyaltyCappingMaster.label.capping')}>{formData?.capping}</Descriptions.Item>

                    <Descriptions.Item label={translateContent('ExchangeLoyaltyCappingMaster.label.retailSlabFrom')}>{formData?.retailSlabFrom}</Descriptions.Item>

                    <Descriptions.Item label={translateContent('ExchangeLoyaltyCappingMaster.label.retailSlabTo')}>{formData?.retailSlabTo}</Descriptions.Item>
                  

                    <Descriptions.Item label={translateContent('ExchangeLoyaltyCappingMaster.label.validFrom')}>{checkAndSetDefaultValue(formData?.validFrom, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>

                    <Descriptions.Item label={translateContent('ExchangeLoyaltyCappingMaster.label.validTo')}>{checkAndSetDefaultValue(formData?.validTo, isLoading, DATA_TYPE?.DATE?.key)}</Descriptions.Item>

                    <Descriptions.Item label={translateContent('ExchangeLoyaltyCappingMaster.label.status')}>{formData?.status ? translateContent('ExchangeLoyaltyCappingMaster.label.active') : translateContent('ExchangeLoyaltyCappingMaster.label.inactive')}</Descriptions.Item>
                </Descriptions>
            </div>
        </>
    );
};

export const ViewDetail = ViewDetailBase;
