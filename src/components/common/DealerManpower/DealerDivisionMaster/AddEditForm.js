/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Col, Input, Form, Row, Switch } from 'antd';

import { validateRequiredInputField } from 'utils/validation';
import { preparePlaceholderText } from 'utils/preparePlaceholder';

import { ViewDetail } from './ViewDetail';
import { withDrawer } from 'components/withDrawer';
import { DrawerFormButton } from 'components/common/Button';

import styles from 'assets/sass/app.module.scss';

import { translateContent } from 'utils/translateContent';

const AddEditFormMain = (props) => {
    const { form, formData, onCloseAction, formActionType: { editMode, viewMode } = undefined, onFinish } = props;

    const { buttonData, setButtonData, handleButtonClick } = props;

    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const handleFormFieldChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const viewProps = {
        isVisible: viewMode,
        formData,
        styles,
    };

    const buttonProps = {
        formData,
        onCloseAction,
        buttonData,
        setButtonData,
        handleButtonClick,
    };

    return (
        <Form layout="vertical" autoComplete="off" form={form} onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish}>
            <Row gutter={20} className={styles.drawerBody}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    {viewMode ? (
                        <ViewDetail {...viewProps} />
                    ) : (
                        <>
                            <Row gutter={16}>
                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item initialValue={formData?.code} label={translateContent('divisionMaster.label.divisionCode')} name="code" rules={[validateRequiredInputField(translateContent('divisionMaster.validation.divisionCode'))]}>
                                        <Input placeholder={preparePlaceholderText(translateContent('divisionMaster.placeholder.divisionCode'))} maxLength={6} disabled={editMode ? true : false} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item label={translateContent('divisionMaster.label.divisionName')} initialValue={formData?.divisionName} rules={[validateRequiredInputField(translateContent('divisionMaster.validation.divisionName'))]} name="divisionName">
                                        <Input placeholder={preparePlaceholderText(translateContent('divisionMaster.placeholder.divisionName'))} maxLength={50} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                                    <Form.Item initialValue={editMode ? formData.status : true} labelAlign="left" wrapperCol={{ span: 24 }} valuePropName="checked" name="status" label={translateContent('global.label.status')}>
                                        <Switch checkedChildren={translateContent('global.label.active')} unCheckedChildren={translateContent('global.label.inActive')} onChange={(checked) => (checked ? 1 : 0)} />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </>
                    )}
                </Col>
            </Row>

            <DrawerFormButton {...buttonProps} />
        </Form>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, {});
