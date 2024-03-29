/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Input, Form, Col, Row, Switch } from 'antd';
import { validateAlphanumericWithSpace, validateRequiredInputField, validationFieldLetterAndNumber } from 'utils/validation';
import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { generateRandomNumber } from 'utils/generateRandomNumber';
import { DrawerFormButton } from 'components/common/Button';
import { withDrawer } from 'components/withDrawer';
import { ViewCriticalityGroup } from './ViewCriticalityGroup';
import AllowedTimingList from './AllowedTimings/AllowedTimingList';
import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';


const AddEditFormMain = (props) => {
    const { formActionType, setIsFormVisible, forceUpdate, showGlobalNotification, onFinish, form, formData, setFormData, defaultBtnVisiblity, timeData, setTimeData } = props;
    const { isLoadingOnSave, deletedTime, setDeletedTime, buttonData, setButtonData, handleButtonClick } = props;
    const [TimesegmentLengthTracker, setTimesegmentLengthTracker] = useState(generateRandomNumber());
    const [isAddTimeVisible, setIsAddTimeVisible] = useState(false);
    const [allowedTimingSave, setAllowedTimingSave] = useState(true);

    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
        setAllowedTimingSave(false);
    };

    const handleFormFieldChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
        setAllowedTimingSave(false);
    };

    const onCloseAction = () => {
        form?.resetFields();
        form?.setFieldsValue({
            allowedTimings: [],
        });
        setIsAddTimeVisible(false);
        setTimeData([]);
        setIsFormVisible(false);
        setButtonData({ ...defaultBtnVisiblity });
    };

    const cardProps = {
        form,
        styles,
        showGlobalNotification,
        setTimesegmentLengthTracker,
        forceUpdate,
        TimesegmentLengthTracker,
    };

    const listProps = {
        deletedTime,
        setDeletedTime,
        allowedTimingSave,
        setAllowedTimingSave,
        buttonData,
        setButtonData,
        formData,
        timeData,
        setFormData,
        setTimeData,
        form,
        styles,
        showGlobalNotification,
        setTimesegmentLengthTracker,
        forceUpdate,
        TimesegmentLengthTracker,
        handleFormValueChange,
        handleFormFieldChange,
        formActionType,
        isAddTimeVisible,
        setIsAddTimeVisible,
    };

    const viewProps = {
        isVisible: formActionType?.viewMode,
        formData,
        styles,
        timeData,
    };

    const buttonProps = {
        formData,
        onCloseAction,
        buttonData,
        setButtonData,
        handleButtonClick,
        multipleForm: true,
    };

    return (
        <>
            <div className={styles.drawerBodyNew}>
                <Form form={form} id="myForm" autoComplete="off" layout="vertical" colon={false} onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish}>
                    {!formActionType?.viewMode ? (
                        <>
                            <Row gutter={20}>
                                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                    <Form.Item name="criticalityGroupCode" label={translateContent('criticalityGroup.label.criticalityGroupId')} initialValue={formData?.criticalityGroupCode} rules={[validateRequiredInputField(translateContent('criticalityGroup.validation.id')), validationFieldLetterAndNumber(translateContent('criticalityGroup.validation.id'))]}>
                                        <Input maxLength={6} placeholder={preparePlaceholderText(translateContent('criticalityGroup.validation.id'))} disabled={formActionType?.editMode ? true : false} />
                                    </Form.Item>
                                </Col>
                                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                    <Form.Item name="criticalityGroupName" label={translateContent('criticalityGroup.label.criticalityGroupName')} initialValue={formData?.criticalityGroupName} rules={[validateRequiredInputField(translateContent('criticalityGroup.validation.name')), validateAlphanumericWithSpace(translateContent('criticalityGroup.validation.name'))]}>
                                        <Input placeholder={preparePlaceholderText(translateContent('criticalityGroup.validation.name'))} maxLength={50} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={20}>
                                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                    <Form.Item data-testid="default-toggle" initialValue={formActionType?.editMode ? formData?.criticalityDefaultGroup : false} valuePropName="checked" label={translateContent('criticalityGroup.label.defaultGroup')} name="criticalityDefaultGroup" rules={[validateRequiredInputField(translateContent('criticalityGroup.label.defaultGroup'))]}>
                                        <Switch checkedChildren="Active" unCheckedChildren="Inactive" onChange={(checked) => (checked ? 1 : 0)} />
                                    </Form.Item>
                                </Col>

                                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                    <Form.Item data-testid="toggle" initialValue={formActionType?.editMode ? formData?.activeIndicator : false} valuePropName="checked" label={translateContent('criticalityGroup.label.status')} name="activeIndicator" rules={[validateRequiredInputField(translateContent('criticalityGroup.label.status'))]}>
                                        <Switch checkedChildren="Active" unCheckedChildren="Inactive" onChange={(checked) => (checked ? 1 : 0)} />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </>
                    ) : (
                        <ViewCriticalityGroup {...viewProps} {...cardProps} />
                    )}
                    <DrawerFormButton {...buttonProps} isLoadingOnSave={isLoadingOnSave} />
                </Form>

                <AllowedTimingList {...listProps} />
            </div>
        </>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, {});
