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
                    {/* <Descriptions.Item label={translateContent('customerMaster.label.address')}>{checkAndSetDefaultValue(getCodeValue(addData, formData?.addressType), isLoading)}</Descriptions.Item> */}
                    {/* <Descriptions.Item label={'Part No'}>{formData?.partNo}</Descriptions.Item> */}
                    {/* <Descriptions.Item label={'Part Descripton'}>{formData?.partDescription}</Descriptions.Item> */}
                    {/* <Descriptions.Item label={'Unit Of Measure'}>{formData?.unitOfMeasure}</Descriptions.Item> */}
                    <Descriptions.Item label={'From Bin Store'}>{formData?.fromBinStore}</Descriptions.Item>
                    <Descriptions.Item label={'From Bin Location'}>{formData?.fromBinLocation}</Descriptions.Item>
                    <Descriptions.Item label={'From Bin Stock'}>{formData?.fromBinStock}</Descriptions.Item>
                    {/* <Descriptions.Item label={'Transfer Quantity'}>{formData?.transferQuantity}</Descriptions.Item> */}
                    <Descriptions.Item label={'To Bin Store'}>{formData?.toBinStore}</Descriptions.Item>
                    <Descriptions.Item label={'To Bin Location'}>{formData?.toBinLocation}</Descriptions.Item>
                    <Descriptions.Item label={'To Bin Stock'}>{formData?.toBinStock}</Descriptions.Item>
                    <Descriptions.Item label={'Mark bin location as default'}>{formData?.defaultBinLocation}</Descriptions.Item>
                </Descriptions>
            </>
        </div>
    );
};

export const ViewIndividualAddressDetails = ViewIndividualAddressDetailsBase;
