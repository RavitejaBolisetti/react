import React, { useState } from 'react';

import { Input, Form, Col, Row, Switch, Button, Tooltip } from 'antd';

import { validateAlphanumericWithSpace, validateRequiredInputField, validationFieldLetterAndNumber } from 'utils/validation';
import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { generateRandomNumber } from 'utils/generateRandomNumber';
import { AiOutlineInfoCircle } from 'react-icons/ai';

import style from 'components/common/Common.module.css';

import { ViewCriticalityGroup } from './ViewCriticalityGroup';
import { withDrawer } from 'components/withDrawer';
import AllowedTimingList from './AllowedTimings/AllowedTimingList';

const AddEditFormMain = ({
    setIsViewModeVisible,
    setIsFormVisible,
    isViewModeVisible,
    codeIsReadOnly,
    forceUpdate,
    deletedItemList,
    setDeletedItemList,
    showGlobalNotification,
    isLoading,
    setsaveclick,
    alertNotification,
    formBtnDisable,
    setFormBtnDisable,
    successAlert,
    handleUpdate2,
    onFinish,
    onFinishFailed,
    saveBtn,
    footerEdit,
    saveAndSaveNew,
    setSaveAndSaveNew,
    form,
    selectedRecord,
    setSelectedRecord,
    handleAdd,
    open,
    setDrawer,
    isChecked,
    setIsChecked,
    formActionType,
    isReadOnly,
    formData,
    setFormData,
    setFieldValue,
    contextAlertNotification,
    criticalityGroupData,
    timeData,
    setTimeData,
}) => {
    const disabledProps = { disabled: isReadOnly };
    const [TimesegmentLengthTracker, setTimesegmentLengthTracker] = useState(generateRandomNumber());
    const codeDisabledProp = { disabled: codeIsReadOnly };

    const onClose = () => {
        form.resetFields();

        form.setFieldsValue({
            allowedTimings: [],
        });
        setIsViewModeVisible(false);
        setTimeData([]);
        setSelectedRecord(null);
        setFormBtnDisable(false);
        setIsFormVisible(false);
    };

    const cardProps = {
        form,
        style,
        disabledProps,
        showGlobalNotification,
        setTimesegmentLengthTracker,
        forceUpdate,
        TimesegmentLengthTracker,
    };

    const listProps = {
        formActionType,
        setFormBtnDisable,
        isViewModeVisible,
        formData,
        criticalityGroupData,
        timeData,
        setFormData,
        setTimeData,
        form,
        style,
        disabledProps,
        showGlobalNotification,
        setTimesegmentLengthTracker,
        forceUpdate,
        TimesegmentLengthTracker,
    };

    const viewProps = {
        isVisible: isViewModeVisible,
        selectedRecord,
        style,
        disabledProps,
        timeData,
    };

    const handleForm = () => {
        setFormBtnDisable(true);
    };

    return (
        <>
            <Form form={form} id="myForm" autoComplete="off" layout="vertical" colon={false} onFieldsChange={handleForm} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                {!isViewModeVisible ? (
                    <>
                        <Row gutter={20}>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                <Form.Item
                                    name="criticalityGroupCode"
                                    label="Criticality Group Id"
                                    // tooltip={{
                                    //     title: 'Tooltip with customize icon',
                                    //     icon: <AiOutlineInfoCircle size={13} />,
                                    // }}
                                    rules={[validateRequiredInputField('id'), validationFieldLetterAndNumber('id')]}
                                >
                                    <Input maxLength={6} placeholder={preparePlaceholderText('id')} {...codeDisabledProp} />
                                </Form.Item>
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                <Form.Item name="criticalityGroupName" label="Criticality Group Name" rules={[validateRequiredInputField('name'), validateAlphanumericWithSpace('name')]}>
                                    <Input placeholder={preparePlaceholderText('name')} maxLength={50} {...disabledProps} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                <Form.Item labelAlign="left" wrapperCol={{ span: 24 }} valuePropName="checked" name="criticalityDefaultGroup" label="Default Group">
                                    <Switch checkedChildren="Active" unCheckedChildren="Inactive" onChange={(checked) => (checked ? 1 : 0)} {...disabledProps} />
                                </Form.Item>
                            </Col>

                            <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                <Form.Item initialValue={true} labelAlign="left" wrapperCol={{ span: 24 }} name="activeIndicator" label="Status" valuePropName="checked">
                                    <Switch checkedChildren="Active" unCheckedChildren="Inactive" valuePropName="checked" onChange={(checked) => (checked ? 1 : 0)} {...disabledProps} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </>
                ) : (
                    <ViewCriticalityGroup {...viewProps} {...cardProps} />
                )}
                <Row gutter={20} className={style.formFooter}>
                    <Col xs={24} sm={6} md={6} lg={6} xl={6} className={style.footerBtnLeft}>
                        <Button danger onClick={onClose}>
                            {!footerEdit ? 'Cancel' : 'Close'}
                        </Button>
                    </Col>
                    <Col xs={24} sm={18} md={18} lg={18} xl={18} className={style.footerBtnRight}>
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
            </Form>
            <AllowedTimingList {...listProps} />
        </>
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, {});
