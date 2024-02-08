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
                {/* <Descriptions.Item label={'Scheme Id' || translateContent('city.label.cityCode')}>{formData?.schemeId}</Descriptions.Item> */}
                {/* <Descriptions.Item label={'Scheme Name' || translateContent('city.label.cityName')}>{formData?.schemeName}</Descriptions.Item> */}
                {/* <Descriptions.Item label={'Dealer Code' || translateContent('global.label.status')}>{formData?.dealerCode }</Descriptions.Item> */}
                <Descriptions.Item label={'Sale Modal Group' || translateContent('global.label.status')}>{formData?.saleModalGroup}</Descriptions.Item>
                <Descriptions.Item label={'Modal Group Description' || translateContent('global.label.status')}>{formData?.modalGroupDescription}</Descriptions.Item>
                <Descriptions.Item label={'From Date' || translateContent('global.label.status')}>{formData?.fromDate}</Descriptions.Item>
                <Descriptions.Item label={'To Date' || translateContent('global.label.status')}>{formData?.toDate}</Descriptions.Item>
                <Descriptions.Item label={'Incentive Amount' || translateContent('global.label.status')}>{formData?.incentiveAmount}</Descriptions.Item>
                <Descriptions.Item label={'Proposal ID' || translateContent('global.label.status')}>{formData?.proposalId}</Descriptions.Item>
                {/* <Descriptions.Item label={'Status' || translateContent('global.label.status')}>{formData?.status}</Descriptions.Item> */}
            </Descriptions>

            {/* </Panel>
            </Collapse> */}
        </>
    );
};

const ViewDetail = ViewDetailMain;
export default ViewDetail;
