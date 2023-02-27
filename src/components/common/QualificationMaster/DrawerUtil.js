import React, { useState } from 'react';
import { Drawer, Input, Form, Col, Row, Switch, Button } from 'antd';

import { validateRequiredInputField, validationFieldLetterAndNumber } from 'utils/validation';
import { handleErrorModal, handleSuccessModal } from 'utils/responseModal';


function DrawerUtilMain({ drawer, setDrawer, saveData, userId, fetchList, listShowLoading }) {
    // const [isTreeViewVisible, setTreeViewVisible] = useState(true);
    // const [selectedTreeKey, setSelectedTreeKey] = useState([]);
    // const [selectedTreeSelectKey, setSelectedTreeSelectKey] = useState([]);
    // const [formActionType, setFormActionType] = useState('');

    const [formData, setFormData] = useState([]);
    const [isChecked, setIsChecked] = useState(formData?.isActive === 'Y' ? true : false);

    // const [isFormVisible, setFormVisible] = useState(false);
    // const [isReadOnly, setReadOnly] = useState(false);
    const [forceFormReset, setForceFormReset] = useState(false);

    const defaultBtnVisiblity = { editBtn: false, rootChildBtn: true, childBtn: false, siblingBtn: false, saveBtn: false, resetBtn: false, cancelBtn: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });
    const [form] = Form.useForm();
    // const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });
    // const defaultBtnVisiblity = {  saveBtn: false };

    const onClose = () => {
        setDrawer(!drawer)
    };
    const handleBack = () => {
        setDrawer(false);
    };
    const handleResetBtn = () => {
        setForceFormReset(Math.random() * 10000);
        form.resetFields();
    };

    const onFinish = (values) => {
        console.log('Success:', values);
        const recordId = formData?.id || '';
        const codeToBeSaved = Array.isArray(values?.code) ? values?.code[0] : values?.code || '';
        const data = { ...values, id: recordId, isActive: values?.isActive ? 'Y' : 'N', code: codeToBeSaved };


        const onError = (message) => {
            handleErrorModal(message);
        };

    };

    const onFinishFailed = (errorInfo) => {
        form.validateFields().then((values) => { });
    };

    return (
        <Drawer
            title="Add Qualification Details"
            placement="right"
            onClose={onClose}
            open={drawer}
            footer={
                <div
                    style={{
                        borderTop: '1px solid #e9e9e9',
                        padding: '10px 16px',
                        background: '#fff',
                        textAlign: 'right',
                    }}
                >
                </div>
            }
        >
            <Form
                name="Qualform"
                form={form}
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Row gutter={20}>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item label="Qualification Code" name="code" rules={[validateRequiredInputField('Code'), validationFieldLetterAndNumber('Code')]}>
                            <Input placeholder="QCN00001" />
                        </Form.Item>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item label="Qualification Name" name="name" rules={[validateRequiredInputField('Name')]}>
                            <Input placeholder="Name" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item label="Status" name="status">
                            <Switch checkedChildren="Active" unCheckedChildren="Inactive" defaultChecked onChange={() => setIsChecked(!isChecked)} value={(formData?.isActive === 'Y' ? 1 : 0) || isChecked} />{' '}
                        </Form.Item>
                    </Col>
                </Row>
                <Button
                    danger
                    onClick={() => handleBack()}
                    style={{ marginRight: 8 }}>
                    Cancel
                </Button>
                <Button
                    danger
                    onClick={handleResetBtn}
                    style={{ marginRight: 8 }}
                >
                    Reset
                </Button>
                <Button
                    danger
                    style={{ marginRight: 8 }}
                    htmlType="submit">
                    Save
                </Button>
            </Form>
        </Drawer>
    );
}

export const DrawerUtil = DrawerUtilMain;