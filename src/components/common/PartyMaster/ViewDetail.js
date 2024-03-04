/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Descriptions } from 'antd';
import { translateContent } from 'utils/translateContent';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';

const ViewDetailBase = ({ formData, styles, isLoading }) => {
    const viewOneColProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 },
    };
    const checkAndSetDefaultValueWithLoader = (value) => checkAndSetDefaultValue(value, isLoading);

    return (
        <>
            <div className={`${styles?.viewContainer} ${styles?.viewOneColProps}`}>
                <Descriptions {...viewOneColProps}>
                    <Descriptions.Item label={translateContent('partyMaster.label.partyCategory')}>{checkAndSetDefaultValueWithLoader(formData?.partyCategory)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('partyMaster.label.partyCode')}>{checkAndSetDefaultValueWithLoader(formData?.partyCode)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('partyMaster.label.partyName')}>{checkAndSetDefaultValueWithLoader(formData?.partyName)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('partyMaster.label.contactPersonName')}>{checkAndSetDefaultValueWithLoader(formData?.contactPersonName)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('partyMaster.label.designation')}>{checkAndSetDefaultValueWithLoader(formData?.designation)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('partyMaster.label.address')}>{checkAndSetDefaultValueWithLoader(formData?.address)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('partyMaster.label.pinCode')}>{checkAndSetDefaultValueWithLoader(formData?.pinCode)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('partyMaster.label.city')}>{checkAndSetDefaultValueWithLoader(formData?.city)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('partyMaster.label.tehsil')}>{checkAndSetDefaultValueWithLoader(formData?.tehsil)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('partyMaster.label.district')}>{checkAndSetDefaultValueWithLoader(formData?.district)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('partyMaster.label.state')}>{checkAndSetDefaultValueWithLoader(formData?.state)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('partyMaster.label.mobileNumber')}>{checkAndSetDefaultValueWithLoader(formData?.mobileNumber)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('partyMaster.label.alternateMobileNumber')}>{checkAndSetDefaultValueWithLoader(formData?.alternateMobileNumber)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('partyMaster.label.gstinNumber')}>{checkAndSetDefaultValueWithLoader(formData?.gstInNumber)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('partyMaster.label.pan')}>{checkAndSetDefaultValueWithLoader(formData?.panNumber)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('partyMaster.label.partsDiscount') + '(%)'}>{checkAndSetDefaultValueWithLoader(formData?.partsDiscount)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('partyMaster.label.creditDays')}>{checkAndSetDefaultValueWithLoader(formData?.creditDays)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('partyMaster.label.creditLimit')}>{checkAndSetDefaultValueWithLoader(formData?.creditLimit)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('partyMaster.label.remarks')}>{checkAndSetDefaultValueWithLoader(formData?.remarks)}</Descriptions.Item>
                </Descriptions>
            </div>
        </>
    );
};

export const ViewDetail = ViewDetailBase;
