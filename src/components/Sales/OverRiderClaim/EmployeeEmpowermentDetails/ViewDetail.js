/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Card, Descriptions } from 'antd';
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
        <>
            <Card>
                <Descriptions {...viewProps}>
                    <Descriptions.Item label={translateContent('overRiderClaim.label.mandmInvoiceNo') || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.district, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('overRiderClaim.label.mandmInvoiceDate') || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.district, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('overRiderClaim.label.chessisNo') || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.district, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('overRiderClaim.label.dealerClaimAmount') || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.district, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('overRiderClaim.label.approvedClaimAmount') || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.district, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('overRiderClaim.label.gst') || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.district, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('overRiderClaim.label.gstAmount') || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.district, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('overRiderClaim.label.totalClaimAmount') || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.district, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('overRiderClaim.label.creditNoteNo') || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.district, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('overRiderClaim.label.creditNoteDate') || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.district, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('overRiderClaim.label.creditNoteAmount') || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.district, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('overRiderClaim.label.tdsAmount') || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.district, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('overRiderClaim.label.debitNoteNo') || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.district, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('overRiderClaim.label.debitNoteDate') || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.district, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('overRiderClaim.label.debitNoteAmount') || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.district, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('overRiderClaim.label.irnNumber') || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.district, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('overRiderClaim.label.irnStatus') || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.district, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('overRiderClaim.label.irnDesc') || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.district, isLoading)}</Descriptions.Item>
                </Descriptions>
            </Card>
        </>
    );
};

const ViewDetail = ViewDetailMain;
export default ViewDetail;
