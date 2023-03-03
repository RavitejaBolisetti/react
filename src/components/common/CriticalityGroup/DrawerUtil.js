import React, { useState } from 'react';

import { TimePicker, Drawer, Input, Form, Col, Row, Switch, Button, Table, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { AiOutlineClose } from 'react-icons/ai';

import dayjs from 'dayjs';

import style from './criticatiltyGroup.module.css';

const DrawerUtil = ({ open, setDrawer, isChecked, setIsChecked, formActionType, isReadOnly, formData, setFormData, isDataAttributeLoaded, attributeData, setFieldValue, handleSelectTreeClick, geoData }) => {
    let drawerTitle = '';
    if (formActionType === 'add') {
        drawerTitle = 'Add Application Criticality Group Details';
    } else if (formActionType === 'update') {
        drawerTitle = 'Update Application Criticality Group Details';
    } else if (formActionType === 'view') {
        drawerTitle = 'View Application Criticality Group Details';
    }

    const momentTime = formData?.users?.map((i) => {
        return {
            startTime: dayjs(i.startTime, 'HH:mm'),
            endTime: dayjs(i.endTime, 'HH:mm'),
        };
    });

    const disabledProps = { disabled: isReadOnly };
    const onClose = () => {
        setDrawer(false);
    };

    const onOk = (value) => {
        console.log('onOk: ', dayjs().format());
        console.log('onOk: ', typeof value);
        console.log('onOk: ', value.format('HH:mm'));
    };

    return (
        <Drawer
            title={drawerTitle}
            width="540"
            footer={
                <>
                    <Row gutter={20}>
                        <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8} className={style.drawerFooterButtons}>
                            <Button danger onClick={onClose}>Cancel</Button>
                        </Col>
                        <Col xs={16} sm={16} md={16} lg={16} xl={16} xxl={16} className={style.drawerFooterButtons} style={{textAlign:'right'}}>
                            <Button form="myForm" key="submit" htmlType="submit" type="primary">
                                Save
                            </Button>
                            <Button form="myForm" key="submit" htmlType="submit" type="primary">
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
                    <Form.Item initialValue={formData?.criticalityGroupId} name="criticalityGroupId" label="Criticality Group Id">
                        <Input {...disabledProps} />
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item initialValue={formData?.criticalityGroupName} name="criticalityGroupName" label="Criticality Group Name">
                        <Input {...disabledProps} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Form.Item name="defaultGroup" label="Default Group?">
                        <Switch checkedChildren="Active" unCheckedChildren="Inactive" initialValue={formData.defaultGroup} valuePropName="checked" onChange={() => setIsChecked(!isChecked)} {...disabledProps} />
                    </Form.Item>
                </Col>
                <Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
                    {' '}
                </Col>
                <Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
                    <Form.Item name="status" label="Status">
                        <Switch checkedChildren="Active" unCheckedChildren="Inactive" initialValue={formData.status} valuePropName="checked" onChange={() => setIsChecked(!isChecked)} {...disabledProps} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col>
                    <h4> Allowed Timings</h4>
                </Col>
            </Row>
            <Form.List name="users" initialValue={momentTime}>
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
                                        <TimePicker format="HH:mm" {...disabledProps} />
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
                                        <TimePicker format="HH:mm" onOk={onOk} {...disabledProps} />
                                    </Form.Item>
                                    <AiOutlineClose {...disabledProps} onClick={() => remove(name)} />
                                </Space>
                            </div>
                        ))}
                        <Row>
                            <Col offset={16}>
                                <Form.Item style={{ display: 'flex', align: 'right', textAlign: 'right', float:'right' }}>
                                    <Button {...disabledProps} onClick={() => add()} icon={<PlusOutlined />}>
                                        Add Time
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </>
                )}
            </Form.List>

            {/* <Row>
                    <Col>
                        <div
                            style={{
                                borderTop: '1px solid #e9e9e9',
                                padding: '10px 16px',
                                background: '#fff',
                                textAlign: 'right',
                            }}
                        >
                        </div>
                    </Col>
                </Row> */}
        </Drawer>
    );
};

export default DrawerUtil;
