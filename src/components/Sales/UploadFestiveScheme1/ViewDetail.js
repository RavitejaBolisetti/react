/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Descriptions } from 'antd';
import { translateContent } from 'utils/translateContent';

const ViewDetailMain = ({ formData, styles, parameterType }) => {
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
                    <Descriptions.Item label={'Financial Year' || translateContent('city.label.stateName')}>{formData?.financialYear}</Descriptions.Item>
                    <Descriptions.Item label={'AO Code' || translateContent('city.label.districtName')}>{formData?.aoCode}</Descriptions.Item>
                    <Descriptions.Item label={'Scheme Id' || translateContent('city.label.cityCode')}>{formData?.schemeId}</Descriptions.Item>
                    <Descriptions.Item label={'Scheme Name' || translateContent('city.label.cityName')}>{formData?.schemeName}</Descriptions.Item>
                    <Descriptions.Item label={'Dealer Code' || translateContent('global.label.status')}>{formData?.dealerCode ? `${translateContent('global.label.active')}` : `${translateContent('global.label.inActive')}`}</Descriptions.Item>
                    <Descriptions.Item label={'Sale Modal Group' || translateContent('global.label.status')}>{formData?.saleModalGroup ? `${translateContent('global.label.active')}` : `${translateContent('global.label.inActive')}`}</Descriptions.Item>
                    <Descriptions.Item label={'Modal Group Description' || translateContent('global.label.status')}>{formData?.modalGroupDescription ? `${translateContent('global.label.active')}` : `${translateContent('global.label.inActive')}`}</Descriptions.Item>
                    <Descriptions.Item label={'From Date' || translateContent('global.label.status')}>{formData?.fromDate ? `${translateContent('global.label.active')}` : `${translateContent('global.label.inActive')}`}</Descriptions.Item>
                    <Descriptions.Item label={'To Date' || translateContent('global.label.status')}>{formData?.toDate ? `${translateContent('global.label.active')}` : `${translateContent('global.label.inActive')}`}</Descriptions.Item>
                    <Descriptions.Item label={'Incentive Amount' || translateContent('global.label.status')}>{formData?.incentiveAmount ? `${translateContent('global.label.active')}` : `${translateContent('global.label.inActive')}`}</Descriptions.Item>
                    <Descriptions.Item label={'Proposal ID' || translateContent('global.label.status')}>{formData?.proposalId ? `${translateContent('global.label.active')}` : `${translateContent('global.label.inActive')}`}</Descriptions.Item>
                    <Descriptions.Item label={'Status' || translateContent('global.label.status')}>{formData?.status ? `${translateContent('global.label.active')}` : `${translateContent('global.label.inActive')}`}</Descriptions.Item>
                </Descriptions>
            </div>
        </>
    );
};

export const ViewDetail = ViewDetailMain;
