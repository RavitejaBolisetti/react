/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Descriptions } from 'antd';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { getCodeValue } from 'utils/getCodeValue';

const ViewIndividualAddressDetailsBase = (props) => {
    const { formData, styles, isLoading, addData } = props;

    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xxl: 3, xl: 3, lg: 3, md: 3, sm: 1, xs: 1 },
    };

    return (
        <div className={styles.viewDrawerContainer}>
            <>
                <Descriptions {...viewProps}>
                    <Descriptions.Item label="Address Type">{checkAndSetDefaultValue(getCodeValue(addData, formData?.addressType), isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="Address Line 1">{checkAndSetDefaultValue(formData?.addressLine1, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="Address Line 2">{checkAndSetDefaultValue(formData?.addressLine2, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="Pincode">{checkAndSetDefaultValue(formData?.pinCode, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="Tehsil">{checkAndSetDefaultValue(formData?.tehsilName, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="City">{checkAndSetDefaultValue(formData?.cityName, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="District">{checkAndSetDefaultValue(formData?.districtName, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="State">{checkAndSetDefaultValue(formData?.stateName, isLoading)}</Descriptions.Item>
                    {/* <Descriptions.Item label="Contact Name">{checkAndSetDefaultValue(formData?.contactName, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="Contact Mobile">{checkAndSetDefaultValue(formData?.mobileNumber, isLoading)}</Descriptions.Item> */}
                    <Descriptions.Item>{formData?.deafultAddressIndicator}</Descriptions.Item>
                </Descriptions>
            </>
        </div>
    );
};

export const ViewIndividualAddressDetails = ViewIndividualAddressDetailsBase;
