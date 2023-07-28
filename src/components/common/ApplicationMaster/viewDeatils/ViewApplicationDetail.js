/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Descriptions, Typography, Collapse, Space, Row, Col, Divider } from 'antd';
import { ACCESSIBLE_LOCATION_INDICATOR } from 'constants/modules/applicationMaster';

import CardDocument from './CardDocument';
import CardLocation from './CardLocation';
import CardAction from './CardAction';

import { accordianExpandIcon } from 'utils/accordianExpandIcon';

const { Text } = Typography;
const { Panel } = Collapse;

const ViewDealerDetailsMain = ({ applicationDetailsData, viewTitle = 'Application Details', styles }) => {
    const { applicationAction, documentType, accessibleLocation, ...rest } = applicationDetailsData[0];
    const [openAccordian, setOpenAccordian] = useState('');

    const viewProps = {
        bordered: false,
        colon: false,
        layout: 'vertical',
        title: <div className={styles.contentHeaderRightBackground}>{viewTitle}</div>,
        column: { xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 },
    };

    const handleCollapse = (key) => {
        setOpenAccordian((prev) => (prev === key ? '' : key));
    };

    return (
        <div className={`${styles.viewContainer} ${styles.hierarchyRightContainer}`}>
            <Descriptions {...viewProps}>
                <Descriptions.Item label="Application ID">{rest?.applicationId}</Descriptions.Item>
                <Descriptions.Item label="Application Name">{rest?.applicationName || 'NA'}</Descriptions.Item>
                <Descriptions.Item label="Application Title">{rest?.applicationTitle || 'NA'}</Descriptions.Item>
                <Descriptions.Item label="Application Type">{rest.applicationType || 'NA'}</Descriptions.Item>
                <Descriptions.Item label="Parent Application ID">{rest?.parentApplicationId || 'NA'}</Descriptions.Item>
                <Descriptions.Item label="Accessible Location">{ACCESSIBLE_LOCATION_INDICATOR[rest?.accessableIndicator] || 'NA'}</Descriptions.Item>
                <Descriptions.Item label="Status">{rest?.status ? <Text type="success">Active</Text> : <Text>Inactive</Text>}</Descriptions.Item>
                <Descriptions.Item label="Application Criticality Group">{rest?.criticalityGroupName || 'NA'}</Descriptions.Item>
                <Descriptions.Item label="Document number to be generated">{rest?.documentNumRequired ? <Text type="success"> Yes </Text> : <Text>No</Text>}</Descriptions.Item>

                <Space direction="vertical" size="small" className={styles.accordianContainer}>
                    <Row>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            {applicationAction.length > 0 && (
                                <Collapse onChange={() => handleCollapse(1)} expandIcon={accordianExpandIcon} activeKey={openAccordian}>
                                    <Panel
                                        header={
                                            <>
                                                <span>Application Actions</span>
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
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            {documentType.length > 0 && (
                                <Collapse onChange={() => handleCollapse(2)} expandIcon={accordianExpandIcon} activeKey={openAccordian}>
                                    <Panel
                                        header={
                                            <>
                                                <span>Document Type</span>
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
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            {accessibleLocation?.length > 0 && (
                                <Collapse onChange={() => handleCollapse(3)} expandIcon={accordianExpandIcon} activeKey={openAccordian}>
                                    <Panel
                                        header={
                                            <>
                                                <span>Accessible Dealer Location</span>
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
                        </Col>
                    </Row>
                </Space>
            </Descriptions>
        </div>
    );
};

export default ViewDealerDetailsMain;
