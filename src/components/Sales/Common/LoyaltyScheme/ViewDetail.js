/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Card, Descriptions } from 'antd';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { prepareCaption } from 'utils/prepareCaption';
import { getCodeValue } from 'utils/getCodeValue';
import { translateContent } from 'utils/translateContent';

const ViewDetailMain = (props) => {
    const { typeData, customerForm, isLoading, modelData, variantData } = props;

    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };

    const modelGroupName = getCodeValue(modelData, customerForm?.vehicleModelGroup, 'modelGroupDescription', false, 'modelGroupCode');
    const variantName = getCodeValue(variantData, customerForm?.variantCode, 'variantDescription', false, 'variantCode');
    return (
        <Card>
            <Descriptions {...viewProps} title={prepareCaption('Vehicle Details')}>
                <Descriptions.Item label={translateContent('commonModules.label.loyaltyScheme.oldRegistrationNumber')}>{checkAndSetDefaultValue(customerForm?.registrationNumber, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('commonModules.label.loyaltyScheme.make')}>{checkAndSetDefaultValue(getCodeValue(typeData?.VEHCL_MFG, customerForm?.make), isLoading)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('commonModules.label.loyaltyScheme.modelGroup')}>{checkAndSetDefaultValue(modelGroupName, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('commonModules.label.loyaltyScheme.variant')}>{checkAndSetDefaultValue(variantName, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('commonModules.label.loyaltyScheme.usage')}>{checkAndSetDefaultValue(customerForm?.vehicleUsage, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('commonModules.label.loyaltyScheme.yearOfRegistration')}>{checkAndSetDefaultValue(customerForm?.registrationYear, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('commonModules.label.loyaltyScheme.monthOfRegistration')}>{checkAndSetDefaultValue(customerForm?.registrationMonth, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('commonModules.label.loyaltyScheme.oldChassisNumber')}>{checkAndSetDefaultValue(customerForm?.oldChassisNumber, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('commonModules.label.loyaltyScheme.remarks')}>{checkAndSetDefaultValue(customerForm?.remarks, isLoading)}</Descriptions.Item>
            </Descriptions>
            <Descriptions {...viewProps} title={prepareCaption(translateContent('vehicleInvoiceGeneration.heading.captions.customerDetails'))}>
                <Descriptions.Item label={translateContent('commonModules.label.loyaltyScheme.customerName')}>{checkAndSetDefaultValue(customerForm?.customerName, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('commonModules.label.loyaltyScheme.relationShip')}>{checkAndSetDefaultValue(customerForm?.relationName, isLoading)}</Descriptions.Item>
            </Descriptions>
            <Descriptions {...viewProps} title={prepareCaption(translateContent('vehicleInvoiceGeneration.heading.captions.scheme'))}>
                <Descriptions.Item label={translateContent('commonModules.label.loyaltyScheme.schemeName')}>{checkAndSetDefaultValue(customerForm?.schemeName, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={translateContent('commonModules.label.loyaltyScheme.schemeAmount')}>{checkAndSetDefaultValue(customerForm?.schemeAmount, isLoading)}</Descriptions.Item>
            </Descriptions>
        </Card>
    );
};

export const ViewDetail = ViewDetailMain;
