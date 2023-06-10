import React from 'react';
import { Switch, Row, Col, Input, Form, Space } from 'antd';

import { validateAlphanumericWithSpace, validateRequiredInputField, validationFieldLetterAndNumber } from 'utils/validation';
import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { withDrawer } from 'components/withDrawer';
import { ViewHierarchyAttribute } from './ViewHierarchyAttribute';
import { DrawerFormButton } from 'components/common/Button';

import style from 'components/common/Common.module.css';

const AddEditFormMain = ({ isViewModeVisible, form, buttonData, setButtonData, handleButtonClick, formActionType, setFormActionType, codeIsReadOnly, editRow, setEditRow, showDrawer, setShowDrawer, setForceReset, onFinish, onFinishFailed, tableData, setsaveandnewclick, setsaveclick, handleEditView, isReadOnly, setIsReadOnly, formBtnDisable, setFormBtnDisable, isLoadingOnSave, onCloseAction }) => {
    const handleFormSubmitBtn = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const viewProps = {
        isVisible: isViewModeVisible,
        editRow,
        style,
    };
    const buttonProps = {
        formData: editRow,
        onCloseAction,
        buttonData,
        setButtonData,
        handleButtonClick,
    };

    return (
        <Space
            direction="vertical"
            size="small"
            style={{
                display: 'flex',
            }}
        >
            <Form autoComplete="off" id="myForm" form={form} onFieldsChange={handleFormSubmitBtn} onFinish={onFinish} onFinishFailed={onFinishFailed} layout="vertical">
                {!isViewModeVisible ? (
                    <>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                                <Form.Item initialValue={editRow?.hierarchyAttribueCode} name="hierarchyAttribueCode" label="Code" rules={[validateRequiredInputField('code'), validationFieldLetterAndNumber('code')]}>
                                    <Input disabled={formActionType?.editMode} maxLength={6} placeholder={preparePlaceholderText('code')} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                                <Form.Item initialValue={editRow?.hierarchyAttribueName} name="hierarchyAttribueName" label="Name" rules={[validateRequiredInputField('name'), validateAlphanumericWithSpace('name')]}>
                                    {formActionType === 'view' ? <p className={style.viewModeText}>{editRow?.hierarchyAttribueName}</p> : <Input maxLength={50} placeholder={preparePlaceholderText('name')} />}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                                <Form.Item initialValue={formActionType?.addMode ? false : editRow?.duplicateAllowedAtAttributerLevelInd} label="Duplicate Allowed?" name="duplicateAllowedAtAttributerLevelInd">
                                    <Switch defaultChecked={formActionType?.addMode ? false : editRow?.duplicateAllowedAtAttributerLevelInd} checkedChildren="Active" unCheckedChildren="Inactive" />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                                <Form.Item initialValue={formActionType?.addMode ? false : editRow?.duplicateAllowedAtOtherParent} label="Duplicate Allowed under different Parent?" name="duplicateAllowedAtOtherParent">
                                    <Switch defaultChecked={formActionType?.addMode ? false : editRow?.duplicateAllowedAtOtherParent} checkedChildren="Active" unCheckedChildren="Inactive" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                                <Form.Item initialValue={formActionType?.addMode ? false : editRow?.isChildAllowed} label="Child Allowed?" name="isChildAllowed">
                                    <Switch defaultChecked={formActionType?.addMode ? false : editRow?.isChildAllowed} checkedChildren="Active" unCheckedChildren="Inactive" />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                                <Form.Item initialValue={formActionType?.addMode ? false : editRow?.status} label="Status" name="status">
                                    <Switch defaultChecked={formActionType?.addMode ? false : editRow?.status} checkedChildren="Active" unCheckedChildren="Inactive" />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item initialValue={editRow?.id} hidden label="Status" name="id">
                            <Input />
                        </Form.Item>
                    </>
                ) : (
                    <ViewHierarchyAttribute {...viewProps} />
                )}
                <DrawerFormButton {...buttonProps} />
            </Form>
        </Space>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, {});
