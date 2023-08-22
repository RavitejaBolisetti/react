/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Row, Col, Input, Button, Form } from 'antd';

import { validateRequiredInputField, validationFieldLetterAndNumber } from 'utils/validation';
import { preparePlaceholderText } from 'utils/preparePlaceholder';

const MacIdForm = ({ accessMacid, setAccessMacid, finalFormdata, setfinalFormdata }) => {
    const [form] = Form.useForm();
    const [btnDisabled, setBtnDisabled] = useState(false);

    const handleFormFieldChange = () => {};
    const onFinishFailed = () => {};

    const checkDuplicate = (value) => {
        const index = accessMacid?.findIndex((el) => el?.macid === value);
        if (index !== -1) {
            setBtnDisabled(true);
            return Promise.reject('This mac is already exists');
        } else {
            setBtnDisabled(false);
            return Promise.resolve('');
        }
    };

    const handleAddMacid = (event, key) => {
        form.validateFields().then((data) => {
            setAccessMacid([...accessMacid, data]);
            setfinalFormdata((prev) => ({ ...prev, userDevices: [...prev.userDevices, data] }));
            form.resetFields();
            setBtnDisabled(true);
        }).catch(err => console.error(err));
    };

    return (
        <Form autoComplete="off" layout="vertical" form={form} onValuesChange={handleFormFieldChange} onFieldsChange={handleFormFieldChange} onFinishFailed={onFinishFailed}>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Form.Item
                        label="MAC ID"
                        name="macid"
                        rules={[
                            validateRequiredInputField('MAC id'),
                            validationFieldLetterAndNumber('MAC id'),
                            {
                                validator: (_, value) => checkDuplicate(value),
                            },
                        ]}
                    >
                        <Input minLength={14} maxLength={14} placeholder={preparePlaceholderText('MAC id')} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Button onClick={(event, key) => handleAddMacid(event, key)} type="primary" disabled={btnDisabled}>
                        Add
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export default MacIdForm;
