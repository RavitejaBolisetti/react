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
                    <Descriptions.Item label={translateContent('customerMaster.label.address')}>{checkAndSetDefaultValue(getCodeValue(addData, formData?.addressType), isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('customerMaster.label.addressL')}>{checkAndSetDefaultValue(formData?.addressLine1, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('customerMaster.label.addressLine')}>{checkAndSetDefaultValue(formData?.addressLine2, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('customerMaster.label.addressLines')}>{checkAndSetDefaultValue(formData?.addressLine3, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('customerMaster.label.pinCode')}>{checkAndSetDefaultValue(formData?.pinCode, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('customerMaster.label.tehsil')}>{checkAndSetDefaultValue(formData?.tehsilName, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('customerMaster.label.city')}>{checkAndSetDefaultValue(formData?.cityName, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('customerMaster.label.district')}>{checkAndSetDefaultValue(formData?.districtName, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('customerMaster.label.state')}>{checkAndSetDefaultValue(formData?.stateName, isLoading)}</Descriptions.Item>
                    {/* <Descriptions.Item label="Contact Name">{checkAndSetDefaultValue(formData?.contactName, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label="Contact Mobile">{checkAndSetDefaultValue(formData?.mobileNumber, isLoading)}</Descriptions.Item> */}
                    <Descriptions.Item>{formData?.deafultAddressIndicator}</Descriptions.Item>
                </Descriptions>
            </>
        </div>
    );
};

export const ViewIndividualAddressDetails = ViewIndividualAddressDetailsBase;
