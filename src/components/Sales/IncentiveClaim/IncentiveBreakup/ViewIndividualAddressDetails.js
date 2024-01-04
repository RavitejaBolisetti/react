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
    const { formData, styles, isLoading, dealerListdata } = props;
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xxl: 3, xl: 3, lg: 3, md: 3, sm: 1, xs: 1 },
    };
    console.log('dealerListdata', dealerListdata);
    return (
        <div className={styles.viewDrawerContainer}>
            <>
                <Descriptions {...viewProps}>
                    <Descriptions.Item label={'Dealer Code' || translateContent('customerMaster.label.address')}>{checkAndSetDefaultValue(formData?.zone ,isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={'Dealer Location' || translateContent('customerMaster.label.address')}>{checkAndSetDefaultValue(formData?.zone ,isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={'Document Type' || translateContent('customerMaster.label.address')}>{checkAndSetDefaultValue(formData?.zone ,isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={'Document No' || translateContent('customerMaster.label.address')}>{checkAndSetDefaultValue(formData?.zone ,isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={'Document Date' || translateContent('customerMaster.label.address')}>{checkAndSetDefaultValue(formData?.zone ,isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={'No. Of Vehicles' || translateContent('customerMaster.label.address')}>{checkAndSetDefaultValue(formData?.zone ,isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={'Per Vehicle Amount' || translateContent('customerMaster.label.address')}>{checkAndSetDefaultValue(formData?.zone ,isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={'Incentive Amount' || translateContent('customerMaster.label.address')}>{checkAndSetDefaultValue(formData?.zone ,isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={'GST Amount' || translateContent('customerMaster.label.address')}>{checkAndSetDefaultValue(formData?.zone ,isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={'TDS Amount' || translateContent('customerMaster.label.address')}>{checkAndSetDefaultValue(formData?.zone ,isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={'Remarks' || translateContent('customerMaster.label.address')}>{checkAndSetDefaultValue(formData?.zone ,isLoading)}</Descriptions.Item>
                </Descriptions>
            </>
        </div>
    );
};

export const ViewIndividualAddressDetails = ViewIndividualAddressDetailsBase;
