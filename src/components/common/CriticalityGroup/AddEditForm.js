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
    const { formActionType, setIsFormVisible, forceUpdate, showGlobalNotification, onFinish, onFinishFailed, form, formData, setFormData, defaultBtnVisiblity, criticalityGroupData, timeData, setTimeData } = props;

    const [TimesegmentLengthTracker, setTimesegmentLengthTracker] = useState(generateRandomNumber());
    const [isAddTimeVisible, setIsAddTimeVisible] = useState(false);

    const { buttonData, setButtonData, handleButtonClick } = props;

    const handleFormValueChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const handleFormFieldChange = () => {
        setButtonData({ ...buttonData, formBtnActive: true });
    };

    const onCloseAction = () => {
        form.resetFields();
        form.setFieldsValue({
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
                                <Form.Item name="criticalityGroupCode" label="Criticality Group Id" initialValue={formData?.criticalityGroupCode} rules={[validateRequiredInputField('id'), validationFieldLetterAndNumber('id')]}>
                                {addToolTip(passwordStrengthText, 'bottom', '#20232C', styles.infoTooltipDesign)(<AiOutlineInfoCircle className={styles.infoIconColor} size={18} />)}
                                    <Input maxLength={6} placeholder={preparePlaceholderText('id')} disabled={formActionType?.editMode ? true : false} />
                                </Form.Item>
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                <Form.Item name="criticalityGroupName" label="Criticality Group Name" initialValue={formData?.criticalityGroupName} rules={[validateRequiredInputField('name'), validateAlphanumericWithSpace('name')]}>
                                    <Input placeholder={preparePlaceholderText('name')} maxLength={50} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                <Form.Item initialValue={formActionType?.editMode ? formData?.criticalityDefaultGroup : false} valuePropName="checked" label="Default Group" name="criticalityDefaultGroup">
                                    <Switch checkedChildren="Active" unCheckedChildren="Inactive" onChange={(checked) => (checked ? 1 : 0)} />
                                </Form.Item>
                            </Col>

                            <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                <Form.Item initialValue={formActionType?.editMode ? formData?.activeIndicator : true} valuePropName="checked" label="Status" name="activeIndicator">
                                    <Switch checkedChildren="Active" unCheckedChildren="Inactive" onChange={(checked) => (checked ? 1 : 0)} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </>
                ) : (
                    <ViewCriticalityGroup {...viewProps} {...cardProps} />
                )}
                <DrawerFormButton {...buttonProps} />
            </Form>

            <AllowedTimingList {...listProps} />
        </>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, {});
