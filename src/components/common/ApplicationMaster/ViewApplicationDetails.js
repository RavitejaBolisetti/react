import React from 'react';
import { Col, Row, Card, Space, Collapse, Typography } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';

import styles from './ApplicationMaster.module.css';

import CardDocument from './CardDocument';
import CardLocation from './CardLocation';
import CardAction from './CardAction';

const { Panel } = Collapse;
const { Text } = Typography;

const ViewApplicationDetails = ({ applicationDetailsData }) => {
    const { applicationAction, documentType, accessibleLocation, ...rest } = applicationDetailsData[0];

    return (
        <Card title="Application Details">
            <div className={styles.cardBody}>
                <Space direction="vertical">
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={12}>
                            <Text type="secondary"> Application ID </Text>
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={12}>
                            <Text> {rest?.applicationId || 'AP0001'}</Text>
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={12}>
                            <Text type="secondary">Application Name</Text>
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={12}>
                            <Text>{rest?.applicationName || 'Application Empowerment'}</Text>
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={12}>
                            <Text type="secondary"> Application Title</Text>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={12}>
                            <Text>{rest?.applicationTitle || 'application Title'}</Text>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={12}>
                            <Text type="secondary">Application Type</Text>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={12}>
                            <Text> {rest.applicationType || 'Transaction'}</Text>
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={12}>
                            <Text type="secondary">Parent Application ID</Text>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={12}>
                            <Text>{rest?.parentApplicationId || 'Geo Product'}</Text>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={12}>
                            <Text type="secondary">Accessible Location</Text>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={12}>
                            <Text>{rest?.accessibleLocation || 'Restricted Access'}</Text>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={12}>
                            <Text type="secondary">Status </Text>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={12}>
                            <Text className={styles.activeText}>{rest?.activeIndicator ? 'Active' : 'Inactive'}</Text>
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={12}>
                            <Text type="secondary">Application Criticality Group</Text>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={12}>
                            <Text>{rest?.criticalityGroupCode || 'Application Criticality'}</Text>
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={12}>
                            <Text type="secondary">Document not to be generated</Text>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={12}>
                            {rest?.documentNumRequired === 'Y'|| rest?.documentNumRequired === true ? <Text className={styles.activeText}> 'Active' </Text> : <Text>Inactive</Text>}
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        {applicationAction.length > 0 && (
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={12}>
                                <Collapse expandIcon={({ isActive }) => (isActive ? <MinusOutlined /> : <PlusOutlined />)}>
                                    <Panel header="Application Actions" key="2">
                                        {applicationAction.map((el) => (
                                            <CardAction {...el} />
                                        ))}
                                    </Panel>
                                </Collapse>
                            </Col>
                        )}

                        {documentType.length > 0 && (
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={12}>
                                <Collapse expandIcon={({ isActive }) => (isActive ? <MinusOutlined /> : <PlusOutlined />)}>
                                    <Panel header="Document Types" key="3">
                                        {documentType.map((el) => (
                                            <CardDocument {...el} />
                                        ))}
                                    </Panel>
                                </Collapse>
                            </Col>
                        )}
                        {accessibleLocation?.length > 0 && (
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={12}>
                                <Collapse expandIcon={({ isActive }) => (isActive ? <MinusOutlined /> : <PlusOutlined />)}>
                                    <Panel header="Accessible Dealer Location" key="3">
                                        {accessibleLocation.map((el) => (
                                            <CardLocation {...el} />
                                        ))}
                                    </Panel>
                                </Collapse>
                            </Col>
                        )}
                    </Row>
                </Space>
            </div>
        </Card>
    );
};

export default ViewApplicationDetails;
