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
                    <Descriptions.Item label={'Product' || translateContent('customerMaster.label.address')}>{checkAndSetDefaultValue(formData?.product ,isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={'Sigment' || translateContent('customerMaster.label.addressL')}>{checkAndSetDefaultValue(formData?.sigment, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={'Model Group' || translateContent('customerMaster.label.dealerName')}>{checkAndSetDefaultValue(formData?.modelGroup, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={'Model' || translateContent('customerMaster.label.addressLines')}>{checkAndSetDefaultValue(formData?.model, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={'Incentive Model' || translateContent('customerMaster.label.pinCode')}>{checkAndSetDefaultValue(formData?.incentiveModel, isLoading)}</Descriptions.Item>

                    <Descriptions.Item label={'Incentive' || translateContent('customerMaster.label.address')}>{checkAndSetDefaultValue(formData?.target ,isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={'Retail Target' || translateContent('customerMaster.label.address')}>{checkAndSetDefaultValue(formData?.retailTarget ,isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={'Billing Target' || translateContent('customerMaster.label.address')}>{checkAndSetDefaultValue(formData?.billingTarget ,isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={'Fixed Amount/Lump Sum Incentive Amount' || translateContent('customerMaster.label.address')}>{checkAndSetDefaultValue(formData?.fixedLumpsumAmpunt ,isLoading)}</Descriptions.Item>
                </Descriptions>
            </>
        </div>
    );
};

export const ViewIndividualAddressDetails = ViewIndividualAddressDetailsBase;
