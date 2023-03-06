import React, { useEffect, useState } from 'react';
import { Button, Drawer, Switch, Row, Col, Input, Form, Space } from 'antd';
import { validateRequiredSelectField } from 'utils/validation';
import styles from '../Common.module.css';
import style2 from './HierarchyAttribute.module.css';
import { FaUserPlus, FaSave, FaUndo, FaEdit, FaTimes, FaTrashAlt } from 'react-icons/fa';

const AddUpdateDrawer = ({ editRow, setEditRow, showDrawer, setShowDrawer, setForceReset, setCheckFields, onFinish, onFinishFailed, tableData,setsaveandnewclick,setsaveclick }) => {
    const [form] = Form.useForm();
    const [editrowsetter, seteditrowsetter] = useState();

    useEffect(() => {
        form.resetFields();
        form.setFieldValue(editRow);
    }, [editRow]);

    console.log('editRow', editRow);

    const onClose = () => {
        setShowDrawer(false);
    };
    const handlesaveandnew =()=>{
        setTimeout(() => {
            form.resetFields();
            setEditRow({});
        }, 1000);
        setsaveclick(false);
        setsaveandnewclick(true);

    }
    const handesave =()=>{
        setsaveclick(true);
        setsaveandnewclick(false);
    }
    return (
        <Drawer
            title="Hierarchy Attribute Master"
            footer={
                <Row gutter={20}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8} className={style2.drawerFooterButtons}>
                        <Button danger onClick={onClose}>
                            Cancel
                        </Button>
                    </Col>
                    <Col xs={16} sm={16} md={16} lg={16} xl={16} xxl={16} className={style2.drawerFooterButtons}  style={{ textAlign: 'right' }}>
                        <Button onClick={handesave}  form="myForm" key="submit" htmlType="submit" type="primary">
                            Save
                        </Button>
                        <Button onClick={handlesaveandnew}  form="myForm" key="submit2" htmlType="submit" type="primary">
                            Save and New
                        </Button>
                    </Col>
                </Row>
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
                <Form id="myForm" form={form} onFinish={onFinish} onFinishFailed={onFinishFailed} layout="vertical">
                    <Row gutter={20}>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item initialValue={editRow?.hierarchyAttribueCode} name="hierarchyAttribueCode" label="Code" rules={[{ max: 5, message: 'Code must be  5 characters long.' }, { min: 5, message: 'Code must be  5 characters long .' }, { required: true, message: 'Please Enter Code' }, { validator: (rule, value) => (tableData?.findIndex((el) => el['hierarchyAttribueCode'] === value) !== -1 ? Promise.reject('Duplicate not allowed') : Promise.resolve()) }]}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item initialValue={editRow?.hierarchyAttribueName} name="hierarchyAttribueName" label="Name" rules={[{ min: 2, message: 'Name must contain 2 characters.' }, { max: 50, message: 'Name must be less than 50 characters.' }, { required: true, message: 'Please Enter Name' }, { validator: (rule, value) => (tableData?.findIndex((el) => el['hierarchyAttribueName'] === value) !== -1 ? Promise.reject('Duplicate not allowed') : Promise.resolve()) }]}>
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
