/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Col, Input, Form, Row, Switch, Collapse, Divider } from 'antd';

import { validateRequiredInputField } from 'utils/validation';
import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { accordianExpandIcon } from 'utils/accordianExpandIcon';
import { expandIcon } from 'utils/accordianExpandIcon';

import { ViewDetail } from './ViewDetail';
import { withDrawer } from 'components/withDrawer';
import { DrawerFormButton } from 'components/common/Button';
import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';
import DocumentDetails from './DocumentDetails/DocumentDetails';
const { Panel } = Collapse;

const AddEditFormMain = (props) => {
    const { form, formData, onCloseAction, formActionType: { editMode, viewMode } = undefined, onFinish, onFinishFailed,activeKey,onChange,finalFormdata, setFinalFormdata } = props;

    const { buttonData, setButtonData, handleButtonClick } = props;
    const [openAccordian, setOpenAccordian] = useState('');
    const [isRestrictedLocation, setIsRestrictedLocation] = useState(false);
    const [isDocumentToGenerate, setIsDocumentToGenerate] = useState(true);
    const [canFormSave, setCanFormSave] = useState(false);
  
    const [isBtnDisabled, setIsBtnDisabled] = useState(false);

    const documentNameViewdata = [{ documentId: '44', documentName: 'sda' }];

    const myFormProps = {
        setFinalFormdata,
        finalFormdata,
        setCanFormSave,
        isBtnDisabled,
        setIsBtnDisabled,
    };

    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const handleFormFieldChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const handleCollapse = (key) => {
        setOpenAccordian((prev) => (prev === key ? '' : key));
    };

    const viewProps = {
        isVisible: viewMode,
        formData,
        styles,
        documentNameViewdata,
        finalFormdata,
    };

    const buttonProps = {
        formData,
        onCloseAction,
        buttonData,
        setButtonData,
        handleButtonClick,
    };

    return (
        <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={20} className={styles.drawerBody}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    {viewMode ? (
                        <ViewDetail {...viewProps} />
                    ) : (
                        <>
                            <Row gutter={20}>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item initialValue={formData?.schemeId} label={translateContent('LoyaltySchemeMaster.label.schemeId')} name="schemeId" rules={[validateRequiredInputField(translateContent('LoyaltySchemeMaster.validation.schemeId'))]}>
                                        <Input placeholder={preparePlaceholderText(translateContent('LoyaltySchemeMaster.placeholder.schemeId'))} maxLength={6} disabled={editMode ? true : false} />
                                    </Form.Item>
                                </Col>
                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item label={translateContent('LoyaltySchemeMaster.label.SchemeName')} initialValue={formData?.SchemeName} rules={[validateRequiredInputField(translateContent('LoyaltySchemeMaster.validation.SchemeName'))]} name="SchemeName">
                                        <Input placeholder={preparePlaceholderText(translateContent('LoyaltySchemeMaster.placeholder.SchemeName'))} maxLength={250} disabled={editMode ? true : false} />
                                    </Form.Item>
                                </Col>

                                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                                    <Form.Item initialValue={editMode ? formData.status : true} labelAlign="left" wrapperCol={{ span: 24 }} valuePropName="checked" name="status" label={translateContent('LoyaltySchemeMaster.label.status')}>
                                        <Switch checkedChildren={translateContent('LoyaltySchemeMaster.label.active')} unCheckedChildren={translateContent('LoyaltySchemeMaster.label.inactive')} onChange={(checked) => (checked ? 1 : 0)} />
                                    </Form.Item>
                                </Col>

                                <Col xs={0} >
                                    <Form.Item label={translateContent('LoyaltySchemeMaster.label.schemeId')} name="schemeId" />

                                </Col>

                            </Row>

                              <Collapse collapsible="icon" onChange={() => handleCollapse(3)} expandIcon={expandIcon}  activeKey={openAccordian} expandIconPosition="end">
                                <Panel
                                    header={
                                        <>
                                            <span>Document Details</span>
                                        </>
                                    }
                                    key="3" >
                                    <Divider />
                                    <DocumentDetails {...myFormProps} editMode={editMode} />
                                    {/* <DocumentDetails formData={formData} editMode={editMode}/> */}
                                </Panel>
                            </Collapse>
                        </>
                    )}
                </Col>
            </Row>

            <DrawerFormButton {...buttonProps} />
        </Form>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, { width: '54%' });
