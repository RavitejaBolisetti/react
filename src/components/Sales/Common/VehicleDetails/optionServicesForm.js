/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Col, Input, Form, Row, Select, Button } from 'antd';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { validateRequiredInputField, validateNumberWithTwoDecimalPlaces, validateRequiredSelectField } from 'utils/validation';

import styles from 'assets/sass/app.module.scss';

const OptionServicesFormMain = (props) => {
    const { typeData, vehicleServiceData, handleCancel, handleFormValueChange, optionsServicesMapping, setoptionsServicesMapping, optionsServiceModified, setoptionsServiceModified, selectedOrderId, formData, optionForm } = props;
    const [serviceOptions, setserviceOptions] = useState(vehicleServiceData);

    useEffect(() => {
        const arr = [];
        if (serviceOptions && serviceOptions?.length) {
            optionsServiceModified?.map((element) => {
                arr.push(element?.taxId);
            });

            setserviceOptions(
                serviceOptions?.map((element) => {
                    if (arr?.includes(element?.id) || arr?.includes(element?.value)) {
                        return { ...element, disabled: true };
                    } else {
                        return { ...element, disabled: false };
                    }
                })
            );
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [optionsServiceModified]);

    const onFinish = () => {
        optionForm
            .validateFields()
            .then(() => {
                const values = optionForm.getFieldsValue();

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
                    <Form autoComplete="off" layout="vertical" form={optionForm} onFinish={onFinish} data-testid="logRole">
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                                <Form.Item name="taxId" label="Service Name" rules={[validateRequiredSelectField('Service Name')]}>
                                    <Select onChange={(value, selectedObj) => optionForm.setFieldsValue({ serviceName: selectedObj?.value })} options={serviceOptions} fieldNames={{ label: 'value', value: 'id' }} placeholder={preparePlaceholderSelect('Service Name')} allowClear />
                                </Form.Item>
                                <Form.Item hidden name="otfNumber" initialValue={selectedOrderId} />
                                <Form.Item hidden name="otfId" initialValue={formData?.otfId ?? ''} />
                                <Form.Item hidden name="serviceName" />
                            </Col>
                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <Form.Item label="Amount" name="amount" rules={[validateRequiredInputField('Amount'), validateNumberWithTwoDecimalPlaces('Amount')]}>
                                    <Input maxLength={7} placeholder={preparePlaceholderText('Amount')} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={8} lg={8} xl={8} className={styles.marT30}>
                                <Button className={styles.marR20} onClick={onFinish} type="primary">
                                    Save
                                </Button>
                                <Button onClick={handleCancel} danger>
                                    Cancel
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </>
    );
};

export const OptionServicesForm = OptionServicesFormMain;
