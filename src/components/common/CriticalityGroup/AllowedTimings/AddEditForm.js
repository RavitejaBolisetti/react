import React from 'react';
import { Input, Form, Col, Row, Switch, Button, TimePicker, Select, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { duplicateValidator, validateRequiredSelectField } from 'utils/validation';
import { preparePlaceholderSelect } from 'utils/preparePlaceholder';

import { LinearTrash } from 'Icons';

import { validateRequiredInputField } from 'utils/validation';
import { generateRandomNumber } from 'utils/generateRandomNumber';
import { LANGUAGE_EN } from 'language/en';

import style from '../../Common.module.css';

const AddEditForm = ({ setFormBtnDisable, disabledProps, finalFormdata, form, onFinish, status, name, id, isEditing, isBtnDisabled, actions, disableStatus, setIsBtnDisabled }) => {
    const onFinishFailed = (err) => {
        console.error(err);
    };
    const handleForm = () => {
        setFormBtnDisable(true);
    };

    return (
        <>
            <Form form={form} onFinish={onFinish} onFieldsChange={handleForm}>
                <div className={style.allowedTiming}>
                    <Space size="middle">
                        <Row gutter={20}>
                            <Col xs={10} sm={10} md={10} lg={10} xl={10} xxl={10}>
                                <Form.Item name={'timeSlotFrom'} rules={[validateRequiredInputField('start time')]}>
                                    <TimePicker use12Hours size="large" format="h:mm A" {...disabledProps} />
                                </Form.Item>
                            </Col>
                            <Col xs={10} sm={10} md={10} lg={10} xl={10} xxl={10}>
                                <Form.Item name={'timeSlotTo'} rules={[validateRequiredInputField('end time')]}>
                                    <TimePicker use12Hours size="large" format="h:mm A" {...disabledProps} />
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
                            <Form.Item hidden name={'isDeleted'} initialValue="N">
                                <Input />
                            </Form.Item>
                        </Row>
                    </Space>
                </div>
            </Form>
        </>
    );
};

export default AddEditForm;
