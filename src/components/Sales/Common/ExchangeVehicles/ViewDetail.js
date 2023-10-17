/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Card, Descriptions } from 'antd';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { getCodeValue } from 'utils/getCodeValue';
import { prepareCaption } from 'utils/prepareCaption';

const ViewDetailMain = (props) => {
    const { formData, isLoading, modelData, variantData, typeData, schemeLovData, financeLovData, isMahindraMake } = props;
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };

    const [nameAttributes, setnameAttributes] = useState({ modelGroupName: '', variantName: '' });

    useEffect(() => {
        if (formData && formData?.make && modelData?.length && variantData?.length) {
            if (isMahindraMake) {
                const modelGroupName = getCodeValue(modelData, formData?.modelGroup, 'modelGroupDescription', false, 'modelGroupCode');
                const variantName = getCodeValue(variantData, formData?.variant, 'variantDescription', false, 'variantCode');
                setnameAttributes({
                    modelGroupName,
                    variantName,
                });
            } else {
                const modelGroupName = getCodeValue(modelData, formData?.modelGroup);
                const variantName = getCodeValue(variantData, formData?.variant);
                setnameAttributes({
                    modelGroupName,
                    variantName,
                });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formData, isMahindraMake, modelData, variantData]);

    return (
        <Card>
            <Descriptions {...viewProps}>
                <Descriptions.Item label="Exchange">{checkAndSetDefaultValue(formData?.exchange ? 'Yes' : 'No', isLoading)}</Descriptions.Item>
            </Descriptions>
            {formData?.exchange === 1 && (
                <>
                    <Descriptions {...viewProps} title={prepareCaption('Vehicle Details')}>
                        <Descriptions.Item label="Old Reg. Number">{checkAndSetDefaultValue(formData?.oldRegistrationNumber, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Make">{checkAndSetDefaultValue(getCodeValue(typeData?.VEHCL_MFG, formData?.make), isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Model Group">{nameAttributes?.modelGroupName}</Descriptions.Item>
                        <Descriptions.Item label="Variant">{nameAttributes?.variantName}</Descriptions.Item>
                        <Descriptions.Item label="KMS">{checkAndSetDefaultValue(formData?.kilometer, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Usage">{checkAndSetDefaultValue(getCodeValue(typeData?.VEHCL_USAG, formData?.usageCode), isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Year of Registration">{checkAndSetDefaultValue(formData?.yearOfRegistrationCode, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Month of Registration">{checkAndSetDefaultValue(getCodeValue(typeData?.MONTH, formData?.monthOfRegistrationCode), isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Old Chassis Number">{checkAndSetDefaultValue(formData?.oldChessisNumber, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Hypothecated To">{checkAndSetDefaultValue(getCodeValue(financeLovData, formData?.hypothicatedToCode), isLoading)}</Descriptions.Item>
                    </Descriptions>
                    <Descriptions {...viewProps} title={prepareCaption('Customer Details')}>
                        <Descriptions.Item label="Customer Name">{checkAndSetDefaultValue(formData?.customerName, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Relationship">{checkAndSetDefaultValue(getCodeValue(typeData?.REL_TYPE, formData?.relationshipCode), isLoading)}</Descriptions.Item>
                    </Descriptions>
                    <Descriptions {...viewProps} title={prepareCaption('Scheme')}>
                        <Descriptions.Item label="Scheme Name">{checkAndSetDefaultValue(getCodeValue(schemeLovData, formData?.schemeCode), isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Scheme Amount">{checkAndSetDefaultValue(formData?.schemeAmount, isLoading)}</Descriptions.Item>
                    </Descriptions>
                    <Descriptions {...viewProps} title={prepareCaption('Price')}>
                        <Descriptions.Item label="Customer Expected Price">{checkAndSetDefaultValue(formData?.customerExpectedPrice, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label="Procurement Price">{checkAndSetDefaultValue(formData?.procurementPrice, isLoading)}</Descriptions.Item>
                    </Descriptions>
                </>
            )}
        </Card>
    );
};

export const ViewDetail = ViewDetailMain;
