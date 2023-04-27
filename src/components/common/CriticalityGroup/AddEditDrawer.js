import React, { useEffect, useState } from 'react';

import { Input, Form, Col, Row, Switch, Button } from 'antd';

import { validateAlphanumericWithSpace, validateRequiredInputField, validationFieldLetterAndNumber } from 'utils/validation';
import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { generateRandomNumber } from 'utils/generateRandomNumber';

import style from 'components/common/Common.module.css';
import styles from '../DrawerAndTable.module.css';

import { ViewCriticalityGroup } from './ViewCriticalityGroup';
import { withDrawer } from 'components/withDrawer';
import AllowedTimingCard from './AllowedTimingCard';

const AddEditDrawerMain = ({ setIsViewModeVisible, setIsFormVisible, isViewModeVisible, codeIsReadOnly, forceUpdate, deletedItemList, setDeletedItemList, showGlobalNotification, isLoading, setsaveclick, alertNotification, formBtnDisable, setFormBtnDisable, successAlert, handleUpdate2, onFinish, onFinishFailed, saveBtn, footerEdit, saveAndSaveNew, setSaveAndSaveNew, form, selectedRecord, setSelectedRecord, handleAdd, open, setDrawer, isChecked, setIsChecked, formActionType, isReadOnly, formData, setFormData, setFieldValue, contextAlertNotification }) => {
    const disabledProps = { disabled: isReadOnly };
    const [TimesegmentLengthTracker, setTimesegmentLengthTracker] = useState(generateRandomNumber());
    const [TimeTrack, setTimeTrack] = useState(true);
    const codeDisabledProp = { disabled: codeIsReadOnly };

    let drawerTitle = '';
    if (formActionType === 'add') {
        drawerTitle = 'Add Application Criticality Group Details';
    } else if (formActionType === 'update') {
        drawerTitle = 'Edit Application Criticality Group Details';
    } else if (formActionType === 'view') {
        drawerTitle = 'View Application Criticality Group Details';
    }

    useEffect(() => {
        let timeSegments = form.getFieldValue('allowedTimings');
        if (timeSegments?.length === 1) {
            setTimeTrack(false);
        } else {
            setTimeTrack(true);
        }
    }, [TimesegmentLengthTracker]);

    const onClose = () => {
        form.resetFields();
        form.setFieldsValue({
            allowedTimings: [],
        });
        setIsViewModeVisible(false);

        setSelectedRecord(null);
        setFormBtnDisable(false);
        setIsFormVisible(false);
    };

    const checkOverlap = () => {
        let timeSegments = form.getFieldValue('allowedTimings');
        let StoreOldTimeSegment = form.getFieldValue('allowedTimings');
        timeSegments = timeSegments?.map((time) => ({ timeSlotFrom: time?.timeSlotFrom?.format('HH:mm'), timeSlotTo: time?.timeSlotTo?.format('HH:mm') }));
        if (timeSegments?.length === 1) {
            return false;
        }

        timeSegments?.sort((timeSegment1, timeSegment2) => timeSegment1['timeSlotFrom']?.localeCompare(timeSegment2['timeSlotFrom']));

        for (let i = 0; i < timeSegments.length - 1; i++) {
            const currentEndTime = timeSegments[i]['timeSlotTo'];
            const nextStartTime = timeSegments[i + 1]['timeSlotFrom'];
            if (currentEndTime > nextStartTime) {
                console.log('yes');
                return { isOverlap: true, ...timeSegments[i] };
            }
        }

        return { isOverlap: false };
    };

    const onOk = (value) => {};

    const handleForm = () => {
        setFormBtnDisable(true);
        let timeSegments = form.getFieldValue('allowedTimings');
        let flag = 1;
        timeSegments = timeSegments?.map((time) => ({ timeSlotFrom: time?.timeSlotFrom?.format('HH:mm'), timeSlotTo: time?.timeSlotTo?.format('HH:mm') }));
        timeSegments?.map((time) => {
            if (time?.timeSlotFrom === undefined || time?.timeSlotTo === undefined) {
                flag = 0;
                return;
            }
        });
    };

    const removeItem = (name, fields, restField) => {
        const formList = form.getFieldsValue();
        const formAllowedTiming = formList?.allowedTimings;
        const deletedItem = formAllowedTiming?.find((item, index) => index === name);
        if (deletedItem && deletedItem?.id) {
            const savedAllowedTiming = selectedRecord?.allowedTimings;
            if (savedAllowedTiming) {
                const saveDeletedItem = savedAllowedTiming?.find((item) => item?.id === deletedItem?.id);
                saveDeletedItem && setDeletedItemList([...deletedItemList, { ...saveDeletedItem, isDeleted: 'Y' }]);
            }
        }
        form.validateFields();
    };
    const validatedDuplicateTime = (field) => (rule, value) => {
        const overlapData = checkOverlap();
        console.log('TimeTrack', TimeTrack);
        return overlapData?.isOverlap && TimeTrack ? Promise.reject('Time overlaps with other time') : Promise.resolve();
    };

    const cardProps = {
        form,
        styles,
        disabledProps,
        showGlobalNotification,
        removeItem,
        setTimesegmentLengthTracker,
        forceUpdate,
        onOk,
        validatedDuplicateTime,
        TimesegmentLengthTracker,
    };

    const viewProps = {
        isVisible: isViewModeVisible,
        selectedRecord,
        style,
        disabledProps,
        cardProps,
    };

    return (
        <Form form={form} id="myForm" layout="vertical" colon={false} onFieldsChange={handleForm} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            {!isViewModeVisible ? (
                <>
                    <Row gutter={20}>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item name="criticalityGroupCode" label="Criticality Group Id" rules={[validateRequiredInputField('id'), validationFieldLetterAndNumber('id')]}>
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
                            <Form.Item initialValue={true} labelAlign="left" wrapperCol={{ span: 24 }} valuePropName="checked" name="criticalityDefaultGroup" label="Default Group">
                                <Switch checkedChildren="Active" unCheckedChildren="Inactive" onChange={(checked) => (checked ? 1 : 0)} {...disabledProps} />
                            </Form.Item>
                        </Col>

                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item initialValue={true} labelAlign="left" wrapperCol={{ span: 24 }} name="activeIndicator" label="Status" valuePropName="checked">
                                <Switch checkedChildren="Active" unCheckedChildren="Inactive" valuePropName="checked" onChange={(checked) => (checked ? 1 : 0)} {...disabledProps} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <AllowedTimingCard {...cardProps} />
                </>
            ) : (
                <ViewCriticalityGroup {...viewProps} {...cardProps} />
            )}
            <Row gutter={20} className={style.formFooter}>
                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={style.footerBtnLeft}>
                    <Button danger onClick={onClose}>
                        {!footerEdit ? 'Cancel' : 'Close'}
                    </Button>
                </Col>
                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={style.footerBtnRight}>
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
    );
};

export const AddEditDrawer = withDrawer(AddEditDrawerMain, {});
