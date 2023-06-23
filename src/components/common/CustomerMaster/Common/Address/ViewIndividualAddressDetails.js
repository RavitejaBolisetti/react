/*
 *   Copyright (c) 2023
 *   All rights reserved.
 */
import React from 'react';
import { Descriptions } from 'antd';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';

const ViewIndividualAddressDetailsBase = (props) => {
    const { formData, styles } = props;

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
                    <Descriptions.Item label="Address Type">{checkAndSetDefaultValue(formData?.addressType)}</Descriptions.Item>
                    <Descriptions.Item label="Address Line 1">{checkAndSetDefaultValue(formData?.addressLine1)}</Descriptions.Item>
                    <Descriptions.Item label="Address Line 2">{checkAndSetDefaultValue(formData?.addressLine2)}</Descriptions.Item>
                    <Descriptions.Item label="Pincode">{checkAndSetDefaultValue(formData?.pinCode)}</Descriptions.Item>
                    <Descriptions.Item label="Tehsil">{checkAndSetDefaultValue(formData?.tehsilCode)}</Descriptions.Item>
                    <Descriptions.Item label="City">{checkAndSetDefaultValue(formData?.cityCode)}</Descriptions.Item>
                    <Descriptions.Item label="District">{checkAndSetDefaultValue(formData?.districtCode)}</Descriptions.Item>
                    <Descriptions.Item label="State">{checkAndSetDefaultValue(formData?.stateCode)}</Descriptions.Item>
                    <Descriptions.Item label="Contact Name">{checkAndSetDefaultValue(formData?.contactName)}</Descriptions.Item>
                    <Descriptions.Item label="Contact Mobile">{checkAndSetDefaultValue(formData?.mobileNumber)}</Descriptions.Item>
                    <Descriptions.Item>{formData?.deafultAddressIndicator}</Descriptions.Item>
                </Descriptions>
            </>
        </div>
    );
};

export const ViewIndividualAddressDetails = ViewIndividualAddressDetailsBase;
