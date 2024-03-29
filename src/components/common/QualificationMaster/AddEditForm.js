/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Input, Form, Col, Row, Switch } from 'antd';

import { validateRequiredInputField } from 'utils/validation';
import { preparePlaceholderText } from 'utils/preparePlaceholder';

import { ViewQualificationList } from './ViewQualificationList';
import { withDrawer } from 'components/withDrawer';
import { DrawerFormButton } from 'components/common/Button';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

const AddEditFormMain = (props) => {
    const { form, formData, onCloseAction, formActionType, onFinish } = props;

    const { buttonData, setButtonData, handleButtonClick } = props;

    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const handleFormFieldChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const buttonProps = {
        formData,
        onCloseAction,
        buttonData,
        setButtonData,
        handleButtonClick,
    };

    const viewProps = {
        isVisible: formActionType.viewMode,
        formData,
        styles,
    };

    return (
        <Form autocomplete="off" layout="vertical" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish}>
            <Row gutter={20} className={styles.drawerBody}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    {!formActionType.viewMode ? (
                        <>
                            <Row gutter={20}>
                                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                    <Form.Item initialValue={formData?.qualificationCode} label={translateContent('qualificationMaster.label.qualificationCode')} name="qualificationCode" rules={[validateRequiredInputField(translateContent('qualificationMaster.validation.qualificationCode'))]}>
                                        <Input maxLength={6} placeholder={preparePlaceholderText(translateContent('qualificationMaster.validation.qualificationCode'))} disabled={formActionType?.editMode ? true : false} />
                                    </Form.Item>
                                </Col>
                                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                    <Form.Item initialValue={formData?.qualificationName} label={translateContent('qualificationMaster.label.qualificationName')} name="qualificationName" rules={[validateRequiredInputField(translateContent('qualificationMaster.validation.qualificationName'))]}>
                                        <Input maxLength={50} placeholder={preparePlaceholderText(translateContent('qualificationMaster.validation.qualificationName'))} />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={20}>
                                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                    <Form.Item initialValue={formActionType?.editMode ? formData?.status : true} labelAlign="left" wrapperCol={{ span: 24 }} name="status" label={translateContent('qualificationMaster.label.status')} valuePropName="checked">
                                        <Switch checkedChildren={translateContent('qualificationMaster.label.active')} unCheckedChildren={translateContent('qualificationMaster.label.inActive')} valuePropName="checked" onChange={(checked) => (checked ? 1 : 0)} />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </>
                    ) : (
                        <ViewQualificationList {...viewProps} />
                    )}
                </Col>
            </Row>
            <DrawerFormButton {...buttonProps} />
        </Form>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, {});
