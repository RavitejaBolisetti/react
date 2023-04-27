import React, { useEffect, useState } from 'react';
import { Drawer, Form, Col, Collapse, Row, Button, Space, Spin } from 'antd';

import { PlusBorderedIcon, MinusBorderedIcon } from 'Icons';

import styl from './ApplicationMaster.module.css';

import styles from 'components/common/Common.module.css';
import style from './../../common/Common.module.css';

import ApplicationDetails from './ApplicationDetails';
import ApplicationActions from './actions/ApplicationActions';
import DocumentTypes from './documentTypes/DocumentTypes';
import { AccessibleDealerLocations } from './dealerLocations/AccessibleDealerLocations';
import { withDrawer } from 'components/withDrawer';

const { Panel } = Collapse;

const DrawerUtilMain = ({ setSelectedTreeKey, selectedTreeKey, applicationForm, forceUpdate, setFinalFormdata, finalFormdata, setFormBtnDisable, onFinish, onFinishFailed, form, handleAdd, setForceFormReset, isVisible, setisVisible, isChecked, setIsChecked, formActionType, isReadOnly, formData, setFormData, isDataAttributeLoaded, attributeData, setFieldValue, handleSelectTreeClick, isLoadingOnSave, criticalityGroupData, configurableParamData, actions, menuData, isApplicatinoOnSaveLoading, isFieldDisable }) => {
    const [openAccordian, setOpenAccordian] = useState('');
    const [isRestrictedLocation, setIsRestrictedLocation] = useState(false);
    const [isDocumentToGenerate, setIsDocumentToGenerate] = useState(true);
    const [isBtnDisabled, setIsBtnDisabled] = useState(false);

    useEffect(() => {
        setIsRestrictedLocation(finalFormdata?.applicationDetails?.accessableIndicator === 2);
        setIsDocumentToGenerate(finalFormdata?.applicationDetails?.documentNumRequired);

        return () => {
            setIsBtnDisabled(false);
        };
    }, [finalFormdata?.applicationDetails?.accessableIndicator, finalFormdata?.applicationDetails?.documentNumRequired]);

    const handleCollapse = (key) => {
        setOpenAccordian((prev) => (prev === key ? '' : key));
    };

    const handleForm = () => {
        setFormBtnDisable(true);
    };

    const onClose = () => {
        applicationForm.resetFields();
        setisVisible(false);
        setFormBtnDisable(false);
        forceUpdate();
        setIsBtnDisabled(false);
    };

    return (
        <>
            {/* <Form form={form} id="myForm" layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}> */}

            <Spin spinning={isApplicatinoOnSaveLoading}>
                <Space
                    direction="vertical"
                    size="small"
                    className={style.accordianContainer}
                    style={{
                        display: 'flex',
                        marginBottom: '14px',
                        gap: '0px',
                    }}
                >
                    <ApplicationDetails isFieldDisable={isFieldDisable} isReadOnly={isReadOnly} setSelectedTreeKey={setSelectedTreeKey} selectedTreeKey={selectedTreeKey} setFinalFormdata={setFinalFormdata} finalFormdata={finalFormdata} onFinish={onFinish} form={applicationForm} setIsRestrictedLocation={setIsRestrictedLocation} setIsDocumentToGenerate={setIsDocumentToGenerate} criticalityGroupData={criticalityGroupData} configurableParamData={configurableParamData} menuData={menuData} />

                    <Collapse onChange={() => handleCollapse(1)} expandIcon={({ isActive }) => (isActive ? <MinusBorderedIcon /> : <PlusBorderedIcon />)} activeKey={openAccordian}>
                        <Panel header={<span>Application Actions</span>} key="1">
                            <ApplicationActions actions={actions} setFinalFormdata={setFinalFormdata} finalFormdata={finalFormdata} />
                        </Panel>
                    </Collapse>
                    {isDocumentToGenerate && (
                        <Collapse onChange={() => handleCollapse(2)} expandIcon={({ isActive }) => (isActive ? <MinusBorderedIcon /> : <PlusBorderedIcon />)} activeKey={openAccordian}>
                            <Panel header={<span>Document Type </span>} key="2">
                                <DocumentTypes setFinalFormdata={setFinalFormdata} finalFormdata={finalFormdata} setIsBtnDisabled={setIsBtnDisabled} isBtnDisabled={isBtnDisabled} />
                            </Panel>
                        </Collapse>
                    )}
                    {isRestrictedLocation && (
                        <Collapse onChange={() => handleCollapse(3)} expandIcon={({ isActive }) => (isActive ? <MinusBorderedIcon /> : <PlusBorderedIcon />)} activeKey={openAccordian}>
                            <Panel header={<span>Accessible Dealer Location</span>} key="3">
                                <AccessibleDealerLocations setFinalFormdata={setFinalFormdata} finalFormdata={finalFormdata} />
                            </Panel>
                        </Collapse>
                    )}
                </Space>
            </Spin>
            <Row gutter={20} className={style.formFooter}>
                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={style.footerBtnLeft}>
                    <Button danger onClick={onClose}>
                        Cancel
                    </Button>
                </Col>

                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={style.footerBtnRight}>
                    <Button
                        htmlType="submit"
                        danger
                        form="myForm"
                        key="saveBtm"
                        type="primary"
                        // disabled={!isFormBtnActive}
                    >
                        Save
                    </Button>
                </Col>
            </Row>
            {/* </Form > */}
        </>
    );
};

export const AddEditForm = withDrawer(DrawerUtilMain, {});
