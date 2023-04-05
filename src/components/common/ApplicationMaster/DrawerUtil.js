import React, { useState } from 'react';
import { Drawer, Input, Form, Col, Collapse, Card, Row, Switch, Button, Select, Space } from 'antd';
import { DownOutlined, UpOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons';

import { validateRequiredInputField, validationFieldLetterAndNumber, validateRequiredSelectField } from 'utils/validation';

import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';

import styles from 'pages/common/Common.module.css';
import style from 'components/common/DrawerAndTable.module.css';


const { Panel } = Collapse;
const { Option } = Select;
const DrawerUtil = ({ handleUpdate2, footerEdit, setsaveclick, openAccordian, isLoading, formBtnDisable, saveAndSaveNew, saveBtn, setFormBtnDisable, onFinish, onFinishFailed, form, handleAdd, setForceFormReset, open, setDrawer, isChecked, setIsChecked, formActionType, isReadOnly, formData, setFormData, isDataAttributeLoaded, attributeData, setFieldValue, handleSelectTreeClick, geoData, isLoadingOnSave }) => {
    const disabledProps = { disabled: isReadOnly };
    const [selectedLocaationAccessiblity, setSelectedLocaationAccessiblity] = useState('');

    console.log("isLoadingOnSave", isLoadingOnSave)
    let drawerTitle = 'Add Application Details';
    if (formActionType === 'add') {
        drawerTitle = 'Add Application Details';
    } else if (formActionType === 'update') {
        drawerTitle = 'Edit Application Details';
    } else if (formActionType === 'view') {
        drawerTitle = 'View Application Details';
    }

    const handleForm = () => {
        setFormBtnDisable(true);
    };

    const onClose = () => {
        setDrawer(false);
        setFormBtnDisable(false);
        form.
            resetFields();
    };

    const handleChangeLocations = (value) => {
        setSelectedLocaationAccessiblity(value);
    };


    return (

        <Drawer
            title={drawerTitle}
            placement="right"
            onClose={onClose}
            open={open}
            className={footerEdit ? style.viewMode : style.drawerCriticalityGrp}
            width="540px"
            footer={
                <>
                    <Row gutter={20}>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Button danger onClick={onClose} className={style.cancelBtn}>
                                Cancel
                            </Button>
                        </Col>
                        <Col xs={16} sm={16} md={16} lg={16} xl={16} xxl={16} className={style.saveBtn}>

                            <Button loading={isLoadingOnSave} onClick={handleAdd} form="myForm" key="submitAndNew" htmlType="submit" type="primary">
                                Save & Add New
                            </Button>

                            <Button loading={isLoadingOnSave} onClick={() => setsaveclick(true)} form="myForm" key="submit" htmlType="submit" type="primary">
                                Save
                            </Button>

                            {footerEdit ? (
                                <Button onClick={handleUpdate2} form="myForm" key="submitAndNew" htmlType="submit" type="primary">
                                    Edit
                                </Button>
                            ) : (
                                ''
                            )}
                        </Col>
                    </Row>
                </>
            }
        >
            <>
                <Space
                    direction="vertical"
                    style={{
                        display: 'flex',
                    }}
                >
                    <Collapse expandIcon={({ isActive }) => isActive ? < MinusOutlined /> : <PlusOutlined />}>
                        <Panel header="Application Details" key="1">
                            <Form form={form} id="myForm" layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                                <Row gutter={20}>
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                        <Form.Item label="Application ID" name="ApplicationId" rules={[validateRequiredInputField('Application Name'), validationFieldLetterAndNumber('Application Name')]}>
                                            {!footerEdit ?
                                                <Input maxLength={50} placeholder={preparePlaceholderText('Name')} {...disabledProps} />
                                                : <p className={style.viewModeText}>{form.getFieldValue("ApplicationName")}</p>}
                                        </Form.Item>
                                    </Col>

                                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                        <Form.Item label="Application Name" name="ApplicationName" rules={[validateRequiredInputField('Application Name'), validationFieldLetterAndNumber('Application Name')]}>
                                            {!footerEdit ?
                                                <Input maxLength={50} placeholder={preparePlaceholderText('Name')} {...disabledProps} />
                                                : <p className={style.viewModeText}>{form.getFieldValue("ApplicationName")}</p>}
                                        </Form.Item>
                                    </Col>

                                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                        <Form.Item label="Application Title" name="ApplicationTitle" rules={[validateRequiredInputField('Application Name'), validationFieldLetterAndNumber('Application Name')]}>
                                            {!footerEdit ?
                                                <Input maxLength={50} placeholder={preparePlaceholderText('Name')} {...disabledProps} />
                                                : <p className={style.viewModeText}>{form.getFieldValue("ApplicationName")}</p>}
                                        </Form.Item>
                                    </Col>


                                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                        <Form.Item label="Application Type" name="ApplicationType" rules={[validateRequiredInputField('Application Name'), validationFieldLetterAndNumber('Application Name')]}>
                                            {!footerEdit ?
                                                <Select maxLength={50} placeholder={preparePlaceholderText('Name')} {...disabledProps} />
                                                : <p className={style.viewModeText}>{form.getFieldValue("ApplicationName")}</p>}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                        <Form.Item name="ParentApplication" label="Parent Application ID" rules={[validateRequiredSelectField('Accessible Locations')]}>
                                            <Select  {...disabledProps} placeholder={preparePlaceholderSelect('Accessible Location')}>
                                                <Option value="all"></Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row gutter={20}>
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                        <Form.Item name="accessibleLocations" label="Accessible Location" rules={[validateRequiredSelectField('Accessible Locations')]}>
                                            <Select onChange={handleChangeLocations}  {...disabledProps} placeholder={preparePlaceholderSelect('Accessible Location')}>
                                                <Option value="all">Accessible to all</Option>
                                                <Option value="notAccessable">Not accessible to all</Option>
                                                <Option value="restrictedAccessible">Restricted Accessible</Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>

                                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                        <Form.Item label="Application Criticality Group" name="ApplicationCriticalityGroup" rules={[validateRequiredInputField('Application Name'), validationFieldLetterAndNumber('Application Name')]}>
                                            <Select maxLength={50} placeholder={preparePlaceholderText('Name')} {...disabledProps} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                        <Form.Item name="MenuType" label="Menu Type" rules={[validateRequiredSelectField('Accessible Locations')]}>
                                            <Select  {...disabledProps} placeholder={preparePlaceholderSelect('Accessible Location')}>
                                            </Select>
                                        </Form.Item>

                                    </Col>
                                </Row>


                                <Row gutter={20}>
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                        <Form.Item initialValue={true} labelAlign="left" wrapperCol={{ span: 24 }} name="doc" label="Document not to be generated" valuePropName="checked">
                                            <Switch checkedChildren="Active" unCheckedChildren="Inactive" valuePropName="checked" onChange={(checked) => (checked ? 1 : 0)} {...disabledProps} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                        <Form.Item initialValue={true} labelAlign="left" wrapperCol={{ span: 24 }} name="status" label="Status" valuePropName="checked">
                                            <Switch checkedChildren="Active" unCheckedChildren="Inactive" valuePropName="checked" onChange={(checked) => (checked ? 1 : 0)} {...disabledProps} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form>
                        </Panel>
                    </Collapse>

                    <Collapse expandIcon={({ isActive }) => isActive ? <MinusOutlined /> : <PlusOutlined />}  >

                        <Panel header="Application Actions" key="2">
                            <Form className={styles.contentHeaderBackground} form={form} onFieldsChange={handleForm} id="myForm" layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                        <Form.Item label="Action" name="ApplicationAction" rules={[validateRequiredInputField('Application Action'), validationFieldLetterAndNumber('Application Action')]}>
                                            <Select maxLength={6} placeholder={preparePlaceholderText('Code')} {...disabledProps} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                        <Form.Item initialValue={true} labelAlign="left" wrapperCol={{ span: 24 }} name="status" label="Status" valuePropName="checked">
                                            <Switch checkedChildren="Active" unCheckedChildren="Inactive" valuePropName="checked" onChange={(checked) => (checked ? 1 : 0)} {...disabledProps} />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                    <Button icon={<PlusOutlined />} style={{ width: "450px" }} type="primary" danger onClick={handleAdd}>
                                        Add Application Action
                                    </Button>
                                    {/* <Card
                                        style={{
                                            width: 300,
                                        }}
                                    >
                                        <p>Status: Active</p>
                                        <p>Employee Empowerment</p>
                                    </Card> */}
                                </Col>
                            </Form>
                        </Panel>
                    </Collapse>

                    <Collapse expandIcon={({ isActive }) => isActive ? <MinusOutlined /> : <PlusOutlined />} >
                        <Panel header="Document Type" key="3">
                            <Form form={form} id="myForm" layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                                <Row gutter={20}>
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                        <Form.Item label="Code" name="ApplicationCode" rules={[validateRequiredInputField('Application Code'), validationFieldLetterAndNumber('Application Code')]}>
                                            {!footerEdit ?
                                                <Input maxLength={50} placeholder={preparePlaceholderText('Name')} {...disabledProps} />
                                                : <p className={style.viewModeText}>{form.getFieldValue("ApplicationName")}</p>}
                                        </Form.Item>
                                    </Col>

                                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                        <Form.Item label="Document Name" name="DocumentName" rules={[validateRequiredInputField('Document Name'), validationFieldLetterAndNumber('Document Name')]}>
                                            {!footerEdit ?
                                                <Input maxLength={50} placeholder={preparePlaceholderText('Name')} {...disabledProps} />
                                                : <p className={style.viewModeText}>{form.getFieldValue("ApplicationName")}</p>}
                                        </Form.Item> 
                                    </Col>
                                </Row>
                                <Row gutter={20}>
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                        <Form.Item initialValue={true} labelAlign="left" wrapperCol={{ span: 24 }} name="doc" label="T&C Required" valuePropName="checked">
                                            <Switch checkedChildren="Yes" unCheckedChildren="Inactive" valuePropName="checked" onChange={(checked) => (checked ? 1 : 0)} {...disabledProps} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                        <Form.Item initialValue={true} labelAlign="left" wrapperCol={{ span: 24 }} name="status" label="Digital Signature Required" valuePropName="checked">
                                            <Switch style={{}} checkedChildren="Yes" unCheckedChildren="Inactive" valuePropName="checked" onChange={(checked) => (checked ? 1 : 0)} {...disabledProps} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Button icon={<PlusOutlined />} style={{ width: "450px" }} type="primary" danger onClick={handleAdd}>
                                    Add Application Action
                                </Button>
                            </Form>
                        </Panel>
                    </Collapse>
                    {selectedLocaationAccessiblity === 'restrictedAccessible' &&
                        (<Collapse expandIcon={({ isActive }) => isActive ? <MinusOutlined /> : <PlusOutlined />} >
                            <Panel header="Accessible Dealer Locations" key="4">
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                        <Form.Item label="Application Type" name="ApplicationType" rules={[validateRequiredInputField('Application Type'), validationFieldLetterAndNumber('Application Type')]}>
                                            <Select placeholder={preparePlaceholderText('Code')} {...disabledProps} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Panel>
                        </Collapse>)
                    }

                </Space>
            </>
        </Drawer>
    );
};

export default DrawerUtil;
