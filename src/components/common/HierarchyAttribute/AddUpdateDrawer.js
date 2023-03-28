import React, { useEffect } from 'react';
import { Button, Drawer, Switch, Row, Col, Input, Form, Space } from 'antd';
import { validateRequiredSelectField, validateRequiredInputField } from 'utils/validation';
import styles from '../Common.module.css';
import style2 from './HierarchyAttribute.module.css';
import { FaUserPlus, FaSave, FaUndo, FaEdit, FaTimes, FaTrashAlt } from 'react-icons/fa';
import { preparePlaceholderText } from 'utils/preparePlaceholder';

const AddUpdateDrawer = ({ editRow, setEditRow, showDrawer, setShowDrawer, setForceReset, setCheckFields, onFinish, onFinishFailed, tableData, setsaveandnewclick, setsaveclick, formActionType, handleEditView, isReadOnly, setIsReadOnly, formBtnDisable,setFormBtnDisable }) => {
    const [form] = Form.useForm();
    const disabledProps = { disabled: isReadOnly };

    let drawerTitle = ''
    if( formActionType === 'view'){
        drawerTitle = 'View Hierarchy Attribute' ;
    }else if(!!editRow?.id) {
        drawerTitle = 'Edit Hierarchy Attribute' ;
    }else{
        drawerTitle = 'Add Hierarchy Attribute'
    }

    useEffect(() => {
        form.resetFields();
        form.setFieldValue(editRow);
    }, [editRow]);

    const onClose = () => {
        setShowDrawer(false);
        setIsReadOnly(false)
        setFormBtnDisable(false)

    };
    const handlesaveandnew = () => {
        setTimeout(() => {
            form.resetFields();
            setEditRow({    
                duplicateAllowedAtAttributerLevelInd: true,
                duplicateAllowedAtOtherParent: true,        
                isChildAllowed: true,
                status: true
            });
        }, 1000);
        setsaveclick(false);
        setsaveandnewclick(true);
    };
    const handesave = () => {
        setsaveclick(true);
        setsaveandnewclick(false);
    };
    
    const handleFormSubmitBtn = () => {
        setFormBtnDisable(true);
    };

    return (
        <Drawer
            title={drawerTitle}
            footer={
                <Row gutter={20}>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8} className={style2.drawerFooterButtons}>
                        <Button danger onClick={onClose}>
                            Cancel
                        </Button>
                    </Col>
                    <Col xs={16} sm={16} md={16} lg={16} xl={16} xxl={16} className={style2.drawerFooterButtons} style={{ textAlign: 'right' }}>
                        {formActionType === 'view' ? (
                            <Button onClick={handleEditView} type="primary">
                                Edit
                            </Button>
                        ) : (
                            <>
                                <Button disabled={!formBtnDisable} onClick={handesave} form="myForm" key="submit" htmlType="submit" type="primary">
                                    Save
                                </Button>
                                {formActionType === 'add' ? (
                                    <Button disabled={!formBtnDisable} onClick={handlesaveandnew} form="myForm" key="submit2" htmlType="submit" type="primary">
                                        Save and New
                                    </Button>
                                ) : (
                                    ''
                                )}
                            </>
                        )}
                    </Col>
                </Row>
            }
            width="540"
            placement="right"
            onClose={onClose}
            open={showDrawer}
            className={style2.editDrawer}
        >
            <Space
                direction="vertical"
                size="small"
                style={{
                    display: 'flex',
                }}
            >
                <Form id="myForm" form={form} onFieldsChange={handleFormSubmitBtn} onFinish={onFinish} onFinishFailed={onFinishFailed} layout="vertical">
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item initialValue={editRow?.hierarchyAttribueCode} name="hierarchyAttribueCode" label="Code" rules={[{ max: 5, message: 'Code must be  5 characters long.' }, { min: 5, message: 'Code must be  5 characters long .' }, validateRequiredInputField('Code'), { validator: (rule, value) => (!editRow['hierarchyAttribueCode'] ? (tableData?.findIndex((el) => el['hierarchyAttribueCode']?.toLowerCase() === value?.toLowerCase()) !== -1 ? Promise.reject('Duplicate not allowed') : Promise.resolve()) : Promise.resolve()) }]}>
                                <Input placeholder={preparePlaceholderText('Code')} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item initialValue={editRow?.hierarchyAttribueName} name="hierarchyAttribueName" label="Name" rules={[{ min: 2, message: 'Name must contain 2 characters.' }, { max: 50, message: 'Name must be less than 50 characters.' }, validateRequiredInputField('Name'), { validator: (rule, value) => (!editRow['hierarchyAttribueName'] ? (tableData?.findIndex((el) => el['hierarchyAttribueName']?.toLowerCase() === value?.toLowerCase()) !== -1 ? Promise.reject('Duplicate not allowed') : Promise.resolve()) : Promise.resolve()) }]}>
                                <Input placeholder={preparePlaceholderText('Name')} {...disabledProps} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item initialValue={editRow?.duplicateAllowedAtAttributerLevelInd} label="Duplicate Allowed?" name="duplicateAllowedAtAttributerLevelInd">
                                <Switch defaultChecked={editRow?.duplicateAllowedAtAttributerLevelInd} checkedChildren="Active" unCheckedChildren="Inactive" {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item initialValue={editRow?.duplicateAllowedAtOtherParent} label="Duplicate Allowed under different Parent?" name="duplicateAllowedAtOtherParent">
                                <Switch defaultChecked={editRow?.duplicateAllowedAtOtherParent} checkedChildren="Active" unCheckedChildren="Inactive" {...disabledProps} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item  initialValue={editRow?.isChildAllowed} label="Child Allowed?" name="isChildAllowed">
                                <Switch defaultChecked={editRow?.isChildAllowed} checkedChildren="Active" unCheckedChildren="Inactive" {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item initialValue={editRow?.status } label="Status" name="status">
                                <Switch defaultChecked={editRow?.status} checkedChildren="Active" unCheckedChildren="Inactive" {...disabledProps} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item initialValue={editRow?.id } hidden label="Status" name="id">
                        <Input />
                    </Form.Item>
                </Form>
            </Space>
        </Drawer>
    );
};

export default AddUpdateDrawer;
