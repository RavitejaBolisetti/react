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
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';

const { Text } = Typography;
const { Panel } = Collapse;

const checkBooleanValue = (status) => (status ? <Text type="success">{translateContent('applicationMaster.text.yes')} </Text> : <Text>{translateContent('applicationMaster.text.no')}</Text>);
const checkStatusValue = (status) => (status ? <Text type="success">{translateContent('applicationMaster.text.active')} </Text> : <Text>{translateContent('applicationMaster.text.inActive')}</Text>);
const headerTitle = (title) => (
    <>
        <span>{title}</span>
        <span style={{ color: '#ff3e5b' }}>*</span>
    </>
);

const ViewDealerDetailsMain = ({ applicationDetailsData, viewTitle = translateContent('applicationMaster.title.applicationDetails'), styles }) => {
    const { isLoading, applicationAction, documentType, accessibleLocation, ...formData } = applicationDetailsData[0];
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
                    <Descriptions.Item label={translateContent('applicationMaster.label.applicationId')}>{checkAndSetDefaultValue(formData?.applicationId, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('applicationMaster.label.applicationName')}>{checkAndSetDefaultValue(formData?.applicationName, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('applicationMaster.label.applicationTitle')}>{checkAndSetDefaultValue(formData?.applicationTitle, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('applicationMaster.label.applicationType')}>{checkAndSetDefaultValue(formData?.applicationType, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('applicationMaster.label.parentApplicationId')}>{checkAndSetDefaultValue(formData?.parentApplicationId, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('applicationMaster.label.accessibleLocation')}>{checkAndSetDefaultValue(ACCESSIBLE_LOCATION_INDICATOR[formData?.accessableIndicator], isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('global.label.status')}>{checkAndSetDefaultValue(checkStatusValue(formData?.status))}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('applicationMaster.label.criticalityGroupName')}>{checkAndSetDefaultValue(formData?.criticalityGroupName, isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('applicationMaster.label.documentNumRequired')}>{checkAndSetDefaultValue(checkBooleanValue(formData?.documentNumRequired), isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('applicationMaster.label.termAndConRequired')}>{checkAndSetDefaultValue(checkBooleanValue(formData?.termAndConRequired), isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('applicationMaster.label.digitalSignatureRequired')}>{checkAndSetDefaultValue(checkBooleanValue(formData?.digitalSignatureRequired), isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('applicationMaster.label.isFinanceRelated')}>{checkAndSetDefaultValue(checkBooleanValue(formData?.isFinanceRelated), isLoading)}</Descriptions.Item>
                    <Descriptions.Item label={translateContent('applicationMaster.label.irnIntegrationRequired')}>{checkAndSetDefaultValue(checkBooleanValue(formData?.irnIntegrationRequired), isLoading)}</Descriptions.Item>

                    <div>
                        {applicationAction.length > 0 && (
                            <Collapse onChange={() => handleCollapse(1)} expandIcon={accordianExpandIcon} collapsible="icon" activeKey={openAccordian}>
                                <Panel header={headerTitle(translateContent('applicationMaster.text.applicationActions'))} key="1">
                                    <Divider />
                                    {applicationAction.map((el) => (
                                        <CardAction {...el} />
                                    ))}
                                </Panel>
                            </Collapse>
                        )}
                    </div>

                    {documentType.length > 0 && (
                        <div>
                            <Collapse onChange={() => handleCollapse(2)} expandIcon={accordianExpandIcon} collapsible="icon" activeKey={openAccordian}>
                                <Panel header={headerTitle(translateContent('applicationMaster.text.documentType'))} key="2">
                                    <Divider />
                                    {documentType.map((el) => (
                                        <CardDocument {...el} />
                                    ))}
                                </Panel>
                            </Collapse>
                        </div>
                    )}

                    {accessibleLocation?.length > 0 && (
                        <div>
                            <Collapse onChange={() => handleCollapse(3)} expandIcon={accordianExpandIcon} collapsible="icon" activeKey={openAccordian}>
                                <Panel header={headerTitle(translateContent('applicationMaster.text.accessibleDealerLocation'))} key="3">
                                    <Divider />
                                    {accessibleLocation.map((el) => (
                                        <CardLocation {...el} />
                                    ))}
                                </Panel>
                            </Collapse>
                        </div>
                    )}
                </Descriptions>
            </div>
        </>
    );
};

export default ViewDealerDetailsMain;
