/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Descriptions } from 'antd';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { translateContent } from 'utils/translateContent';

const ViewDetailMain = (props) => {
    const { formData, isLoading } = props;
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };

    return (
        <Descriptions {...viewProps}>
            <Descriptions.Item label={'Budgeted Quantity' || translateContent('customerMaster.label.address')}>{checkAndSetDefaultValue(formData?.budgetedQuentity, isLoading)}</Descriptions.Item>
            <Descriptions.Item label={'Bugeted Amount' || translateContent('customerMaster.label.address')}>{checkAndSetDefaultValue(formData?.budgetedAmount, isLoading)}</Descriptions.Item>
            <Descriptions.Item label={'Already Claimed Quantity' || translateContent('customerMaster.label.address')}>{checkAndSetDefaultValue(formData?.alreadyClaimedQuentity, isLoading)}</Descriptions.Item>
            <Descriptions.Item label={'Already Claimed Amount' || translateContent('customerMaster.label.address')}>{checkAndSetDefaultValue(formData?.alreadyClaimedAmount, isLoading)}</Descriptions.Item>
            <Descriptions.Item label={'Claimed Quantity' || translateContent('customerMaster.label.address')}>{checkAndSetDefaultValue(formData?.claimedQuantity, isLoading)}</Descriptions.Item>
            <Descriptions.Item label={'Claimed Amount' || translateContent('customerMaster.label.address')}>{checkAndSetDefaultValue(formData?.claimedAmount, isLoading)}</Descriptions.Item>
        </Descriptions>
    );
};

const ViewDetail = ViewDetailMain;
export default ViewDetail;
