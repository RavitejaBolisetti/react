import React from 'react';

import { TimePicker, Drawer, Input, Form, Col, Row, Switch, Button, Space, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { LinearTrash } from 'Icons';

import { validateRequiredInputField } from 'utils/validation';
import { preparePlaceholderText } from 'utils/preparePlaceholder';

import styles from 'pages/common/Common.module.css';
import style from './criticatiltyGroup.module.css';

const { confirm } = Modal;

const DrawerUtil = ({ deletedItemList, setDeletedItemList, isDataLoaded, isLoading, setsaveclick, alertNotification, formBtnDisable, setFormBtnDisable, successAlert, handleUpdate2, onFinish, onFinishFailed, saveBtn, footerEdit, saveAndSaveNew, setSaveAndSaveNew, form, selectedRecord, setSelectedRecord, handleAdd, open, setDrawer, isChecked, setIsChecked, formActionType, isReadOnly, formData, setFormData, isDataAttributeLoaded, attributeData, setFieldValue, handleSelectTreeClick, geoData, contextAlertNotification }) => {
    const disabledProps = { disabled: isReadOnly };
    let drawerTitle = '';
    if (formActionType === 'add') {
        drawerTitle = 'Add Application Criticality Group Details';
    } else if (formActionType === 'update') {
        drawerTitle = 'Edit Application Criticality Group Details';
    } else if (formActionType === 'view') {
        drawerTitle = 'View Application Criticality Group Details';
    }
    const onClose = () => {
        form.resetFields();
        setSelectedRecord(null);
        setDrawer(false);
        setFormBtnDisable(false);
    };

    const checkOverlap = () => {
        let timeSegments = form.getFieldValue('allowedTimings');
        timeSegments = timeSegments?.map((time) => ({ timeSlotFrom: time?.timeSlotFrom?.format('HH:mm'), timeSlotTo: time?.timeSlotTo?.format('HH:mm') }));
        if (timeSegments?.length === 1) return false;

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

    const onOk = (value) => {
        // checkOverlap()
    };

    const handleForm = () => {
        setFormBtnDisable(true);
    };

    const removeItem = (name) => {
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

    return (
        <Drawer
            title={drawerTitle}
            className={style.drawerCriticalityGrp}
            width="520"
            maskClosable={false}
            footer={
                <>
                    <Row gutter={20}>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8} className={style.drawerFooterButtons}>
                            <Button danger onClick={onClose}>
                                Cancel
                            </Button>
                        </Col>
                        <Col xs={16} sm={16} md={16} lg={16} xl={16} xxl={16} className={style.drawerFooterButtons} style={{ textAlign: 'right' }}>
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
            placement="right"
            onClose={onClose}
            open={open}
        >
            <Form form={form} id="myForm" layout="vertical" colon={false} onFieldsChange={handleForm} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Row gutter={20}>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item name="criticalityGroupCode" label="Criticality Group Code" rules={[validateRequiredInputField('Criticality Group Code')]}>
                            <Input maxLength={6} placeholder={preparePlaceholderText('Group Code')} {...disabledProps} />
                        </Form.Item>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item name="criticalityGroupName" label="Criticality Group Name" rules={[validateRequiredInputField('Criticality Group Name')]}>
                            <Input placeholder={preparePlaceholderText('Name')} maxLength={50} {...disabledProps} />
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
                        <Form.Item labelAlign="left" wrapperCol={{ span: 24 }} name="activeIndicator" label="Status" valuePropName="checked">
                            <Switch checkedChildren="Active" unCheckedChildren="Inactive" valuePropName="checked" onChange={(checked) => (checked ? 1 : 0)} {...disabledProps} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <p className={style.allowedTimingAlignment}>Allowed Timings</p>
                    </Col>
                </Row>

                <Form.List name="allowedTimings">
                    {(fields, { add, remove, ...restP }) =>
                        console.log(restP) || (
                            <>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={24} lg={24} xl={24} className={style.addTimeBtn}>
                                        <Button type="link" color="#FF3E5B" {...disabledProps} onClick={() => add()} icon={<PlusOutlined />}>
                                            Add Time
                                        </Button>
                                    </Col>
                                </Row>
                                <div>
                                    {fields.length > 0 ? (
                                        <Row gutter={20}>
                                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                <div className={style.timingHeader}>
                                                    <Row gutter={20}>
                                                        <Col xs={10} sm={10} md={10} lg={10} xl={10} xxl={10}>
                                                            <div className={style.paddingLeft}>Start Time</div>
                                                        </Col>
                                                        <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                                            <div className={style.paddingLeft2}> End Time</div>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Col>
                                        </Row>
                                    ) : null}
                                </div>

                                <>
                                    {fields.map(({ key, name, ...restField }) => (
                                        <div key={key} className={style.allowedTiming}>
                                            <Space size="middle">
                                                <Row gutter={20}>
                                                    <Col xs={10} sm={10} md={10} lg={10} xl={10} xxl={10}>
                                                        <Form.Item
                                                            {...restField}
                                                            name={[name, 'timeSlotFrom']}
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: 'Missing Start Time',
                                                                },
                                                                {
                                                                    validator: (rule, value) => {
                                                                        const overlapData = checkOverlap();
                                                                        return overlapData?.isOverlap && value?.format('HH:mm') === overlapData?.timeSlotFrom ? Promise.reject('Time overlaps with other time') : Promise.resolve();
                                                                    },
                                                                },
                                                            ]}
                                                        >
                                                            <TimePicker use12Hours size="large" format="h:mm A" onOk={onOk} {...disabledProps} />
                                                        </Form.Item>
                                                    </Col>
                                                    <Col xs={10} sm={10} md={10} lg={10} xl={10} xxl={10}>
                                                        <Form.Item
                                                            {...restField}
                                                            name={[name, 'timeSlotTo']}
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: 'Missing End Time',
                                                                },
                                                                {
                                                                    validator: (rule, value) => {
                                                                        const overlapData = checkOverlap();
                                                                        return overlapData?.isOverlap && value?.format('HH:mm') === overlapData?.timeSlotTo ? Promise.reject('Time overlaps with other time') : Promise.resolve();
                                                                    },
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
                                                            className={style.deleteBtn}
                                                            {...disabledProps}
                                                            danger
                                                            ghost
                                                            onClick={() => {
                                                                removeItem(name);
                                                                remove(name);
                                                                // confirm({
                                                                //     title: 'Allowed Timing',
                                                                //     icon: <AiOutlineInfoCircle size={22} className={style.modalIconAlert} />,
                                                                //     content: 'Are you sure you want to Delete?',
                                                                //     okText: 'Yes',
                                                                //     okType: 'danger',
                                                                //     cancelText: 'No',
                                                                //     wrapClassName: styles.confirmModal,
                                                                //     centered: true,
                                                                //     closable: true,
                                                                //     onOk() {
                                                                //         remove(name);
                                                                //         removeItem(name);
                                                                //         informationModalBox({ icon: 'success', message: 'Group Timing has been deleted Successfully', description: '', className: style.success, placement: 'bottomRight' });
                                                                //     },
                                                                // });
                                                            }}
                                                        />
                                                    </Col>
                                                </Row>
                                            </Space>
                                        </div>
                                    ))}
                                </>
                            </>
                        )
                    }
                </Form.List>
            </Form>
        </Drawer>
    );
};

export default DrawerUtil;
