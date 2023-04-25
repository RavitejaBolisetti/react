import React, { useState } from 'react';
import { Descriptions, Typography, Collapse, Space } from 'antd';
import { PlusBorderedIcon, MinusBorderedIcon } from 'Icons';

import CardDocument from './CardDocument';
import CardLocation from './CardLocation';
import CardAction from './CardAction';

const { Text } = Typography;
const { Panel } = Collapse;

const ViewDealerDetailsMain = ({ applicationDetailsData, viewTitle = 'Application Details', styles }) => {
    const { applicationAction, documentType, accessibleLocation, ...rest } = applicationDetailsData[0];
    const [openAccordian, setOpenAccordian] = useState(1);

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
    const accessibleLocationIdndicator = {
        0: 'Accessible to all',
        1: 'Not accessible to all',
        2: 'Restricted Accessible',
    };

    return (
        <div className={`${styles.viewContainer} ${styles.hierarchyRightContaner}`}>
            <Descriptions {...viewProps}>
                <Descriptions.Item label=" Application ID">{rest?.applicationId}</Descriptions.Item>
                <Descriptions.Item label="Application Name">{rest?.applicationName || 'NA'}</Descriptions.Item>
                <Descriptions.Item label="Application Title">{rest?.applicationTitle || 'NA'}</Descriptions.Item>
                <Descriptions.Item label="Application Type">{rest.applicationType || 'NA'}</Descriptions.Item>
                <Descriptions.Item label="Parent Application ID">{rest?.parentApplicationId || 'NA'}</Descriptions.Item>
                <Descriptions.Item label="Accessible Location">{accessibleLocationIdndicator[rest?.accessableIndicator] || 'NA'}</Descriptions.Item>
                <Descriptions.Item label="Status">{rest?.activeIndicator ? <Text type="success">Active</Text> : <Text>Inactive</Text>}</Descriptions.Item>
                <Descriptions.Item label="Application Criticality Group">{rest?.criticalityGroupName || 'NA'}</Descriptions.Item>
                <Descriptions.Item label="Document number to be generated">{rest?.documentNumRequired === 'Y' || rest?.documentNumRequired === true ? <Text type="success"> Active </Text> : <Text>Inactive</Text>}</Descriptions.Item>
            </Descriptions>

            <Space
                direction="vertical"
                size="small"
                className={styles.accordianContainer}
                style={{
                    display: 'flex',
                    marginBottom: '14px',
                }}
            >
                {applicationAction.length > 0 && (
                    <Collapse onChange={() => handleCollapse(1)} expandIcon={({ isActive }) => (isActive ? <MinusBorderedIcon /> : <PlusBorderedIcon />)} activeKey={openAccordian}>
                        <Panel header={<span className={openAccordian === 1 ? styles.accordianHeader : ''}>Application Actions</span>} key="1">
                            {applicationAction.map((el) => (
                                <CardAction {...el} />
                            ))}
                        </Panel>
                    </Collapse>
                )}

                {documentType.length > 0 && (
                    <Collapse onChange={() => handleCollapse(2)} expandIcon={({ isActive }) => (isActive ? <MinusBorderedIcon /> : <PlusBorderedIcon />)} activeKey={openAccordian}>
                        <Panel header={<span className={openAccordian === 2 ? styles.accordianHeader : ''}>Document Types</span>} key="2">
                            {documentType.map((el) => (
                                <CardDocument {...el} />
                            ))}
                        </Panel>
                    </Collapse>
                )}
                {accessibleLocation?.length > 0 && (
                    <Collapse onChange={() => handleCollapse(3)} expandIcon={({ isActive }) => (isActive ? <MinusBorderedIcon /> : <PlusBorderedIcon />)} activeKey={openAccordian}>
                        <Panel header={<span className={openAccordian === 3 ? styles.accordianHeader : ''}>Accessible Dealer Location</span>} key="3">
                            {accessibleLocation.map((el) => (
                                <CardLocation {...el} />
                            ))}
                        </Panel>
                    </Collapse>
                )}
            </Space>
        </div>
    );
};

export default ViewDealerDetailsMain;
