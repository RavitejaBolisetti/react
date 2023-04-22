import React, {useState} from 'react';
import { Col, Row, Card, Space, Collapse, Typography } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { PlusBorderedIcon, MinusBorderedIcon } from 'Icons';


import styles from './ApplicationMaster.module.css';


import CardDocument from './CardDocument';
import CardLocation from './CardLocation';
import CardAction from './CardAction';

const { Panel } = Collapse;
const { Text } = Typography;

const ViewApplicationDetails = ({ applicationDetailsData }) => {
    const { applicationAction, documentType, accessibleLocation, ...rest } = applicationDetailsData[0];
    const [openAccordian, setOpenAccordian] = useState(1);
    
    const handleCollapse = (key) => {
        setOpenAccordian((prev) => (prev === key ? '' : key));
    };
    const accessibleLocationIdndicator ={
        0: 'Accessible to all',
        1: 'Not accessible to all',
        2: 'Restricted Accessible'
    };
    

    return (
        <Card title="Application Details">
            <div className={styles.cardBody}>
                <Space direction="vertical">
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={12}>
                            <Text type="secondary"> Application ID </Text>
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={12}>
                            <Text> {rest?.applicationId }</Text>
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={12}>
                            <Text type="secondary">Application Name</Text>
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={12}>
                            <Text>{rest?.applicationName || 'NA' }</Text>
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={12}>
                            <Text type="secondary"> Application Title</Text>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={12}>
                            <Text>{rest?.applicationTitle || "NA" }</Text>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={12}>
                            <Text type="secondary">Application Type</Text>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={12}>
                            <Text> {rest.applicationType || 'NA'}</Text>
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={12}>
                            <Text type="secondary">Parent Application ID</Text>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={12}>
                            <Text>{rest?.parentApplicationId || 'NA'}</Text>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={12}>
                            <Text type="secondary">Accessible Location</Text>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={12}>
                            <Text>{accessibleLocationIdndicator[rest?.accessableIndicator] || 'NA'}</Text>

                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={12}>
                            <Text type="secondary">Status </Text>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={12}>
                            {rest?.activeIndicator ?<Text type="success">Active</Text> : <Text>Inactive</Text>}
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={12}>
                            <Text type="secondary">Application Criticality Group</Text>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={12}>
                            <Text>{rest?.criticalityGroupCode || 'NA' }</Text>
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={12}>
                            <Text type="secondary">Document number to be generated</Text>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={12}>
                            {rest?.documentNumRequired === 'Y'|| rest?.documentNumRequired === true ? <Text  type="success"> Active </Text> : <Text>Inactive</Text>}
                        </Col>
                    </Row>
                    <Row gutter={20} className={styles.viewCollapse }>
                        {applicationAction.length > 0 && (
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={12}>
                                <Collapse onChange={() => handleCollapse(1)} expandIcon={({ isActive }) => (isActive ? <MinusBorderedIcon /> : <PlusBorderedIcon />)} activeKey={openAccordian}>
                                    <Panel  header={<span className={openAccordian === 1 ? styles.viewAccordianHeader : '' }>Application Actions</span>} key="1" >
                                        {applicationAction.map((el) => (
                                            <CardAction {...el} />
                                        ))}
                                    </Panel>
                                </Collapse>
                            </Col>
                        )}

                        {documentType.length > 0 && (
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={12}>
                                <Collapse  onChange={() => handleCollapse(2)} expandIcon={({ isActive }) => (isActive ? <MinusBorderedIcon /> : <PlusBorderedIcon />)} activeKey={openAccordian}>
                                    <Panel header={<span className={openAccordian === 2 ? styles.viewAccordianHeader : '' }>Document Types</span>}  key="2">
                                        {documentType.map((el) => (
                                            <CardDocument {...el} />
                                        ))}
                                    </Panel>
                                </Collapse>
                            </Col>
                        )}
                        {accessibleLocation?.length > 0 && (
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={12}>
                                <Collapse onChange={() => handleCollapse(3)} expandIcon={({ isActive }) => (isActive ? <MinusBorderedIcon /> : <PlusBorderedIcon />)} activeKey={openAccordian}>
                                    <Panel header={<span className={openAccordian === 3 ? styles.viewAccordianHeader : '' }>Accessible Dealer Location</span>} key="3">
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
