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
    const CheckSetWrapper = (value) => checkAndSetDefaultValue(value, isLoading);

    return (
        <>
            <div className={`${styles?.viewContainer} ${styles?.viewOneColProps}`}>
                <Descriptions {...viewOneColProps}>
                    <Descriptions.Item label={translateContent('partyMaster.label.partyCategory')}>{CheckSetWrapper(formData?.partyCategory)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('partyMaster.label.partyCode')}>{CheckSetWrapper(formData?.partyCode)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('partyMaster.label.partyName')}>{CheckSetWrapper(formData?.partyName)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('partyMaster.label.contactPersonName')}>{CheckSetWrapper(formData?.contactPersonName)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('partyMaster.label.designation')}>{CheckSetWrapper(formData?.designation)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('partyMaster.label.address')}>{CheckSetWrapper(formData?.address)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('partyMaster.label.pinCode')}>{CheckSetWrapper(formData?.pinCode)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('partyMaster.label.city')}>{CheckSetWrapper(formData?.city)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('partyMaster.label.tehsil')}>{CheckSetWrapper(formData?.tehsil)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('partyMaster.label.district')}>{CheckSetWrapper(formData?.district)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('partyMaster.label.state')}>{CheckSetWrapper(formData?.state)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('partyMaster.label.mobileNumber')}>{CheckSetWrapper(formData?.mobileNumber)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('partyMaster.label.alternateMobileNumber')}>{CheckSetWrapper(formData?.alternateMobileNumber)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('partyMaster.label.gstinNumber')}>{CheckSetWrapper(formData?.gstInNumber)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('partyMaster.label.pan')}>{CheckSetWrapper(formData?.panNumber)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('partyMaster.label.partsDiscount') + '(%)'}>{CheckSetWrapper(formData?.partsDiscount)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('partyMaster.label.creditDays')}>{CheckSetWrapper(formData?.creditDays)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('partyMaster.label.creditLimit')}>{CheckSetWrapper(formData?.creditLimit)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('partyMaster.label.remarks')}>{CheckSetWrapper(formData?.remarks)}</Descriptions.Item>
                </Descriptions>
            </div>
        </>
    );
};

export const ViewDetail = ViewDetailBase;
