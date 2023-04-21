import React, { useEffect, useState } from 'react';
import { Drawer, Form, Col, Collapse, Row, Button, Space, Spin } from 'antd';

import { PlusBorderedIcon, MinusBorderedIcon } from 'Icons';

import style from '../../common/DrawerAndTable.module.css';
import styles from 'pages/common/Common.module.css';

import ApplicationDetails from './ApplicationDetails';
import ApplicationActions from './ApplicationActions';
import DocumentTypes from './DocumentTypes';
import { AccessibleDealerLocations } from './AccessibleDealerLocations';

const { Panel } = Collapse;

const DrawerUtil = ({ setSelectedTreeKey, selectedTreeKey, applicationForm, forceUpdate, setFinalFormdata, finalFormdata, footerEdit, buttonData, setsaveclick, isLoading, formBtnDisable, saveAndSaveNew, saveBtn, setFormBtnDisable, onFinish, onFinishFailed, form, handleAdd, setForceFormReset, open, setDrawer, isChecked, setIsChecked, formActionType, isReadOnly, formData, setFormData, isDataAttributeLoaded, attributeData, setFieldValue, handleSelectTreeClick, isLoadingOnSave, criticalityGroupData, configurableParamData, actions, menuData, isApplicatinoOnSaveLoading }) => {
    const [openAccordian, setOpenAccordian] = useState(1);
    const [isRestrictedLocation, setIsRestrictedLocation] = useState(false);
    const [isDocumentToGenerate, setIsDocumentToGenerate] = useState(true);
    const [isBtnDisabled, setIsBtnDisabled] = useState(false);

    useEffect(() => {
        setIsRestrictedLocation( finalFormdata?.applicationDetails?.accessableIndicator==='2');
        setIsDocumentToGenerate(finalFormdata?.applicationDetails?.documentNumRequired);

        return () => {
            setIsBtnDisabled(false);
        };
    }, [finalFormdata?.applicationDetails?.accessableIndicator, finalFormdata?.applicationDetails?.documentNumRequired]);

    let drawerTitle = 'Add Application Details';
    if (formActionType === 'add') {
        drawerTitle = 'Add Application Details';
    } else if (formActionType === 'update') {
        drawerTitle = 'Edit Application Details';
    } else if (formActionType === 'view') {
        drawerTitle = 'View Application Details';
    }
    const handleCollapse = (key) => {
        setOpenAccordian((prev) => (prev === key ? '' : key));
    };

    const handleForm = () => {
        setFormBtnDisable(true);
    };

    const onClose = () => {
        applicationForm.resetFields();
        setDrawer(false);
        setFormBtnDisable(false);
        forceUpdate();
        setIsBtnDisabled(false);
    };

    return (
        <Drawer
            title={drawerTitle}
            placement="right"
            onClose={onClose}
            open={open}
            // open={true}
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
                <Spin spinning={isApplicatinoOnSaveLoading}>
                    <Space
                        direction="vertical"
                        size="middle"
                        style={{
                            display: 'flex',
                        }}
                    >
                        <ApplicationDetails isReadOnly={isReadOnly} setSelectedTreeKey={setSelectedTreeKey} selectedTreeKey={selectedTreeKey} setFinalFormdata={setFinalFormdata} finalFormdata={finalFormdata} onFinish={onFinish} form={applicationForm} setIsRestrictedLocation={setIsRestrictedLocation} setIsDocumentToGenerate={setIsDocumentToGenerate} criticalityGroupData={criticalityGroupData} configurableParamData={configurableParamData} menuData={menuData} />

                        <Collapse className={openAccordian === 1 ? style.accordianHeader : ''} onChange={() => handleCollapse(1)} expandIcon={({ isActive }) => (isActive ? <MinusBorderedIcon /> : <PlusBorderedIcon />)} activeKey={openAccordian}>
                            <Panel header={<span className={openAccordian === 1 ? style.accordianHeader : ''}>Application Actions</span>} key="1">
                                <ApplicationActions actions={actions} setFinalFormdata={setFinalFormdata} finalFormdata={finalFormdata} />
                            </Panel>
                        </Collapse>
                        {isDocumentToGenerate && (
                            <Collapse onChange={() => handleCollapse(2)} expandIcon={({ isActive }) => (isActive ? <MinusBorderedIcon /> : <PlusBorderedIcon />)} activeKey={openAccordian}>
                                <Panel header={<span className={openAccordian === 2 ? style.accordianHeader : ''}>Document Type </span>} key="2">
                                    <DocumentTypes setFinalFormdata={setFinalFormdata} finalFormdata={finalFormdata} setIsBtnDisabled={setIsBtnDisabled} isBtnDisabled={isBtnDisabled} />
                                </Panel>
                            </Collapse>
                        )}
                        {isRestrictedLocation && (
                            <Collapse onChange={() => handleCollapse(3)} expandIcon={({ isActive }) => (isActive ? <MinusBorderedIcon /> : <PlusBorderedIcon />)} activeKey={openAccordian}>
                                <Panel header={<span className={openAccordian === 3 ? style.accordianHeader : ''}>Accessible Dealer Location</span>} key="3">
                                    <AccessibleDealerLocations setFinalFormdata={setFinalFormdata} finalFormdata={finalFormdata} />
                                </Panel>
                            </Collapse>
                        )}
                    </Space>
                </Spin>
            </>
        </Drawer>
    );
};

export default DrawerUtil;
