/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Descriptions } from 'antd';
import { translateContent } from 'utils/translateContent';

const ViewDetailBase = ({ formData, styles, parameterType }) => {
    const viewOneColProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 },
    };
    return (
        <>
            <div className={`${styles?.viewContainer} ${styles?.viewOneColProps}`}>
                <Descriptions {...viewOneColProps}>
                    <Descriptions.Item label={translateContent('partyMaster.label.partyCategory')}>{formData?.partyCategory}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('partyMaster.label.partyCode')}>{formData?.partyCode}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('partyMaster.label.partyName')}>{formData?.partyName}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('partyMaster.label.contactPersonName')}>{formData?.contactPersonName}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('partyMaster.label.designation')}>{formData?.designation}</Descriptions.Item>
                    {/* <Descriptions.Item label={translateContent('partyMaster.label.mobileNumber')}"Mobile Number">{formData?.mobileNumber}</Descriptions.Item> */}
                    <Descriptions.Item label={translateContent('partyMaster.label.address')}>{formData?.address}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('partyMaster.label.pinCode')}>{formData?.pinCode}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('partyMaster.label.city')}>{formData?.city}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('partyMaster.label.tehsil')}>{formData?.tehsil}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('partyMaster.label.district')}>{formData?.district}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('partyMaster.label.state')}>{formData?.state}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('partyMaster.label.mobileNumber')}>{formData?.mobileNumber}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('partyMaster.label.alternateMobileNumber')}>{formData?.alternateMobileNumber}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('partyMaster.label.gstinNumber')}>{formData?.gstInNumber}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('partyMaster.label.pan')}>{formData?.panNumber}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('partyMaster.label.partsDiscount')+ "(%)"}>{formData?.partsDiscount}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('partyMaster.label.creditDays')}>{formData?.creditDays}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('partyMaster.label.creditLimit')}>{formData?.creditLimit}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('partyMaster.label.remarks')}>{formData?.remarks}</Descriptions.Item>
                </Descriptions>
            </div>
        </>
    );
};

export const ViewDetail = ViewDetailBase;
