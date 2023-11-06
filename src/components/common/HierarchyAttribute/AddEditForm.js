/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Switch, Row, Col, Input, Form } from 'antd';
import { validateAlphanumericWithSpace, validateRequiredInputField, validationFieldLetterAndNumber } from 'utils/validation';
import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { withDrawer } from 'components/withDrawer';
import { ViewHierarchyAttribute } from './ViewHierarchyAttribute';
import { DrawerFormButton } from 'components/common/Button';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

const AddEditFormMain = ({ isViewModeVisible, form, buttonData, setButtonData, handleButtonClick, formActionType, setFormActionType, codeIsReadOnly, editRow, setEditRow, showDrawer, setShowDrawer, setForceReset, onFinish, tableData, setsaveandnewclick, setsaveclick, handleEditView, isReadOnly, setIsReadOnly, formBtnDisable, setFormBtnDisable, isLoadingOnSave, onCloseAction }) => {
    const handleFormSubmitBtn = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const viewProps = {
        isVisible: isViewModeVisible,
        editRow,
        styles,
    };
    const buttonProps = {
        formData: editRow,
        onCloseAction,
        buttonData,
        setButtonData,
        handleButtonClick,
    };

    return (
        <Form autoComplete="off" id="myForm" form={form} onFieldsChange={handleFormSubmitBtn} onFinish={onFinish} layout="vertical">
            <Row gutter={20} className={styles.drawerBody}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    {!isViewModeVisible ? (
                        <>
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                                    <Form.Item initialValue={editRow?.hierarchyAttribueCode} name="hierarchyAttribueCode" label={translateContent('hierarchyAttribute.label.code')} rules={[validateRequiredInputField(translateContent('hierarchyAttribute.validation.codeValidation')), validationFieldLetterAndNumber(translateContent('hierarchyAttribute.validation.codeValidation'))]}>
                                        <Input disabled={formActionType?.editMode} maxLength={6} placeholder={preparePlaceholderText(translateContent('hierarchyAttribute.placeholder.code'))} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                                    <Form.Item initialValue={editRow?.hierarchyAttribueName} name="hierarchyAttribueName" label={translateContent('hierarchyAttribute.label.name')} rules={[validateRequiredInputField(translateContent('hierarchyAttribute.validation.nameValidation')), validateAlphanumericWithSpace(translateContent('hierarchyAttribute.validation.nameValidation'))]}>
                                        {formActionType === 'view' ? <p className={styles.viewModeText}>{editRow?.hierarchyAttribueName}</p> : <Input maxLength={50} placeholder={preparePlaceholderText(translateContent('hierarchyAttribute.placeholder.name'))} />}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                                    <Form.Item initialValue={formActionType?.addMode ? false : editRow?.duplicateAllowedAtAttributerLevelInd} label={translateContent('hierarchyAttribute.label.duplicateAllowed')} name="duplicateAllowedAtAttributerLevelInd">
                                        <Switch defaultChecked={formActionType?.addMode ? false : editRow?.duplicateAllowedAtAttributerLevelInd} checkedChildren={translateContent('global.label.active')} unCheckedChildren={translateContent('global.label.inActive')}/>
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                                    <Form.Item initialValue={formActionType?.addMode ? false : editRow?.duplicateAllowedAtOtherParent} label={translateContent('hierarchyAttribute.label.duplicateAllowedDiffParent')} name="duplicateAllowedAtOtherParent">
                                        <Switch defaultChecked={formActionType?.addMode ? false : editRow?.duplicateAllowedAtOtherParent} checkedChildren={translateContent('global.label.active')} unCheckedChildren={translateContent('global.label.inActive')} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                                    <Form.Item initialValue={formActionType?.addMode ? false : editRow?.isChildAllowed} label={translateContent('hierarchyAttribute.label.childAllowed')} name="isChildAllowed">
                                        <Switch defaultChecked={formActionType?.addMode ? false : editRow?.isChildAllowed} checkedChildren={translateContent('global.label.active')} unCheckedChildren={translateContent('global.label.inActive')} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                                    <Form.Item initialValue={formActionType?.addMode ? false : editRow?.status} label={translateContent('global.label.status')} name="status">
                                        <Switch defaultChecked={formActionType?.addMode ? false : editRow?.status} checkedChildren={translateContent('global.label.active')} unCheckedChildren={translateContent('global.label.inActive')} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Form.Item initialValue={editRow?.id} hidden label={translateContent('global.label.status')} name="id">
                                <Input />
                            </Form.Item>
                        </>
                    ) : (
                        <ViewHierarchyAttribute {...viewProps} />
                    )}
                </Col>
            </Row>
            <DrawerFormButton {...buttonProps} />
        </Form>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, {});
