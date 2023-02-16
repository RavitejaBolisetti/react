import React, { useState } from 'react';
import { connect } from 'react-redux';
import { FaEdit, FaUserPlus, FaUserFriends, FaSave, FaUndo, FaAngleDoubleRight, FaAngleDoubleLeft, FaRegTimesCircle } from 'react-icons/fa';
import { addToolTip } from 'utils/customMenuLink';

import { Button, Col, Form, Row } from 'antd';
import { Input, Select, Switch, TreeSelect, Collapse } from 'antd';

import { validateRequiredInputField, validateRequiredSelectField, validationFieldLetterAndNumber } from 'utils/validation';
import styles from 'pages/common/Common.module.css';
import TreeView from 'components/common/TreeView';

const { Option } = Select;
const { Panel } = Collapse;
export const ApplicationMasterMain = () => {
    const [isTreeViewVisible, setTreeViewVisible] = useState(true);
    const handleTreeViewVisiblity = () => setTreeViewVisible(!isTreeViewVisible);

    return (
        <>
            <Row gutter={20}>
                <div className={styles.treeCollapsibleButton} style={{ marginTop: '-8px', marginLeft: '10px' }} onClick={handleTreeViewVisiblity}>
                    {isTreeViewVisible ? addToolTip('Collapse')(<FaAngleDoubleLeft />) : addToolTip('Expand')(<FaAngleDoubleRight />)}
                </div>
            </Row>
            <Row gutter={20}>
                {isTreeViewVisible ? (
                    <Col xs={24} sm={24} md={!isTreeViewVisible ? 1 : 12} lg={!isTreeViewVisible ? 1 : 8} xl={!isTreeViewVisible ? 1 : 8} xxl={!isTreeViewVisible ? 1 : 8}>
                        <div className={styles.leftpanel}>
                            <div className={styles.treeViewContainer}>
                                <div className={styles.treemenu}>
                                    <TreeView />
                                </div>
                            </div>
                        </div>
                    </Col>
                ) : undefined}
            </Row>

            <Collapse  defaultActiveKey={['1']} expandIconPosition="end">
                <Panel header="Application Details" key="1">
                    <Form layout="vertical" >
                        <Row gutter={20}>
                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                <Form.Item name="Application ID" label="Application ID" rules={[validateRequiredSelectField('Application ID')]}>
                                    <Input placeholder="Type code here" />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                <Form.Item name="Application Name" label="Application Name" rules={[validateRequiredSelectField('Application Name')]}>
                                    <Input placeholder="Type code here" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                <Form.Item name="Application Title" label="Application Title" rules={[validateRequiredSelectField('Application Type')]}>
                                    <Input placeholder="Type code here" />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                <Form.Item name="Application Type" label="Application Type" rules={[validateRequiredSelectField('Application Type')]}>
                                    <Input placeholder="Type code here" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                <Form.Item name="Parent Application ID" label="Parent Application ID" rules={[validateRequiredSelectField('Parent Application ID')]}>
                                    <Select>
                                        <Option></Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                <Form.Item name="Application Criticality Group" label="Application Criticality Group" rules={[validateRequiredSelectField('Application Criticality Group')]}>
                                    <Select>
                                        <Option></Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                <Form.Item name="Accessible Locations" label="Accessible Locations" rules={[validateRequiredSelectField('Accessible Locations')]}>
                                    <Input placeholder="Type code here" />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                <Form.Item name="Document No. to be generated" label="Document No. to be generated" rules={[validateRequiredSelectField('Document No. to be generated')]}>
                                <Switch defaultChecked checkedChildren="Active" unCheckedChildren="Inactive" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={20}>
                         
                            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                <Form.Item name="Document No. to be generated" label="Document No. to be generated" rules={[validateRequiredSelectField('Document No. to be generated')]}>
                                <Switch defaultChecked checkedChildren="Active" unCheckedChildren="Inactive" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Panel>
            </Collapse>
        </>
    );
};

export const ApplicationMaster = connect(null, null)(ApplicationMasterMain);
