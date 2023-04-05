import React, { useEffect } from 'react';
import { Button, Drawer, Switch, Row, Col, Input, Form, Space } from 'antd';
import { validateRequiredInputField, validationFieldLetterAndNumber } from 'utils/validation';
import { preparePlaceholderText } from 'utils/preparePlaceholder';

import styles from './HierarchyAttribute.module.css';
import style from "../DrawerAndTable.module.css";

const AddUpdateDrawer = ({ editRow, setEditRow, showDrawer, setShowDrawer, setForceReset, setCheckFields, onFinish, onFinishFailed, tableData, setsaveandnewclick, setsaveclick, formActionType, handleEditView, isReadOnly, setIsReadOnly, formBtnDisable, setFormBtnDisable, isLoadingOnSave }) => {
    const [form] = Form.useForm();
    const disabledProps = { disabled: isReadOnly };

    let drawerTitle = '';
    if (formActionType === 'view') {
        drawerTitle = 'View Hierarchy Attribute';
    } else if (!!editRow?.id) {
        drawerTitle = 'Edit Hierarchy Attribute';
    } else {
        drawerTitle = 'Add Hierarchy';
    }

    useEffect(() => {
        form.resetFields();
        form.setFieldValue(editRow);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editRow]);

    const onClose = () => {
        setShowDrawer(false);
        
        form.resetFields();
        setIsReadOnly(false);
        setFormBtnDisable(false);
    };
    const handlesaveandnew = () => {
        setTimeout(() => {
            form.resetFields();
            setEditRow({
                duplicateAllowedAtAttributerLevelInd: true,
                duplicateAllowedAtOtherParent: true,
                isChildAllowed: true,
                status: true,
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
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8} className={style.drawerFooterButtons }>
                        <Button danger onClick={onClose}>
                            Cancel
                        </Button>
                    </Col>
                    <Col xs={16} sm={16} md={16} lg={16} xl={16} xxl={16} className={style.drawerFooterButtons} style={{ textAlign: 'right' }}>
                        {formActionType === 'view' ? (
                            <Button onClick={handleEditView} type="primary">
                                Edit
                            </Button>
                        ) : (
                            <>
                                <Button loading={isLoadingOnSave} disabled={!formBtnDisable} onClick={handesave} form="myForm" key="submit" htmlType="submit" type="primary">
                                    Save
                                </Button>
                                {formActionType === 'add' ? (
                                    <Button loading={isLoadingOnSave} disabled={!formBtnDisable} onClick={handlesaveandnew} form="myForm" key="submit2" htmlType="submit" type="primary">
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
            className={formActionType === 'view' ? style.viewMode  : styles.editDrawer }
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
                            <Form.Item initialValue={editRow?.hierarchyAttribueCode} name="hierarchyAttribueCode" label="Code" rules={[{ max: 6, message: 'Code must be 6 characters long.' }, validateRequiredInputField('Code'), validationFieldLetterAndNumber('Code'), { validator: (rule, value) => (!editRow['hierarchyAttribueCode'] ? (tableData?.findIndex((el) => el['hierarchyAttribueCode']?.toLowerCase() === value?.toLowerCase()) !== -1 ? Promise.reject('Duplicate not allowed') : Promise.resolve()) : Promise.resolve()) }]}>
                                <Input maxLength={6} placeholder={preparePlaceholderText('Code')} {...disabledProps}/>
                           
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item initialValue={editRow?.hierarchyAttribueName} name="hierarchyAttribueName" label="Name" rules={[ { max: 50, message: 'Name must be less than 50 characters.' }, validateRequiredInputField('Name'), { validator: (rule, value) => (!editRow['hierarchyAttribueName'] ? (tableData?.findIndex((el) => el['hierarchyAttribueName']?.toLowerCase() === value?.toLowerCase()) !== -1 ? Promise.reject('Duplicate not allowed') : Promise.resolve()) : Promise.resolve()) }]}>
                                {formActionType === 'view' ? <p className={style.viewModeText} >{editRow?.hierarchyAttribueName}</p> :<Input maxLength={50} placeholder={preparePlaceholderText('Name')}  {...disabledProps}/>}
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
                            <Form.Item initialValue={editRow?.isChildAllowed} label="Child Allowed?" name="isChildAllowed">
                                <Switch defaultChecked={editRow?.isChildAllowed} checkedChildren="Active" unCheckedChildren="Inactive" {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item initialValue={editRow?.status} label="Status" name="status">
                                <Switch defaultChecked={editRow?.status} checkedChildren="Active" unCheckedChildren="Inactive" {...disabledProps} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item initialValue={editRow?.id} hidden label="Status" name="id">
                        <Input />
                    </Form.Item>
                </Form>
            </Space>
        </Drawer>
    );
};

export default AddUpdateDrawer;
