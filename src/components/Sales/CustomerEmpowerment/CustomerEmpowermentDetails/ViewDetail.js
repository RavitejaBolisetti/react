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
            <Collapse onChange={() => handleCollapse(1)} expandIcon={expandIcon} expandIconPosition="end" collapsible="icon" activeKey={openAccordian}>
                <Panel header={'Credit/Debit Detail' || translateContent('applicationMaster.text.applicationActions')} key="1">
                    <Divider />
                    <Descriptions {...viewProps}>
                        <Descriptions.Item label={'Credit Note No' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label={'Credit Note Date' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label={'Credit Note Amount' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.district, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label='Debit Note No'>{formData?.isActive ? 'Active' : 'InActive'}</Descriptions.Item>
                        <Descriptions.Item label='Debit Note Date'>{formData?.isActive ? 'Active' : 'InActive'}</Descriptions.Item>
                        <Descriptions.Item label={'Debit Note Amount'}>{formData?.isActive ? 'Active' : 'InActive'}</Descriptions.Item>
                    </Descriptions>
                </Panel>
            </Collapse>
            <Collapse onChange={() => handleCollapse(2)} expandIcon={expandIcon} expandIconPosition="end" collapsible="icon" activeKey={openAccordian}>
                <Panel header={'Customer Details' || translateContent('applicationMaster.text.applicationActions')} key="2">
                    <Divider />
                    <Descriptions {...viewProps}>
                        <Descriptions.Item label={'Reason for Delay' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.district, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label={'Invoice ID' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.district, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label={'Invoice Date' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.district, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label={'Invoice Status' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.district, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label={'Segment' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.district, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label={'Model Description' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.district, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label={'Chassis No' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.district, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label={'Customer Name' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.district, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label={'Requested Amount' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.district, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label={'VDN Date' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.district, isLoading)}</Descriptions.Item>
                        <Descriptions.Item label={'Dealer remarks' || translateContent('amcRegistration.label.chassisNumber')}>{checkAndSetDefaultValue(formData?.amcCustomerDetails?.district, isLoading)}</Descriptions.Item>
                    </Descriptions>
                </Panel>
            </Collapse>
        </>
    );
};

const ViewDetail = ViewDetailMain;
export default ViewDetail;
