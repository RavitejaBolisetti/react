import React, { useEffect, useState } from 'react';
import { Button, Drawer, Switch, Row, Col, Input, Form, Space } from 'antd';
import { validateRequiredSelectField } from 'utils/validation';
import styles from '../Common.module.css';
import { FaUserPlus, FaSave, FaUndo, FaEdit, FaTimes, FaTrashAlt } from 'react-icons/fa';

const AddUpdateDrawer = ({ editRow, showDrawer, setShowDrawer, setForceReset }) => {
    const [open, setOpen] = useState(false);

    //   const showDrawer = () => {
    //     setOpen(true);
    //   };
    const handleReset = () => {
        setForceReset(Math.random() * 1000);
    };

    const onClose = () => {
        setShowDrawer(false);
    };

    return (
        <Drawer title="Basic Drawer" width="500" placement="right" onClose={onClose} open={showDrawer}>
            {/* <FormitemsRoleDrawer /> */}
            <Space
                direction="vertical"
                size="small"
                style={{
                    display: 'flex',
                }}
            >
                <Row gutter={20}>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item name="Code" label="Code" rules={[validateRequiredSelectField('Code')]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item name="Name" label="Name" rules={[validateRequiredSelectField('Name')]}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col xs={9} sm={9} md={9} lg={9} xl={9} xxl={9}>
                        <Form.Item initialValue={'Y'} label="Duplicate Allowed?" name="Duplicate Allowed?">
                            <Switch defaultChecked={true} checkedChildren="Active" unCheckedChildren="Inactive" />
                        </Form.Item>
                    </Col>
                    <Col xs={15} sm={15} md={15} lg={15} xl={15} xxl={15}>
                        <Form.Item initialValue={'Y'} label="Duplicate Allowed under different Parent?" name="Duplicate Allowed under different Parent?">
                            <Switch defaultChecked={true} checkedChildren="Active" unCheckedChildren="Inactive" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col xs={9} sm={9} md={9} lg={9} xl={9} xxl={9}>
                        <Form.Item initialValue={'Y'} label="Child Allowed?" name="Child Allowed?">
                            <Switch defaultChecked={true} checkedChildren="Active" unCheckedChildren="Inactive" />
                        </Form.Item>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={6} xxl={12}>
                        <Form.Item initialValue={'Y'} label="Status" name="Status">
                            <Switch defaultChecked={true} checkedChildren="Active" unCheckedChildren="Inactive" />
                        </Form.Item>
                    </Col>
                    <Col xs={3} sm={3} md={3} lg={3} xl={9} xxl={3}></Col>
                </Row>
                <Row gutter={20} justify="end">
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.buttonContainer}>
                        <Button htmlType="submit" onClick={()=>setShowDrawer(!showDrawer)} danger>
                            <FaSave className={styles.buttonIcon} />
                            Save
                        </Button>

                        <Button danger onClick={handleReset}>
                            <FaUndo className={styles.buttonIcon} />
                            Reset
                        </Button>
                    </Col>
                </Row>

                {/*Below The Fomrs*/}
                {/* <Row>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <h4 className="myh4">Application Mapping</h4>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Search
                            placeholder="Search Application"
                            style={{
                                width: 230,
                            }}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col></Col>
                </Row>
                <h4>Applications</h4>
                <Row>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Collapse defaultActiveKey={['1']}>
                            <Panel header="Common" key="1">
                                <Form.Item label="" name="applicationmaster" valuePropName="">
                                    <Checkbox>Application Master</Checkbox>
                                </Form.Item>
                                <Form.Item label="" name="applicationcriticalitygroup" valuePropName="asdasdasdasd">
                                    <Checkbox checked={Checkboxcheck} onChange={(e) => setCheckboxCheck(e.target.checked)}>
                                        Application Criticality group
                                    </Checkbox>
                                    {Checkboxcheck ? <Actions /> : undefined}
                                </Form.Item>

                                <Form.Item label="" name="producthierarchy" valuePropName="">
                                    <Checkbox>Product Hierarchy</Checkbox>
                                </Form.Item>
                                <Form.Item label="" name="geographical" valuePropName="">
                                    <Checkbox>Geographical Hierarchy</Checkbox>
                                </Form.Item>
                            </Panel>
                            <Panel header="DBP" key="2"></Panel>
                            <Panel header="Financial Accounting" key="3"></Panel>
                        </Collapse>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}></Col>
                </Row> */}
            </Space>
        </Drawer>
    );
};

export default AddUpdateDrawer;
