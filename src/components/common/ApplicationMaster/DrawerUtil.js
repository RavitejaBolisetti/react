import React, { useState } from 'react';
import { Drawer, Input, Form, Col, Collapse, Card, Checkbox, Row, Switch, Button, Select, Space } from 'antd';
import { DownOutlined, UpOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { Typography } from 'antd';

import { validateRequiredInputField, validationFieldLetterAndNumber, validateRequiredSelectField } from 'utils/validation';

import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';

import styles from 'pages/common/Common.module.css';
import style from 'components/common/DrawerAndTable.module.css';
import ApplicationDetails from './ApplicationDetails';
import ApplicationActions from './ApplicationActions';
import DocumentTypes from './DocumentTypes';


const { Panel } = Collapse;
const { Option } = Select;
const { Title, Text } = Typography;
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
                    {/* <Collapse expandIcon={({ isActive }) => isActive ? < MinusOutlined /> : <PlusOutlined />}>
                        <Panel header="Application Details" key="1"> */}
                           {/* application Details */}
                            <ApplicationDetails />
                        {/* </Panel>
                    </Collapse> */}

                    <Collapse expandIcon={({ isActive }) => isActive ? <MinusOutlined /> : <PlusOutlined />}  >
                        <Panel header="Application Actions" key="2">
                           
                           <ApplicationActions />
                        </Panel>
                    </Collapse>

                    <Collapse expandIcon={({ isActive }) => isActive ? <MinusOutlined /> : <PlusOutlined />} >
                        <Panel header="Document Type" key="3">
                            
                        <DocumentTypes />

                        </Panel>
                    </Collapse>
                    {
                        selectedLocaationAccessiblity === 'restrictedAccessible' &&
                        (<Collapse expandIcon={({ isActive }) => isActive ? <MinusOutlined /> : <PlusOutlined />} >
                            <Panel header="Accessible Dealer Locations" key="4">
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                                        <Form.Item label="Application Type" name="ApplicationType" rules={[validateRequiredInputField('Application Type'), validationFieldLetterAndNumber('Application Type')]}>
                                            <Select placeholder={preparePlaceholderText('Code')} {...disabledProps}>
                                                <Option>
                                                    <Checkbox>Dealer Location 1</Checkbox>
                                                    <Checkbox>Dealer Location 2</Checkbox>
                                                </Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Panel>
                        </Collapse>)
                    }

                </Space >
            </>
        </Drawer >
    );
};

export default DrawerUtil;
