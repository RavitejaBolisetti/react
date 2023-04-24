import React from 'react';
import { Drawer, Input, Form, Col, Row, Switch, Button } from 'antd';

import { validateAlphanumericWithSpaceHyphenPeriod, validateRequiredInputField, validationFieldLetterAndNumber } from 'utils/validation';
import { preparePlaceholderText } from 'utils/preparePlaceholder';

import style from 'components/common/DrawerAndTable.module.css';
import styles from 'components/common/Common.module.css';
import { ViewQualificationList } from './ViewQualificationList';

const DrawerUtil = ({ setIsViewModeVisible,isViewModeVisible,codeIsReadOnly, handleUpdate2, footerEdit, setsaveclick, isLoading, formBtnDisable, saveAndSaveNew, saveBtn, setFormBtnDisable, onFinish, onFinishFailed, form, handleAdd, setForceFormReset, open, setDrawer, isChecked, setIsChecked, formActionType, isReadOnly, formData, setFormData, isDataAttributeLoaded, attributeData, setFieldValue, handleSelectTreeClick, geoData, isLoadingOnSave }) => {
    const disabledProps = { disabled: isReadOnly };
    const codeDisabledProp = { disabled: codeIsReadOnly };

    let drawerTitle = '';
    if (formActionType === 'add') {
        drawerTitle = 'Add Qualification Details';
    } else if (formActionType === 'update') {
        drawerTitle = 'Edit Qualification Details';
    } else if (formActionType === 'view') {
        drawerTitle = 'View Qualification Details';
    }

    const handleForm = () => {
        setFormBtnDisable(true);
    };

    const onClose = () => {
        setDrawer(false);
        setIsViewModeVisible(false)
        setFormBtnDisable(false);
        form.resetFields();
    };
    const viewProps = {
        isVisible: isViewModeVisible,
        formData,
        styles,
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
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Button danger onClick={onClose} className={style.cancelBtn}>
                                {!footerEdit ? 'Cancel' : 'Close'}
                            </Button>
                        </Col>
                        <Col xs={16} sm={16} md={16} lg={16} xl={16} xxl={16} className={style.saveBtn}>
                            {saveAndSaveNew ? (
                                <Button loading={isLoadingOnSave} disabled={!formBtnDisable} onClick={handleAdd} form="myForm" key="submitAndNew" htmlType="submit" type="primary">
                                    Save & Add New
                                </Button>
                            ) : (
                                ''
                            )}
                            {saveBtn ? (
                                <Button loading={isLoadingOnSave} disabled={!formBtnDisable} onClick={() => setsaveclick(true)} form="myForm" key="submit" htmlType="submit" type="primary">
                                    Save
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
                </>
            }
        >
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
            </Form>
        </Drawer>
    );
};

export default DrawerUtil;
