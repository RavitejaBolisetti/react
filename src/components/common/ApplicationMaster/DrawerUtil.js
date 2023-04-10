import React, { useState } from 'react';
import { Drawer, Input, Form, Col, Collapse, Card, Checkbox, Row, Switch, Button, Select, Space, Typography } from 'antd';
import { DownOutlined, UpOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { FaEdit, FaUserPlus, FaUserFriends, FaSave, FaUndo, FaRegTimesCircle } from 'react-icons/fa';

import { PlusBorderedIcon, MinusBorderedIcon } from 'Icons';

import { validateRequiredInputField, validationFieldLetterAndNumber, validateRequiredSelectField } from 'utils/validation';

import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';

import style from 'components/common/DrawerAndTable.module.css';
import ApplicationDetails from './ApplicationDetails';
import ApplicationActions from './ApplicationActions';
import DocumentTypes from './DocumentTypes';
import AccessibleDealerLocations from './AccessibleDealerLocations';

const { Panel } = Collapse;

const DrawerUtil = ({ handleUpdate2, setFinalFormdata, FinalFormdata, footerEdit, setsaveclick, openAccordian, isLoading, formBtnDisable, saveAndSaveNew, saveBtn, setFormBtnDisable, onFinish, onFinishFailed, form, handleAdd, setForceFormReset, open, setDrawer, isChecked, setIsChecked, formActionType, isReadOnly, formData, setFormData, isDataAttributeLoaded, attributeData, setFieldValue, handleSelectTreeClick, geoData, isLoadingOnSave }) => {
    const disabledProps = { disabled: isReadOnly };
    const [selectedLocaationAccessiblity, setSelectedLocaationAccessiblity] = useState('');

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
        form.resetFields();
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
                    <Row gutter={20} justify="space-between">
                        <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                            <Button danger onClick={onClose} className={style.cancelBtn}>
                                Cancel
                            </Button>
                        </Col>
                        <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                            <Button htmlType="submit" danger form="myForm" key="applicatonMaster" type="primary" className={style.saveBtn}>
                                <FaSave className={style.buttonIcon} />
                                Save
                            </Button>
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
                    {/*Application Details  */}
                    <ApplicationDetails setFinalFormdata={setFinalFormdata} FinalFormdata={FinalFormdata} onFinish={onFinish} />

                    <Collapse expandIcon={({ isActive }) => (isActive ? <MinusBorderedIcon /> : <PlusBorderedIcon />)}>
                        <Panel header="Application Actions" key="1">
                            <ApplicationActions setFinalFormdata={setFinalFormdata} FinalFormdata={FinalFormdata} />
                        </Panel>
                    </Collapse>

                    <Collapse expandIcon={({ isActive }) => (isActive ? <MinusBorderedIcon /> : <PlusBorderedIcon />)}>
                        <Panel header="Document Type" key="2">
                            <DocumentTypes setFinalFormdata={setFinalFormdata} FinalFormdata={FinalFormdata} />
                        </Panel>
                    </Collapse>

                    {/* {selectedLocaationAccessiblity === 'restrictedAccessible' && (
                        <Collapse expandIcon={({ isActive }) => (isActive ? <MinusBorderedIcon /> : <PlusBorderedIcon />)}>
                            <Panel header="Accessible Dealer Locations" key="3">
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
                        </Collapse>
                    )} */}

                    <Collapse expandIcon={({ isActive }) => (isActive ? <MinusBorderedIcon /> : <PlusBorderedIcon />)}>
                        <Panel header="Accessible Dealer Location" key="3">
                            <AccessibleDealerLocations setFinalFormdata={setFinalFormdata} FinalFormdata={FinalFormdata} />
                        </Panel>
                    </Collapse>
                </Space>
            </>
        </Drawer>
    );
};

export default DrawerUtil;
