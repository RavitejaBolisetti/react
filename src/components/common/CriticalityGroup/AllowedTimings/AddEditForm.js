import React from 'react';
import { Input, Form, Col, Row, Button, TimePicker, Space } from 'antd';

import { validateRequiredInputField } from 'utils/validation';

import style from '../../Common.module.css';

const AddEditForm = (props) => {
    const { isAddTimeVisible, form, onFinish, handleFormValueChange, handleFormFieldChange } = props;

    return (
        <>
            {isAddTimeVisible && (
                <Form form={form} onFinish={onFinish} onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange}>
                    <div className={style.allowedTiming}>
                        <Space size="middle">
                            <Row gutter={20}>
                                <Col xs={10} sm={10} md={10} lg={10} xl={10} xxl={10}>
                                    <Form.Item name={'timeSlotFrom'} rules={[validateRequiredInputField('start time')]}>
                                        <TimePicker use12Hours size="large" format="h:mm A" />
                                    </Form.Item>
                                </Col>
                                <Col xs={10} sm={10} md={10} lg={10} xl={10} xxl={10}>
                                    <Form.Item name={'timeSlotTo'} rules={[validateRequiredInputField('end time')]}>
                                        <TimePicker use12Hours size="large" format="h:mm A" />
                                    </Form.Item>
                                </Col>
                                <Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4}>
                                    <Button type="link" htmlType="submit">
                                        Save
                                    </Button>
                                </Col>
                                <Form.Item hidden name={'id'}>
                                    <Input />
                                </Form.Item>
                            </Row>
                        </Space>
                    </div>
                </Form>
            )}
        </>
    );
};

export default AddEditForm;
