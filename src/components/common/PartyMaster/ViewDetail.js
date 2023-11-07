/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Descriptions } from 'antd';

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
                    <Descriptions.Item label="Party Category">{formData?.partyCategory}</Descriptions.Item>
                    <Descriptions.Item label="Party Code">{formData?.partyCode}</Descriptions.Item>
                    <Descriptions.Item label="Party Name">{formData?.partyName}</Descriptions.Item>
                    <Descriptions.Item label="Contact Person Name">{formData?.contactPersonName}</Descriptions.Item>
                    <Descriptions.Item label="Designation">{formData?.designation}</Descriptions.Item>
                    {/* <Descriptions.Item label="Mobile Number">{formData?.mobileNumber}</Descriptions.Item> */}
                    <Descriptions.Item label="Address">{formData?.address}</Descriptions.Item>
                    <Descriptions.Item label="Pin Code">{formData?.pinCode}</Descriptions.Item>
                    <Descriptions.Item label="City">{formData?.city}</Descriptions.Item>
                    <Descriptions.Item label="Tehsil">{formData?.tehsil}</Descriptions.Item>
                    <Descriptions.Item label="District">{formData?.district}</Descriptions.Item>
                    <Descriptions.Item label="State">{formData?.state}</Descriptions.Item>
                    <Descriptions.Item label="Mobile Number">{formData?.mobileNumber}</Descriptions.Item>
                    <Descriptions.Item label="Alternate Mobile Number">{formData?.alternateMobileNumber}</Descriptions.Item>
                    <Descriptions.Item label="GSTIN Number">{formData?.gstInNumber}</Descriptions.Item>
                    <Descriptions.Item label="PAN Number">{formData?.panNumber}</Descriptions.Item>
                    <Descriptions.Item label="Parts Discount(%)">{formData?.partsDiscount}</Descriptions.Item>
                    <Descriptions.Item label="Credit Days">{formData?.creditDays}</Descriptions.Item>
                    <Descriptions.Item label="Credit limit">{formData?.creditLimit}</Descriptions.Item>
                    <Descriptions.Item label="Remarks">{formData?.remarks}</Descriptions.Item>
                </Descriptions>
            </div>
        </>
    );
};

export const ViewDetail = ViewDetailBase;
