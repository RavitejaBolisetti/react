import React from 'react';
import { Drawer, Input, Form, Col, Row, Switch, Button } from 'antd';

import { validateRequiredInputField, validationFieldLetterAndNumber } from 'utils/validation';
import { preparePlaceholderText } from 'utils/preparePlaceholder';

import style from 'components/common/DrawerAndTable.module.css';

const DrawerUtil = ({ handleUpdate2, footerEdit, setsaveclick, isLoading, formBtnDisable, saveAndSaveNew, saveBtn, setFormBtnDisable, onFinish, onFinishFailed, form, handleAdd, setForceFormReset, open, setDrawer, isChecked, setIsChecked, formActionType, isReadOnly, formData, setFormData, isDataAttributeLoaded, attributeData, setFieldValue, handleSelectTreeClick, geoData }) => {
    const disabledProps = { disabled: isReadOnly };

    let drawerTitle = '';
    if (formActionType === 'add') {
        drawerTitle = 'Add Qualification Details';
    } else if (formActionType === 'update') {
        drawerTitle = 'Edit Application Criticality Group Details';
    } else if (formActionType === 'view') {
        drawerTitle = 'View Application Criticality Group Details';
    }

    const handleForm = () => {
        setFormBtnDisable(true);
    };

    const onClose = () => {
        setDrawer(false);
        setFormBtnDisable(false);
    };

    return (
        <Drawer
            title={drawerTitle}
            placement="right"
            onClose={onClose}
            open={open}
            className={style.drawerCriticalityGrp}
            width="540px"
            footer={
                <>
                    <Row gutter={20}>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                            <Button danger onClick={onClose} className={style.cancelBtn}>
                                Cancel
                            </Button>
                        </Col>
                        <Col xs={16} sm={16} md={16} lg={16} xl={16} xxl={16} className={style.saveBtn}>
                            {saveBtn ? (
                                <Button loading={isLoading} disabled={!formBtnDisable} onClick={() => setsaveclick(true)} form="myForm" key="submit" htmlType="submit" type="primary">
                                    Save
                                </Button>
                            ) : (
                                ''
                            )}
                            {saveAndSaveNew ? (
                                <Button loading={isLoading} disabled={!formBtnDisable} onClick={handleAdd} form="myForm" key="submitAndNew" htmlType="submit" type="primary">
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
                </>
            }
        >
            <Form form={form} onFieldsChange={handleForm} id="myForm" layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Row gutter={20}>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item label="Qualification Code" name="qualificationCode" rules={[validateRequiredInputField('Qualification Code'), validationFieldLetterAndNumber('Qualification Code')]}>
                       { 
                        footerEdit 
                        ? 
                            <p>{form.getFieldValue('qualificationCode')}</p> 
                        :
                            <Input maxLength={5} placeholder={preparePlaceholderText('Code')} {...disabledProps} />
                        }
                        </Form.Item>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item label="Qualification Name" name="qualificationName" rules={[validateRequiredInputField('Qualification Name')]}>
                        {
                            footerEdit 
                            ? 
                                <p>{form.getFieldValue('qualificationName')}</p> 
                            :
                            <Input maxLength={50} placeholder={preparePlaceholderText('Name')} {...disabledProps} />
                        }
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={20}>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item labelAlign="left" wrapperCol={{ span: 24 }} name="status" label="Status" valuePropName="checked">
                            <Switch checkedChildren="Active" unCheckedChildren="Inactive" valuePropName="checked" onChange={(checked) => (checked ? 1 : 0)} {...disabledProps} />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Drawer>
    );
};

export default DrawerUtil;
