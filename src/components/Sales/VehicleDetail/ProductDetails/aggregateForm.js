/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import React from 'react';
import { Col, Input, Form, Row, Select, Button } from 'antd';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';

import { validateRequiredInputField, validateNumberWithTwoDecimalPlaces, validateRequiredSelectField } from 'utils/validation';

const AggregatesFormMain = (props) => {
    const { typeData, handleCancel, handleFormValueChange, optionsServicesMapping, setoptionsServicesMapping, optionsServiceModified, setoptionsServiceModified, showGlobalNotification, formData, optionForm } = props;
    const isServiceNamePresent = (serviceName) => {
        let found = false;
        optionsServiceModified?.find((element, index) => {
            if (element?.serviceName?.trim()?.toLowerCase() === serviceName?.trim()?.toLowerCase()) {
                showGlobalNotification({ notificationType: 'error', title: 'ERROR', message: 'Duplicate item Name' });
                found = true;
                return;
            }
        });
        return found;
    };
    const onFinish = () => {
        optionForm
            .validateFields()
            .then(() => {
                const values = optionForm.getFieldsValue();
                if (isServiceNamePresent(values?.serviceName)) {
                    return;
                }

                const data = { ...values, id: '' };
                setoptionsServiceModified([data, ...optionsServiceModified]);
                setoptionsServicesMapping([...optionsServicesMapping, data]);
                optionForm.resetFields();
                handleFormValueChange();
            })
            .catch((err) => {});
    };

    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Form autoComplete="off" layout="vertical" form={optionForm} onFinish={onFinish}>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                <Form.Item name="serviceName" label="Item" rules={[validateRequiredSelectField('Item')]}>
                                    <Select
                                        options={[
                                            {
                                                value: '1',
                                                label: 'Not Identified',
                                            },
                                            {
                                                value: '2',
                                                label: 'Closed',
                                            },
                                            {
                                                value: '3',
                                                label: 'Identified',
                                            },
                                        ]}
                                    />
                                    {/* placeholder="Select item" allowClear options={typeData['VEHCL_TYPE']} fieldNames={{ label: 'value', value: 'key' }}  */}
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <Form.Item label="Make" name="make" rules={[validateRequiredInputField('Make')]}>
                                    <Select
                                        options={[
                                            {
                                                value: '1',
                                                label: 'Year',
                                            },
                                            {
                                                value: '2',
                                                label: 'Month',
                                            },
                                            {
                                                value: '3',
                                                label: 'WeekDays',
                                            },
                                        ]}
                                    />
                                    {/* placeholder="Select make" allowClear options={typeData['VEHCL_TYPE']} fieldNames={{ label: 'value', value: 'key' }} */}
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <Form.Item label="Seriol No." name="amount" rules={[validateRequiredInputField('Srl no')]}>
                                    <Input maxLength={50} placeholder={preparePlaceholderText('Srl no')} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            <Col style={{ marginTop: '28px' }} xs={24} sm={24} md={8} lg={8} xl={8}>
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

export const AggregatesForm = AggregatesFormMain;
