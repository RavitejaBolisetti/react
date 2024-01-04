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
                    <Descriptions.Item label={'Credit Note No' || translateContent('customerMaster.label.address')}>{checkAndSetDefaultValue(formData?.creditNoteNo ,isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={'Credit Note Date' || translateContent('customerMaster.label.addressL')}>{checkAndSetDefaultValue(formData?.creditNoteDate, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={'Credit Note Amount' || translateContent('customerMaster.label.dealerName')}>{checkAndSetDefaultValue(formData?.creditNoteAmount, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={'Debit Note No' || translateContent('customerMaster.label.address')}>{checkAndSetDefaultValue(formData?.debitNoteNo ,isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={'Debit Note Date' || translateContent('customerMaster.label.addressL')}>{checkAndSetDefaultValue(formData?.debitNoteDate, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={'Debit Note Amount' || translateContent('customerMaster.label.dealerName')}>{checkAndSetDefaultValue(formData?.debitNoteAmount, isLoading)}</Descriptions.Item>
                </Descriptions>
            </>
        </div>
    );
};

export const ViewIndividualAddressDetails = ViewIndividualAddressDetailsBase;
