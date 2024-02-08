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
    const [openAccordian, setOpenAccordian] = useState('');

    const handleCollapse = (key) => {
        setOpenAccordian(key);
    };

    return (
        <>
            {/* <Collapse onChange={() => handleCollapse(1)} expandIcon={expandIcon} expandIconPosition="end" collapsible="icon" activeKey={openAccordian}>
                <Panel header={'Request Detail' || translateContent('applicationMaster.text.applicationActions')} key="1">
                    <Divider /> */}
                    <Descriptions {...viewProps}>
                        {/* <Descriptions.Item label={''}>{checkAndSetDefaultValue(getCodeValue(addData, formData?.amountVehicle), isLoading)}</Descriptions.Item> */}
                        <Descriptions.Item label={'Amount/Vehicle'}>{checkAndSetDefaultValue(formData?.amountVehicle, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label={'Calculation From Date'}>{checkAndSetDefaultValue(formData?.calculationFromDate, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label={'Calculation To Date'}>{checkAndSetDefaultValue(formData?.calculationToDate, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label={'Chassis'}>{checkAndSetDefaultValue(formData?.chassis, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label={'Claim From Date'}>{checkAndSetDefaultValue(formData?.claimFromDate, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label={'Claim To Date'}>{checkAndSetDefaultValue(formData?.claimToDate, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label={'Dealer Code'}>{checkAndSetDefaultValue(formData?.dealerCode, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label={'Exclude Models'}>{checkAndSetDefaultValue(formData?.excludeModels, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label={'Group List'}>{checkAndSetDefaultValue(formData?.groupList, isLoading)}</Descriptions.Item>
                        {/* <Descriptions.Item label={'Incentive Type'}>{checkAndSetDefaultValue(formData?.incentiveType, isLoading)}</Descriptions.Item> */}
                        {/* <Descriptions.Item label={'Status'}>{checkAndSetDefaultValue(formData?.status, isLoading)}</Descriptions.Item> */}
                        {/* <Descriptions.Item label={'Model Group'}>{checkAndSetDefaultValue(formData?.modelgroup, isLoading)}</Descriptions.Item> */}
                        <Descriptions.Item label={'Payout Indicator'}>{checkAndSetDefaultValue(formData?.payoutIndicator, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label={'Payout Slab from'}>{checkAndSetDefaultValue(formData?.payoutSlabFrom, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label={'Payout Slab To'}>{checkAndSetDefaultValue(formData?.payoutSlabTo, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label={'Remarks'}>{checkAndSetDefaultValue(formData?.remarks, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label={'Slab from'}>{checkAndSetDefaultValue(formData?.slabFrom, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label={'Slab To'}>{checkAndSetDefaultValue(formData?.slabTo, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label={'Slab Type'}>{checkAndSetDefaultValue(formData?.slabType, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label={'Status'}>{checkAndSetDefaultValue(formData?.status, isLoading)}</Descriptions.Item>
                        {/* <Descriptions.Item label={'Scheme TGT/Non TGT/Must do TGT'}>{checkAndSetDefaultValue(formData?.schemeTGT, isLoading)}</Descriptions.Item> */}
                        <Descriptions.Item label={'Total Amount'}>{checkAndSetDefaultValue(formData?.totalAmount, isLoading)}</Descriptions.Item>
                        {/* <Descriptions.Item label={'Valid From Date'}>{checkAndSetDefaultValue(formData?.validFromDate, isLoading)}</Descriptions.Item> */}
                        {/* <Descriptions.Item label={'Valid To Date'}>{checkAndSetDefaultValue(formData?.validToDate, isLoading)}</Descriptions.Item> */}

                        <Descriptions.Item>{formData?.deafultAddressIndicator}</Descriptions.Item>
                    </Descriptions>
                {/* </Panel>
            </Collapse> */}
        </>
    );
};

const ViewDetail = ViewDetailMain;
export default ViewDetail;
