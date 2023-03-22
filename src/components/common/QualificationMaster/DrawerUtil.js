import React, { useEffect } from 'react';
import { Drawer, Input, Form, Col, Row, Switch, Button } from 'antd';

import { validateRequiredInputField, validationFieldLetterAndNumber } from 'utils/validation';
import styles from '../Common.module.css';
import style from './QualificationMaster.module.css';
import { preparePlaceholderText } from 'utils/preparePlaceholder';

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
                <Row>
                    <Col xs={8} sm={8} md={8} lg={8} xl={8} className={styles.drawerFooterButtons}>
                        <Button danger onClick={onClose} className={styles.drawerFooterButtons}>
                            Cancel
                        </Button>
                    </Col>
                    <Col xs={16} sm={16} md={16} lg={16} xl={16} className={styles.drawerFooterButtons} style={{ textAlign: 'right' }}>
                        <Button form="myForm" onClick={() => (state.button = 1)} type="primary" htmlType="submit">
                            Save
                        </Button>
                        <Button form="myForm" onClick={() => (state.button = 2)} type="primary" htmlType="submit">
                            Save and New
                        </Button>
                    </Col>
                </Row>
            }
        >
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
                    <Form.Item  className={style.statusButton} labelCol={{ span: 24 }} normalize={(a, b) => (a ? 'Y' : 'N')} initialValue={formData?.isChildAllowed === 'Y' ? 'Y' : 'N'} label="Status" name="status">
                        <Switch checkedChildren="Active" defaultChecked={formData?.status} unCheckedChildren="Inactive" {...disabledProps} />
                    </Form.Item>
                </Col>
            </Row>
        </Drawer>
    );
};

export default DrawerUtil;
