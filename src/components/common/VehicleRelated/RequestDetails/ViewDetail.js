/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Descriptions } from 'antd';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { getCodeValue } from 'utils/getCodeValue';
import { translateContent } from 'utils/translateContent';

const ViewDetailBase = (props) => {
    const { formData, styles, isLoading, addData } = props;

    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xxl: 3, xl: 3, lg: 3, md: 3, sm: 1, xs: 1 },
    };

    return (
        <div>
            <>
                <Descriptions {...viewProps}>
                    <Descriptions.Item label={translateContent('vehicleRelated.label.requesttype')}>{'Change Customer ID'}</Descriptions.Item>

                    <Descriptions.Item label={translateContent('vehicleRelated.label.customerId')}>{'ABCD123456'}</Descriptions.Item>

                    <Descriptions.Item label={translateContent('vehicleRelated.label.customerName')}>{'Aryaman Kulshreshtha'}</Descriptions.Item>

                    <Descriptions.Item label={translateContent('vehicleRelated.label.registrationNo')}>{'HR41CD1234'}</Descriptions.Item>

                    <Descriptions.Item label={translateContent('vehicleRelated.label.chassisNo')}>{'SDFG12345'}</Descriptions.Item>

                    <Descriptions.Item label={translateContent('vehicleRelated.label.engineNo')}>{'HJK12345'}</Descriptions.Item>

                    <Descriptions.Item label={translateContent('vehicleRelated.label.currentInsuranceExpiryDate')}>{'23/09/2025'}</Descriptions.Item>

                    <Descriptions.Item label={translateContent('vehicleRelated.label.currentPUCExpiryDate')}>{'11/02/2025'}</Descriptions.Item>

                    <Descriptions.Item label={translateContent('vehicleRelated.label.newcustomerId')}>{'XCVD123456'}</Descriptions.Item>
                </Descriptions>
            </>
        </div>
    );
};

export const ViewDetail = ViewDetailBase;
