import React, { useState } from 'react';
import { Drawer, Input, Form, Col, Row, Switch, Button } from 'antd';

import { validateRequiredInputField, validationFieldLetterAndNumber } from 'utils/validation';
import { handleErrorModal, handleSuccessModal } from 'utils/responseModal';



function DrawerUtilMain({ drawer, setDrawer, arrData, setArrData }) {
    const [formData, setFormData] = useState([]);
    // const [isChecked, setIsChecked] = useState(formData?.isActive === 'Y' ? true : false);
    const [isChecked, setIsChecked] = useState(true);
    const [switchIntial, setswitchIntial] = useState('Y')
    const [forceFormReset, setForceFormReset] = useState(false);

    const defaultBtnVisiblity = { editBtn: false, rootChildBtn: true, childBtn: false, siblingBtn: false, saveBtn: false, resetBtn: false, cancelBtn: false };
    const [buttonData, setButtonData] = useState({ ...defaultBtnVisiblity });
    const [form] = Form.useForm();
    const [addFormData, setAddFormData] = useState({
        code: '',
        name: ''
    })

    const handleAddFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = { ...addFormData };
        newFormData[fieldName] = fieldValue;

        setAddFormData(newFormData);
        console.log(newFormData);

    };

    //form submit
    const handleAddFormSubmit = (event) => {
        event.preventDefault();

        const newQualification = {
            code: addFormData.code,
            name: addFormData.name,
        }
        const newQualifications = [...arrData, newQualification];
        setArrData(newQualifications);

    };

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

        const recordId = formData?.id || '';
        const codeToBeSaved = Array.isArray(values?.code) ? values?.code[0] : values?.code || '';
        const data = { ...values, id: recordId, isActive: values?.isActive ? 'Y' : 'N', code: codeToBeSaved };

        Object.entries(values).map(([keyname, value]) => {
            if (keyname == 'status' && isChecked == false) {
                values[keyname] = 'N';
            }
        });
        console.log('Success:', values);


    };
    const Handleswitch = () => {
        setIsChecked(!isChecked)
        setswitchIntial('N')
    }

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

                <Form.Item  >
                    <Row justify="end">
                        <Button
                            danger
                            onClick={() => handleBack()}
                            style={{ marginRight: 8 }}
                        >
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
                            form="myForm"
                            danger
                            style={{ marginRight: 8 }}
                            htmlType="submit">
                            Save
                        </Button>
                    </Row>
                </Form.Item>


            }
        >
            <Form
                name="Qualform"
                id="myForm"
                form={form}
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                onSubmitCapture={handleAddFormSubmit}
            >
                <Row gutter={20}>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item label="Qualification Code" name="code" rules={[validateRequiredInputField('Code'), validationFieldLetterAndNumber('Code')]}>
                            <Input placeholder="QCN00001" name="code" onChange={handleAddFormChange} />
                        </Form.Item>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item label="Qualification Name" name="name" rules={[validateRequiredInputField('Name')]}>
                            <Input placeholder="Name" name="name" onChange={handleAddFormChange} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item initialValue={switchIntial} label="Status" name="status">
                            <Switch checkedChildren="Active" unCheckedChildren="Inactive" defaultChecked={isChecked} onChange={Handleswitch} />{' '}
                        </Form.Item>
                    </Col>
                </Row>

            </Form>
        </Drawer>
    );
}

export const DrawerUtil = DrawerUtilMain;