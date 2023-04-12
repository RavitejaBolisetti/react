import React from 'react';
import { Button, Col, Form, Row, Empty, Input, Tree, Card, Space, Collapse } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';

import styles from './ApplicationMaster.module.css';
import style from 'components/common/DrawerAndTable.module.css';

import CardView from './CardView';

const { Panel } = Collapse;

const ViewApplicationDetails = ({ onEditApplication, onAddChild, onAddClick }) => {
    return (
        <Card
            title="Application Details"
            // bordered={false}
            className={styles.viewCardSize}
            // actions={[
            //     <>
            //         <Button onClick={onEditApplication} className={style.cancelBtn} type="primary">
            //             Edit
            //         </Button>
            //         <Space>
            //             <Button onClick={onAddChild} key="addChild" type="primary">
            //                 Add Child
            //             </Button>
            //             <Button onClick={onAddClick} key="addSibling" type="primary">
            //                 Add Sibling
            //             </Button>
            //         </Space>
            //     </>,
            // ]}
        >
            <div className={styles.cardBody}>
                <Space direction="vertical">
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={12}>
                            <p> Application ID </p>
                            <span> AP0001</span>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={12}>
                            <p>Application Name</p>
                            <span>Employee Empowerment</span>
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={12}>
                            <p> Application Title</p>

                            <span>Employee Title</span>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={12}>
                            <p>Application Type</p>

                            <span> Transaction</span>
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={12}>
                            <p>Parent Application ID</p>
                            <span>Geo Product</span>
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={12}>
                            <p>Accessible Location</p>
                            <span>Restricted Access</span>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={12}>
                            <p>Status </p>
                            <span className={styles.activeText}>Active</span>
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={12}>
                            <p>Application Criticality Group</p>
                            <span>Application Criticality</span>
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={12}>
                            <p>Document no. to be generated</p>
                            <span className={styles.activeText}>Active</span>
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={12}>
                            <Collapse expandIcon={({ isActive }) => (isActive ? <MinusOutlined /> : <PlusOutlined />)}>
                                <Panel header="Application Actions" key="2">
                                    <CardView />
                                </Panel>
                            </Collapse>
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={12}>
                            <Collapse expandIcon={({ isActive }) => (isActive ? <MinusOutlined /> : <PlusOutlined />)}>
                                <Panel header="Document Types" key="3">
                                    <CardView />
                                </Panel>
                            </Collapse>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={12}>
                            <Collapse expandIcon={({ isActive }) => (isActive ? <MinusOutlined /> : <PlusOutlined />)}>
                                <Panel header="Document Types" key="3">
                                    <CardView />
                                </Panel>
                            </Collapse>
                        </Col>
                    </Row>
                </Space>
            </div>
        </Card>
    );
};

export default ViewApplicationDetails;
