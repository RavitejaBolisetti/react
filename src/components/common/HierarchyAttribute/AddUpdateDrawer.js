import React, { useEffect, useState } from 'react';
import { Button, Drawer, Switch, Row, Col, Input, Form, Space } from 'antd';
import { validateRequiredSelectField } from 'utils/validation';
import styles from '../Common.module.css';
import { FaUserPlus, FaSave, FaUndo, FaEdit, FaTimes, FaTrashAlt } from 'react-icons/fa';

const AddUpdateDrawer = ({ editRow, setEditRow, showDrawer, setShowDrawer, setForceReset, setCheckFields, onFinish, onFinishFailed, tableData }) => {
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const [switcher, setSwitcher] = useState({
        duplicateAllowedAtAttributerLevelInd: 'Inactive',
        duplicateAllowedAtOtherParent: 'Inactive',
        hierarchyAttribueCode: 'Inactive',
        hierarchyAttribueCode: 'Inactive',
    });

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
        <Drawer
            title="Hierarchy Attribute Master"
            footer={
                <>
                    <Row gutter={20} justify="end">
                        <Col span={4}>
                            {' '}
                            <Form.Item>
                                <Button form="myform" type="primary" htmlType="submit">
                                    <FaSave className={styles.buttonIcon} />
                                    Save
                                </Button>
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            {' '}
                            <Form.Item>
                                <Button form="myform" danger onClick={handleReset}>
                                    <FaUndo className={styles.buttonIcon} />
                                    Reset
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </>
            }
            width="540"
            placement="right"
            onClose={onClose}
            open={showDrawer}
        >
            <Space
                direction="vertical"
                size="small"
                style={{
                    display: 'flex',
                }}
            >
                <Form id="myform" form={form} onFinish={onFinish} onFinishFailed={onFinishFailed} layout="vertical">
                    <Row gutter={20}>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item initialValue={editRow?.hierarchyAttribueCode} name="hierarchyAttribueCode" label="Code" rules={[{ max: 5, message: 'Code must be maximum 5 characters.' }, { required: true, message: 'Please Enter Code' }, { validator: (rule, value) => (tableData?.findIndex((el) => el['hierarchyAttribueCode'] === value) !== -1 ? Promise.reject('Duplicate not allowed') : Promise.resolve()) }]}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item initialValue={editRow?.hierarchyAttribueName} name="hierarchyAttribueName" label="Name" rules={[{ min: 3, message: 'Name must be minimujm 3 characters.' },{ max: 50, message: 'Name must be maximum 50 characters.' }, { required: true, message: 'Please Enter Name' }, { validator: (rule, value) => (tableData?.findIndex((el) => el['hierarchyAttribueName'] === value) !== -1 ? Promise.reject('Duplicate not allowed') : Promise.resolve()) }]}>
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
                </Form>
            </Space>
        </Drawer>
    );
};

export default AddUpdateDrawer;
