import React, { useState } from 'react';

import { TimePicker, Drawer, Input, Form, Col, Row, Switch, Button, Table, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { AiOutlineClose } from 'react-icons/ai';

import dayjs from 'dayjs';

import { validateRequiredInputField, validateRequiredSelectField, validationFieldLetterAndNumber } from 'utils/validation';

import styles from 'pages/common/Common.module.css';
import style from './criticatiltyGroup.module.css';
import { preparePlaceholderText } from 'utils/preparePlaceholder';

const DrawerUtil = ({ form, selectedRecord, setSelectedRecord, handleAdd, open, setDrawer, isChecked, setIsChecked, formActionType, isReadOnly, formData, setFormData, isDataAttributeLoaded, attributeData, setFieldValue, handleSelectTreeClick, geoData }) => {
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

    // const momentTime = formData?.users?.map((i) => {
    //     return {
    //         startTime: dayjs(i.startTime, 'HH:mm'),
    //         endTime: dayjs(i.endTime, 'HH:mm'),
    //     };
    // });

    const onClose = () => {
        setSelectedRecord(null);
        setDrawer(false);
    };

    const onOk = (value) => {};

    return (
        <Drawer
            title={drawerTitle}
            width="540"
            footer={
                <>
                    <Row gutter={20}>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8} className={style.drawerFooterButtons}>
                            <Button danger onClick={onClose}>
                                Cancel
                            </Button>
                        </Col>
                        <Col xs={16} sm={16} md={16} lg={16} xl={16} xxl={16} className={style.drawerFooterButtons} style={{ textAlign: 'right' }}>
                            <Button form="myForm" key="submit" htmlType="submit" type="primary">
                                Save
                            </Button>
                            <Button onClick={handleAdd} form="myForm" key="submitAndNew" htmlType="submit" type="primary">
                                Save and New
                            </Button>
                        </Col>
                    </Row>
                </>
            }
            placement="right"
            onClose={onClose}
            open={open}
        >
            <Row gutter={20}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item
                        //  initialValue={formData?.critcltyGropCode}
                        name="critcltyGropCode"
                        label="Criticality Group Id"
                        rules={[validateRequiredInputField('Criticality Group Id')]}
                    >
                        <Input placeholder={preparePlaceholderText('Group Id')} maxLength={5} {...disabledProps} />
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item
                        //  initialValue={formData?.critcltyGropCode}
                        name="critcltyGropName"
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
                        initialValue={true}
                        labelAlign="left"
                        wrapperCol={{ span: 24 }}
                        // normalize={(a, b) => (a ? 'Y' : 'N')}
                        // initialValue={formData?.defaultGroup === 'Y' ? 'Y' : 'N'}
                        valuePropName="checked"
                        name="defaultGroup"
                        label="Default Group?"
                    >
                        <Switch
                            //   defaultChecked={formData?.defaultGroup === 'Y'}
                            // defaultChecked={form.getFieldValue('defaultGroup') === 'Y'}
                            // defaultChecked={formActionType === 'add' || (selectedRecord && selectedRecord.defaultGroup === 'Y')}
                            checkedChildren="Active"
                            unCheckedChildren="Inactive"
                            //    initialValue={formData.defaultGroup}
                            onChange={(checked) => (checked ? 'Y' : 'N')}
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
                        name="status"
                        label="Status"
                        valuePropName="checked"
                    >
                        <Switch
                            //  defaultChecked={formData?.status === 'Y'}
                            checkedChildren="Active"
                            unCheckedChildren="Inactive"
                            //   initialValue={formData.status}
                            valuePropName="checked"
                            onChange={(checked) => (checked ? 'Y' : 'N')}
                            {...disabledProps}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col>
                    <p>Allowed Timings</p>
                </Col>
            </Row>
            <Form.List
                // required rules={[validateRequiredInputField('Allowed Timings')]}
                name="allowedTimingRequest"
                //  initialValue={momentTime}
            >
                {(fields, { add, remove }) => (
                    <>
                        {fields.map(({ key, name, ...restField }) => (
                            <div key={key} className={style.allowedTiming}>
                                <Space
                                    style={{
                                        display: 'flex',
                                        marginBottom: 8,
                                    }}
                                    align="baseline"
                                >
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'startTime']}
                                        label="Start Time"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Missing Start Time',
                                            },
                                        ]}
                                    >
                                        <TimePicker onChange={setSelectedTime} format="HH:mm" {...disabledProps} />
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'endTime']}
                                        label="End Time"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Missing End Time',
                                            },
                                        ]}
                                    >
                                        <TimePicker disabledHours={disabledHours} disabledMinutes={disabledMinutes} format="HH:mm" onOk={onOk} {...disabledProps} />
                                    </Form.Item>
                                    <AiOutlineClose aria-label='outline-close' {...disabledProps} onClick={() => remove(name)} />
                                </Space>
                            </div>
                        ))}
                        <Row>
                            <Col offset={19}>
                                <Form.Item style={{ textAlign: 'right', float: 'right' }}>
                                    <Button {...disabledProps} onClick={() => add()} icon={<PlusOutlined />}>
                                        Add Time
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </>
                )}
            </Form.List>
        </Drawer>
    );
};

export default DrawerUtil;
