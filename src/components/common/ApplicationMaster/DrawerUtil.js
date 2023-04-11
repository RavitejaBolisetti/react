import React, { useState } from 'react';
import { Drawer, Form, Col, Collapse, Checkbox, Row, Button, Select, Space, Typography } from 'antd';
import { FaEdit, FaUserPlus, FaUserFriends, FaSave, FaUndo, FaRegTimesCircle } from 'react-icons/fa';

import { PlusBorderedIcon, MinusBorderedIcon } from 'Icons';

import { validateRequiredInputField, validationFieldLetterAndNumber, validateRequiredSelectField } from 'utils/validation';

import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';

import style from 'components/common/DrawerAndTable.module.css';
import styles from 'pages/common/Common.module.css';

import ApplicationDetails from './ApplicationDetails';
import ApplicationActions from './ApplicationActions';
import DocumentTypes from './DocumentTypes';
import AccessibleDealerLocations from './AccessibleDealerLocations';

const { Panel } = Collapse;

const DrawerUtil = ({ handleUpdate2, setFinalFormdata, FinalFormdata, footerEdit, buttonData, setsaveclick, openAccordian, isLoading, formBtnDisable, saveAndSaveNew, saveBtn, setFormBtnDisable, onFinish, onFinishFailed, form, handleAdd, setForceFormReset, open, setDrawer, isChecked, setIsChecked, formActionType, isReadOnly, formData, setFormData, isDataAttributeLoaded, attributeData, setFieldValue, handleSelectTreeClick, isLoadingOnSave }) => {
    const disabledProps = { disabled: isReadOnly };
    const [selectedLocaationAccessiblity, setSelectedLocaationAccessiblity] = useState('');
    const [applicationForm] = Form.useForm();

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
        applicationForm.resetFields();
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
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.buttonContainer}>
                            {buttonData?.editBtn && (
                                <Button danger onClick={() => console.log('hh')}>
                                    <FaEdit className={styles.buttonIcon} />
                                    Edit
                                </Button>
                            )}

                            {buttonData?.childBtn && (
                                <Button danger onClick={() => console.log('hh')}>
                                    <FaUserPlus className={styles.buttonIcon} />
                                    Add Child
                                </Button>
                            )}

                            {buttonData?.siblingBtn && (
                                <Button danger onClick={() => console.log('hh')}>
                                    <FaUserFriends className={styles.buttonIcon} />
                                    Add Sibling
                                </Button>
                            )}

                            {true && (
                                <>
                                    {buttonData?.saveBtn && (
                                        <Button htmlType="submit" danger>
                                            <FaSave className={styles.buttonIcon} />
                                            Save
                                        </Button>
                                    )}

                                    {buttonData?.resetBtn && (
                                        <Button danger onClick={() => console.log('hh')}>
                                            <FaUndo className={styles.buttonIcon} />
                                            Reset
                                        </Button>
                                    )}

                                    {/* {buttonData?.cancelBtn && (
                                        <Button danger onClick={() => console.log('hh')}>
                                            <FaRegTimesCircle size={15} className={styles.buttonIcon} />
                                            Cancel
                                        </Button>
                                    )} */}

                                    <Button danger className={style.cancelBtn} onClick={onClose}>
                                        Cancel
                                    </Button>
                                    <Button form="myForm" key="saveBtm" htmlType="submit" type="primary">
                                        Save
                                    </Button>
                                </>
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
                    {/*Application Details  */}
                    <ApplicationDetails setFinalFormdata={setFinalFormdata} FinalFormdata={FinalFormdata} onFinish={onFinish} form={applicationForm} />

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
