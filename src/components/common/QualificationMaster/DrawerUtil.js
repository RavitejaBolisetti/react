import React, { useState } from 'react';
import { Drawer, Input, Form, Col, Row, Switch, Button } from 'antd';

import { validateRequiredInputField, validationFieldLetterAndNumber } from 'utils/validation';
import styles from '../QualificationMaster/QualificationMaster.module.css';
import { handleErrorModal, handleSuccessModal } from 'utils/responseModal';

const DrawerUtil = ({ handleAdd, open, setDrawer, isChecked, setIsChecked, formActionType, isReadOnly, formData, setFormData, isDataAttributeLoaded, attributeData, setFieldValue, handleSelectTreeClick, geoData }) => {
    // const [formData, setFormData] = useState([]);
    // // const [isChecked, setIsChecked] = useState(formData?.isActive === 'Y' ? true : false);
    // const [isChecked, setIsChecked] = useState(true);
    // const [switchIntial, setswitchIntial] = useState('Y');
    // const [forceFormReset, setForceFormReset] = useState(false);

    // const defaultBtnVisiblity = { editBtn: false, rootChildBtn: true, childBtn: false, siblingBtn: false, saveBtn: false, resetBtn: false, cancelBtn: false };
    // const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });
    // const [form] = Form.useForm();
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

   

    return (
        <Drawer
            title={drawerTitle}
            placement="right"
            onClose={onClose}
            open={open}
            footer={
                <Row justify="end">
                    <Button danger onClick={onClose} className={styles.cancelButton} style={{ marginRight: 8 }}>
                        Cancel
                    </Button>
                    {/* <Button danger onClick={handleResetBtn} className={styles.resetButton} style={{ marginRight: 8 }}>
                        Reset
                    </Button> */}
                    <Button form="myForm" className={styles.saveButton} htmlType="submit">
                        Save
                    </Button>
                </Row>
            }
        >
            <Row gutter={20}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item initialValue={formData?.qualificationCode} label="Qualification Code" name="qualificationCode" rules={[validateRequiredInputField('Code'), validationFieldLetterAndNumber('Code')]}>
                        <Input maxLength={5} minLength={5} placeholder="Code" name="code" />
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item initialValue={formData?.qualificationName} label="Qualification Name" name="qualificationName" rules={[validateRequiredInputField('Name')]}>
                        <Input maxLength={50} placeholder="Name" name="name" />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item label="Status" name="status">
                    <Switch checkedChildren="Active" defaultChecked onChange={() => setIsChecked(!isChecked)} value={(formData?.status === 'Y' ? 1 : 0) || isChecked} unCheckedChildren="Inactive" {...disabledProps} />
                    </Form.Item>
                </Col>
            </Row>
        </Drawer>
    );
};

export default DrawerUtil;
