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

const DrawerUtil = ({forceUpdate, handleUpdate2, setFinalFormdata, FinalFormdata, footerEdit, buttonData, setsaveclick, isLoading, formBtnDisable, saveAndSaveNew, saveBtn, setFormBtnDisable, onFinish, onFinishFailed, form, handleAdd, setForceFormReset, open, setDrawer, isChecked, setIsChecked, formActionType, isReadOnly, formData, setFormData, isDataAttributeLoaded, attributeData, setFieldValue, handleSelectTreeClick, isLoadingOnSave }) => {
    const [openAccordian, setOpenAccordian] = useState(1)
    const [applicationForm] = Form.useForm();

    let drawerTitle = 'Add Application Details';
    if (formActionType === 'add') {
        drawerTitle = 'Add Application Details';
    } else if (formActionType === 'update') {
        drawerTitle = 'Edit Application Details';
    } else if (formActionType === 'view') {
        drawerTitle = 'View Application Details';
    }

    const handleCollapse = (key) => {
        setOpenAccordian(prev => prev === key ? "" : key);
    };

    const handleForm = () => {
        setFormBtnDisable(true);
    };

    const onClose = () => {
        applicationForm.resetFields();
        setDrawer(false);
        setFormBtnDisable(false);
        forceUpdate()
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
                            {true && (
                                <>
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
                        paddingBottom: '10px'
                    }}
                >
                    <ApplicationDetails setFinalFormdata={setFinalFormdata} FinalFormdata={FinalFormdata} onFinish={onFinish} form={applicationForm} />

                    <Collapse onChange={() => handleCollapse('1')} expandIcon={({ isActive }) => (isActive ? <MinusBorderedIcon /> : <PlusBorderedIcon />)} activeKey={openAccordian}>
                        <Panel header="Application Actions" key="1">
                            <ApplicationActions setFinalFormdata={setFinalFormdata} FinalFormdata={FinalFormdata} />
                        </Panel>
                    </Collapse>

                    <Collapse onChange={() => handleCollapse('2')} expandIcon={({ isActive }) => (isActive ? <MinusBorderedIcon /> : <PlusBorderedIcon />)} activeKey={openAccordian}>
                        <Panel header="Document Type" key="2">
                            <DocumentTypes setFinalFormdata={setFinalFormdata} FinalFormdata={FinalFormdata} />
                        </Panel>
                    </Collapse>

                    <Collapse onChange={() => handleCollapse('3')} expandIcon={({ isActive }) => (isActive ? <MinusBorderedIcon /> : <PlusBorderedIcon />)} activeKey={openAccordian}>
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
