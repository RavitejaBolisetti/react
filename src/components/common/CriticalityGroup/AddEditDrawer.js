import React, { useEffect, useState } from 'react';

import { TimePicker, Drawer, Input, Form, Col, Row, Switch, Button, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { LinearTrash } from 'Icons';

import { validateAlphanumericWithSpace, validateRequiredInputField, validationFieldLetterAndNumber } from 'utils/validation';
import { preparePlaceholderText } from 'utils/preparePlaceholder';


import style from 'components/common/Common.module.css';
import styles from '../DrawerAndTable.module.css'

import { ViewCriticalityGroup } from './ViewCriticalityGroup';
import { withDrawer } from 'components/withDrawer';

const AddEditDrawerMain = ({ setIsViewModeVisible,setIsFormVisible,isViewModeVisible, codeIsReadOnly, forceUpdate, deletedItemList, setDeletedItemList, showGlobalNotification, isLoading, setsaveclick, alertNotification, formBtnDisable, setFormBtnDisable, successAlert, handleUpdate2, onFinish, onFinishFailed, saveBtn, footerEdit, saveAndSaveNew, setSaveAndSaveNew, form, selectedRecord, setSelectedRecord, handleAdd, open, setDrawer, isChecked, setIsChecked, formActionType, isReadOnly, formData, setFormData, isDataAttributeLoaded, attributeData, setFieldValue, handleSelectTreeClick, geoData, contextAlertNotification }) => {
    const disabledProps = { disabled: isReadOnly };
    const [TimesegmentLengthTracker, setTimesegmentLengthTracker] = useState(Math.random() * 1000);
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
        if (formActionType === 'update') {
            // setDisableAddtime(false);
        }
        if (formActionType === 'view') {
            // setDisableAddtime(true);
        }
        let timeSegments = form.getFieldValue('allowedTimings');
        if (timeSegments?.length === 1) {
            console.log('The length is 1');
            setTimeTrack(false);
            console.log(TimeTrack);
        } else {
            setTimeTrack(true);
            console.log(TimeTrack);
        }
    }, [TimesegmentLengthTracker]);

    const onClose = () => {
        form.resetFields();
        form.setFieldsValue({
            allowedTimings: [],
        });
        setIsViewModeVisible(false)

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
                // return {isOverlap: true}
            }
        }

        return { isOverlap: false };
    };

    const onOk = (value) => {
        // checkOverlap()
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
        if (flag === 1) {
            // setDisableAddtime(false);
        } else {
            // setDisableAddtime(true);
        }
    };
    const onValuesChange = (values) => {
        console.log(values);
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
        form.validateFields()
            .then((values) => {
                console.log('success');
            })
            .catch((errorInfo) => {
                console.log('failure');
            });
    };
    const validatedDuplicateTime = (field) => (rule, value) => {
        const overlapData = checkOverlap();
        console.log('TimeTrack', TimeTrack);
        return overlapData?.isOverlap && TimeTrack ? Promise.reject('Time overlaps with other time') : Promise.resolve();
        // return field && overlapData?.isOverlap && value?.format('HH:mm') === overlapData?.[field] ? Promise.reject('Time overlaps with other time') : Promise.resolve();
    };

    const viewProps = {
        isVisible: isViewModeVisible,
        selectedRecord,
        style,
    };

    return (
        <Form form={form} id="myForm" layout="vertical" colon={false} onValuesChange={onValuesChange} onFieldsChange={handleForm} onFinish={onFinish} onFinishFailed={onFinishFailed}>
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
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <p className={styles.allowedTimingAlignment}>Allowed Timings</p>
                        </Col>
                    </Row>

                    <Form.List name="allowedTimings">
                        {(fields, { add, remove, ...restP }) => (
                            <>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.addTimeBtn}>
                                        <Button
                                            type="link"
                                            color="#FF3E5B"
                                            // disabled={DisableAddtime}
                                            {...disabledProps}
                                            onClick={() => {
                                                add();
                                                setTimesegmentLengthTracker(Math.random() * 10000);
                                            }}
                                            icon={<PlusOutlined />}
                                        >
                                            Add Time
                                        </Button>
                                    </Col>
                                </Row>
                                <div>
                                    {fields.length > 0 ? (
                                        <Row gutter={20}>
                                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                <div className={styles.timingHeader}>
                                                    <Row gutter={20}>
                                                        <Col xs={10} sm={10} md={10} lg={10} xl={10} xxl={10}>
                                                            <div className={styles.paddingLeft}>Start Time</div>
                                                        </Col>
                                                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                                            <div className={styles.paddingLeft2}> End Time</div>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Col>
                                        </Row>
                                    ) : null}
                                </div>

                                <>
                                    {fields.map(({ key, name, ...restField }) => (
                                        <div key={key} className={styles.allowedTiming}>
                                            <Space size="middle">
                                                <Row gutter={20}>
                                                    <Col xs={10} sm={10} md={10} lg={10} xl={10} xxl={10}>
                                                        <Form.Item {...restField} name={[name, 'timeSlotFrom']} rules={[validateRequiredInputField('Start Time'), { validator: TimesegmentLengthTracker && validatedDuplicateTime('timeSlotFrom') }]}>
                                                            <TimePicker use12Hours size="large" format="h:mm A" onOk={onOk} {...disabledProps} />
                                                        </Form.Item>
                                                    </Col>
                                                    <Col xs={10} sm={10} md={10} lg={10} xl={10} xxl={10}>
                                                        <Form.Item
                                                            {...restField}
                                                            name={[name, 'timeSlotTo']}
                                                            rules={[
                                                                validateRequiredInputField('End Time'),
                                                                {
                                                                    validator: TimesegmentLengthTracker && validatedDuplicateTime('timeSlotTo'),
                                                                },
                                                            ]}
                                                        >
                                                            <TimePicker use12Hours size="large" format="h:mm A" onOk={onOk} {...disabledProps} />
                                                        </Form.Item>
                                                    </Col>
                                                    <Form.Item hidden {...restField} name={[name, 'id']}>
                                                        <Input />
                                                    </Form.Item>
                                                    <Form.Item hidden {...restField} name={[name, 'isDeleted']} initialValue="N">
                                                        <Input />
                                                    </Form.Item>
                                                    <Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
                                                        <Button
                                                            icon={<LinearTrash />}
                                                            className={styles.deleteBtn}
                                                            {...disabledProps}
                                                            danger
                                                            ghost
                                                            onClick={() => {
                                                                removeItem(name, fields, restField);
                                                                remove(name);
                                                                setTimesegmentLengthTracker(Math.random() * 1000);
                                                                forceUpdate();

                                                                showGlobalNotification({ notificationType: 'success', message: 'Group Timing has been deleted Successfully', placement: 'bottomRight', showTitle: false });
                                                            }}
                                                        />
                                                    </Col>
                                                </Row>
                                            </Space>
                                        </div>
                                    ))}
                                </>
                            </>
                        )}
                    </Form.List>

                    
                </>
            ) : (
                <ViewCriticalityGroup {...viewProps} />
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
