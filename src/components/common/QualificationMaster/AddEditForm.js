import React from 'react';
import { Drawer, Input, Form, Col, Row, Switch, Button } from 'antd';

import { validateAlphanumericWithSpaceHyphenPeriod, validateRequiredInputField, validationFieldLetterAndNumber } from 'utils/validation';
import { preparePlaceholderText } from 'utils/preparePlaceholder';

import style from 'components/common/Common.module.css';
import { ViewQualificationList } from './ViewQualificationList';
import { withDrawer } from 'components/withDrawer';

const AddEditFormMain = ({ setIsFormVisible, selectedRecord, isFormVisible, isViewModeVisible, codeIsReadOnly, handleUpdate2, footerEdit, setsaveclick, isLoading, formBtnDisable, saveAndSaveNew, saveBtn, setFormBtnDisable, onFinish, onFinishFailed, form, handleAdd, setForceFormReset, open, setDrawer, isChecked, setIsChecked, formActionType, isReadOnly, formData, setFormData, isDataAttributeLoaded, attributeData, setFieldValue, handleSelectTreeClick, geoData, isLoadingOnSave }) => {
    const disabledProps = { disabled: isReadOnly };
    const codeDisabledProp = { disabled: codeIsReadOnly };

    const handleForm = () => {
        setFormBtnDisable(true);
    };

    const onClose = () => {
        setIsFormVisible(false);
        setFormBtnDisable(false);
        form.resetFields();
    };

    const viewProps = {
        isVisible: isViewModeVisible,
        selectedRecord,
        style,
    };

    return (
        <Form form={form} onFieldsChange={handleForm} id="myForm" layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
            {!isViewModeVisible ? (
                <>
                    <Row gutter={20}>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item label="Qualification Code" name="qualificationCode" rules={[validateRequiredInputField('code'), validationFieldLetterAndNumber('code')]}>
                                <Input maxLength={6} placeholder={preparePlaceholderText('code')} {...codeDisabledProp} />
                            </Form.Item>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item label="Qualification Name" name="qualificationName" rules={[validateRequiredInputField('name'), validateAlphanumericWithSpaceHyphenPeriod('name')]}>
                                {!footerEdit ? <Input maxLength={50} placeholder={preparePlaceholderText('name')} /> : <p className={style.viewModeText}>{form.getFieldValue('qualificationName')}</p>}
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={20}>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item initialValue={true} labelAlign="left" wrapperCol={{ span: 24 }} name="status" label="Status" valuePropName="checked">
                                <Switch checkedChildren="Active" unCheckedChildren="Inactive" valuePropName="checked" onChange={(checked) => (checked ? 1 : 0)} {...disabledProps} />
                            </Form.Item>
                        </Col>
                    </Row>
                </>
            ) : (
                <ViewQualificationList {...viewProps} />
            )}
            <Row gutter={20} className={style.formFooter}>
                <Col xs={24} sm={6} md={6} lg={6} xl={6} className={style.footerBtnLeft}>
                    <Button danger onClick={onClose}>
                        {!footerEdit ? 'Cancel' : 'Close'}
                    </Button>
                </Col>
                <Col xs={24} sm={18} md={18} lg={18} xl={18} className={style.footerBtnRight}>
                    {saveBtn ? (
                        <Button loading={isLoadingOnSave} disabled={!formBtnDisable} onClick={() => setsaveclick(true)} form="myForm" key="submit" htmlType="submit" type="primary">
                            Save
                        </Button>
                    ) : (
                        ''
                    )}
                    {saveAndSaveNew ? (
                        <Button loading={isLoadingOnSave} disabled={!formBtnDisable} onClick={handleAdd} form="myForm" key="submitAndNew" htmlType="submit" type="primary">
                            Save & Add New
                        </Button>
                    ) : (
                        ''
                    )}
                    {footerEdit ? (
                        <Button onClick={handleUpdate2} form="myForm" key="submitAndNew" htmlType="submit" type="primary">
                            Edit
                        </Button>
                    ) : (
                        ''
                    )}
                </Col>
            </Row>
        </Form>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, {});
