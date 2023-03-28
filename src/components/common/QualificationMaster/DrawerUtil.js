import React, { useEffect } from 'react';
import { Drawer, Input, Form, Col, Row, Switch, Button } from 'antd';

import { validateRequiredInputField, validationFieldLetterAndNumber } from 'utils/validation';
import styles from '../Common.module.css';
import style from '../DrawerAndTable.module.css';
import { preparePlaceholderText } from 'utils/preparePlaceholder';

const DrawerUtil = ({ onFinish, onFinishFailed, form, state, handleAdd, setForceFormReset, open, setDrawer, isChecked, setIsChecked, formActionType, isReadOnly, formData, setFormData, isDataAttributeLoaded, attributeData, setFieldValue, handleSelectTreeClick, geoData }) => {
    const disabledProps = { disabled: isReadOnly };

    let drawerTitle = '';
    if (formActionType === 'add') {
        drawerTitle = 'Add Qualification Details';
    } else if (formActionType === 'update') {
        drawerTitle = 'Update Application Criticality Group Details';
    }

    const onClose = () => {
        setDrawer(false);
    };

    useEffect(() => {
        setForceFormReset(Math.random() * 1000);
    }, [formData]);

    return (
        <Drawer
            title={drawerTitle}
            placement="right"
            onClose={onClose}
            open={open}
            className={style.drawer}
            width="540px"
            footer={
                <Row>
                    <Col xs={14} sm={14} md={14} lg={14} xl={14} className={style.drawerFooterButton}>
                        <Button danger onClick={onClose} >
                            Cancel
                        </Button>
                    </Col>
                    <Col  xs={10} sm={10} md={10} lg={10} xl={10} className={style.drawerFooterButtons} >
                        <Button form="myForm" onClick={() => (state.button = 1)} type="primary" htmlType="submit">
                            Save
                        </Button>
                        <Button form="myForm" onClick={() => (state.button = 2)} type="primary" htmlType="submit">
                            Save & Add New
                        </Button>
                    </Col>
                </Row>
            }
        >
            <Form preserve={false} form={form} id="myForm" layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Row gutter={20}>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item initialValue={formData?.qualificationCode} label="Qualification Code" name="qualificationCode" rules={[validateRequiredInputField('Qualification Code'), validationFieldLetterAndNumber('Qualification Code')]}>
                            <Input maxLength={5} minLength={5} placeholder={preparePlaceholderText('Code')} />
                        </Form.Item>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item initialValue={formData?.qualificationName} label="Qualification Name" name="qualificationName" rules={[validateRequiredInputField('Qualification Name')]}>
                            <Input maxLength={50} placeholder={preparePlaceholderText('Name')} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item className={style.statusButton} labelCol={{ span: 24 }} normalize={(a, b) => (a ? 1 : 0)} initialValue={formData?.status === 1 ? 1 : 0} label="Status" name="status">
                            <Switch checkedChildren="Active" defaultChecked={formData?.status} unCheckedChildren="Inactive" {...disabledProps} />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Drawer>
    );
};

export default DrawerUtil;
