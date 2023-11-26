/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Card, Descriptions } from 'antd';
import { translateContent } from 'utils/translateContent';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { getCodeValue } from 'utils/getCodeValue';

const ViewDetailMain = (props) => {
    const { formData, isLoading } = props;

    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xxl: 3, xl: 3, lg: 3, md: 3, sm: 3, xs: 3 },
    };

    return (
        <Card>
            <Descriptions {...viewProps}>
                <Descriptions.Item label={translateContent('coDealer.label.indentDetails.indentNumber')}>{checkAndSetDefaultValue(formData?.indentNumber, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('coDealer.label.indentDetails.indentDate')}>{checkAndSetDefaultValue(formData?.indentDate, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('coDealer.label.indentDetails.dealerCode')}>{checkAndSetDefaultValue(formData?.dealerCode, isLoading)}</Descriptions.Item>

                <Descriptions.Item label={translateContent('coDealer.label.indentDetails.dealerName')}>{checkAndSetDefaultValue(formData?.dealerName, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('coDealer.label.indentDetails.address')}>{checkAndSetDefaultValue(formData?.address, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('coDealer.label.indentDetails.cityDistrict')}>{checkAndSetDefaultValue(formData?.city, isLoading)}</Descriptions.Item>

                <Descriptions.Item label={translateContent('coDealer.label.indentDetails.state')}>{checkAndSetDefaultValue(formData?.state, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('coDealer.label.indentDetails.pinCode')}>{checkAndSetDefaultValue(formData?.pinCode, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('coDealer.label.indentDetails.gstIn')}>{checkAndSetDefaultValue(formData?.gstIn, isLoading)}</Descriptions.Item>
            </Descriptions>
        </Card>
    );
};

export const ViewDetail = ViewDetailMain;
