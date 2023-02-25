import React, { useState } from 'react';

import { TimePicker, Drawer, Input, Form, Col, Row, Switch, Button, Table, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { AiOutlineClose } from 'react-icons/ai';

import dayjs from 'dayjs';

const format = 'HH:mm';

const DrawerUtil = ({ open, setDrawer,isChecked, setIsChecked, formActionType, isReadOnly, formData, isDataAttributeLoaded, attributeData, setFieldValue, handleSelectTreeClick, geoData  }) => {
    const [form] = Form.useForm();

    const onClose = () => {
        setDrawer(false);
    };
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Drawer title={formActionType === 'add'?'Add Application Criticality Group Details':'Edit'} placement="right" onClose={onClose} open={open}>
            <Form form={form} layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Row gutter={20}>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item name="Criticality Group Id" label="Criticality Group Id">
                            <Input />
                            
                        </Form.Item>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item name="Criticality Group Name" label="Criticality Group Name">
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item name="Default Group?" label="Default Group?">
                            <Switch checkedChildren="Active" unCheckedChildren="Inactive" defaultChecked onChange={() => setIsChecked(!isChecked)} value={(formData?.isActive === 'Y' ? 1 : 0) || isChecked} defaultChecked />
                        </Form.Item>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item name="Status" label="Status">
                            <Switch checkedChildren="Active" unCheckedChildren="Inactive" defaultChecked onChange={() => setIsChecked(!isChecked)} value={(formData?.isActive === 'Y' ? 1 : 0) || isChecked} defaultChecked />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col>
                        <h4> Allowed Timings</h4>
                    </Col>
                </Row>
                <Form.List name="users">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <div key={key} style={{ background: 'pink' }}>
                                    <Space
                                        style={{
                                            display: 'flex',
                                            marginBottom: 8,
                                        }}
                                        align="baseline"
                                    >
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'Start Time']}
                                            label="Start Time"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Missing Start Time',
                                                },
                                            ]}
                                        >
                                            <TimePicker initialValue={dayjs('12:00', format)} format={format} />
                                        </Form.Item>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'End Time']}
                                            label="End Time"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Missing End Time',
                                                },
                                            ]}
                                        >
                                            <TimePicker initialValue={dayjs('12:00', format)} format={format} />
                                        </Form.Item>
                                        <AiOutlineClose onClick={() => remove(name)} />
                                    </Space>
                                </div>
                            ))}
                            <Row>
                                <Col offset={16}>
                                    <Form.Item style={{ display: 'flex', align: 'right' }}>
                                        <Button onClick={() => add()} icon={<PlusOutlined />}>
                                            Add Time
                                        </Button>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </>
                    )}
                </Form.List>

                <Row>
                    <Col>
                        <div
                            style={{
                                borderTop: '1px solid #e9e9e9',
                                padding: '10px 16px',
                                background: '#fff',
                                textAlign: 'right',
                            }}
                        >
                            <Form.Item>
                                <Button style={{ marginRight: 8 }}>Cancel</Button>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </div>
                    </Col>
                </Row>
            </Form>
        </Drawer>
    );
};

export default DrawerUtil;
