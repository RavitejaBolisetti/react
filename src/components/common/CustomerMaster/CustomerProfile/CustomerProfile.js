import React, { useEffect, useState } from 'react';
import { Col, Collapse, Row, Button, Space, Spin } from 'antd';

import style from 'components/common/Common.module.css';
import { withDrawer } from 'components/withDrawer';
import { accordianExpandIcon } from 'utils/accordianExpandIcon';
import { CompanyProfile } from './CompanyProfile';

const { Panel } = Collapse;

const CustomerProfileBase = ({ setSelectedTreeKey, selectedTreeKey, showGlobalNotification, setparentAppCode, parentAppCode, applicationForm, forceUpdate, setFinalFormdata, finalFormdata, setFormBtnDisable, onFinish, onFinishFailed, form, handleAdd, setForceFormReset, isVisible, setisVisible, isChecked, setIsChecked, formActionType, isReadOnly, formData, setFormData, isDataAttributeLoaded, attributeData, setFieldValue, handleSelectTreeClick, isLoadingOnSave, criticalityGroupData, configurableParamData, actions, menuData, isApplicatinoOnSaveLoading, isFieldDisable }) => {
    const [openAccordian, setOpenAccordian] = useState('');
    const [isBtnDisabled, setIsBtnDisabled] = useState(false);

    const handleCollapse = (key) => {
        setOpenAccordian((prev) => (prev === key ? '' : key));
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
        
            <Collapse onChange={() => handleCollapse(1)} expandIcon={({ isActive }) => accordianExpandIcon(isActive)} activeKey={openAccordian}>
                <Panel header={'Application Actions'} key="1">
                    <CompanyProfile />
                </Panel>
            </Collapse>

            <Collapse onChange={() => handleCollapse(2)} expandIcon={({ isActive }) => accordianExpandIcon(isActive)} activeKey={openAccordian}>
                <Panel header={'Document Type'} key="2">
                    <p>simran</p>
                </Panel>
            </Collapse>

            <Collapse onChange={() => handleCollapse(3)} expandIcon={({ isActive }) => accordianExpandIcon(isActive)} activeKey={openAccordian}>
                <Panel header={'Accessible Dealer Location'} key="3">
                    <p>simran</p>
                </Panel>
            </Collapse>

            <Row gutter={20} className={style.formFooter}>
                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={style.footerBtnLeft}>
                    <Button danger onClick={onClose}>
                        Cancel
                    </Button>
                </Col>

                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={style.footerBtnRight}>
                    <Button htmlType="submit" danger form="myForm" key="saveBtm" type="primary">
                        Save
                    </Button>
                </Col>
            </Row>
        </>
    );
};

export const CustomerProfile = CustomerProfileBase;
