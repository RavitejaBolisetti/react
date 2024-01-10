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
                <Descriptions.Item label={'Chassis No' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.chassisNo, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={'Invoice No' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.invoiceNo, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={'Invoice Date' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.invoiceDate, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={'Corporate Type' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.corporateType, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={'Customer Id' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.customerId, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={'Customer Type' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.customerType, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={'Customer Name' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.customerName, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={'Evaluation Id' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.evaluationId, isLoading)}</Descriptions.Item>
                {/* <Descriptions.Item label={'Approver Remarks' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.approverRemark, isLoading)}</Descriptions.Item> */}

                <Descriptions.Item label={'Dealer Share Amount' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.dealerShareAmount, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={'OEM Share Amount' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.oemShareAmount, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={'Total Amount' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.totalAmount, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={'Approved Dealer Amount' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.approvedTotalAmount, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={'Approved Total Amount' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.MnMclaimNumber, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={'M&M claim Number' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.MnMClaimDate, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={'M&MClaimDate' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.MClaimDate, isLoading)}</Descriptions.Item>
                <Descriptions.Item label={'Remark' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.remarks, isLoading)}</Descriptions.Item>
            </Descriptions>
        </Card>
    );
};

const ViewDetail = ViewDetailMain;
export default ViewDetail;
