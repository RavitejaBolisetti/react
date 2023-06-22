/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Col, Input, Form, Row, Select, Button, Space, Collapse, Typography, Divider } from 'antd';
import { preparePlaceholderText } from 'utils/preparePlaceholder';

import styles from 'components/common/Common.module.css';
import { validateRequiredInputField } from 'utils/validation';

const OptionServicesFormMain = (props) => {
    const { handleCancel, showGlobalNotification, selectedOrderId, onErrorAction, formData, fetchList, userId, listShowLoading, saveData, onSuccessAction, optionForm, optionsServicesMapping, setoptionsServicesMapping } = props;

    const onFinish = () => {
        optionForm
            .validateFields()
            .then(() => {
                const values = optionForm.getFieldsValue();

                const data = { ...values, otfNumber: selectedOrderId, OtfId: formData?.id, id: '' };
                console.log('data', data, selectedOrderId);
                const onSuccess = (res) => {
                    const extraParams = [
                        {
                            key: 'otfNumber',
                            title: 'otfNumber',
                            value: selectedOrderId,
                            name: 'OTF Number',
                        },
                    ];
                    optionForm.resetFields();
                    showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: res?.responseMessage });
                    fetchList({ setIsLoading: listShowLoading, userId, onErrorAction, onSuccessAction, extraParams });
                };

                const onError = (message) => {
                    showGlobalNotification({ message });
                };

                const requestData = {
                    data: [data],
                    method: 'post',
                    setIsLoading: listShowLoading,
                    userId,
                    onError,
                    onSuccess,
                };

                saveData(requestData);
            })
            .catch((err) => {});
    };

    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Form autoComplete="off" layout="vertical" form={optionForm}>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <Form.Item label="Service Name" name="serviceName" rules={[validateRequiredInputField('Service Name')]}>
                                    <Input maxLength={50} placeholder={preparePlaceholderText('Service Name')} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <Form.Item label="Amount" name="amount" rules={[validateRequiredInputField('Amount')]}>
                                    <Input maxLength={50} placeholder={preparePlaceholderText('Amount')} />
                                </Form.Item>
                            </Col>
                            <Col style={{ marginTop: '28px' }} xs={24} sm={24} md={4} lg={4} xl={4}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Button onClick={onFinish} style={{ marginLeft: '20px' }} type="primary">
                                        Save
                                    </Button>
                                    <Button style={{ marginLeft: '20px' }} onClick={handleCancel} danger>
                                        Cancel
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </>
    );
};

export const OptionServicesForm = OptionServicesFormMain;
