/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Descriptions, Typography, Collapse, Divider } from 'antd';
import { ACCESSIBLE_LOCATION_INDICATOR } from 'constants/modules/applicationMaster';

// import CardDocument from './CardDocument';
// import CardLocation from './CardLocation';
// import CardAction from './CardAction';

import { accordianExpandIcon } from 'utils/accordianExpandIcon';

const { Text } = Typography;
const { Panel } = Collapse;

const ViewDealerDetailsMain = ({ applicationDetailsData, viewTitle = 'Application Details', styles }) => {
    const { applicationAction, documentType, accessibleLocation, ...rest } = applicationDetailsData[0];
    const [openAccordian, setOpenAccordian] = useState('');

    const viewOneColProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        title: <div className={styles.viewContainerHeader}>{viewTitle}</div>,
        column: { xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 },
    };

    const handleCollapse = (key) => {
        setOpenAccordian((prev) => (prev === key ? '' : key));
    };

    return (
        <>
            <div className={styles.viewContainerInner}>
                <Descriptions {...viewOneColProps}>
                    <Descriptions.Item label="Application ID">{rest?.applicationId}</Descriptions.Item>
                    <Descriptions.Item label="Application Name/Reports">{rest?.applicationName || 'NA'}</Descriptions.Item>
                    <Descriptions.Item label="Application Type">{rest.applicationType || 'NA'}</Descriptions.Item>
                    <Descriptions.Item label="Accessible Location">{ACCESSIBLE_LOCATION_INDICATOR[rest?.accessableIndicator] || 'NA'}</Descriptions.Item>
                    <Descriptions.Item label="IRN Integration">{rest?.irnIntegrationRequired ? <Text type="success"> Yes </Text> : <Text>No</Text>}</Descriptions.Item>

                    {/* 
                    <Descriptions.Item label="Application Title">{rest?.applicationTitle || 'NA'}</Descriptions.Item> 
                    <Descriptions.Item label="Parent Application ID">{rest?.parentApplicationId || 'NA'}</Descriptions.Item>
                    <Descriptions.Item label="Status">{rest?.status ? <Text type="success">Active</Text> : <Text>Inactive</Text>}</Descriptions.Item>
                    <Descriptions.Item label="Application Criticality Group">{rest?.criticalityGroupName || 'NA'}</Descriptions.Item>
                    <Descriptions.Item label="Document number to be generated">{rest?.documentNumRequired ? <Text type="success"> Yes </Text> : <Text>No</Text>}</Descriptions.Item>
                    <Descriptions.Item label="T&C Required">{rest?.termAndConRequired ? <Text type="success"> Yes </Text> : <Text>No</Text>}</Descriptions.Item>
                    <Descriptions.Item label="Digital Signature Required">{rest?.digitalSignatureRequired ? <Text type="success"> Yes </Text> : <Text>No</Text>}</Descriptions.Item>
                    <Descriptions.Item label="Is Finance Related">{rest?.isFinanceRelated ? <Text type="success"> Yes </Text> : <Text>No</Text>}</Descriptions.Item> */}

                    
                </Descriptions>
            </div>
        </>
    );
};

export default ViewDealerDetailsMain;
