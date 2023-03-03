import React, { useEffect, useState } from 'react';
import { Button, Drawer, Switch, Row, Col, Input, Form, Space } from 'antd';
import { validateRequiredSelectField } from 'utils/validation';
import styles from '../Common.module.css';
import { FaUserPlus, FaSave, FaUndo, FaEdit, FaTimes, FaTrashAlt } from 'react-icons/fa';

const AddUpdateDrawer = ({ editRow, setEditRow, showDrawer, setShowDrawer, setForceReset, setCheckFields, onFinish, onFinishFailed, tableData }) => {
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();

    console.log('editRow', editRow);
    //   const showDrawer = () => {
    //     setOpen(true);
    //   };
    const handleReset = () => {
        form.resetFields();
    };

    const onClose = () => {
        form.resetFields();
        setShowDrawer(false);
        setEditRow({});
    };

    return (
        <Drawer title="Hierarchy Attribute Master" width="500" placement="right" onClose={onClose} open={showDrawer}>
            {/* <FormitemsRoleDrawer /> */}
            <Space
                direction="vertical"
                size="small"
                style={{
                    display: 'flex',
                }}
            >
                <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed} layout="vertical">
                    <Row gutter={20}>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item initialValue={editRow?.hierarchyAttribueCode} name="hierarchyAttribueCode" label="Code" rules={[{ min: 5, message: 'Code must be minimum 5 characters.' }, { required: true }, { validator: (rule, value) => (tableData?.findIndex((el) => el['hierarchyAttribueCode'] === value) !== -1 ? Promise.reject('Duplicate not allowed') : Promise.resolve()) }]}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item initialValue={editRow?.hierarchyAttribueName} name="hierarchyAttribueName" label="Name" rules={[{ min: 5, message: 'Code must be minimum 5 characters.' }, { required: true }, { validator: (rule, value) => (tableData?.findIndex((el) => el['hierarchyAttribueName'] === value) !== -1 ? Promise.reject('Duplicate not allowed') : Promise.resolve()) }]}>
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={9} sm={9} md={9} lg={9} xl={9} xxl={9}>
                            <Form.Item initialValue={editRow?.duplicateAllowedAtAttributerLevelInd === 'Y' ? 'Y' : 'N'} normalize={(a, b) => (a ? 'Y' : 'N')} label="Duplicate Allowed?" name="duplicateAllowedAtAttributerLevelInd">
                                <Switch defaultChecked={editRow?.duplicateAllowedAtAttributerLevelInd === 'Y'} checkedChildren="Active" unCheckedChildren="Inactive" />
                            </Form.Item>
                        </Col>
                        <Col xs={15} sm={15} md={15} lg={15} xl={15} xxl={15}>
                            <Form.Item initialValue={editRow?.duplicateAllowedAtOtherParent === 'Y' ? 'Y' : 'N'} normalize={(a, b) => (a ? 'Y' : 'N')} label="Duplicate Allowed under different Parent?" name="duplicateAllowedAtOtherParent">
                                <Switch defaultChecked={editRow?.duplicateAllowedAtOtherParent === 'Y'} checkedChildren="Active" unCheckedChildren="Inactive" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={9} sm={9} md={9} lg={9} xl={9} xxl={9}>
                            <Form.Item normalize={(a, b) => (a ? 'Y' : 'N')} initialValue={editRow?.isChildAllowed === 'Y' ? 'Y' : 'N'} label="Child Allowed?" name="isChildAllowed">
                                <Switch defaultChecked={editRow?.isChildAllowed === 'Y'} checkedChildren="Active" unCheckedChildren="Inactive" />
                            </Form.Item>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={6} xxl={12}>
                            <Form.Item normalize={(a, b) => (a ? 'Y' : 'N')} initialValue={editRow?.status === 'Y' ? 'Y' : 'N'} label="Status" name="status">
                                <Switch defaultChecked={editRow?.status === 'Y'} checkedChildren="Active" unCheckedChildren="Inactive" />
                            </Form.Item>
                        </Col>
                        <Col xs={3} sm={3} md={3} lg={3} xl={9} xxl={3}></Col>
                    </Row>
                    <Row gutter={20} justify="end">
                        <Col span={4}>
                            {' '}
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    <FaSave className={styles.buttonIcon} />
                                    Save
                                </Button>
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            {' '}
                            <Form.Item>
                                <Button danger onClick={handleReset}>
                                    <FaUndo className={styles.buttonIcon} />
                                    Reset
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>

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
