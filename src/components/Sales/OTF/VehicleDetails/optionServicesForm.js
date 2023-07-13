/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Col, Input, Form, Row, Select, Button } from 'antd';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';

import { validateRequiredInputField, validateNumberWithTwoDecimalPlaces, validateRequiredSelectField } from 'utils/validation';

const OptionServicesFormMain = (props) => {
    const { typeData, handleCancel, handleFormValueChange, optionsServicesMapping, setoptionsServicesMapping, optionsServiceModified, setoptionsServiceModified, showGlobalNotification, formData, optionForm } = props;
    const [serviceOptions, setserviceOptions] = useState([]);
    useEffect(() => {
        if (typeData && typeData['OPT_SRV']) {
            setserviceOptions(typeData['OPT_SRV']);
        }
    }, [typeData]);
    useEffect(() => {
        if (serviceOptions && serviceOptions?.length) {
            const arr = [];
            optionsServiceModified?.map((option) => {
                arr.push(option?.serviceName);
            });

            setserviceOptions(
                serviceOptions?.map((element) => {
                    if (arr?.includes(element?.value)) {
                        return { ...element, disabled: true };
                    } else {
                        return element;
                    }
                })
            );
        }
    }, [typeData, optionsServiceModified]);
    const isServiceNamePresent = (serviceName) => {
        let found = false;
        optionsServiceModified?.find((element, index) => {
            if (element?.serviceName?.trim()?.toLowerCase() === serviceName?.trim()?.toLowerCase()) {
                showGlobalNotification({ notificationType: 'error', title: 'ERROR', message: 'Duplicate service Name' });
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
                                <Form.Item name="serviceName" label="Service Name" initialValue={formData?.serviceName} rules={[validateRequiredSelectField('Service Name')]}>
                                    <Select
                                        style={{
                                            width: '100%',
                                        }}
                                        options={serviceOptions}
                                        fieldNames={{ label: 'value', value: 'value' }}
                                        placeholder={preparePlaceholderSelect('Service Name')}
                                        allowClear
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <Form.Item label="Amount" name="amount" rules={[validateRequiredInputField('Amount'), validateNumberWithTwoDecimalPlaces('Amount')]}>
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
