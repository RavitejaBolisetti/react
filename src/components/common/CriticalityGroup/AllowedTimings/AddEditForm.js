/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Input, Form, Button, TimePicker, Space } from 'antd';
import { validateRequiredInputField } from 'utils/validation';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

const AddEditForm = (props) => {
    const { allowedTimingSave, isAddTimeVisible, form, onFinish, handleFormValueChange, handleFormFieldChange } = props;

    return (
        <>
            {isAddTimeVisible && (
                <Form form={form} onFinish={onFinish} onValuesChange={handleFormValueChange} onFieldsChange={handleFormFieldChange}>
                    <div className={styles.allowedTiming}>
                        <Space size="large">
                            <Form.Item name={'timeSlotFrom'} rules={[validateRequiredInputField('start time')]}>
                                <TimePicker placeholder={translateContent('criticalityGroup.validation.startTime')} use12Hours format="h:mm A" />
                            </Form.Item>
                            <Form.Item name={'timeSlotTo'} rules={[validateRequiredInputField('end time')]}>
                                <TimePicker placeholder={translateContent('criticalityGroup.validation.endTime')} use12Hours format="h:mm A" />
                            </Form.Item>
                            <Button disabled={allowedTimingSave} type="link" htmlType="submit" className={styles.marB20}>
                                Save
                            </Button>
                        </Space>
                        <Form.Item hidden name={'id'}>
                            <Input />
                        </Form.Item>
                        <Form.Item hidden name={'isDeleted'} initialValue="N">
                            <Input />
                        </Form.Item>
                    </div>
                </Form>
            )}
        </>
    );
};

export default AddEditForm;
