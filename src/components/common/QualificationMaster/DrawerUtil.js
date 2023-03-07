import React, { useEffect, useState } from 'react';
import { Drawer, Input, Form, Col, Row, Switch, Button } from 'antd';

import { validateRequiredInputField, validationFieldLetterAndNumber } from 'utils/validation';
import styles from '../QualificationMaster/QualificationMaster.module.css';
import { handleErrorModal, handleSuccessModal } from 'utils/responseModal';

const DrawerUtil = ({ state, handleAdd, setForceFormReset, open, setDrawer, isChecked, setIsChecked, formActionType, isReadOnly, formData, setFormData, isDataAttributeLoaded, attributeData, setFieldValue, handleSelectTreeClick, geoData }) => {
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
            width="540px"
            footer={
                <Row justify="end">
                    <Button danger onClick={onClose} className={styles.cancelButton} style={{ marginRight: 8 }}>
                        Cancel
                    </Button>
                    <Button form="myForm" onClick={() => (state.button = 1)} className={styles.saveButton} htmlType="submit">
                        Save
                    </Button>
                    <Button form="myForm" onClick={() => (state.button = 2)} className={styles.saveButton} style={{ marginRight: 8 }} htmlType="submit">
                        Save and New
                    </Button>
                </Row>
            }
        >
            <Row gutter={20}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item initialValue={formData?.qualificationCode} label="Qualification Code" name="qualificationCode" rules={[validateRequiredInputField('Code'), validationFieldLetterAndNumber('Code')]}>
                        <Input maxLength={5} minLength={5} placeholder="Code" />
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item initialValue={formData?.qualificationName} label="Qualification Name" name="qualificationName" rules={[validateRequiredInputField('Name')]}>
                        <Input maxLength={50} placeholder="Name" />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={18} sm={18} md={18} lg={18} xl={18} xxl={18}>
                    <Form.Item normalize={(a, b) => (a ? 'Y' : 'N')} initialValue={formData?.isChildAllowed === 'Y' ? 'Y' : 'N'} label="Status" name="status">
                        <Switch checkedChildren="Active" defaultChecked={formData?.status} unCheckedChildren="Inactive" {...disabledProps} />
                    </Form.Item>
                </Col>
            </Row>
        </Drawer>
    );
};

export default DrawerUtil;
