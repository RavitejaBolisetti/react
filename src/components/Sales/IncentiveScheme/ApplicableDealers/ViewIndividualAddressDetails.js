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
                    <Descriptions.Item label={'zone' || translateContent('customerMaster.label.address')}>{checkAndSetDefaultValue(formData?.zone ,isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={'Area Office' || translateContent('customerMaster.label.addressL')}>{checkAndSetDefaultValue(formData?.areaOffice, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={'Dealer Name' || translateContent('customerMaster.label.dealerName')}>{checkAndSetDefaultValue(formData?.dealerName, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={'Location Name' || translateContent('customerMaster.label.addressLines')}>{checkAndSetDefaultValue(formData?.locationName, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={'Fixed Amount/Lump Sum Incentive' || translateContent('customerMaster.label.pinCode')}>{checkAndSetDefaultValue(formData?.fixedAmountLumpSumIncentive, isLoading)}</Descriptions.Item>
                </Descriptions>
            </>
        </div>
    );
};

export const ViewIndividualAddressDetails = ViewIndividualAddressDetailsBase;
