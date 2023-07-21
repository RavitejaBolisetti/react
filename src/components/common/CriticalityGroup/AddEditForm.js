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
import style from 'components/common/Common.module.css';

const AddEditFormMain = (props) => {
    const { formActionType, setIsFormVisible, forceUpdate, showGlobalNotification, onFinish, onFinishFailed, form, formData, setFormData, defaultBtnVisiblity, timeData, setTimeData } = props;
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
        style,
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
        style,
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
        style,
        timeData,
    };

    
    const buttonProps = {
        formData,
        onCloseAction,
        buttonData,
        setButtonData,
        handleButtonClick,
    };

    return (
        <>
            <Form form={form} id="myForm" autoComplete="off" layout="vertical" colon={false} onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                {!formActionType?.viewMode ? (
                    <>
                        <Row gutter={20}>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                <Form.Item name="criticalityGroupCode" label="Criticality Group Id" initialValue={formData?.criticalityGroupCode} rules={[validateRequiredInputField('id'), validationFieldLetterAndNumber('id')]} data-testid="groupId">
                                    <Input maxLength={6} placeholder={preparePlaceholderText('id')} disabled={formActionType?.editMode ? true : false} />
                                </Form.Item>
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                <Form.Item name="criticalityGroupName" label="Criticality Group Name" initialValue={formData?.criticalityGroupName} rules={[validateRequiredInputField('name'), validateAlphanumericWithSpace('name')]} data-testid="name">
                                    <Input placeholder={preparePlaceholderText('name')} maxLength={50} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                <Form.Item initialValue={formActionType?.editMode ? formData?.criticalityDefaultGroup : false} valuePropName="checked" label="Default Group" name="criticalityDefaultGroup" rules={[validateRequiredInputField('Default Group')]} data-testid="default-toggle">
                                    <Switch checkedChildren="Active" unCheckedChildren="Inactive" onChange={(checked) => (checked ? 1 : 0)} />
                                </Form.Item>
                            </Col>

                            <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                <Form.Item initialValue={formActionType?.editMode ? formData?.activeIndicator : false} valuePropName="checked" label="Status" name="activeIndicator" rules={[validateRequiredInputField('Status')]} data-testid="toggle">
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
        </>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, {});
