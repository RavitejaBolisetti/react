/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Descriptions, Typography } from 'antd';
import { ACCESSIBLE_LOCATION_INDICATOR } from 'constants/modules/applicationMaster';
import { translateContent } from 'utils/translateContent';
const { Text } = Typography;

const ViewDetailMain = ({ applicationDetailsData, viewTitle = translateContent('gstIRNAuthentication.irnTransactionListMaster.heading.moduleTitle'), styles }) => {
    const { applicationAction, documentType, accessibleLocation, ...rest } = applicationDetailsData[0];

    const viewOneColProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        title: <div className={styles.viewContainerHeader}>{viewTitle}</div>,
        column: { xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 },
    };

    return (
        <>
            <div className={styles.viewContainerInner}>
                <Descriptions {...viewOneColProps}>
                    <Descriptions.Item label={translateContent('gstIRNAuthentication.irnTransactionListMaster.label.applicationId')}>{rest?.applicationId}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('gstIRNAuthentication.irnTransactionListMaster.label.applicationName')}>{rest?.applicationName || 'NA'}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('gstIRNAuthentication.irnTransactionListMaster.label.applicationType')}>{rest.applicationType || 'NA'}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('gstIRNAuthentication.irnTransactionListMaster.label.accessibleLoc')}>{ACCESSIBLE_LOCATION_INDICATOR[rest?.accessableIndicator] || 'NA'}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('gstIRNAuthentication.irnTransactionListMaster.label.irnIntegeration')}>{rest?.irnIntegrationRequired ? <Text type="success"> Yes </Text> : <Text>No</Text>}</Descriptions.Item>
                </Descriptions>
            </div>
        </>
    );
};

export default ViewDetailMain;
