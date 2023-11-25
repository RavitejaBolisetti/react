/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd. 
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Card, Descriptions, Divider } from 'antd';
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
        <Card>
            <Descriptions {...viewProps}>
                <Descriptions.Item label={translateContent('amcRegistration.label.customerId')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.customerCode, isLoading)}</Descriptions.Item>
            </Descriptions>
            <Divider />
            <Descriptions {...viewProps}>
                <Descriptions.Item label={"Invoice Number" || translateContent('amcRegistration.label.customerName')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.invoiceNo, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={"Invoice Date" ||translateContent('amcRegistration.label.invoiceDate')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.customerAddress, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={"Customer Name" || translateContent('amcRegistration.label.customerName')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.state, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={"Customer Category" || translateContent('amcRegistration.label.customerCategory')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.customerCity, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={"Chassis Number" || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.district, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={"Ins. Cover Note No." || translateContent('amcRegistration.label.insCoverNoteNo')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.tehsil, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={"Ins. Cover Note Date"||translateContent('amcRegistration.label.insCoverNoteDate')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.locality, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={"Ins Premium Value"||translateContent('amcRegistration.label.insPremiumValue')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.pinCode, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={"Insurance Company Name" || translateContent('amcRegistration.label.insCompanyName')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.customerPhoneNumber, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={"Financier Name" || translateContent('amcRegistration.label.financierName')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.gstin, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={"Dealer Share Amount" || translateContent('amcRegistration.label.dealerShareAmount')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.gstin, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={"OEM Share Amount" || translateContent('amcRegistration.label.oemShareAmount')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.gstin, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={"M & M Claim No" || translateContent('amcRegistration.label.mnmClaimNo')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.gstin, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={"M & M Claim Date" || translateContent('amcRegistration.label.mnmClaimDate')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.gstin, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={"Remarks" || translateContent('amcRegistration.label.remarks')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.gstin, isLoading)}</Descriptions.Item>
            </Descriptions>
        </Card>
    );
};

const ViewDetail = ViewDetailMain;
export default ViewDetail;
