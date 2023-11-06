/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Descriptions, Typography, Collapse, Divider } from 'antd';
import { ACCESSIBLE_LOCATION_INDICATOR } from 'constants/modules/applicationMaster';

import CardDocument from './CardDocument';
import CardLocation from './CardLocation';
import CardAction from './CardAction';

import { accordianExpandIcon } from 'utils/accordianExpandIcon';
import { translateContent } from 'utils/translateContent';

const { Text } = Typography;
const { Panel } = Collapse;

const ViewDealerDetailsMain = ({ applicationDetailsData, viewTitle = translateContent('applicationMaster.title.applicationDetails'), styles }) => {
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
            <div className={`${styles.viewContainer} ${styles.viewOneColProps}`}>
                <Descriptions {...viewOneColProps}>
                    <Descriptions.Item label={translateContent('applicationMaster.label.applicationId')}>{rest?.applicationId}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('applicationMaster.label.applicationName')}>{rest?.applicationName || 'NA'}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('applicationMaster.label.applicationTitle')}>{rest?.applicationTitle || 'NA'}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('applicationMaster.label.applicationType')}>{rest.applicationType || 'NA'}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('applicationMaster.label.parentApplicationId')}>{rest?.parentApplicationId || 'NA'}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('applicationMaster.label.accessibleLocation')}>{ACCESSIBLE_LOCATION_INDICATOR[rest?.accessableIndicator] || 'NA'}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('global.label.status')}>{rest?.status ? <Text type="success">{translateContent('applicationMaster.text.active')}</Text> : <Text>{translateContent('applicationMaster.text.inActive')}</Text>}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('applicationMaster.label.criticalityGroupName')}>{rest?.criticalityGroupName || 'NA'}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('applicationMaster.label.documentNumRequired')}>{rest?.documentNumRequired ? <Text type="success"> {translateContent('applicationMaster.text.yes')} </Text> : <Text>{translateContent('applicationMaster.text.no')}</Text>}</Descriptions.Item>

                    <Descriptions.Item label={translateContent('applicationMaster.label.termAndConRequired')}>{rest?.termAndConRequired ? <Text type="success"> {translateContent('applicationMaster.text.yes')} </Text> : <Text>{translateContent('applicationMaster.text.no')}</Text>}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('applicationMaster.label.digitalSignatureRequired')}>{rest?.digitalSignatureRequired ? <Text type="success"> {translateContent('applicationMaster.text.yes')} </Text> : <Text>{translateContent('applicationMaster.text.no')}</Text>}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('applicationMaster.label.isFinanceRelated')}>{rest?.isFinanceRelated ? <Text type="success"> {translateContent('applicationMaster.text.yes')} </Text> : <Text>{translateContent('applicationMaster.text.no')}</Text>}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('applicationMaster.label.irnIntegrationRequired')}>{rest?.irnIntegrationRequired ? <Text type="success"> {translateContent('applicationMaster.text.yes')} </Text> : <Text>{translateContent('applicationMaster.text.no')}</Text>}</Descriptions.Item>

                    <div>
                        {applicationAction.length > 0 && (
                            <Collapse onChange={() => handleCollapse(1)} expandIcon={accordianExpandIcon} collapsible="icon" activeKey={openAccordian}>
                                <Panel
                                    header={
                                        <>
                                            <span>{translateContent('applicationMaster.text.applicationActions')}</span>
                                            <span style={{ color: '#ff3e5b' }}>*</span>
                                        </>
                                    }
                                    key="1"
                                >
                                    <Divider />
                                    {applicationAction.map((el) => (
                                        <CardAction {...el} />
                                    ))}
                                </Panel>
                            </Collapse>
                        )}
                    </div>
                    <div>
                        {documentType.length > 0 && (
                            <Collapse onChange={() => handleCollapse(2)} expandIcon={accordianExpandIcon} collapsible="icon" activeKey={openAccordian}>
                                <Panel
                                    header={
                                        <>
                                            <span>{translateContent('applicationMaster.text.documentType')}</span>
                                            <span style={{ color: '#ff3e5b' }}>*</span>
                                        </>
                                    }
                                    key="2"
                                >
                                    <Divider />
                                    {documentType.map((el) => (
                                        <CardDocument {...el} />
                                    ))}
                                </Panel>
                            </Collapse>
                        )}
                    </div>
                    <div>
                        {accessibleLocation?.length > 0 && (
                            <Collapse onChange={() => handleCollapse(3)} expandIcon={accordianExpandIcon} collapsible="icon" activeKey={openAccordian}>
                                <Panel
                                    header={
                                        <>
                                            <span>{translateContent('applicationMaster.text.accessibleDealerLocation')}</span>
                                            <span style={{ color: '#ff3e5b' }}>*</span>
                                        </>
                                    }
                                    key="3"
                                >
                                    <Divider />
                                    {accessibleLocation.map((el) => (
                                        <CardLocation {...el} />
                                    ))}
                                </Panel>
                            </Collapse>
                        )}
                    </div>
                </Descriptions>
            </div>
        </>
    );
};

export default ViewDealerDetailsMain;
