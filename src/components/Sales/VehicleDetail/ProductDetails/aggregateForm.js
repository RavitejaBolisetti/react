/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import React, { useState } from 'react';
import { Col, Input, Form, Row, Select, Button } from 'antd';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import styles from 'components/common/Common.module.css';
import { validateRequiredInputField, validateNumberWithTwoDecimalPlaces, validateRequiredSelectField, validationFieldLetterAndNumber } from 'utils/validation';

const AggregatesFormMain = (props) => {
    const { typeData, handleCancel, handleFormValueChange, optionsServicesMapping, setoptionsServicesMapping, optionsServiceModified, setoptionsServiceModified, showGlobalNotification, formData, optionForm } = props;
    const { serviceNameOptions, setserviceNameOptions, MakeOptions, setMakeOptions, MakefieldNames, serviceNames } = props;
    const { handleSelect } = props;
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

                const data = { ...values, serviceName: values?.serviceNameValue, make: values?.makeValue, id: '' };
                setoptionsServiceModified([data, ...optionsServiceModified]); //Adding data to table

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
                                    <Select onChange={(codeValue, serviceObject) => handleSelect(codeValue, serviceObject, 'Item')} allowClear placeholder={preparePlaceholderSelect('item')} options={serviceNameOptions} fieldNames={serviceNames} />
                                    {/* placeholder="Select item" allowClear options={typeData['VEHCL_TYPE']} fieldNames={{ label: 'value', value: 'key' }}  */}
                                </Form.Item>
                                <Form.Item name="serviceNameValue" hidden>
                                    {/* placeholder="Select item" allowClear options={typeData['VEHCL_TYPE']} fieldNames={{ label: 'value', value: 'key' }}  */}
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <Form.Item label="Make" name="make" rules={[validateRequiredInputField('Make')]}>
                                    <Select onChange={(codeValue, makeObject) => handleSelect(codeValue, makeObject, 'make')} allowClear placeholder={preparePlaceholderSelect('Make')} fieldNames={MakefieldNames} options={MakeOptions} />
                                    {/* placeholder="Select make" allowClear options={typeData['VEHCL_TYPE']} fieldNames={{ label: 'value', value: 'key' }} */}
                                </Form.Item>
                                <Form.Item name="makeValue" hidden>
                                    {/* placeholder="Select item" allowClear options={typeData['VEHCL_TYPE']} fieldNames={{ label: 'value', value: 'key' }}  */}
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <Form.Item label="Serial No." name="amount" rules={[validateRequiredInputField('Srl no'), validationFieldLetterAndNumber('Srl no')]}>
                                    <Input maxLength={50} placeholder={preparePlaceholderText('Srl no')} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={8} lg={8} xl={8} className={styles.marB20}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Button className={styles.marR20} onClick={onFinish}  type="primary">
                                        Save
                                    </Button>
                                    <Button onClick={handleCancel} danger>
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
