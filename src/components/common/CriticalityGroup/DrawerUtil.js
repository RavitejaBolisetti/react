import React from 'react';

import { TimePicker, Drawer, Input, Form, Col, Row, Switch, Button, Table } from 'antd';
import dayjs from 'dayjs';

const format = 'HH:mm';

const onFinish = (values) => {
    console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

function DrawerUtil({ open }) {
    const [form] = Form.useForm();

    const onClose = () => {
        open = false;
    };

   

    return (
        <Drawer
            title="Add Application Criticality Group Details"
            placement="right"
            onClose={onClose}
            open={open}
            footer={
                <div
                    style={{
                        borderTop: '1px solid #e9e9e9',
                        padding: '10px 16px',
                        background: '#fff',
                        textAlign: 'right',
                    }}
                >
                    <Button style={{ marginRight: 8 }}>Cancel</Button>
                    <Button type="primary">Submit</Button>
                </div>
            }
        >
            <Form form={form} layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Row gutter={20}>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item label="Criticality Group Id">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item label="Criticality Group Name">
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item label="Default Group?">
                            <Switch checkedChildren="Active" unCheckedChildren="Inactive" defaultChecked />
                        </Form.Item>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Form.Item label="Status">
                            <Switch checkedChildren="Active" unCheckedChildren="Inactive" defaultChecked />{' '}
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            <TimePicker defaultValue={dayjs('12:00', format)} format={format} />
        </Drawer>
    );
}

export default DrawerUtil;
