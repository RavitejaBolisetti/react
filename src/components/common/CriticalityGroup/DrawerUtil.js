import React, { useEffect, useState } from 'react';

import { TimePicker, Drawer, Input, Form, Col, Row, Switch, Button, Table, Space, Alert, notification, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { LinearTrash } from 'Icons';

import dayjs from 'dayjs';

import { validateRequiredInputField } from 'utils/validation';
import { AiOutlinePlus, AiOutlineEye, AiFillCheckCircle, AiOutlineCloseCircle, AiOutlineInfoCircle, AiOutlineCheckCircle } from 'react-icons/ai';

import styles from 'pages/common/Common.module.css';
import style from './criticatiltyGroup.module.css';
import { preparePlaceholderText } from 'utils/preparePlaceholder';
import moment from 'moment';
const { confirm } = Modal;

const DrawerUtil = ({ setsaveclick, alertNotification, formBtnDisable, setFormBtnDisable, successAlert, handleUpdate2, onFinish, onFinishFailed, saveBtn, footerEdit, saveAndSaveNew, setSaveAndSaveNew, form, selectedRecord, setSelectedRecord, handleAdd, open, setDrawer, isChecked, setIsChecked, formActionType, isReadOnly, formData, setFormData, isDataAttributeLoaded, attributeData, setFieldValue, handleSelectTreeClick, geoData, contextAlertNotification }) => {
    const disabledProps = { disabled: isReadOnly };
    const [selectedTime, setSelectedTime] = useState(null);

    const disabledHours = () => {
        if (selectedTime) {
            const hour = selectedTime.hour();
            return Array.from({ length: hour }, (_, i) => i);
        }
        return [];
    };

    const disabledMinutes = (hour) => {
        if (selectedTime && hour === selectedTime.hour()) {
            const minute = selectedTime.minute();
            return Array.from({ length: minute }, (_, i) => i);
        }
        return [];
    };
    let drawerTitle = '';
    if (formActionType === 'add') {
        drawerTitle = 'Add Application Criticality Group Details';
    } else if (formActionType === 'update') {
        drawerTitle = 'Update Application Criticality Group Details';
    } else if (formActionType === 'view') {
        drawerTitle = 'View Application Criticality Group Details';
    }

    const momentTime = formData?.allowedTimingResponse?.map((i) => {
        //    console.log('allo',record?.allowedTimingResponse,'aslasl',i.timeSlotFrom)
        return {
            timeSlotFrom: dayjs(i.timeSlotFrom, 'HH:mm'),
            timeSlotTo: dayjs(i.timeSlotTo, 'HH:mm'),
        };
    });
    const informationModalBox = ({ icon = 'error', message = 'Information', description, className, placement }) => {
        alertNotification.open({
            icon: icon === 'error' ? <AiOutlineCloseCircle /> : <AiOutlineCheckCircle />,
            message,
            description,
            className,
            placement,
        });
    };

    const onClose = () => {
        form.resetFields();
        setSelectedRecord(null);
        setDrawer(false);
        setFormBtnDisable(false);
    };
    // const Alerts = ({ NotificationTitle, NotificationDescription, placement }) => {
    //     return <Alert message={NotificationTitle} description={NotificationDescription} type="success" showIcon closable />;
    // };
    const onOk = (value) => {};

    const handleForm = () => {
        setFormBtnDisable(true);
    };

    return (
        <Drawer
            title={drawerTitle}
            className={style.drawerCriticalityGrp}
            width="520"
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
                                <Button disabled={!formBtnDisable} onClick={() => setsaveclick(true)} form="myForm" key="submit" htmlType="submit" type="primary">
                                    Save
                                </Button>
                            ) : (
                                ''
                            )}
                            {saveAndSaveNew ? (
                                <Button disabled={!formBtnDisable} onClick={handleAdd} form="myForm" key="submitAndNew" htmlType="submit" type="primary">
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
                        <Form.Item
                            //  initialValue={formData?.critcltyGropCode}
                            name="criticalityGroupCode"
                            label="Criticality Group Code"
                            rules={[validateRequiredInputField('Criticality Group Code')]}
                        >
                            <Input placeholder={preparePlaceholderText('Group Code')} maxLength={5} {...disabledProps} />
                        </Form.Item>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item
                            //  initialValue={formData?.critcltyGropCode}
                            name="criticalityGroupName"
                            label="Criticality Group Name"
                            rules={[validateRequiredInputField('Criticality Group Name')]}
                        >
                            <Input placeholder={preparePlaceholderText('Name')} maxLength={50} {...disabledProps} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item
                            labelAlign="left"
                            wrapperCol={{ span: 24 }}
                            // normalize={(a, b) => (a ? 'Y' : 'N')}
                            // initialValue={formData?.defaultGroup === 'Y' ? 'Y' : 'N'}
                            valuePropName="checked"
                            name="criticalityDefaultGroup"
                            label="Default Group"
                        >
                            <Switch
                                //   defaultChecked={formData?.defaultGroup === 'Y'}
                                // defaultChecked={form.getFieldValue('defaultGroup') === 'Y'}
                                // defaultChecked={formActionType === 'add' || (selectedRecord && selectedRecord.defaultGroup === 'Y')}
                                checkedChildren="Active"
                                unCheckedChildren="Inactive"
                                //    initialValue={formData.defaultGroup}
                                onChange={(checked) => (checked ? 1 : 0)}
                                {...disabledProps}
                            />
                        </Form.Item>
                    </Col>

                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item
                            labelAlign="left"
                            wrapperCol={{ span: 24 }}
                            // normalize={(a, b) => (a ? 'Y' : 'N')}
                            //    initialValue={formData?.status === 'Y' ? 'Y' : 'N'}
                            name="activeIndicator"
                            label="Status"
                            valuePropName="checked"
                        >
                            <Switch
                                //  defaultChecked={formData?.status === 'Y'}
                                checkedChildren="Active"
                                unCheckedChildren="Inactive"
                                //   initialValue={formData.status}
                                valuePropName="checked"
                                onChange={(checked) => (checked ? 1 : 0)}
                                {...disabledProps}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <p className={style.allowedTimingAlignment}>Allowed Timings</p>
                    </Col>
                </Row>

                <Form.List
                    // required rules={[validateRequiredInputField('Allowed Timings')]}
                    name="allowedTimingResponse"
                    // initialValue={momentTime}
                >
                    {(fields, { add, remove }) => (
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
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'timeSlotFrom']}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Missing Start Time',
                                                    },
                                                ]}
                                            >
                                                <TimePicker use12Hours size="large" format="h:mm A" {...disabledProps} />
                                            </Form.Item>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'timeSlotTo']}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Missing End Time',
                                                    },
                                                ]}
                                            >
                                                <TimePicker use12Hours size="large" format="h:mm A" onOk={onOk} {...disabledProps} />
                                            </Form.Item>
                                        </Space>
                                        <Button
                                            icon={<LinearTrash />}
                                            className={style.deleteBtn}
                                            disabled={true}
                                            danger
                                            ghost
                                            onClick={() => {
                                                confirm({
                                                    title: 'Allowed Timing',
                                                    icon: <AiOutlineInfoCircle size={22} className={styles.modalIconAlert} />,
                                                    content: 'Are you sure you want to Delete?',
                                                    okText: 'Yes',
                                                    okType: 'danger',
                                                    cancelText: 'No',
                                                    wrapClassName: styles.confirmModal,
                                                    onOk() {
                                                        remove(name);
                                                        informationModalBox({ icon: 'success', message: 'Group Timing has been deleted Successfully', description: '', className: style.success, placement: 'bottomRight' });
                                                    },
                                                });
                                            }}
                                        />
                                    </div>
                                ))}
                            </>
                        </>
                    )}
                </Form.List>
                {/* {successAlert ? <Alerts NotificationTitle={'Added Successfully,Keep Adding more'} /> : null} */}
            </Form>
        </Drawer>
    );
};

export default DrawerUtil;
