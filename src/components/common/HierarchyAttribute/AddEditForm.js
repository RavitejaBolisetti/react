import React, { useEffect } from 'react';
import { Button, Drawer, Switch, Row, Col, Input, Form, Space } from 'antd';

import { validateAlphanumericWithSpace, validateRequiredInputField, validationFieldLetterAndNumber } from 'utils/validation';
import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { withDrawer } from 'components/withDrawer';
import { ViewHierarchyAttribute } from './ViewHierarchyAttribute';

import style from 'components/common/Common.module.css';

const AddEditFormMain = ({ isViewModeVisible, codeIsReadOnly, editRow, setEditRow, showDrawer, setShowDrawer, setForceReset, onFinish, onFinishFailed, tableData, setsaveandnewclick, setsaveclick, formActionType, handleEditView, isReadOnly, setIsReadOnly, formBtnDisable, setFormBtnDisable, isLoadingOnSave }) => {
    const [form] = Form.useForm();
    const disabledProps = { disabled: isReadOnly };
    const codeDisabledProp = { disabled: codeIsReadOnly };

    useEffect(() => {
        form.resetFields();
        form.setFieldValue(editRow);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editRow]);

    const onClose = () => {
        setShowDrawer(false);

        form.resetFields();
        setIsReadOnly(false);
        setFormBtnDisable(false);
    };
    const handlesaveandnew = () => {
        setTimeout(() => {
            form.resetFields();
            setEditRow({
                duplicateAllowedAtAttributerLevelInd: true,
                duplicateAllowedAtOtherParent: true,
                isChildAllowed: true,
                status: true,
            });
        }, 1000);
        setsaveclick(false);
        setsaveandnewclick(true);
    };
    const handesave = () => {
        setsaveclick(true);
        setsaveandnewclick(false);
    };

    const handleFormSubmitBtn = () => {
        setFormBtnDisable(true);
    };

    const viewProps = {
        isVisible: isViewModeVisible,
        editRow,
        style,
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
                                    <Input maxLength={6} placeholder={preparePlaceholderText('code')} {...codeDisabledProp} />
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
                                <Form.Item initialValue={editRow?.duplicateAllowedAtAttributerLevelInd} label="Duplicate Allowed?" name="duplicateAllowedAtAttributerLevelInd">
                                    <Switch defaultChecked={editRow?.duplicateAllowedAtAttributerLevelInd} checkedChildren="Active" unCheckedChildren="Inactive" {...disabledProps} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                                <Form.Item initialValue={editRow?.duplicateAllowedAtOtherParent} label="Duplicate Allowed under different Parent?" name="duplicateAllowedAtOtherParent">
                                    <Switch defaultChecked={editRow?.duplicateAllowedAtOtherParent} checkedChildren="Active" unCheckedChildren="Inactive" {...disabledProps} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                                <Form.Item initialValue={editRow?.isChildAllowed} label="Child Allowed?" name="isChildAllowed">
                                    <Switch defaultChecked={editRow?.isChildAllowed} checkedChildren="Active" unCheckedChildren="Inactive" {...disabledProps} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                                <Form.Item initialValue={editRow?.status} label="Status" name="status">
                                    <Switch defaultChecked={editRow?.status} checkedChildren="Active" unCheckedChildren="Inactive" {...disabledProps} />
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
                <Row gutter={20} className={style.formFooter}>
                    <Col xs={24} sm={6} md={6} lg={6} xl={6} className={style.footerBtnLeft}>
                        <Button danger onClick={onClose}>
                            {formActionType === 'view' ? 'Close' : 'Cancel'}
                        </Button>
                    </Col>
                    <Col xs={24} sm={18} md={18} lg={18} xl={18} className={style.footerBtnRight}>
                        {formActionType === 'view' ? (
                            <Button onClick={handleEditView} type="primary">
                                Edit
                            </Button>
                        ) : (
                            <>
                                <Button loading={isLoadingOnSave} disabled={!formBtnDisable} onClick={handesave} form="myForm" key="submit" htmlType="submit" type="primary">
                                    Save
                                </Button>
                                {formActionType === 'add' ? (
                                    <Button loading={isLoadingOnSave} disabled={!formBtnDisable} onClick={handlesaveandnew} form="myForm" key="submit2" htmlType="submit" type="primary">
                                        Save & Add New
                                    </Button>
                                ) : (
                                    ''
                                )}
                            </>
                        )}
                    </Col>
                </Row>
            </Form>
        </Space>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, {});
