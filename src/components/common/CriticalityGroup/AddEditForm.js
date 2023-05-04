import React, { useEffect, useState } from 'react';

import { Input, Form, Col, Row, Switch, Button, Tooltip } from 'antd';

import { validateAlphanumericWithSpace, validateRequiredInputField, validationFieldLetterAndNumber } from 'utils/validation';
import { preparePlaceholderText } from 'utils/preparePlaceholder';
import { generateRandomNumber } from 'utils/generateRandomNumber';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { EN } from 'language/en';

import style from 'components/common/Common.module.css';

import { ViewCriticalityGroup } from './ViewCriticalityGroup';
import { withDrawer } from 'components/withDrawer';
import AllowedTimingCard from './AllowedTimingCard';

const AddEditFormMain = ({ setIsViewModeVisible, setIsFormVisible, isViewModeVisible, codeIsReadOnly, forceUpdate, deletedItemList, setDeletedItemList, showGlobalNotification, isLoading, setsaveclick, alertNotification, formBtnDisable, setFormBtnDisable, successAlert, handleUpdate2, onFinish, onFinishFailed, saveBtn, footerEdit, saveAndSaveNew, setSaveAndSaveNew, form, selectedRecord, setSelectedRecord, handleAdd, open, setDrawer, isChecked, setIsChecked, formActionType, isReadOnly, formData, setFormData, setFieldValue, contextAlertNotification }) => {
    const disabledProps = { disabled: isReadOnly };
    const [TimesegmentLengthTracker, setTimesegmentLengthTracker] = useState(generateRandomNumber());
    const [TimeTrack, setTimeTrack] = useState(true);
    const codeDisabledProp = { disabled: codeIsReadOnly };

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
        timeSegments = timeSegments?.map((time) => ({ timeSlotFrom: time?.timeSlotFrom?.format('HH:mm'), timeSlotTo: time?.timeSlotTo?.format('HH:mm') }));
        if (timeSegments?.length === 1) {
            return false;
        }

        timeSegments?.sort((timeSegment1, timeSegment2) => timeSegment1['timeSlotFrom']?.localeCompare(timeSegment2['timeSlotFrom']));

        for (let i = 0; i < timeSegments.length - 1; i++) {
            const currentEndTime = timeSegments[i]['timeSlotTo'];
            const nextStartTime = timeSegments[i + 1]['timeSlotFrom'];
            if (currentEndTime > nextStartTime) {
                return { isOverlap: true, ...timeSegments[i] };
            }
        }

        return { isOverlap: false };
    };

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
    };
    const validatedDuplicateTime = (field) => (rule, value) => {
        const overlapData = checkOverlap();
        return overlapData?.isOverlap && TimeTrack ? Promise.reject(EN.GENERAL.TIME_OVERLAPPING.MESSAGE) : Promise.resolve();
    };

    const cardProps = {
        form,
        style,
        disabledProps,
        showGlobalNotification,
        removeItem,
        setTimesegmentLengthTracker,
        forceUpdate,
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
                            <Form.Item
                                name="criticalityGroupCode"
                                label="Criticality Group Id"
                                tooltip={{
                                    title: 'Tooltip with customize icon',
                                    icon: <AiOutlineInfoCircle size={13} />,
                                }}
                                rules={[validateRequiredInputField('id'), validationFieldLetterAndNumber('id')]}
                            >
                                <Input maxLength={6} placeholder={preparePlaceholderText('id')} {...codeDisabledProp} />
                            </Form.Item>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item
                                name="criticalityGroupName"
                                label="Criticality Group Name"
                                tooltip={{
                                    title: 'Tooltip with customize icon',
                                    icon: <AiOutlineInfoCircle size={13} />,
                                }}
                                rules={[validateRequiredInputField('name'), validateAlphanumericWithSpace('name')]}
                            >
                                <Input placeholder={preparePlaceholderText('name')} maxLength={50} {...disabledProps} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={20}>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item
                                labelAlign="left"
                                wrapperCol={{ span: 24 }}
                                valuePropName="checked"
                                name="criticalityDefaultGroup"
                                label="Default Group"
                                tooltip={{
                                    title: 'Tooltip with customize icon',
                                    icon: <AiOutlineInfoCircle size={13} />,
                                }}
                            >
                                <Switch checkedChildren="Active" unCheckedChildren="Inactive" onChange={(checked) => (checked ? 1 : 0)} {...disabledProps} />
                            </Form.Item>
                        </Col>

                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item
                                initialValue={true}
                                labelAlign="left"
                                wrapperCol={{ span: 24 }}
                                name="activeIndicator"
                                label="Status"
                                tooltip={{
                                    title: 'Tooltip with customize icon',
                                    icon: <AiOutlineInfoCircle size={13} />,
                                }}
                                valuePropName="checked"
                            >
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
    );
};

export const AddEditForm = withDrawer(AddEditFormMain, {});
