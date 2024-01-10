/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Card, Descriptions, Collapse, Divider } from 'antd';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { translateContent } from 'utils/translateContent';
import { expandIcon } from 'utils/accordianExpandIcon';

const { Panel } = Collapse;

const ViewDetailMain = (props) => {
    const { formData, isLoading } = props;
    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        column: { xs: 1, sm: 3, lg: 3, xl: 3, xxl: 3 },
    };

    return (
        <Card>
            <Descriptions {...viewProps}>
            <Descriptions.Item label={'Credit Note Number' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.creditNoteNumber, isLoading)}</Descriptions.Item>
            <Descriptions.Item label={'Credit Note Date' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.creditNoteDate, isLoading)}</Descriptions.Item>
            <Descriptions.Item label={'Credit Note Amount' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.creditNoteAmount, isLoading)}</Descriptions.Item>
            <Descriptions.Item label={'Debit Note Number' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.debitNoteNumber, isLoading)}</Descriptions.Item>
            <Descriptions.Item label={'Debit Note Date' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.debitNoteDate, isLoading)}</Descriptions.Item>
            <Descriptions.Item label={'Debit Note Amount' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.debitNoteAmount, isLoading)}</Descriptions.Item>
            <Descriptions.Item label={'M&M Claim Number' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.mnMClaimNumber, isLoading)}</Descriptions.Item>
            <Descriptions.Item label={'M&M Claim Date' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.mnMClaimDate, isLoading)}</Descriptions.Item>
            <Descriptions.Item label={'Re Credit Note Number' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.reCreditNoteNumber, isLoading)}</Descriptions.Item>
            <Descriptions.Item label={'Re Credit Note Date' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.reCreditNoteDate, isLoading)}</Descriptions.Item>
            <Descriptions.Item label={'Re Credit Note Amount' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.reCreditNoteAmount, isLoading)}</Descriptions.Item>
            <Descriptions.Item label={'Re Debit Note Number' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.reDebitNoteNumber, isLoading)}</Descriptions.Item>
            <Descriptions.Item label={'Re Debit Note Date' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.reDebitNoteDate, isLoading)}</Descriptions.Item>
            <Descriptions.Item label={'Re Debit Note Amount' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.reDebitNoteAmount, isLoading)}</Descriptions.Item>
            </Descriptions>
        </Card>
    );
};

const ViewDetail = ViewDetailMain;
export default ViewDetail;
